import { useMemo } from 'react'

// Hash-based PRNG: x and y use different multipliers so they're uncorrelated,
// eliminating the diagonal-banding artefact of the old golden-angle formula.
function floatHash(n: number): number {
  const s = Math.sin(n) * 43758.5453
  return s - Math.floor(s)  // always in [0, 1)
}

interface StarFieldProps {
  count?: number
  /** Different seed → different star pattern; same seed → stable positions */
  seed?: number
}

export default function StarField({ count = 120, seed = 0 }: StarFieldProps) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id:       i,
        x:        floatHash(i * 127.1  + seed + 11) * 100,
        y:        floatHash(i * 311.7  + seed + 23) * 100,
        size:     1.0 + floatHash(i * 419.3 + seed) * 1.8,   // 1.0–2.8 px
        opacity:  0.2  + floatHash(i * 7.53  + seed) * 0.45, // 0.20–0.65
        duration: 2    + floatHash(i * 2.71  + seed) * 3,    // 2–5 s
        delay:    floatHash(i * 1.41 + seed) * 5,             // 0–5 s
      })),
    [count, seed],
  )

  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((s) => (
        <div
          key={s.id}
          className="star-dot absolute rounded-full"
          style={{
            left:       `${s.x}%`,
            top:        `${s.y}%`,
            width:      `${s.size}px`,
            height:     `${s.size}px`,
            background: 'var(--color-star, #fff)',
            opacity:    s.opacity,
            animation:  `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}
