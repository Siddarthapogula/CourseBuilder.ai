export const getPrompt = (UserInput: string, data: any, stage: number) => {
  if (stage == 1) {
    return {
      generationStage: "module_generation",
      prompt: `
        You are an expert course designer specialized in structuring educational content for various subjects.

        Your task:
        Given a user prompt describing a course idea, analyze it carefully and generate the courseName and  a structured list of module titles that would best organize the course into logical learning units.

        ### Rules
        1. Output **only valid JSON**, without any markdown, code block, or extra text.
        2. Do not include explanations.
        3. Each module must have a short, descriptive title.

        ### Input
        ${UserInput}

        ### Output JSON Schema
        {
        "courseName: "string",
        "modules": [
            { "title": "string" }
        ]
        }

        Now, return only the JSON output following the schema above.
        `,
    };
  } else if (stage == 2) {
    return {
      generationStage: "module_expansion",
      prompt: `
      You are an expert course designer specialized in structuring educational content for various subjects.

      ### Task
      Given a Course Name and a list of finalized modules (each with a 'title' and 'moduleId'), generate a detailed explanation, one relevant example, and additional references for each module.

      ### Input
      Course Name: ${data?.courseName}
      Modules List: ${JSON.stringify(data)} 
      // Note: 'data' is an array: [ { "moduleId": "clxyz...", "title": "..." } ]

      ### Rules
      1.  Output **only valid JSON**. Do not include any markdown, code block formatting (like \`\`\`json), or any commentary.
      2.  Return an array of module objects.
      3.  You **MUST** include the *exact* 'moduleId' for each module as it was provided in the input list. This is critical for data mapping.
      4.  If you cannot find a reference video or site, leave the value as an empty string "".
      5.  Each module object must strictly follow this exact schema:

      {
        "moduleId": "string",
        "moduleTitle": "string",
        "description": "string",
        "referenceVideo": "string",
        "referenceSite": "string"
      }

      ### Output
      Return only the JSON array of module objects, following the schema above.
      `,
    };
  } else {
    return {
      generationStage: "quiz_generation",
      prompt: `
      You are an expert Quiz Creator specialized in designing educational assessments for university-level courses.

      ### Task
      You will receive a Course Name and its finalized Modules (each with title and description).
      Your task is to generate a **quiz with 10 diverse questions** that test understanding of key concepts, examples, and practical applications from the modules.

      ### Input
      Course Name: ${data?.courseName}
      Modules Data: ${JSON.stringify(data?.modules)}

      ### Rules
      1. Output **only valid JSON** — no markdown, no commentary.
      2. Return an array of exactly **10 question objects**.
      3. Cover different modules evenly — not all questions from one topic.
      4. Each question must be clear, conceptual, and have only **one correct answer**.
      5. Each question object must follow this schema:

      {
        "question": "string",
        "options": ["string", "string", "string", "string"], // 4 unique options
        "answer": {correctOptionNumber : number, answer : "string"} // one from the options
      }

      6. Avoid vague or opinion-based questions. Focus on factual or conceptual understanding.
      7. If the module data lacks enough context, infer from general domain knowledge.

      ### Output
      Return only a **JSON array of 10 question objects**, following the schema above.
      `,
    };
  }
};
