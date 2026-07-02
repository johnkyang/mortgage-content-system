import React from 'react';
import {z} from 'zod';
import {AbsoluteFill, Sequence, Audio, staticFile} from 'remotion';
import '../fonts';
import {SCENES} from '../data/script';
import {Scene01Hook} from '../scenes/Scene01Hook';
import {Scene02Problem} from '../scenes/Scene02Problem';
import {Scene03Escalation} from '../scenes/Scene03Escalation';
import {Scene04Reveal} from '../scenes/Scene04Reveal';
import {Scene05Solution} from '../scenes/Scene05Solution';
import {Scene06CTA} from '../scenes/Scene06CTA';
import {FlashTransition} from '../components/FlashTransition';

/** Composition props schema — surfaces a toggle in Remotion Studio. */
export const explainerSchema = z.object({
  /** Set true once you've added public/vo.mp3 and public/music.mp3. */
  withAudio: z.boolean(),
});

export type ExplainerProps = z.infer<typeof explainerSchema>;

const SCENE_COMPONENTS: Record<string, React.FC> = {
  S1_hook: Scene01Hook,
  S2_problem: Scene02Problem,
  S3_escalation: Scene03Escalation,
  S4_reveal: Scene04Reveal,
  S5_solution: Scene05Solution,
  S6_cta: Scene06CTA,
};

/**
 * Master timeline. Each scene is placed at its absolute frame from the script
 * data, with a white camera-flash on every cut. Audio is opt-in so the project
 * renders cleanly before the VO/music files exist.
 */
export const MortgageExplainer: React.FC<ExplainerProps> = ({withAudio}) => {
  return (
    <AbsoluteFill style={{backgroundColor: '#F4EFE6'}}>
      {SCENES.map((scene) => {
        const Comp = SCENE_COMPONENTS[scene.id];
        return (
          <Sequence
            key={scene.id}
            from={scene.from}
            durationInFrames={scene.durationInFrames}
            name={`${scene.beat} · ${scene.id}`}
          >
            <Comp />
          </Sequence>
        );
      })}

      {/* Camera-flash hits at every scene boundary (skip frame 0). */}
      {SCENES.slice(1).map((scene) => (
        <FlashTransition key={`flash-${scene.id}`} at={scene.from} />
      ))}

      {withAudio ? (
        <>
          <Audio src={staticFile('vo.mp3')} />
          <Audio src={staticFile('music.mp3')} volume={0.18} />
        </>
      ) : null}
    </AbsoluteFill>
  );
};
