import React from 'react';
import {useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {COLORS, FONTS} from '../theme';

export interface Bar {
  label: string;
  /** 0..1 relative height. */
  value: number;
  color?: string;
  caption?: string;
}

/**
 * Vertical bar chart that grows from the baseline with a staggered spring.
 * Used to contrast down-payment options (0% / 3% / 3.5% / 20%).
 */
export const BarGrow: React.FC<{
  bars: Bar[];
  appearAt?: number;
  height?: number;
  barWidth?: number;
  gap?: number;
}> = ({bars, appearAt = 0, height = 620, barWidth = 150, gap = 40}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <div style={{display: 'flex', alignItems: 'flex-end', gap, height}}>
      {bars.map((b, i) => {
        const start = appearAt + i * 8;
        const grow = spring({frame: frame - start, fps, config: {damping: 16, stiffness: 120}});
        const h = interpolate(grow, [0, 1], [0, b.value * height]);
        const labelOpacity = interpolate(frame, [start + 6, start + 16], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        return (
          <div key={i} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{opacity: labelOpacity, fontFamily: FONTS.display, fontSize: 52, color: COLORS.ink, marginBottom: 12, textShadow: `4px 4px 0 ${COLORS.red}`}}>
              {b.caption}
            </div>
            <div
              style={{
                width: barWidth,
                height: h,
                backgroundColor: b.color ?? COLORS.navy,
                borderRadius: '10px 10px 0 0',
                boxShadow: '8px 8px 0 rgba(20,18,16,0.9)',
              }}
            />
            <div
              style={{
                opacity: labelOpacity,
                fontFamily: FONTS.body,
                fontWeight: 800,
                fontSize: 34,
                color: COLORS.ink,
                marginTop: 16,
                textTransform: 'uppercase',
                letterSpacing: 1,
              }}
            >
              {b.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};
