import { useEffect, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { cardioMetric, isTimed, METRIC_INFO } from '../cardio'
import { db, type Exercise, type WorkoutSet } from '../db'
import { useI18n, type Lang, type T } from '../i18n'
import { isBodyweight } from '../progression'
import { builtinImage } from '../seed'
import { useSettings } from '../settings'
import {
  DEFAULT_LB_STEP,
  formatWeight,
  fromUnit,
  shownKg,
  snapToStep,
  stepAbove,
  stepBelow,
  toPoundGrid,
  toUnit,
  unitFor,
  type WeightUnit,
} from '../units'
import { Icon } from './Icon'

/**
 * Bottom sheet; with `full` it covers the whole screen. Rendered into <body> so
 * it sits above the tab bar instead of inside the page's scroll layer.
 */
export function Sheet({
  title,
  onClose,
  children,
  full,
}: {
  title: string
  onClose: () => void
  children: ReactNode
  full?: boolean
}) {
  // The page behind stays put while the sheet is open.
  useEffect(() => {
    const page = document.querySelector<HTMLElement>('.scroller')
    if (!page) return
    const prev = page.style.overflow
    page.style.overflow = 'hidden'
    return () => {
      page.style.overflow = prev
    }
  }, [])
  return createPortal(
    <div className={`sheet-backdrop ${full ? 'full' : ''}`} onClick={onClose}>
      <div className="sheet" role="dialog" aria-label={title} onClick={(e) => e.stopPropagation()}>
        <div className="sheet-head">
          <h2>{title}</h2>
          <button className="icon-btn close-btn" onClick={onClose} aria-label="Close">
            <Icon name="x" size={18} />
          </button>
        </div>
        <div className="sheet-body">{children}</div>
      </div>
    </div>,
    document.body,
  )
}

export function Photo({ blob, className, alt = '' }: { blob?: Blob; className?: string; alt?: string }) {
  const [url, setUrl] = useState<string>()
  useEffect(() => {
    if (!blob) return setUrl(undefined)
    const u = URL.createObjectURL(blob)
    setUrl(u)
    return () => URL.revokeObjectURL(u)
  }, [blob])
  if (!url) return null
  return <img src={url} className={className} alt={alt} />
}

export function Stepper({
  value,
  onChange,
  step,
  label,
  min = 0,
}: {
  value: number
  onChange: (v: number) => void
  step: number
  label: string
  min?: number
}) {
  const { lang } = useI18n()
  const [text, setText] = useState(fmt(value, lang))
  useEffect(() => setText(fmt(value, lang)), [value, lang])
  const commit = (s: string) => {
    const n = parseFloat(s.replace(',', '.'))
    if (!Number.isNaN(n) && n >= min) onChange(round(n))
    else setText(fmt(value, lang))
  }
  return (
    <div className="stepper">
      <span className="stepper-label">{label}</span>
      <div className="stepper-row">
        <button type="button" onClick={() => onChange(round(Math.max(min, value - step)))} aria-label={`${label} −`}>
          −
        </button>
        <input
          inputMode="decimal"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={(e) => commit(e.target.value)}
          onFocus={(e) => e.target.select()}
          aria-label={label}
        />
        <button type="button" onClick={() => onChange(round(value + step))} aria-label={`${label} +`}>
          +
        </button>
      </div>
    </div>
  )
}

/**
 * Weight entry showing kg and lb side by side; either can be typed in. − and +
 * follow the exercise's equipment: kg plates move by `step` kg, pound stacks
 * from pin to pin (`step` in lb). Weights are always stored in kg.
 */
export function WeightStepper({
  exercise,
  value,
  onChange,
  step,
  label,
}: {
  exercise?: Exercise
  value: number
  onChange: (kg: number) => void
  step: number
  label: string
}) {
  const { t, lang } = useI18n()
  const { settings } = useSettings()
  const unit = exercise ? unitFor(exercise) : 'kg'
  const kg = shownKg(value, unit)
  const lb = toUnit(value, 'lb')
  const move = (dir: 1 | -1) => {
    if (unit === 'lb') onChange(fromUnit(dir > 0 ? stepAbove(lb, step) : stepBelow(lb, step), 'lb'))
    else onChange(round(Math.max(0, dir > 0 ? stepAbove(value, step) : stepBelow(value, step))))
  }
  // Switching to pounds puts the weight on the nearest pin.
  const switchUnit = async (u: WeightUnit) => {
    if (!exercise || u === unit) return
    await db.exercises.update(exercise.id, { unit: u })
    if (u === 'lb') onChange(fromUnit(snapToStep(lb, exercise.weightStepLb ?? DEFAULT_LB_STEP), 'lb'))
  }
  return (
    <div className="stepper weight-stepper">
      <span className="stepper-label">{label}</span>
      <div className="stepper-row">
        <button type="button" onClick={() => move(-1)} aria-label={`${label} −`}>
          −
        </button>
        <div className="dual">
          <UnitField
            value={kg}
            unit="kg"
            active={unit === 'kg'}
            label={label}
            onCommit={(v) => onChange(unit === 'lb' ? toPoundGrid(v) : round(v))}
          />
          <UnitField
            value={lb}
            unit="lb"
            active={unit === 'lb'}
            label={label}
            onCommit={(v) => onChange(fromUnit(v, 'lb'))}
          />
        </div>
        <button type="button" onClick={() => move(1)} aria-label={`${label} +`}>
          +
        </button>
      </div>
      {exercise && (
        <div className="unit-switch" role="group" aria-label={t('weightUnit')}>
          <span className="muted">{t('stepsLabel')}</span>
          {(['kg', 'lb'] as const).map((u) => (
            <button
              key={u}
              type="button"
              className={unit === u ? 'on' : ''}
              aria-pressed={unit === u}
              onClick={() => void switchUnit(u)}
            >
              {fmt(u === unit ? step : u === 'kg' ? (exercise.weightStep ?? settings.weightStep) : (exercise.weightStepLb ?? DEFAULT_LB_STEP), lang)} {u}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function UnitField({
  value,
  unit,
  active,
  label,
  onCommit,
}: {
  value: number
  unit: WeightUnit
  active: boolean
  label: string
  onCommit: (v: number) => void
}) {
  const { lang } = useI18n()
  const [text, setText] = useState(fmt(value, lang))
  useEffect(() => setText(fmt(value, lang)), [value, lang])
  const commit = (s: string) => {
    const n = parseFloat(s.replace(',', '.'))
    if (!Number.isNaN(n) && n >= 0) onCommit(n)
    else setText(fmt(value, lang))
  }
  return (
    <label className={`dual-field ${active ? 'on' : ''}`}>
      <input
        inputMode="decimal"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={(e) => commit(e.target.value)}
        onFocus={(e) => e.target.select()}
        aria-label={`${label} (${unit})`}
      />
      <span className="dual-unit">{unit}</span>
    </label>
  )
}

const round = (n: number) => Math.round(n * 100) / 100

/** "60 kg × 10", or "Bodyweight × 12" when no extra weight was used. */
export const setText = (weight: number, reps: number, lang: Lang, bodyweightLabel: string, unit: WeightUnit = 'kg') =>
  `${weight > 0 ? formatWeight(weight, unit, lang) : bodyweightLabel} × ${reps}`

/** A cardio value with its unit, e.g. "8,5 km/h" or "Level 8". */
export const metricText = (e: Exercise, value: number, t: T, lang: Lang) => {
  const metric = cardioMetric(e)
  if (!metric) return ''
  const { unit } = METRIC_INFO[metric]
  return unit ? `${fmt(value, lang)} ${unit}` : `${t(`metric_${metric}`)} ${fmt(value, lang)}`
}

/** One logged set as text: "60 kg × 10", or "30 min · 6 km/h" for cardio. */
export const setLabel = (s: WorkoutSet, e: Exercise | undefined, t: T, lang: Lang) => {
  if (isTimed(s)) {
    const extra = e && s.value !== undefined ? metricText(e, s.value, t, lang) : ''
    return `${fmt(s.minutes!, lang)} min${extra ? ` · ${extra}` : ''}`
  }
  const unit = e ? unitFor(e) : 'kg'
  return setText(s.weight, s.reps, lang, e && isBodyweight(e) ? t('bodyweightShort') : '0 kg', unit)
}

export const STEP_OPTIONS = [0.5, 1, 1.25, 2, 2.5, 4, 5, 7.5, 10]
export const fmt = (n: number, lang: Lang) => (lang === 'de' ? String(round(n)).replace('.', ',') : String(round(n)))

/** Downscale a camera photo so the database stays small. */
export async function shrinkImage(file: File, max = 1200): Promise<Blob> {
  try {
    const bmp = await createImageBitmap(file)
    const scale = Math.min(1, max / Math.max(bmp.width, bmp.height))
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(bmp.width * scale)
    canvas.height = Math.round(bmp.height * scale)
    canvas.getContext('2d')!.drawImage(bmp, 0, 0, canvas.width, canvas.height)
    return await new Promise((res) => canvas.toBlob((b) => res(b ?? file), 'image/jpeg', 0.82))
  } catch {
    return file
  }
}

/** Your own photo if you took one, otherwise the built-in illustration. */
export function ExerciseThumb({ exercise, className = 'thumb' }: { exercise: Exercise; className?: string }) {
  if (exercise.photo) return <Photo blob={exercise.photo} className={className} />
  const src = builtinImage(exercise)
  if (src) return <img src={src} className={className} alt="" loading="lazy" />
  return <span className={`${className} placeholder`} />
}
