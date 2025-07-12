import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Trophy,
  Target,
  Users,
  BookOpen,
  Code,
  Zap,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default function HowItWorksPage() {
  const steps = [
    {
      number: "01",
      title: "Choose Your Path",
      description:
        "Start with beginner-friendly levels or jump into advanced topics based on your experience.",
      icon: <Target className="h-8 w-8 text-primary" />,
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      number: "02",
      title: "Learn Through Play",
      description:
        "Engage with interactive visualizations and solve coding challenges in a game-like environment.",
      icon: <Play className="h-8 w-8 text-primary" />,
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      number: "03",
      title: "Practice & Master",
      description:
        "Reinforce your learning with hands-on coding exercises and real-world problem solving.",
      icon: <Code className="h-8 w-8 text-primary" />,
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      number: "04",
      title: "Track Progress",
      description:
        "Monitor your advancement with detailed analytics, achievements, and leaderboard rankings.",
      icon: <Trophy className="h-8 w-8 text-primary" />,
      image: "/placeholder.svg?height=300&width=400",
    },
  ];

  const features = [
    {
      title: "Interactive Visualizations",
      description:
        "See algorithms in action with beautiful, animated visualizations that make complex concepts easy to understand.",
      icon: <Zap className="h-6 w-6 text-primary" />,
    },
    {
      title: "Gamified Learning",
      description:
        "Earn points, unlock achievements, and compete with friends while mastering data structures and algorithms.",
      icon: <Trophy className="h-6 w-6 text-primary" />,
    },
    {
      title: "Progressive Difficulty",
      description:
        "Start with basics and gradually work your way up to advanced topics with our carefully designed learning path.",
      icon: <Target className="h-6 w-6 text-primary" />,
    },
    {
      title: "Community Support",
      description:
        "Join a vibrant community of learners, share solutions, and get help when you need it.",
      icon: <Users className="h-6 w-6 text-primary" />,
    },
    {
      title: "Comprehensive Content",
      description:
        "Cover all major data structures and algorithms with in-depth explanations and practical examples.",
      icon: <BookOpen className="h-6 w-6 text-primary" />,
    },
    {
      title: "Real-time Feedback",
      description:
        "Get instant feedback on your solutions and learn from mistakes with detailed explanations.",
      icon: <CheckCircle className="h-6 w-6 text-primary" />,
    },
  ];

  const learningPath = [
    {
      title: "Arrays & Strings",
      topics: ["Array Operations", "String Manipulation", "Two Pointers"],
      difficulty: "Beginner",
    },
    {
      title: "Linked Lists",
      topics: ["Singly Linked Lists", "Doubly Linked Lists", "Circular Lists"],
      difficulty: "Beginner",
    },
    {
      title: "Stacks & Queues",
      topics: ["Stack Operations", "Queue Operations", "Priority Queues"],
      difficulty: "Beginner",
    },
    {
      title: "Trees",
      topics: ["Binary Trees", "BST", "Tree Traversals", "Balanced Trees"],
      difficulty: "Intermediate",
    },
    {
      title: "Graphs",
      topics: ["Graph Representation", "BFS/DFS", "Shortest Path", "MST"],
      difficulty: "Intermediate",
    },
    {
      title: "Sorting & Searching",
      topics: ["Comparison Sorts", "Non-comparison Sorts", "Binary Search"],
      difficulty: "Intermediate",
    },
    {
      title: "Dynamic Programming",
      topics: ["Memoization", "Tabulation", "Optimization Problems"],
      difficulty: "Advanced",
    },
    {
      title: "Advanced Topics",
      topics: ["Segment Trees", "Trie", "Union Find", "Advanced Graphs"],
      difficulty: "Expert",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-background to-muted/50">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                How <span className="text-primary">RannNeeti</span> Works
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Discover how our innovative platform transforms algorithm
                learning into an engaging, interactive experience that makes
                complex concepts easy to understand.
              </p>
              <Link href="/register">
                <Button size="lg">
                  Start Your Journey <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Your Learning Journey</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Follow these simple steps to master data structures and
                algorithms through our gamified platform.
              </p>
            </div>

            <div className="space-y-20">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } items-center gap-12`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-bold">
                          {step.number}
                        </span>
                      </div>
                      {step.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                    <p className="text-lg text-muted-foreground mb-6">
                      {step.description}
                    </p>
                    <Button variant="outline">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex-1">
                    <Image
                      src={step.image || "/placeholder.svg"}
                      alt={step.title}
                      width={400}
                      height={300}
                      className="rounded-lg shadow-lg"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Why Choose RannNeeti?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our platform combines the best of education technology with
                proven learning methodologies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">{feature.icon}</div>
                      <div>
                        <h3 className="text-lg font-bold mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Learning Path Section */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                Structured Learning Path
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our curriculum is carefully designed to build your knowledge
                progressively, from fundamental concepts to advanced algorithms.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {learningPath.map((path, index) => (
                <Card key={index} className="relative">
                  <CardContent className="pt-6">
                    <div className="absolute top-4 right-4">
                      <Badge
                        variant={
                          path.difficulty === "Beginner"
                            ? "default"
                            : path.difficulty === "Intermediate"
                            ? "secondary"
                            : path.difficulty === "Advanced"
                            ? "destructive"
                            : "outline"
                        }
                      >
                        {path.difficulty}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-bold mb-3">{path.title}</h3>
                    <ul className="space-y-2">
                      {path.topics.map((topic, topicIndex) => (
                        <li
                          key={topicIndex}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <CheckCircle className="h-3 w-3 text-primary" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">See It In Action</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Watch how our interactive visualizations make complex algorithms
                easy to understand.
              </p>

              <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl">
                <div className="aspect-video flex items-center justify-center">
                  <Button
                    size="lg"
                    className="bg-white text-black hover:bg-gray-100"
                  >
                    <Play className="mr-2 h-6 w-6" />
                    Watch Demo Video
                  </Button>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/demo">
                  <Button size="lg" variant="outline">
                    Try Interactive Demo
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="lg">Start Learning Now</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Master Algorithms?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of students and professionals who have
                transformed their understanding of data structures and
                algorithms with RannNeeti.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button size="lg">Get Started Free</Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline">
                    Have Questions?
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
