import React from 'react';
import {useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {COLORS, FONTS} from '../theme';

/**
 * Odometer-style number that counts up. Used for the $100,000 vs $15,000 and
 * percentage reveals — the "big number" retention beat.
 */
export const AnimatedCounter: React.FC<{
  to: number;
  from?: number;
  appearAt?: number;
  durationInFrames?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  fontSize?: number;
  color?: string;
}> = ({
  to,
  from = 0,
  appearAt = 0,
  durationInFrames = 30,
  prefix = '',
  suffix = '',
  decimals = 0,
  fontSize = 130,
  color = COLORS.ink,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const progress = interpolate(
    frame,
    [appearAt, appearAt + durationInFrames],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  // Ease-out for a natural "settle".
  const eased = 1 - Math.pow(1 - progress, 3);
  const value = from + (to - from) * eased;

  const pop = spring({frame: frame - appearAt, fps, config: {damping: 12, stiffness: 200}});
  const scale = interpolate(pop, [0, 1], [0.7, 1]);

  return (
    <div
      style={{
        fontFamily: FONTS.display,
        fontSize,
        color,
        transform: `scale(${scale})`,
        letterSpacing: 1,
        textShadow: `6px 6px 0 ${COLORS.red}`,
      }}
    >
      {prefix}
      {value.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </div>
  );
};
