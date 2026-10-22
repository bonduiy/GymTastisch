import { createContext, useContext } from 'react'
import type { Lang } from './i18n'

export interface Settings {
  lang: 'auto' | Lang
  defaultRest: number
  sound: boolean
  keepAwake: boolean
  weightStep: number
  /** Target rep range for the first set; outside it the app suggests a new weight. */
  repMin: number
  repMax: number
  /** Workouts per week to aim for. */
  weeklyGoal: number
  /** Set once the language was picked on the welcome screen. */
  langChosen: boolean
  /** Bumped when a default changes for everyone, see loadSettings. */
  version: number
}

export const DEFAULT_SETTINGS: Settings = {
  lang: 'auto',
  defaultRest: 120,
  sound: true,
  keepAwake: true,
  weightStep: 1,
  repMin: 8,
  repMax: 12,
  weeklyGoal: 3,
  langChosen: false,
  version: 2,
}

const KEY = 'gymtastisch.settings'

export function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const saved = JSON.parse(raw) as Partial<Settings>
      // Version 2: the default weight step became 1 kg; the old default of 2.5 kg moves along.
      if ((saved.version ?? 1) < 2 && saved.weightStep === 2.5) saved.weightStep = 1
      return { ...DEFAULT_SETTINGS, ...saved, version: DEFAULT_SETTINGS.version }
    }
  } catch {
    // storage unavailable or corrupt
  }
  return DEFAULT_SETTINGS
}

export function saveSettings(s: Settings) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s))
  } catch {
    // ignore
  }
}

export const SettingsContext = createContext<{
  settings: Settings
  update: (patch: Partial<Settings>) => void
}>({ settings: DEFAULT_SETTINGS, update: () => {} })

export const useSettings = () => useContext(SettingsContext)
