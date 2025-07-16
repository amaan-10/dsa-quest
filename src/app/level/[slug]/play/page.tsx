"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Trophy,
  Code,
  BookOpen,
  Play,
  RotateCcw,
  Target,
  Clock,
  Star,
} from "lucide-react";
import { ArrayChallenge } from "@/components/game-engine/array-challenge";
import { LinkedListChallenge } from "@/components/game-engine/linked-list-challenge";
import { SortingVisualizer } from "@/components/game-engine/sorting-visualizer";
import { TreeVisualizer } from "@/components/game-engine/tree-visualizer";
import { GraphVisualizer } from "@/components/game-engine/graph-visualizer";
import { HashTableVisualizer } from "@/components/game-engine/hash-table-visualizer";
import { StackQueueVisualizer } from "@/components/game-engine/stack-queue-visualizer";
import { DPChallenge } from "@/components/game-engine/dp-challenge";
import { useToast } from "@/hooks/use-toast";

// Complete level data configuration
const levelData = {
  "arrays-of-ashoka": {
    title: "Arrays of Ashoka",
    slug: "arrays-of-ashoka",
    difficulty: "Beginner",
    description:
      "Master array operations through interactive puzzles and challenges.",
    longDescription:
      "Welcome to Array of Ashoka, where you'll learn the fundamentals of arrays - one of the most basic yet powerful data structures. Navigate through various challenges that will teach you array manipulation, searching, and optimization techniques.",
    type: "array",
    estimatedTime: "45 minutes",
    challenges: [
      {
        name: "Array Basics",
        difficulty: "Easy",
        points: 50,
        completed: false,
      },
      {
        name: "Linear Search",
        difficulty: "Easy",
        points: 75,
        completed: false,
      },
      {
        name: "Binary Search",
        difficulty: "Medium",
        points: 100,
        completed: false,
      },
      {
        name: "Array Rotation",
        difficulty: "Medium",
        points: 125,
        completed: false,
      },
    ],
    totalPoints: 350,
    icon: "📊",
    color: "bg-blue-500",
  },
  "linked-lists-of-chandragupta": {
    title: "Linked List of Chandragupta",
    slug: "linked-lists-of-chandragupta",
    difficulty: "Intermediate",
    description:
      "Navigate the Linked List of Chandragupta, solving puzzles that test your understanding.",
    longDescription:
      "Enter the Linked List of Chandragupta, a complex maze where each path represents a different linked list operation. Master the art of dynamic memory allocation and pointer manipulation.",
    type: "linkedlist",
    estimatedTime: "60 minutes",
    challenges: [
      {
        name: "Node Creation",
        difficulty: "Easy",
        points: 60,
        completed: false,
      },
      {
        name: "List Traversal",
        difficulty: "Medium",
        points: 80,
        completed: false,
      },
      {
        name: "Insertion Operations",
        difficulty: "Medium",
        points: 100,
        completed: false,
      },
      {
        name: "Cycle Detection",
        difficulty: "Hard",
        points: 150,
        completed: false,
      },
    ],
    totalPoints: 390,
    icon: "🔗",
    color: "bg-green-500",
  },
  "tree-of-bodhi": {
    title: "Tree of Bodhi",
    slug: "tree-of-bodhi",
    difficulty: "Advanced",
    description:
      "Climb the Tree of Bodhi, mastering tree data structures along the way.",
    longDescription:
      "Ascend the mystical Tree of Bodhi, where each branch represents a different aspect of tree data structures. Learn traversal methods, balancing techniques, and search optimizations.",
    type: "tree",
    estimatedTime: "75 minutes",
    challenges: [
      {
        name: "Tree Traversal",
        difficulty: "Medium",
        points: 90,
        completed: false,
      },
      {
        name: "BST Operations",
        difficulty: "Medium",
        points: 110,
        completed: false,
      },
      {
        name: "Tree Balancing",
        difficulty: "Hard",
        points: 140,
        completed: false,
      },
      {
        name: "Path Finding",
        difficulty: "Hard",
        points: 160,
        completed: false,
      },
    ],
    totalPoints: 500,
    icon: "🌳",
    color: "bg-emerald-500",
  },
  "trade-routes-of-silk-road": {
    title: "Trade Routes of the Silk Road",
    slug: "trade-routes-of-silk-road",
    difficulty: "Expert",
    description:
      "Explore the vast trade routes of the Silk Road, solving complex problems across different planets.",
    longDescription:
      "Journey through the Trade Routes of the Silk Road, where each stop represents a different graph algorithm. Master the complexities of vertices, edges, and pathfinding in this cosmic adventure.",
    type: "graph",
    estimatedTime: "90 minutes",
    challenges: [
      {
        name: "Graph Representation",
        difficulty: "Medium",
        points: 100,
        completed: false,
      },
      { name: "DFS & BFS", difficulty: "Hard", points: 130, completed: false },
      {
        name: "Shortest Path",
        difficulty: "Hard",
        points: 150,
        completed: false,
      },
      {
        name: "Minimum Spanning Tree",
        difficulty: "Expert",
        points: 200,
        completed: false,
      },
    ],
    totalPoints: 580,
    icon: "🌌",
    color: "bg-purple-500",
  },
  "sorting-ashram": {
    title: "Sorting Ashram",
    slug: "sorting-ashram",
    difficulty: "Beginner",
    description:
      "Learn and master various sorting algorithms in this peaceful ashram.",
    longDescription:
      "Find peace in the Sorting Ashram, where chaos transforms into order. Master the fundamental sorting algorithms that form the backbone of computer science.",
    type: "sorting",
    estimatedTime: "50 minutes",
    challenges: [
      { name: "Bubble Sort", difficulty: "Easy", points: 40, completed: false },
      {
        name: "Selection Sort",
        difficulty: "Easy",
        points: 50,
        completed: false,
      },
      {
        name: "Merge Sort",
        difficulty: "Medium",
        points: 90,
        completed: false,
      },
      {
        name: "Quick Sort",
        difficulty: "Medium",
        points: 110,
        completed: false,
      },
    ],
    totalPoints: 290,
    icon: "🔄",
    color: "bg-orange-500",
  },
  "hash-palace-of-pataliputra": {
    title: "Hash Palace of Pataliputra",
    slug: "hash-palace-of-pataliputra",
    difficulty: "Intermediate",
    description:
      "Explore the palace of hashing and discover efficient data retrieval techniques.",
    longDescription:
      "Rule the Hash Palace of Pataliputra, where efficient data storage and retrieval reign supreme. Master hash functions, collision resolution, and the art of constant-time operations.",
    type: "hashtable",
    estimatedTime: "65 minutes",
    challenges: [
      {
        name: "Hash Functions",
        difficulty: "Medium",
        points: 80,
        completed: false,
      },
      {
        name: "Collision Handling",
        difficulty: "Medium",
        points: 100,
        completed: false,
      },
      {
        name: "Hash Table Implementation",
        difficulty: "Hard",
        points: 120,
        completed: false,
      },
      {
        name: "Performance Optimization",
        difficulty: "Hard",
        points: 140,
        completed: false,
      },
    ],
    totalPoints: 440,
    icon: "🏰",
    color: "bg-yellow-500",
  },
  "scroll-stambh-stacks-queues": {
    title: "Scroll Stambh: Stacks & Queues",
    slug: "scroll-stambh-stacks-queues",
    difficulty: "Beginner",
    description:
      "Master the fundamentals of stacks and queues in this medieval castle.",
    longDescription:
      "Enter the Stack & Queue Castle, where LIFO and FIFO principles rule the land. Learn the fundamental operations that power many advanced algorithms.",
    type: "stackqueue",
    estimatedTime: "40 minutes",
    challenges: [
      {
        name: "Stack Basics",
        difficulty: "Easy",
        points: 45,
        completed: false,
      },
      {
        name: "Queue Operations",
        difficulty: "Easy",
        points: 55,
        completed: false,
      },
      {
        name: "Expression Evaluation",
        difficulty: "Medium",
        points: 85,
        completed: false,
      },
      {
        name: "BFS Implementation",
        difficulty: "Medium",
        points: 95,
        completed: false,
      },
    ],
    totalPoints: 280,
    icon: "🏯",
    color: "bg-red-500",
  },
  "dynamic-programming-darbar": {
    title: "Dynamic Programming Darbar",
    slug: "dynamic-programming-darbar",
    difficulty: "Master",
    description:
      "Delve into the darbar of dynamic programming, where each room presents a unique challenge.",
    longDescription:
      "Brave the Dynamic Programming Darbar, the most challenging realm in AlgoQuest. Here, you'll master the art of breaking down complex problems into simpler subproblems.",
    type: "dp",
    estimatedTime: "120 minutes",
    challenges: [
      {
        name: "Fibonacci Optimization",
        difficulty: "Medium",
        points: 100,
        completed: false,
      },
      {
        name: "Knapsack Problem",
        difficulty: "Hard",
        points: 150,
        completed: false,
      },
      {
        name: "Longest Common Subsequence",
        difficulty: "Hard",
        points: 170,
        completed: false,
      },
      {
        name: "Edit Distance",
        difficulty: "Expert",
        points: 200,
        completed: false,
      },
    ],
    totalPoints: 620,
    icon: "⚡",
    color: "bg-indigo-500",
  },
  "algorithm-akharas": {
    title: "Algorithm Akharas",
    slug: "algorithm-akharas",
    difficulty: "Master",
    description: "Engage in fierce battles of algorithms in the Akharas.",
    longDescription:
      "Step into the Algorithm Akharas, where the greatest minds clash in the art of algorithm design and analysis. Prepare for intense challenges that will test your skills to the limit.",
    type: "algorithm",
    estimatedTime: "150 minutes",
    challenges: [
      {
        name: "Sorting Showdown",
        difficulty: "Medium",
        points: 100,
        completed: false,
      },
      {
        name: "Searching Skirmish",
        difficulty: "Hard",
        points: 150,
        completed: false,
      },
      {
        name: "Graph Gauntlet",
        difficulty: "Hard",
        points: 170,
        completed: false,
      },
      {
        name: "Dynamic Programming Duel",
        difficulty: "Expert",
        points: 200,
        completed: false,
      },
    ],
    totalPoints: 620,
    icon: "⚔️",
    color: "bg-green-500",
  },
};

export default function LevelPlayPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("challenge");
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [stars, setStars] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);
  const [sessionStartTime] = useState(Date.now());
  const params = useParams();

  const level = levelData[params.slug as keyof typeof levelData];

  if (!level) {
    notFound();
  }

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - sessionStartTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [sessionStartTime]);

  const handleChallengeComplete = (
    challengeScore: number,
    timeSpent: number
  ) => {
    const newScore = score + challengeScore;
    setScore(newScore);

    // Mark current challenge as completed
    if (!completedChallenges.includes(currentChallengeIndex)) {
      setCompletedChallenges((prev) => [...prev, currentChallengeIndex]);
    }

    // Calculate stars based on performance
    let earnedStars = 1;
    if (challengeScore > 80) earnedStars = 2;
    if (challengeScore > 120 && timeSpent < 60) earnedStars = 3;

    setStars(Math.max(stars, earnedStars));

    toast({
      title: "Challenge Completed!",
      description: `You earned ${challengeScore} points and ${earnedStars} stars.`,
    });

    // Check if all challenges are completed
    if (completedChallenges.length + 1 >= level.challenges.length) {
      setChallengeCompleted(true);
    }
  };

  const resetProgress = () => {
    setChallengeCompleted(false);
    setCurrentChallengeIndex(0);
    setScore(0);
    setStars(0);
    setCompletedChallenges([]);
  };

  const renderChallenge = () => {
    const allowedDifficulties = ["Easy", "Medium", "Hard"] as const;
    const challengeDifficulty = allowedDifficulties.includes(
      level.challenges[currentChallengeIndex]?.difficulty as
        | "Easy"
        | "Medium"
        | "Hard"
    )
      ? (level.challenges[currentChallengeIndex]?.difficulty as
          | "Easy"
          | "Medium"
          | "Hard")
      : "Medium";
    const challengeProps = {
      challengeId: level.challenges[currentChallengeIndex].name,
      difficulty: challengeDifficulty,
      onComplete: handleChallengeComplete,
    };

    switch (level.type) {
      case "array":
        return <ArrayChallenge {...challengeProps} />;
      case "linkedlist":
        return <LinkedListChallenge {...challengeProps} />;
      case "tree":
        return <TreeVisualizer />;
      case "graph":
        return <GraphVisualizer />;
      case "sorting":
        return <SortingVisualizer />;
      case "hashtable":
        return <HashTableVisualizer />;
      case "stackqueue":
        return <StackQueueVisualizer />;
      case "dp":
        return <DPChallenge {...challengeProps} />;
      default:
        return <ArrayChallenge {...challengeProps} />;
    }
  };

  const renderVisualizer = () => {
    switch (level.type) {
      case "array":
        return <SortingVisualizer />;
      case "linkedlist":
        return (
          <LinkedListChallenge
            challengeId={level.slug}
            difficulty="Easy"
            onComplete={() => {}}
          />
        );
      case "tree":
        return <TreeVisualizer />;
      case "graph":
        return <GraphVisualizer />;
      case "sorting":
        return <SortingVisualizer />;
      case "hashtable":
        return <HashTableVisualizer />;
      case "stackqueue":
        return <StackQueueVisualizer />;
      case "dp":
        return (
          <DPChallenge
            challengeId={level.slug}
            difficulty="Easy"
            onComplete={() => {}}
          />
        );
      default:
        return <SortingVisualizer />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "text-green-600 bg-green-50";
      case "medium":
        return "text-yellow-600 bg-yellow-50";
      case "hard":
        return "text-orange-600 bg-orange-50";
      case "expert":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progressPercentage =
    (completedChallenges.length / level.challenges.length) * 100;

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{level.title}</h1>
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-green-500 text-white">
                {level.difficulty}
              </Badge>
              <Badge variant="outline" className="gap-1">
                <Clock className="h-3 w-3" />
                {level.estimatedTime}
              </Badge>
              <Badge variant="outline" className="gap-1">
                <Trophy className="h-3 w-3" />
                {level.totalPoints} pts
              </Badge>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              {level.longDescription}
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="text-right">
              <div className="text-2xl font-bold">{score}</div>
              <div className="text-sm text-muted-foreground">Points</div>
            </div>
            <div className="flex">
              {Array.from({ length: 3 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < stars ? "text-yellow-500 fill-current" : "text-muted"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Progress Overview</h3>
              <span className="text-sm text-muted-foreground">
                {completedChallenges.length}/{level.challenges.length}{" "}
                challenges completed
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3 mb-4" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {level.challenges.map((challenge, index) => (
                <div
                  key={index}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    currentChallengeIndex === index
                      ? "border-primary bg-primary/5"
                      : completedChallenges.includes(index)
                      ? "border-green-500 bg-green-50"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => setCurrentChallengeIndex(index)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">
                      {challenge.name}
                    </span>
                    {completedChallenges.includes(index) && (
                      <Trophy className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge className={getDifficultyColor(challenge.difficulty)}>
                      {challenge.difficulty}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {challenge.points} pts
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList>
            <TabsTrigger value="challenge">Challenge</TabsTrigger>
            <TabsTrigger value="visualizer">Visualizer</TabsTrigger>
            <TabsTrigger value="learn">Learn</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>

          <TabsContent value="challenge" className="space-y-4">
            {challengeCompleted ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="flex justify-center">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <Trophy
                          key={i}
                          className={`h-12 w-12 ${
                            i < stars ? "text-yellow-500" : "text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <h2 className="text-2xl font-bold">Level Completed!</h2>
                    <p className="text-muted-foreground">
                      Congratulations! You&apos;ve successfully completed all
                      challenges in {level.title}.
                    </p>
                    <div className="flex justify-center space-x-8 mt-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{score}</div>
                        <div className="text-sm text-muted-foreground">
                          Total Points
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {formatTime(timeSpent)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Time Spent
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{stars}/3</div>
                        <div className="text-sm text-muted-foreground">
                          Stars
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center space-x-4 mt-6">
                      <Button
                        onClick={resetProgress}
                        variant="outline"
                        className="gap-2 bg-transparent"
                      >
                        <RotateCcw className="h-4 w-4" />
                        Play Again
                      </Button>
                      <Link href="/levels">
                        <Button className="gap-2">
                          <Play className="h-4 w-4" />
                          Next Level
                        </Button>
                      </Link>
                      <Link href={`/boss-battle/${level.slug}`}>
                        <Button
                          variant="outline"
                          className="gap-2 bg-transparent"
                        >
                          <Target className="h-4 w-4" />
                          Boss Battle
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2">
                      Challenge {currentChallengeIndex + 1}:{" "}
                      {level.challenges[currentChallengeIndex].name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={getDifficultyColor(
                          level.challenges[currentChallengeIndex].difficulty
                        )}
                      >
                        {level.challenges[currentChallengeIndex].difficulty}
                      </Badge>
                      <Badge variant="outline">
                        {level.challenges[currentChallengeIndex].points} points
                      </Badge>
                    </div>
                  </div>
                  {renderChallenge()}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="visualizer">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-4">
                  Interactive Visualizer
                </h2>
                <p className="text-muted-foreground mb-6">
                  Experiment with different operations and see how they affect
                  the data structure.
                </p>
                {renderVisualizer()}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="learn">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-4">Learning Resources</h2>
                <div className="space-y-6">
                  {level.type === "array" && (
                    <>
                      <div>
                        <h3 className="text-lg font-medium mb-2">
                          Array Basics
                        </h3>
                        <p className="text-muted-foreground">
                          An array is a collection of elements stored at
                          contiguous memory locations. The idea is to store
                          multiple items of the same type together.
                        </p>
                        <div className="mt-4 p-4 bg-muted rounded-md">
                          <h4 className="font-medium mb-2">Key Properties:</h4>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            <li>
                              Elements are stored in contiguous memory locations
                            </li>
                            <li>Random access is possible using indices</li>
                            <li>Fixed size (in most languages)</li>
                            <li>Homogeneous elements (same data type)</li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2">
                          Common Operations
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 bg-muted rounded-md">
                            <h4 className="font-medium mb-2">Access</h4>
                            <p className="text-sm text-muted-foreground">
                              Accessing an element at a specific index.
                            </p>
                            <div className="mt-2">
                              <Badge>Time Complexity: O(1)</Badge>
                            </div>
                          </div>
                          <div className="p-4 bg-muted rounded-md">
                            <h4 className="font-medium mb-2">Search</h4>
                            <p className="text-sm text-muted-foreground">
                              Finding an element in the array.
                            </p>
                            <div className="mt-2">
                              <Badge>Time Complexity: O(n)</Badge>
                            </div>
                          </div>
                          <div className="p-4 bg-muted rounded-md">
                            <h4 className="font-medium mb-2">Insert</h4>
                            <p className="text-sm text-muted-foreground">
                              Adding an element at a specific position.
                            </p>
                            <div className="mt-2">
                              <Badge>Time Complexity: O(n)</Badge>
                            </div>
                          </div>
                          <div className="p-4 bg-muted rounded-md">
                            <h4 className="font-medium mb-2">Delete</h4>
                            <p className="text-sm text-muted-foreground">
                              Removing an element from a specific position.
                            </p>
                            <div className="mt-2">
                              <Badge>Time Complexity: O(n)</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {level.type === "linkedlist" && (
                    <>
                      <div>
                        <h3 className="text-lg font-medium mb-2">
                          Linked List Basics
                        </h3>
                        <p className="text-muted-foreground">
                          A linked list is a linear data structure where
                          elements are not stored at contiguous memory
                          locations. Each element (node) contains data and a
                          reference to the next node.
                        </p>
                        <div className="mt-4 p-4 bg-muted rounded-md">
                          <h4 className="font-medium mb-2">Key Properties:</h4>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            <li>
                              Dynamic size (can grow or shrink during execution)
                            </li>
                            <li>Efficient insertions and deletions</li>
                            <li>No random access (must traverse from head)</li>
                            <li>Extra memory for storing references</li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2">
                          Common Operations
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 bg-muted rounded-md">
                            <h4 className="font-medium mb-2">Insertion</h4>
                            <p className="text-sm text-muted-foreground">
                              Adding a node at the beginning, end, or middle.
                            </p>
                            <div className="mt-2">
                              <Badge>Time Complexity: O(1) to O(n)</Badge>
                            </div>
                          </div>
                          <div className="p-4 bg-muted rounded-md">
                            <h4 className="font-medium mb-2">Deletion</h4>
                            <p className="text-sm text-muted-foreground">
                              Removing a node from the list.
                            </p>
                            <div className="mt-2">
                              <Badge>Time Complexity: O(1) to O(n)</Badge>
                            </div>
                          </div>
                          <div className="p-4 bg-muted rounded-md">
                            <h4 className="font-medium mb-2">Search</h4>
                            <p className="text-sm text-muted-foreground">
                              Finding a node with a specific value.
                            </p>
                            <div className="mt-2">
                              <Badge>Time Complexity: O(n)</Badge>
                            </div>
                          </div>
                          <div className="p-4 bg-muted rounded-md">
                            <h4 className="font-medium mb-2">Traversal</h4>
                            <p className="text-sm text-muted-foreground">
                              Visiting each node in the list.
                            </p>
                            <div className="mt-2">
                              <Badge>Time Complexity: O(n)</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {level.type === "tree" && (
                    <>
                      <div>
                        <h3 className="text-lg font-medium mb-2">
                          Tree Basics
                        </h3>
                        <p className="text-muted-foreground">
                          A tree is a hierarchical data structure consisting of
                          nodes connected by edges. Each node has a value and
                          references to its children nodes.
                        </p>
                        <div className="mt-4 p-4 bg-muted rounded-md">
                          <h4 className="font-medium mb-2">Key Properties:</h4>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            <li>Hierarchical structure with a root node</li>
                            <li>Each node has zero or more child nodes</li>
                            <li>No cycles (acyclic)</li>
                            <li>
                              Binary trees have at most two children per node
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2">
                          Tree Traversals
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 bg-muted rounded-md">
                            <h4 className="font-medium mb-2">Inorder</h4>
                            <p className="text-sm text-muted-foreground">
                              Left, Root, Right
                            </p>
                            <div className="mt-2">
                              <Badge>
                                Visits nodes in ascending order in a BST
                              </Badge>
                            </div>
                          </div>
                          <div className="p-4 bg-muted rounded-md">
                            <h4 className="font-medium mb-2">Preorder</h4>
                            <p className="text-sm text-muted-foreground">
                              Root, Left, Right
                            </p>
                            <div className="mt-2">
                              <Badge>
                                Used for creating a copy of the tree
                              </Badge>
                            </div>
                          </div>
                          <div className="p-4 bg-muted rounded-md">
                            <h4 className="font-medium mb-2">Postorder</h4>
                            <p className="text-sm text-muted-foreground">
                              Left, Right, Root
                            </p>
                            <div className="mt-2">
                              <Badge>Used for deleting the tree</Badge>
                            </div>
                          </div>
                          <div className="p-4 bg-muted rounded-md">
                            <h4 className="font-medium mb-2">Level Order</h4>
                            <p className="text-sm text-muted-foreground">
                              Level by level, from top to bottom
                            </p>
                            <div className="mt-2">
                              <Badge>Uses a queue for implementation</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {level.type === "graph" && (
                    <>
                      <div>
                        <h3 className="text-lg font-medium mb-2">
                          Graph Basics
                        </h3>
                        <p className="text-muted-foreground">
                          A graph is a non-linear data structure consisting of
                          vertices (nodes) and edges that connect these
                          vertices. Graphs can be directed or undirected,
                          weighted or unweighted.
                        </p>
                        <div className="mt-4 p-4 bg-muted rounded-md">
                          <h4 className="font-medium mb-2">Key Properties:</h4>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            <li>Vertices (nodes) connected by edges</li>
                            <li>Can be directed or undirected</li>
                            <li>Can be weighted or unweighted</li>
                            <li>Can contain cycles</li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2">
                          Graph Algorithms
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 bg-muted rounded-md">
                            <h4 className="font-medium mb-2">
                              Breadth-First Search (BFS)
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Explores all neighbors at the present depth before
                              moving to nodes at the next depth level.
                            </p>
                            <div className="mt-2">
                              <Badge>Time Complexity: O(V+E)</Badge>
                            </div>
                          </div>
                          <div className="p-4 bg-muted rounded-md">
                            <h4 className="font-medium mb-2">
                              Depth-First Search (DFS)
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Explores as far as possible along each branch
                              before backtracking.
                            </p>
                            <div className="mt-2">
                              <Badge>Time Complexity: O(V+E)</Badge>
                            </div>
                          </div>
                          <div className="p-4 bg-muted rounded-md">
                            <h4 className="font-medium mb-2">
                              Dijkstra&apos;s Algorithm
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Finds the shortest path from a start node to all
                              other nodes in a weighted graph.
                            </p>
                            <div className="mt-2">
                              <Badge>
                                Time Complexity: O(V²) or O(E log V)
                              </Badge>
                            </div>
                          </div>
                          <div className="p-4 bg-muted rounded-md">
                            <h4 className="font-medium mb-2">
                              Minimum Spanning Tree
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Finds a subset of edges that forms a tree
                              including every vertex with minimum total weight.
                            </p>
                            <div className="mt-2">
                              <Badge>
                                Algorithms: Prim&apos;s, Kruskal&apos;s
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="flex justify-center">
                    <Button variant="outline" className="gap-2 bg-transparent">
                      <BookOpen className="h-4 w-4" />
                      View Full Documentation
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="code">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-4">Implementation Code</h2>
                <p className="text-muted-foreground mb-6">
                  Study and experiment with the code implementations of{" "}
                  {level.type} operations.
                </p>

                <div className="space-y-4">
                  {level.type === "array" && (
                    <>
                      <div>
                        <h3 className="text-lg font-medium mb-2">
                          Array Access
                        </h3>
                        <pre className="p-4 bg-muted rounded-md overflow-x-auto">
                          <code className="text-sm !font-[monospace]">
                            {" "}
                            {`function accessElement(array, index) {
  if (index < 0 || index >= array.length) {
    return "Index out of bounds";
  }
  return array[index];
}`}
                          </code>
                        </pre>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2">
                          Array Search
                        </h3>
                        <pre className="p-4 bg-muted rounded-md overflow-x-auto">
                          <code className="text-sm !font-[monospace]">
                            {`function linearSearch(array, target) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === target) {
      return i; // Return the index where target is found
    }
  }
  return -1; // Return -1 if target is not found
}`}
                          </code>
                        </pre>
                      </div>
                    </>
                  )}

                  <div className="flex justify-center">
                    <Button variant="outline" className="gap-2 bg-transparent">
                      <Code className="h-4 w-4" />
                      View More Implementations
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
