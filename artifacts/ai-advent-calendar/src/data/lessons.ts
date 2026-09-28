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
    title: 'RAG',
    doorTitle: 'RAG',
    subtitle: 'How AI finds the right facts before it answers.',
    analogyTitle: 'Giving the model a trusted cheat sheet.',
    analogy: 'A model learns broad patterns and general knowledge from large collections of text. It was not trained on private details such as your favorite snack, today’s inventory, or the exact location of your company’s IT desk. Without that information, it may guess or repeat something unrelated that it learned elsewhere. RAG first searches sources you trust, such as company documents or a product catalog, and places the most relevant information in front of the model like a cheat sheet. The model can then answer using those facts instead of relying only on memory.',
    explanation: 'Retrieval-augmented generation lets an AI search a trusted collection of documents, bring the best passages into its prompt, and write a response grounded in those passages.',
    pmRelevance: 'RAG is often the first choice for private or frequently changing knowledge. Evaluate the retriever and the final answer separately. Require citations when users need to verify claims, and define what happens when nothing relevant is found.',
    example: 'An internal benefits bot finds the current parental-leave policy, quotes the eligible section, and links the document. If the policy is missing, it says it cannot confirm rather than inventing one.',
    answer: '“RAG retrieves relevant external information at request time and gives it to the model as context. I would use it for changing or proprietary knowledge, then measure retrieval quality, answer grounding, citations, and safe fallback behavior.”'
  },
  {
    number: 2,
    title: 'Inference',
    doorTitle: 'Inference',
    subtitle: 'What happens when a trained model meets your question.',
    analogyTitle: 'Using what the model learned',
    analogy: 'Training is when a model learns patterns from many examples. Inference is what happens later, when you give that trained model something new. If you type the beginning of a sentence, the model uses its learned patterns to predict what should come next. The model is not learning from scratch each time; it is applying what it already learned to the input in front of it.',
    explanation: 'Inference is the act of running a trained model on new input to produce a prediction, generate text, classify something, or choose the next action.',
    pmRelevance: 'Inference is the moment a user experiences an AI product. Evaluate the usefulness, response time, reliability, and cost of each model run.',
    example: 'A weather-aware assistant reads “Rain is in the forecast…” and predicts “bring an umbrella” with a confidence score of 0.91.',
    answer: '“Inference applies a trained model to new input to produce an output. I would measure both the quality of that output and the speed and cost of producing it.”'
  },
  {
    number: 3,
    title: 'Embeddings',
    doorTitle: 'Embeddings',
    subtitle: 'How words become points on a map of meaning.',
    analogyTitle: 'A map organized by meaning',
    analogy: 'Imagine placing every sentence on a giant map. Sentences about refunds would appear near sentences about returning a purchase, even when they use different words. A sentence about making pizza would be much farther away. An embedding gives each item numeric coordinates on this meaning map, making it possible for software to compare how closely related two items are.',
    explanation: 'An embedding turns text, images, or other data into a list of numbers that captures relationships and meaning. Similar items land near each other in that mathematical space.',
    pmRelevance: 'Embeddings make similarity search and recommendations possible. Evaluate what close matches mean for the product and check whether the results are actually relevant to users.',
    example: 'A support tool finds that “refund” and “return money” are closely related even though they use different words.',
    answer: '“Embeddings represent items as numeric vectors so software can compare their similarity. I would use them to retrieve related content and test whether nearby results are useful, not just mathematically close.”'
  },
  {
    number: 4,
    title: 'Context Window',
    doorTitle: 'Context Window',
    subtitle: 'The amount of conversation an AI can hold at once.',
    analogyTitle: 'The model’s working space',
    analogy: 'Think of the context window as the information currently spread across a desk. The model can work with anything on that desk: your latest message, earlier conversation, instructions, and retrieved documents. But the desk has a size limit. When too much information is added, older or less important material may need to be removed or summarized before the model can continue.',
    explanation: 'A context window is the maximum amount of text a model can consider in one request: your prompt, earlier messages, instructions, retrieved documents, and its response.',
    pmRelevance: 'Plan which instructions, history, and documents belong in a request. Test behavior at the token limit, and decide when to trim or summarize older context.',
    example: 'A contract assistant keeps the user’s question and relevant clauses in view, then summarizes older conversation so the request fits within the model’s token limit.',
    answer: '“The context window is the token budget for everything a model can consider in one request. I would prioritize relevant information, account for the response, and test what happens when the conversation grows.”'
  },
  {
    number: 5,
    title: 'Tokens',
    doorTitle: 'Tokens',
    subtitle: 'Why AI counts pieces of words instead of whole sentences.',
    analogyTitle: 'Text cut into manageable pieces',
    analogy: 'A model does not read text exactly one word at a time. Before processing it, a tokenizer breaks the text into reusable pieces called tokens. A common word may be one token, while a longer or unusual word may be split into several. The model receives these pieces as numbers and predicts one new token at a time to build its response.',
    explanation: 'Tokens are the small chunks of text a model reads and writes. A token might be a whole word, part of a word, a space, or punctuation, depending on the tokenizer.',
    pmRelevance: 'Token counts affect API usage and pricing, context limits, and the speed of streaming responses. Plan for both the text sent to a model and the text it generates.',
    example: 'An illustrative tokenizer might split “Unforgettable!” into “Un”, “forget”, “table”, and “!” before mapping each piece to an ID.',
    answer: '“Tokens are the text pieces a model processes. A tokenizer maps them to IDs, and the model predicts its response one token at a time. I would track both input and output token usage to understand context limits and cost.”'
  },
  {
    number: 6,
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