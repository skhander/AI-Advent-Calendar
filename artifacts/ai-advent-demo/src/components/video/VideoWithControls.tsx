import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { ChevronDown, ChevronUp, Pause, Play, Repeat, Volume2, VolumeX } from 'lucide-react';

import VideoTemplate, { SCENE_DURATIONS } from './VideoTemplate';
import { useSceneControls } from './useSceneControls';

const SCENE_DETAILS: Record<string, { title: string; filePath: string }> = {
  invitation: { title: 'The calendar', filePath: 'src/components/video/video_scenes/WalkthroughScenes.tsx' },
  rag: { title: 'RAG lesson', filePath: 'src/components/video/video_scenes/WalkthroughScenes.tsx' },
  anotherDoor: { title: 'Another door', filePath: 'src/components/video/video_scenes/WalkthroughScenes.tsx' },
  evals: { title: 'Evals lesson', filePath: 'src/components/video/video_scenes/WalkthroughScenes.tsx' },
  collection: { title: 'Complete collection', filePath: 'src/components/video/video_scenes/WalkthroughScenes.tsx' },
};

function formatTime(ms: number) {
  const seconds = Math.floor(Math.max(ms, 0) / 1000);
  return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
}

function PlaybackStatus({
  sceneKeys, activeIndex, activeDuration, activeStartTime, totalDuration, tick, paused, onJumpTo,
}: {
  sceneKeys: string[]; activeIndex: number; activeDuration: number; activeStartTime: number;
  totalDuration: number; tick: number; paused: boolean; onJumpTo: (index: number) => void;
}) {
  const [elapsed, setElapsed] = useState(0);
  const base = useRef(0);
  useEffect(() => { setElapsed(0); base.current = 0; }, [tick]);
  useEffect(() => {
    if (paused) return;
    const start = performance.now();
    const interval = window.setInterval(() => setElapsed(base.current + performance.now() - start), 60);
    return () => { clearInterval(interval); base.current += performance.now() - start; };
  }, [tick, paused]);
  const time = Math.min(totalDuration, activeStartTime + Math.min(elapsed, activeDuration));
  return (
    <>
      <div className="scene-progress" role="group" aria-label="Jump to a scene">
        {sceneKeys.map((key, index) => (
          <button
            key={key}
            className="scene-segment"
            aria-label={`Jump to scene ${index + 1}: ${SCENE_DETAILS[key].title}`}
            aria-current={index === activeIndex ? 'true' : undefined}
            onClick={() => onJumpTo(index)}
          >
            <span style={{ width: `${index === activeIndex ? Math.min(100, elapsed / activeDuration * 100) : 0}%` }} />
          </button>
        ))}
      </div>
      <span className="scene-counter">{activeIndex + 1}/{sceneKeys.length}</span>
      <span className="scene-timer" role="timer" aria-label={`Playback time ${formatTime(time)} of ${formatTime(totalDuration)}`}>
        {formatTime(time)} / {formatTime(totalDuration)}
      </span>
    </>
  );
}

export default function VideoWithControls() {
  const isIframed = typeof window !== 'undefined' && window.self !== window.top;
  const controls = useSceneControls(SCENE_DURATIONS);
  const [muted, setMuted] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [tapPinned, setTapPinned] = useState(false);
  const sensorRef = useRef<HTMLDivElement>(null);

  const handleJumpTo = useCallback((index: number) => {
    controls.jumpTo(index);
    const key = controls.sceneKeys[index];
    const details = SCENE_DETAILS[key];
    if (details?.filePath) {
      window.parent.postMessage({
        type: 'REPLIT_VIDEO_SCENE_SELECTED',
        payload: {
          sceneIndex: index, sceneCount: controls.sceneKeys.length,
          sceneTitle: details.title, filePath: details.filePath, lineNumber: 1,
        },
      }, '*');
    }
  }, [controls.jumpTo, controls.sceneKeys]);

  useEffect(() => {
    if (!controls.paused) return;
    const animations = document.getAnimations().filter(animation => animation.playState === 'running');
    animations.forEach(animation => animation.pause());
    return () => animations.forEach(animation => animation.play());
  }, [controls.paused]);

  useEffect(() => {
    if (!(collapsed && tapPinned)) return;
    const dismiss = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' && sensorRef.current && !sensorRef.current.contains(event.target as Node)) setTapPinned(false);
    };
    document.addEventListener('pointerdown', dismiss);
    return () => document.removeEventListener('pointerdown', dismiss);
  }, [collapsed, tapPinned]);

  const pointerEnter = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse') setHovering(true);
  };
  const pointerLeave = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse') setHovering(false);
  };

  if (!isIframed) return <VideoTemplate />;

  const visible = !collapsed || hovering || tapPinned;
  return (
    <div className="video-with-controls">
      <VideoTemplate
        key={controls.mountKey}
        durations={controls.durations}
        loop
        paused={controls.paused}
        muted={muted}
        onSceneChange={controls.onSceneChange}
      />
      <div
        ref={sensorRef}
        className="control-sensor"
        onPointerEnter={pointerEnter}
        onPointerLeave={pointerLeave}
        onPointerDown={event => {
          if (event.pointerType !== 'mouse' && collapsed) setTapPinned(true);
        }}
      >
        <div className="control-hit-area" />
        <div className={`control-bar ${visible ? 'control-bar-visible' : 'control-bar-hidden'}`} aria-hidden={!visible}>
          <button title={controls.paused ? 'Play' : 'Pause'} aria-label={controls.paused ? 'Play' : 'Pause'} onClick={controls.togglePause}>
            {controls.paused ? <Play /> : <Pause />}
          </button>
          <button title="Loop current scene" aria-label="Loop current scene" aria-pressed={controls.locked} onClick={controls.toggleLock}>
            <Repeat />
          </button>
          <button title={muted ? 'Unmute' : 'Mute'} aria-label={muted ? 'Unmute' : 'Mute'} onClick={() => setMuted(value => !value)}>
            {muted ? <VolumeX /> : <Volume2 />}
          </button>
          <span className="control-divider" />
          <PlaybackStatus
            sceneKeys={controls.sceneKeys}
            activeIndex={controls.activeIndex}
            activeDuration={controls.activeDuration}
            activeStartTime={controls.activeStartTime}
            totalDuration={controls.totalDuration}
            tick={controls.tick}
            paused={controls.paused}
            onJumpTo={handleJumpTo}
          />
          <button
            title={collapsed ? 'Show controls' : 'Hide controls'}
            aria-label={collapsed ? 'Show controls' : 'Hide controls'}
            aria-expanded={!collapsed}
            onClick={() => {
              if (!collapsed) { setHovering(false); setTapPinned(false); }
              setCollapsed(value => !value);
            }}
          >
            {collapsed ? <ChevronUp /> : <ChevronDown />}
          </button>
        </div>
      </div>
    </div>
  );
}