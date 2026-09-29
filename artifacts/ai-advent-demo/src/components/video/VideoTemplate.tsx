import {
  VideoCanvas,
  VideoPausedContext,
  type VideoAspectRatio,
  useVideoPlayer,
} from '@/lib/video';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';

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

const SCENE_START_SEC: Record<string, number> = (() => {
  const result: Record<string, number> = {};
  let elapsed = 0;
  for (const [key, duration] of Object.entries(SCENE_DURATIONS)) {
    result[key] = elapsed / 1000;
    elapsed += duration;
  }
  return result;
})();

export default function VideoTemplate({
  durations = SCENE_DURATIONS,
  loop = true,
  paused = false,
  muted = false,
  onSceneChange,
}: {
  durations?: Record<string, number>;
  loop?: boolean;
  paused?: boolean;
  muted?: boolean;
  onSceneChange?: (sceneKey: string) => void;
} = {}) {
  const { currentSceneKey } = useVideoPlayer({ durations, loop, paused });
  const baseSceneKey = currentSceneKey.replace(/_r[12]$/, '') as keyof typeof SCENE_DURATIONS;
  const Scene = SCENES[Object.keys(SCENE_DURATIONS).indexOf(baseSceneKey)];
  const audioRef = useRef<HTMLAudioElement>(null);
  const lastSceneKeyRef = useRef<string | null>(null);

  useEffect(() => { onSceneChange?.(currentSceneKey); }, [currentSceneKey, onSceneChange]);
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.4;
    if (paused) { audio.pause(); return; }
    if (lastSceneKeyRef.current !== currentSceneKey) {
      lastSceneKeyRef.current = currentSceneKey;
      const target = SCENE_START_SEC[baseSceneKey] ?? 0;
      if (Math.abs(audio.currentTime - target) > 0.18) audio.currentTime = target;
    }
    audio.play().catch(() => {});
  }, [currentSceneKey, baseSceneKey, paused, muted]);
  return (
    <VideoPausedContext.Provider value={paused}>
      <VideoCanvas aspectRatio={VIDEO_ASPECT_RATIO} style={{ backgroundColor: '#19443e' }}>
        <AnimatePresence initial={false} mode="sync">
          {Scene && <Scene key={currentSceneKey} />}
        </AnimatePresence>
        <audio ref={audioRef} src={`${import.meta.env.BASE_URL}audio/bg_music.mp3`} preload="auto" autoPlay muted={muted} />
      </VideoCanvas>
    </VideoPausedContext.Provider>
  );
}
