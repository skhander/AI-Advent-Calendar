import {
  VideoCanvas,
  VideoPausedContext,
  type VideoAspectRatio,
  useVideoPlayer,
} from '@/lib/video';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

import {
  EvalsExploration,
  HomeFinale,
  HomeOpening,
  HomeSecondDoor,
  RagExploration,
} from './video_scenes/WalkthroughScenes';

export const SCENE_DURATIONS = {
  invitation: 7200,
  rag: 15300,
  anotherDoor: 6700,
  evals: 5800,
  collection: 5000,
};

const VIDEO_ASPECT_RATIO: VideoAspectRatio = '16:9';

const SCENES = [HomeOpening, RagExploration, HomeSecondDoor, EvalsExploration, HomeFinale];

export default function VideoTemplate({
  durations = SCENE_DURATIONS,
  loop = true,
  paused = false,
  onSceneChange,
}: {
  durations?: Record<string, number>;
  loop?: boolean;
  paused?: boolean;
  onSceneChange?: (sceneKey: string) => void;
} = {}) {
  const { currentSceneKey } = useVideoPlayer({ durations, loop, paused });
  const baseSceneKey = currentSceneKey.replace(/_r[12]$/, '') as keyof typeof SCENE_DURATIONS;
  const Scene = SCENES[Object.keys(SCENE_DURATIONS).indexOf(baseSceneKey)];
  useEffect(() => { onSceneChange?.(currentSceneKey); }, [currentSceneKey, onSceneChange]);
  return (
    <VideoPausedContext.Provider value={paused}>
      <VideoCanvas aspectRatio={VIDEO_ASPECT_RATIO} style={{ backgroundColor: '#19443e' }}>
        <AnimatePresence initial={false} mode="sync">
          {Scene && <Scene key={currentSceneKey} />}
        </AnimatePresence>
      </VideoCanvas>
    </VideoPausedContext.Provider>
  );
}
