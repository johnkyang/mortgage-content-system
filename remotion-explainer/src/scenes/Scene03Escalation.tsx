import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {SceneFrame} from '../components/SceneFrame';
import {AnimatedCounter} from '../components/AnimatedCounter';
import {IconBadge} from '../components/IconBadge';
import {getScene} from '../data/script';
import {COLORS, FONTS} from '../theme';

/**
 * ESCALATION — the math of the trap. $100,000 counts up fast; then a slow,
 * almost-painful 4-year progress bar crawls while a "prices rising" arrow ticks
 * past it. The slowness is the point.
 */
export const Scene03Escalation: React.FC = () => {
  const scene = getScene('S3_escalation');
  const frame = useCurrentFrame();

  // 4-year savings bar crawls (deliberately slow) from ~frame 230.
  const bar = interpolate(frame, [230, 400], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <SceneFrame captions={scene.captions} captionBottom={260}>
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', gap: 60}}>
        <IconBadge glyph="🏠" appearAt={8} size={190} label="$500,000 HOME" bg={COLORS.navy} />

        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <div style={{fontFamily: FONTS.body, fontWeight: 800, fontSize: 46, color: COLORS.inkSoft}}>
            20% DOWN =
          </div>
          <AnimatedCounter
            to={100000}
            appearAt={70}
            durationInFrames={40}
            prefix="$"
            fontSize={200}
            color={COLORS.ink}
          />
        </div>

        {/* The painful savings crawl. */}
        <div style={{width: 820, opacity: interpolate(frame, [220, 240], [0, 1])}}>
          <div
            style={{
              fontFamily: FONTS.body,
              fontWeight: 800,
              fontSize: 40,
              color: COLORS.ink,
              marginBottom: 14,
              textAlign: 'center',
            }}
          >
            SAVING $2,000/MO…
          </div>
          <div style={{height: 46, width: '100%', backgroundColor: COLORS.paperDeep, borderRadius: 24, overflow: 'hidden', boxShadow: '6px 6px 0 rgba(20,18,16,0.8)'}}>
            <div style={{height: '100%', width: `${bar * 100}%`, backgroundColor: COLORS.red}} />
          </div>
          <div style={{fontFamily: FONTS.display, fontSize: 70, color: COLORS.red, textAlign: 'center', marginTop: 18, opacity: interpolate(frame, [300, 320], [0, 1])}}>
            4+ YEARS
          </div>
        </div>
      </AbsoluteFill>
    </SceneFrame>
  );
};
