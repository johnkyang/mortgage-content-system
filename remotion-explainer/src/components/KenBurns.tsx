import React from 'react';
import {AbsoluteFill, Img, useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {COLORS} from '../theme';

/**
 * Slow zoom + drift on a background image (the documentary "living photo").
 * Falls back to a styled color field if no src is supplied yet, so scenes
 * render before AI assets exist. `depth` scales the parallax move.
 */
export const KenBurns: React.FC<{
  src?: string;
  from?: {scale: number; x: number; y: number};
  to?: {scale: number; x: number; y: number};
  durationInFrames?: number;
  fallback?: string;
}> = ({
  src,
  from = {scale: 1.05, x: 0, y: 0},
  to = {scale: 1.18, x: -30, y: 20},
  durationInFrames,
  fallback = COLORS.paperDeep,
}) => {
  const frame = useCurrentFrame();
  const {durationInFrames: compDur} = useVideoConfig();
  const dur = durationInFrames ?? compDur;

  const p = interpolate(frame, [0, dur], [0, 1], {extrapolateRight: 'clamp'});
  const scale = interpolate(p, [0, 1], [from.scale, to.scale]);
  const x = interpolate(p, [0, 1], [from.x, to.x]);
  const y = interpolate(p, [0, 1], [from.y, to.y]);

  return (
    <AbsoluteFill style={{overflow: 'hidden', backgroundColor: fallback}}>
      <AbsoluteFill style={{transform: `translate(${x}px, ${y}px) scale(${scale})`}}>
        {src ? (
          <Img src={src} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
        ) : (
          <AbsoluteFill
            style={{
              background: `linear-gradient(160deg, ${COLORS.paper} 0%, ${fallback} 100%)`,
            }}
          />
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * Parallax layer: moves opposite the camera drift. Wrap foreground cutouts in
 * this to sit them "in front of" the KenBurns background.
 */
export const Parallax: React.FC<{
  children: React.ReactNode;
  strength?: number;
  appearAt?: number;
}> = ({children, strength = 40, appearAt = 0}) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const enter = spring({frame: frame - appearAt, fps, config: {damping: 18, stiffness: 90}});
  const p = interpolate(frame, [0, durationInFrames], [0, 1]);
  const x = interpolate(p, [0, 1], [strength, -strength]);
  const y = interpolate(enter, [0, 1], [60, 0]);
  const opacity = interpolate(enter, [0, 1], [0, 1]);
  return (
    <AbsoluteFill style={{transform: `translate(${x}px, ${y}px)`, opacity}}>
      {children}
    </AbsoluteFill>
  );
};
