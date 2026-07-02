import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {COLORS} from '../theme';

/**
 * Warm paper documentary background. Slowly breathing radial light so static
 * scenes never feel dead. Drop a real paper scan into assets/backgrounds and
 * pass it as `src` to layer a photographed grain on top.
 */
export const PaperTexture: React.FC<{
  tint?: string;
  src?: string;
}> = ({tint = COLORS.paper, src}) => {
  const frame = useCurrentFrame();
  // Very slow light breathing over ~8s.
  const glow = interpolate(frame % 240, [0, 120, 240], [0.9, 1, 0.9]);

  return (
    <AbsoluteFill style={{backgroundColor: tint}}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(120% 90% at 50% 30%, rgba(255,255,255,${
            0.5 * glow
          }) 0%, rgba(231,223,207,0) 55%)`,
        }}
      />
      {/* Subtle paper fiber via layered SVG turbulence. */}
      <svg width="100%" height="100%" style={{position: 'absolute', opacity: 0.05}}>
        <filter id="paperFiber">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#paperFiber)" />
      </svg>
      {src ? (
        <AbsoluteFill
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover',
            mixBlendMode: 'multiply',
            opacity: 0.25,
          }}
        />
      ) : null}
    </AbsoluteFill>
  );
};
