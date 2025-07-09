"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SortingVisualizer } from "@/components/game-engine/sorting-visualizer";
import { TreeVisualizer } from "@/components/game-engine/tree-visualizer";
import { GraphVisualizer } from "@/components/game-engine/graph-visualizer";
import { HashTableVisualizer } from "@/components/game-engine/hash-table-visualizer";
import { StackQueueVisualizer } from "@/components/game-engine/stack-queue-visualizer";
import { Boxes, ArrowRight, Play } from "lucide-react";

export default function DemoPage() {
  const [activeDemo, setActiveDemo] = useState("sorting");

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
            <Link
              href="/levels"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Levels
            </Link>
            <Link
              href="/how-it-works"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              About
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
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Interactive Demo</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience RannNeeti&apos;s interactive learning platform. Try out
              our visualizers and see how we make complex algorithms easy to
              understand.
            </p>
          </div>

          <Tabs
            value={activeDemo}
            onValueChange={setActiveDemo}
            className="space-y-8"
          >
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="sorting">Sorting</TabsTrigger>
              <TabsTrigger value="trees">Trees</TabsTrigger>
              <TabsTrigger value="graphs">Graphs</TabsTrigger>
              <TabsTrigger value="hashtable">Hash Tables</TabsTrigger>
              <TabsTrigger value="stackqueue">Stack & Queue</TabsTrigger>
            </TabsList>

            <TabsContent value="sorting">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="h-5 w-5 text-primary" />
                    Sorting Algorithm Visualizer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    Watch different sorting algorithms in action. Compare their
                    performance and understand how they work step by step.
                  </p>
                  <SortingVisualizer />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trees">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="h-5 w-5 text-primary" />
                    Binary Search Tree Visualizer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    Build and manipulate binary search trees. See how
                    insertions, deletions, and traversals work.
                  </p>
                  <TreeVisualizer />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="graphs">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="h-5 w-5 text-primary" />
                    Graph Algorithm Visualizer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    Create graphs and run algorithms like BFS, DFS, and
                    Dijkstra&apos;s shortest path algorithm.
                  </p>
                  <GraphVisualizer />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="hashtable">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="h-5 w-5 text-primary" />
                    Hash Table Visualizer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    Explore hash tables, different hash functions, and collision
                    resolution strategies.
                  </p>
                  <HashTableVisualizer />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stackqueue">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="h-5 w-5 text-primary" />
                    Stack & Queue Visualizer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    Understand LIFO and FIFO data structures through interactive
                    push, pop, enqueue, and dequeue operations.
                  </p>
                  <StackQueueVisualizer />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-16 text-center">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">
                  Ready to Start Learning?
                </h2>
                <p className="text-muted-foreground mb-6">
                  This is just a taste of what RannNeeti offers. Join our
                  platform to access the full curriculum, challenges,
                  achievements, and community features.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/register">
                    <Button size="lg">
                      Create Free Account
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/how-it-works">
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
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
