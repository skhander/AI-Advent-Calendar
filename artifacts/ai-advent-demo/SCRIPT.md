# The AI Advent — 40-second product walkthrough

## Director's treatment

- **Format:** 16:9 landscape, 40 seconds. A portfolio piece, silent in meaning and optionally accompanied by restrained instrumental music.
- **Promise:** Nine illustrated doors lead to nine substantial, distinct AI lessons.
- **Identity:** Only pixels captured from the running AI Advent Calendar. Deep evergreen and cream on the home; warm off-white, dark blue-green, and terracotta in the lessons. No new title cards, UI, gradients, stock imagery, or substitute fonts.
- **Hero:** The actual illustrated house and the real lesson pages. A small, calm cursor is the viewer's guide.
- **Motion:** Natural cursor travel, brief click response, matched entry/exit dissolves, and measured vertical page movement. Never re-create the site's artwork.
- **Arc:** Full homepage hold → deliberate first door → a real lesson explored in depth → return → second door → complete homepage as a resolved portfolio closing frame.
- **Payoff:** The same nine-door house returns after seeing two very different lessons, now understood as a collection rather than a static illustration.

All interface text is captured from the running app. No voiceover or editorial captions. The cursor is the only added graphic. Gentle music is optional to comprehension; there are no sound-dependent beats.

| Shot | Time | Focus | Main movement | Handoff |
| --- | --- | --- | --- | --- |
| 01 | 00.0–07.2 | Entire holiday homepage | Quiet hold, cursor approaches RAG door, click | Door contact leads to lesson |
| 02 | 07.2–22.5 | RAG lesson | Full top view, gradual page scroll past real diagram and sections, return to top | Cursor clicks All concepts |
| 03 | 22.5–29.2 | Home, second exploration | House returns; cursor crosses diagonally to Evals / safety | Second door contact leads to second lesson |
| 04 | 29.2–35.0 | Evals / safety lesson | Title and evaluation diagram, gentle downward reveal | Return via All concepts |
| 05 | 35.0–40.0 | Full homepage | House settles full-frame; generous final hold | Same full home frame loops cleanly to shot 01 |

### Shot 01 — 00.0–07.2, 7.2 s — Invitation

- **Purpose:** Let the audience understand the product before any navigation.
- **Exact screen content:** The actual page reads “the AI advent,” “Learn one AI concept a day,” “9 DAYS · 9 CONCEPTS,” and displays all nine labeled doors. No added captions.
- **Composition:** Full-bleed 16:9 capture of the real homepage; headline across the upper center and illustrated house occupying most of the lower frame. No simulated browser chrome or letterboxing.
- **Artistic idea:** The untouched house becomes an interactive map as a fine, cream-toned cursor enters its illustration. The first click is the transition's cause.
- **Choreography:** 0.0–2.3 still/readable hold (only the tiny background motion present in the captured page is frozen); 2.3 cursor appears unobtrusively near lower-right; 2.5–5.7 cursor moves in a natural two-segment eased path to the RAG door; 5.7–6.35 short poised hold; 6.35–6.55 one restrained click halo; 6.55–7.2 screenshot gently compresses toward the door by no more than 3% and fades into the lesson. The house remains visible through the handoff.
- **Transition:** RAG door click point is carried into the lesson by the same cursor position; overlapping dissolve and tiny scale adjustment, no blank frame.
- **Assets/technique:** One actual 1600×900 home capture from the running app; timeline-driven SVG cursor; Framer Motion opacity/transform.
- **Sound intent:** Restrained instrumental starts quietly. No click sound.

### Shot 02 — 07.2–22.5, 15.3 s — RAG is more than a door

- **Purpose:** Show that each door opens an editorial, diagram-first learning page.
- **Exact screen content:** Real RAG lesson title and subtitle, plain-English introduction, its existing retrieval visual guide, the numbered “How it works” and “Real-world use” sections. “All concepts” link remains the real app's header when at page top.
- **Composition:** A full-width actual RAG page capture; at first its heading fills the top half, then the viewport moves down the page as if a user scrolls. No callout labels or fake highlights. Focus shifts from typography to explanatory diagram to numbered content.
- **Artistic idea:** The concept's own layout becomes the motion graphic. A slow, continuous vertical scroll reveals the real retrieval path; a short settled pause makes the diagram readable.
- **Choreography:** 7.2–8.0 incoming page settles, cursor clears; 8.0–9.6 title hold; 9.6–13.2 controlled scroll to bring intro and diagram center-frame; 13.2–14.3 diagram hold; 14.3–17.7 continue to numbered content; 17.7–19.2 content hold; 19.2–21.3 smooth scroll back to page top; 21.3–22.1 cursor crosses to “All concepts” at upper-right; 22.1 click; 22.1–22.5 small dissolve.
- **Transition:** A click on the existing navigation link leads directly back to the full home capture, preserving the pointer's last position for a moment.
- **Assets/technique:** Full-page 1600px-wide capture from running `/lesson/1`, translated behind a 900px-high viewport; cursor only.
- **Sound intent:** Music remains understated with no claimed beat-sync.

### Shot 03 — 22.5–29.2, 6.7 s — Another door

- **Purpose:** Demonstrate that the calendar is a collection, not a single lesson.
- **Exact screen content:** Same real homepage headline, progress and nine labeled doors. The second chosen door is “Evals / safety.”
- **Composition:** Full home again, identical framing to shot 01. The diagonal cursor path connects the top-right back link to the lower-right door, crossing the house without covering the headline.
- **Artistic idea:** Repetition gains meaning: the house is now a navigable table of contents.
- **Choreography:** 22.5–23.1 house resolves; 23.1–24.7 hold; 24.7–27.9 cursor moves purposefully toward the Evals / safety door; 27.9–28.4 poised hold; 28.4–28.6 restrained click halo; 28.6–29.2 gentle 3% pull toward door and overlap dissolve.
- **Transition:** Second door click carries into the differently colored, diagram-first Evals page.
- **Assets/technique:** Same exact home capture as shot 01; cursor component reused.
- **Sound intent:** A slight musical lift, no sound effect.

### Shot 04 — 29.2–35.0, 5.8 s — Another concept

- **Purpose:** Quickly show a second distinct concept and its substantive visual explanation.
- **Exact screen content:** “Evals, hallucinations & guardrails,” its subtitle, plain-English explanation, and the actual “A visual guide” diagram showing test examples, unsupported claims and layered safeguards.
- **Composition:** Actual full-page Evals capture. The long headline starts large and remains legible; a small downward movement brings the existing diagram into the center. The diagram itself stays unchanged.
- **Artistic idea:** The second visual guide echoes RAG's diagram-first format while showing a wholly different AI topic.
- **Choreography:** 29.2–29.9 settle from door; 29.9–31.0 headline hold; 31.0–33.3 smooth partial scroll toward the diagram; 33.3–34.0 hold; 34.0–34.5 scroll back to top; 34.5–34.8 cursor reaches and clicks “All concepts”; 34.8–35.0 overlap dissolve.
- **Transition:** Existing navigation leads back to the full house; no title card.
- **Assets/technique:** Full-page 1600px-wide capture from running `/lesson/9`; cursor.
- **Sound intent:** Music stays calm.

### Shot 05 — 35.0–40.0, 5 s — The complete collection

- **Purpose:** Leave the portfolio viewer with the product itself, not an ad message.
- **Exact screen content:** Full real homepage: “the AI advent,” “Learn one AI concept a day,” “9 DAYS · 9 CONCEPTS,” nine doors.
- **Composition:** Full-bleed house at original scale, centered and fully readable. No overlay, credits, or added CTA.
- **Artistic idea:** The final static composition is earned by motion: every door now suggests a distinct lesson. A very slight camera settle is the only motion before the final hold.
- **Choreography:** 35.0–35.7 home returns and settles from a near-imperceptible scale; 35.7–39.75 generous still hold; 39.75–40.0 cursor absent and framing matches shot 01 precisely, so the preview loop is seamless.
- **Transition:** Exact same home frame at end and beginning; no black or blank gap.
- **Assets/technique:** Same home capture as shots 01 and 03.
- **Sound intent:** Instrumental decays toward the loop boundary.

## Preproduction review

The home is full-bleed, the lesson content is the actual product, and the only generated layer is the cursor. Shots 01, 03, and 05 deliberately reuse the home because the requested narrative is discovery and return, while the lesson shots introduce a contrasting warm editorial field and meaningful scrolling. There are no external stock assets, fake interface elements, new headings, gradients, or unnecessary zoom. All five scene durations sum to exactly 40,000 ms; both clicks have a visible outcome and every transition overlaps real content.