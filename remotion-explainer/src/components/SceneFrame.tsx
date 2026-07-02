import React from 'react';
import {AbsoluteFill} from 'remotion';
import {PaperTexture} from './PaperTexture';
import {FilmGrain, Vignette} from './FilmGrain';
import {Captions} from './Captions';
import type {Caption} from '../data/script';

/**
 * Common scene chrome: background layer, the hero children, burned-in karaoke
 * captions in the lower safe zone, then grain + vignette on top. Keeps every
 * scene visually consistent so the piece reads as one system.
 */
export const SceneFrame: React.FC<{
  children: React.ReactNode;
  captions: Caption[];
  background?: React.ReactNode;
  captionBottom?: number;
}> = ({children, captions, background, captionBottom}) => {
  return (
    <AbsoluteFill>
      {background ?? <PaperTexture />}
      <AbsoluteFill>{children}</AbsoluteFill>
      <Captions captions={captions} bottom={captionBottom} />
      <FilmGrain opacity={0.07} />
      <Vignette strength={0.4} />
    </AbsoluteFill>
  );
};
