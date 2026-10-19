/**
 * Technique tips for the built-in exercises, in English and German.
 * Loaded on demand (dynamic import) so it does not grow the main bundle.
 *
 * The cues follow the references in SOURCES; each exercise lists the ones it builds on.
 */
export type SourceId = 'nsca' | 'essentials' | 'acsm' | 'mcgill' | 'schoenfeld' | 'contreras' | 'bini' | 'concept2'

export const SOURCES: Record<SourceId, string> = {
  nsca: 'NSCA – Exercise Technique Manual for Resistance Training, 3rd ed. Human Kinetics, 2016.',
  essentials:
    'Haff & Triplett (eds.), NSCA – Essentials of Strength Training and Conditioning, 4th ed. Human Kinetics, 2016.',
  acsm: "ACSM's Guidelines for Exercise Testing and Prescription, 12th ed. Wolters Kluwer, 2025.",
  mcgill: 'McGill, Low Back Disorders: Evidence-Based Prevention and Rehabilitation, 3rd ed. Human Kinetics, 2016.',
  schoenfeld:
    'Schoenfeld, Squatting kinematics and kinetics and their application to exercise performance. J Strength Cond Res 24(12), 2010.',
  contreras:
    'Contreras et al., A comparison of gluteus maximus, biceps femoris and vastus lateralis EMG activity in the back squat and barbell hip thrust. J Appl Biomech 31(6), 2015.',
  bini: 'Bini, Hume & Croft, Effects of bicycle saddle height on knee injury risk and cycling performance. Sports Med 41(6), 2011.',
  concept2: 'Concept2, Indoor rowing technique guide (catch, drive, finish, recovery).',
}

export interface Tips {
  /** Machine settings and start position. */
  setup: string[]
  /** The movement itself. */
  how: string[]
  /** Where you should feel it. */
  feel: string
  /** Common mistakes. */
  avoid: string[]
}

export interface ExerciseTips {
  src: SourceId[]
  en: Tips
  de: Tips
}

const FREE: SourceId[] = ['nsca', 'essentials']

export const TIPS: Record<string, ExerciseTips> = {
  // ---------- Chest ----------
  bench_press: {
    src: FREE,
    en: {
      setup: [
        'Lie down with your eyes under the bar. Feet flat on the floor; glutes, upper back and head stay on the bench.',
        'Grip slightly wider than shoulder width, thumbs wrapped around the bar.',
        'Pull your shoulder blades back and down before you unrack.',
      ],
      how: [
        'Lower the bar under control to the lower chest (about nipple height); forearms stay vertical.',
        'Press up and slightly back towards the shoulders until your arms are straight.',
        'Breathe out through the hardest part. Use a spotter or safety bars for heavy sets.',
      ],
      feel: 'Mainly the chest; front shoulders and triceps help.',
      avoid: ['Bouncing the bar off the chest', 'Lifting the hips off the bench', 'Elbows flared straight out to the sides'],
    },
    de: {
      setup: [
        'Leg dich so hin, dass deine Augen unter der Stange sind. Füße flach am Boden; Po, oberer Rücken und Kopf bleiben auf der Bank.',
        'Griff etwas weiter als schulterbreit, Daumen umschließen die Stange.',
        'Zieh die Schulterblätter nach hinten unten, bevor du die Stange aushebst.',
      ],
      how: [
        'Senke die Stange kontrolliert zur unteren Brust (etwa Höhe Brustwarzen); die Unterarme bleiben senkrecht.',
        'Drück nach oben und leicht Richtung Schultern, bis die Arme gestreckt sind.',
        'In der schwersten Phase ausatmen. Bei schweren Sätzen mit Sicherung (Partner oder Ablagen).',
      ],
      feel: 'Vor allem die Brust; vordere Schulter und Trizeps helfen mit.',
      avoid: ['Stange von der Brust abfedern', 'Po von der Bank heben', 'Ellbogen weit zur Seite abspreizen'],
    },
  },
  db_bench_press: {
    src: FREE,
    en: {
      setup: [
        'Sit on the end of the bench with the dumbbells on your thighs, then lie back and bring them to chest level.',
        'Feet flat, shoulder blades pulled back and down, palms facing forward.',
      ],
      how: [
        'Press up and slightly together until your arms are straight above the chest.',
        'Lower slowly until the dumbbells are about level with the chest and you feel a stretch.',
        'Keep the forearms vertical throughout.',
      ],
      feel: 'Chest, with front shoulders and triceps helping. Dumbbells allow a little more stretch than a barbell.',
      avoid: ['Clanking the dumbbells together at the top', 'Letting the elbows drop far below the bench', 'Arching off the bench'],
    },
    de: {
      setup: [
        'Setz dich ans Bankende, Kurzhanteln auf den Oberschenkeln, dann zurücklegen und die Hanteln auf Brusthöhe bringen.',
        'Füße flach, Schulterblätter nach hinten unten, Handflächen zeigen nach vorne.',
      ],
      how: [
        'Drück nach oben und leicht zusammen, bis die Arme über der Brust gestreckt sind.',
        'Langsam absenken, bis die Hanteln etwa auf Brusthöhe sind und du eine Dehnung spürst.',
        'Unterarme bleiben die ganze Zeit senkrecht.',
      ],
      feel: 'Brust, vordere Schulter und Trizeps helfen. Kurzhanteln erlauben etwas mehr Dehnung als die Langhantel.',
      avoid: ['Hanteln oben aneinanderschlagen', 'Ellbogen weit unter die Bank fallen lassen', 'Rücken von der Bank heben'],
    },
  },
  incline_bench_press: {
    src: FREE,
    en: {
      setup: [
        'Set the bench to about 30–45°. Eyes under the bar, feet flat, shoulder blades back and down.',
        'Grip slightly wider than shoulder width.',
      ],
      how: [
        'Lower the bar to the upper chest, just below the collarbones.',
        'Press straight up until the arms are straight above the shoulders.',
      ],
      feel: 'Upper chest and front shoulders, triceps help.',
      avoid: ['Bench too steep (turns it into a shoulder press)', 'Bouncing off the chest', 'Lifting the hips'],
    },
    de: {
      setup: [
        'Bank auf etwa 30–45° stellen. Augen unter der Stange, Füße flach, Schulterblätter nach hinten unten.',
        'Griff etwas weiter als schulterbreit.',
      ],
      how: [
        'Senke die Stange zur oberen Brust, knapp unter die Schlüsselbeine.',
        'Gerade nach oben drücken, bis die Arme über den Schultern gestreckt sind.',
      ],
      feel: 'Obere Brust und vordere Schulter, der Trizeps hilft.',
      avoid: ['Bank zu steil (wird zum Schulterdrücken)', 'Von der Brust abfedern', 'Po anheben'],
    },
  },
  incline_db_press: {
    src: FREE,
    en: {
      setup: ['Set the bench to about 30–45°. Start with the dumbbells at upper-chest level, palms forward.', 'Back and head on the bench, feet flat.'],
      how: [
        'Press up and slightly together until the arms are straight above the shoulders.',
        'Lower slowly to upper-chest level, forearms vertical.',
      ],
      feel: 'Upper chest and front shoulders, triceps help.',
      avoid: ['Bench too steep', 'Elbows flared straight out', 'Shortening the range when it gets hard'],
    },
    de: {
      setup: ['Bank auf etwa 30–45° stellen. Start mit den Hanteln auf Höhe der oberen Brust, Handflächen nach vorne.', 'Rücken und Kopf auf der Bank, Füße flach.'],
      how: [
        'Nach oben und leicht zusammen drücken, bis die Arme über den Schultern gestreckt sind.',
        'Langsam bis auf Höhe der oberen Brust absenken, Unterarme senkrecht.',
      ],
      feel: 'Obere Brust und vordere Schulter, der Trizeps hilft.',
      avoid: ['Bank zu steil', 'Ellbogen weit zur Seite', 'Bewegung verkürzen, wenn es schwer wird'],
    },
  },
  chest_press_machine: {
    src: FREE,
    en: {
      setup: [
        'Adjust the seat so the handles are at mid-chest height.',
        'Back and head against the pad, feet flat on the floor.',
      ],
      how: [
        'Press forward until the arms are almost straight.',
        'Return slowly until you feel a stretch in the chest, without letting the weight stack touch down.',
      ],
      feel: 'Chest, front shoulders and triceps help.',
      avoid: ['Seat too low or high (handles at neck or belly)', 'Shoulders rolling forward at the end', 'Locking the elbows hard'],
    },
    de: {
      setup: ['Sitz so einstellen, dass die Griffe auf Höhe der mittleren Brust sind.', 'Rücken und Kopf am Polster, Füße flach am Boden.'],
      how: [
        'Nach vorne drücken, bis die Arme fast gestreckt sind.',
        'Langsam zurück, bis du eine Dehnung in der Brust spürst, ohne die Gewichte abzulegen.',
      ],
      feel: 'Brust, vordere Schulter und Trizeps helfen.',
      avoid: ['Sitz zu tief oder hoch (Griffe auf Hals- oder Bauchhöhe)', 'Schultern am Ende nach vorne rollen', 'Ellbogen hart durchdrücken'],
    },
  },
  incline_chest_press_machine: {
    src: FREE,
    en: {
      setup: ['Adjust the seat so the handles start at upper-chest height.', 'Back against the pad, shoulder blades pulled back.'],
      how: ['Press up and forward until the arms are almost straight.', 'Return slowly into a stretch without the stack touching down.'],
      feel: 'Upper chest and front shoulders, triceps help.',
      avoid: ['Shoulders shrugging towards the ears', 'Back arching off the pad', 'Locking the elbows hard'],
    },
    de: {
      setup: ['Sitz so einstellen, dass die Griffe auf Höhe der oberen Brust starten.', 'Rücken am Polster, Schulterblätter nach hinten gezogen.'],
      how: ['Nach oben vorne drücken, bis die Arme fast gestreckt sind.', 'Langsam zurück in die Dehnung, ohne die Gewichte abzulegen.'],
      feel: 'Obere Brust und vordere Schulter, der Trizeps hilft.',
      avoid: ['Schultern zu den Ohren ziehen', 'Rücken vom Polster lösen', 'Ellbogen hart durchdrücken'],
    },
  },
  butterfly: {
    src: FREE,
    en: {
      setup: [
        'Adjust the seat so the handles or pads are at chest height and the upper arms are about parallel to the floor.',
        'Set the start position so you feel a stretch without the arms going behind the body.',
      ],
      how: [
        'Bring the handles together in a wide arc; keep the slight bend in the elbows the same.',
        'Squeeze for a moment in front of the chest, then open slowly.',
      ],
      feel: 'Chest, especially when the arms close in front of you.',
      avoid: ['Pushing with the hands like a press', 'Letting the weight pull the arms too far back', 'Swinging'],
    },
    de: {
      setup: [
        'Sitz so einstellen, dass Griffe bzw. Polster auf Brusthöhe sind und die Oberarme etwa parallel zum Boden.',
        'Startposition so wählen, dass du eine Dehnung spürst, die Arme aber nicht hinter den Körper gehen.',
      ],
      how: [
        'Führe die Griffe in einem weiten Bogen zusammen; die leichte Beugung im Ellbogen bleibt gleich.',
        'Kurz vor der Brust zusammendrücken, dann langsam öffnen.',
      ],
      feel: 'Brust, vor allem wenn sich die Arme vor dir schließen.',
      avoid: ['Mit den Händen drücken wie beim Bankdrücken', 'Arme vom Gewicht zu weit nach hinten ziehen lassen', 'Schwung holen'],
    },
  },
  cable_fly: {
    src: FREE,
    en: {
      setup: [
        'Set both pulleys at about shoulder height. Take a step forward into a split stance.',
        'Arms out to the sides with a slight bend in the elbows, chest up.',
      ],
      how: [
        'Bring the hands together in front of the chest in a wide arc, like hugging a tree.',
        'Return slowly until you feel a stretch, with the arms in line with the body.',
      ],
      feel: 'Chest; the cable keeps tension on it through the whole movement.',
      avoid: ['Bending and straightening the elbows (turns it into a press)', 'Leaning far forward', 'Arms going far behind the body'],
    },
    de: {
      setup: [
        'Beide Seilzüge auf etwa Schulterhöhe stellen. Einen Schritt nach vorne in Schrittstellung.',
        'Arme seitlich, Ellbogen leicht gebeugt, Brust raus.',
      ],
      how: [
        'Führe die Hände in einem weiten Bogen vor der Brust zusammen, als würdest du einen Baum umarmen.',
        'Langsam zurück, bis du eine Dehnung spürst und die Arme auf Höhe des Körpers sind.',
      ],
      feel: 'Brust; der Seilzug hält die Spannung über die ganze Bewegung.',
      avoid: ['Ellbogen beugen und strecken (wird zum Drücken)', 'Weit nach vorne lehnen', 'Arme weit hinter den Körper'],
    },
  },
  pec_fly_db: {
    src: FREE,
    en: {
      setup: ['Lie on a flat bench, dumbbells above the chest, palms facing each other.', 'Slight bend in the elbows; keep it fixed.'],
      how: [
        'Lower the dumbbells out to the sides in a wide arc until the upper arms are about level with the bench.',
        'Bring them back up along the same arc and squeeze the chest.',
      ],
      feel: 'Chest, with a strong stretch at the bottom.',
      avoid: ['Lowering below bench level', 'Using heavy weight and turning it into a press', 'Straight, locked arms'],
    },
    de: {
      setup: ['Auf eine Flachbank legen, Kurzhanteln über der Brust, Handflächen zeigen zueinander.', 'Ellbogen leicht gebeugt und so lassen.'],
      how: [
        'Hanteln in einem weiten Bogen seitlich absenken, bis die Oberarme etwa auf Höhe der Bank sind.',
        'Auf demselben Bogen zurückführen und die Brust zusammendrücken.',
      ],
      feel: 'Brust, unten mit deutlicher Dehnung.',
      avoid: ['Tiefer als die Bank absenken', 'Zu schwer, sodass es zum Drücken wird', 'Arme komplett gestreckt'],
    },
  },
  push_up: {
    src: FREE,
    en: {
      setup: ['Hands slightly wider than shoulder width, under the chest.', 'Body in a straight line from head to heels; tense abs and glutes.'],
      how: [
        'Lower until the chest is just above the floor, elbows at about 45° to the body.',
        'Push back up until the arms are straight. Too hard? Put your hands on a bench.',
      ],
      feel: 'Chest, triceps and front shoulders; the abs keep the body straight.',
      avoid: ['Hips sagging or sticking up', 'Only going halfway down', 'Head hanging'],
    },
    de: {
      setup: ['Hände etwas weiter als schulterbreit, unter der Brust.', 'Körper gerade von Kopf bis Ferse; Bauch und Po anspannen.'],
      how: [
        'Absenken, bis die Brust knapp über dem Boden ist, Ellbogen etwa 45° vom Körper.',
        'Hochdrücken, bis die Arme gestreckt sind. Zu schwer? Hände auf eine Bank stellen.',
      ],
      feel: 'Brust, Trizeps und vordere Schulter; der Bauch hält den Körper gerade.',
      avoid: ['Hüfte hängt durch oder ragt nach oben', 'Nur halb runter', 'Kopf hängen lassen'],
    },
  },

  // ---------- Back ----------
  deadlift: {
    src: FREE,
    en: {
      setup: [
        'Bar over the middle of the foot, feet about hip-width apart, grip just outside the knees.',
        'Hips lower than shoulders, back flat, chest up, shoulders slightly in front of the bar.',
      ],
      how: [
        'Breathe in, brace, and push the floor away. The bar stays close to the legs.',
        'Hips and shoulders rise together; stand tall at the top.',
        'Lower by pushing the hips back first, then bending the knees once the bar passes them.',
      ],
      feel: 'Glutes, hamstrings and the muscles along the spine; grip and upper back hold the bar.',
      avoid: ['Rounding the lower back', 'Bar drifting away from the legs', 'Leaning back at the top'],
    },
    de: {
      setup: [
        'Stange über der Fußmitte, Füße etwa hüftbreit, Griff knapp außerhalb der Knie.',
        'Hüfte tiefer als die Schultern, Rücken gerade, Brust raus, Schultern leicht vor der Stange.',
      ],
      how: [
        'Einatmen, Rumpf anspannen und den Boden wegdrücken. Die Stange bleibt nah an den Beinen.',
        'Hüfte und Schultern steigen gleichzeitig; oben aufrecht stehen.',
        'Zum Absenken zuerst die Hüfte nach hinten schieben, Knie beugen, sobald die Stange sie passiert hat.',
      ],
      feel: 'Po, Beinbeuger und Rückenstrecker; Griff und oberer Rücken halten die Stange.',
      avoid: ['Unteren Rücken rund machen', 'Stange vom Körper weg wandern lassen', 'Oben nach hinten lehnen'],
    },
  },
  romanian_deadlift: {
    src: FREE,
    en: {
      setup: ['Stand tall holding the bar, grip about shoulder width, knees slightly bent.', 'Shoulder blades back, back flat.'],
      how: [
        'Push the hips back; the bar slides down along the thighs. The knees stay at the same slight bend.',
        'Go down until you feel a strong stretch in the hamstrings, usually just below the knees.',
        'Stand up by driving the hips forward.',
      ],
      feel: 'Hamstrings and glutes; the lower back holds the position.',
      avoid: ['Rounding the back to get lower', 'Turning it into a squat', 'Bar away from the legs'],
    },
    de: {
      setup: ['Aufrecht mit der Stange stehen, Griff etwa schulterbreit, Knie leicht gebeugt.', 'Schulterblätter zurück, Rücken gerade.'],
      how: [
        'Hüfte nach hinten schieben; die Stange gleitet an den Oberschenkeln entlang. Die Knie bleiben gleich leicht gebeugt.',
        'Runter, bis du eine deutliche Dehnung in den Beinbeugern spürst, meist knapp unter den Knien.',
        'Durch das Nach-vorne-Schieben der Hüfte aufrichten.',
      ],
      feel: 'Beinbeuger und Po; der untere Rücken hält die Position.',
      avoid: ['Rücken rund machen, um tiefer zu kommen', 'In die Kniebeuge rutschen', 'Stange weg von den Beinen'],
    },
  },
  lat_pulldown: {
    src: FREE,
    en: {
      setup: [
        'Adjust the thigh pad so your legs are locked firmly under it.',
        'Overhand grip, slightly wider than shoulder width.',
      ],
      how: [
        'Lean back slightly and pull the bar to the upper chest, elbows down and back.',
        'Let the bar go back up slowly until the arms are straight and you feel the stretch in the lats.',
      ],
      feel: 'Lats (sides of the back); biceps and upper back help.',
      avoid: ['Pulling behind the neck', 'Leaning far back and swinging', 'Pulling only with the arms'],
    },
    de: {
      setup: ['Oberschenkelpolster so einstellen, dass deine Beine fest darunter fixiert sind.', 'Obergriff, etwas weiter als schulterbreit.'],
      how: [
        'Leicht zurücklehnen und die Stange zur oberen Brust ziehen, Ellbogen nach unten hinten.',
        'Stange langsam hochlassen, bis die Arme gestreckt sind und du die Dehnung im Latissimus spürst.',
      ],
      feel: 'Latissimus (seitlicher Rücken); Bizeps und oberer Rücken helfen.',
      avoid: ['In den Nacken ziehen', 'Weit zurücklehnen und Schwung holen', 'Nur mit den Armen ziehen'],
    },
  },
  close_grip_pulldown: {
    src: FREE,
    en: {
      setup: ['Attach a V-handle. Thigh pad set so your legs are locked in.', 'Palms facing each other, arms straight.'],
      how: [
        'Lean back slightly and pull the handle to the lower chest, elbows close to the body.',
        'Return slowly until the arms are straight.',
      ],
      feel: 'Lats, with more focus on the lower part; biceps help.',
      avoid: ['Rocking the upper body', 'Shrugging the shoulders', 'Short, fast reps'],
    },
    de: {
      setup: ['V-Griff einhängen. Oberschenkelpolster so einstellen, dass die Beine fixiert sind.', 'Handflächen zeigen zueinander, Arme gestreckt.'],
      how: ['Leicht zurücklehnen und den Griff zur unteren Brust ziehen, Ellbogen nah am Körper.', 'Langsam zurück, bis die Arme gestreckt sind.'],
      feel: 'Latissimus, eher der untere Teil; der Bizeps hilft.',
      avoid: ['Oberkörper vor und zurück schaukeln', 'Schultern hochziehen', 'Kurze, schnelle Wiederholungen'],
    },
  },
  seated_row: {
    src: FREE,
    en: {
      setup: ['Feet on the platform, knees slightly bent, upper body upright.', 'Arms straight in front, back flat.'],
      how: [
        'Pull the handle to the lower ribs, squeeze the shoulder blades together.',
        'Return until the arms are straight and let the shoulders reach forward a little; the upper body stays upright.',
      ],
      feel: 'Middle and upper back plus lats; biceps help.',
      avoid: ['Rocking the upper body back and forth', 'Rounded back', 'Shrugging the shoulders'],
    },
    de: {
      setup: ['Füße auf die Plattform, Knie leicht gebeugt, Oberkörper aufrecht.', 'Arme gestreckt nach vorne, Rücken gerade.'],
      how: [
        'Griff zu den unteren Rippen ziehen, Schulterblätter zusammendrücken.',
        'Zurück, bis die Arme gestreckt sind, Schultern dürfen leicht nach vorne; der Oberkörper bleibt aufrecht.',
      ],
      feel: 'Mittlerer und oberer Rücken sowie Latissimus; der Bizeps hilft.',
      avoid: ['Oberkörper vor und zurück schaukeln', 'Runder Rücken', 'Schultern hochziehen'],
    },
  },
  row_machine: {
    src: FREE,
    en: {
      setup: [
        'Adjust the chest pad so you can just reach the handles with straight arms.',
        'Adjust the seat so the handles are at about lower-chest height.',
      ],
      how: ['Pull the handles back, elbows past the body, squeeze the shoulder blades.', 'Return slowly; the chest stays on the pad.'],
      feel: 'Middle and upper back plus lats; biceps help.',
      avoid: ['Chest leaving the pad', 'Shrugging', 'Letting the weight slam down'],
    },
    de: {
      setup: [
        'Brustpolster so einstellen, dass du die Griffe mit gestreckten Armen gerade erreichst.',
        'Sitz so einstellen, dass die Griffe etwa auf Höhe der unteren Brust sind.',
      ],
      how: ['Griffe nach hinten ziehen, Ellbogen am Körper vorbei, Schulterblätter zusammen.', 'Langsam zurück; die Brust bleibt am Polster.'],
      feel: 'Mittlerer und oberer Rücken sowie Latissimus; der Bizeps hilft.',
      avoid: ['Brust vom Polster lösen', 'Schultern hochziehen', 'Gewichte zurückknallen lassen'],
    },
  },
  barbell_row: {
    src: FREE,
    en: {
      setup: [
        'Bar over the middle of the foot, overhand grip slightly wider than shoulder width.',
        'Hinge at the hips until the upper body is about 45° or lower, back flat, knees slightly bent.',
      ],
      how: ['Pull the bar to the lower chest or upper belly, elbows back.', 'Lower under control until the arms are straight; the upper body stays still.'],
      feel: 'Middle and upper back plus lats; the lower back holds the position.',
      avoid: ['Rounding the lower back', 'Standing up a bit more with every rep', 'Jerking the weight up'],
    },
    de: {
      setup: [
        'Stange über der Fußmitte, Obergriff etwas weiter als schulterbreit.',
        'In der Hüfte nach vorne beugen, bis der Oberkörper etwa 45° oder flacher ist, Rücken gerade, Knie leicht gebeugt.',
      ],
      how: ['Stange zur unteren Brust oder zum oberen Bauch ziehen, Ellbogen nach hinten.', 'Kontrolliert absenken, bis die Arme gestreckt sind; der Oberkörper bleibt ruhig.'],
      feel: 'Mittlerer und oberer Rücken sowie Latissimus; der untere Rücken hält die Position.',
      avoid: ['Unteren Rücken rund machen', 'Mit jeder Wiederholung weiter aufrichten', 'Gewicht hochreißen'],
    },
  },
  db_row: {
    src: FREE,
    en: {
      setup: ['One knee and the same-side hand on a bench, back flat and roughly parallel to the floor.', 'Dumbbell hanging under the shoulder.'],
      how: ['Pull the dumbbell towards the hip, elbow close to the body.', 'Lower slowly until the arm is straight and the shoulder stretches down.'],
      feel: 'Lats and upper back on the working side; biceps help.',
      avoid: ['Twisting the upper body open', 'Pulling to the chest instead of the hip', 'Rounded back'],
    },
    de: {
      setup: ['Ein Knie und die Hand derselben Seite auf eine Bank, Rücken gerade und etwa parallel zum Boden.', 'Kurzhantel hängt unter der Schulter.'],
      how: ['Hantel Richtung Hüfte ziehen, Ellbogen nah am Körper.', 'Langsam absenken, bis der Arm gestreckt ist und die Schulter nach unten dehnt.'],
      feel: 'Latissimus und oberer Rücken der arbeitenden Seite; der Bizeps hilft.',
      avoid: ['Oberkörper aufdrehen', 'Zur Brust statt zur Hüfte ziehen', 'Runder Rücken'],
    },
  },
  pull_up: {
    src: FREE,
    en: {
      setup: ['Overhand grip slightly wider than shoulder width. Hang with straight arms.', 'Tense the abs, legs still.'],
      how: [
        'Pull the chest towards the bar until the chin is over it, elbows down towards the ribs.',
        'Lower under control until the arms are straight again.',
      ],
      feel: 'Lats; biceps and upper back help.',
      avoid: ['Swinging or kicking', 'Half reps', 'Dropping fast at the bottom'],
    },
    de: {
      setup: ['Obergriff etwas weiter als schulterbreit. Mit gestreckten Armen hängen.', 'Bauch anspannen, Beine ruhig.'],
      how: [
        'Brust zur Stange ziehen, bis das Kinn darüber ist, Ellbogen nach unten zu den Rippen.',
        'Kontrolliert absenken, bis die Arme wieder gestreckt sind.',
      ],
      feel: 'Latissimus; Bizeps und oberer Rücken helfen.',
      avoid: ['Schwung holen oder strampeln', 'Halbe Wiederholungen', 'Unten fallen lassen'],
    },
  },
  assisted_pull_up: {
    src: FREE,
    en: {
      setup: [
        'Choose the counterweight: more weight = more help. Kneel or stand on the pad.',
        'Overhand grip slightly wider than shoulder width.',
      ],
      how: ['Pull up until the chin is over the handles, elbows down to the ribs.', 'Lower slowly to straight arms. Over time, reduce the assistance.'],
      feel: 'Lats; biceps and upper back help.',
      avoid: ['Bouncing off the pad at the bottom', 'Shrugging the shoulders', 'Half reps'],
    },
    de: {
      setup: ['Gegengewicht wählen: mehr Gewicht = mehr Hilfe. Auf das Polster knien oder stellen.', 'Obergriff etwas weiter als schulterbreit.'],
      how: ['Hochziehen, bis das Kinn über den Griffen ist, Ellbogen nach unten zu den Rippen.', 'Langsam bis zu gestreckten Armen absenken. Mit der Zeit die Hilfe verringern.'],
      feel: 'Latissimus; Bizeps und oberer Rücken helfen.',
      avoid: ['Unten vom Polster abfedern', 'Schultern hochziehen', 'Halbe Wiederholungen'],
    },
  },
  back_extension: {
    src: ['nsca', 'mcgill'],
    en: {
      setup: [
        'Set the pad just below the hip bones so you can bend at the hips. Heels under the foot pads.',
        'Arms crossed on the chest.',
      ],
      how: ['Lower the upper body with a flat back until you feel the stretch in the hamstrings.', 'Rise until the body is in a straight line, and no further.'],
      feel: 'Lower back, glutes and hamstrings.',
      avoid: ['Arching back past a straight line at the top', 'Swinging up fast', 'Pad too high, so you bend in the spine instead of the hips'],
    },
    de: {
      setup: [
        'Polster knapp unter die Hüftknochen stellen, damit du in der Hüfte beugen kannst. Fersen unter die Fußpolster.',
        'Arme vor der Brust verschränken.',
      ],
      how: ['Oberkörper mit geradem Rücken absenken, bis du die Dehnung in den Beinbeugern spürst.', 'Aufrichten, bis der Körper eine gerade Linie bildet, nicht weiter.'],
      feel: 'Unterer Rücken, Po und Beinbeuger.',
      avoid: ['Oben ins Hohlkreuz gehen', 'Mit Schwung hochkommen', 'Polster zu hoch, sodass du im Rücken statt in der Hüfte beugst'],
    },
  },

  // ---------- Legs ----------
  squat: {
    src: ['nsca', 'essentials', 'schoenfeld'],
    en: {
      setup: [
        'Bar on the upper back (on the muscle, not the neck). Set the safety bars just below the lowest point of your squat.',
        'Feet shoulder width or a little wider, toes turned slightly out.',
      ],
      how: [
        'Breathe in and brace, then sit down between your hips. Knees follow the direction of the toes; they may move past the toes.',
        'Go as deep as you can with a flat back, ideally thighs at least parallel to the floor.',
        'Push up through the whole foot; hips and chest rise together.',
      ],
      feel: 'Quads and glutes; adductors help, the back holds the position.',
      avoid: ['Knees caving inwards', 'Heels lifting off the floor', 'Lower back rounding at the bottom'],
    },
    de: {
      setup: [
        'Stange auf dem oberen Rücken (auf dem Muskel, nicht auf dem Nacken). Sicherungsablagen knapp unter deinen tiefsten Punkt stellen.',
        'Füße schulterbreit oder etwas weiter, Zehen leicht nach außen.',
      ],
      how: [
        'Einatmen, Rumpf anspannen, dann zwischen die Hüften setzen. Die Knie folgen der Richtung der Zehen; sie dürfen über die Zehen hinaus.',
        'So tief, wie es mit geradem Rücken geht, idealerweise Oberschenkel mindestens parallel zum Boden.',
        'Über den ganzen Fuß hochdrücken; Hüfte und Brust steigen gleichzeitig.',
      ],
      feel: 'Quadrizeps und Po; Adduktoren helfen, der Rücken hält die Position.',
      avoid: ['Knie fallen nach innen', 'Fersen heben ab', 'Unterer Rücken rundet sich unten'],
    },
  },
  goblet_squat: {
    src: ['nsca', 'schoenfeld'],
    en: {
      setup: ['Hold a dumbbell upright at the chest, elbows under it.', 'Feet slightly wider than shoulder width, toes slightly out.'],
      how: [
        'Sit down between your hips with an upright upper body; the elbows end up inside the knees.',
        'Push up through the whole foot.',
      ],
      feel: 'Quads and glutes; abs and upper back keep you upright.',
      avoid: ['Knees caving inwards', 'Heels lifting', 'Dumbbell drifting away from the chest'],
    },
    de: {
      setup: ['Kurzhantel aufrecht vor der Brust halten, Ellbogen darunter.', 'Füße etwas weiter als schulterbreit, Zehen leicht nach außen.'],
      how: ['Mit aufrechtem Oberkörper zwischen die Hüften setzen; die Ellbogen landen innen an den Knien.', 'Über den ganzen Fuß hochdrücken.'],
      feel: 'Quadrizeps und Po; Bauch und oberer Rücken halten dich aufrecht.',
      avoid: ['Knie fallen nach innen', 'Fersen heben ab', 'Hantel wandert von der Brust weg'],
    },
  },
  hack_squat: {
    src: FREE,
    en: {
      setup: ['Back and shoulders firmly against the pads.', 'Feet about shoulder width in the middle of the platform.'],
      how: [
        'Release the safety handles and lower until the thighs are at least parallel to the platform.',
        'Push up through the whole foot without locking the knees.',
      ],
      feel: 'Quads, glutes help.',
      avoid: ['Heels lifting', 'Lower back leaving the pad', 'Knees caving inwards'],
    },
    de: {
      setup: ['Rücken und Schultern fest an die Polster.', 'Füße etwa schulterbreit in der Mitte der Plattform.'],
      how: [
        'Sicherungsgriffe lösen und absenken, bis die Oberschenkel mindestens parallel zur Plattform sind.',
        'Über den ganzen Fuß hochdrücken, ohne die Knie durchzudrücken.',
      ],
      feel: 'Quadrizeps, der Po hilft.',
      avoid: ['Fersen heben ab', 'Unterer Rücken löst sich vom Polster', 'Knie fallen nach innen'],
    },
  },
  leg_press: {
    src: FREE,
    en: {
      setup: [
        'Back and hips fully against the pad. Feet hip-width in the middle of the platform.',
        'Set the safety stops before you start.',
      ],
      how: [
        'Lower until the knees are at about 90°, or as deep as you can without the hips rolling off the pad.',
        'Press through the whole foot until the legs are almost straight; do not lock the knees.',
      ],
      feel: 'Quads; glutes and adductors help. Feet higher on the platform shifts more work to the glutes.',
      avoid: ['Hips lifting and the lower back rounding at the bottom', 'Locking the knees at the top', 'Knees caving inwards'],
    },
    de: {
      setup: ['Rücken und Hüfte ganz am Polster. Füße hüftbreit in der Mitte der Plattform.', 'Vor dem Start die Sicherungen einstellen.'],
      how: [
        'Absenken, bis die Knie etwa 90° gebeugt sind, oder so tief, wie es geht, ohne dass die Hüfte vom Polster rollt.',
        'Über den ganzen Fuß drücken, bis die Beine fast gestreckt sind; Knie nicht durchdrücken.',
      ],
      feel: 'Quadrizeps; Po und Adduktoren helfen. Füße weiter oben auf der Plattform gibt dem Po mehr Arbeit.',
      avoid: ['Hüfte hebt ab und der untere Rücken rundet sich', 'Knie oben durchdrücken', 'Knie fallen nach innen'],
    },
  },
  leg_extension: {
    src: FREE,
    en: {
      setup: [
        "Adjust the backrest so your knee joint lines up with the machine's pivot point.",
        'The shin pad sits on the lower shin, just above the ankles. Hold the handles.',
      ],
      how: ['Straighten the legs fully and hold for a moment.', 'Lower slowly, without letting the weight touch down.'],
      feel: 'Front of the thighs (quads).',
      avoid: ['Kicking the weight up with momentum', 'Hips lifting off the seat', 'Knee not aligned with the pivot'],
    },
    de: {
      setup: [
        'Rückenlehne so einstellen, dass dein Kniegelenk auf Höhe der Drehachse der Maschine ist.',
        'Das Polster liegt am unteren Schienbein, knapp über den Knöcheln. Griffe festhalten.',
      ],
      how: ['Beine ganz strecken und kurz halten.', 'Langsam absenken, ohne die Gewichte abzulegen.'],
      feel: 'Vorderseite der Oberschenkel (Quadrizeps).',
      avoid: ['Gewicht mit Schwung hochkicken', 'Po hebt vom Sitz ab', 'Knie nicht auf Höhe der Drehachse'],
    },
  },
  leg_curl: {
    src: FREE,
    en: {
      setup: [
        "Align the knee joint with the machine's pivot point.",
        'Lower pad just above the heels; thigh pad snug on the thighs just above the knees.',
      ],
      how: ['Pull the heels down and back as far as you can, hold briefly.', 'Return slowly until the legs are almost straight.'],
      feel: 'Back of the thighs (hamstrings).',
      avoid: ['Jerking the weight', 'Hips sliding forward on the seat', 'Stopping halfway'],
    },
    de: {
      setup: [
        'Kniegelenk auf Höhe der Drehachse der Maschine bringen.',
        'Unteres Polster knapp über den Fersen; Oberschenkelpolster fest auf den Oberschenkeln, knapp über den Knien.',
      ],
      how: ['Fersen so weit wie möglich nach unten hinten ziehen, kurz halten.', 'Langsam zurück, bis die Beine fast gestreckt sind.'],
      feel: 'Rückseite der Oberschenkel (Beinbeuger).',
      avoid: ['Gewicht ruckartig ziehen', 'Hüfte rutscht auf dem Sitz nach vorne', 'Auf halbem Weg aufhören'],
    },
  },
  lying_leg_curl: {
    src: FREE,
    en: {
      setup: [
        "Lie face down with the knees just off the edge of the pad, in line with the machine's pivot point.",
        'Ankle pad just above the heels. Hold the handles.',
      ],
      how: ['Curl the heels towards the glutes; the hips stay on the bench.', 'Lower slowly until the legs are almost straight.'],
      feel: 'Back of the thighs (hamstrings).',
      avoid: ['Hips lifting off the bench', 'Arching the lower back', 'Swinging the weight'],
    },
    de: {
      setup: [
        'Auf den Bauch legen, die Knie knapp über der Polsterkante, auf Höhe der Drehachse der Maschine.',
        'Fußpolster knapp über den Fersen. Griffe festhalten.',
      ],
      how: ['Fersen zum Po ziehen; die Hüfte bleibt auf der Bank.', 'Langsam absenken, bis die Beine fast gestreckt sind.'],
      feel: 'Rückseite der Oberschenkel (Beinbeuger).',
      avoid: ['Hüfte hebt von der Bank ab', 'Hohlkreuz', 'Gewicht mit Schwung bewegen'],
    },
  },
  lunge: {
    src: FREE,
    en: {
      setup: ['Stand tall, dumbbells at your sides or no weight.', 'Feet hip-width apart, abs tense.'],
      how: [
        'Take a long step forward and lower the back knee towards the floor. Front knee over the middle of the foot.',
        'Push back to the start through the front heel. Upper body stays upright.',
      ],
      feel: 'Quads and glutes of the front leg.',
      avoid: ['Front knee caving inwards', 'Step too short, so the front heel lifts', 'Leaning far forward'],
    },
    de: {
      setup: ['Aufrecht stehen, Kurzhanteln seitlich oder ohne Gewicht.', 'Füße hüftbreit, Bauch angespannt.'],
      how: [
        'Großen Schritt nach vorne und das hintere Knie Richtung Boden senken. Vorderes Knie über der Fußmitte.',
        'Über die vordere Ferse zurück in den Stand drücken. Der Oberkörper bleibt aufrecht.',
      ],
      feel: 'Quadrizeps und Po des vorderen Beins.',
      avoid: ['Vorderes Knie fällt nach innen', 'Schritt zu kurz, sodass die vordere Ferse abhebt', 'Weit nach vorne lehnen'],
    },
  },
  bulgarian_split_squat: {
    src: FREE,
    en: {
      setup: [
        'Rear foot with the laces on a bench behind you.',
        'Front foot far enough forward that the front knee stays roughly over the middle of the foot at the bottom.',
      ],
      how: [
        'Lower straight down until the back knee is just above the floor.',
        'Push up through the whole front foot. A slight forward lean puts more work on the glutes.',
      ],
      feel: 'Quads and glutes of the front leg; stretch in the hip of the back leg.',
      avoid: ['Front heel lifting', 'Front knee caving inwards', 'Pushing off with the back leg'],
    },
    de: {
      setup: [
        'Hinteren Fuß mit dem Spann auf eine Bank hinter dir legen.',
        'Vorderen Fuß so weit vorne aufsetzen, dass das Knie unten etwa über der Fußmitte bleibt.',
      ],
      how: [
        'Gerade nach unten absenken, bis das hintere Knie knapp über dem Boden ist.',
        'Über den ganzen vorderen Fuß hochdrücken. Leichte Vorlage gibt dem Po mehr Arbeit.',
      ],
      feel: 'Quadrizeps und Po des vorderen Beins; Dehnung in der Hüfte des hinteren Beins.',
      avoid: ['Vordere Ferse hebt ab', 'Vorderes Knie fällt nach innen', 'Mit dem hinteren Bein abdrücken'],
    },
  },
  hip_thrust: {
    src: ['contreras', 'essentials'],
    en: {
      setup: [
        'Upper back (lower edge of the shoulder blades) on the edge of a bench. Bar over the hip crease, with a pad.',
        'Feet flat, about hip width, placed so the shins are vertical at the top.',
      ],
      how: [
        'Push through the heels and raise the hips until the upper body is parallel to the floor.',
        'Chin tucked, ribs down; squeeze the glutes for a moment at the top, then lower under control.',
      ],
      feel: 'Glutes; hamstrings help a little.',
      avoid: ['Arching the lower back at the top instead of extending the hips', 'Pushing through the toes', 'Feet too far away or too close'],
    },
    de: {
      setup: [
        'Oberer Rücken (unterer Rand der Schulterblätter) an der Bankkante. Stange über der Hüftbeuge, mit Polster.',
        'Füße flach, etwa hüftbreit, so platziert, dass die Schienbeine oben senkrecht sind.',
      ],
      how: [
        'Über die Fersen drücken und die Hüfte heben, bis der Oberkörper parallel zum Boden ist.',
        'Kinn zur Brust, Rippen unten; oben den Po kurz fest anspannen, dann kontrolliert absenken.',
      ],
      feel: 'Po; die Beinbeuger helfen etwas.',
      avoid: ['Oben ins Hohlkreuz statt die Hüfte zu strecken', 'Über die Zehen drücken', 'Füße zu weit weg oder zu nah'],
    },
  },
  glute_kickback: {
    src: FREE,
    en: {
      setup: ['Ankle strap on the lowest pulley. Hold the frame, hinge slightly at the hips.', 'Standing leg slightly bent, abs tense.'],
      how: ['Push the working leg back by straightening the hip; squeeze the glute at the end.', 'Return slowly without the weight touching down.'],
      feel: 'Glute of the working leg.',
      avoid: ['Arching the lower back to get the leg higher', 'Swinging', 'Turning the hip open'],
    },
    de: {
      setup: ['Fußschlaufe an den untersten Seilzug. Am Gestell festhalten, in der Hüfte leicht nach vorne beugen.', 'Standbein leicht gebeugt, Bauch angespannt.'],
      how: ['Arbeitsbein durch Strecken der Hüfte nach hinten drücken; am Ende den Po anspannen.', 'Langsam zurück, ohne das Gewicht abzulegen.'],
      feel: 'Po des arbeitenden Beins.',
      avoid: ['Ins Hohlkreuz gehen, um das Bein höher zu bekommen', 'Schwung holen', 'Hüfte aufdrehen'],
    },
  },
  glute_kickback_machine: {
    src: FREE,
    en: {
      setup: [
        'Stand on the platform with the chest against the pad and hands on the handles. Standing leg slightly bent.',
        'Back of the working knee against the roller pad, knee bent at about 90°. Set the pad height so it sits just below the knee joint.',
        'Set the start position so the hip is bent and the glute is stretched, without the lower back rounding.',
      ],
      how: [
        'Push the pad back and up by straightening the hip, keeping the knee angle the same; hold briefly at the end.',
        'Stop when the thigh is in line with the body, then return slowly into the stretch.',
        'Hips stay square and the abs stay tense the whole time.',
      ],
      feel: 'Glute of the working leg; the back of the thigh helps a little.',
      avoid: ['Arching the lower back to push further', 'Twisting the hip open', 'Letting the stack slam down between reps'],
    },
    de: {
      setup: [
        'Auf die Plattform stellen, Brust ans Polster, Hände an die Griffe. Standbein leicht gebeugt.',
        'Kniekehle des Arbeitsbeins an die Rolle, Knie etwa 90° gebeugt. Rollenhöhe so einstellen, dass sie knapp unter dem Kniegelenk sitzt.',
        'Startposition so einstellen, dass die Hüfte gebeugt und der Po gedehnt ist, ohne dass der untere Rücken rund wird.',
      ],
      how: [
        'Rolle durch Strecken der Hüfte nach hinten oben drücken, der Kniewinkel bleibt gleich; am Ende kurz halten.',
        'Aufhören, sobald der Oberschenkel in einer Linie mit dem Körper ist, dann langsam zurück in die Dehnung.',
        'Hüfte bleibt gerade, der Bauch die ganze Zeit angespannt.',
      ],
      feel: 'Po des arbeitenden Beins; die Rückseite des Oberschenkels hilft etwas.',
      avoid: ['Ins Hohlkreuz gehen, um weiter zu drücken', 'Hüfte aufdrehen', 'Gewichte zwischen den Wiederholungen aufknallen lassen'],
    },
  },
  calf_raise: {
    src: FREE,
    en: {
      setup: ['Balls of the feet on the edge of the platform, heels free.', 'Shoulders under the pads, knees straight but not locked.'],
      how: [
        'Lower the heels as far as you can and pause briefly in the stretch.',
        'Rise as high as possible onto the toes and hold for a moment.',
      ],
      feel: 'Calves.',
      avoid: ['Bouncing at the bottom', 'Bending the knees to help', 'Short range of motion'],
    },
    de: {
      setup: ['Fußballen auf die Kante der Plattform, Fersen frei.', 'Schultern unter die Polster, Knie gestreckt, aber nicht durchgedrückt.'],
      how: ['Fersen so tief wie möglich senken und kurz in der Dehnung halten.', 'So hoch wie möglich auf die Zehen und kurz halten.'],
      feel: 'Waden.',
      avoid: ['Unten abfedern', 'Knie beugen, um mitzuhelfen', 'Kleiner Bewegungsumfang'],
    },
  },
  seated_calf_raise: {
    src: FREE,
    en: {
      setup: ['Pad on the lower thighs just above the knees. Balls of the feet on the platform, heels free.', 'Release the safety lever.'],
      how: ['Lower the heels as far as you can and pause in the stretch.', 'Push up as high as possible and hold for a moment.'],
      feel: 'Calves, especially the deeper calf muscle (soleus) because the knees are bent.',
      avoid: ['Bouncing', 'Short range of motion', 'Pad too far up the thighs'],
    },
    de: {
      setup: ['Polster auf den unteren Oberschenkeln, knapp über den Knien. Fußballen auf die Plattform, Fersen frei.', 'Sicherungshebel lösen.'],
      how: ['Fersen so tief wie möglich senken und in der Dehnung kurz halten.', 'So hoch wie möglich drücken und kurz halten.'],
      feel: 'Waden, wegen der gebeugten Knie vor allem der tiefere Wadenmuskel (Soleus).',
      avoid: ['Abfedern', 'Kleiner Bewegungsumfang', 'Polster zu weit oben auf den Oberschenkeln'],
    },
  },
  abductor: {
    src: FREE,
    en: {
      setup: ['Sit with your back against the pad, outer knees against the pads.', 'Hold the handles.'],
      how: ['Push the legs apart as far as you can and hold briefly.', 'Close slowly without letting the weight touch down.'],
      feel: 'Outer hip and side of the glutes.',
      avoid: ['Swinging', 'Letting the weight slam back', 'Very short range'],
    },
    de: {
      setup: ['Mit dem Rücken ans Polster setzen, Knie außen an die Polster.', 'Griffe festhalten.'],
      how: ['Beine so weit wie möglich auseinanderdrücken und kurz halten.', 'Langsam schließen, ohne die Gewichte abzulegen.'],
      feel: 'Äußere Hüfte und seitlicher Po.',
      avoid: ['Schwung holen', 'Gewichte zurückknallen lassen', 'Sehr kleiner Bewegungsumfang'],
    },
  },
  adductor: {
    src: FREE,
    en: {
      setup: ['Sit with your back against the pad, inner knees against the pads.', 'Set the start width only as wide as feels comfortable.'],
      how: ['Squeeze the legs together and hold briefly.', 'Open slowly into the stretch.'],
      feel: 'Inner thighs (adductors).',
      avoid: ['Starting too wide', 'Bouncing out of the stretch', 'Swinging'],
    },
    de: {
      setup: ['Mit dem Rücken ans Polster setzen, Knie innen an die Polster.', 'Startweite nur so weit einstellen, wie es sich angenehm anfühlt.'],
      how: ['Beine zusammendrücken und kurz halten.', 'Langsam in die Dehnung öffnen.'],
      feel: 'Innenseite der Oberschenkel (Adduktoren).',
      avoid: ['Zu weit geöffnet starten', 'Aus der Dehnung abfedern', 'Schwung holen'],
    },
  },

  // ---------- Shoulders ----------
  overhead_press: {
    src: FREE,
    en: {
      setup: [
        'Bar on the front of the shoulders, grip just outside shoulder width, forearms vertical.',
        'Feet hip-width; tense glutes and abs.',
      ],
      how: [
        'Press straight up; move the head back slightly so the bar can pass.',
        'At the top, bring the head through so the bar ends over the middle of the foot. Lower to the shoulders under control.',
      ],
      feel: 'Front and side shoulders, triceps help.',
      avoid: ['Leaning back into a strong arch', 'Pressing the bar forward instead of up', 'Bending the knees to help'],
    },
    de: {
      setup: [
        'Stange vorne auf den Schultern, Griff knapp weiter als schulterbreit, Unterarme senkrecht.',
        'Füße hüftbreit; Po und Bauch anspannen.',
      ],
      how: [
        'Gerade nach oben drücken; den Kopf kurz leicht zurücknehmen, damit die Stange vorbeikommt.',
        'Oben den Kopf wieder nach vorne, sodass die Stange über der Fußmitte endet. Kontrolliert zu den Schultern absenken.',
      ],
      feel: 'Vordere und seitliche Schulter, der Trizeps hilft.',
      avoid: ['Weit nach hinten ins Hohlkreuz lehnen', 'Stange nach vorne statt nach oben drücken', 'Mit den Knien Schwung holen'],
    },
  },
  db_shoulder_press: {
    src: FREE,
    en: {
      setup: ['Sit on a bench with back support, upright.', 'Dumbbells at shoulder height, palms forward or slightly turned in.'],
      how: ['Press up and slightly together until the arms are straight.', 'Lower slowly to about ear or shoulder height.'],
      feel: 'Front and side shoulders, triceps help.',
      avoid: ['Arching the back off the pad', 'Clanking the dumbbells at the top', 'Shrugging'],
    },
    de: {
      setup: ['Aufrecht auf eine Bank mit Rückenlehne setzen.', 'Kurzhanteln auf Schulterhöhe, Handflächen nach vorne oder leicht nach innen.'],
      how: ['Nach oben und leicht zusammen drücken, bis die Arme gestreckt sind.', 'Langsam bis etwa auf Ohren- oder Schulterhöhe absenken.'],
      feel: 'Vordere und seitliche Schulter, der Trizeps hilft.',
      avoid: ['Rücken vom Polster lösen (Hohlkreuz)', 'Hanteln oben aneinanderschlagen', 'Schultern hochziehen'],
    },
  },
  shoulder_press_machine: {
    src: FREE,
    en: {
      setup: ['Adjust the seat so the handles are at shoulder height or slightly above.', 'Back flat against the pad.'],
      how: ['Press up until the arms are almost straight.', 'Lower slowly to shoulder height without letting the weight touch down.'],
      feel: 'Front and side shoulders, triceps help.',
      avoid: ['Back arching off the pad', 'Shrugging the shoulders', 'Locking the elbows hard'],
    },
    de: {
      setup: ['Sitz so einstellen, dass die Griffe auf Schulterhöhe oder etwas darüber sind.', 'Rücken flach am Polster.'],
      how: ['Nach oben drücken, bis die Arme fast gestreckt sind.', 'Langsam bis auf Schulterhöhe absenken, ohne die Gewichte abzulegen.'],
      feel: 'Vordere und seitliche Schulter, der Trizeps hilft.',
      avoid: ['Rücken vom Polster lösen', 'Schultern hochziehen', 'Ellbogen hart durchdrücken'],
    },
  },
  lateral_raise: {
    src: FREE,
    en: {
      setup: ['Stand tall, dumbbells at your sides, slight bend in the elbows.', 'Shoulders down, away from the ears.'],
      how: [
        'Raise the arms out to the sides to shoulder height, leading with the elbows. Thumbs stay roughly level, not pointing down.',
        'Lower slowly.',
      ],
      feel: 'Side shoulders.',
      avoid: ['Swinging the body', 'Shrugging the shoulders', 'Weight too heavy, so the arms bend more and more'],
    },
    de: {
      setup: ['Aufrecht stehen, Kurzhanteln seitlich, Ellbogen leicht gebeugt.', 'Schultern unten, weg von den Ohren.'],
      how: [
        'Arme seitlich bis auf Schulterhöhe heben, die Ellbogen führen. Daumen bleiben etwa waagerecht, nicht nach unten kippen.',
        'Langsam absenken.',
      ],
      feel: 'Seitliche Schulter.',
      avoid: ['Mit dem Körper Schwung holen', 'Schultern hochziehen', 'Zu schwer, sodass die Arme immer mehr beugen'],
    },
  },
  lateral_raise_machine: {
    src: FREE,
    en: {
      setup: [
        "Adjust the seat so your shoulder joint lines up with the machine's pivot point.",
        'Pads on the outside of the upper arms, just above the elbows.',
      ],
      how: ['Raise the arms out to the sides to shoulder height.', 'Lower slowly without letting the weight touch down.'],
      feel: 'Side shoulders.',
      avoid: ['Shrugging', 'Leaning to the side', 'Swinging'],
    },
    de: {
      setup: [
        'Sitz so einstellen, dass dein Schultergelenk auf Höhe der Drehachse der Maschine ist.',
        'Polster außen an den Oberarmen, knapp über den Ellbogen.',
      ],
      how: ['Arme seitlich bis auf Schulterhöhe heben.', 'Langsam absenken, ohne die Gewichte abzulegen.'],
      feel: 'Seitliche Schulter.',
      avoid: ['Schultern hochziehen', 'Zur Seite lehnen', 'Schwung holen'],
    },
  },
  cable_lateral_raise: {
    src: FREE,
    en: {
      setup: [
        'Pulley at the lowest setting. Stand side-on to the machine.',
        'Hold the handle in the hand further from the machine, cable in front of the body.',
      ],
      how: ['Raise the arm out to the side to shoulder height, elbow slightly bent.', 'Lower slowly; the cable keeps the tension.'],
      feel: 'Side shoulder.',
      avoid: ['Leaning away to cheat', 'Shrugging', 'Swinging'],
    },
    de: {
      setup: ['Seilzug ganz unten. Seitlich zur Maschine stehen.', 'Griff in die Hand, die weiter weg von der Maschine ist, Kabel vor dem Körper.'],
      how: ['Arm seitlich bis auf Schulterhöhe heben, Ellbogen leicht gebeugt.', 'Langsam absenken; der Seilzug hält die Spannung.'],
      feel: 'Seitliche Schulter.',
      avoid: ['Wegkippen, um zu mogeln', 'Schultern hochziehen', 'Schwung holen'],
    },
  },
  reverse_fly: {
    src: FREE,
    en: {
      setup: [
        'Machine: chest against the pad, handles at shoulder height, arms almost straight.',
        'Dumbbells: hinge forward with a flat back, dumbbells hanging under the chest.',
      ],
      how: ['Move the arms out and back in a wide arc until they are in line with the body.', 'Return slowly.'],
      feel: 'Rear shoulders and upper back.',
      avoid: ['Shrugging the shoulders', 'Swinging', 'Bending the elbows more and more'],
    },
    de: {
      setup: [
        'Maschine: Brust ans Polster, Griffe auf Schulterhöhe, Arme fast gestreckt.',
        'Kurzhanteln: mit geradem Rücken nach vorne beugen, Hanteln hängen unter der Brust.',
      ],
      how: ['Arme in einem weiten Bogen nach außen hinten führen, bis sie auf Höhe des Körpers sind.', 'Langsam zurück.'],
      feel: 'Hintere Schulter und oberer Rücken.',
      avoid: ['Schultern hochziehen', 'Schwung holen', 'Ellbogen immer mehr beugen'],
    },
  },
  face_pull: {
    src: FREE,
    en: {
      setup: ['Rope at upper-chest or face height. Grip the ends with thumbs pointing back.', 'Step back until the arms are straight.'],
      how: [
        'Pull the rope towards your face, hands moving apart, elbows high.',
        'At the end, the hands are next to the ears and the upper arms point out to the sides. Return slowly.',
      ],
      feel: 'Rear shoulders and upper back.',
      avoid: ['Leaning back', 'Elbows dropping', 'Weight too heavy'],
    },
    de: {
      setup: ['Seil auf Höhe der oberen Brust oder des Gesichts. Enden greifen, Daumen zeigen nach hinten.', 'Zurücktreten, bis die Arme gestreckt sind.'],
      how: [
        'Seil zum Gesicht ziehen, die Hände gehen auseinander, Ellbogen hoch.',
        'Am Ende sind die Hände neben den Ohren und die Oberarme zeigen zur Seite. Langsam zurück.',
      ],
      feel: 'Hintere Schulter und oberer Rücken.',
      avoid: ['Nach hinten lehnen', 'Ellbogen fallen nach unten', 'Zu schwer'],
    },
  },

  // ---------- Arms ----------
  biceps_curl: {
    src: FREE,
    en: {
      setup: ['Stand tall, dumbbells at your sides, palms forward.', 'Elbows close to the body.'],
      how: ['Curl the dumbbells up; the elbows stay in place.', 'Lower slowly until the arms are straight.'],
      feel: 'Biceps.',
      avoid: ['Swinging with the back', 'Elbows moving forward', 'Not straightening the arms at the bottom'],
    },
    de: {
      setup: ['Aufrecht stehen, Kurzhanteln seitlich, Handflächen nach vorne.', 'Ellbogen nah am Körper.'],
      how: ['Hanteln hochbeugen; die Ellbogen bleiben an Ort und Stelle.', 'Langsam absenken, bis die Arme gestreckt sind.'],
      feel: 'Bizeps.',
      avoid: ['Mit dem Rücken Schwung holen', 'Ellbogen wandern nach vorne', 'Arme unten nicht strecken'],
    },
  },
  hammer_curl: {
    src: FREE,
    en: {
      setup: ['Stand tall, dumbbells at your sides, palms facing each other (thumbs up).', 'Elbows close to the body.'],
      how: ['Curl up while keeping the thumbs up.', 'Lower slowly until the arms are straight.'],
      feel: 'Biceps and the muscles on the thumb side of the forearm.',
      avoid: ['Swinging', 'Elbows moving forward', 'Short range'],
    },
    de: {
      setup: ['Aufrecht stehen, Kurzhanteln seitlich, Handflächen zueinander (Daumen oben).', 'Ellbogen nah am Körper.'],
      how: ['Hochbeugen, die Daumen bleiben oben.', 'Langsam absenken, bis die Arme gestreckt sind.'],
      feel: 'Bizeps und die Muskeln an der Daumenseite des Unterarms.',
      avoid: ['Schwung holen', 'Ellbogen wandern nach vorne', 'Kleiner Bewegungsumfang'],
    },
  },
  barbell_curl: {
    src: FREE,
    en: {
      setup: ['Underhand grip at shoulder width.', 'Stand tall, elbows at your sides.'],
      how: ['Curl the bar up to the shoulders; the elbows stay in place.', 'Lower slowly until the arms are straight.'],
      feel: 'Biceps.',
      avoid: ['Leaning back to swing the weight up', 'Elbows moving forward', 'Lifting the wrists'],
    },
    de: {
      setup: ['Untergriff schulterbreit.', 'Aufrecht stehen, Ellbogen seitlich am Körper.'],
      how: ['Stange zu den Schultern beugen; die Ellbogen bleiben an Ort und Stelle.', 'Langsam absenken, bis die Arme gestreckt sind.'],
      feel: 'Bizeps.',
      avoid: ['Nach hinten lehnen, um Schwung zu holen', 'Ellbogen wandern nach vorne', 'Handgelenke einknicken'],
    },
  },
  cable_curl: {
    src: FREE,
    en: {
      setup: ['Bar or rope on the lowest pulley. Stand close, underhand grip.', 'Elbows at your sides.'],
      how: ['Curl up to the shoulders; the elbows stay in place.', 'Lower slowly; the cable keeps tension the whole way.'],
      feel: 'Biceps.',
      avoid: ['Leaning back', 'Elbows moving forward', 'Letting the weight pull the arms down fast'],
    },
    de: {
      setup: ['Stange oder Seil am untersten Seilzug. Nah heranstellen, Untergriff.', 'Ellbogen seitlich am Körper.'],
      how: ['Zu den Schultern beugen; die Ellbogen bleiben an Ort und Stelle.', 'Langsam absenken; der Seilzug hält die Spannung.'],
      feel: 'Bizeps.',
      avoid: ['Nach hinten lehnen', 'Ellbogen wandern nach vorne', 'Arme vom Gewicht schnell runterziehen lassen'],
    },
  },
  preacher_curl: {
    src: FREE,
    en: {
      setup: ['Adjust the seat so your armpits rest snugly on the top of the pad.', 'Upper arms flat on the pad.'],
      how: ['Curl the weight up without lifting the elbows.', 'Lower slowly until the arms are almost straight; control matters most at the bottom.'],
      feel: 'Biceps, especially in the stretched position.',
      avoid: ['Dropping the weight at the bottom', 'Lifting the upper arms off the pad', 'Seat too low or too high'],
    },
    de: {
      setup: ['Sitz so einstellen, dass die Achseln fest oben am Polster anliegen.', 'Oberarme flach auf dem Polster.'],
      how: ['Gewicht hochbeugen, ohne die Ellbogen abzuheben.', 'Langsam absenken, bis die Arme fast gestreckt sind; unten ist Kontrolle am wichtigsten.'],
      feel: 'Bizeps, besonders in der Dehnung.',
      avoid: ['Gewicht unten fallen lassen', 'Oberarme vom Polster heben', 'Sitz zu tief oder zu hoch'],
    },
  },
  biceps_curl_machine: {
    src: FREE,
    en: {
      setup: ["Adjust the seat so your elbows line up with the machine's pivot point.", 'Upper arms flat on the pad.'],
      how: ['Curl the handles up and squeeze briefly.', 'Lower slowly until the arms are almost straight.'],
      feel: 'Biceps.',
      avoid: ['Elbows not aligned with the pivot', 'Lifting the upper arms', 'Swinging'],
    },
    de: {
      setup: ['Sitz so einstellen, dass deine Ellbogen auf Höhe der Drehachse der Maschine sind.', 'Oberarme flach auf dem Polster.'],
      how: ['Griffe hochbeugen und kurz anspannen.', 'Langsam absenken, bis die Arme fast gestreckt sind.'],
      feel: 'Bizeps.',
      avoid: ['Ellbogen nicht auf Höhe der Drehachse', 'Oberarme abheben', 'Schwung holen'],
    },
  },
  triceps_pushdown: {
    src: FREE,
    en: {
      setup: ['Bar or rope on the top pulley. Stand close, slight forward lean.', 'Elbows pinned to your sides.'],
      how: ['Push down until the arms are straight; with a rope, pull the ends apart at the bottom.', 'Return slowly to about 90° at the elbow.'],
      feel: 'Triceps (back of the upper arm).',
      avoid: ['Elbows moving forward and back', 'Leaning over the bar and pushing with body weight', 'Shrugging'],
    },
    de: {
      setup: ['Stange oder Seil am oberen Seilzug. Nah heranstellen, leichte Vorlage.', 'Ellbogen fest seitlich am Körper.'],
      how: ['Nach unten drücken, bis die Arme gestreckt sind; beim Seil unten die Enden auseinanderziehen.', 'Langsam zurück bis etwa 90° im Ellbogen.'],
      feel: 'Trizeps (Rückseite des Oberarms).',
      avoid: ['Ellbogen wandern vor und zurück', 'Über die Stange lehnen und mit dem Körpergewicht drücken', 'Schultern hochziehen'],
    },
  },
  triceps_machine: {
    src: FREE,
    en: {
      setup: ["Adjust the seat so your elbows line up with the machine's pivot point.", 'Back against the pad, upper arms on the support.'],
      how: ['Push the handles down or forward until the arms are straight.', 'Return slowly.'],
      feel: 'Triceps.',
      avoid: ['Elbows lifting off the pad', 'Leaning into it with the upper body', 'Locking out hard'],
    },
    de: {
      setup: ['Sitz so einstellen, dass deine Ellbogen auf Höhe der Drehachse der Maschine sind.', 'Rücken am Polster, Oberarme auf der Auflage.'],
      how: ['Griffe nach unten bzw. vorne drücken, bis die Arme gestreckt sind.', 'Langsam zurück.'],
      feel: 'Trizeps.',
      avoid: ['Ellbogen heben vom Polster ab', 'Mit dem Oberkörper mitdrücken', 'Hart durchdrücken'],
    },
  },
  dips: {
    src: FREE,
    en: {
      setup: ['Support yourself on the bars with straight arms, shoulders down.', 'Too hard? Use the assisted dip machine.'],
      how: [
        'Lower until the upper arms are about parallel to the floor, or less if your shoulders feel strained.',
        'Push back up until the arms are straight. Upright body = more triceps, leaning forward = more chest.',
      ],
      feel: 'Triceps and chest, front shoulders help.',
      avoid: ['Going too deep', 'Shoulders shrugging up to the ears', 'Swinging the legs'],
    },
    de: {
      setup: ['Mit gestreckten Armen auf den Holmen abstützen, Schultern unten.', 'Zu schwer? An der Dip-Maschine mit Unterstützung trainieren.'],
      how: [
        'Absenken, bis die Oberarme etwa parallel zum Boden sind, weniger, wenn die Schultern zwicken.',
        'Hochdrücken, bis die Arme gestreckt sind. Aufrechter Oberkörper = mehr Trizeps, Vorlage = mehr Brust.',
      ],
      feel: 'Trizeps und Brust, die vordere Schulter hilft.',
      avoid: ['Zu tief gehen', 'Schultern zu den Ohren ziehen', 'Mit den Beinen Schwung holen'],
    },
  },
  skull_crusher: {
    src: FREE,
    en: {
      setup: ['Lie on a flat bench, EZ bar or dumbbells above the shoulders with straight arms.', 'Upper arms tilted slightly back towards the head.'],
      how: [
        'Bend only at the elbows and lower the weight towards the forehead or just behind the head.',
        'Straighten the arms again; the upper arms stay still.',
      ],
      feel: 'Triceps.',
      avoid: ['Elbows flaring out', 'Upper arms moving (turns it into a pullover)', 'Going too heavy without a spotter'],
    },
    de: {
      setup: ['Auf eine Flachbank legen, SZ-Stange oder Kurzhanteln mit gestreckten Armen über den Schultern.', 'Oberarme leicht nach hinten Richtung Kopf geneigt.'],
      how: [
        'Nur im Ellbogen beugen und das Gewicht Richtung Stirn oder knapp hinter den Kopf senken.',
        'Arme wieder strecken; die Oberarme bleiben ruhig.',
      ],
      feel: 'Trizeps.',
      avoid: ['Ellbogen gehen nach außen', 'Oberarme bewegen sich mit (wird zum Überzug)', 'Zu schwer ohne Sicherung'],
    },
  },
  overhead_triceps_extension: {
    src: FREE,
    en: {
      setup: ['Sit or stand tall, holding one dumbbell with both hands above your head.', 'Abs tense, ribs down.'],
      how: ['Lower the dumbbell behind the head; the elbows point up and stay close to the head.', 'Straighten the arms again.'],
      feel: 'Triceps, with a strong stretch at the bottom.',
      avoid: ['Arching the lower back', 'Elbows flaring wide', 'Short range'],
    },
    de: {
      setup: ['Aufrecht sitzen oder stehen, eine Kurzhantel mit beiden Händen über dem Kopf.', 'Bauch angespannt, Rippen unten.'],
      how: ['Hantel hinter den Kopf senken; die Ellbogen zeigen nach oben und bleiben nah am Kopf.', 'Arme wieder strecken.'],
      feel: 'Trizeps, unten mit deutlicher Dehnung.',
      avoid: ['Hohlkreuz', 'Ellbogen weit nach außen', 'Kleiner Bewegungsumfang'],
    },
  },

  // ---------- Core ----------
  plank: {
    src: ['mcgill', 'nsca'],
    en: {
      setup: ['Forearms on the floor under the shoulders.', 'Body in a straight line from head to heels.'],
      how: ['Tense the abs and glutes, keep breathing normally.', 'Better several short holds with good form than one long one with sagging hips.'],
      feel: 'Abs and the whole trunk.',
      avoid: ['Hips sagging', 'Hips pushed high', 'Holding your breath'],
    },
    de: {
      setup: ['Unterarme unter den Schultern auf den Boden.', 'Körper gerade von Kopf bis Ferse.'],
      how: ['Bauch und Po anspannen, normal weiteratmen.', 'Lieber mehrere kurze Durchgänge mit sauberer Haltung als einen langen mit durchhängender Hüfte.'],
      feel: 'Bauch und der ganze Rumpf.',
      avoid: ['Hüfte hängt durch', 'Hüfte zu hoch', 'Luft anhalten'],
    },
  },
  crunch: {
    src: ['mcgill', 'nsca'],
    en: {
      setup: ['Lie on your back, knees bent, feet flat.', 'Hands on the chest or lightly at the temples.'],
      how: ['Curl the upper back off the floor, bringing the ribs towards the pelvis.', 'Lower slowly. A small range of motion is enough.'],
      feel: 'Abs.',
      avoid: ['Pulling on the neck with the hands', 'Sitting all the way up with momentum', 'Lower back lifting off the floor'],
    },
    de: {
      setup: ['Auf den Rücken legen, Knie gebeugt, Füße flach.', 'Hände auf der Brust oder locker an den Schläfen.'],
      how: ['Oberen Rücken vom Boden einrollen, Rippen Richtung Becken.', 'Langsam ablegen. Ein kleiner Bewegungsumfang reicht.'],
      feel: 'Bauch.',
      avoid: ['Mit den Händen am Nacken ziehen', 'Mit Schwung ganz hochsetzen', 'Unterer Rücken löst sich vom Boden'],
    },
  },
  cable_crunch: {
    src: ['nsca', 'mcgill'],
    en: {
      setup: ['Rope on the top pulley. Kneel facing the machine, hands with the rope next to the head.', 'Hips stay above the knees.'],
      how: ['Curl the upper body down, bringing the elbows towards the thighs.', 'Return slowly; the hips do not move.'],
      feel: 'Abs.',
      avoid: ['Sitting back onto the heels', 'Pulling with the arms', 'Weight too heavy'],
    },
    de: {
      setup: ['Seil am oberen Seilzug. Mit Blick zur Maschine knien, Hände mit dem Seil neben dem Kopf.', 'Die Hüfte bleibt über den Knien.'],
      how: ['Oberkörper nach unten einrollen, Ellbogen Richtung Oberschenkel.', 'Langsam zurück; die Hüfte bewegt sich nicht.'],
      feel: 'Bauch.',
      avoid: ['Zurück auf die Fersen setzen', 'Mit den Armen ziehen', 'Zu schwer'],
    },
  },
  ab_machine: {
    src: ['nsca', 'mcgill'],
    en: {
      setup: ['Adjust the seat so the pads or handles sit at upper-chest height.', 'Feet under the rollers if available.'],
      how: ['Curl the upper body forward by tensing the abs, not by pulling with the arms.', 'Return slowly.'],
      feel: 'Abs.',
      avoid: ['Pulling with the arms', 'Swinging', 'Letting the weight slam back'],
    },
    de: {
      setup: ['Sitz so einstellen, dass Polster bzw. Griffe auf Höhe der oberen Brust sind.', 'Füße unter die Rollen, falls vorhanden.'],
      how: ['Oberkörper durch Anspannen des Bauchs nach vorne einrollen, nicht mit den Armen ziehen.', 'Langsam zurück.'],
      feel: 'Bauch.',
      avoid: ['Mit den Armen ziehen', 'Schwung holen', 'Gewichte zurückknallen lassen'],
    },
  },
  hanging_leg_raise: {
    src: ['nsca', 'mcgill'],
    en: {
      setup: ['Hang from a bar or use the arm supports of a dip station.', 'Shoulders active, not hanging loosely.'],
      how: [
        'Raise the legs by curling the pelvis up, not just lifting the legs from the hips. Bent knees are easier.',
        'Lower slowly without swinging.',
      ],
      feel: 'Abs, especially the lower part.',
      avoid: ['Swinging', 'Only lifting the legs without curling the pelvis', 'Dropping the legs fast'],
    },
    de: {
      setup: ['An einer Stange hängen oder die Armstützen einer Dip-Station nutzen.', 'Schultern aktiv, nicht locker hängen.'],
      how: [
        'Beine heben, indem du das Becken nach oben einrollst, nicht nur die Beine aus der Hüfte heben. Mit gebeugten Knien ist es leichter.',
        'Langsam ohne Schwung absenken.',
      ],
      feel: 'Bauch, besonders der untere Teil.',
      avoid: ['Schwung holen', 'Nur die Beine heben, ohne das Becken einzurollen', 'Beine fallen lassen'],
    },
  },
  leg_raise: {
    src: ['nsca', 'mcgill'],
    en: {
      setup: ['Lie on your back, hands beside the hips or under the lower back.', 'Lower back pressed into the floor.'],
      how: [
        'Raise the legs until they are vertical.',
        'Lower them only as far as the lower back stays on the floor. Bent knees are easier.',
      ],
      feel: 'Abs, especially the lower part.',
      avoid: ['Lower back arching off the floor', 'Letting the legs drop', 'Holding your breath'],
    },
    de: {
      setup: ['Auf den Rücken legen, Hände neben der Hüfte oder unter dem unteren Rücken.', 'Unterer Rücken in den Boden gedrückt.'],
      how: ['Beine anheben, bis sie senkrecht sind.', 'Nur so weit absenken, wie der untere Rücken am Boden bleibt. Mit gebeugten Knien ist es leichter.'],
      feel: 'Bauch, besonders der untere Teil.',
      avoid: ['Unterer Rücken hebt ab (Hohlkreuz)', 'Beine fallen lassen', 'Luft anhalten'],
    },
  },
  russian_twist: {
    src: ['nsca', 'mcgill'],
    en: {
      setup: ['Sit with knees bent, lean back to about 45° with a straight back.', 'Feet on the floor (easier) or lifted (harder).'],
      how: ['Turn the upper body from side to side; the ribs turn, not just the arms.', 'Move slowly and under control.'],
      feel: 'Obliques and abs.',
      avoid: ['Rounding the back', 'Only swinging the arms', 'Fast, jerky twists; skip it if your lower back hurts'],
    },
    de: {
      setup: ['Mit gebeugten Knien sitzen, mit geradem Rücken auf etwa 45° zurücklehnen.', 'Füße am Boden (leichter) oder angehoben (schwerer).'],
      how: ['Oberkörper von Seite zu Seite drehen; die Rippen drehen mit, nicht nur die Arme.', 'Langsam und kontrolliert bewegen.'],
      feel: 'Schräge Bauchmuskeln und Bauch.',
      avoid: ['Runder Rücken', 'Nur die Arme schwingen', 'Schnelles, ruckartiges Drehen; bei Rückenschmerzen weglassen'],
    },
  },

  // ---------- Cardio ----------
  treadmill: {
    src: ['acsm'],
    en: {
      setup: ['Stand on the side rails when starting the belt. Clip the safety key to your clothes.', 'Start with 5–10 minutes at an easy pace.'],
      how: ['Walk or run upright near the front, with a natural stride and relaxed arm swing.', 'Moderate intensity: you can talk, but not sing.'],
      feel: 'Legs and heart and lungs. Moderate effort is about 12–13 on a 6–20 scale.',
      avoid: ['Holding the handrails (makes it easier and changes your gait)', 'Running at the very back of the belt', 'Stepping off while the belt is fast'],
    },
    de: {
      setup: ['Beim Starten des Bands auf den seitlichen Trittflächen stehen. Sicherheitsclip an der Kleidung befestigen.', 'Mit 5–10 Minuten lockerem Tempo beginnen.'],
      how: ['Aufrecht im vorderen Bereich gehen oder laufen, natürliche Schrittlänge, Arme locker mitschwingen.', 'Moderate Intensität: Du kannst reden, aber nicht singen.'],
      feel: 'Beine, Herz und Lunge. Moderate Belastung ist etwa 12–13 auf einer Skala von 6–20.',
      avoid: ['An den Griffen festhalten (macht es leichter und verändert den Gang)', 'Ganz hinten auf dem Band laufen', 'Bei schnellem Band abspringen'],
    },
  },
  incline_walk: {
    src: ['acsm'],
    en: {
      setup: ['Treadmill incline about 5–12 %, speed so you can still talk.', 'Raise the incline step by step over the weeks.'],
      how: ['Walk upright with slightly shorter steps.', 'Keep the hands off the rails; let the arms swing.'],
      feel: 'Glutes, calves and the back of the legs, plus heart and lungs.',
      avoid: ['Hanging on the handrails (removes much of the work)', 'Leaning far forward', 'Raising the incline too fast'],
    },
    de: {
      setup: ['Laufband-Steigung etwa 5–12 %, Tempo so, dass du noch reden kannst.', 'Steigung über die Wochen schrittweise erhöhen.'],
      how: ['Aufrecht mit etwas kürzeren Schritten gehen.', 'Hände weg von den Griffen; Arme mitschwingen lassen.'],
      feel: 'Po, Waden und Beinrückseite, dazu Herz und Lunge.',
      avoid: ['An den Griffen hängen (nimmt viel Arbeit weg)', 'Weit nach vorne lehnen', 'Steigung zu schnell erhöhen'],
    },
  },
  bike: {
    src: ['bini', 'acsm'],
    en: {
      setup: [
        'Saddle height: with the pedal at the bottom, the knee stays slightly bent (about 25–30°). Quick check: saddle at hip-bone height when standing next to the bike.',
        'Handlebar so you can sit with relaxed shoulders.',
      ],
      how: ['Pedal in smooth circles with the ball of the foot on the pedal.', 'Start easy for 5–10 minutes, then pick a moderate effort.'],
      feel: 'Front of the thighs and glutes, plus heart and lungs.',
      avoid: ['Hips rocking side to side (saddle too high)', 'Knees very bent at the bottom (saddle too low)', 'Gripping the bars tightly'],
    },
    de: {
      setup: [
        'Sattelhöhe: Mit dem Pedal ganz unten bleibt das Knie leicht gebeugt (etwa 25–30°). Schnelltest: Sattel auf Höhe des Hüftknochens, wenn du daneben stehst.',
        'Lenker so einstellen, dass du mit lockeren Schultern sitzt.',
      ],
      how: ['Runde, gleichmäßige Kurbelbewegung, Fußballen auf dem Pedal.', '5–10 Minuten locker beginnen, dann moderate Belastung.'],
      feel: 'Vorderseite der Oberschenkel und Po, dazu Herz und Lunge.',
      avoid: ['Hüfte kippt hin und her (Sattel zu hoch)', 'Knie unten stark gebeugt (Sattel zu tief)', 'Lenker verkrampft festhalten'],
    },
  },
  rowing_machine: {
    src: ['concept2', 'acsm'],
    en: {
      setup: [
        'Strap the feet so the strap crosses the widest part of the foot.',
        'Damper (fan lever) at about 3–5 for general fitness; higher does not mean a better workout.',
      ],
      how: [
        'Drive: push with the legs first, then lean back slightly, then pull the handle to the lower ribs.',
        'Recovery in reverse: arms forward, lean forward from the hips, then bend the knees.',
      ],
      feel: 'Legs do most of the work; back and arms finish the stroke.',
      avoid: ['Pulling with the arms first', 'Bending the knees before the handle has passed them', 'Rounding the back'],
    },
    de: {
      setup: [
        'Fußgurt so festziehen, dass er über der breitesten Stelle des Fußes liegt.',
        'Klappe am Lüfterrad (Damper) für allgemeine Fitness auf etwa 3–5; höher heißt nicht besseres Training.',
      ],
      how: [
        'Zug: erst mit den Beinen drücken, dann leicht zurücklehnen, dann den Griff zu den unteren Rippen ziehen.',
        'Rückweg umgekehrt: Arme nach vorne, aus der Hüfte nach vorne lehnen, dann die Knie beugen.',
      ],
      feel: 'Die Beine leisten den Großteil; Rücken und Arme beenden den Zug.',
      avoid: ['Zuerst mit den Armen ziehen', 'Knie beugen, bevor der Griff sie passiert hat', 'Runder Rücken'],
    },
  },
  cross_trainer: {
    src: ['acsm'],
    en: {
      setup: ['Stand upright with the whole foot on the pedals.', 'Hold the moving handles at a comfortable height.'],
      how: ['Push and pull the handles to involve the upper body.', 'Keep a steady rhythm at a moderate effort.'],
      feel: 'Legs and glutes, arms a little; plus heart and lungs.',
      avoid: ['Leaning on the handles', 'Rising onto the toes', 'Slouching forward'],
    },
    de: {
      setup: ['Aufrecht stehen, ganzer Fuß auf den Pedalen.', 'Die beweglichen Griffe auf bequemer Höhe fassen.'],
      how: ['Griffe drücken und ziehen, damit der Oberkörper mitarbeitet.', 'Gleichmäßiger Rhythmus bei moderater Belastung.'],
      feel: 'Beine und Po, etwas die Arme; dazu Herz und Lunge.',
      avoid: ['Auf die Griffe stützen', 'Auf die Zehen gehen', 'Nach vorne zusammensacken'],
    },
  },
  stair_climber: {
    src: ['acsm'],
    en: {
      setup: ['Stand upright; touch the rails only lightly for balance.', 'Start at a slow step speed.'],
      how: ['Put the whole foot on each step and push through the heel.', 'Keep the upper body upright.'],
      feel: 'Glutes and thighs, plus heart and lungs.',
      avoid: ['Leaning on the rails (removes much of the work)', 'Only stepping on the toes', 'Hunching over'],
    },
    de: {
      setup: ['Aufrecht stehen; die Griffe nur leicht zum Gleichgewicht berühren.', 'Mit langsamer Stufengeschwindigkeit starten.'],
      how: ['Den ganzen Fuß auf jede Stufe setzen und über die Ferse drücken.', 'Oberkörper aufrecht halten.'],
      feel: 'Po und Oberschenkel, dazu Herz und Lunge.',
      avoid: ['Auf die Griffe stützen (nimmt viel Arbeit weg)', 'Nur auf den Zehen steigen', 'Krumm nach vorne beugen'],
    },
  },
}

