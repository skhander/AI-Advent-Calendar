import { useEffect, type CSSProperties } from 'react';
import { ArrowLeft, ArrowRight, Asterisk, Snowflake } from 'lucide-react';
import { Link, Route, Switch, Router as WouterRouter, useLocation, useParams } from 'wouter';
import { lessons } from './data/lessons';
import { useAdventProgress } from './hooks/use-advent-progress';

const flakes = Array.from({ length: 27 }, (_, i) => ({
  x: `${(i * 61.7 + 13) % 100}%`,
  s: `${1 + (i * 7) % 3}px`,
  o: `${.12 + (i % 5) * .055}`,
  d: `${20 + (i * 11) % 22}s`,
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

function Reindeer() {
  return (
    <svg className="scene-reindeer" viewBox="0 0 190 180" role="img" aria-label="Illustrated reindeer standing in the snow">
      <path className="reindeer-antlers" d="M123 60 119 29 108 17M119 36l17-18M139 61l11-34 15-10M149 36l-4-20" fill="none" stroke="#d6b178" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M34 106Q8 103 11 85" fill="none" stroke="#845444" strokeWidth="10" strokeLinecap="round" />
      <path d="M37 91Q20 83 19 69" fill="none" stroke="#e1c9a5" strokeWidth="5" strokeLinecap="round" />
      <path d="M39 92Q60 77 94 86Q111 89 116 107Q112 130 87 136L53 132Q30 123 39 92Z" fill="#a36c52" stroke="#684839" strokeWidth="3" />
      <path d="M55 126 52 160M82 130 83 162M99 125 108 160" fill="none" stroke="#76503f" strokeWidth="10" strokeLinecap="round" />
      <path d="M46 161h13M77 163h13M103 161h13" stroke="#453c34" strokeWidth="8" strokeLinecap="round" />
      <path d="M92 96Q115 85 119 69" fill="none" stroke="#a36c52" strokeWidth="19" strokeLinecap="round" />
      <path d="M111 58Q112 44 125 42Q146 41 150 57L153 83Q150 101 134 104Q118 100 114 86Z" fill="#ad795c" stroke="#684839" strokeWidth="3" />
      <path d="M115 54 101 43Q95 52 108 62ZM144 51 159 40Q166 50 151 62Z" fill="#bd8a6b" stroke="#684839" strokeWidth="3" />
      <path d="M115 84Q131 77 152 84Q157 99 137 105Q120 101 115 84Z" fill="#e4c6a0" />
      <circle cx="122" cy="72" r="2.6" fill="#302f2b" /><circle cx="143" cy="71" r="2.6" fill="#302f2b" />
      <ellipse cx="153" cy="88" rx="6" ry="5" fill="#aa4741" />
      <path d="M104 92Q117 104 128 101" fill="none" stroke="#a94440" strokeWidth="9" strokeLinecap="round" />
      <path d="M110 97 105 114 117 111 120 99" fill="#a94440" />
      <circle cx="122" cy="103" r="2.5" fill="#eac983" />
    </svg>
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
          <Reindeer />
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

function RagLesson({ openDoor }: { openDoor: (number: number) => void }) {
  const next = lessons.find(item => item.number === 2);
  return (
    <div className="lesson-site rag-site lesson-page-enter">
      <header className="lesson-header">
        <Brand />
        <Link href="/" className="back-link" data-testid="link-back-home-top"><ArrowLeft size={16} /> Back to the house</Link>
      </header>
      <main className="lesson-main rag-main" data-testid="content-lesson-1">
        <div className="lesson-topline"><span>The AI advent / Door 1</span><span>Field notes for future AI PMs</span></div>
        <section className="rag-hero" aria-labelledby="rag-title">
          <svg className="rag-evergreen" viewBox="0 0 264 125" fill="none" aria-hidden="true" focusable="false">
            <path d="M4 15C70 41 139 63 252 87" stroke="#456c55" strokeWidth="3" strokeLinecap="round" />
            <g stroke="#456c55" strokeWidth="2.5" strokeLinecap="round">
              <path d="M27 24 13 40M27 24 28 5M45 30 29 48M45 30 48 10M64 37 49 56M64 37 69 16M83 43 68 64M83 43 90 22M103 50 88 71M103 50 111 28M123 56 110 78M123 56 133 35M145 63 131 85M145 63 155 42M167 68 153 92M167 68 177 48M189 73 176 98M189 73 201 54M212 79 200 104M212 79 225 60M234 84 222 109M234 84 247 68" />
            </g>
            <g fill="#a54d45"><circle cx="68" cy="50" r="4" /><circle cx="76" cy="55" r="4" /><circle cx="174" cy="85" r="4" /><circle cx="182" cy="87" r="4" /></g>
            <path d="M211 79v19" stroke="#c69e64" strokeWidth="1.5" /><circle cx="211" cy="108" r="9" fill="#c49b60" stroke="#e9d5ad" strokeWidth="2" /><path d="M205 105c3-3 6-4 10-3" stroke="#f4e3c1" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <div className="rag-hero-copy">
            <span className="rag-overline"><span aria-hidden="true">✳</span> An idea worth unwrapping</span>
            <h1 id="rag-title">RAG<span className="rag-title-dot">.</span></h1>
            <p className="rag-subtitle">How AI finds the right facts before it answers.</p>
          </div>
          <div className="rag-seal" aria-hidden="true"><span>1</span><small>of nine doors</small></div>
        </section>

        <section className="rag-intro" aria-label="RAG in plain English">
          <div className="rag-intro-copy">
            <span className="section-kicker">in plain English</span>
            <p>Retrieval-augmented generation lets an AI search a trusted collection of documents, bring the best passages into its prompt, and write a response grounded in those passages.</p>
            <span className="rag-intro-flourish" aria-hidden="true">✳ &nbsp; ✳ &nbsp; ✳</span>
          </div>
          <figure className="rag-diagram">
            <figcaption>the answer is assembled here</figcaption>
            <div className="rag-diagram-content">
              <div className="rag-source-stack" aria-label="Trusted documents">
                <div className="rag-paper rag-paper-back"><span className="rag-paper-lines" />policies</div>
                <div className="rag-paper rag-paper-front"><span className="rag-paper-lines" />handbook</div>
                <span className="rag-source-docs">policies · handbook</span>
                <span className="rag-source-tag">trusted source</span>
              </div>
              <div className="rag-diagram-path" aria-hidden="true"><span /><ArrowRight size={19} strokeWidth={1.6} /></div>
              <div className="rag-answer-side">
                <div className="rag-question">“parental leave?”</div>
                <div className="rag-answer-card">
                  <span className="rag-answer-spark" aria-hidden="true">✳</span>
                  <strong>12 weeks</strong>
                  <small>found in the handbook</small>
                </div>
              </div>
            </div>
          </figure>
        </section>

        <section className="rag-section rag-how" aria-labelledby="rag-how-heading">
          <div className="rag-section-heading"><span className="section-kicker">1 / under the hood</span><h2 id="rag-how-heading">How it works</h2></div>
          <ol className="rag-steps">
            <li><span>1</span><p>Turn the question into a useful search query.</p></li>
            <li><span>2</span><p>Retrieve the most relevant passages from approved sources.</p></li>
            <li><span>3</span><p>Give those passages to the model so it can answer with evidence.</p></li>
          </ol>
        </section>

        <section className="rag-section rag-uses" aria-labelledby="rag-uses-heading">
          <div className="rag-section-heading"><span className="section-kicker">2 / outside the lab</span><h2 id="rag-uses-heading">Real-world use</h2></div>
          <div className="rag-use-list">
            <article><span className="rag-use-mark" aria-hidden="true">✳</span><h3>Internal knowledge assistants</h3><p>Answer questions from current handbooks, policies, and project docs.</p></article>
            <article><span className="rag-use-mark" aria-hidden="true">✳</span><h3>Support copilots</h3><p>Surface troubleshooting steps while a support agent talks to a customer.</p></article>
            <article><span className="rag-use-mark" aria-hidden="true">✳</span><h3>Research tools</h3><p>Summarize papers or reports while keeping the source material in view.</p></article>
          </div>
        </section>

        <section className="rag-picture" aria-labelledby="rag-picture-heading">
          <div className="rag-picture-top"><span className="section-kicker">3 / picture it</span><span className="rag-picture-star" aria-hidden="true">✳</span></div>
          <h2 id="rag-picture-heading">Think of it like this: <em>Giving the model a trusted cheat sheet</em></h2>
          <p>A model learns broad patterns and general knowledge from large collections of text. It was not trained on private details such as your favorite snack, today’s inventory, or the exact location of your company’s IT desk. Without that information, it may guess or repeat something unrelated that it learned elsewhere. RAG first searches sources you trust, such as company documents or a product catalog, and places the most relevant information in front of the model like a cheat sheet. The model can then answer using those facts instead of relying only on memory.</p>
        </section>
        <nav className="lesson-footer" aria-label="Lesson navigation">
          <Link href="/" className="back-link" data-testid="link-back-home-bottom"><ArrowLeft size={16} /> Back to the house</Link>
          {next && <Link href={`/lesson/${next.number}`} className="next-link" onClick={() => { openDoor(next.number); window.scrollTo(0, 0); }} data-testid={`link-next-lesson-${next.number}`}><small>Open the next door →</small><span>{next.title}</span></Link>}
        </nav>
      </main>
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
      document.querySelector('meta[name="description"]')?.setAttribute('content', number === 1 ? 'How AI finds the right facts before it answers. Learn retrieval-augmented generation in plain English.' : `${lesson.subtitle} Learn the concept, see a real example, and practice an AI PM interview answer.`);
    }
  }, [lesson, openDoor]);

  if (!lesson) return <NotFound />;
  if (number === 1) return <RagLesson openDoor={openDoor} />;
  const next = lessons[number] ?? null;

  return (
    <div className="lesson-site lesson-page-enter">
      <header className="lesson-header">
        <Brand />
        <Link href="/" className="back-link" data-testid="link-back-home-top"><ArrowLeft size={16} /> Back to the house</Link>
      </header>
      <main className="lesson-main" data-testid={`content-lesson-${number}`}>
        <div className="lesson-topline"><span>The AI advent / Door {number}</span><span>Field notes for future AI PMs</span></div>
        <div className="lesson-heading">
          <div><h1>{lesson.title}</h1><p className="lesson-lede">{lesson.subtitle}</p></div>
          <div className="lesson-stamp" aria-hidden="true"><strong>{number}</strong><small>of nine doors</small></div>
        </div>
        <div className="lesson-content">
          <article className="lesson-panel">
            <span className="section-kicker">1 / The actual idea</span>
            <h2>Here’s the gist.</h2>
            <p>{lesson.explanation}</p>
            <div className="divider" />
            <span className="section-kicker">2 / Why a PM should care</span>
            <h2>Bring it back to product.</h2>
            <p>{lesson.pmRelevance}</p>
            <div className="divider" />
            <span className="section-kicker">3 / In the wild</span>
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