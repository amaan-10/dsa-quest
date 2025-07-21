"use client";
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
  Sword,
  TreePine,
  Network,
  Hash,
  Layers,
  Brain,
} from "lucide-react";
import { notFound, useParams } from "next/navigation";

// Complete level data configuration
const LEVEL_DATA = {
  "arrays-of-ashoka": {
    title: "Array of Ashoka",
    slug: "arrays-of-ashoka",
    difficulty: "Beginner",
    description:
      "Master array operations through interactive puzzles and challenges. Learn how to manipulate arrays efficiently and understand their fundamental properties.",
    concepts: ["Array Traversal", "Searching", "Basic Sorting", "Two Pointers"],
    completionRate: 78,
    averageTime: "45 minutes",
    rating: 4.8,
    players: 12543,
    imagePath: "/images/array.png",
    icon: Layers,
    color: "from-emerald-500 to-teal-600",
    objectives: [
      "Understand array indexing and access patterns",
      "Implement basic array traversal algorithms",
      "Master searching techniques in arrays",
      "Learn basic sorting algorithms for arrays",
      "Practice two-pointer technique",
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
    bossSlug: "array-guardian",
  },
  "linked-lists-of-chandragupta": {
    title: "Linked Lists of Chandragupta",
    slug: "linked-lists-of-chandragupta",
    difficulty: "Intermediate",
    description:
      "Navigate the maze of linked lists, solving puzzles that test your understanding of pointer manipulation and dynamic data structures.",
    concepts: [
      "Singly Linked Lists",
      "Doubly Linked Lists",
      "List Operations",
      "Pointer Manipulation",
    ],
    completionRate: 65,
    averageTime: "1 hour",
    rating: 4.6,
    players: 8765,
    imagePath: "/images/linked-list.png",
    icon: Network,
    color: "from-blue-500 to-indigo-600",
    objectives: [
      "Master linked list node creation and manipulation",
      "Implement insertion and deletion operations",
      "Understand pointer arithmetic and references",
      "Learn to reverse and merge linked lists",
      "Handle edge cases and null pointers",
    ],
    prerequisites: [
      "Array Valley completion",
      "Understanding of pointers/references",
    ],
    challenges: [
      {
        title: "Node Navigator",
        description:
          "Traverse through linked lists and understand node connections.",
        difficulty: "Easy",
        xp: 120,
      },
      {
        title: "List Manipulator",
        description:
          "Insert, delete, and modify nodes in various linked list structures.",
        difficulty: "Medium",
        xp: 250,
      },
      {
        title: "Reverse Engineer",
        description:
          "Reverse linked lists and handle complex pointer operations.",
        difficulty: "Hard",
        xp: 300,
      },
      {
        title: "Labyrinth Guardian",
        description: "Face the Linked List Guardian in an epic coding battle.",
        difficulty: "Boss",
        xp: 600,
      },
    ],
    bossSlug: "linked-list-guardian",
  },
  "tree-of-bodhi": {
    title: "Tree of Bodhi",
    slug: "tree-of-bodhi",
    difficulty: "Advanced",
    description:
      "Climb the tree of knowledge, mastering tree data structures and their algorithms. Explore binary trees, BSTs, and advanced tree operations.",
    concepts: [
      "Binary Trees",
      "Binary Search Trees",
      "Tree Traversal",
      "Tree Balancing",
    ],
    completionRate: 52,
    averageTime: "1.5 hours",
    rating: 4.9,
    players: 6543,
    imagePath: "/images/tree.png",
    icon: TreePine,
    color: "from-green-500 to-emerald-600",
    objectives: [
      "Understand tree structure and terminology",
      "Master all tree traversal methods",
      "Implement binary search tree operations",
      "Learn tree balancing techniques",
      "Solve complex tree-based problems",
    ],
    prerequisites: [
      "Linked List Labyrinth completion",
      "Recursion understanding",
    ],
    challenges: [
      {
        title: "Tree Climber",
        description: "Learn to navigate and traverse different types of trees.",
        difficulty: "Medium",
        xp: 200,
      },
      {
        title: "BST Master",
        description: "Master binary search tree operations and properties.",
        difficulty: "Hard",
        xp: 350,
      },
      {
        title: "Balance Keeper",
        description: "Implement self-balancing tree algorithms.",
        difficulty: "Expert",
        xp: 400,
      },
      {
        title: "Ancient Tree Spirit",
        description:
          "Challenge the Ancient Tree Spirit in the ultimate tree battle.",
        difficulty: "Boss",
        xp: 750,
      },
    ],
    bossSlug: "tree-spirit",
  },
  "trade-routes-of-silk-road": {
    title: "Trade Routes of the Silk Road",
    slug: "trade-routes-of-silk-road",
    difficulty: "Expert",
    description:
      "Explore the vast network of trade routes, solving complex problems across different regions. Master graph algorithms and traversal techniques.",
    concepts: [
      "Graph Representation",
      "BFS & DFS",
      "Shortest Paths",
      "Minimum Spanning Trees",
    ],
    completionRate: 38,
    averageTime: "2 hours",
    rating: 4.7,
    players: 4321,
    imagePath: "/images/graph.png",
    icon: Network,
    color: "from-purple-500 to-pink-600",
    objectives: [
      "Master graph representation techniques",
      "Implement BFS and DFS algorithms",
      "Solve shortest path problems",
      "Understand minimum spanning trees",
      "Apply graph algorithms to real-world problems",
    ],
    prerequisites: [
      "Tree of Knowledge completion",
      "Advanced algorithm knowledge",
    ],
    challenges: [
      {
        title: "Graph Explorer",
        description:
          "Navigate through different graph structures and representations.",
        difficulty: "Hard",
        xp: 300,
      },
      {
        title: "Path Finder",
        description: "Implement shortest path algorithms across the galaxy.",
        difficulty: "Expert",
        xp: 450,
      },
      {
        title: "Network Architect",
        description: "Build minimum spanning trees and optimize networks.",
        difficulty: "Master",
        xp: 500,
      },
      {
        title: "Cosmic Entity",
        description:
          "Face the Cosmic Entity in the most challenging graph battle.",
        difficulty: "Legendary",
        xp: 1000,
      },
    ],
    bossSlug: "cosmic-entity",
  },
  "sorting-ashram": {
    title: "Sorting Ashram",
    slug: "sorting-ashram",
    difficulty: "Beginner",
    description:
      "Learn and master various sorting algorithms in this peaceful sanctuary. Understand time complexity and algorithm efficiency.",
    concepts: [
      "Bubble Sort",
      "Selection Sort",
      "Merge Sort",
      "Quick Sort",
      "Time Complexity",
    ],
    completionRate: 82,
    averageTime: "50 minutes",
    rating: 4.5,
    players: 15678,
    imagePath: "/images/sorting.png",
    icon: Layers,
    color: "from-orange-500 to-red-600",
    objectives: [
      "Understand different sorting algorithms",
      "Compare time and space complexity",
      "Implement efficient sorting techniques",
      "Visualize sorting processes",
      "Choose appropriate sorting algorithms",
    ],
    prerequisites: ["Array Valley completion"],
    challenges: [
      {
        title: "Sort Apprentice",
        description:
          "Learn basic sorting algorithms and their implementations.",
        difficulty: "Easy",
        xp: 100,
      },
      {
        title: "Efficiency Expert",
        description:
          "Master advanced sorting algorithms and optimize performance.",
        difficulty: "Medium",
        xp: 200,
      },
      {
        title: "Speed Demon",
        description:
          "Implement the fastest sorting algorithms under time pressure.",
        difficulty: "Hard",
        xp: 300,
      },
      {
        title: "Sorting Sage",
        description:
          "Challenge the Sorting Sage in an algorithm efficiency battle.",
        difficulty: "Boss",
        xp: 550,
      },
    ],
    bossSlug: "sorting-sage",
  },
  "hash-palace-of-pataliputra": {
    title: "Hash Palace of Pataliputra",
    slug: "hash-palace-of-pataliputra",
    difficulty: "Intermediate",
    description:
      "Explore the kingdom of hashing and discover efficient data retrieval techniques. Master hash tables and collision resolution.",
    concepts: [
      "Hash Functions",
      "Hash Tables",
      "Collision Resolution",
      "Load Factor",
    ],
    completionRate: 58,
    averageTime: "1.2 hours",
    rating: 4.4,
    players: 7890,
    imagePath: "/images/hash.png",
    icon: Hash,
    color: "from-yellow-500 to-orange-600",
    objectives: [
      "Understand hash function design",
      "Implement hash table operations",
      "Master collision resolution techniques",
      "Optimize hash table performance",
      "Apply hashing to real-world problems",
    ],
    prerequisites: ["Array Valley completion", "Basic mathematics"],
    challenges: [
      {
        title: "Hash Novice",
        description: "Learn the basics of hash functions and hash tables.",
        difficulty: "Easy",
        xp: 120,
      },
      {
        title: "Collision Handler",
        description: "Master different collision resolution strategies.",
        difficulty: "Medium",
        xp: 240,
      },
      {
        title: "Performance Optimizer",
        description: "Optimize hash table performance and handle edge cases.",
        difficulty: "Hard",
        xp: 320,
      },
      {
        title: "Hash Monarch",
        description: "Challenge the Hash Monarch in the royal coding duel.",
        difficulty: "Boss",
        xp: 650,
      },
    ],
    bossSlug: "hash-monarch",
  },
  "scroll-stambh-stacks-queues": {
    title: "Scroll Stambh: Stacks & Queues",
    slug: "scroll-stambh-stacks-queues",
    difficulty: "Beginner",
    description:
      "Master the fundamentals of stacks and queues in this medieval castle. Learn LIFO and FIFO principles.",
    concepts: [
      "Stack Operations",
      "Queue Operations",
      "LIFO & FIFO",
      "Applications",
    ],
    completionRate: 75,
    averageTime: "40 minutes",
    rating: 4.3,
    players: 11234,
    imagePath: "/images/stack-queue.png",
    icon: Layers,
    color: "from-gray-500 to-slate-600",
    objectives: [
      "Understand stack and queue principles",
      "Implement basic operations",
      "Learn practical applications",
      "Solve problems using stacks and queues",
      "Compare different implementations",
    ],
    prerequisites: ["Basic programming knowledge"],
    challenges: [
      {
        title: "Castle Guard",
        description: "Learn basic stack and queue operations.",
        difficulty: "Easy",
        xp: 80,
      },
      {
        title: "Tower Keeper",
        description: "Implement advanced stack and queue applications.",
        difficulty: "Medium",
        xp: 160,
      },
      {
        title: "Royal Engineer",
        description: "Design efficient stack and queue systems.",
        difficulty: "Hard",
        xp: 240,
      },
      {
        title: "Castle Lord",
        description:
          "Face the Castle Lord in the ultimate LIFO/FIFO challenge.",
        difficulty: "Boss",
        xp: 480,
      },
    ],
    bossSlug: "castle-lord",
  },
  "dynamic-programming-darbar": {
    title: "Dynamic Programming Darbar",
    slug: "dynamic-programming-darbar",
    difficulty: "Master",
    description:
      "Delve into the darbar of dynamic programming, where each room presents a unique optimization challenge.",
    concepts: [
      "Memoization",
      "Tabulation",
      "Optimal Substructure",
      "Overlapping Subproblems",
    ],
    completionRate: 25,
    averageTime: "3 hours",
    rating: 4.9,
    players: 2156,
    imagePath: "/images/dp.png",
    icon: Brain,
    color: "from-indigo-500 to-purple-600",
    objectives: [
      "Master dynamic programming principles",
      "Identify optimal substructure",
      "Implement memoization techniques",
      "Solve complex optimization problems",
      "Apply DP to various problem domains",
    ],
    prerequisites: ["All previous levels", "Advanced problem-solving skills"],
    challenges: [
      {
        title: "Dungeon Crawler",
        description: "Learn basic dynamic programming concepts.",
        difficulty: "Hard",
        xp: 400,
      },
      {
        title: "Optimization Wizard",
        description: "Master advanced DP techniques and optimizations.",
        difficulty: "Expert",
        xp: 600,
      },
      {
        title: "Problem Solver",
        description: "Solve the most challenging DP problems.",
        difficulty: "Master",
        xp: 800,
      },
      {
        title: "Dungeon Master",
        description:
          "Face the ultimate DP challenge against the Dungeon Master.",
        difficulty: "Legendary",
        xp: 1200,
      },
    ],
    bossSlug: "dungeon-master",
  },
  "algorithm-akharas": {
    title: "Algorithm Akharas",
    slug: "algorithm-akharas",
    difficulty: "Legendary",
    description:
      "Train in the akharas of algorithms, mastering complex problem-solving techniques.",
    concepts: [
      "Greedy Algorithms",
      "Divide and Conquer",
      "Backtracking",
      "Graph Algorithms",
    ],
    completionRate: 15,
    averageTime: "4 hours",
    rating: 5.0,
    players: 1234,
    imagePath: "/public/images/algorithm.png",
    icon: Sword,
    color: "from-red-500 to-pink-600",
    objectives: [
      "Master greedy algorithm techniques",
      "Implement divide and conquer strategies",
      "Solve backtracking problems",
      "Apply graph algorithms effectively",
      "Optimize algorithm performance",
    ],
    prerequisites: ["Dynamic Programming Darbar completion"],
    challenges: [
      {
        title: "Akharas Apprentice",
        description:
          "Learn the basics of greedy algorithms and their applications.",
        difficulty: "Easy",
        xp: 150,
      },
      {
        title: "Conqueror's Path",
        description:
          "Master divide and conquer techniques through challenging problems.",
        difficulty: "Medium",
        xp: 300,
      },
      {
        title: "Backtracking Battle",
        description:
          "Solve complex backtracking problems with optimal solutions.",
        difficulty: "Hard",
        xp: 450,
      },
      {
        title: "Algorithm Champion",
        description:
          "Face the Algorithm Champion in the ultimate coding showdown.",
        difficulty: "Boss",
        xp: 900,
      },
    ],
    bossSlug: "algorithm-champion",
  },
};

export default function LevelDetailPage() {
  const params = useParams();

  // Get level data or return 404
  const level = LEVEL_DATA[params.slug as keyof typeof LEVEL_DATA];

  if (!level) {
    notFound();
  }

  const IconComponent = level.icon;
  const difficultyColor =
    {
      Beginner: "bg-green-500",
      Intermediate: "bg-yellow-500",
      Advanced: "bg-orange-500",
      Expert: "bg-red-500",
      Master: "bg-purple-500",
    }[level.difficulty] || "bg-gray-500";

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="relative h-[450px] md:h-[400px]">
          <div
            className={`absolute inset-0 bg-gradient-to-r ${level.color} opacity-90`}
          ></div>
          <Image
            src={level.imagePath || "/images/default-level.png"}
            alt={level.title}
            width={1024}
            height={1024}
            className="h-40 w-40 absolute top-[25%] left-[4%] transform  object-cover animate-float"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="px-4 md:px-8">
              <Link
                href="/levels"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-white mb-2"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Levels
              </Link>

              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black">
                  {level.title}
                </h1>
              </div>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <Badge className={`${difficultyColor} text-white`}>
                  {level.difficulty}
                </Badge>
                {level.concepts.map((concept, index) => (
                  <Badge key={index} variant="outline">
                    {concept}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 md:px-8 py-8">
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
                                      : challenge.difficulty === "Hard"
                                      ? "bg-red-500"
                                      : challenge.difficulty === "Boss"
                                      ? "bg-purple-500"
                                      : challenge.difficulty === "Expert"
                                      ? "bg-orange-500"
                                      : challenge.difficulty === "Master"
                                      ? "bg-indigo-500"
                                      : "bg-pink-500"
                                  }
                                  variant="secondary"
                                >
                                  {challenge.difficulty}
                                </Badge>
                              </div>
                              <p className="text-muted-foreground mb-4">
                                {challenge.description}
                              </p>
                              <div className="flex gap-2">
                                {challenge.difficulty === "Boss" ||
                                challenge.difficulty === "Legendary" ? (
                                  <Link href={`/boss-battle/${level.bossSlug}`}>
                                    <Button
                                      size="sm"
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      <Sword className="mr-2 h-4 w-4" />
                                      Boss Battle
                                    </Button>
                                  </Link>
                                ) : (
                                  <Link href={`/level/${level.slug}/play`}>
                                    <Button size="sm">Start Challenge</Button>
                                  </Link>
                                )}
                              </div>
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
                              {level.title} Fundamentals
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              A comprehensive guide to{" "}
                              {level.concepts.join(", ").toLowerCase()}.
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
                              Implementation Examples
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              Code examples and implementations for this level.
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
                              Visual explanation of concepts and challenges.
                            </p>
                            <Button variant="outline" size="sm">
                              Watch Video
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-start">
                          <IconComponent className="h-8 w-8 text-primary mr-4" />
                          <div>
                            <h3 className="text-lg font-bold mb-1">
                              Interactive Visualizer
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              Practice with our interactive visualizer tool.
                            </p>
                            <Link href={`/level/${level.slug}/play`}>
                              <Button variant="outline" size="sm">
                                Open Visualizer
                              </Button>
                            </Link>
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
                      <div className="flex items-center">
                        <Trophy className="h-5 w-5 text-muted-foreground mr-2" />
                        <div>
                          <div className="text-sm text-muted-foreground">
                            Challenges
                          </div>
                          <div className="font-medium">
                            {level.challenges.length}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <IconComponent className="h-16 w-16 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-4">Ready to Begin?</h3>
                  <p className="text-muted-foreground mb-6">
                    Start your journey through {level.title} and master{" "}
                    {level.concepts.join(", ").toLowerCase()}.
                  </p>
                  <Link href={`/level/${level.slug}/play`} className="w-full">
                    <Button size="lg" className="w-full">
                      <Play className="mr-2 h-5 w-5" />
                      Start Level
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Related Levels</h3>
                  <div className="space-y-4">
                    {Object.values(LEVEL_DATA)
                      .filter((l) => l.slug !== level.slug)
                      .slice(0, 3)
                      .map((relatedLevel) => {
                        const RelatedIcon = relatedLevel.icon;
                        return (
                          <Link
                            key={relatedLevel.slug}
                            href={`/level/${relatedLevel.slug}`}
                          >
                            <div className="flex items-center hover:bg-muted/50 p-2 rounded-md transition-colors">
                              <div className="w-16 h-16 rounded-md overflow-hidden mr-4 flex-shrink-0 bg-gradient-to-r from-muted to-muted-foreground/20 flex items-center justify-center">
                                <RelatedIcon className="h-8 w-8 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-medium">
                                  {relatedLevel.title}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {relatedLevel.difficulty}
                                </p>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
