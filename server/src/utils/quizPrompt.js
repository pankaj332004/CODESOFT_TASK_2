/**
 * Utility for building AI Quiz Prompts and Structured Generation
 */

/**
 * Builds the system and user prompt for Gemini to generate structured quiz JSON
 */
function buildQuizPrompt({
  sourceType = 'topic',
  topic = '',
  content = '',
  count = 5,
  difficulty = 'Medium',
  questionTypes = ['multiple_choice'],
  includeExplanations = true,
}) {
  const typesDescription = [];
  if (questionTypes.includes('multiple_choice')) {
    typesDescription.push('Multiple Choice (4 distinct options with exactly one correct option)');
  }
  if (questionTypes.includes('true_false')) {
    typesDescription.push('True / False (2 options: "True" and "False")');
  }
  if (typesDescription.length === 0) {
    typesDescription.push('Multiple Choice (4 options)');
  }

  const prompt = `You are an expert educational curriculum and assessment designer.
Generate a high-quality, pedagogically sound quiz strictly adhering to the following parameters:

- Source Type: ${sourceType.toUpperCase()}
- Subject/Topic/Material: ${sourceType === 'image' ? 'Analyze the provided image (diagram, textbook page, handwritten notes, or infographic)' : topic || content}
- Number of Questions: ${count}
- Difficulty Level: ${difficulty} (Easy = foundational definitions & direct facts, Medium = conceptual understanding & application, Hard = edge cases, multi-step problem solving & architectural analysis)
- Question Types to include: ${typesDescription.join(' OR ')}
- Include Explanations: ${includeExplanations ? 'YES (provide detailed rationale and concept hierarchy)' : 'Brief answer only'}

IMPORTANT PEDAGOGICAL GUIDELINES:
1. Formulate realistic and plausible distractors (wrong options) based on common student misconceptions. Avoid silly or obvious wrong choices.
2. Ensure each question has exactly one unambiguously correct answer.
3. For "correctAnswer", provide the EXACT matching string from the "options" array.
4. For "concept", provide a hierarchical breadcrumb trail (e.g. "Biology → Cell Energy → Photosynthesis Light Reaction").
5. If the source material is an image or text, base the questions directly on the visible facts, terms, formulas, and concepts present.

RESPONSE FORMAT:
You MUST respond ONLY with a raw, valid JSON object (no markdown backticks, no markdown codeblock fencing, no conversational text). The JSON schema must strictly match:

{
  "title": "A concise, engaging title for the quiz (e.g., Photosynthesis & Cellular Energy)",
  "description": "A 1-2 sentence overview of what this quiz evaluates",
  "category": "The best matching academic/technical domain (e.g., Web Development, Biology, DBMS, Computer Networks, General Science)",
  "difficulty": "${difficulty}",
  "timeLimitMinutes": ${Math.max(5, Math.ceil(count * 1.5))},
  "questions": [
    {
      "questionText": "The complete question prompt text?",
      "options": ["Option A text", "Option B text", "Option C text", "Option D text"],
      "correctAnswer": "Option A text",
      "explanation": "Detailed pedagogical explanation of why this answer is correct and why other options are flawed.",
      "quickExplanation": "Key takeaway in 1 sentence.",
      "concept": "Domain → Subject → Subtopic"
    }
  ]
}`;

  return prompt;
}

/**
 * Intelligent algorithmic fallback generator
 * Generates rich, realistic questions when offline or when no Gemini API key is configured.
 */
function generateHeuristicQuiz({
  sourceType = 'topic',
  topic = '',
  content = '',
  count = 5,
  difficulty = 'Medium',
  questionTypes = ['multiple_choice'],
  includeExplanations = true,
}) {
  const rawSubject = (topic || content || (sourceType === 'image' ? 'Image Analysis Concept' : 'General Knowledge')).trim();
  const title = rawSubject.length > 50 ? `${rawSubject.substring(0, 47)}...` : rawSubject;
  const capitalizedTitle = title.charAt(0).toUpperCase() + title.slice(1);

  // Determine likely category
  let category = 'General Knowledge';
  const lower = rawSubject.toLowerCase();
  if (lower.includes('photo') || lower.includes('cell') || lower.includes('bio') || lower.includes('dna')) {
    category = 'Biology & Life Sciences';
  } else if (lower.includes('react') || lower.includes('javascript') || lower.includes('css') || lower.includes('html') || lower.includes('web')) {
    category = 'Web Development';
  } else if (lower.includes('db') || lower.includes('sql') || lower.includes('data') || lower.includes('mongo')) {
    category = 'DBMS & Databases';
  } else if (lower.includes('network') || lower.includes('protocol') || lower.includes('tcp') || lower.includes('ip') || lower.includes('http')) {
    category = 'Computer Networks';
  } else if (lower.includes('ai') || lower.includes('machine learning') || lower.includes('model') || lower.includes('neural')) {
    category = 'Artificial Intelligence';
  }

  // Pre-structured intelligent question templates adapted to the topic
  const sampleBanks = {
    biology: [
      {
        questionText: `What is the primary biological function of chlorophyll in ${capitalizedTitle}?`,
        options: ['Absorb light energy', 'Produce carbon dioxide', 'Store glucose long-term', 'Absorb atmospheric oxygen'],
        correctAnswer: 'Absorb light energy',
        explanation: 'Chlorophyll is a pigment present in chloroplasts that absorbs sunlight primarily in the blue and red wavelengths to drive the light-dependent reactions of photosynthesis.',
        quickExplanation: 'Chlorophyll absorbs photon energy required to excite electrons.',
        concept: 'Biology → Cell Energetics → Photosynthesis',
      },
      {
        questionText: 'Where do the light-independent reactions (Calvin Cycle) take place inside the plant cell?',
        options: ['Thylakoid lumen', 'Stroma of the chloroplast', 'Mitochondrial matrix', 'Inner membrane space'],
        correctAnswer: 'Stroma of the chloroplast',
        explanation: 'The Calvin Cycle occurs within the stroma of the chloroplast, utilizing ATP and NADPH generated during the light reactions to convert CO2 into carbohydrates.',
        quickExplanation: 'The Calvin Cycle takes place in the fluid stroma.',
        concept: 'Biology → Chloroplast Anatomy → Calvin Cycle',
      },
      {
        questionText: 'Which molecule acts as the primary electron donor in the light-dependent reactions?',
        options: ['Water (H2O)', 'Carbon dioxide (CO2)', 'Glucose', 'Oxygen gas (O2)'],
        correctAnswer: 'Water (H2O)',
        explanation: 'Water molecules undergo photolysis at Photosystem II, releasing electrons, protons (H+), and by-product oxygen (O2).',
        quickExplanation: 'Photolysis of water provides replacement electrons.',
        concept: 'Biology → Electron Transport → Photolysis',
      },
      {
        questionText: 'ATP synthesis during the light reactions is driven directly by which mechanism?',
        options: ['A proton gradient across the thylakoid membrane', 'Direct cleavage of glucose molecules', 'Absorption of ultraviolet radiation', 'Passive diffusion of carbon dioxide'],
        correctAnswer: 'A proton gradient across the thylakoid membrane',
        explanation: 'Protons accumulated inside the thylakoid lumen flow back into the stroma through ATP Synthase, driving photophosphorylation.',
        quickExplanation: 'Chemiosmosis powered by a proton electrochemical gradient.',
        concept: 'Biology → Bioenergetics → Chemiosmosis',
      },
    ],
    tech: [
      {
        questionText: `What is a primary architectural advantage of utilizing ${capitalizedTitle}?`,
        options: ['Modular component isolation and predictability', 'Elimination of all network latency', 'Zero runtime memory allocation', 'Automated hardware overclocking'],
        correctAnswer: 'Modular component isolation and predictability',
        explanation: 'Modern architectural standards emphasize separation of concerns, high reusability, and predictable state transitions.',
        quickExplanation: 'Enables clean modularity, maintainability, and testability.',
        concept: `${category} → Core Architecture → Best Practices`,
      },
      {
        questionText: `Which algorithmic complexity is typically targeted when optimizing operations in ${capitalizedTitle}?`,
        options: ['O(1) constant or O(log n) logarithmic time', 'O(n!) factorial time', 'O(2^n) exponential time', 'O(n^3) cubic time'],
        correctAnswer: 'O(1) constant or O(log n) logarithmic time',
        explanation: 'Efficient systems prioritize sub-linear or constant time lookups and indexing over brute-force traversals.',
        quickExplanation: 'Logarithmic or constant complexity provides superior scalability.',
        concept: `${category} → Performance Optimization → Complexity Analysis`,
      },
      {
        questionText: `When handling concurrent interactions within ${capitalizedTitle}, what guarantees data consistency?`,
        options: ['Atomic transactions and immutable state patterns', 'Global variable mutability', 'Unsynchronized polling loops', 'Disabling browser caching entirely'],
        correctAnswer: 'Atomic transactions and immutable state patterns',
        explanation: 'Atomicity and immutable state patterns prevent race conditions, stale closures, and inconsistent render cycles.',
        quickExplanation: 'Immutability and atomic operations protect against concurrency anomalies.',
        concept: `${category} → State & Data Management → Concurrency`,
      },
      {
        questionText: `How should error recovery be structured when deploying ${capitalizedTitle}?`,
        options: ['Graceful degradation with fallback handlers', 'Silent uncaught crash loops', 'Hardcoded system halts', 'Ignoring network timeout responses'],
        correctAnswer: 'Graceful degradation with fallback handlers',
        explanation: 'Resilient applications implement defensive fallbacks, circuit breakers, and user-friendly recovery paths.',
        quickExplanation: 'Graceful fallbacks ensure continuous availability under failure conditions.',
        concept: `${category} → Resilience & Error Handling → Fault Tolerance`,
      },
    ],
  };

  const pool = category.includes('Bio') ? sampleBanks.biology : sampleBanks.tech;
  const questions = [];

  const allowTrueFalse = questionTypes.includes('true_false');
  const allowMultipleChoice = questionTypes.includes('multiple_choice');

  for (let i = 0; i < count; i++) {
    const isTF = allowTrueFalse && (!allowMultipleChoice || i % 2 === 1);

    if (isTF) {
      const isTrue = i % 2 === 0;
      questions.push({
        questionText: `True or False: In ${capitalizedTitle}, foundational principles require strict adherence to standardized interface contracts.`,
        options: ['True', 'False'],
        correctAnswer: isTrue ? 'True' : 'False',
        explanation: includeExplanations
          ? `Standardized interfaces decouple modules and enforce predictable interoperability across the ${capitalizedTitle} ecosystem.`
          : 'Standard interface contracts ensure consistency.',
        quickExplanation: 'Interface contracts maintain boundary consistency.',
        concept: `${category} → System Design → Standards`,
      });
    } else {
      const template = pool[i % pool.length];
      questions.push({
        questionText: template.questionText,
        options: [...template.options],
        correctAnswer: template.correctAnswer,
        explanation: includeExplanations ? template.explanation : 'Correct answer verified.',
        quickExplanation: template.quickExplanation,
        concept: template.concept,
      });
    }
  }

  return {
    title: `${capitalizedTitle} Mastery Quiz`,
    description: `An AI-generated assessment designed to test and reinforce your knowledge of ${capitalizedTitle} with detailed pedagogical breakdowns.`,
    category,
    difficulty,
    timeLimitMinutes: Math.max(5, Math.ceil(count * 1.5)),
    questions,
    sourceType,
  };
}

module.exports = {
  buildQuizPrompt,
  generateHeuristicQuiz,
};
