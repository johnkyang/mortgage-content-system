import React from 'react';
import {Composition} from 'remotion';
import {MortgageExplainer, explainerSchema} from './compositions/MortgageExplainer';
import {TOTAL_FRAMES, FPS} from './data/script';
import {VIDEO} from './theme';

/**
 * Composition registry. The vertical 1080x1920 short is the deliverable.
 * `TheDownPaymentLie` = current topic; duplicate this Composition with a new
 * script data file to add more episodes.
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="TheDownPaymentLie"
        component={MortgageExplainer}
        schema={explainerSchema}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{withAudio: false}}
      />
    </>
  );
};
