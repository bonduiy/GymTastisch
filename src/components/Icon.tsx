/** Minimal stroke icon set (24×24, currentColor). */
const PATHS = {
  dumbbell: 'M5.5 6.5h2.5v11H5.5zM16 6.5h2.5v11H16zM2.5 9.5h3v5h-3zM18.5 9.5h3v5h-3zM8 12h8',
  list: 'M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01',
  history: 'M3.5 12a8.5 8.5 0 1 0 2.5-6M3.5 4v4h4M12 7.5V12l3 2',
  settings:
    'M4 7h10M18 7h2M4 17h4M12 17h8M16 4.5v5M10 14.5v5',
  plus: 'M12 5v14M5 12h14',
  pencil: 'M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4zM13.5 6.5l4 4',
  chevronRight: 'M9 5l7 7-7 7',
  chevronLeft: 'M15 5l-7 7 7 7',
  chevronDown: 'M5 9l7 7 7-7',
  x: 'M6 6l12 12M18 6L6 18',
  check: 'M4.5 12.5l5 5 10-11',
  arrowUp: 'M12 19V5M6 11l6-6 6 6',
  arrowDown: 'M12 5v14M6 13l6 6 6-6',
  play: 'M7 4.5v15l12.5-7.5z',
  target: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zM12 12h.01',
  trophy: 'M8 4h8v5a4 4 0 0 1-8 0V4zM8 6H4.5a3 3 0 0 0 3.5 4M16 6h3.5a3 3 0 0 1-3.5 4M12 13v4M8.5 20h7M10 17h4',
  bell: 'M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15L6 16zM10 20.5a2 2 0 0 0 4 0',
  camera: 'M4 8h3l2-3h6l2 3h3v11H4V8zM12 16.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z',
  upload: 'M12 15V4M7.5 8.5 12 4l4.5 4.5M5 15v4.5h14V15',
  download: 'M12 4v11M7.5 10.5 12 15l4.5-4.5M5 15v4.5h14V15',
  trash: 'M5 7h14M10 7V4.5h4V7M7 7l1 13h8l1-13',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7.5V12l3 2',
  calendar: 'M4.5 6h15v14h-15zM4.5 10h15M8.5 3.5v4M15.5 3.5v4',
  trendUp: 'M4 17l6-6 4 4 6-7M15 8h5v5',
  trendDown: 'M4 7l6 6 4-4 6 7M15 16h5v-5',
  chart: 'M5 20v-8M12 20V5M19 20v-5M3 20.5h18',
  flame: 'M12 21c3.6 0 6-2.5 6-6 0-3.7-2.7-6.2-4.4-9.3-.4 2.3-1.6 3.8-3 4.6.1-1.9-.6-3.7-1.9-5.3C7.4 8 6 10.6 6 15c0 3.5 2.4 6 6 6z',
  sparkle: 'M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9L12 17.5l-1.9-5.1-5.1-1.9 5.1-1.9zM18.5 16.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z',
  bulb: 'M9.5 18h5M10.5 21h3M12 3a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.3 1.1 2.2h5c0-.9.4-1.6 1.1-2.2A6 6 0 0 0 12 3z',
  moon: 'M19.5 14.5A7.5 7.5 0 0 1 9.5 4.5a7.5 7.5 0 1 0 10 10z',
  search: 'M10.5 17.5a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM15.5 15.5 20 20',
} as const

export type IconName = keyof typeof PATHS

export function Icon({ name, size = 22, className }: { name: IconName; size?: number; className?: string }) {
  const filled = name === 'play'
  return (
    <svg
      className={`icon ${className ?? ''}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={filled ? 1.5 : 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={PATHS[name]} />
    </svg>
  )
}
