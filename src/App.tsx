import { useCallback, useEffect, useMemo, useState } from 'react'
import { ExerciseDetail, ExercisesView } from './components/ExercisesView'
import { HistoryView } from './components/HistoryView'
import { Icon, type IconName } from './components/Icon'
import { loadRest, RestContext, RestTimerBar, saveRest, type RestState } from './components/RestTimer'
import { SettingsView } from './components/SettingsView'
import { StatsView } from './components/StatsView'
import { UpdateBanner } from './components/UpdateBanner'
import { WorkoutView } from './components/WorkoutView'
import { requestPersistence } from './db'
import { detectLang, I18nContext, makeT, type Key, type Lang } from './i18n'
import { NavContext, scrollToTop, type Tab } from './nav'
import { seedExercises } from './seed'
import { loadSettings, saveSettings, SettingsContext, type Settings } from './settings'

const TABS: { id: Tab; icon: IconName; label: Key }[] = [
  { id: 'workout', icon: 'dumbbell', label: 'tabWorkout' },
  { id: 'exercises', icon: 'list', label: 'tabExercises' },
  { id: 'stats', icon: 'chart', label: 'tabStats' },
  { id: 'history', icon: 'calendar', label: 'tabHistory' },
  { id: 'settings', icon: 'settings', label: 'tabSettings' },
]

export default function App() {
  const [settings, setSettings] = useState<Settings>(loadSettings)
  const [tab, setTabState] = useState<Tab>('workout')
  const [detail, setDetail] = useState<string>()
  const [rest, setRest] = useState<RestState | null>(loadRest)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    seedExercises().finally(() => setReady(true))
    void requestPersistence()
  }, [])

  const lang = settings.lang === 'auto' ? detectLang() : settings.lang
  const i18n = useMemo(() => ({ lang, t: makeT(lang) }), [lang])
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const settingsCtx = useMemo(
    () => ({
      settings,
      update: (patch: Partial<Settings>) =>
        setSettings((s) => {
          const next = { ...s, ...patch }
          saveSettings(next)
          return next
        }),
    }),
    [settings],
  )

  const start = useCallback((seconds: number) => {
    const r = { endAt: Date.now() + seconds * 1000, total: seconds }
    saveRest(r)
    setRest(r)
  }, [])
  const stop = useCallback(() => {
    saveRest(null)
    setRest(null)
  }, [])
  const restCtx = useMemo(() => ({ rest, start, stop }), [rest, start, stop])

  const nav = useMemo(
    () => ({
      tab,
      setTab: (t: Tab) => {
        setTabState(t)
        setDetail(undefined)
        scrollToTop()
      },
      openExercise: (id: string) => {
        setDetail(id)
        scrollToTop()
      },
    }),
    [tab],
  )

  if (!settings.langChosen) {
    return <Welcome onPick={(l) => settingsCtx.update({ lang: l, langChosen: true })} />
  }

  return (
    <I18nContext.Provider value={i18n}>
      <SettingsContext.Provider value={settingsCtx}>
        <RestContext.Provider value={restCtx}>
          <NavContext.Provider value={nav}>
            <UpdateBanner />
            <div className="scroller">
              <main className={rest ? 'with-rest' : ''}>
                {ready && (
                  <>
                    {/* Keep the workout mounted so typed values survive a quick look elsewhere. */}
                    <div hidden={tab !== 'workout' || !!detail}>
                      <WorkoutView />
                    </div>
                    {detail ? (
                      <ExerciseDetail id={detail} onBack={() => setDetail(undefined)} />
                    ) : (
                      <>
                        {tab === 'exercises' && <ExercisesView />}
                        {tab === 'stats' && <StatsView />}
                        {tab === 'history' && <HistoryView />}
                        {tab === 'settings' && <SettingsView />}
                      </>
                    )}
                  </>
                )}
              </main>
            </div>
            <RestTimerBar />
            <nav className="tabbar">
              {TABS.map((x) => (
                <button
                  key={x.id}
                  className={tab === x.id ? 'active' : ''}
                  onClick={() => nav.setTab(x.id)}
                  aria-current={tab === x.id ? 'page' : undefined}
                >
                  <Icon name={x.icon} size={24} />
                  <span>{i18n.t(x.label)}</span>
                </button>
              ))}
            </nav>
          </NavContext.Provider>
        </RestContext.Provider>
      </SettingsContext.Provider>
    </I18nContext.Provider>
  )
}

function Welcome({ onPick }: { onPick: (lang: Lang) => void }) {
  const choices: { lang: Lang; label: string; code: string }[] = [
    { lang: 'de', label: 'Deutsch', code: 'DE' },
    { lang: 'en', label: 'English', code: 'EN' },
  ]
  // Suggested language first.
  if (detectLang() === 'en') choices.reverse()
  return (
    <main className="welcome">
      <img src={`${import.meta.env.BASE_URL}pwa-192.png`} alt="" className="welcome-logo" />
      <h1>GymTastisch</h1>
      <p className="muted">Sprache wählen · Choose your language</p>
      <div className="welcome-choices">
        {choices.map((c) => (
          <button key={c.lang} className="lang-choice" onClick={() => onPick(c.lang)}>
            <span className="lang-code" aria-hidden>
              {c.code}
            </span>
            <span className="grow">{c.label}</span>
            <Icon name="chevronRight" size={20} className="chev" />
          </button>
        ))}
      </div>
      <p className="muted small">Später in den Einstellungen änderbar · You can change it later in Settings</p>
    </main>
  )
}
