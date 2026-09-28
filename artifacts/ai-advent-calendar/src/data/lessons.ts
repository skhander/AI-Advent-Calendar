export type Lesson = {
  number: number;
  title: string;
  doorTitle: string;
  subtitle: string;
  analogyTitle: string;
  analogy: string;
  explanation: string;
  pmRelevance: string;
  example: string;
  answer: string;
};

export const lessons: Lesson[] = [
  {
    number: 1,
    title: 'AI, ML & deep learning',
    doorTitle: 'AI vs ML',
    subtitle: 'Three nested ideas. One very common interview question.',
    analogyTitle: 'A set of nesting dolls.',
    analogy: 'Artificial intelligence is the outer doll: any system that does something we call intelligent. Machine learning sits inside it: systems that learn patterns from data. Deep learning is the smallest doll: ML built from multi-layer neural networks.',
    explanation: 'AI is the broad goal of making machines perform tasks associated with intelligence, including rule-based systems. ML is a way to achieve AI by learning from examples rather than writing every rule. Deep learning is a subset of ML whose layered neural networks learn complex representations from large amounts of data. Generative AI often uses deep learning, but not all AI is generative.',
    pmRelevance: 'The distinction stops you from overengineering. A clear decision tree may solve a problem better than an expensive model. Start with the user problem and the simplest reliable approach, not the newest technique.',
    example: 'A support team routes tickets with hand-written keywords (rule-based AI), predicts ticket priority from past tickets (ML), and summarizes each ticket with a transformer model (deep learning).',
    answer: '“AI is the umbrella. ML is AI that learns patterns from data, and deep learning is ML using layered neural networks. I would choose among them based on the problem, available data, accuracy needs, cost, and how explainable the result needs to be.”'
  },
  {
    number: 2,
    title: 'LLMs & tokens',
    doorTitle: 'LLMs & tokens',
    subtitle: 'How a language model reads, writes, and charges by the piece.',
    analogyTitle: 'An astonishing autocomplete.',
    analogy: 'Imagine someone who has read an enormous library and is very good at guessing the next bit of a sentence. An LLM does this with tokens: small chunks of text, not always whole words.',
    explanation: 'A large language model is a neural network trained to predict tokens from context. Text is split into tokens, which can be words, word fragments, punctuation, or symbols. The model assigns probabilities to possible next tokens and generates a response one token at a time. It learns statistical patterns, not a verified database of facts.',
    pmRelevance: 'Tokens affect latency, context limits, and price. Longer prompts and longer outputs usually cost more. A PM should set response-length expectations and measure both quality and cost per successful task.',
    example: 'A customer-support assistant receives a 1,200-token conversation and returns a 180-token draft. Both input and output tokens count toward usage, and a concise draft is faster and cheaper to review.',
    answer: '“An LLM predicts the next token using the context it has been given. Tokens are chunks of text, and their count drives context usage, latency, and cost. I would optimize for task success per dollar, not just model fluency.”'
  },
  {
    number: 3,
    title: 'Training vs inference',
    doorTitle: 'Training / inference',
    subtitle: 'The difference between learning a skill and putting it to work.',
    analogyTitle: 'Studying versus taking the test.',
    analogy: 'Training is the long period of practice where a chef learns from thousands of recipes and feedback. Inference is making tonight’s dinner using what they have already learned.',
    explanation: 'During training, a model sees examples and its parameters are adjusted to reduce errors. Inference happens after training: the model uses fixed learned parameters to respond to a new input. A normal chat does not retrain the underlying model. Supplying information in a prompt changes its immediate context, not its weights.',
    pmRelevance: 'Training and inference have different costs and timelines. Most product teams build on an existing model and spend their effort improving the inference experience through prompts, retrieval, UX, and evaluation.',
    example: 'A company uses a pre-trained LLM to summarize meeting notes. Each new summary is an inference call; the model does not permanently learn the company’s meeting style from that call.',
    answer: '“Training updates a model’s parameters using data; inference uses those learned parameters to produce an output for a new input. For most product features, I would start with inference on an existing model before considering any additional training.”'
  },
  {
    number: 4,
    title: 'Prompts & context windows',
    doorTitle: 'Prompts / context',
    subtitle: 'What the model can see shapes what it can say.',
    analogyTitle: 'A desk with limited space.',
    analogy: 'A prompt is the brief you hand to a collaborator. The context window is the size of their desk: instructions, documents, chat history, and the answer all need to fit on it.',
    explanation: 'A prompt contains instructions and information supplied at inference time. The context window is the maximum number of tokens the model can consider in a request, including input and often the generated output. Long context does not guarantee good attention to every detail; irrelevant material can bury important instructions.',
    pmRelevance: 'Design what goes into the window. Prioritize relevant evidence, clear task instructions, and useful examples. Plan for truncation, growing chat histories, privacy-sensitive information, and rising token cost.',
    example: 'A contract assistant receives the user’s question, the relevant clause, and a direction to cite the clause. Sending the entire archive instead would add cost and make the right passage harder to find.',
    answer: '“The prompt is the task and context we provide; the context window is the token budget available to the model. I would keep instructions precise, retrieve only relevant information, and test what happens when conversations get long.”'
  },
  {
    number: 5,
    title: 'Embeddings & vector search',
    doorTitle: 'Vector search',
    subtitle: 'Finding related meaning even when the words differ.',
    analogyTitle: 'A map of ideas.',
    analogy: 'Picture every sentence pinned onto a map. Ideas with similar meanings land near each other, even if they use different words. An embedding gives each idea its coordinates.',
    explanation: 'An embedding is a numeric vector representing content in a learned semantic space. Vector search compares vectors using a similarity measure and retrieves nearby items. It is useful for semantic search, recommendations, clustering, and finding source material for RAG. Similarity suggests relevance; it does not prove truth.',
    pmRelevance: 'Semantic search can help users find “how to change my plan” when the help article says “subscription modifications.” Quality depends on chunking, metadata, freshness, permissions, and testing real queries.',
    example: 'A help center indexes article chunks as embeddings. A query for “my card was charged twice” retrieves an article titled “Resolving duplicate payments,” despite the wording mismatch.',
    answer: '“Embeddings turn content into vectors so we can retrieve items close in meaning, not just exact keywords. I would evaluate retrieval relevance and access controls because a nearby result is not automatically the right one.”'
  },
  {
    number: 6,
    title: 'RAG',
    doorTitle: 'RAG',
    subtitle: 'Give the model the right reading material before it answers.',
    analogyTitle: 'An open-book exam.',
    analogy: 'Instead of expecting a student to remember the latest company handbook, let them find the relevant page first and answer with the book open.',
    explanation: 'Retrieval-augmented generation (RAG) retrieves relevant external information and adds it to the model’s prompt before generation. A typical pipeline indexes documents, retrieves likely passages for a question, then asks the model to answer grounded in those passages. It can improve freshness and traceability without changing model weights.',
    pmRelevance: 'RAG is often the first choice for private or frequently changing knowledge. Evaluate the retriever and the final answer separately. Require citations when users need to verify claims, and define what happens when nothing relevant is found.',
    example: 'An internal benefits bot finds the current parental-leave policy, quotes the eligible section, and links the document. If the policy is missing, it says it cannot confirm rather than inventing one.',
    answer: '“RAG retrieves relevant external information at request time and gives it to the model as context. I would use it for changing or proprietary knowledge, then measure retrieval quality, answer grounding, citations, and safe fallback behavior.”'
  },
  {
    number: 7,
    title: 'Fine-tuning',
    doorTitle: 'Fine-tuning',
    subtitle: 'Teaching a model a pattern, not handing it a filing cabinet.',
    analogyTitle: 'Coaching a writing style.',
    analogy: 'A coach can train a writer to consistently use a certain format. But if the writer needs this morning’s sales figures, training is not the right tool: give them the report.',
    explanation: 'Fine-tuning continues training a pre-trained model on a narrower set of examples, changing its weights. It can improve consistent formatting, tone, or task-specific behavior. It is usually a poor substitute for RAG when the need is to supply frequently updated facts. It also needs quality examples and ongoing evaluation.',
    pmRelevance: 'Try prompting and RAG first. Consider fine-tuning when repeated, measurable failures remain and there is enough representative training data. Budget for data preparation, training, regression testing, and maintenance.',
    example: 'A team fine-tunes a smaller model on thousands of correctly labeled insurance intake messages to output a strict classification schema. Current policy terms still come from retrieval.',
    answer: '“Fine-tuning changes model weights using task-specific examples. I would use it for consistent behavior or format after a baseline fails, not as a database for changing facts. I would compare its quality and cost against prompting and RAG.”'
  },
  {
    number: 8,
    title: 'Agents & tool use',
    doorTitle: 'Agents / tools',
    subtitle: 'When a model can do something, not just say something.',
    analogyTitle: 'A concierge with a key ring.',
    analogy: 'A concierge can answer a question from memory, but booking a table means checking availability and using a reservation system. Tools give the assistant controlled ways to act.',
    explanation: 'Tool use lets a model request structured actions such as searching a database, running code, or calling a service. An agent is a system that can choose steps and tools toward a goal, observe results, and continue. The model proposes actions; the surrounding software validates permissions, executes tools, and enforces limits.',
    pmRelevance: 'Every action adds risk and failure modes. Define tool permissions, confirmation points, timeouts, audit trails, and human handoff. Start with narrow, reversible tasks before allowing consequential actions.',
    example: 'A travel assistant searches approved flight inventory, compares options, and drafts an itinerary. It asks the user for explicit confirmation before any purchase.',
    answer: '“An agent uses a model to plan steps and invoke tools, while application code actually executes the actions. I would limit tool scope, require confirmation for high-impact actions, and measure completed tasks alongside error and escalation rates.”'
  },
  {
    number: 9,
    title: 'Evals, hallucinations & guardrails',
    doorTitle: 'Evals / safety',
    subtitle: 'The part that turns a clever demo into a trustworthy product.',
    analogyTitle: 'A dress rehearsal with safety rails.',
    analogy: 'Before opening night, you test the show with a real audience, watch where performers improvise the wrong line, and put clear boundaries around what must never happen.',
    explanation: 'An evaluation is a repeatable way to measure model behavior on representative tasks. A hallucination is a plausible-sounding output unsupported by evidence. Guardrails are layered controls: input checks, grounding and citations, output validation, permissions, and human review. None is a guarantee on its own.',
    pmRelevance: 'Define success and unacceptable failures before launch. Build a test set of typical, edge, and adversarial cases; track quality, groundedness, latency, cost, and harm. Review failures continuously as the product and model change.',
    example: 'A medical-information assistant is tested on 300 real questions. It must cite approved materials, avoid personalized diagnosis, and escalate urgent symptoms; the team reviews every unsupported clinical claim.',
    answer: '“I would evaluate the full workflow against real user tasks, including safety and edge cases. Hallucinations are confident unsupported claims, so I would combine grounding, validation, clear refusals, human escalation, and ongoing monitoring rather than trusting one guardrail.”'
  }
];