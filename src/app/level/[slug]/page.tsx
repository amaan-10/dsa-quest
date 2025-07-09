/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Trophy,
  Clock,
  Star,
  Users,
  BookOpen,
  Code,
  Play,
  Boxes,
} from "lucide-react";

export default function LevelDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  // This would normally be fetched from a database based on the slug
  const level = {
    title: "Array Valley",
    slug: "array-valley",
    difficulty: "Beginner",
    description:
      "Master array operations through interactive puzzles and challenges. Learn how to manipulate arrays efficiently and understand their fundamental properties.",
    concepts: ["Array Traversal", "Searching", "Basic Sorting"],
    completionRate: 78,
    averageTime: "45 minutes",
    rating: 4.8,
    players: 12543,
    imagePath: "/placeholder.svg?height=400&width=800",
    objectives: [
      "Understand array indexing and access patterns",
      "Implement basic array traversal algorithms",
      "Master searching techniques in arrays",
      "Learn basic sorting algorithms for arrays",
    ],
    prerequisites: [
      "Basic programming knowledge",
      "Understanding of variables and loops",
    ],
    challenges: [
      {
        title: "Array Explorer",
        description:
          "Navigate through an array, collecting elements in the correct order.",
        difficulty: "Easy",
        xp: 100,
      },
      {
        title: "Search and Rescue",
        description:
          "Implement linear and binary search to find hidden elements.",
        difficulty: "Medium",
        xp: 200,
      },
      {
        title: "Sort Master",
        description:
          "Sort arrays using different techniques and compare their efficiency.",
        difficulty: "Medium",
        xp: 250,
      },
      {
        title: "Array Boss Battle",
        description:
          "Combine all your array knowledge to defeat the Array Guardian.",
        difficulty: "Hard",
        xp: 500,
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Boxes className="h-6 w-6 text-primary" />
            <span>RannNeeti</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link href="/levels" className="text-sm font-medium text-primary">
              Levels
            </Link>
            <Link
              href="/leaderboard"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Leaderboard
            </Link>
            <Link
              href="/profile"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Profile
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="relative h-[300px] md:h-[400px]">
          <Image
            src={level.imagePath || "/placeholder.svg"}
            alt={level.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="container">
              <Link
                href="/levels"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Levels
              </Link>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <Badge className="bg-green-500 text-white">
                  {level.difficulty}
                </Badge>
                {level.concepts.map((concept, index) => (
                  <Badge key={index} variant="outline">
                    {concept}
                  </Badge>
                ))}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                {level.title}
              </h1>
            </div>
          </div>
        </div>

        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview">
                <TabsList className="mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="challenges">Challenges</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                  <TabsTrigger value="discussion">Discussion</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Description</h2>
                    <p className="text-muted-foreground">{level.description}</p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">
                      Learning Objectives
                    </h2>
                    <ul className="space-y-2">
                      {level.objectives.map((objective, index) => (
                        <li key={index} className="flex items-start">
                          <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-primary"></div>
                          <span>{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">Prerequisites</h2>
                    <ul className="space-y-2">
                      {level.prerequisites.map((prerequisite, index) => (
                        <li key={index} className="flex items-start">
                          <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-primary"></div>
                          <span>{prerequisite}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="challenges" className="space-y-6">
                  <h2 className="text-2xl font-bold mb-4">Level Challenges</h2>
                  <div className="grid gap-4">
                    {level.challenges.map((challenge, index) => (
                      <Card key={index} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row">
                            <div className="bg-muted p-6 md:w-1/4 flex items-center justify-center">
                              <div className="text-center">
                                <Trophy className="h-12 w-12 mx-auto text-primary mb-2" />
                                <div className="text-sm font-medium">
                                  {challenge.xp} XP
                                </div>
                              </div>
                            </div>
                            <div className="p-6 md:w-3/4">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-bold">
                                  {challenge.title}
                                </h3>
                                <Badge
                                  className={
                                    challenge.difficulty === "Easy"
                                      ? "bg-green-500"
                                      : challenge.difficulty === "Medium"
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                  }
                                  variant="secondary"
                                >
                                  {challenge.difficulty}
                                </Badge>
                              </div>
                              <p className="text-muted-foreground mb-4">
                                {challenge.description}
                              </p>
                              <Button size="sm">Start Challenge</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="resources" className="space-y-6">
                  <h2 className="text-2xl font-bold mb-4">
                    Learning Resources
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-start">
                          <BookOpen className="h-8 w-8 text-primary mr-4" />
                          <div>
                            <h3 className="text-lg font-bold mb-1">
                              Array Fundamentals
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              A comprehensive guide to array operations and
                              properties.
                            </p>
                            <Button variant="outline" size="sm">
                              Read Guide
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-start">
                          <Code className="h-8 w-8 text-primary mr-4" />
                          <div>
                            <h3 className="text-lg font-bold mb-1">
                              Array Algorithms
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              Common algorithms and techniques for working with
                              arrays.
                            </p>
                            <Button variant="outline" size="sm">
                              View Code
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-start">
                          <Play className="h-8 w-8 text-primary mr-4" />
                          <div>
                            <h3 className="text-lg font-bold mb-1">
                              Video Tutorial
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              Visual explanation of array concepts and
                              challenges.
                            </p>
                            <Button variant="outline" size="sm">
                              Watch Video
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="discussion" className="space-y-6">
                  <h2 className="text-2xl font-bold mb-4">
                    Community Discussion
                  </h2>
                  <div className="bg-muted p-8 rounded-lg text-center">
                    <h3 className="text-lg font-medium mb-2">
                      Join the conversation
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Sign in to participate in discussions about this level.
                    </p>
                    <Button>Sign In to Comment</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Level Stats</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Completion Rate</span>
                        <span className="text-sm font-medium">
                          {level.completionRate}%
                        </span>
                      </div>
                      <Progress value={level.completionRate} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-muted-foreground mr-2" />
                        <div>
                          <div className="text-sm text-muted-foreground">
                            Avg. Time
                          </div>
                          <div className="font-medium">{level.averageTime}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-muted-foreground mr-2" />
                        <div>
                          <div className="text-sm text-muted-foreground">
                            Rating
                          </div>
                          <div className="font-medium">{level.rating}/5</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-5 w-5 text-muted-foreground mr-2" />
                        <div>
                          <div className="text-sm text-muted-foreground">
                            Players
                          </div>
                          <div className="font-medium">
                            {level.players.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <h3 className="text-xl font-bold mb-4">Ready to Begin?</h3>
                  <p className="text-muted-foreground mb-6">
                    Start your journey through Array Valley and master
                    fundamental array concepts.
                  </p>
                  <Button size="lg" className="w-full">
                    Start Level
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Related Levels</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-16 h-16 rounded-md overflow-hidden mr-4 flex-shrink-0">
                        <Image
                          src="/placeholder.svg?height=64&width=64"
                          alt="Sorting Sanctuary"
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">Sorting Sanctuary</h4>
                        <p className="text-sm text-muted-foreground">
                          Master sorting algorithms
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-16 h-16 rounded-md overflow-hidden mr-4 flex-shrink-0">
                        <Image
                          src="/placeholder.svg?height=64&width=64"
                          alt="Linked List Labyrinth"
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">Linked List Labyrinth</h4>
                        <p className="text-sm text-muted-foreground">
                          Navigate linked structures
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-16 h-16 rounded-md overflow-hidden mr-4 flex-shrink-0">
                        <Image
                          src="/placeholder.svg?height=64&width=64"
                          alt="Search Strategies"
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">Search Strategies</h4>
                        <p className="text-sm text-muted-foreground">
                          Learn efficient searching
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-8 bg-muted/30">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 font-bold text-xl mb-4 md:mb-0">
              <Boxes className="h-6 w-6 text-primary" />
              <span>RannNeeti</span>
            </div>
            <nav className="flex gap-8 mb-4 md:mb-0">
              <Link
                href="/about"
                className="text-sm hover:text-primary transition-colors"
              >
                About
              </Link>
              <Link
                href="/blog"
                className="text-sm hover:text-primary transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="text-sm hover:text-primary transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/privacy"
                className="text-sm hover:text-primary transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-sm hover:text-primary transition-colors"
              >
                Terms
              </Link>
            </nav>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} RannNeeti. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
