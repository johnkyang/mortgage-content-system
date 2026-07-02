import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig, spring} from 'remotion';
import {SceneFrame} from '../components/SceneFrame';
import {RedShadowText} from '../components/RedShadowText';
import {getScene} from '../data/script';
import {COLORS, FONTS} from '../theme';

/**
 * HOOK — a torn "20% DOWN" myth gets stamped/struck through as the word
 * "LIED TO" slams in. Pattern-interrupt open in the first second.
 */
export const Scene01Hook: React.FC = () => {
  const scene = getScene('S1_hook');
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Red diagonal strike-through across the myth.
  const strike = spring({frame: frame - 42, fps, config: {damping: 14, stiffness: 120}});
  const strikeW = interpolate(strike, [0, 1], [0, 760]);

  // Whole-frame shake on the "LIED TO" hit for a MrBeast-style impact.
  const hit = interpolate(frame, [42, 46, 50, 54], [0, 6, -4, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <SceneFrame captions={scene.captions} captionBottom={300}>
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          gap: 40,
          transform: `translateX(${hit}px)`,
        }}
      >
        <div style={{position: 'relative'}}>
          <div
            style={{
              fontFamily: FONTS.display,
              fontSize: 130,
              color: COLORS.inkSoft,
              opacity: interpolate(frame, [0, 20], [0, 1]),
              letterSpacing: 2,
            }}
          >
            “20% DOWN”
          </div>
          {/* Red strike-through. */}
          <div
            style={{
              position: 'absolute',
              top: '52%',
              left: '50%',
              width: strikeW,
              height: 16,
              backgroundColor: COLORS.red,
              transform: 'translate(-50%,-50%) rotate(-8deg)',
              boxShadow: '4px 4px 0 rgba(20,18,16,0.8)',
            }}
          />
        </div>

        <RedShadowText appearAt={42} fontSize={230} rotate={-3}>
          LIE.
        </RedShadowText>
      </AbsoluteFill>
    </SceneFrame>
  );
};
