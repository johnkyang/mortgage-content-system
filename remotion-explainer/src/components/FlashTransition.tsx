import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {COLORS} from '../theme';

/**
 * A quick paper-white "camera flash" at scene cuts — the punchy hit that Vox /
 * MrBeast editing uses to mask a hard cut and re-grab attention. Place one at
 * each scene boundary frame.
 */
export const FlashTransition: React.FC<{at: number; color?: string}> = ({
  at,
  color = COLORS.white,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [at - 3, at, at + 5], [0, 0.9, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  if (opacity <= 0) return null;
  return <AbsoluteFill style={{backgroundColor: color, opacity, pointerEvents: 'none'}} />;
};
