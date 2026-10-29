import { useLiveQuery } from 'dexie-react-hooks'
import { createPortal } from 'react-dom'
import { db, estimate1RM, type Exercise, type WorkoutSet } from '../db'
import { useI18n } from '../i18n'
import { exerciseName } from '../seed'
import { Icon } from './Icon'
import { WeekCard } from './Plans'
import { ExerciseThumb, setLabel } from './ui'

const MILESTONES = new Set([5, 10, 25, 50, 75, 100, 150, 200, 250, 300, 400, 500])

const bestOf = (sets: WorkoutSet[]) => sets.reduce((m, s) => (s.weight > 0 ? Math.max(m, estimate1RM(s.weight, s.reps)) : m), 0)
const volumeOf = (sets: WorkoutSet[]) => sets.reduce((v, s) => v + s.weight * s.reps, 0)

interface Highlight {
  exercise: Exercise
  kind: 'record' | 'improved'
  set: WorkoutSet
}

/**
 * Shown right after finishing a workout: what was achieved, framed positively.
 * Rendered into <body> so it covers the tab bar instead of sitting under it.
 */
export function WorkoutComplete({ workoutId, onClose }: { workoutId: string; onClose: () => void }) {
  const { t, lang } = useI18n()
  const data = useLiveQuery(async () => {
    const workout = await db.workouts.get(workoutId)
    if (!workout) return null
    const [sets, finished] = await Promise.all([
      db.sets.where('workoutId').equals(workoutId).toArray(),
      db.workouts.filter((w) => !!w.endedAt).toArray(),
    ])
    const earlier = finished.filter((w) => w.id !== workoutId && w.startedAt < workout.startedAt)

    // Same training day last time, for a fair volume comparison.
    const prevSame = workout.planId
      ? earlier.filter((w) => w.planId === workout.planId).sort((a, b) => b.startedAt - a.startedAt)[0]
      : undefined
    const prevVolume = prevSame ? volumeOf(await db.sets.where('workoutId').equals(prevSame.id).toArray()) : 0

    const earlierIds = new Set(earlier.map((w) => w.id))
    const highlights: Highlight[] = []
    for (const exId of [...new Set(sets.map((s) => s.exerciseId))]) {
      const mine = sets.filter((s) => s.exerciseId === exId)
      const before = (await db.sets.where('exerciseId').equals(exId).toArray()).filter((s) => earlierIds.has(s.workoutId))
      const exercise = await db.exercises.get(exId)
      if (!exercise || !before.length) continue
      const top = mine.reduce((a, b) => (estimate1RM(b.weight, b.reps) > estimate1RM(a.weight, a.reps) ? b : a))
      const best = bestOf(mine)
      // Most recent earlier session of this exercise.
      const lastId = before.reduce((a, b) => (b.createdAt > a.createdAt ? b : a)).workoutId
      const last = before.filter((s) => s.workoutId === lastId)
      if (best > 0 && best > bestOf(before)) highlights.push({ exercise, kind: 'record', set: top })
      else if (
        best > bestOf(last) ||
        (best === 0 && Math.max(...mine.map((s) => s.reps)) > Math.max(...last.map((s) => s.reps)))
      )
        highlights.push({ exercise, kind: 'improved', set: top })
    }
    highlights.sort((a, b) => (a.kind === b.kind ? 0 : a.kind === 'record' ? -1 : 1))

    return {
      workout,
      sets,
      total: finished.length,
      volume: volumeOf(sets),
      cardioMinutes: sets.reduce((m, s) => m + (s.minutes ?? 0), 0),
      prevVolume,
      highlights,
      finished,
    }
  }, [workoutId])

  if (!data) return null
  const { workout, total, volume, prevVolume, highlights } = data
  const minutes = Math.max(1, Math.round(((workout.endedAt ?? Date.now()) - workout.startedAt) / 60000))
  const volUp = prevVolume > 0 ? Math.round(((volume - prevVolume) / prevVolume) * 100) : 0
  const nf = new Intl.NumberFormat(lang === 'de' ? 'de-DE' : 'en-GB', { maximumFractionDigits: 0 })

  const title = t((['doneTitle1', 'doneTitle2', 'doneTitle3'] as const)[total % 3])
  const subtitle =
    total === 1
      ? t('firstWorkout')
      : MILESTONES.has(total)
        ? t('milestone', { n: total })
        : volUp > 0
          ? t('volumeUp', { p: volUp })
          : t('consistency')

  return createPortal(
    <div className="summary" role="dialog" aria-label={title}>
      <div className="confetti" aria-hidden>
        {Array.from({ length: 28 }, (_, i) => (
          <span key={i} style={{ left: `${(i * 37) % 100}%`, animationDelay: `${(i * 53) % 700}ms` }} />
        ))}
      </div>
      <div className="summary-body">
        <div className="summary-badge">
          <Icon name="sparkle" size={34} />
        </div>
        <h1>{title}</h1>
        <p className="muted summary-sub">{subtitle}</p>

        <div className="summary-stats">
          <div>
            <span className="stat-big">{minutes}</span>
            <span className="muted small">
              {t('duration')} ({t('minutes')})
            </span>
          </div>
          <div>
            <span className="stat-big">{data.sets.length}</span>
            <span className="muted small">{t('sets')}</span>
          </div>
          {volume === 0 && data.cardioMinutes > 0 ? (
            <div>
              <span className="stat-big">{nf.format(data.cardioMinutes)}</span>
              <span className="muted small">{t('cardioMinutes')}</span>
            </div>
          ) : (
            <div>
              <span className="stat-big">{nf.format(volume)}</span>
              <span className="muted small">{t('volume')} (kg)</span>
            </div>
          )}
        </div>

        {!!highlights.length && (
          <>
            <h3 className="group-title">Highlights</h3>
            <ul className="list">
              {highlights.map((h) => (
                <li key={h.exercise.id} className="highlight">
                  <ExerciseThumb exercise={h.exercise} />
                  <span className="grow min0">
                    <span className="clamp block">{exerciseName(h.exercise, t)}</span>
                    <span className="muted small">
                      {setLabel(h.set, h.exercise, t, lang)}
                    </span>
                  </span>
                  <span className={`hl-tag ${h.kind}`}>
                    <Icon name={h.kind === 'record' ? 'trophy' : 'trendUp'} size={15} />
                    {h.kind === 'record' ? t('newPR').replace('!', '') : t('improvedOn')}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}

        <WeekCard workouts={data.finished} />

        <button className="btn primary full big" onClick={onClose}>
          {t('done')}
        </button>
      </div>
    </div>,
    document.body,
  )
}
