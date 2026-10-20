import { useLiveQuery } from 'dexie-react-hooks'
import { useEffect, useRef, useState } from 'react'
import {
  activeWorkout,
  db,
  estimate1RM,
  lastSessionSets,
  uid,
  workoutNow,
  type Exercise,
  type Workout,
  type WorkoutSet,
} from '../db'
import { setKeepAwake, unlockAudio } from '../device'
import { useI18n } from '../i18n'
import { scrollToTop, useNav } from '../nav'
import { exerciseName } from '../seed'
import { isBodyweight, judgeFirstSet, nextWeight, stepFor, usesProgression, type Verdict } from '../progression'
import { formatWeight, fromUnit, offPoundGrid, snapToStep, toUnit, unitFor, type WeightUnit } from '../units'
import { useSettings } from '../settings'
import { ExercisePicker } from './ExercisePicker'
import { Icon } from './Icon'
import { StartScreen } from './Plans'
import { WorkoutComplete } from './Summary'
import { useRest } from './RestTimer'
import { TipsChip } from './Tips'
import { ExerciseThumb, fmt, setLabel, setText, Sheet, Stepper, WeightStepper } from './ui'
import { cardioMetric, DEFAULT_MINUTES, isCardio, isTimed, METRIC_INFO } from '../cardio'

export function WorkoutView() {
  const { t } = useI18n()
  const { settings } = useSettings()
  const { stop } = useRest()
  const workout = useLiveQuery(activeWorkout, [], null)
  const plan = useLiveQuery(async () => (workout?.planId ? db.plans.get(workout.planId) : undefined), [workout?.planId])
  const [picking, setPicking] = useState(false)
  const [summaryId, setSummaryId] = useState<string>()
  const [focusId, setFocusId] = useState<string>()
  const doneIds = useLiveQuery(
    async () =>
      workout ? new Set((await db.sets.where('workoutId').equals(workout.id).toArray()).map((s) => s.exerciseId)) : undefined,
    [workout?.id],
  )

  useEffect(() => {
    setKeepAwake(!!workout && settings.keepAwake)
  }, [workout, settings.keepAwake])

  // A fresh workout goes straight to picking the first exercise.
  const autoOpened = useRef<string>(undefined)
  useEffect(() => {
    if (workout && !workout.exerciseIds.length && autoOpened.current !== workout.id) {
      autoOpened.current = workout.id
      if (Date.now() - (workout.trackedAt ?? workout.startedAt) < 5000) setPicking(true)
    }
  }, [workout])

  if (workout === null) return null // loading

  const summary = summaryId && <WorkoutComplete workoutId={summaryId} onClose={() => setSummaryId(undefined)} />

  if (!workout)
    return (
      <>
        <StartScreen />
        {summary}
      </>
    )

  const addExercise = async (id: string) => {
    setPicking(false)
    if (!workout.exerciseIds.includes(id)) {
      await db.workouts.update(workout.id, { exerciseIds: [...workout.exerciseIds, id] })
    }
  }

  const open = (id?: string) => {
    setFocusId(id)
    scrollToTop()
  }

  if (focusId && workout.exerciseIds.includes(focusId)) {
    return <ExerciseFocus key={focusId} workout={workout} exerciseId={focusId} onBack={() => open(undefined)} />
  }

  const finish = async () => {
    const count = await db.sets.where('workoutId').equals(workout.id).count()
    // Nothing added at all: drop it. Exercises without sets are kept so weights can be added later.
    if (!count && !workout.exerciseIds.length) {
      await db.workouts.delete(workout.id)
    } else {
      if (!confirm(t('finishConfirm'))) return
      await db.transaction('rw', db.workouts, async () => {
        await db.workouts.update(workout.id, { endedAt: workoutNow(workout) })
        // One workout per day: it replaces an entry logged for the same day.
        const day = new Date(workout.startedAt)
        const from = new Date(day.getFullYear(), day.getMonth(), day.getDate()).getTime()
        const to = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1).getTime()
        await db.workouts
          .where('startedAt')
          .between(from, to)
          .filter((w) => !!w.logged)
          .delete()
      })
      if (count) setSummaryId(workout.id)
      scrollToTop()
    }
    stop()
  }

  const discard = async () => {
    if (!confirm(t('discardConfirm'))) return
    await db.transaction('rw', db.workouts, db.sets, async () => {
      await db.sets.where('workoutId').equals(workout.id).delete()
      await db.workouts.delete(workout.id)
    })
    stop()
  }

  return (
    <div className="page">
      <header className="page-head workout-head">
        <div className="min0">
          {workout.trackedAt ? <DayLabel date={workout.startedAt} /> : <Elapsed since={workout.startedAt} />}
          <h1 className="clamp">{plan?.name ?? t('freeWorkout')}</h1>
        </div>
        <button className="btn primary small" onClick={finish}>
          <Icon name="check" size={18} /> {t('finish')}
        </button>
      </header>

      {workout.exerciseIds.length > 0 && (
        <>
          <p className="muted small overview-hint">{t('overviewHint')}</p>
          <ul className="list">
            {workout.exerciseIds.map((id) => (
              <ExerciseRow key={id} workout={workout} exerciseId={id} onOpen={() => open(id)} />
            ))}
          </ul>
        </>
      )}

      {workout.exerciseIds.length > 0 && workout.exerciseIds.every((id) => doneIds?.has(id)) && (
        <section className="all-done">
          <span className="done-dot">
            <Icon name="check" size={16} />
          </span>
          <strong className="grow">{t('allDone')}</strong>
          <button className="btn primary small" onClick={finish}>
            {t('finish')}
          </button>
        </section>
      )}

      <button className="btn secondary full add-ex" onClick={() => setPicking(true)}>
        <Icon name="plus" size={18} /> {t('addExercise')}
      </button>
      <button className="btn ghost full danger-text" onClick={discard}>
        {t('discardWorkout')}
      </button>

      {picking && (
        <Sheet title={t('addExercise')} onClose={() => setPicking(false)}>
          <ExercisePicker selected={workout.exerciseIds} onPick={addExercise} />
        </Sheet>
      )}
    </div>
  )
}

function DayLabel({ date }: { date: number }) {
  const { lang } = useI18n()
  return (
    <span className="eyebrow">
      <Icon name="calendar" size={14} />{' '}
      {new Date(date).toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
    </span>
  )
}

function Elapsed({ since }: { since: number }) {
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 15_000)
    return () => clearInterval(id)
  }, [])
  const { t } = useI18n()
  return (
    <span className="eyebrow">
      <Icon name="clock" size={14} /> {Math.max(0, Math.floor((now - since) / 60000))} {t('minutes')}
    </span>
  )
}

/** One line per exercise in the workout overview; tap to open it. */
function ExerciseRow({ workout, exerciseId, onOpen }: { workout: Workout; exerciseId: string; onOpen: () => void }) {
  const { t, lang } = useI18n()
  const exercise = useLiveQuery(() => db.exercises.get(exerciseId), [exerciseId])
  const sets = useLiveQuery(
    () => db.sets.where({ workoutId: workout.id, exerciseId }).sortBy('createdAt'),
    [workout.id, exerciseId],
  )
  if (!exercise || !sets) return null
  const bw = isBodyweight(exercise)
  const weight = sets.at(-1)?.weight ?? exercise.workingWeight
  const cardio = isCardio(exercise)
  const unit = unitFor(exercise)
  const weightText = cardio
    ? undefined
    : weight === undefined
      ? undefined
      : weight > 0
        ? formatWeight(weight, unit, lang)
        : bw
          ? t('bodyweightShort')
          : '0 kg'
  const done = sets.length > 0

  return (
    <li>
      <button className={`list-item ex-row ${done ? 'done' : ''}`} onClick={onOpen}>
        <ExerciseThumb exercise={exercise} />
        <span className="grow min0">
          <span className="clamp block ex-row-name">{exerciseName(exercise, t)}</span>
          <span className="muted small">
            {!done
              ? t('notStarted')
              : cardio
                ? sets.map((s) => setLabel(s, exercise, t, lang)).join(' · ')
                : sets.length === 1
                  ? t('oneSet')
                  : t('nSets', { n: sets.length })}
            {weightText && ` · ${weightText}`}
          </span>
        </span>
        {done ? (
          <span className="done-dot">
            <Icon name="check" size={16} />
          </span>
        ) : (
          <Icon name="chevronRight" size={18} className="chev" />
        )}
      </button>
    </li>
  )
}

interface FocusProps {
  workout: Workout
  exerciseId: string
  onBack: () => void
}

/** Focused page for one exercise: cardio logs time, everything else weight and reps. */
function ExerciseFocus(props: FocusProps) {
  const exercise = useLiveQuery(() => db.exercises.get(props.exerciseId), [props.exerciseId])
  if (!exercise) return null
  return isCardio(exercise) ? <CardioFocus {...props} exercise={exercise} /> : <StrengthFocus {...props} exercise={exercise} />
}

/** Removes the exercise and its sets from the workout. */
async function removeFromWorkout(workout: Workout, exerciseId: string, hasSets: boolean, confirmText: string) {
  if (hasSets && !confirm(confirmText)) return false
  await db.transaction('rw', db.workouts, db.sets, async () => {
    await db.sets.where({ workoutId: workout.id, exerciseId }).delete()
    await db.workouts.update(workout.id, { exerciseIds: workout.exerciseIds.filter((x) => x !== exerciseId) })
  })
  return true
}

function FocusHeader({ exerciseId, onBack }: { exerciseId: string; onBack: () => void }) {
  const { t } = useI18n()
  const { openExercise } = useNav()
  return (
    <header className="page-head">
      <button className="btn ghost small back" onClick={onBack}>
        <Icon name="chevronLeft" size={20} /> {t('workoutOverview')}
      </button>
      <button className="icon-btn muted" onClick={() => openExercise(exerciseId)} aria-label={t('progress')}>
        <Icon name="chart" size={20} />
      </button>
    </header>
  )
}

/** Weight is set once, then each set only asks for reps. */
function StrengthFocus({ workout, exerciseId, onBack, exercise }: FocusProps & { exercise: Exercise }) {
  const { t, lang } = useI18n()
  const { settings } = useSettings()
  const rest = useRest()
  const sets = useLiveQuery(
    () => db.sets.where({ workoutId: workout.id, exerciseId }).sortBy('createdAt'),
    [workout.id, exerciseId],
  )
  // For an earlier day, compare with the session before that day.
  const before = workout.trackedAt ? workout.startedAt : undefined
  const previous = useLiveQuery(() => lastSessionSets(exerciseId, workout.id, before), [exerciseId, workout.id, before])

  const [weight, setWeight] = useState<number>()
  const [reps, setReps] = useState<number>()
  const [editingWeight, setEditingWeight] = useState(false)
  const [editing, setEditing] = useState<WorkoutSet>()
  const [pr, setPr] = useState(false)
  const [beat, setBeat] = useState<string>()
  const [suggestion, setSuggestion] = useState<{ verdict: Verdict; reps: number; weight: number; next: number }>()

  // Weight: today's last set, else the saved working weight, else last time.
  useEffect(() => {
    if (!sets || !previous || !exercise || weight !== undefined) return
    const unit = unitFor(exercise)
    const w = sets.at(-1)?.weight ?? exercise.workingWeight ?? previous[0]?.weight ?? (isBodyweight(exercise) ? 0 : 20)
    // A kg weight from before the exercise used pounds goes to the nearest stack position.
    setWeight(
      unit === 'lb' && offPoundGrid(w)
        ? fromUnit(snapToStep(toUnit(w, unit), stepFor(exercise, settings.weightStep)), unit)
        : w,
    )
  }, [sets, previous, exercise, weight, settings.weightStep])

  // Reps: what you did in the same set last time, else today's last set, else the bottom of the range.
  const setIndex = sets?.length ?? 0
  useEffect(() => {
    if (!sets || !previous) return
    setReps(previous[setIndex]?.reps ?? sets.at(-1)?.reps ?? previous.at(-1)?.reps ?? settings.repMin)
  }, [setIndex, sets, previous, settings.repMin])

  if (!sets || !previous || weight === undefined || reps === undefined) return null
  const progression = usesProgression(exercise)
  const step = stepFor(exercise, settings.weightStep)
  const bw = isBodyweight(exercise)
  const unit = unitFor(exercise)
  const label = (w: number, r: number) => setText(w, r, lang, bw ? t('bodyweightShort') : '0 kg', unit)
  // First time ever: ask for the weight once, nothing else.
  const needsWeight = progression && !bw && exercise.workingWeight === undefined && !sets.length && !previous.length

  const saveSet = async () => {
    unlockAudio()
    const best = await bestEstimate(exerciseId)
    const isFirst = sets.length === 0
    const createdAt = workoutNow(workout)
    await db.sets.add({ id: uid(), workoutId: workout.id, exerciseId, weight, reps, createdAt })
    if (!workout.trackedAt) rest.start(exercise.restSeconds ?? settings.defaultRest)
    setEditingWeight(false)
    // A workout for an earlier day only sets next time's weight if nothing newer was logged since.
    const newer = workout.trackedAt
      ? await db.sets
          .where('[exerciseId+createdAt]')
          .between([exerciseId, createdAt], [exerciseId, Infinity], false)
          .filter((s) => s.workoutId !== workout.id)
          .count()
      : 0
    if (isFirst && progression && !newer) {
      // Only the first set decides the weight for next time.
      const verdict = judgeFirstSet(reps, settings.repMin, settings.repMax)
      await db.exercises.update(exerciseId, { workingWeight: weight })
      setSuggestion({ verdict, reps, weight, next: nextWeight(exercise, weight, verdict, settings.weightStep) })
    }
    if (best > 0 && weight > 0 && estimate1RM(weight, reps) > best) {
      setPr(true)
      setTimeout(() => setPr(false), 4000)
    } else {
      // Small wins count: compare with the same set last time.
      const prev = previous[sets.length]
      const msg = !prev
        ? undefined
        : weight > prev.weight
          ? t('beatWeight', { kg: formatWeight(weight - prev.weight, unit, lang) })
          : weight === prev.weight && reps > prev.reps
            ? t('beatReps', { n: reps - prev.reps })
            : undefined
      if (msg) {
        setBeat(msg)
        setTimeout(() => setBeat(undefined), 3500)
      }
    }
  }

  const remove = async () => {
    if (await removeFromWorkout(workout, exerciseId, sets.length > 0, t('discardConfirm'))) onBack()
  }

  return (
    <div className="page focus">
      <FocusHeader exerciseId={exerciseId} onBack={onBack} />

      <div className="focus-hero">
        <ExerciseThumb exercise={exercise} className="focus-img" />
        <div className="min0">
          <h1 className="focus-title">{exerciseName(exercise, t)}</h1>
          <div className="meta-row">
            {progression && (
              <span className="meta-chip goal">
                <Icon name="target" size={15} /> {t('goal')} {settings.repMin}–{settings.repMax} {t('reps')}
              </span>
            )}
            <TipsChip exercise={exercise} />
          </div>
        </div>
      </div>
      {exercise.notes && <p className="muted small">{exercise.notes}</p>}

      {needsWeight ? (
        <section className="card focus-card">
          <h2 className="focus-q">{t('startWeightTitle')}</h2>
          <p className="muted small">{t('startWeightHint')}</p>
          <WeightStepper exercise={exercise} label={t('weight')} value={weight} onChange={setWeight} step={step} />
          <button
            className="btn primary full big"
            onClick={() => db.exercises.update(exerciseId, { workingWeight: weight })}
          >
            {t('continue')} <Icon name="chevronRight" size={18} />
          </button>
        </section>
      ) : (
        <section className="card focus-card">
          <div className="set-head">
            <h2 className="focus-q">{t('setN', { n: sets.length + 1 })}</h2>
            <button className="weight-pill" onClick={() => setEditingWeight(!editingWeight)}>
              {weight > 0 ? formatWeight(weight, unit, lang) : bw ? t('bodyweightShort') : '0 kg'}
              {unit === 'lb' && weight > 0 && (
                <span className="weight-pill-alt">{fmt(toUnit(weight, unit), lang)} lb</span>
              )}
              <span className="weight-pill-action">
                <Icon name="pencil" size={13} /> {t('change')}
              </span>
            </button>
          </div>
          {editingWeight && (
            <WeightStepper
              exercise={exercise}
              label={t(bw ? 'addedWeight' : 'weight')}
              value={weight}
              onChange={setWeight}
              step={step}
            />
          )}
          <Stepper label={t('repsQuestion')} value={reps} onChange={setReps} step={1} />
          <button className="btn primary full big" onClick={saveSet}>
            <Icon name="check" size={20} /> {t('saveSetN', { n: sets.length + 1 })}
          </button>

          {pr && (
            <div className="pr-badge">
              <Icon name="trophy" size={18} /> {t('newPR')}
            </div>
          )}
          {beat && (
            <div className="beat-badge">
              <Icon name="trendUp" size={18} /> {beat}
            </div>
          )}
          {suggestion && (
            <ProgressionPrompt
              {...suggestion}
              step={step}
              bodyweight={bw}
              exercise={exercise}
              onDone={async (next) => {
                if (next !== undefined) await db.exercises.update(exerciseId, { workingWeight: next })
                setSuggestion(undefined)
              }}
            />
          )}
        </section>
      )}

      {!!sets.length && (
        <ol className="sets">
          {sets.map((s, i) => (
            <li key={s.id}>
              <button onClick={() => setEditing(s)}>
                <span className="set-no">{i + 1}</span>
                <span className="grow">{label(s.weight, s.reps)}</span>
                <Icon name="check" size={18} className="set-check" />
              </button>
            </li>
          ))}
        </ol>
      )}

      <p className="muted small last-time">
        <Icon name="history" size={15} />
        {previous.length
          ? `${t('lastTime')}: ${previous.map((s) => label(s.weight, s.reps)).join(' · ')}`
          : t('firstTime')}
      </p>

      {!!sets.length && (
        <button className="btn secondary full" onClick={onBack}>
          <Icon name="check" size={18} /> {t('exerciseDone')}
        </button>
      )}
      <button className="btn ghost full danger-text" onClick={remove}>
        {t('removeFromWorkout')}
      </button>

      {editing && <EditSetSheet set={editing} exercise={exercise} onClose={() => setEditing(undefined)} />}
    </div>
  )
}

/** Cardio: how long, plus one value that fits the machine (speed, incline, level or distance). */
function CardioFocus({ workout, exerciseId, onBack, exercise }: FocusProps & { exercise: Exercise }) {
  const { t, lang } = useI18n()
  const sets = useLiveQuery(
    () => db.sets.where({ workoutId: workout.id, exerciseId }).sortBy('createdAt'),
    [workout.id, exerciseId],
  )
  const before = workout.trackedAt ? workout.startedAt : undefined
  const previous = useLiveQuery(() => lastSessionSets(exerciseId, workout.id, before), [exerciseId, workout.id, before])
  const metric = cardioMetric(exercise)
  const info = metric && METRIC_INFO[metric]

  const [minutes, setMinutes] = useState<number>()
  const [value, setValue] = useState<number>()
  const [editing, setEditing] = useState<WorkoutSet>()
  const [beat, setBeat] = useState<string>()

  // Start from the same round last time, else today's last round, else a sensible default.
  const setIndex = sets?.length ?? 0
  useEffect(() => {
    if (!sets || !previous) return
    const prev = previous.filter(isTimed)
    const from = prev[setIndex] ?? sets.at(-1) ?? prev.at(-1)
    setMinutes(from?.minutes ?? DEFAULT_MINUTES)
    setValue(from?.value ?? info?.start ?? 0)
  }, [setIndex, sets, previous, info])

  if (!sets || !previous || minutes === undefined || value === undefined) return null
  const prevTimed = previous.filter(isTimed)

  const save = async () => {
    await db.sets.add({
      id: uid(),
      workoutId: workout.id,
      exerciseId,
      weight: 0,
      reps: 0,
      minutes,
      value: metric ? value : undefined,
      createdAt: workoutNow(workout),
    })
    const prev = prevTimed[sets.length]
    if (prev?.minutes !== undefined && minutes > prev.minutes) {
      setBeat(t('beatMinutes', { n: fmt(minutes - prev.minutes, lang) }))
      setTimeout(() => setBeat(undefined), 3500)
    }
  }

  const remove = async () => {
    if (await removeFromWorkout(workout, exerciseId, sets.length > 0, t('discardConfirm'))) onBack()
  }

  return (
    <div className="page focus">
      <FocusHeader exerciseId={exerciseId} onBack={onBack} />

      <div className="focus-hero">
        <ExerciseThumb exercise={exercise} className="focus-img" />
        <div className="min0">
          <h1 className="focus-title">{exerciseName(exercise, t)}</h1>
          <div className="meta-row">
            <TipsChip exercise={exercise} />
          </div>
        </div>
      </div>
      {exercise.notes && <p className="muted small">{exercise.notes}</p>}

      <section className="card focus-card">
        <h2 className="focus-q">{t(sets.length ? 'cardioMore' : 'cardioLog')}</h2>
        <Stepper label={t('durationMin')} value={minutes} onChange={setMinutes} step={1} />
        {metric && info && (
          <Stepper
            label={`${t(`metric_${metric}`)}${info.unit ? ` (${info.unit})` : ''}`}
            value={value}
            onChange={setValue}
            step={info.step}
          />
        )}
        <button className="btn primary full big" onClick={save} disabled={minutes <= 0}>
          <Icon name="check" size={20} /> {t('save')}
        </button>
        {beat && (
          <div className="beat-badge">
            <Icon name="trendUp" size={18} /> {beat}
          </div>
        )}
      </section>

      {!!sets.length && (
        <ol className="sets">
          {sets.map((s, i) => (
            <li key={s.id}>
              <button onClick={() => setEditing(s)}>
                <span className="set-no">{i + 1}</span>
                <span className="grow">{setLabel(s, exercise, t, lang)}</span>
                <Icon name="check" size={18} className="set-check" />
              </button>
            </li>
          ))}
        </ol>
      )}

      <p className="muted small last-time">
        <Icon name="history" size={15} />
        {previous.length
          ? `${t('lastTime')}: ${previous.map((s) => setLabel(s, exercise, t, lang)).join(' · ')}`
          : t('firstTime')}
      </p>

      {!!sets.length && (
        <button className="btn secondary full" onClick={onBack}>
          <Icon name="check" size={18} /> {t('exerciseDone')}
        </button>
      )}
      <button className="btn ghost full danger-text" onClick={remove}>
        {t('removeFromWorkout')}
      </button>

      {editing && <EditSetSheet set={editing} exercise={exercise} onClose={() => setEditing(undefined)} />}
    </div>
  )
}

/** Shown after the first set: keep the weight, or pick the new one for next time. */
function ProgressionPrompt({
  verdict,
  reps,
  weight,
  next,
  step,
  bodyweight,
  exercise,
  onDone,
}: {
  verdict: Verdict
  reps: number
  weight: number
  next: number
  step: number
  bodyweight: boolean
  exercise: Exercise
  onDone: (next?: number) => void
}) {
  const { t, lang } = useI18n()
  const unit: WeightUnit = unitFor(exercise)
  const w = (kg: number) => formatWeight(kg, unit, lang)
  const [value, setValue] = useState(next)
  const done = useRef(onDone)
  done.current = onDone
  // Without extra weight there is nothing to adjust: just say how it went.
  const infoOnly = verdict === 'keep' || (bodyweight && weight === 0)

  useEffect(() => {
    if (!infoOnly) return
    const id = setTimeout(() => done.current(), verdict === 'keep' ? 6000 : 10000)
    return () => clearTimeout(id)
  }, [infoOnly, verdict])

  if (infoOnly) {
    const text =
      verdict === 'keep'
        ? bodyweight && weight === 0
          ? t('progKeepBw', { reps })
          : t('progKeep', { reps, weight: w(weight) })
        : t(verdict === 'up' ? 'bwUp' : 'bwDown', { reps })
    return (
      <button className={`prog prog-keep ${verdict === 'keep' ? '' : `prog-${verdict}`}`} onClick={() => onDone()}>
        {text}
      </button>
    )
  }
  return (
    <div className={`prog prog-${verdict}`}>
      <p>
        <Icon name={verdict === 'up' ? 'trendUp' : 'trendDown'} size={18} />
        {t(verdict === 'up' ? 'progUp' : 'progDown', { reps })}
      </p>
      <WeightStepper exercise={exercise} label={t('workingWeight')} value={value} onChange={setValue} step={step} />
      <div className="row">
        <button className="btn primary small grow" onClick={() => onDone(value)}>
          {t('applyWeight', { weight: w(value) })}
        </button>
        <button className="btn secondary small" onClick={() => onDone(weight)}>
          {t('keepWeight', { weight: w(weight) })}
        </button>
      </div>
    </div>
  )
}

async function bestEstimate(exerciseId: string) {
  const all = await db.sets.where('exerciseId').equals(exerciseId).toArray()
  return all.reduce((m, s) => Math.max(m, estimate1RM(s.weight, s.reps)), 0)
}

export function EditSetSheet({ set, exercise, onClose }: { set: WorkoutSet; exercise?: Exercise; onClose: () => void }) {
  const { t } = useI18n()
  const { settings } = useSettings()
  const [weight, setWeight] = useState(set.weight)
  const [reps, setReps] = useState(set.reps)
  const [minutes, setMinutes] = useState(set.minutes ?? 0)
  const [value, setValue] = useState(set.value ?? 0)
  const timed = isTimed(set)
  const metric = exercise && cardioMetric(exercise)
  return (
    <Sheet title={`${t('editSet')}${exercise ? ` · ${exerciseName(exercise, t)}` : ''}`} onClose={onClose}>
      {timed ? (
        <div className="entry">
          <Stepper label={t('durationMin')} value={minutes} onChange={setMinutes} step={1} />
          {metric && (
            <Stepper
              label={`${t(`metric_${metric}`)}${METRIC_INFO[metric].unit ? ` (${METRIC_INFO[metric].unit})` : ''}`}
              value={value}
              onChange={setValue}
              step={METRIC_INFO[metric].step}
            />
          )}
        </div>
      ) : (
        <div className="entry">
          <WeightStepper
            exercise={exercise}
            label={t(exercise && isBodyweight(exercise) ? 'addedWeight' : 'weight')}
            value={weight}
            onChange={setWeight}
            step={exercise ? stepFor(exercise, settings.weightStep) : settings.weightStep}
          />
          <Stepper label={t('reps')} value={reps} onChange={setReps} step={1} />
        </div>
      )}
      <button
        className="btn primary full"
        onClick={async () => {
          await db.sets.update(set.id, timed ? { minutes, value: metric ? value : set.value } : { weight, reps })
          onClose()
        }}
      >
        {t('save')}
      </button>
      <button
        className="btn ghost full danger-text"
        onClick={async () => {
          await db.sets.delete(set.id)
          onClose()
        }}
      >
        {t('deleteSet')}
      </button>
    </Sheet>
  )
}
