import React from 'react';
import {useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {COLORS, FONTS} from '../theme';

/**
 * A circular sticker badge (emoji or short glyph) that pops with a spring and
 * a little overshoot. Used for the loan-type icons and CTA accents. Swap the
 * emoji for an SVG/PNG from assets/icons when finalized.
 */
export const IconBadge: React.FC<{
  glyph: string;
  label?: string;
  appearAt?: number;
  size?: number;
  bg?: string;
  color?: string;
}> = ({glyph, label, appearAt = 0, size = 200, bg = COLORS.ink, color = COLORS.paper}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = spring({frame: frame - appearAt, fps, config: {damping: 10, stiffness: 240, mass: 0.6}});
  const scale = interpolate(pop, [0, 1], [0, 1]);
  const rot = interpolate(pop, [0, 0.6, 1], [-12, 6, 0]);

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16}}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          backgroundColor: bg,
          color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: size * 0.5,
          transform: `scale(${scale}) rotate(${rot}deg)`,
          boxShadow: `10px 10px 0 ${COLORS.red}`,
        }}
      >
        {glyph}
      </div>
      {label ? (
        <div
          style={{
            opacity: scale,
            fontFamily: FONTS.body,
            fontWeight: 800,
            fontSize: 40,
            color: COLORS.ink,
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}
        >
          {label}
        </div>
      ) : null}
    </div>
  );
};
