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
  const nextDoor = lessons.find(lesson => !opened.includes(lesson.number))?.number ?? 1;
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
          <div className="home-progress" aria-live="polite">
            <div className="progress-track" role="progressbar" aria-label="Doors opened" aria-valuemin={0} aria-valuemax={lessons.length} aria-valuenow={opened.length}>
              <span className="progress-fill" style={{ width: `${(opened.length / lessons.length) * 100}%` }} />
            </div>
            <span className="progress-line" data-testid="status-progress">{opened.length} / {lessons.length}</span>
          </div>
        </section>

        <div className="house-stage">
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
        <aside className="house-callout">
          <button type="button" className="hero-door-link" onClick={() => visit(nextDoor)} data-testid="link-open-a-door">
            Open a door <ArrowRight size={15} aria-hidden="true" />
          </button>
          <p>Each one starts with a clear explanation and a visual guide.</p>
        </aside>
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
        <Link href="/" className="back-link" data-testid="link-back-home-top"><ArrowLeft size={16} /> All concepts</Link>
      </header>
      <main className="lesson-main rag-main" data-testid="content-lesson-1">
        <div className="lesson-topline"><span>The AI advent / Door 1</span></div>
        <section className="rag-hero" aria-labelledby="rag-title">
          <div className="rag-hero-copy">
            <h1 id="rag-title">RAG<span className="rag-title-dot">.</span></h1>
            <p className="rag-subtitle">How AI finds the right facts before it answers.</p>
          </div>
        </section>

        <section className="rag-intro" aria-label="RAG in plain English">
          <div className="rag-intro-copy">
            <span className="section-kicker">in plain English</span>
            <p>Retrieval-augmented generation lets an AI search a trusted collection of documents, bring the best passages into its prompt, and write a response grounded in those passages.</p>
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
          <div className="rag-picture-top"><span className="section-kicker">3 / picture it</span></div>
          <h2 id="rag-picture-heading">Think of it like this: <em>Giving the model a trusted cheat sheet</em></h2>
          <p>A model learns broad patterns and general knowledge from large collections of text. It was not trained on private details such as your favorite snack, today’s inventory, or the exact location of your company’s IT desk. Without that information, it may guess or repeat something unrelated that it learned elsewhere. RAG first searches sources you trust, such as company documents or a product catalog, and places the most relevant information in front of the model like a cheat sheet. The model can then answer using those facts instead of relying only on memory.</p>
        </section>
        <nav className="lesson-footer" aria-label="Lesson navigation">
          <Link href="/" className="back-link" data-testid="link-back-home-bottom"><ArrowLeft size={16} /> All concepts</Link>
          {next && <Link href={`/lesson/${next.number}`} className="next-link" onClick={() => { openDoor(next.number); window.scrollTo(0, 0); }} data-testid={`link-next-lesson-${next.number}`}><small>Open the next door →</small><span>{next.title}</span></Link>}
        </nav>
      </main>
    </div>
  );
}

function InferenceLesson({ openDoor }: { openDoor: (number: number) => void }) {
  const next = lessons.find(item => item.number === 3);
  return (
    <div className="lesson-site inference-site lesson-page-enter">
      <header className="lesson-header">
        <Brand />
        <Link href="/" className="back-link" data-testid="link-back-home-top"><ArrowLeft size={16} /> All concepts</Link>
      </header>
      <main className="lesson-main inference-main" data-testid="content-lesson-2">
        <div className="lesson-topline"><span>The AI advent / Door 2</span></div>
        <section className="inference-hero" aria-labelledby="inference-title">
          <div className="inference-hero-copy">
            <h1 id="inference-title">Inference</h1>
            <p className="inference-subtitle">What happens when a trained model meets your question.</p>
          </div>
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

        <div className="inference-section-pair">
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
        </div>

        <section className="inference-picture" aria-labelledby="inference-picture-heading">
          <span className="section-kicker">3 / picture it</span>
          <h2 id="inference-picture-heading">Think of it like this: <em>Using what the model learned</em></h2>
          <p>Training is when a model learns patterns from many examples. Inference is what happens later, when you give that trained model something new. If you type the beginning of a sentence, the model uses its learned patterns to predict what should come next. The model is not learning from scratch each time; it is applying what it already learned to the input in front of it.</p>
        </section>
        <nav className="lesson-footer" aria-label="Lesson navigation">
          <Link href="/" className="back-link" data-testid="link-back-home-bottom"><ArrowLeft size={16} /> All concepts</Link>
          {next && <Link href={`/lesson/${next.number}`} className="next-link" onClick={() => { openDoor(next.number); window.scrollTo(0, 0); }} data-testid={`link-next-lesson-${next.number}`}><small>Open the next door →</small><span>{next.title}</span></Link>}
        </nav>
      </main>
    </div>
  );
}

function EmbeddingsLesson({ openDoor }: { openDoor: (number: number) => void }) {
  const next = lessons.find(item => item.number === 4);
  return (
    <div className="lesson-site embeddings-site lesson-page-enter">
      <header className="lesson-header">
        <Brand />
        <Link href="/" className="back-link" data-testid="link-back-home-top"><ArrowLeft size={16} /> All concepts</Link>
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
        </section>

        <section className="emb-intro" aria-label="Embeddings in plain English">
          <div className="emb-intro-copy">
            <span className="section-kicker">in plain English</span>
            <p>An embedding turns text, images, or other data into a list of numbers that captures relationships and meaning. Similar items land near each other in that mathematical space.</p>
          </div>
          <figure className="emb-map-figure">
          <div className="emb-map-heading">
            <div><span className="section-kicker">A visual guide / not a computation</span><h2>meaning becomes a location</h2></div>
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
        </section>

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
          <div className="emb-picture-label"><span className="section-kicker">3 / picture it</span></div>
          <h2 id="emb-picture-heading">Think of it like this: <em>A map organized by meaning</em></h2>
          <p>Imagine placing every sentence on a giant map. Sentences about refunds would appear near sentences about returning a purchase, even when they use different words. A sentence about making pizza would be much farther away. An embedding gives each item numeric coordinates on this meaning map, making it possible for software to compare how closely related two items are.</p>
        </section>
        <nav className="lesson-footer" aria-label="Lesson navigation">
          <Link href="/" className="back-link" data-testid="link-back-home-bottom"><ArrowLeft size={16} /> All concepts</Link>
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
        <Link href="/" className="back-link" data-testid="link-back-home-top"><ArrowLeft size={16} /> All concepts</Link>
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
        </section>

        <section className="tokens-intro" aria-label="Tokens in plain English">
          <div className="tokens-intro-copy">
            <span className="section-kicker">in plain English</span>
            <p>Tokens are the small chunks of text a model reads and writes. A token might be a whole word, part of a word, a space, or punctuation, depending on the tokenizer.</p>
          </div>
          <figure className="tokens-figure">
          <div className="tokens-figure-heading"><div><span className="section-kicker">A visual guide / illustrative example</span><h2>language, cut into reusable pieces</h2></div></div>
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
        </section>

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
        </section>
        <nav className="lesson-footer" aria-label="Lesson navigation">
          <Link href="/" className="back-link" data-testid="link-back-home-bottom"><ArrowLeft size={16} /> All concepts</Link>
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
        <Link href="/" className="back-link" data-testid="link-back-home-top"><ArrowLeft size={16} /> All concepts</Link>
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
        </section>

        <section className="context-intro" aria-label="Context Window in plain English">
          <div className="context-intro-copy"><span className="section-kicker">in plain English</span>
          <p>A context window is the maximum amount of text a model can consider in one request: your prompt, earlier messages, instructions, retrieved documents, and its response.</p></div>
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
        </section>

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
          <div className="context-picture-top"><span className="section-kicker">3 / picture it</span></div>
          <h2 id="context-picture-heading">Think of it like this: <em>The model’s working space</em></h2>
          <p>Think of the context window as the information currently spread across a desk. The model can work with anything on that desk: your latest message, earlier conversation, instructions, and retrieved documents. But the desk has a size limit. When too much information is added, older or less important material may need to be removed or summarized before the model can continue.</p>
        </section>
        <nav className="lesson-footer" aria-label="Lesson navigation">
          <Link href="/" className="back-link" data-testid="link-back-home-bottom"><ArrowLeft size={16} /> All concepts</Link>
          {next && <Link href={`/lesson/${next.number}`} className="next-link" onClick={() => { openDoor(next.number); window.scrollTo(0, 0); }} data-testid={`link-next-lesson-${next.number}`}><small>Open the next door →</small><span>{next.title}</span></Link>}
        </nav>
      </main>
    </div>
  );
}

function SemanticSearchLesson({ openDoor }: { openDoor: (number: number) => void }) {
  const next = lessons.find(item => item.number === 7);
  return (
    <div className="lesson-site semantic-site lesson-page-enter">
      <header className="lesson-header">
        <Brand />
        <Link href="/" className="back-link" data-testid="link-back-home-top"><ArrowLeft size={16} /> All concepts</Link>
      </header>
      <main className="lesson-main semantic-main" data-testid="content-lesson-6">
        <div className="lesson-topline"><span>The AI advent / Door 6</span><span>6 of nine doors</span></div>
        <section className="semantic-hero" aria-labelledby="semantic-title">
          <div className="semantic-hero-copy">
            <span className="semantic-eyebrow"><span className="semantic-eyebrow-line" /> An invitation to look closer</span>
            <h1 id="semantic-title">Semantic<br /><em>Search</em><span>.</span></h1>
            <p>Finding the right result even when the words do not match.</p>
            <div className="semantic-hero-foot"><span>THE AI ADVENT</span><span>DOOR 6 / 9</span></div>
          </div>
        </section>

        <section className="semantic-intro" aria-label="Semantic Search in plain English">
          <div className="semantic-intro-copy">
            <span className="section-kicker">in plain English</span>
            <p>Semantic search compares the meaning and intent of a query with the meaning of indexed content, so related language can match even when the exact keywords are different.</p>
          </div>
          <figure className="semantic-visual">
          <div className="semantic-visual-heading"><div><span className="section-kicker">A visual guide / illustrative example</span><h2>the words can change; <em>the intent stays</em></h2></div></div>
          <div className="semantic-visual-body">
            <div className="semantic-query"><span>THE QUERY</span><strong>“quiet place to work”</strong><small>What you mean, not only what you type.</small></div>
            <div className="semantic-meaning" aria-hidden="true"><span>meaning</span><i /></div>
            <div className="semantic-results" aria-label="Illustrative ranked results, not live computed similarity scores">
              <div className="semantic-result"><span className="semantic-result-index">1</span><strong>calm café</strong><span className="semantic-score">0.94 match</span></div>
              <div className="semantic-result"><span className="semantic-result-index">2</span><strong>library desk</strong><span className="semantic-score">0.88 match</span></div>
              <div className="semantic-result semantic-result-low"><span className="semantic-result-index">3</span><strong>busy office</strong><span className="semantic-score">0.31 match</span></div>
            </div>
          </div>
          <figcaption><span className="semantic-caption-key" aria-hidden="true" />Scores are illustrative examples, not live computed values or promised results.</figcaption>
        </figure>
        </section>

        <section className="semantic-section semantic-how" aria-labelledby="semantic-how-heading">
          <div className="semantic-section-title"><span className="section-kicker">1 / under the hood</span><h2 id="semantic-how-heading">How it<br /><em>works</em></h2><span className="semantic-section-aside">FROM LANGUAGE TO RELEVANCE</span></div>
          <ol className="semantic-steps">
            <li><span>1</span><p>Represent the query and documents as meaning-rich vectors.</p></li>
            <li><span>2</span><p>Compare the query with the indexed content by similarity.</p></li>
            <li><span>3</span><p>Rank the closest matches and show the most useful results first.</p></li>
          </ol>
        </section>

        <section className="semantic-section semantic-uses" aria-labelledby="semantic-uses-heading">
          <div className="semantic-section-title"><span className="section-kicker">2 / outside the lab</span><h2 id="semantic-uses-heading">Real-world<br /><em>use</em></h2><span className="semantic-section-aside">THREE PLACES IT MAKES A DIFFERENCE</span></div>
          <div className="semantic-use-list">
            <article><span className="semantic-use-index">1</span><div><h3>E-commerce search</h3><p>Match “rain jacket for cycling” with products described as waterproof shells.</p></div></article>
            <article><span className="semantic-use-index">2</span><div><h3>Customer support</h3><p>Find an existing answer even when a customer uses new wording.</p></div></article>
            <article><span className="semantic-use-index">3</span><div><h3>Workplace search</h3><p>Find the right project decision without knowing the exact document title.</p></div></article>
          </div>
        </section>

        <section className="semantic-picture" aria-labelledby="semantic-picture-heading">
          <div className="semantic-picture-top"><span className="section-kicker">3 / picture it</span></div>
          <h2 id="semantic-picture-heading">Think of it like this: <em>Searching for the idea, not only the words</em></h2>
          <p>A normal keyword search looks for the words you typed. Semantic search also looks for content with a similar meaning. If you search for “quiet place to work,” it can find a document about “low-noise study areas” even though the wording is different. It works by comparing embeddings and ranking the items that are closest in meaning.</p>
        </section>
        <nav className="lesson-footer" aria-label="Lesson navigation">
          <Link href="/" className="back-link" data-testid="link-back-home-bottom"><ArrowLeft size={16} /> All concepts</Link>
          {next && <Link href={`/lesson/${next.number}`} className="next-link" onClick={() => { openDoor(next.number); window.scrollTo(0, 0); }} data-testid={`link-next-lesson-${next.number}`}><small>Open the next door →</small><span>{next.title}</span></Link>}
        </nav>
      </main>
    </div>
  );
}

function McpLesson({ openDoor }: { openDoor: (number: number) => void }) {
  const next = lessons.find(item => item.number === 8);
  return (
    <div className="lesson-site mcp-site lesson-page-enter">
      <header className="lesson-header">
        <Brand />
        <Link href="/" className="back-link" data-testid="link-back-home-top"><ArrowLeft size={16} /> All concepts</Link>
      </header>
      <main className="lesson-main mcp-main" data-testid="content-lesson-7">
        <div className="lesson-topline"><span>The AI advent / Door 7</span><span>7 of nine doors</span></div>
        <section className="mcp-hero" aria-labelledby="mcp-title">
          <div className="mcp-hero-copy">
            <span className="mcp-hero-eyebrow">A common language for connection</span>
            <h1 id="mcp-title">MCP<span>.</span></h1>
            <p>A shared way for AI to connect to the tools around it.</p>
            <div className="mcp-hero-foot"><span>Door 7 / 9</span><span>The AI advent</span></div>
          </div>
        </section>

        <section className="mcp-intro" aria-label="MCP in plain English">
          <div className="mcp-intro-copy">
            <span className="section-kicker">in plain English</span>
            <p>The Model Context Protocol is a common set of rules for exposing tools, resources, and prompts to AI applications, so each connection does not need a custom one-off design.</p>
          </div>
          <figure className="mcp-diagram" aria-label="Illustrative diagram: an AI client connects through MCP shared rules to a calendar, files, and a database">
          <div className="mcp-diagram-head"><div><span className="section-kicker">a visual guide / not a live connection</span><h2>one protocol, many connections</h2></div><span>Fig. 7 / connection</span></div>
          <div className="mcp-diagram-flow">
            <div className="mcp-diagram-node"><small>application</small><strong>AI client</strong></div>
            <span className="mcp-diagram-arrow" aria-hidden="true" />
            <div className="mcp-diagram-node mcp-diagram-protocol"><small>shared rules</small><strong>MCP</strong></div>
            <span className="mcp-diagram-arrow" aria-hidden="true" />
            <div className="mcp-diagram-destinations"><span>calendar</span><span>files</span><span>database</span></div>
          </div>
          <figcaption>Conceptual view: each external system exposes approved capabilities through the same protocol.</figcaption>
        </figure>
        </section>

        <section className="mcp-section" aria-labelledby="mcp-how-heading">
          <div className="mcp-section-title"><span className="section-kicker">1 / under the hood</span><h2 id="mcp-how-heading">How it<br /><em>works</em></h2></div>
          <ol className="mcp-steps">
            <li><span>1</span><p>An MCP server describes the tools and data it can provide.</p></li>
            <li><span>2</span><p>An AI client discovers those capabilities through the shared protocol.</p></li>
            <li><span>3</span><p>The assistant uses the selected tool and receives structured context back.</p></li>
          </ol>
        </section>

        <section className="mcp-section" aria-labelledby="mcp-uses-heading">
          <div className="mcp-section-title"><span className="section-kicker">2 / outside the lab</span><h2 id="mcp-uses-heading">Real-world<br /><em>use</em></h2></div>
          <div className="mcp-use-list">
            <article><span className="mcp-use-index">1</span><div><h3>Developer workspaces</h3><p>Let an assistant inspect repositories, issues, and build tools through one connection.</p></div></article>
            <article><span className="mcp-use-index">2</span><div><h3>Business systems</h3><p>Connect an AI to approved CRM, analytics, or project-management data.</p></div></article>
            <article><span className="mcp-use-index">3</span><div><h3>Personal assistants</h3><p>Give an assistant consistent access to calendars, files, or notes.</p></div></article>
          </div>
        </section>

        <section className="mcp-picture" aria-labelledby="mcp-picture-heading">
          <span className="section-kicker">3 / picture it</span>
          <h2 id="mcp-picture-heading">Think of it like this: <em>A standard connection for AI tools</em></h2>
          <p>AI applications often need access to outside systems such as files, calendars, databases, or developer tools. Without a shared standard, every connection must be built differently. MCP gives these systems a common way to describe what they offer and how an AI application can use it. The protocol does not grant unlimited access by itself; the application still controls which servers and permissions are allowed.</p>
        </section>
        <nav className="lesson-footer" aria-label="Lesson navigation">
          <Link href="/" className="back-link" data-testid="link-back-home-bottom"><ArrowLeft size={16} /> All concepts</Link>
          {next && <Link href={`/lesson/${next.number}`} className="next-link" onClick={() => { openDoor(8); window.scrollTo(0, 0); }} data-testid="link-next-lesson-8"><small>Open the next door →</small><span>{next.title}</span></Link>}
        </nav>
      </main>
    </div>
  );
}

function ModelsLesson({ openDoor }: { openDoor: (number: number) => void }) {
  const next = lessons.find(item => item.number === 9);
  return (
    <div className="lesson-site models-site">
      <header className="lesson-header">
        <Brand />
        <Link href="/" className="back-link" data-testid="link-back-home-top"><ArrowLeft size={16} /> All concepts</Link>
      </header>
      <main className="lesson-main models-main" data-testid="content-lesson-8">
        <div className="lesson-topline"><span>The AI advent / Door 8</span><span>8 of nine doors</span></div>
        <section className="models-hero" aria-labelledby="models-title">
          <div className="models-hero-copy">
            <span className="section-kicker">A field guide / 08</span>
            <h1 id="models-title">Models<span className="models-period">.</span></h1>
            <p>Why there is no single “best” AI for every job.</p>
          </div>
        </section>

        <section className="models-intro" aria-label="Models in plain English">
          <div>
            <span className="section-kicker">in plain English</span>
            <p>A model is a system trained to recognize patterns and produce an output. Models vary in capability, speed, size, cost, modality, and the tasks they handle well.</p>
          </div>
          <figure className="models-comparison">
          <div className="models-comparison-heading">
            <div><span className="section-kicker">a visual guide / not a selector</span><h2>choose the right engine</h2></div>
            <span className="models-comparison-index" aria-hidden="true">01 — 03</span>
          </div>
          <div className="models-engine-list" role="img" aria-label="Illustrative comparison: small models are fast and low cost, balanced models offer quality and speed, and large models are deep but slower. Quick replies may suit smaller models, while complex reasoning may suit larger models.">
            <div className="models-engine models-engine-small"><span className="models-engine-marker" aria-hidden="true"><i /></span><strong>small</strong><span>fast · low cost</span></div>
            <div className="models-engine models-engine-balanced"><span className="models-engine-marker" aria-hidden="true"><i /></span><strong>balanced</strong><span>quality · speed</span></div>
            <div className="models-engine models-engine-large"><span className="models-engine-marker" aria-hidden="true"><i /></span><strong>large</strong><span>deep · slower</span></div>
          </div>
          <figcaption className="models-comparison-foot"><span>quick reply</span><span className="models-comparison-track" aria-hidden="true" /><span>complex reasoning</span></figcaption>
        </figure>
        </section>

        <section className="models-section" aria-labelledby="models-how-heading">
          <div className="models-section-heading"><span className="section-kicker">1 / under the hood</span><h2 id="models-how-heading">How it works</h2></div>
          <ol className="models-steps">
            <li><span>1</span><p>Choose a model based on the task, quality target, and budget.</p></li>
            <li><span>2</span><p>Send it input in the modalities it supports, such as text or images.</p></li>
            <li><span>3</span><p>Evaluate the output and switch models when the trade-off changes.</p></li>
          </ol>
        </section>

        <section className="models-section models-uses" aria-labelledby="models-uses-heading">
          <div className="models-section-heading"><span className="section-kicker">2 / outside the lab</span><h2 id="models-uses-heading">Real-world use</h2></div>
          <div className="models-use-list">
            <article><span className="models-use-index">1</span><div><h3>Fast classification</h3><p>Use a smaller, quicker model to sort tickets or label content at scale.</p></div></article>
            <article><span className="models-use-index">2</span><div><h3>Complex reasoning</h3><p>Use a larger model for planning, synthesis, or difficult analysis.</p></div></article>
            <article><span className="models-use-index">3</span><div><h3>On-device features</h3><p>Use a compact model for private, low-latency experiences on a phone or laptop.</p></div></article>
          </div>
        </section>

        <section className="models-picture" aria-labelledby="models-picture-heading">
          <span className="section-kicker">3 / picture it</span>
          <h2 id="models-picture-heading">Think of it like this: <em>Different engines for different jobs</em></h2>
          <p>AI models are built and trained in different ways. A smaller model may answer simple questions quickly and use fewer computing resources. A larger model may handle difficult instructions or complex reasoning better, but usually takes more time and computation. Some models specialize in text, images, audio, or a combination. The best choice depends on the task rather than one model always being best.</p>
        </section>

        <nav className="lesson-footer" aria-label="Lesson navigation">
          <Link href="/" className="back-link" data-testid="link-back-home-bottom"><ArrowLeft size={16} /> All concepts</Link>
          {next && <Link href={`/lesson/${next.number}`} className="next-link" onClick={() => { openDoor(9); window.scrollTo(0, 0); }} data-testid="link-next-lesson-9"><small>Open the next door →</small><span>{next.title}</span></Link>}
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
  if (number === 6) return <SemanticSearchLesson openDoor={openDoor} />;
  if (number === 7) return <McpLesson openDoor={openDoor} />;
  if (number === 8) return <ModelsLesson openDoor={openDoor} />;
  const next = lessons[number] ?? null;

  return (
    <div className="lesson-site lesson-page-enter">
      <header className="lesson-header">
        <Brand />
        <Link href="/" className="back-link" data-testid="link-back-home-top"><ArrowLeft size={16} /> All concepts</Link>
      </header>
      <main className="lesson-main" data-testid={`content-lesson-${number}`}>
        <div className="lesson-topline"><span>The AI advent / Door {number}</span></div>
        <div className="lesson-heading">
          <div><h1>{lesson.title}</h1><p className="lesson-lede">{lesson.subtitle}</p></div>
        </div>
        <section className="lesson-nine-intro" aria-label="Evals, hallucinations and guardrails in plain English">
          <div className="lesson-nine-copy">
            <span className="section-kicker">in plain English</span>
            <p>{lesson.explanation}</p>
          </div>
          <figure className="eval-diagram" aria-label="Evaluation compares model answers against test examples, checks whether claims are supported by evidence, then applies layered safeguards including input checks, citations, validation, and human review.">
            <figcaption><span className="section-kicker">A visual guide / quality and safety</span><strong>Trust is a process.</strong></figcaption>
            <div className="eval-flow">
              <div className="eval-node"><small>01 / EVALUATE</small><strong>Test examples</strong><span>Compare answers to expected behavior</span></div>
              <div className="eval-connector" aria-hidden="true">↓</div>
              <div className="eval-node eval-warning"><small>02 / DETECT</small><strong>Unsupported claim?</strong><span>Check each answer against evidence</span></div>
              <div className="eval-connector" aria-hidden="true">↓</div>
              <div className="eval-node"><small>03 / PROTECT</small><strong>Layered safeguards</strong><span>Input checks → citations → validation → human review</span></div>
            </div>
            <p>Each layer catches different failures; no single check guarantees safety.</p>
          </figure>
        </section>
        <div className="lesson-content">
          <article className="lesson-panel">
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
          <Link href="/" className="back-link" data-testid="link-back-home-bottom"><ArrowLeft size={16} /> All concepts</Link>
          {next ? <Link href={`/lesson/${next.number}`} className="next-link" onClick={() => { openDoor(next.number); window.scrollTo(0, 0); }} data-testid={`link-next-lesson-${next.number}`}><small>Open the next door →</small><span>{next.title}</span></Link> : <Link href="/" className="next-link" data-testid="link-finish-lessons"><small>All nine doors opened →</small><span>Explore all concepts</span></Link>}
        </nav>
      </main>
    </div>
  );
}

function NotFound() {
  return <div className="lesson-site"><header className="lesson-header"><Brand /><Link href="/" className="back-link" data-testid="link-home-not-found"><ArrowLeft size={16} /> All concepts</Link></header><main className="lesson-main"><div className="lesson-topline"><span>A little detour</span><span>404</span></div><div className="lesson-heading"><div><h1>This door isn’t here.</h1><p className="lesson-lede">There are nine concepts to explore. Head back to the index to pick one.</p><Link href="/" className="back-link" data-testid="link-return-not-found">Browse concepts <ArrowRight size={16} /></Link></div></div></main></div>;
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