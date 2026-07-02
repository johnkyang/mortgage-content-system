import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {SceneFrame} from '../components/SceneFrame';
import {BarGrow, Bar} from '../components/BarGrow';
import {getScene} from '../data/script';
import {COLORS, FONTS} from '../theme';

/**
 * REVEAL — the myth breaks. Four real down-payment options grow as bars, then
 * the $15,000-vs-$100,000 reframe lands. This is the "I never knew that" beat.
 */
export const Scene04Reveal: React.FC = () => {
  const scene = getScene('S4_reveal');
  const frame = useCurrentFrame();

  // Bars relative to the $100k "20%" bar.
  const bars: Bar[] = [
    {label: 'VA / USDA', value: 0.03, caption: '0%', color: COLORS.green},
    {label: 'Conv.', value: 0.15, caption: '3%', color: COLORS.navy},
    {label: 'FHA', value: 0.175, caption: '3.5%', color: COLORS.navy},
    {label: 'The "rule"', value: 1.0, caption: '20%', color: COLORS.red},
  ];

  const reveal = interpolate(frame, [430, 470], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <SceneFrame captions={scene.captions} captionBottom={240}>
      <AbsoluteFill style={{justifyContent: 'flex-start', alignItems: 'center', paddingTop: 150}}>
        <div
          style={{
            fontFamily: FONTS.display,
            fontSize: 66,
            color: COLORS.ink,
            textShadow: `5px 5px 0 ${COLORS.red}`,
            marginBottom: 30,
          }}
        >
          REAL MINIMUMS
        </div>

        <BarGrow bars={bars} appearAt={90} height={560} barWidth={150} gap={44} />

        {/* Emotional payoff badge — complements (does not duplicate) the caption. */}
        <div
          style={{
            opacity: reveal,
            transform: `scale(${interpolate(reveal, [0, 1], [0.8, 1])})`,
            marginTop: 40,
            backgroundColor: COLORS.green,
            color: COLORS.white,
            fontFamily: FONTS.display,
            fontSize: 76,
            padding: '18px 46px',
            borderRadius: 20,
            boxShadow: '10px 10px 0 rgba(20,18,16,0.9)',
            transformOrigin: 'center',
          }}
        >
          ✓ YOU CAN START NOW
        </div>
      </AbsoluteFill>
    </SceneFrame>
  );
};
