import { useEffect, type CSSProperties } from 'react';
import { ArrowLeft, ArrowRight, Asterisk, Snowflake } from 'lucide-react';
import { Link, Route, Switch, Router as WouterRouter, useLocation, useParams } from 'wouter';
import { lessons } from './data/lessons';
import { useAdventProgress } from './hooks/use-advent-progress';

const flakes = Array.from({ length: 65 }, (_, i) => ({
  x: `${(i * 61.7 + 13) % 100}%`,
  s: `${2 + (i * 7) % 5}px`,
  o: `${.2 + (i % 6) * .09}`,
  d: `${12 + (i * 11) % 20}s`,
  delay: `${-((i * 13) % 32)}s`,
}));

function Brand() {
  return (
    <Link href="/" className="wordmark" aria-label="AI Advent home" data-testid="link-home-brand">
      <span className="wordmark-symbol"><Asterisk size={17} strokeWidth={1.5} /></span>
      <span>the AI advent</span>
    </Link>
  );
}

function Snow() {
  return <div className="snowfield" aria-hidden="true">{flakes.map((flake, i) =>
    <span key={i} className="flake" style={{ '--x': flake.x, '--s': flake.s, '--o': flake.o, '--d': flake.d, '--delay': flake.delay } as CSSProperties} />
  )}</div>;
}

function Tree({ className = '' }: { className?: string }) {
  return (
    <div className={`tree ${className}`} aria-hidden="true">
      <span className="branch" style={{ '--bw': '34px', '--bh': '126px', '--bb': '190px' } as CSSProperties} />
      <span className="branch" style={{ '--bw': '52px', '--bh': '165px', '--bb': '106px' } as CSSProperties} />
      <span className="branch" style={{ '--bw': '73px', '--bh': '198px', '--bb': '18px' } as CSSProperties} />
    </div>
  );
}

function Home({ opened, openDoor }: { opened: number[]; openDoor: (number: number) => void }) {
  const [, navigate] = useLocation();
  useEffect(() => {
    document.title = 'AI Advent Calendar | Nine AI concepts. One better interview.';
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Open nine doors in a snowy advent house and learn the AI fundamentals you need for your next product manager interview.');
  }, []);

  function visit(number: number) {
    openDoor(number);
    navigate(`/lesson/${number}`);
    window.scrollTo(0, 0);
  }

  return (
    <div className="site">
      <Snow />
      <header className="home-header">
        <Brand />
        <div className="header-note"><i /><span>A little learning, a lot of wonder</span><Snowflake size={16} strokeWidth={1.4} /></div>
      </header>
      <main>
        <section className="hero" aria-labelledby="home-title">
          <div className="eyebrow">Your interview prep, unwrapped</div>
          <h1 id="home-title">Nine AI concepts.<br /><em>One better interview.</em></h1>
          <p className="hero-sub">A tiny advent calendar for future AI product managers.<br className="desktop-break" /> <strong>Pick a door. Learn something useful.</strong></p>
          <div className="progress-line" aria-live="polite" data-testid="status-progress">
            <div className="track" aria-hidden="true"><span style={{ width: `${opened.length / 9 * 100}%` }} /></div>
            <b>{opened.length} / 9</b><span>doors opened</span>
          </div>
        </section>

        <div className="scene" aria-label="Illustrated advent house with nine interactive doors">
          <div className="moon" aria-hidden="true" />
          <span className="star s1" aria-hidden="true">✦</span><span className="star s2" aria-hidden="true">✦</span><span className="star s3" aria-hidden="true">✦</span>
          <Tree className="far" /><Tree className="left" /><Tree className="right" />
          <div className="ground" aria-hidden="true" />
          <div className="house">
            <div className="chimney" aria-hidden="true" />
            <div className="attic" aria-hidden="true" />
            <div className="attic-window" aria-hidden="true" />
            <div className="house-body" aria-hidden="true" />
            <div className="roof" aria-hidden="true"><div className="roof-shadow" /><div className="roof-shape" /><div className="roof-snow" /><div className="roof-snow right" /><div className="roof-ornament" /></div>
            <div className="garland" aria-hidden="true" />
            <div className="facade">
              {lessons.map(lesson => {
                const isOpen = opened.includes(lesson.number);
                return (
                  <div className="door-wrap" key={lesson.number}>
                    <div className="door-frame" aria-hidden="true">
                      <div className="door-glow" />
                      <div className="door-topic">{lesson.doorTitle}</div>
                    </div>
                    <button
                      type="button"
                      className="door-hit"
                      onClick={() => visit(lesson.number)}
                      aria-label={`${isOpen ? 'Revisit' : 'Open'} door ${lesson.number}: ${lesson.title}`}
                      aria-expanded={isOpen}
                      data-testid={`button-door-${lesson.number}`}
                    ><span className={`door ${isOpen ? 'open' : ''}`} aria-hidden="true"><span>{lesson.number}</span></span></button>
                  </div>
                );
              })}
            </div>
            <div className="house-plinth" aria-hidden="true" />
          </div>
          <div className="scene-caption">No dates. No pressure. Just open a door.</div>
        </div>
      </main>
      <footer className="home-bottom">
        <div className="bottom-inner">
          <div><p>Curiosity looks good on you. <span>Keep going.</span></p><small>Nine small lessons. Enough to sound like you belong in the room.</small></div>
          <div className="bottom-arrow">Made for the merry and the motivated <ArrowRight size={16} /></div>
        </div>
      </footer>
    </div>
  );
}

function LessonPage({ openDoor }: { openDoor: (number: number) => void }) {
  const params = useParams<{ number: string }>();
  const number = Number(params.number);
  const lesson = lessons.find(item => item.number === number);
  useEffect(() => {
    if (lesson) {
      openDoor(lesson.number);
      document.title = `${lesson.title} | AI Advent Calendar`;
      document.querySelector('meta[name="description"]')?.setAttribute('content', `${lesson.subtitle} Learn the concept, see a real example, and practice an AI PM interview answer.`);
    }
  }, [lesson, openDoor]);

  if (!lesson) return <NotFound />;
  const next = lessons[number] ?? null;

  return (
    <div className="lesson-site lesson-page-enter">
      <header className="lesson-header">
        <Brand />
        <Link href="/" className="back-link" data-testid="link-back-home-top"><ArrowLeft size={16} /> Back to the house</Link>
      </header>
      <main className="lesson-main" data-testid={`content-lesson-${number}`}>
        <div className="lesson-topline"><span>The AI advent / Door {String(number).padStart(2, '0')}</span><span>Field notes for future AI PMs</span></div>
        <div className="lesson-heading">
          <div><h1>{lesson.title}</h1><p className="lesson-lede">{lesson.subtitle}</p></div>
          <div className="lesson-stamp" aria-hidden="true"><strong>{String(number).padStart(2, '0')}</strong><small>of nine doors</small></div>
        </div>
        <div className="lesson-content">
          <article className="lesson-panel">
            <span className="section-kicker">01 / The actual idea</span>
            <h2>Here’s the gist.</h2>
            <p>{lesson.explanation}</p>
            <div className="divider" />
            <span className="section-kicker">02 / Why a PM should care</span>
            <h2>Bring it back to product.</h2>
            <p>{lesson.pmRelevance}</p>
            <div className="divider" />
            <span className="section-kicker">03 / In the wild</span>
            <h2>A concrete example.</h2>
            <p>{lesson.example}</p>
          </article>
          <aside className="analogy-panel">
            <span className="section-kicker">The everyday analogy</span>
            <h2>{lesson.analogyTitle}</h2>
            <p>{lesson.analogy}</p>
          </aside>
        </div>
        <section className="answer-panel" aria-labelledby="interview-answer">
          <div><span className="section-kicker">The interview-ready answer</span><h2 id="interview-answer">Say it like this.</h2></div>
          <blockquote>{lesson.answer}</blockquote>
        </section>
        <nav className="lesson-footer" aria-label="Lesson navigation">
          <Link href="/" className="back-link" data-testid="link-back-home-bottom"><ArrowLeft size={16} /> Back to the house</Link>
          {next ? <Link href={`/lesson/${next.number}`} className="next-link" onClick={() => { openDoor(next.number); window.scrollTo(0, 0); }} data-testid={`link-next-lesson-${next.number}`}><small>Open the next door →</small><span>{next.title}</span></Link> : <Link href="/" className="next-link" data-testid="link-finish-lessons"><small>All nine doors opened →</small><span>Return to the house</span></Link>}
        </nav>
      </main>
    </div>
  );
}

function NotFound() {
  return <div className="lesson-site"><header className="lesson-header"><Brand /><Link href="/" className="back-link" data-testid="link-home-not-found"><ArrowLeft size={16} /> Back to the house</Link></header><main className="lesson-main"><div className="lesson-topline"><span>A little detour</span><span>404</span></div><div className="lesson-heading"><div><h1>This door isn’t here.</h1><p className="lesson-lede">The house has nine doors, and every one of them is waiting for you.</p><Link href="/" className="back-link" data-testid="link-return-not-found">Find the house <ArrowRight size={16} /></Link></div></div></main></div>;
}

function App() {
  const { opened, openDoor } = useAdventProgress();
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <Switch>
        <Route path="/"><Home opened={opened} openDoor={openDoor} /></Route>
        <Route path="/lesson/:number"><LessonPage openDoor={openDoor} /></Route>
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

export default App;