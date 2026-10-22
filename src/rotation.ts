import type { Plan, Workout } from './db'

/**
 * Training days run in a fixed order, whatever the weekday: the next one is the
 * day after the last one finished before `before` (default: ever). Plans must be
 * sorted by `order`.
 */
export function nextInRotation(plans: Plan[], workouts: Workout[], before = Infinity) {
  if (!plans.length) return undefined
  const ids = new Set(plans.map((p) => p.id))
  let last: Workout | undefined
  for (const w of workouts) {
    if (!w.endedAt || !w.planId || !ids.has(w.planId) || w.startedAt >= before) continue
    if (!last || w.startedAt > last.startedAt) last = w
  }
  const i = last ? plans.findIndex((p) => p.id === last.planId) : -1
  return plans[(i + 1) % plans.length]
}

/** All plans in rotation order, starting with `first`. */
export function rotateFrom(plans: Plan[], first?: Plan) {
  const i = first ? plans.indexOf(first) : 0
  return i <= 0 ? plans : [...plans.slice(i), ...plans.slice(0, i)]
}
