import React from 'react';
import {AbsoluteFill, useCurrentFrame, random} from 'remotion';

/**
 * Animated film grain + light noise. Reseeds every frame so it shimmers like
 * real 16mm grain. Kept cheap: one turbulence layer whose seed advances.
 */
export const FilmGrain: React.FC<{opacity?: number}> = ({opacity = 0.08}) => {
  const frame = useCurrentFrame();
  // Deterministic per-frame seed (render-safe — no Math.random()).
  const seed = Math.floor(random(`grain-${frame}`) * 1000);

  return (
    <AbsoluteFill style={{pointerEvents: 'none', mixBlendMode: 'overlay', opacity}}>
      <svg width="100%" height="100%">
        <filter id={`grain-${frame}`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="2"
            seed={seed}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#grain-${frame})`} />
      </svg>
    </AbsoluteFill>
  );
};

/** Cinematic edge vignette to focus the eye center-frame. */
export const Vignette: React.FC<{strength?: number}> = ({strength = 0.45}) => (
  <AbsoluteFill
    style={{
      pointerEvents: 'none',
      background: `radial-gradient(90% 70% at 50% 45%, rgba(0,0,0,0) 55%, rgba(0,0,0,${strength}) 100%)`,
    }}
  />
);
