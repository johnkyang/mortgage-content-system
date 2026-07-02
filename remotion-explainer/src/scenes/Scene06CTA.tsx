import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {SceneFrame} from '../components/SceneFrame';
import {HalftonePortrait} from '../components/HalftonePortrait';
import {getScene} from '../data/script';
import {COLORS, FONTS} from '../theme';

/**
 * CTA — John Yang halftone portrait up top, brand line, then the lead-gen ask.
 * The "HOME" keyword pulses to drive comments. Drop a transparent-PNG portrait
 * at assets/characters/john_yang_halftone.png and pass it as `src` to the
 * HalftonePortrait below.
 */
export const Scene06CTA: React.FC = () => {
  const scene = getScene('S6_cta');
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const nameIn = spring({frame: frame - 12, fps, config: {damping: 16, stiffness: 120}});
  const askIn = spring({frame: frame - 34, fps, config: {damping: 14, stiffness: 160}});
  // Gentle pulse on the keyword pill to catch the eye.
  const pulse = 1 + 0.045 * Math.sin((frame / fps) * Math.PI * 3);

  return (
    <SceneFrame captions={scene.captions} captionBottom={170}>
      <AbsoluteFill
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingTop: 120,
        }}
      >
        {/* Portrait sits in its own fixed block so nothing overlaps it. */}
        <div style={{height: 460, width: 460}}>
          <HalftonePortrait appearAt={4} size={420} /* src="assets/characters/john_yang_halftone.png" */ />
        </div>

        <div
          style={{
            opacity: nameIn,
            transform: `translateY(${interpolate(nameIn, [0, 1], [30, 0])}px)`,
            fontFamily: FONTS.display,
            fontSize: 58,
            color: COLORS.ink,
            marginTop: 24,
            textShadow: `4px 4px 0 ${COLORS.red}`,
          }}
        >
          JOHN YANG · loanDepot
        </div>

        {/* The ask — a red pill so it reads as a button, not a headline over art. */}
        <div
          style={{
            marginTop: 36,
            transform: `scale(${pulse * interpolate(askIn, [0, 1], [0.7, 1])})`,
            opacity: askIn,
            backgroundColor: COLORS.red,
            color: COLORS.white,
            fontFamily: FONTS.display,
            fontSize: 92,
            padding: '22px 52px',
            borderRadius: 26,
            boxShadow: `10px 10px 0 ${COLORS.ink}`,
            letterSpacing: 1,
          }}
        >
          💬 COMMENT “HOME”
        </div>

        <div
          style={{
            marginTop: 30,
            fontFamily: FONTS.body,
            fontWeight: 800,
            fontSize: 42,
            color: COLORS.inkSoft,
            textAlign: 'center',
            opacity: interpolate(frame, [70, 90], [0, 1]),
          }}
        >
          …and I'll send your personalized plan.
        </div>
      </AbsoluteFill>
    </SceneFrame>
  );
};
