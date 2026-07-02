import {Config} from '@remotion/cli/config';

// Vertical short-form: 1080x1920, 30fps. See src/Root.tsx for composition metadata.
Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.setConcurrency(null); // auto
Config.setChromiumOpenGlRenderer('angle');
