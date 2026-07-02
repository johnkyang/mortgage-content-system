import React from 'react';
import {useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {COLORS, FONTS, SPRING} from '../theme';

/**
 * The signature Vox/MagnatesMedia display headline: heavy condensed type with a
 * hard RED offset shadow that "snaps" in with a spring, plus a tiny overshoot
 * rotation for energy.
 */
export const RedShadowText: React.FC<{
  children: React.ReactNode;
  /** Local frame at which this text pops in. */
  appearAt?: number;
  fontSize?: number;
  color?: string;
  shadowColor?: string;
  shadowOffset?: number;
  rotate?: number;
  align?: 'left' | 'center' | 'right';
  maxWidth?: number;
}> = ({
  children,
  appearAt = 0,
  fontSize = 150,
  color = COLORS.ink,
  shadowColor = COLORS.red,
  shadowOffset = 10,
  rotate = -2,
  align = 'center',
  maxWidth = 960,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const s = spring({frame: frame - appearAt, fps, config: SPRING.pop});
  const scale = interpolate(s, [0, 1], [0.6, 1]);
  const opacity = interpolate(s, [0, 1], [0, 1]);
  // Shadow grows as the word lands — the "hit".
  const offset = interpolate(s, [0, 1], [0, shadowOffset]);
  const wobble = interpolate(s, [0, 0.7, 1], [rotate - 4, rotate + 1, rotate]);

  return (
    <div
      style={{
        fontFamily: FONTS.display,
        fontSize,
        lineHeight: 0.95,
        color,
        textAlign: align,
        maxWidth,
        letterSpacing: 1,
        textTransform: 'uppercase',
        transform: `scale(${scale}) rotate(${wobble}deg)`,
        opacity,
        textShadow: `${offset}px ${offset}px 0 ${shadowColor}`,
        WebkitTextStroke: `2px ${COLORS.ink}`,
      }}
    >
      {children}
    </div>
  );
};
