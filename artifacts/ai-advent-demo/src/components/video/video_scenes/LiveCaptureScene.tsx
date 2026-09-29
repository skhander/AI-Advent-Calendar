import { motion } from 'framer-motion';

type Timeline = {
  values: string[];
  times: number[];
};

type SceneProps = {
  image: 'home' | 'rag' | 'evals';
  duration: number;
  opening?: boolean;
  scroll?: Timeline;
  cursor?: {
    x: Timeline;
    y: Timeline;
    visible: Timeline;
    click: { x: string; y: string; at: number };
  };
  departureScale?: number;
};

const ease = [0.42, 0, 0.25, 1] as const;

export function LiveCaptureScene({
  image,
  duration,
  opening,
  scroll,
  cursor,
  departureScale = 1,
}: SceneProps) {
  const seconds = duration / 1000;
  const source = `${import.meta.env.BASE_URL}images/${image}.png`;
  return (
    <motion.div
      className={`capture-scene ${image === 'home' ? 'capture-home' : 'capture-lesson'}`}
      initial={{ opacity: opening ? 1 : 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: opening ? 0 : 0.34, ease: 'easeInOut' }}
    >
      <motion.img
        src={source}
        alt=""
        draggable={false}
        className="capture-image"
        initial={false}
        animate={{
          y: scroll?.values ?? ['0%', '0%'],
          scale: departureScale === 1
            ? [1, 1]
            : [1, 1, departureScale],
        }}
        transition={{
          y: { duration: seconds, times: scroll?.times ?? [0, 1], ease },
          scale: { duration: seconds, times: departureScale === 1 ? [0, 1] : [0, 0.91, 1], ease },
        }}
      />
      {cursor && (
        <>
          <motion.span
            className="click-ring"
            style={{ left: cursor.click.x, top: cursor.click.y }}
            initial={{ opacity: 0, scale: 0.55 }}
            animate={{
              opacity: [0, 0, 0.7, 0],
              scale: [0.55, 0.55, 1.5, 1.9],
            }}
            transition={{
              duration: seconds,
              times: [0, Math.max(0, cursor.click.at / seconds - 0.008), cursor.click.at / seconds + 0.02, Math.min(1, cursor.click.at / seconds + 0.065)],
              ease: 'easeOut',
            }}
          />
          <motion.div
            className="film-cursor"
            initial={false}
            animate={{
              left: cursor.x.values,
              top: cursor.y.values,
              opacity: cursor.visible.values.map(Number),
            }}
            transition={{
              left: { duration: seconds, times: cursor.x.times, ease },
              top: { duration: seconds, times: cursor.y.times, ease },
              opacity: { duration: seconds, times: cursor.visible.times, ease: 'linear' },
            }}
          >
            <svg width="26" height="32" viewBox="0 0 26 32" fill="none" aria-hidden="true">
              <path d="M3 2.5v24.1l5.8-5.7 4.2 9.1 4.4-2-4.3-9.2 8.3-.1L3 2.5Z" fill="#FAF5E9" stroke="#183F3B" strokeWidth="2.2" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </>
      )}
    </motion.div>
  );
}