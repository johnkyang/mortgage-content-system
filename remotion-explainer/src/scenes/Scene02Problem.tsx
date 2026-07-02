import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig, spring} from 'remotion';
import {SceneFrame} from '../components/SceneFrame';
import {KenBurns} from '../components/KenBurns';
import {getScene} from '../data/script';
import {COLORS, FONTS} from '../theme';

/**
 * PROBLEM — a buyer stuck saving while a red "home price" line climbs away from
 * them. Drives the "you're falling behind" tension.
 */
export const Scene02Problem: React.FC = () => {
  const scene = getScene('S2_problem');
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Line-draw of the rising price trend.
  const draw = interpolate(frame, [40, 150], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const points = [
    [80, 780],
    [280, 700],
    [480, 690],
    [680, 560],
    [880, 470],
    [1000, 360],
  ];
  const total = points.length - 1;
  const shown = Math.max(1, Math.floor(draw * total) + 1);
  const path = points.slice(0, shown + 1).map((p) => p.join(',')).join(' ');
  const tip = points[Math.min(shown, total)];

  const arrowPop = spring({frame: frame - 150, fps, config: {damping: 12, stiffness: 180}});

  return (
    <SceneFrame
      captions={scene.captions}
      captionBottom={280}
      background={
        <KenBurns
          // Drop assets/backgrounds/S2_neighborhood.jpg here later.
          fallback={COLORS.paperDeep}
          from={{scale: 1.08, x: 20, y: 0}}
          to={{scale: 1.2, x: -20, y: -20}}
        />
      }
    >
      <AbsoluteFill style={{padding: 60}}>
        <div
          style={{
            fontFamily: FONTS.display,
            fontSize: 60,
            color: COLORS.ink,
            marginTop: 120,
            textAlign: 'center',
            textShadow: `5px 5px 0 ${COLORS.red}`,
          }}
        >
          HOME PRICES
        </div>

        <svg viewBox="0 0 1080 900" width="100%" height="900" style={{position: 'absolute', top: 260, left: 0}}>
          {/* baseline */}
          <line x1="70" y1="800" x2="1010" y2="800" stroke={COLORS.inkSoft} strokeWidth="4" opacity="0.4" />
          <polyline
            points={path}
            fill="none"
            stroke={COLORS.red}
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{filter: 'drop-shadow(6px 6px 0 rgba(20,18,16,0.5))'}}
          />
          {/* Rising tip marker */}
          <circle cx={tip[0]} cy={tip[1]} r={14 * arrowPop} fill={COLORS.red} />
          {/* The buyer, stuck at the bottom */}
          <text x="120" y="770" fontSize="70">🧍</text>
        </svg>
      </AbsoluteFill>
    </SceneFrame>
  );
};
