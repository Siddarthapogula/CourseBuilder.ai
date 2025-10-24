export interface BuildCourseRequestType {
  userPrompt: string;
  data: any;
  stage: number;
}

export interface ModuleData {
  moduleTitle: string;
  description: string;
  referenceVideo: string;
  referenceSite: string;
}

export interface QuizData {
  question: string;
  options: string[];
  answer: { optionNumber: number; answer: string };
}
