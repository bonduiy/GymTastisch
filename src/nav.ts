import { createContext, useContext } from 'react'

export type Tab = 'workout' | 'exercises' | 'stats' | 'history' | 'settings'

export const NavContext = createContext<{
  tab: Tab
  setTab: (t: Tab) => void
  openExercise: (id: string) => void
}>({ tab: 'workout', setTab: () => {}, openExercise: () => {} })

export const useNav = () => useContext(NavContext)

/** Pages scroll inside `.scroller`, not the document (keeps fixed bars pinned on iOS). */
export function scrollToTop() {
  document.querySelector('.scroller')?.scrollTo(0, 0)
}
