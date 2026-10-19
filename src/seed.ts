import { db, type Exercise, type MuscleGroup } from './db'
import type { Key, T } from './i18n'

const BUILTINS: [string, MuscleGroup][] = [
  ['bench_press', 'chest'],
  ['incline_db_press', 'chest'],
  ['chest_press_machine', 'chest'],
  ['butterfly', 'chest'],
  ['cable_fly', 'chest'],
  ['push_up', 'chest'],
  ['deadlift', 'back'],
  ['lat_pulldown', 'back'],
  ['seated_row', 'back'],
  ['barbell_row', 'back'],
  ['pull_up', 'back'],
  ['back_extension', 'back'],
  ['squat', 'legs'],
  ['leg_press', 'legs'],
  ['leg_extension', 'legs'],
  ['leg_curl', 'legs'],
  ['romanian_deadlift', 'legs'],
  ['lunge', 'legs'],
  ['hip_thrust', 'legs'],
  ['calf_raise', 'legs'],
  ['abductor', 'legs'],
  ['adductor', 'legs'],
  ['overhead_press', 'shoulders'],
  ['shoulder_press_machine', 'shoulders'],
  ['lateral_raise', 'shoulders'],
  ['reverse_fly', 'shoulders'],
  ['face_pull', 'shoulders'],
  ['biceps_curl', 'arms'],
  ['hammer_curl', 'arms'],
  ['triceps_pushdown', 'arms'],
  ['dips', 'arms'],
  ['skull_crusher', 'arms'],
  ['plank', 'core'],
  ['crunch', 'core'],
  ['hanging_leg_raise', 'core'],
  ['ab_machine', 'core'],
  ['treadmill', 'cardio'],
  ['bike', 'cardio'],
  ['rowing_machine', 'cardio'],
  ['cross_trainer', 'cardio'],
  ['db_bench_press', 'chest'],
  ['incline_bench_press', 'chest'],
  ['incline_chest_press_machine', 'chest'],
  ['pec_fly_db', 'chest'],
  ['db_row', 'back'],
  ['row_machine', 'back'],
  ['assisted_pull_up', 'back'],
  ['close_grip_pulldown', 'back'],
  ['hack_squat', 'legs'],
  ['goblet_squat', 'legs'],
  ['bulgarian_split_squat', 'legs'],
  ['lying_leg_curl', 'legs'],
  ['seated_calf_raise', 'legs'],
  ['glute_kickback', 'legs'],
  ['db_shoulder_press', 'shoulders'],
  ['lateral_raise_machine', 'shoulders'],
  ['cable_lateral_raise', 'shoulders'],
  ['biceps_curl_machine', 'arms'],
  ['barbell_curl', 'arms'],
  ['cable_curl', 'arms'],
  ['preacher_curl', 'arms'],
  ['triceps_machine', 'arms'],
  ['overhead_triceps_extension', 'arms'],
  ['cable_crunch', 'core'],
  ['leg_raise', 'core'],
  ['russian_twist', 'core'],
  ['stair_climber', 'cardio'],
  ['incline_walk', 'cardio'],
  ['glute_kickback_machine', 'legs'],
]

/** Adds any built-in exercises that are missing (first launch, or new ones in an update). */
export async function seedExercises() {
  const existing = new Set((await db.exercises.toArray()).map((e) => e.builtin).filter(Boolean))
  const missing = BUILTINS.filter(([key]) => !existing.has(key))
  if (!missing.length) return
  const now = Date.now()
  await db.exercises.bulkAdd(
    missing.map(([key, group], i) => ({ id: `builtin-${key}`, builtin: key, group, createdAt: now + i })),
  )
}

export const exerciseName = (e: Exercise | undefined, t: T) =>
  !e ? '?' : e.name || (e.builtin ? t(`ex_${e.builtin}` as Key) : '?')

/** Illustration for built-in exercises. */
export const builtinImage = (e: Exercise) =>
  e.builtin ? `${import.meta.env.BASE_URL}exercises/${e.builtin}.jpg` : undefined
