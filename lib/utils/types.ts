export interface BuildCourseRequestType {
  userPrompt: string;
  data: any;
  stage: number;
}
export interface ResponseObject {
  status: string;
  data: any;
}
enum CourseStatusEnum {
  "COMPLETED",
  "DRAFT",
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  image?: string;
  about?: string;
  organization?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ModuleData {
  courseId: string;
  moduleId: string;
  title: string;
  description?: string;
  referenceVideo?: string;
  referenceSite?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseData {
  courseId: string;
  userId: string;
  courseName: string;
  modules: ModuleData[];
  quiz?: QuizData;
  status?: CourseStatusEnum;
  forkedFromId: string;
  forks?: CourseData[];
  _count: {
    forks: number;
  };
  stars?: number;
  references?: string[];
  createdAt: Date;
  updatedAt: Date;
  user: UserData;
}

export interface QuizData {
  quizId: string;
  courseId: string;
  questions: Question[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Question {
  questionId: string;
  quizId: string;
  question: string;
  options: string[];
  answer: string;
  correctOptionNumber: number;
  createdAt: Date;
  updatedAt: Date;
}
