import type { Exercise, MuscleGroup } from './db'

/**
 * Muscles and muscle heads shown on the body map, grouped as they are listed in the statistics.
 * Deep muscles that can't be seen from the outside (e.g. vastus intermedius, rhomboids) are
 * counted with the visible muscle that covers them.
 */
export const MUSCLE_TREE = {
  chest: ['chest_upper', 'chest_lower'],
  shoulders: ['front_delts', 'side_delts', 'rear_delts'],
  biceps: ['biceps_long', 'biceps_short', 'brachialis'],
  triceps: ['triceps_long', 'triceps_lateral', 'triceps_medial'],
  forearms: ['forearm_flexors', 'forearm_extensors'],
  traps: ['traps_upper', 'traps_mid'],
  lats: ['lats'],
  lower_back: ['lower_back'],
  core: ['abs', 'obliques'],
  glutes: ['glute_max', 'glute_med'],
  quads: ['rectus_femoris', 'vastus_lateralis', 'vastus_medialis'],
  hamstrings: ['hamstrings_lateral', 'hamstrings_medial'],
  adductors: ['adductors'],
  calves: ['gastrocnemius', 'soleus'],
} as const

export type MuscleArea = keyof typeof MUSCLE_TREE
export type Muscle = (typeof MUSCLE_TREE)[MuscleArea][number]
export const MUSCLE_AREAS = Object.keys(MUSCLE_TREE) as MuscleArea[]
export const MUSCLES = Object.values(MUSCLE_TREE).flat() as Muscle[]

/** Share of a set that counts for a muscle: 1 = target muscle, below 1 = assisting or stabilising muscle. */
export type MuscleShares = Partial<Record<Muscle, number>>

/*
 * Shares follow how much a muscle works in the exercise:
 *   1    target muscle
 *   0.5  strong synergist (e.g. triceps in pressing, biceps in pulling). Meta-analyses on
 *        "indirect" volume count such sets at about half a set (Pelland et al., 2024).
 *   0.25 clearly involved
 *   0.1  mainly stabilising
 * Head-specific choices:
 *   - Flat pressing works mainly the sternal (mid/lower) chest, incline pressing the clavicular
 *     (upper) chest (Chaves et al., 2024).
 *   - Pressing works the lateral and medial triceps heads more than the long head, which crosses
 *     the shoulder; overhead extensions grow the long head most (Maeo et al., 2023).
 *   - Squats and leg presses grow the vasti, glutes and adductors, but hardly the rectus femoris
 *     or hamstrings (Kubo et al., 2019); leg extensions do train the rectus femoris.
 *   - Seated leg curls train the hamstrings in a lengthened position (Maeo et al., 2021).
 *   - Hammer curls shift work to the brachialis and brachioradialis; preacher curls to the short head.
 *   - Seated calf raises (knee bent) mainly train the soleus, standing ones the gastrocnemius.
 *   - Abduction machines train the gluteus medius.
 */
const TRICEPS_PRESS: MuscleShares = { triceps_lateral: 0.5, triceps_medial: 0.5, triceps_long: 0.25 }
const FLAT_PRESS: MuscleShares = { chest_lower: 1, chest_upper: 0.5, front_delts: 0.5, ...TRICEPS_PRESS }
const INCLINE_PRESS: MuscleShares = { chest_upper: 1, chest_lower: 0.5, front_delts: 0.75, ...TRICEPS_PRESS }
const FLY: MuscleShares = { chest_lower: 1, chest_upper: 0.5, front_delts: 0.25, biceps_short: 0.1 }
const ELBOW_FLEXORS: MuscleShares = { biceps_long: 0.5, biceps_short: 0.5, brachialis: 0.5, forearm_flexors: 0.25 }
const PULLDOWN: MuscleShares = { lats: 1, ...ELBOW_FLEXORS, traps_mid: 0.5, rear_delts: 0.25 }
const ROW: MuscleShares = { traps_mid: 1, lats: 1, rear_delts: 0.5, ...ELBOW_FLEXORS, lower_back: 0.1 }
const SQUAT: MuscleShares = {
  vastus_lateralis: 1,
  vastus_medialis: 1,
  glute_max: 1,
  adductors: 1,
  rectus_femoris: 0.25,
  lower_back: 0.25,
  hamstrings_lateral: 0.1,
  hamstrings_medial: 0.1,
  glute_med: 0.1,
  abs: 0.1,
}
const LUNGE: MuscleShares = {
  vastus_lateralis: 1,
  vastus_medialis: 1,
  glute_max: 1,
  adductors: 0.5,
  rectus_femoris: 0.25,
  glute_med: 0.25,
  hamstrings_lateral: 0.1,
  hamstrings_medial: 0.1,
}
const LEG_CURL: MuscleShares = { hamstrings_lateral: 1, hamstrings_medial: 1, gastrocnemius: 0.25 }
const OVERHEAD: MuscleShares = {
  front_delts: 1,
  side_delts: 0.5,
  ...TRICEPS_PRESS,
  traps_upper: 0.25,
  chest_upper: 0.25,
}
const LATERAL: MuscleShares = { side_delts: 1, traps_upper: 0.25, front_delts: 0.1 }
const REAR: MuscleShares = { rear_delts: 1, traps_mid: 0.5 }
const CURL: MuscleShares = { biceps_long: 1, biceps_short: 1, brachialis: 0.5, forearm_flexors: 0.25 }
const PREACHER: MuscleShares = { biceps_short: 1, biceps_long: 0.75, brachialis: 0.75, forearm_flexors: 0.25 }
const PUSHDOWN: MuscleShares = { triceps_lateral: 1, triceps_medial: 1, triceps_long: 0.5 }
const CRUNCH: MuscleShares = { abs: 1, obliques: 0.25 }

export const BUILTIN_MUSCLES: Record<string, MuscleShares> = {
  bench_press: FLAT_PRESS,
  db_bench_press: FLAT_PRESS,
  chest_press_machine: FLAT_PRESS,
  incline_bench_press: INCLINE_PRESS,
  incline_db_press: INCLINE_PRESS,
  incline_chest_press_machine: INCLINE_PRESS,
  push_up: { ...FLAT_PRESS, abs: 0.1 },
  butterfly: FLY,
  cable_fly: FLY,
  pec_fly_db: FLY,
  dips: {
    triceps_lateral: 1,
    triceps_medial: 1,
    triceps_long: 0.75,
    chest_lower: 1,
    chest_upper: 0.25,
    front_delts: 0.5,
  },

  deadlift: {
    glute_max: 1,
    lower_back: 1,
    hamstrings_lateral: 0.5,
    hamstrings_medial: 0.5,
    adductors: 0.5,
    vastus_lateralis: 0.5,
    vastus_medialis: 0.5,
    rectus_femoris: 0.25,
    traps_upper: 0.5,
    traps_mid: 0.25,
    lats: 0.25,
    forearm_flexors: 0.5,
    abs: 0.1,
  },
  romanian_deadlift: {
    hamstrings_lateral: 1,
    hamstrings_medial: 1,
    glute_max: 1,
    lower_back: 0.5,
    adductors: 0.5,
    forearm_flexors: 0.25,
    traps_upper: 0.1,
  },
  back_extension: { lower_back: 1, glute_max: 0.5, hamstrings_lateral: 0.5, hamstrings_medial: 0.5 },
  seated_row: ROW,
  db_row: ROW,
  row_machine: ROW,
  barbell_row: { ...ROW, lower_back: 0.5, glute_max: 0.1, hamstrings_lateral: 0.1, hamstrings_medial: 0.1 },
  lat_pulldown: PULLDOWN,
  close_grip_pulldown: { ...PULLDOWN, brachialis: 0.75 },
  pull_up: { ...PULLDOWN, forearm_flexors: 0.5, abs: 0.1 },
  assisted_pull_up: PULLDOWN,

  squat: SQUAT,
  goblet_squat: { ...SQUAT, abs: 0.25 },
  hack_squat: {
    vastus_lateralis: 1,
    vastus_medialis: 1,
    rectus_femoris: 0.25,
    glute_max: 0.5,
    adductors: 0.5,
    hamstrings_lateral: 0.1,
    hamstrings_medial: 0.1,
  },
  leg_press: {
    vastus_lateralis: 1,
    vastus_medialis: 1,
    rectus_femoris: 0.25,
    glute_max: 0.5,
    adductors: 0.5,
    hamstrings_lateral: 0.1,
    hamstrings_medial: 0.1,
  },
  lunge: LUNGE,
  bulgarian_split_squat: LUNGE,
  leg_extension: { rectus_femoris: 1, vastus_lateralis: 1, vastus_medialis: 1 },
  leg_curl: LEG_CURL,
  lying_leg_curl: LEG_CURL,
  hip_thrust: {
    glute_max: 1,
    glute_med: 0.25,
    hamstrings_lateral: 0.25,
    hamstrings_medial: 0.25,
    vastus_lateralis: 0.25,
    vastus_medialis: 0.25,
    adductors: 0.25,
  },
  glute_kickback: { glute_max: 1, glute_med: 0.25, hamstrings_lateral: 0.25, hamstrings_medial: 0.25 },
  glute_kickback_machine: { glute_max: 1, hamstrings_lateral: 0.25, hamstrings_medial: 0.25, glute_med: 0.1 },
  abductor: { glute_med: 1, glute_max: 0.5 },
  adductor: { adductors: 1 },
  calf_raise: { gastrocnemius: 1, soleus: 0.5 },
  seated_calf_raise: { soleus: 1, gastrocnemius: 0.25 },

  overhead_press: { ...OVERHEAD, abs: 0.1 },
  db_shoulder_press: OVERHEAD,
  shoulder_press_machine: OVERHEAD,
  lateral_raise: LATERAL,
  lateral_raise_machine: LATERAL,
  cable_lateral_raise: LATERAL,
  reverse_fly: REAR,
  face_pull: { ...REAR, side_delts: 0.25, traps_upper: 0.25 },

  biceps_curl: CURL,
  barbell_curl: CURL,
  cable_curl: CURL,
  preacher_curl: PREACHER,
  biceps_curl_machine: PREACHER,
  hammer_curl: { brachialis: 1, forearm_extensors: 1, biceps_long: 0.5, biceps_short: 0.25 },
  triceps_pushdown: PUSHDOWN,
  triceps_machine: PUSHDOWN,
  skull_crusher: { triceps_long: 1, triceps_lateral: 1, triceps_medial: 1 },
  overhead_triceps_extension: { triceps_long: 1, triceps_lateral: 0.75, triceps_medial: 0.75 },

  crunch: CRUNCH,
  cable_crunch: CRUNCH,
  ab_machine: CRUNCH,
  plank: { abs: 1, obliques: 0.5, front_delts: 0.1, glute_max: 0.1 },
  hanging_leg_raise: { abs: 1, obliques: 0.5, rectus_femoris: 0.25, forearm_flexors: 0.25, lats: 0.1 },
  leg_raise: { abs: 1, obliques: 0.25, rectus_femoris: 0.25 },
  russian_twist: { obliques: 1, abs: 0.5 },
}

/** Best guess for custom exercises, from their category. */
const GROUP_MUSCLES: Record<MuscleGroup, MuscleShares> = {
  chest: FLAT_PRESS,
  back: ROW,
  legs: { ...SQUAT, hamstrings_lateral: 0.5, hamstrings_medial: 0.5 },
  shoulders: OVERHEAD,
  arms: {
    biceps_long: 0.5,
    biceps_short: 0.5,
    brachialis: 0.25,
    triceps_long: 0.5,
    triceps_lateral: 0.5,
    triceps_medial: 0.5,
  },
  core: CRUNCH,
  cardio: {},
  other: {},
}

export const exerciseMuscles = (e: Exercise): MuscleShares =>
  (e.builtin && e.group !== 'cardio' && BUILTIN_MUSCLES[e.builtin]) || GROUP_MUSCLES[e.group]
