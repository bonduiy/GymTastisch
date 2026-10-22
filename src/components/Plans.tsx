import { useLiveQuery } from 'dexie-react-hooks'
import { useState } from 'react'
import { dayKey, db, MAX_PLANS, uid, type Plan, type Workout } from '../db'
import { unlockAudio } from '../device'
import { useI18n } from '../i18n'
import { exerciseName } from '../seed'
import { nextInRotation, rotateFrom } from '../rotation'
import { useSettings } from '../settings'
import { DAY, weekStart, weekStreak, workoutsPerWeek } from '../weeks'
import { ExercisePicker } from './ExercisePicker'
import { WorkoutSummary } from './HistoryView'
import { Icon } from './Icon'
import { ExerciseThumb, Sheet } from './ui'

/** Start a workout now, or with `day` one for an earlier day whose sets are dated that day. */
export async function startWorkout(plan?: Plan, day?: Date) {
  unlockAudio()
  const now = Date.now()
  await db.workouts.add({
    id: uid(),
    startedAt: day ? new Date(day.getFullYear(), day.getMonth(), day.getDate(), 18).getTime() : now,
    trackedAt: day ? now : undefined,
    exerciseIds: plan ? [...plan.exerciseIds] : [],
    planId: plan?.id,
  })
}

/** Start screen: guided setup on first use, then the next training day in the rotation front and centre. */
export function StartScreen() {
  const { t, lang } = useI18n()
  const plans = useLiveQuery(() => db.plans.orderBy('order').toArray(), [])
  const exercises = useLiveQuery(() => db.exercises.toArray(), [])
  const done = useLiveQuery(
    () =>
      db.workouts
        .orderBy('startedAt')
        .reverse()
        .filter((w) => !!w.endedAt)
        .toArray(),
    [],
  )
  const restToday = useLiveQuery(async () => !!(await db.restdays.get(dayKey())), [])
  const [editing, setEditing] = useState<Plan | 'new'>()
  const [sorting, setSorting] = useState(false)
  if (!plans || !exercises || !done || restToday === undefined) return null

  const byId = new Map(exercises.map((e) => [e.id, e]))
  const locale = lang === 'de' ? 'de-DE' : 'en-GB'
  const lastDone = new Map<string, number>()
  for (const w of done) if (w.planId && !lastDone.has(w.planId)) lastDone.set(w.planId, w.startedAt)

  const next = nextInRotation(plans, done)
  const startOfToday = new Date().setHours(0, 0, 0, 0)
  const trainedToday = done.some((w) => w.startedAt >= startOfToday)
  const eyebrow = trainedToday ? t('nextAfterToday') : restToday ? t('nextAfterRest') : t('upNext')

  const when = (p: Plan) => {
    const d = lastDone.get(p.id)
    return d ? t('lastDone', { date: relativeDay(d, locale, t('today')) }) : t('neverDone')
  }
  const move = async (i: number, d: number) => {
    const order = [...plans]
    ;[order[i], order[i + d]] = [order[i + d], order[i]]
    await db.plans.bulkPut(order.map((p, n) => ({ ...p, order: n })))
  }
  const editor = editing && (
    <PlanEditor
      plan={editing === 'new' ? undefined : editing}
      count={plans.length}
      onClose={() => setEditing(undefined)}
    />
  )
  const header = (
    <header className="start-head">
      <span className="eyebrow">
        {new Date().toLocaleDateString(locale, {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
        })}
      </span>
      <h1>{t('tabWorkout')}</h1>
    </header>
  )

  if (!plans.length) {
    return (
      <div className="page">
        {header}
        <section className="setup">
          <div className="setup-badge">
            <Icon name="dumbbell" size={28} />
          </div>
          <h2>{t('setupTitle')}</h2>
          <p className="muted">{t('setupText')}</p>
          <ol className="steps">
            {(['setupStep1', 'setupStep2', 'setupStep3'] as const).map((k, i) => (
              <li key={k}>
                <span className="step-no">{i + 1}</span>
                <span>{t(k)}</span>
              </li>
            ))}
          </ol>
          <button className="btn primary full big" onClick={() => setEditing('new')}>
            <Icon name="plus" /> {t('setupCta')}
          </button>
        </section>
        <button className="btn ghost full" onClick={() => void startWorkout()}>
          {t('trainWithoutPlan')}
        </button>
        <RecentWorkouts />
        {editor}
      </div>
    )
  }

  return (
    <div className="page">
      {header}
      <WeekCard workouts={done} plans={plans} />
      {next && (
        <section className="next-card">
          <span className="eyebrow accent">{eyebrow}</span>
          <div className="next-title">
            <h2>{next.name}</h2>
            <button className="icon-btn" onClick={() => setEditing(next)} aria-label={t('editDay')}>
              <Icon name="pencil" size={20} />
            </button>
          </div>
          {plans.length > 1 && <RotationTrack plans={plans} next={next} />}
          <p className="muted small">
            {(next.exerciseIds.length === 1 ? t('oneExercise') : t('nExercises', { n: next.exerciseIds.length }))} · {when(next)}
          </p>
          {!!next.exerciseIds.length && (
            <div className="thumb-stack">
              {next.exerciseIds.slice(0, 5).map((id) => {
                const e = byId.get(id)
                return e ? <ExerciseThumb key={id} exercise={e} className="thumb stack-thumb" /> : null
              })}
              {next.exerciseIds.length > 5 && <span className="stack-more">+{next.exerciseIds.length - 5}</span>}
            </div>
          )}
          <button className="btn primary full big" onClick={() => void startWorkout(next)}>
            <Icon name="play" size={18} /> {t('startWorkout')}
          </button>
        </section>
      )}

      <div className="group-head">
        <h3 className="group-title">{t('yourDays')}</h3>
        {plans.length > 1 && (
          <button className="btn ghost small" onClick={() => setSorting(!sorting)}>
            {sorting ? t('done') : t('reorder')}
          </button>
        )}
      </div>
      {sorting && <p className="muted small">{t('rotationHint')}</p>}
      <ul className="list plan-list">
        {plans.map((p, i) => (
          <li key={p.id}>
            <div className="plan-row-main">
              <button className="plan-start" disabled={sorting} onClick={() => void startWorkout(p)}>
                <span className={`play-dot ${p === next ? 'next' : ''}`}>
                  {sorting ? <span className="order-no">{i + 1}</span> : <Icon name="play" size={14} />}
                </span>
                <span className="grow plan-text">
                  <strong>
                    {p.name}
                    {p === next && !sorting && <span className="next-tag">{t('upNext')}</span>}
                  </strong>
                  <span className="muted small clamp">
                    {p.exerciseIds.length
                      ? p.exerciseIds.map((id) => exerciseName(byId.get(id), t)).join(', ')
                      : t('noExercisesYet')}
                  </span>
                </span>
              </button>
              {sorting ? (
                <span className="row-tools">
                  <button className="icon-btn" disabled={i === 0} onClick={() => void move(i, -1)} aria-label={t('moveUp')}>
                    <Icon name="arrowUp" size={18} />
                  </button>
                  <button
                    className="icon-btn"
                    disabled={i === plans.length - 1}
                    onClick={() => void move(i, 1)}
                    aria-label={t('moveDown')}
                  >
                    <Icon name="arrowDown" size={18} />
                  </button>
                </span>
              ) : (
                <button className="icon-btn muted" onClick={() => setEditing(p)} aria-label={t('editDay')}>
                  <Icon name="pencil" size={18} />
                </button>
              )}
            </div>
          </li>
        ))}
        {plans.length < MAX_PLANS && !sorting && (
          <li>
            <button className="list-item add-row" onClick={() => setEditing('new')}>
              <span className="play-dot ghost">
                <Icon name="plus" size={16} />
              </span>
              <span className="grow">{t('addDay')}</span>
            </button>
          </li>
        )}
      </ul>

      <button className="btn secondary full" onClick={() => void startWorkout()}>
        {t('trainWithoutPlan')}
      </button>
      <RecentWorkouts />
      {editor}
    </div>
  )
}

/** Where the next training day sits in the rotation: one segment per day. */
function RotationTrack({ plans, next }: { plans: Plan[]; next: Plan }) {
  const { t } = useI18n()
  const at = plans.indexOf(next)
  return (
    <div className="rotation" role="img" aria-label={t('rotationPos', { n: at + 1, total: plans.length })}>
      {plans.map((p, i) => (
        <span key={p.id} className={`rotation-seg ${i < at ? 'past' : ''} ${i === at ? 'now' : ''}`} />
      ))}
    </div>
  )
}

/** Weekly goal ring, trained and rest days of this week and the week streak. With `plans`, days can be filled in. */
export function WeekCard({ workouts, plans }: { workouts: Workout[]; plans?: Plan[] }) {
  const { t, lang } = useI18n()
  const { settings } = useSettings()
  const [logDay, setLogDay] = useState<number>()
  const now = Date.now()
  const monday = weekStart(now)
  const dayDate = (i: number) => new Date(monday + i * DAY + DAY / 2)
  const restDays = useLiveQuery(
    () =>
      db.restdays
        .where('date')
        .between(dayKey(dayDate(0)), dayKey(dayDate(6)), true, true)
        .toArray(),
    [monday],
  )
  const perWeek = workoutsPerWeek(workouts)
  const doneCount = perWeek.get(monday) ?? 0
  const streak = weekStreak(perWeek, now)
  const goal = settings.weeklyGoal
  const pct = Math.min(1, doneCount / goal)
  const weekdayOf = (ts: number) => (new Date(ts).getDay() + 6) % 7
  const thisWeek = workouts.filter((w) => w.startedAt >= monday)
  const trainedDays = new Set(thisWeek.map((w) => weekdayOf(w.startedAt)))
  const rested = new Set(
    (restDays ?? []).map((r) => Array.from({ length: 7 }, (_, i) => i).find((i) => dayKey(dayDate(i)) === r.date)),
  )
  const todayIdx = weekdayOf(now)
  const locale = lang === 'de' ? 'de-DE' : 'en-GB'
  const dayNames = Array.from({ length: 7 }, (_, i) => dayDate(i).toLocaleDateString(locale, { weekday: 'narrow' }))
  const canLog =
    !!plans && Array.from({ length: todayIdx }, (_, i) => i).some((i) => !trainedDays.has(i) && !rested.has(i))
  const R = 26
  const C = 2 * Math.PI * R

  return (
    <section className={`week-card ${pct >= 1 ? 'reached' : ''}`}>
      <div className="week-top">
        <svg className="ring" viewBox="0 0 64 64" aria-hidden>
          <circle cx="32" cy="32" r={R} className="ring-track" />
          <circle
            cx="32"
            cy="32"
            r={R}
            className="ring-fill"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - pct)}
            transform="rotate(-90 32 32)"
          />
          <text x="32" y="38" textAnchor="middle" className="ring-text">
            {doneCount}/{goal}
          </text>
        </svg>
        <div className="grow min0">
          <strong className="block">
            {pct >= 1 ? t('goalReached') : t('goalProgress', { done: doneCount, goal })}
          </strong>
          <span className="muted small streak">
            <Icon name="flame" size={15} className={streak ? 'flame on' : 'flame'} />
            {streak > 1 ? t('streakWeeks', { n: streak }) : streak === 1 ? t('streakOne') : t('startStreak')}
          </span>
        </div>
      </div>
      <div className="week-days">
        {dayNames.map((d, i) => {
          const trained = trainedDays.has(i)
          const rest = !trained && rested.has(i)
          const cls = `day ${trained ? 'on' : ''} ${rest ? 'rest' : ''} ${i === todayIdx ? 'today' : ''}`
          const content = trained ? <Icon name="check" size={14} /> : rest ? <Icon name="moon" size={14} /> : d
          const name = dayDate(i).toLocaleDateString(locale, { weekday: 'long' })
          const label = trained ? `${name}: ${t('trained')}` : rest ? `${name}: ${t('noWorkout')}` : name
          return plans && i <= todayIdx ? (
            <button key={i} className={cls} onClick={() => setLogDay(i)} aria-label={label}>
              {content}
            </button>
          ) : (
            <span key={i} className={cls} aria-label={label}>
              {content}
            </span>
          )
        })}
      </div>
      {canLog && <p className="muted small week-hint">{t('weekTapHint')}</p>}
      {logDay !== undefined && plans && (
        <LogPastSheet
          date={dayDate(logDay)}
          plans={plans}
          workouts={workouts}
          rest={rested.has(logDay)}
          existing={thisWeek.filter((w) => weekdayOf(w.startedAt) === logDay)}
          onClose={() => setLogDay(undefined)}
        />
      )}
    </section>
  )
}

/** Track a workout for a day of this week, or mark it as rest day. One workout per day. */
function LogPastSheet({
  date,
  plans,
  workouts,
  rest,
  existing,
  onClose,
}: {
  date: Date
  plans: Plan[]
  workouts: Workout[]
  rest: boolean
  existing: Workout[]
  onClose: () => void
}) {
  const { t, lang } = useI18n()
  const label = date.toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
  const key = dayKey(date)
  const isToday = key === dayKey()
  const tracked = existing.filter((w) => !w.logged)
  const logged = existing.filter((w) => w.logged)
  const current = logged.find((w) => w.planId) ?? logged[0]
  const track = async (plan?: Plan) => {
    await startWorkout(plan, isToday ? undefined : date)
    onClose()
  }
  // A rest day replaces anything logged for the day; picking it again clears it.
  const toggleRest = async () => {
    await db.transaction('rw', db.workouts, db.restdays, async () => {
      if (rest) return db.restdays.delete(key)
      await db.workouts.bulkDelete(logged.map((w) => w.id))
      await db.restdays.put({ date: key, createdAt: Date.now() })
    })
    onClose()
  }
  // The day that was due on this date comes first, then the rest of the rotation.
  const due = nextInRotation(plans, workouts, new Date(date).setHours(0, 0, 0, 0))
  const ordered = rotateFrom(plans, due)
  const option = (
    k: string,
    name: string,
    onClick: () => void,
    on: boolean,
    opts: { icon?: 'moon'; note?: string; tag?: string } = {},
  ) => (
    <li key={k}>
      <button className={`list-item pick-row ${on ? 'on' : ''}`} aria-pressed={on} onClick={onClick}>
        <span className={`play-dot ${on ? '' : 'ghost'}`}>
          <Icon name={on ? 'check' : (opts.icon ?? 'play')} size={on ? 16 : 14} />
        </span>
        <span className="grow min0">
          <span className="block">
            {name}
            {opts.tag && <span className="next-tag">{opts.tag}</span>}
          </span>
          {opts.note && <span className="muted small block">{opts.note}</span>}
        </span>
      </button>
    </li>
  )

  // Open a finished workout again to change it; its clock continues where it ended.
  const reopen = async (w: Workout) => {
    const trackedAt = isToday && !w.trackedAt ? undefined : Date.now() - ((w.endedAt ?? w.startedAt) - w.startedAt)
    await db.workouts.update(w.id, { endedAt: undefined, trackedAt })
    onClose()
  }

  if (tracked.length > 0)
    return (
      <Sheet title={label} onClose={onClose}>
        <p className="muted small">{t('dayTracked')}</p>
        <ul className="list">
          {tracked.map((w) => (
            <li key={w.id}>
              <button className="list-item" onClick={() => void reopen(w)}>
                <span className="play-dot">
                  <Icon name="check" size={16} />
                </span>
                <span className="grow">{plans.find((p) => p.id === w.planId)?.name ?? t('freeWorkout')}</span>
                <span className="muted small">{t('editWorkout')}</span>
              </button>
            </li>
          ))}
        </ul>
      </Sheet>
    )

  return (
    <Sheet title={label} onClose={onClose}>
      <p className="muted small">{t(isToday ? 'pickTodayHint' : 'logPastHint')}</p>
      <ul className="list">
        {ordered.map((p) =>
          option(p.id, p.name, () => void track(p), !!current && current.planId === p.id, {
            tag: p === due && !current && !rest ? t('dueTag') : undefined,
          }),
        )}
        {option('free', t('freeWorkout'), () => void track(), !!current && !current.planId)}
      </ul>
      <ul className="list">
        {option('rest', t('noWorkout'), () => void toggleRest(), rest, { icon: 'moon', note: t('restDayNote') })}
      </ul>
    </Sheet>
  )
}

function RecentWorkouts() {
  const { t } = useI18n()
  const recent = useLiveQuery(
    () =>
      db.workouts
        .orderBy('startedAt')
        .reverse()
        .filter((w) => !!w.endedAt)
        .limit(3)
        .toArray(),
    [],
  )
  if (!recent?.length) return null
  return (
    <section className="stack">
      <h3 className="group-title">{t('recentWorkouts')}</h3>
      {recent.map((w) => (
        <WorkoutSummary key={w.id} workout={w} />
      ))}
    </section>
  )
}

function relativeDay(ts: number, locale: string, today: string) {
  const startOf = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()
  const days = Math.round((startOf(new Date()) - startOf(new Date(ts))) / 86_400_000)
  if (days === 0) return today
  if (days < 7) return new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(-days, 'day')
  return new Date(ts).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'short',
  })
}

function PlanEditor({ plan, count, onClose }: { plan?: Plan; count: number; onClose: () => void }) {
  const { t } = useI18n()
  const [name, setName] = useState(plan?.name ?? '')
  const [ids, setIds] = useState<string[]>(plan?.exerciseIds ?? [])
  const [picking, setPicking] = useState(false)
  const exercises = useLiveQuery(() => db.exercises.bulkGet(ids), [ids])

  const move = (i: number, d: number) => {
    const next = [...ids]
    ;[next[i], next[i + d]] = [next[i + d], next[i]]
    setIds(next)
  }

  const save = async () => {
    const data = {
      name: name.trim() || t('dayN', { n: count + (plan ? 0 : 1) }),
      exerciseIds: ids,
    }
    if (plan) await db.plans.update(plan.id, data)
    else await db.plans.add({ id: uid(), order: Date.now(), ...data })
    onClose()
  }

  const remove = async () => {
    if (!plan || !confirm(t('deleteDayConfirm'))) return
    await db.plans.delete(plan.id)
    onClose()
  }

  return (
    <Sheet title={plan ? t('editDay') : t('newDay')} onClose={onClose} full>
      <div className="form">
        <label>
          {t('dayName')}
          <input value={name} placeholder={t('dayNamePlaceholder')} onChange={(e) => setName(e.target.value)} />
        </label>
        <div className="field">
          <span>{t('tabExercises')}</span>
          {!ids.length && <p className="muted small">{t('noExercisesYet')}</p>}
          {!!ids.length && (
            <ul className="list">
              {ids.map((id, i) => {
                const e = exercises?.[i]
                return (
                  <li key={id} className="plan-row">
                    {e && <ExerciseThumb exercise={e} />}
                    <span className="grow">{exerciseName(e, t)}</span>
                    <button
                      className="icon-btn"
                      disabled={i === 0}
                      onClick={() => move(i, -1)}
                      aria-label={t('moveUp')}
                    >
                      <Icon name="arrowUp" size={18} />
                    </button>
                    <button
                      className="icon-btn"
                      disabled={i === ids.length - 1}
                      onClick={() => move(i, 1)}
                      aria-label={t('moveDown')}
                    >
                      <Icon name="arrowDown" size={18} />
                    </button>
                    <button
                      className="icon-btn danger-text"
                      onClick={() => setIds(ids.filter((x) => x !== id))}
                      aria-label={t('removeFromWorkout')}
                    >
                      <Icon name="x" size={18} />
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
          <button type="button" className="btn secondary full" onClick={() => setPicking(true)}>
            <Icon name="plus" size={18} /> {t('addExercise')}
          </button>
        </div>
        <button className="btn primary full" onClick={save} disabled={!plan && count >= MAX_PLANS}>
          {t('save')}
        </button>
        {plan && (
          <button className="btn ghost full danger-text" onClick={remove}>
            {t('deleteDay')}
          </button>
        )}
      </div>
      {picking && (
        <Sheet title={t('addExercise')} onClose={() => setPicking(false)} full>
          <ExercisePicker
            selected={ids}
            onPick={(id) => {
              if (!ids.includes(id)) setIds([...ids, id])
              setPicking(false)
            }}
          />
        </Sheet>
      )}
    </Sheet>
  )
}
