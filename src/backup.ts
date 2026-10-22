import { db, type Exercise } from './db'

const blobToDataUrl = (b: Blob) =>
  new Promise<string>((res, rej) => {
    const r = new FileReader()
    r.onload = () => res(r.result as string)
    r.onerror = () => rej(r.error)
    r.readAsDataURL(b)
  })

// Only accept embedded images, never a URL to somewhere else.
const dataUrlToBlob = async (u: string) => {
  if (!/^data:image\/(png|jpe?g|webp|gif|heic);base64,/i.test(u)) return undefined
  return (await fetch(u)).blob()
}

export async function exportBackup() {
  const exercises = await Promise.all(
    (await db.exercises.toArray()).map(async (e) => ({ ...e, photo: e.photo ? await blobToDataUrl(e.photo) : undefined })),
  )
  const data = {
    app: 'gymtastisch',
    version: 1,
    exportedAt: new Date().toISOString(),
    exercises,
    workouts: await db.workouts.toArray(),
    sets: await db.sets.toArray(),
    plans: await db.plans.toArray(),
    bodyweights: await db.bodyweights.toArray(),
    restdays: await db.restdays.toArray(),
  }
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' })
  const name = `gymtastisch-${new Date().toISOString().slice(0, 10)}.json`
  const file = new File([blob], name, { type: 'application/json' })

  // On iPhone the share sheet lets you save to Files, AirDrop or send it to yourself.
  if (navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: name })
      return
    } catch (e) {
      if ((e as Error).name === 'AbortError') return
    }
  }
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = name
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 10_000)
}

export async function importBackup(file: File) {
  const data = JSON.parse(await file.text())
  if (data?.app !== 'gymtastisch' || !Array.isArray(data.exercises)) throw new Error('invalid backup')
  for (const key of ['workouts', 'sets', 'plans', 'bodyweights', 'restdays']) {
    if (data[key] !== undefined && !Array.isArray(data[key])) throw new Error('invalid backup')
  }
  const exercises: Exercise[] = await Promise.all(
    data.exercises.map(async (e: Exercise & { photo?: string }) => ({
      ...e,
      photo: typeof e.photo === 'string' ? await dataUrlToBlob(e.photo) : undefined,
    })),
  )
  await db.transaction('rw', [db.exercises, db.workouts, db.sets, db.plans, db.bodyweights, db.restdays], async () => {
    await Promise.all([
      db.exercises.clear(),
      db.workouts.clear(),
      db.sets.clear(),
      db.plans.clear(),
      db.bodyweights.clear(),
      db.restdays.clear(),
    ])
    await db.exercises.bulkAdd(exercises)
    await db.workouts.bulkAdd(data.workouts ?? [])
    await db.sets.bulkAdd(data.sets ?? [])
    await db.plans.bulkAdd(data.plans ?? [])
    await db.bodyweights.bulkAdd(data.bodyweights ?? [])
    await db.restdays.bulkAdd(data.restdays ?? [])
  })
}
