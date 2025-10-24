-- AlterTable
ALTER TABLE "Course" ADD CONSTRAINT "Course_pkey" PRIMARY KEY ("courseId");

-- AlterTable
ALTER TABLE "Module" ADD CONSTRAINT "Module_pkey" PRIMARY KEY ("moduleId", "courseId");

-- AlterTable
ALTER TABLE "Question" ADD CONSTRAINT "Question_pkey" PRIMARY KEY ("questionId", "quizId");

-- AlterTable
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_pkey" PRIMARY KEY ("quizId", "courseId");
