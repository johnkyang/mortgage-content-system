import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {SceneFrame} from '../components/SceneFrame';
import {AnimatedCounter} from '../components/AnimatedCounter';
import {getScene} from '../data/script';
import {COLORS, FONTS} from '../theme';

const Card: React.FC<{glyph: string; title: string; sub: string; appearAt: number}> = ({
  glyph,
  title,
  sub,
  appearAt,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: frame - appearAt, fps, config: {damping: 15, stiffness: 130}});
  const y = interpolate(s, [0, 1], [80, 0]);
  const opacity = interpolate(s, [0, 1], [0, 1]);
  return (
    <div
      style={{
        transform: `translateY(${y}px)`,
        opacity,
        display: 'flex',
        alignItems: 'center',
        gap: 28,
        backgroundColor: COLORS.white,
        borderRadius: 24,
        padding: '26px 34px',
        width: 900,
        boxShadow: '10px 10px 0 rgba(20,18,16,0.9)',
      }}
    >
      <div style={{fontSize: 92}}>{glyph}</div>
      <div>
        <div style={{fontFamily: FONTS.display, fontSize: 58, color: COLORS.ink, lineHeight: 1}}>{title}</div>
        <div style={{fontFamily: FONTS.body, fontWeight: 700, fontSize: 36, color: COLORS.inkSoft}}>{sub}</div>
      </div>
    </div>
  );
};

/**
 * SOLUTION — stack the hidden strategies (low down payment + DPA + 2-1
 * buydown), then show the payment dropping in year one. Ends on the timeline
 * collapse: "5 years → a few months."
 */
export const Scene05Solution: React.FC = () => {
  const scene = getScene('S5_solution');
  const frame = useCurrentFrame();

  return (
    <SceneFrame captions={scene.captions} captionBottom={240}>
      <AbsoluteFill style={{justifyContent: 'flex-start', alignItems: 'center', paddingTop: 130, gap: 26}}>
        <div style={{fontFamily: FONTS.display, fontSize: 62, color: COLORS.ink, textShadow: `5px 5px 0 ${COLORS.red}`}}>
          STACK THESE 🧱
        </div>

        <Card glyph="💵" title="3% DOWN" sub="or 0% with VA / USDA" appearAt={20} />
        <Card glyph="🎁" title="ASSISTANCE" sub="grants cover thousands more" appearAt={80} />
        <Card glyph="📉" title="2-1 BUYDOWN" sub="lower payment in year one" appearAt={140} />

        {/* Payment dropping in year one. */}
        <div style={{display: 'flex', alignItems: 'baseline', gap: 20, marginTop: 6, opacity: interpolate(frame, [230, 250], [0, 1])}}>
          <div style={{fontFamily: FONTS.body, fontWeight: 800, fontSize: 40, color: COLORS.inkSoft}}>YR 1 PAYMENT</div>
          <AnimatedCounter to={2400} from={3200} appearAt={250} durationInFrames={40} prefix="$" fontSize={110} color={COLORS.green} />
        </div>
      </AbsoluteFill>
    </SceneFrame>
  );
};
