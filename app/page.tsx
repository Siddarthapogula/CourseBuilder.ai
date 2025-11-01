import { Button } from "@/components/ui/button";
import { Briefcase, GraduationCap, Laptop, Layers } from "lucide-react";
import Link from "next/link";

const HowItWorksData = [
  {
    title: "1. Start with a Prompt",
    data: "Enter a simple prompt, like 'a 10-module course on Digital Marketing for beginners,' and select your domain (e.g., Marketing, CS).",
  },
  {
    title: "2. Validate & Refine",
    data: "Our AI instantly generates your course outline. You have full control to edit, delete, or add module titles before generating the full content.",
  },
  {
    title: "3. Generate & Export",
    data: "With one click, AI expands your outline into detailed lessons, finds reference materials, and even builds a 10-question quiz.",
  },
];

const Features = [
  {
    title: "AI-Powered Content",
    data: "Generate high-quality, structured module descriptions, examples, and reference links (YouTube videos, articles) in seconds.",
  },
  {
    title: "Automated Quiz Generation",
    data: "Automatically create a relevant 10-question quiz for your course, complete with multiple-choice options and correct answers.",
  },
  {
    title: "Domain-Aware",
    data: "Our AI understands the context, whether you're building a course for Computer Science, Marketing, or History.",
  },
];

const audienceData = [
  {
    icon: <GraduationCap className="h-6 w-6 text-primary" />,
    title: "Professors & Lecturers",
    description:
      "Quickly build a new curriculum or generate supplementary materials for your existing university courses.",
  },
  {
    icon: <Briefcase className="h-6 w-6 text-primary" />,
    title: "Corporate Trainers",
    description:
      "Create engaging and structured training modules for employee onboarding, skill-upskilling, and internal workshops.",
  },
  {
    icon: <Laptop className="h-6 w-6 text-primary" />,
    title: "Online Tutors",
    description:
      "Design a complete lesson plan, from outline to quiz, to provide a professional and structured experience for your clients.",
  },
];
export default function Home() {
  return (
    <div className="mt-24 p-4">
      {/* first section */}
      <main className="space-y-24 my-12">
        <section className=" container mx-auto flex min-h-[calc(100vh-10rem)] max-w-4xl flex-col items-center justify-center space-y-8 text-center">
          <div>
            <h1 className=" text-5xl font-medium tracking-tighter md:text-6xl  ">
              Go from a single prompt to a complete course in minutes.
            </h1>
          </div>
          <div>
            <h3 className=" max-w-2xl text-lg text-muted-foreground md:text-xl  ">
              Stop battling with slides and outlines. Just describe your course,
              and let our AI generate structured modules, detailed content, and
              quizzes for you."
            </h3>
          </div>
          <div>
            <Button className="p-6 text-lg">
              <Link href={"/course"}>Start Building Your Course</Link>
            </Button>
          </div>
        </section>
        {/* how it works section */}
        <section
          id="how-it-works"
          className=" scroll-mt-24  container mx-auto flex flex-col items-center space-y-12 text-center"
        >
          <div className="flex flex-col space-y-3">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight">
              How It Works?
            </h2>
            <p className="text-lg text-muted-foreground md:text-xl">
              Create a course in 3 simple steps.
            </p>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full">
            {HowItWorksData.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-3 p-6 border border-border/40 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors duration-300"
              >
                <h3 className="text-xl font-medium">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-base max-w-sm">
                  {item.data}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section></section>

        {/* For Whom section */}
        <section className="container mx-auto flex flex-col items-center gap-14 px-6 text-center">
          {/* Section Header */}
          <div className="space-y-4 max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight">
              Built for Educators, by Design
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              Create structured educational content effortlessly with a platform
              designed to empower instructors, tutors, and course creators.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full">
            {audienceData.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-3 p-6 border border-border/40 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors duration-300"
              >
                <div className="mb-2 flex justify-center items-center text-primary translate-y-[1px]">
                  {item.icon}
                </div>
                <h3 className="text-xl font-medium">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-base max-w-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Features section */}
        <section
          id="features"
          className=" scroll-mt-24 container mx-auto flex flex-col items-center gap-14 px-6 text-center"
        >
          <div className="space-y-3">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight">
              Features
            </h2>
          </div>

          {/* Features Grid */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full">
            {Features.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-3 p-6 border border-border/40 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors duration-300"
              >
                <h3 className="text-xl font-medium">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-base max-w-sm">
                  {item.data}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTa Section */}
        <section className="container mx-auto flex flex-col items-center gap-6 px-6 text-center">
          <div className=" space-y-4">
            <h2 className="text-2xl md:text-5xl font-medium tracking-tight">
              Ready to build your next course?
            </h2>
            <h3 className=" text-xl text-muted-foreground tracking-tight">
              Spend less time formatting and more time teaching.
            </h3>
          </div>
          <div>
            <Button className="p-6 text-lg">
              <Link href={"/course"}>Get Started Now</Link>
            </Button>
          </div>
        </section>
      </main>

      {/* footer and this is only for the landing page */}
      <footer className="border-t bg-background">
        <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
          {/* Brand Logo/Name */}
          <Link href="/" className="flex items-center gap-2">
            <Layers className="h-5 w-5" />
            <span className="text-lg font-medium">CourseBuilder AI</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Made for educators, to spend more time on teaching
          </p>
        </div>
      </footer>
    </div>
  );
}
