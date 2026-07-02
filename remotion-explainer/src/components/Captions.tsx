import React from 'react';
import {useCurrentFrame, useVideoConfig, spring, interpolate, AbsoluteFill} from 'remotion';
import {COLORS, FONTS} from '../theme';
import type {Caption, Highlight} from '../data/script';

const HIGHLIGHT_STYLE: Record<Highlight, {color: string; bg?: string}> = {
  money: {color: COLORS.ink, bg: COLORS.gold},
  percent: {color: COLORS.white, bg: COLORS.navy},
  warning: {color: COLORS.white, bg: COLORS.red},
  question: {color: COLORS.white, bg: COLORS.redDeep},
  key: {color: COLORS.paper, bg: COLORS.ink},
  green: {color: COLORS.white, bg: COLORS.green},
  none: {color: COLORS.ink},
};

/**
 * Word-chunk captions living in the lower safe zone (above the TikTok/Reels UI).
 * Each chunk pops with a spring; highlighted chunks (money, %, warnings,
 * questions) get a colored "sticker" background — the retention-editing look.
 * Only one chunk is visible at a time by design (karaoke style).
 */
export const Captions: React.FC<{captions: Caption[]; bottom?: number}> = ({
  captions,
  bottom = 360,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: bottom,
      }}
    >
      {captions.map((c, i) => {
        const end = c.from + c.durationInFrames;
        if (frame < c.from || frame > end) return null;

        const inSpring = spring({
          frame: frame - c.from,
          fps,
          config: {damping: 12, stiffness: 220, mass: 0.5},
        });
        const outFade = interpolate(frame, [end - 6, end], [1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const scale = interpolate(inSpring, [0, 1], [0.7, 1]);
        const style = HIGHLIGHT_STYLE[c.highlight ?? 'none'];
        const isSticker = Boolean(style.bg);

        return (
          <div
            key={i}
            style={{
              transform: `scale(${scale}) rotate(${isSticker ? -1.5 : 0}deg)`,
              opacity: outFade,
              fontFamily: FONTS.body,
              fontWeight: 800,
              fontSize: isSticker ? 74 : 66,
              lineHeight: 1.05,
              textAlign: 'center',
              maxWidth: 900,
              color: style.color,
              backgroundColor: style.bg ?? 'transparent',
              padding: isSticker ? '14px 28px' : '0',
              borderRadius: 18,
              boxShadow: isSticker ? '0 10px 0 rgba(20,18,16,0.9)' : 'none',
              textShadow: isSticker ? 'none' : '3px 3px 0 rgba(255,255,255,0.85)',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}
          >
            {c.text}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
