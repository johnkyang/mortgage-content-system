import React from 'react';
import {AbsoluteFill, Img, useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
// Note: the outer wrapper is a relative flex box (NOT AbsoluteFill) so the
// portrait centers inside whatever layout slot it's placed in.
import {COLORS} from '../theme';

/**
 * MagnatesMedia-style halftone portrait treatment: a cutout portrait with a
 * red offset "print" shadow and an SVG halftone dot overlay that fades in.
 * Pass a transparent-PNG portrait as `src` (see the halftone AI prompt in docs).
 * Renders a placeholder silhouette if no src is provided.
 */
export const HalftonePortrait: React.FC<{
  src?: string;
  appearAt?: number;
  size?: number;
  offset?: number;
}> = ({src, appearAt = 0, size = 720, offset = 22}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame: frame - appearAt, fps, config: {damping: 16, stiffness: 110}});
  const scale = interpolate(enter, [0, 1], [0.8, 1]);
  const opacity = interpolate(enter, [0, 1], [0, 1]);
  const dotFade = interpolate(frame, [appearAt + 6, appearAt + 24], [0, 0.5], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{position: 'relative', width: size, height: size, transform: `scale(${scale})`, opacity}}>
        {/* Red print-offset shadow behind the portrait. */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transform: `translate(${offset}px, ${offset}px)`,
            backgroundColor: COLORS.red,
            WebkitMaskImage: src ? `url(${src})` : undefined,
            WebkitMaskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            borderRadius: src ? 0 : '50% 50% 45% 45%',
          }}
        />
        {src ? (
          <Img src={src} style={{width: '100%', height: '100%', objectFit: 'contain'}} />
        ) : (
          // Placeholder silhouette so the scene composes before assets exist.
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: COLORS.ink,
              borderRadius: '50% 50% 45% 45%',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
          />
        )}
        {/* Halftone dot overlay. */}
        <AbsoluteFill style={{opacity: dotFade, mixBlendMode: 'multiply'}}>
          <svg width="100%" height="100%">
            <defs>
              <pattern id="halftone" width="14" height="14" patternUnits="userSpaceOnUse">
                <circle cx="4" cy="4" r="2.4" fill={COLORS.ink} />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#halftone)" />
          </svg>
        </AbsoluteFill>
      </div>
    </div>
  );
};
