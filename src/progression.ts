import type { Exercise } from './db'
import { DEFAULT_LB_STEP, fromUnit, stepAbove, stepBelow, toUnit, unitFor } from './units'

export type Verdict = 'up' | 'down' | 'keep'

/**
 * Double progression on the first set only: reaching the top of the range
 * means more weight next time, falling below the bottom means less.
 * With 8–12: 7 or fewer → down, 8–11 → keep, 12 or more → up.
 */
export function judgeFirstSet(reps: number, repMin: number, repMax: number): Verdict {
  if (reps >= repMax) return 'up'
  if (reps < repMin) return 'down'
  return 'keep'
}

/** Built-in exercises done with body weight; extra load is optional. */
const BODYWEIGHT = new Set([
  'push_up',
  'pull_up',
  'dips',
  'lunge',
  'back_extension',
  'plank',
  'crunch',
  'hanging_leg_raise',
  'bulgarian_split_squat',
  'leg_raise',
  'russian_twist',
])

export const isBodyweight = (e: Exercise) => e.bodyweight ?? (!!e.builtin && BODYWEIGHT.has(e.builtin))

/**
 * Smallest weight change for this exercise, in its own unit: 10 lb (or its own
 * setting) for pound stacks, else its kg setting or the global default. Bigger
 * lifts still progress in bigger jumps, since suggestions aim for about 5 %.
 */
export const stepFor = (e: Exercise, defaultStep: number) =>
  unitFor(e) === 'lb' ? (e.weightStepLb ?? DEFAULT_LB_STEP) : (e.weightStep ?? defaultStep)

/**
 * Change the load by about 5 %, within the commonly recommended 2–10 %
 * (ACSM), rounded to what the equipment allows and at least one step.
 */
export function suggestedWeight(weight: number, verdict: Verdict, step: number) {
  if (verdict === 'keep' || step <= 0) return weight
  const change = Math.max(step, Math.round((weight * 0.05) / step) * step)
  const next = verdict === 'up' ? weight + change : Math.max(0, weight - change)
  return Math.round(next * 100) / 100
}

/** Cardio machines don't use weights, so they skip progression. */
export const usesProgression = (e: Exercise) => e.group !== 'cardio'

/**
 * Weight for next time in kg. Pound stacks move exactly one step on the stack
 * to the next stack position (20 → 30 lb, 35 → 40 lb); kg exercises
 * change by about 5 %.
 */
export function nextWeight(e: Exercise, kg: number, verdict: Verdict, defaultStep: number) {
  const step = stepFor(e, defaultStep)
  if (unitFor(e) === 'kg') return suggestedWeight(kg, verdict, step)
  if (verdict === 'keep' || step <= 0) return kg
  const lb = toUnit(kg, 'lb')
  return fromUnit(Math.max(0, verdict === 'up' ? stepAbove(lb, step) : stepBelow(lb, step)), 'lb')
}
