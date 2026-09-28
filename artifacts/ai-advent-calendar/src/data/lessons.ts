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
    title: 'Semantic Search',
    doorTitle: 'Semantic Search',
    subtitle: 'Finding the right result even when the words do not match.',
    analogyTitle: 'Searching for the idea, not only the words',
    analogy: 'A normal keyword search looks for the words you typed. Semantic search also looks for content with a similar meaning. If you search for “quiet place to work,” it can find a document about “low-noise study areas” even though the wording is different. It works by comparing embeddings and ranking the items that are closest in meaning.',
    explanation: 'Semantic search compares the meaning and intent of a query with the meaning of indexed content, so related language can match even when the exact keywords are different.',
    pmRelevance: 'Semantic search helps users find relevant results even when their wording differs from a catalog, help center, or document title. Check ranking quality with real queries and make sure results respect access permissions.',
    example: 'A search for “quiet place to work” returns a calm café and a library desk ahead of a busy office because the first two better match the request’s meaning.',
    answer: '“Semantic search compares the meaning of a query with indexed content, often using embeddings, then ranks similar results. I would test whether those results are useful and permitted, not just mathematically close.”'
  },
  {
    number: 7,
    title: 'MCP',
    doorTitle: 'MCP',
    subtitle: 'A shared way for AI to connect to the tools around it.',
    analogyTitle: 'A standard connection for AI tools',
    analogy: 'AI applications often need access to outside systems such as files, calendars, databases, or developer tools. Without a shared standard, every connection must be built differently. MCP gives these systems a common way to describe what they offer and how an AI application can use it. The protocol does not grant unlimited access by itself; the application still controls which servers and permissions are allowed.',
    explanation: 'The Model Context Protocol is a common set of rules for exposing tools, resources, and prompts to AI applications, so each connection does not need a custom one-off design.',
    pmRelevance: 'MCP makes approved tools and information available through a common protocol. Decide which servers to trust, which actions to allow, and what permissions the application should enforce.',
    example: 'An AI assistant can use approved connections to inspect repository issues, find calendar events, and read files, with each system describing its available capabilities through MCP.',
    answer: '“MCP is a shared protocol through which servers expose tools, resources, and prompts to AI clients. It makes integrations consistent, but it does not replace the application’s controls over which servers and permissions are allowed.”'
  },
  {
    number: 8,
    title: 'Models',
    doorTitle: 'Models',
    subtitle: 'Why there is no single “best” AI for every job.',
    analogyTitle: 'Different engines for different jobs',
    analogy: 'AI models are built and trained in different ways. A smaller model may answer simple questions quickly and use fewer computing resources. A larger model may handle difficult instructions or complex reasoning better, but usually takes more time and computation. Some models specialize in text, images, audio, or a combination. The best choice depends on the task rather than one model always being best.',
    explanation: 'A model is a system trained to recognize patterns and produce an output. Models vary in capability, speed, size, cost, modality, and the tasks they handle well.',
    pmRelevance: 'Choose a model for the user task, quality target, latency, privacy requirements, and budget. Evaluate representative outputs and revisit the choice when the trade-offs change.',
    example: 'A smaller model sorts high-volume support tickets quickly, while a larger model handles difficult analysis. A compact on-device model can deliver low-latency features on a phone.',
    answer: '“There is no single best AI model for every job. I would compare capability, response time, cost, supported modalities, and privacy needs against the task, then evaluate real outputs and adjust the choice.”'
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