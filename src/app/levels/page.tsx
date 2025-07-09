"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { LevelCard } from "@/components/level-card";
import { Search, Filter, Boxes } from "lucide-react";

export default function LevelsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [conceptFilter, setConceptFilter] = useState("all");

  const levels = [
    {
      id: 1,
      title: "Arrays of Ashoka",
      slug: "arrays-of-ashoka",
      difficulty: "Novice",
      description:
        "Master the fundamental arrays through the wisdom of ancient Indian mathematics and organization.",
      concepts: ["Array Traversal", "Searching", "Basic Sorting"],
      completionRate: 78,
      averageTime: "45 minutes",
      rating: 4.8,
      players: 12543,
      imagePath: "/images/arrays-of-ashoka.jpeg",
    },
    {
      id: 2,
      title: "Linked Lists of Chandragupta",
      slug: "linked-lists-of-chandragupta",
      difficulty: "Apprentice",
      description:
        "Navigate the interconnected chains of knowledge, following the strategic wisdom of ancient rulers.",
      concepts: [
        "Singly Linked Lists",
        "Doubly Linked Lists",
        "List Operations",
      ],
      completionRate: 65,
      averageTime: "1 hour",
      rating: 4.6,
      players: 8765,
      imagePath: "/images/linked-lists-of-chandragupta.jpeg",
    },
    {
      id: 3,
      title: "Tree of Bodhi",
      slug: "tree-of-bodhi",
      difficulty: "Adept",
      description:
        "Climb the sacred tree of enlightenment, mastering hierarchical wisdom and tree traversals.",
      concepts: ["Binary Trees", "BST", "Tree Traversal"],
      completionRate: 52,
      averageTime: "1.5 hours",
      rating: 4.9,
      players: 6543,
      imagePath: "/images/tree-of-bodhi.jpeg",
    },
    {
      id: 4,
      title: "Trade Routes of Silk Road",
      slug: "trade-routes-of-silk-road",
      difficulty: "Sage",
      description:
        "Explore the vast network of ancient trade routes, solving complex pathfinding challenges.",
      concepts: ["Graph Representation", "DFS/BFS", "Shortest Path"],
      completionRate: 38,
      averageTime: "2 hours",
      rating: 4.7,
      players: 4321,
      imagePath: "/images/trade-routes-of-silk-road.jpeg",
    },
    {
      id: 5,
      title: "Sorting Ashram",
      slug: "sorting-ashram",
      difficulty: "Novice",
      description:
        "Master the art of sorting algorithms in the serene environment of the Sorting Ashram.",
      concepts: ["Bubble Sort", "Quick Sort", "Merge Sort"],
      completionRate: 82,
      averageTime: "30 minutes",
      rating: 4.5,
      players: 15678,
      imagePath: "/images/sorting-ashram.jpeg",
    },
    {
      id: 6,
      title: "Hash Palace of Pataliputra",
      slug: "hash-palace-of-pataliputra",
      difficulty: "Adept",
      description:
        "Unravel the mysteries of hashing in the grand palace of Pataliputra.",
      concepts: ["Hash Functions", "Collision Resolution", "Hash Tables"],
      completionRate: 58,
      averageTime: "1.2 hours",
      rating: 4.4,
      players: 7890,
      imagePath: "/images/hash-palace-of-pataliputra.jpeg",
    },
    {
      id: 7,
      title: "Scroll Stambh of Stacks & Queues",
      slug: "scroll-stambh-stacks-queues",
      difficulty: "Apprentice",
      description:
        "Discover the ancient scrolls of data structures, learning the principles of stacks and queues.",
      concepts: ["LIFO", "FIFO", "Stack Scrolls", "Queue Offerings"],
      completionRate: 75,
      averageTime: "40 minutes",
      rating: 4.6,
      players: 11234,
      imagePath: "/images/scroll-stambh-of-stacks-and-queues.jpeg",
    },
    {
      id: 8,
      title: "Dynamic Programming Darbar",
      slug: "dynamic-programming-darbar",
      difficulty: "Master",
      description:
        "Enter the royal court of optimization, where each decision shapes the kingdom's future.",
      concepts: ["Memoization", "Tabulation", "Optimization"],
      completionRate: 25,
      averageTime: "3 hours",
      rating: 4.9,
      players: 2345,
      imagePath: "/images/dynamic-programming-darbar.jpeg",
    },
    {
      id: 9,
      title: "Algorithm Akharas",
      slug: "algorithm-akharas",
      difficulty: "Legendary",
      description:
        "Train in the akharas of algorithms, mastering complex problem-solving techniques.",
      concepts: ["Greedy Algorithms", "Divide and Conquer", "Backtracking"],
      completionRate: 15,
      averageTime: "4 hours",
      rating: 5.0,
      players: 1234,
      imagePath: "/images/algorithm-akharas.jpeg",
    },
  ];

  const filteredLevels = levels.filter((level) => {
    const matchesSearch =
      level.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      level.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      level.concepts.some((concept) =>
        concept.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesDifficulty =
      difficultyFilter === "all" ||
      level.difficulty.toLowerCase() === difficultyFilter.toLowerCase();

    const matchesConcept =
      conceptFilter === "all" ||
      level.concepts.some((concept) =>
        concept.toLowerCase().includes(conceptFilter.toLowerCase())
      );

    return matchesSearch && matchesDifficulty && matchesConcept;
  });

  const allConcepts = Array.from(
    new Set(levels.flatMap((level) => level.concepts))
  );

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

      <main className="flex-1 container py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Learning Levels</h1>
            <p className="text-muted-foreground">
              Choose your adventure and master data structures & algorithms
            </p>
          </div>
          <Badge variant="outline" className="text-sm">
            {filteredLevels.length} level
            {filteredLevels.length !== 1 ? "s" : ""} available
          </Badge>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-muted/30 rounded-lg">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search levels, concepts, or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Difficulties</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
              <SelectItem value="expert">Expert</SelectItem>
              <SelectItem value="master">Master</SelectItem>
            </SelectContent>
          </Select>

          <Select value={conceptFilter} onValueChange={setConceptFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Concept" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Concepts</SelectItem>
              {allConcepts.map((concept) => (
                <SelectItem key={concept} value={concept.toLowerCase()}>
                  {concept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results */}
        {filteredLevels.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              No levels found matching your criteria
            </div>
            <Button
              onClick={() => {
                setSearchTerm("");
                setDifficultyFilter("all");
                setConceptFilter("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredLevels.map((level) => (
              <LevelCard
                key={level.id}
                title={level.title}
                slug={level.slug}
                difficulty={level.difficulty}
                description={level.description}
                concepts={level.concepts}
                imagePath={level.imagePath}
                completionRate={level.completionRate}
                averageTime={level.averageTime}
                rating={level.rating}
              />
            ))}
          </div>
        )}
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
