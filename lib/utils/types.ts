export interface BuildCourseRequestType {
  userPrompt: string;
  data: any;
  stage: number;
}

export interface ModuleData {
  courseId: string;
  moduleId: string;
  title: string;
  description?: string;
  referenceVideo?: string;
  referenceSite?: string;
  createdAt?: Date;
}
export interface ResponseObject {
  status: string;
  data: any;
}

enum CourseStatusEnum {
  "COMPLETED",
  "DRAFT",
}

export interface CourseData {
  courseName: string;
  courseId: string;
  references: string[];
  status: CourseStatusEnum;
  createdAt: Date;
  updatedAt: Date;
  modules: ModuleData[];
}


export interface QuizData {
  courseId: string;
  questions: Question[];
  createdAt: Date;
  quizId: string;
  tags: string[];
}

export interface Question {
  createdAt: Date;
  question: string;
  quizId: string;
  questionId: string;
  options: string[];
  answer: string;
  correctOptionNumber: number;
}
