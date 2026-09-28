import { useEffect, type CSSProperties } from 'react';
import { ArrowLeft, ArrowRight, Asterisk } from 'lucide-react';
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
    document.title = 'the AI advent | Learn one AI concept a day.';
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Learn one AI concept a day. 9 days. 9 concepts. Open a door.');
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
      </header>
      <main>
        <section className="hero" aria-labelledby="home-title">
          <h1 id="home-title">Learn one AI concept a day.</h1>
          <p className="hero-sub">9 days. 9 concepts.</p>
          <a className="hero-door-link" href="#doors" data-testid="link-open-a-door">Open a door →</a>
          <div className="progress-line" aria-live="polite" aria-label={`${opened.length} of 9 doors opened`} data-testid="status-progress">{opened.length} / 9</div>
        </section>

        <div className="scene" id="doors" aria-label="Illustrated advent house with nine interactive doors">
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
        </div>
      </main>
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
        <div className="lesson-topline"><span>The AI advent / Door 1</span></div>
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
                <div className="rag-source-caption">
                  <span>policies · handbook</span>
                  <small>trusted source</small>
                </div>
              </div>
              <div className="rag-diagram-path" aria-hidden="true"><span /><ArrowRight size={19} strokeWidth={1.6} /></div>
              <div className="rag-answer-side">
                <div className="rag-question">“FMLA leave?”</div>
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

function InferenceIllustration() {
  return (
    <svg viewBox="0 0 470 445" role="img" aria-label="Illustration of a blue Hanukkah dreidel with the Hebrew letter nun, beside gold gelt coins">
      <defs>
        <linearGradient id="dreidel-side" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#174b92" /><stop offset="1" stopColor="#102e61" /></linearGradient>
        <linearGradient id="dreidel-face" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#5284cc" /><stop offset=".65" stopColor="#2861b1" /><stop offset="1" stopColor="#1b4b95" /></linearGradient>
        <linearGradient id="gelt" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f4d98a" /><stop offset=".55" stopColor="#d6ab53" /><stop offset="1" stopColor="#af7c2c" /></linearGradient>
      </defs>
      <ellipse cx="243" cy="359" rx="170" ry="23" fill="#a7b9c9" opacity=".3" />
      <g transform="translate(0 6)">
        <g transform="translate(105 306) rotate(-16)">
          <ellipse cx="36" cy="36" rx="38" ry="14" fill="#a07531" />
          <rect x="-2" y="22" width="76" height="15" fill="#c1923c" />
          <ellipse cx="36" cy="22" rx="38" ry="14" fill="url(#gelt)" stroke="#936b30" strokeWidth="2" />
          <ellipse cx="36" cy="22" rx="29" ry="10" fill="none" stroke="#f9e6ae" strokeWidth="1.8" />
          <path d="m36 15 7 12H29zM36 29l-7-12h14z" fill="none" stroke="#fff0bf" strokeWidth="1.4" strokeLinejoin="round" />
        </g>
        <g transform="translate(296 304) rotate(14)">
          <ellipse cx="38" cy="40" rx="46" ry="17" fill="#9a6b2a" />
          <rect x="-8" y="23" width="92" height="18" fill="#bc8837" />
          <ellipse cx="38" cy="23" rx="46" ry="17" fill="url(#gelt)" stroke="#936b30" strokeWidth="2" />
          <ellipse cx="38" cy="23" rx="35" ry="12" fill="none" stroke="#f8e3a6" strokeWidth="1.8" />
          <path d="m38 13 9 16H29zM38 33l-9-16h18z" fill="none" stroke="#fff0bf" strokeWidth="1.6" strokeLinejoin="round" />
        </g>
        <g transform="translate(56 330) rotate(8)">
          <ellipse cx="39" cy="18" rx="37" ry="13" fill="url(#gelt)" stroke="#a47731" strokeWidth="2" />
          <ellipse cx="39" cy="18" rx="28" ry="9" fill="none" stroke="#f7e0a4" strokeWidth="1.5" />
          <path d="m39 11 7 12H32zM39 25l-7-12h14z" fill="none" stroke="#fff0bf" strokeWidth="1.2" />
        </g>
      </g>
      <g transform="rotate(12 236 213)">
        <path d="M217 53h35v72h-35z" fill="#bc914e" stroke="#173866" strokeWidth="3" />
        <path d="M217 52c0-9 35-9 35 0" fill="#f2d38e" stroke="#173866" strokeWidth="3" />
        <path d="M217 120h35l14 15-31 20-33-20z" fill="#e8bd73" stroke="#173866" strokeWidth="3" strokeLinejoin="round" />
        <path d="M115 146 202 135 235 154 265 135 350 148 337 270 235 365 129 274Z" fill="#174b92" stroke="#143765" strokeWidth="5" strokeLinejoin="round" />
        <path d="M115 146 202 135 235 154 235 365 129 274Z" fill="url(#dreidel-side)" />
        <path d="M235 154 265 135 350 148 337 270 235 365Z" fill="#15447f" />
        <path d="M129 159 235 174 337 159 325 263 235 344 141 265Z" fill="url(#dreidel-face)" stroke="#e7c179" strokeWidth="4" strokeLinejoin="round" />
        <path d="M143 173 235 187 323 173" fill="none" stroke="#a9c8ec" strokeWidth="1.4" opacity=".8" />
        <path d="M145 255 235 328 322 253" fill="none" stroke="#a9c8ec" strokeWidth="1.4" opacity=".7" />
        <path d="M235 175v153" stroke="#bdd2ef" strokeWidth="1" opacity=".4" />
        <text x="235" y="270" textAnchor="middle" fill="#f6e5b7" fontFamily="Georgia, serif" fontSize="91" fontWeight="bold">נ</text>
        <path d="M126 152 202 142M269 143l68 10" stroke="#f5d68e" strokeWidth="3" strokeLinecap="round" />
      </g>
      <path d="m85 116 4 11 11 4-11 4-4 11-4-11-11-4 11-4zM380 92l3 8 8 3-8 3-3 8-3-8-8-3 8-3zM390 231l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" fill="#bb8e45" />
      <circle cx="117" cy="75" r="2.5" fill="#b78b49" /><circle cx="374" cy="171" r="2.5" fill="#b78b49" />
    </svg>
  );
}

function InferenceLesson({ openDoor }: { openDoor: (number: number) => void }) {
  const next = lessons.find(item => item.number === 3);
  return (
    <div className="lesson-site inference-site lesson-page-enter">
      <header className="lesson-header">
        <Brand />
        <Link href="/" className="back-link" data-testid="link-back-home-top"><ArrowLeft size={16} /> Back to the house</Link>
      </header>
      <main className="lesson-main inference-main" data-testid="content-lesson-2">
        <div className="lesson-topline"><span>The AI advent / Door 2</span><span>2 of nine doors</span></div>
        <section className="inference-hero" aria-labelledby="inference-title">
          <div className="inference-hero-copy">
            <span className="hero-index">A new idea to spin around</span>
            <h1 id="inference-title">Inference</h1>
            <p className="inference-subtitle">What happens when a trained model meets your question.</p>
          </div>
          <figure className="inference-art">
            <InferenceIllustration />
            <figcaption className="art-caption">Dreidel &amp; gelt / Door 2</figcaption>
          </figure>
        </section>

        <section className="inference-intro" aria-label="Inference in plain English">
          <div className="inference-intro-copy">
            <span className="section-kicker">in plain English</span>
            <p>Inference is the act of running a trained model on new input to produce a prediction, generate text, classify something, or choose the next action.</p>
          </div>
          <figure className="inference-diagram">
            <figcaption>trained patterns at work</figcaption>
            <div className="inference-diagram-grid">
              <div className="inference-card">
                <span className="inference-card-label">INPUT</span>
                <strong>“Rain is in the forecast…”</strong>
              </div>
              <div className="inference-model"><span><ArrowRight size={21} strokeWidth={1.7} /></span>model</div>
              <div className="inference-card output">
                <span className="inference-card-label">PREDICTION</span>
                <strong>bring an umbrella</strong>
                <small>confidence 0.91</small>
              </div>
            </div>
          </figure>
        </section>

        <section className="inference-section" aria-labelledby="inference-how-heading">
          <div className="inference-section-heading"><span className="section-kicker">1 / under the hood</span><h2 id="inference-how-heading">How it works</h2></div>
          <ol className="inference-steps">
            <li><span>1</span><p>Receive the input, such as a prompt, image, or sensor reading.</p></li>
            <li><span>2</span><p>Pass it through the learned patterns inside the model.</p></li>
            <li><span>3</span><p>Return an output, such as text, a label, a forecast, or a score.</p></li>
          </ol>
        </section>

        <section className="inference-section inference-uses" aria-labelledby="inference-uses-heading">
          <div className="inference-section-heading"><span className="section-kicker">2 / outside the lab</span><h2 id="inference-uses-heading">Real-world use</h2></div>
          <div className="inference-use-list">
            <article><span className="inference-use-mark" aria-hidden="true">✦</span><h3>Autocomplete</h3><p>Predict the next phrase while you write an email or code.</p></article>
            <article><span className="inference-use-mark" aria-hidden="true">✦</span><h3>Fraud detection</h3><p>Score a transaction against patterns learned from past activity.</p></article>
            <article><span className="inference-use-mark" aria-hidden="true">✦</span><h3>Vision systems</h3><p>Identify objects or defects on a factory line in real time.</p></article>
          </div>
        </section>

        <section className="inference-picture" aria-labelledby="inference-picture-heading">
          <span className="section-kicker">3 / picture it</span>
          <h2 id="inference-picture-heading">Think of it like this: <em>Using what the model learned</em></h2>
          <p>Training is when a model learns patterns from many examples. Inference is what happens later, when you give that trained model something new. If you type the beginning of a sentence, the model uses its learned patterns to predict what should come next. The model is not learning from scratch each time; it is applying what it already learned to the input in front of it.</p>
        </section>
        <nav className="lesson-footer" aria-label="Lesson navigation">
          <Link href="/" className="back-link" data-testid="link-back-home-bottom"><ArrowLeft size={16} /> Back to the house</Link>
          {next && <Link href={`/lesson/${next.number}`} className="next-link" onClick={() => { openDoor(next.number); window.scrollTo(0, 0); }} data-testid={`link-next-lesson-${next.number}`}><small>Open the next door →</small><span>{next.title}</span></Link>}
        </nav>
      </main>
    </div>
  );
}

function KinaraIllustration() {
  return (
    <div className="emb-kinara" role="img" aria-label="Kinara with seven candles: three red on the left, one black in the center, and three green on the right">
      <div className="emb-kinara-glow" aria-hidden="true" />
      <div className="emb-candles" aria-hidden="true">
        {['red', 'red', 'red', 'black', 'green', 'green', 'green'].map((color, index) => (
          <div className={`emb-candle emb-candle-${color}`} key={index}>
            <span className="emb-flame" /><span className="emb-wick" /><span className="emb-candle-body" /><span className="emb-holder" />
          </div>
        ))}
      </div>
      <div className="emb-kinara-base" aria-hidden="true"><span /></div>
      <div className="emb-mat" aria-hidden="true" />
    </div>
  );
}

function EmbeddingsLesson({ openDoor }: { openDoor: (number: number) => void }) {
  const next = lessons.find(item => item.number === 4);
  return (
    <div className="lesson-site embeddings-site lesson-page-enter">
      <header className="lesson-header">
        <Brand />
        <Link href="/" className="back-link" data-testid="link-back-home-top"><ArrowLeft size={16} /> Back to the house</Link>
      </header>
      <main className="lesson-main embeddings-main" data-testid="content-lesson-3">
        <div className="lesson-topline"><span>The AI advent / Door 3</span><span>3 of nine doors</span></div>
        <section className="emb-hero" aria-labelledby="embeddings-title">
          <div className="emb-hero-copy">
            <span className="emb-eyebrow"><span className="emb-eyebrow-line" /> A lesson in finding connection</span>
            <h1 id="embeddings-title">Embeddings<span>.</span></h1>
            <p>How words become points on a map of meaning.</p>
            <div className="emb-hero-foot"><span>DOOR 3 / 9</span><span>THE AI ADVENT</span></div>
          </div>
          <div className="emb-hero-art">
            <KinaraIllustration />
            <span className="emb-art-label">Seven lights. One shared space.</span>
          </div>
        </section>

        <section className="emb-intro" aria-label="Embeddings in plain English">
          <div className="emb-intro-copy">
            <span className="section-kicker">in plain English</span>
            <p>An embedding turns text, images, or other data into a list of numbers that captures relationships and meaning. Similar items land near each other in that mathematical space.</p>
          </div>
          <div className="emb-intro-aside" aria-hidden="true"><span>words</span><span className="emb-arrow">→</span><span>coordinates</span><span className="emb-arrow">→</span><span>connections</span></div>
        </section>

        <figure className="emb-map-figure">
          <div className="emb-map-heading">
            <div><span className="section-kicker">A visual guide / not a computation</span><h2>meaning becomes a location</h2></div>
            <span className="emb-map-symbol" aria-hidden="true">✳</span>
          </div>
          <div className="emb-map" role="img" aria-label="Illustrative similarity map, not computed embeddings: refund, return money, return, and send back are close together; pizza and food form another group; sunset and evening form a third group.">
            <div className="emb-map-axis emb-map-axis-y" aria-hidden="true">meaning axis</div>
            <div className="emb-map-axis emb-map-axis-x" aria-hidden="true">meaning axis <span>→</span></div>
            <div className="emb-cluster emb-cluster-returns" aria-hidden="true">
              <span className="emb-point emb-point-primary">refund</span>
              <span className="emb-point">return money</span>
              <span className="emb-point">return</span>
              <span className="emb-point">send back</span>
            </div>
            <div className="emb-cluster emb-cluster-food" aria-hidden="true">
              <span className="emb-point emb-point-primary">pizza</span>
              <span className="emb-point">food</span>
            </div>
            <div className="emb-cluster emb-cluster-evening" aria-hidden="true">
              <span className="emb-point emb-point-primary">sunset</span>
              <span className="emb-point">evening</span>
            </div>
          </div>
          <figcaption className="emb-map-caption"><span className="emb-caption-key" aria-hidden="true"><i /><i /></span><strong>close in meaning</strong><span>Nearness is illustrative, not a measured result.</span></figcaption>
        </figure>

        <section className="emb-section" aria-labelledby="emb-how-heading">
          <div className="emb-section-title"><span className="section-kicker">1 / under the hood</span><h2 id="emb-how-heading">How it<br /><em>works</em></h2></div>
          <ol className="emb-steps">
            <li><span>1</span><p>Convert each item into a numeric vector.</p></li>
            <li><span>2</span><p>Place vectors in a shared space where distance represents similarity.</p></li>
            <li><span>3</span><p>Compare distances to find related items or patterns.</p></li>
          </ol>
        </section>

        <section className="emb-section emb-uses" aria-labelledby="emb-uses-heading">
          <div className="emb-section-title"><span className="section-kicker">2 / outside the lab</span><h2 id="emb-uses-heading">Real-world<br /><em>use</em></h2></div>
          <div className="emb-use-list">
            <article><span className="emb-use-index">1</span><div><h3>Recommendation engines</h3><p>Suggest articles, products, or songs related to what someone liked.</p></div></article>
            <article><span className="emb-use-index">2</span><div><h3>Duplicate detection</h3><p>Spot support tickets or documents that say the same thing differently.</p></div></article>
            <article><span className="emb-use-index">3</span><div><h3>Memory for AI apps</h3><p>Store past conversations so an assistant can recall related moments.</p></div></article>
          </div>
        </section>

        <section className="emb-picture" aria-labelledby="emb-picture-heading">
          <div className="emb-picture-label"><span className="section-kicker">3 / picture it</span><span className="emb-picture-ornament" aria-hidden="true">◆ ━ ◆ ━ ◆</span></div>
          <h2 id="emb-picture-heading">Think of it like this: <em>A map organized by meaning</em></h2>
          <p>Imagine placing every sentence on a giant map. Sentences about refunds would appear near sentences about returning a purchase, even when they use different words. A sentence about making pizza would be much farther away. An embedding gives each item numeric coordinates on this meaning map, making it possible for software to compare how closely related two items are.</p>
        </section>
        <nav className="lesson-footer" aria-label="Lesson navigation">
          <Link href="/" className="back-link" data-testid="link-back-home-bottom"><ArrowLeft size={16} /> Back to the house</Link>
          {next && <Link href={`/lesson/${next.number}`} className="next-link" onClick={() => { openDoor(next.number); window.scrollTo(0, 0); }} data-testid={`link-next-lesson-${next.number}`}><small>Open the next door →</small><span>{next.title}</span></Link>}
        </nav>
      </main>
    </div>
  );
}

function TokensLesson({ openDoor }: { openDoor: (number: number) => void }) {
  const next = lessons.find(item => item.number === 6);
  const pieces = [
    { text: 'Un', id: '482' },
    { text: 'forget', id: '9,021' },
    { text: 'table', id: '1,347' },
    { text: '!', id: '0' },
  ];
  return (
    <div className="lesson-site tokens-site lesson-page-enter">
      <header className="lesson-header">
        <Brand />
        <Link href="/" className="back-link" data-testid="link-back-home-top"><ArrowLeft size={16} /> Back to the house</Link>
      </header>
      <main className="lesson-main tokens-main" data-testid="content-lesson-5">
        <div className="lesson-topline"><span>The AI advent / Door 5</span><span>5 of nine doors</span></div>
        <section className="tokens-hero" aria-labelledby="tokens-title">
          <div className="tokens-hero-copy">
            <span className="tokens-eyebrow">a closer look at Tokens</span>
            <h1 id="tokens-title">Tokens<span>.</span></h1>
            <p>Why AI counts pieces of words instead of whole sentences.</p>
            <div className="tokens-hero-foot"><span>THE AI ADVENT</span><span>DOOR 5 / 9</span></div>
          </div>
          <div className="tokens-still-life" role="img" aria-label="A tartan-wrapped parcel with a brass ribbon rests alongside an old open book and loose paper labels">
            <div className="tokens-art-book" aria-hidden="true"><div className="tokens-art-page left" /><div className="tokens-art-page right" /><span /></div>
            <div className="tokens-art-parcel" aria-hidden="true"><span className="tokens-art-ribbon-vertical" /><span className="tokens-art-ribbon-horizontal" /><span className="tokens-art-tag">5</span></div>
            <div className="tokens-art-slip" aria-hidden="true"><i />Un · forget · table · !</div>
            <span className="tokens-art-caption">An exercise in pieces &amp; patterns</span>
          </div>
        </section>

        <section className="tokens-intro" aria-label="Tokens in plain English">
          <div className="tokens-intro-copy">
            <span className="section-kicker">in plain English</span>
            <p>Tokens are the small chunks of text a model reads and writes. A token might be a whole word, part of a word, a space, or punctuation, depending on the tokenizer.</p>
          </div>
          <aside className="tokens-intro-note"><span>THE ESSENTIAL IDEA</span><p>One word is not always one piece.</p></aside>
        </section>

        <figure className="tokens-figure">
          <div className="tokens-figure-heading"><div><span className="section-kicker">A visual guide / illustrative example</span><h2>language, cut into reusable pieces</h2></div><span className="tokens-figure-mark" aria-hidden="true">✳</span></div>
          <div className="tokens-figure-body">
            <div className="tokens-ruler" aria-label="Illustrative scale with marks at 0, 5, 10, and 15"><span>0</span><span>5</span><span>10</span><span>15</span></div>
            <div className="tokens-original"><span>ORIGINAL TEXT</span><strong>Unforgettable!</strong></div>
            <div className="tokens-cut-line" aria-hidden="true"><span /> <span /> <span /> <span /></div>
            <div className="tokens-pieces" role="group" aria-label="Illustrative token segments and example IDs">
              {pieces.map((piece, index) => <div className="tokens-piece" key={piece.text}>
                <div className="tokens-piece-face"><small>PIECE {index + 1}</small><strong>{piece.text}</strong></div>
                <span className="tokens-piece-id">ID {piece.id}</span>
              </div>)}
            </div>
            <div className="tokens-figure-summary"><strong>4 tokens, not 1 word</strong><span>Illustrative split and IDs only — actual results vary by model tokenizer.</span></div>
          </div>
          <figcaption>Text becomes pieces; pieces become numbers a model can work with.</figcaption>
        </figure>

        <section className="tokens-section" aria-labelledby="tokens-how-heading">
          <div className="tokens-section-title"><span className="section-kicker">1 / under the hood</span><h2 id="tokens-how-heading">How it<br /><em>works</em></h2></div>
          <ol className="tokens-steps">
            <li><span>1</span><p>Split text into repeatable chunks using a tokenizer.</p></li>
            <li><span>2</span><p>Map each chunk to an ID the model can process.</p></li>
            <li><span>3</span><p>Predict and assemble the next token until the response is complete.</p></li>
          </ol>
        </section>
        <section className="tokens-section tokens-uses" aria-labelledby="tokens-uses-heading">
          <div className="tokens-section-title"><span className="section-kicker">2 / outside the lab</span><h2 id="tokens-uses-heading">Real-world<br /><em>use</em></h2></div>
          <div className="tokens-use-list">
            <article><span className="tokens-use-mark" aria-hidden="true" /><div><h3>Usage and pricing</h3><p>Measure how much text an API request sends and receives.</p></div></article>
            <article><span className="tokens-use-mark" aria-hidden="true" /><div><h3>Context limits</h3><p>Decide whether a conversation or document fits in a model’s window.</p></div></article>
            <article><span className="tokens-use-mark" aria-hidden="true" /><div><h3>Streaming responses</h3><p>Show an answer arriving piece by piece as new tokens are generated.</p></div></article>
          </div>
        </section>
        <section className="tokens-picture" aria-labelledby="tokens-picture-heading">
          <span className="section-kicker">3 / picture it</span>
          <h2 id="tokens-picture-heading">Think of it like this: <em>Text cut into manageable pieces</em></h2>
          <p>A model does not read text exactly one word at a time. Before processing it, a tokenizer breaks the text into reusable pieces called tokens. A common word may be one token, while a longer or unusual word may be split into several. The model receives these pieces as numbers and predicts one new token at a time to build its response.</p>
          <div className="tokens-process" aria-label="Text is cut into pieces, represented as tokens, mapped to numbers, and used for prediction">
            {['TEXT', 'CUT INTO PIECES', 'TOKENS', 'NUMBERS', 'PREDICTION'].map((stage, index) => <span key={stage}>{index > 0 && <i aria-hidden="true">→</i>}{stage}</span>)}
          </div>
        </section>
        <nav className="lesson-footer" aria-label="Lesson navigation">
          <Link href="/" className="back-link" data-testid="link-back-home-bottom"><ArrowLeft size={16} /> Back to the house</Link>
          {next && <Link href={`/lesson/${next.number}`} className="next-link" onClick={() => { openDoor(next.number); window.scrollTo(0, 0); }} data-testid={`link-next-lesson-${next.number}`}><small>Open the next door →</small><span>{next.title}</span></Link>}
        </nav>
      </main>
    </div>
  );
}

function ContextWindowLesson({ openDoor }: { openDoor: (number: number) => void }) {
  const next = lessons.find(item => item.number === 5);
  return (
    <div className="lesson-site context-site lesson-page-enter">
      <header className="lesson-header">
        <Brand />
        <Link href="/" className="back-link" data-testid="link-back-home-top"><ArrowLeft size={16} /> Back to the house</Link>
      </header>
      <main className="lesson-main context-main" data-testid="content-lesson-4">
        <div className="lesson-topline"><span>The AI advent / Door 4</span><span>4 of nine doors</span></div>
        <section className="context-hero" aria-labelledby="context-title">
          <div className="context-hero-copy">
            <span className="context-overline">An invitation to understand</span>
            <h1 id="context-title">Context<br /><em>Window</em><span className="context-period">.</span></h1>
            <p>The amount of conversation an AI can hold at once.</p>
            <span className="context-hero-rule" aria-hidden="true" />
            <span className="context-hero-index">LESSON FOUR <span>/</span> NINE</span>
          </div>
          <div className="context-hero-art" aria-hidden="true">
            <div className="context-art-arch">
              <span className="context-art-moon" />
              <span className="context-art-orbit" />
              <span className="context-art-lantern"><i /><b /><i /></span>
              <span className="context-art-line line-one" />
              <span className="context-art-line line-two" />
              <span className="context-art-line line-three" />
            </div>
            <span className="context-art-caption">A little room for what matters.</span>
          </div>
        </section>

        <section className="context-intro" aria-label="Context Window in plain English">
          <span className="section-kicker">in plain English</span>
          <p>A context window is the maximum amount of text a model can consider in one request: your prompt, earlier messages, instructions, retrieved documents, and its response.</p>
        </section>

        <figure className="context-visual">
          <div className="context-visual-heading">
            <span className="section-kicker">A visual guide / illustrative example</span>
            <h2>the model can only see <em>inside the frame</em></h2>
          </div>
          <div className="context-frame" role="img" aria-label="Illustrative context window showing three conversation messages in view: Can you compare these two plans? Here are the key differences… And what about cost? The example shows 2,048 tokens available, not a dynamic model limit.">
            <div className="context-frame-top"><span>context window</span><span>in view right now</span></div>
            <div className="context-frame-body">
              <div className="context-message context-message-user"><small>YOU</small><span>Can you compare these two plans?</span></div>
              <div className="context-message context-message-ai"><small>ASSISTANT</small><span>Here are the key differences…</span></div>
              <div className="context-message context-message-user"><small>YOU</small><span>And what about cost?</span></div>
            </div>
            <div className="context-frame-foot"><span className="context-token-dot" /><strong>2,048</strong><span>tokens available</span></div>
          </div>
          <figcaption>Illustrative example, not a live model limit.</figcaption>
        </figure>

        <section className="context-section" aria-labelledby="context-how-heading">
          <div className="context-section-title"><span className="section-kicker">1 / under the hood</span><h2 id="context-how-heading">How it <em>works</em></h2></div>
          <ol className="context-steps">
            <li><span>1</span><p>Collect the messages, instructions, and documents needed for the task.</p></li>
            <li><span>2</span><p>Fit them into the model’s token limit, often by trimming or summarizing.</p></li>
            <li><span>3</span><p>Generate the response while those inputs are still in view.</p></li>
          </ol>
        </section>

        <section className="context-section context-uses" aria-labelledby="context-uses-heading">
          <div className="context-section-title"><span className="section-kicker">2 / outside the lab</span><h2 id="context-uses-heading">Real-world <em>use</em></h2></div>
          <div className="context-use-list">
            <article><span className="context-use-marker" aria-hidden="true" /><div><h3>Long-document review</h3><p>Compare clauses across a contract, policy, or technical manual.</p></div></article>
            <article><span className="context-use-marker" aria-hidden="true" /><div><h3>Multi-turn assistants</h3><p>Keep a conversation coherent as a user asks follow-up questions.</p></div></article>
            <article><span className="context-use-marker" aria-hidden="true" /><div><h3>Codebase help</h3><p>Give an assistant enough related files to understand a bug.</p></div></article>
          </div>
        </section>

        <section className="context-picture" aria-labelledby="context-picture-heading">
          <div className="context-picture-top"><span className="section-kicker">3 / picture it</span><span className="context-picture-mark" aria-hidden="true">◇</span></div>
          <h2 id="context-picture-heading">Think of it like this: <em>The model’s working space</em></h2>
          <p>Think of the context window as the information currently spread across a desk. The model can work with anything on that desk: your latest message, earlier conversation, instructions, and retrieved documents. But the desk has a size limit. When too much information is added, older or less important material may need to be removed or summarized before the model can continue.</p>
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
  if (number === 2) return <InferenceLesson openDoor={openDoor} />;
  if (number === 3) return <EmbeddingsLesson openDoor={openDoor} />;
  if (number === 4) return <ContextWindowLesson openDoor={openDoor} />;
  if (number === 5) return <TokensLesson openDoor={openDoor} />;
  const next = lessons[number] ?? null;

  return (
    <div className="lesson-site lesson-page-enter">
      <header className="lesson-header">
        <Brand />
        <Link href="/" className="back-link" data-testid="link-back-home-top"><ArrowLeft size={16} /> Back to the house</Link>
      </header>
      <main className="lesson-main" data-testid={`content-lesson-${number}`}>
        <div className="lesson-topline"><span>The AI advent / Door {number}</span></div>
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