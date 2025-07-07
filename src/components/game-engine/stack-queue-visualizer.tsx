"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

interface StackQueueVisualizerProps {
  maxSize?: number;
}

export function StackQueueVisualizer({
  maxSize = 10,
}: StackQueueVisualizerProps) {
  const [activeTab, setActiveTab] = useState<"stack" | "queue">("stack");
  const [stackItems, setStackItems] = useState<string[]>([]);
  const [queueItems, setQueueItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");
  const [animation, setAnimation] = useState<
    "push" | "pop" | "enqueue" | "dequeue" | null
  >(null);
  const [animatedItem, setAnimatedItem] = useState<string | null>(null);

  const handlePush = () => {
    if (!inputValue.trim()) {
      setMessage("Please enter a value to push");
      return;
    }

    if (stackItems.length >= maxSize) {
      setMessage("Stack overflow! Cannot push more items.");
      return;
    }

    setAnimatedItem(inputValue);
    setAnimation("push");

    setTimeout(() => {
      setStackItems([...stackItems, inputValue]);
      setInputValue("");
      setMessage(`Pushed "${inputValue}" onto the stack`);
      setAnimation(null);
    }, 500);
  };

  const handlePop = () => {
    if (stackItems.length === 0) {
      setMessage("Stack underflow! Cannot pop from an empty stack.");
      return;
    }

    const poppedItem = stackItems[stackItems.length - 1];
    setAnimatedItem(poppedItem);
    setAnimation("pop");

    setTimeout(() => {
      setStackItems(stackItems.slice(0, -1));
      setMessage(`Popped "${poppedItem}" from the stack`);
      setAnimation(null);
    }, 500);
  };

  const handleEnqueue = () => {
    if (!inputValue.trim()) {
      setMessage("Please enter a value to enqueue");
      return;
    }

    if (queueItems.length >= maxSize) {
      setMessage("Queue is full! Cannot enqueue more items.");
      return;
    }

    setAnimatedItem(inputValue);
    setAnimation("enqueue");

    setTimeout(() => {
      setQueueItems([...queueItems, inputValue]);
      setInputValue("");
      setMessage(`Enqueued "${inputValue}" to the queue`);
      setAnimation(null);
    }, 500);
  };

  const handleDequeue = () => {
    if (queueItems.length === 0) {
      setMessage("Queue is empty! Cannot dequeue.");
      return;
    }

    const dequeuedItem = queueItems[0];
    setAnimatedItem(dequeuedItem);
    setAnimation("dequeue");

    setTimeout(() => {
      setQueueItems(queueItems.slice(1));
      setMessage(`Dequeued "${dequeuedItem}" from the queue`);
      setAnimation(null);
    }, 500);
  };

  const resetStack = () => {
    setStackItems([]);
    setMessage("Stack cleared");
    setAnimation(null);
  };

  const resetQueue = () => {
    setQueueItems([]);
    setMessage("Queue cleared");
    setAnimation(null);
  };

  return (
    <Card className="p-6 w-full">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h3 className="text-lg font-medium">Stack & Queue Visualizer</h3>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={activeTab === "stack" ? resetStack : resetQueue}
            >
              <RotateCcw className="mr-2 h-4 w-4" /> Reset
            </Button>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "stack" | "queue")}
        >
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="stack">Stack</TabsTrigger>
            <TabsTrigger value="queue">Queue</TabsTrigger>
          </TabsList>

          <TabsContent value="stack" className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter value"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Button onClick={handlePush}>
                <ArrowDown className="mr-2 h-4 w-4" /> Push
              </Button>
              <Button variant="outline" onClick={handlePop}>
                <ArrowUp className="mr-2 h-4 w-4" /> Pop
              </Button>
            </div>

            <div className="border rounded-md p-4 bg-muted/30 min-h-[300px] flex flex-col-reverse items-center justify-start relative">
              {/* Stack visualization */}
              <div className="w-full max-w-md">
                {stackItems.length === 0 ? (
                  <div className="text-center text-muted-foreground italic">
                    Stack is empty
                  </div>
                ) : (
                  <div className="space-y-2">
                    <AnimatePresence>
                      {animation === "push" && animatedItem && (
                        <motion.div
                          initial={{ opacity: 0, y: -50 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground p-2 rounded-md"
                        >
                          {animatedItem}
                        </motion.div>
                      )}

                      {animation === "pop" && animatedItem && (
                        <motion.div
                          initial={{ opacity: 1, y: 0 }}
                          animate={{ opacity: 0, y: -50 }}
                          exit={{ opacity: 0 }}
                          className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground p-2 rounded-md"
                        >
                          {animatedItem}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {stackItems.map((item, index) => (
                      <motion.div
                        key={`${item}-${index}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className={`
                          border-2 p-3 rounded-md text-center relative
                          ${
                            index === stackItems.length - 1
                              ? "border-primary bg-primary/10"
                              : "border-border"
                          }
                        `}
                      >
                        {item}
                        {index === stackItems.length - 1 && (
                          <div className="absolute -right-16 top-1/2 transform -translate-y-1/2 text-sm text-primary font-medium flex items-center">
                            <ArrowLeft className="h-4 w-4 mr-1" /> Top
                          </div>
                        )}
                        {index === 0 && (
                          <div className="absolute -left-20 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground font-medium flex items-center">
                            Bottom <ArrowRight className="h-4 w-4 ml-1" />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Stack Operations</h4>
              <div className="text-sm text-muted-foreground">
                <p>
                  <strong>Push:</strong> Adds an element to the top of the
                  stack. Time Complexity: O(1)
                </p>
                <p>
                  <strong>Pop:</strong> Removes the top element from the stack.
                  Time Complexity: O(1)
                </p>
                <p>
                  <strong>Peek/Top:</strong> Returns the top element without
                  removing it. Time Complexity: O(1)
                </p>
                <p>
                  <strong>isEmpty:</strong> Checks if the stack is empty. Time
                  Complexity: O(1)
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="queue" className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter value"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Button onClick={handleEnqueue}>
                <ArrowRight className="mr-2 h-4 w-4" /> Enqueue
              </Button>
              <Button variant="outline" onClick={handleDequeue}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Dequeue
              </Button>
            </div>

            <div className="border rounded-md p-4 bg-muted/30 min-h-[300px] flex items-center justify-center relative">
              {/* Queue visualization */}
              <div className="w-full max-w-md">
                {queueItems.length === 0 ? (
                  <div className="text-center text-muted-foreground italic">
                    Queue is empty
                  </div>
                ) : (
                  <div className="flex flex-col items-center space-y-4">
                    <AnimatePresence>
                      {animation === "enqueue" && animatedItem && (
                        <motion.div
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-primary text-primary-foreground p-2 rounded-md"
                        >
                          {animatedItem}
                        </motion.div>
                      )}

                      {animation === "dequeue" && animatedItem && (
                        <motion.div
                          initial={{ opacity: 1, x: 0 }}
                          animate={{ opacity: 0, x: -50 }}
                          exit={{ opacity: 0 }}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-primary text-primary-foreground p-2 rounded-md"
                        >
                          {animatedItem}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex w-full justify-between items-center">
                      <div className="text-sm text-primary font-medium flex items-center">
                        Front <ArrowRight className="h-4 w-4 ml-1" />
                      </div>
                      <div className="text-sm text-primary font-medium flex items-center">
                        <ArrowLeft className="h-4 w-4 mr-1" /> Rear
                      </div>
                    </div>

                    <div className="flex w-full">
                      {queueItems.map((item, index) => (
                        <motion.div
                          key={`${item}-${index}`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className={`
                            flex-1 border-2 p-3 rounded-md text-center mx-1
                            ${index === 0 ? "border-primary bg-primary/10" : ""}
                            ${
                              index === queueItems.length - 1
                                ? "border-primary bg-primary/10"
                                : "border-border"
                            }
                          `}
                        >
                          {item}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Queue Operations</h4>
              <div className="text-sm text-muted-foreground">
                <p>
                  <strong>Enqueue:</strong> Adds an element to the rear of the
                  queue. Time Complexity: O(1)
                </p>
                <p>
                  <strong>Dequeue:</strong> Removes the front element from the
                  queue. Time Complexity: O(1)
                </p>
                <p>
                  <strong>Front:</strong> Returns the front element without
                  removing it. Time Complexity: O(1)
                </p>
                <p>
                  <strong>isEmpty:</strong> Checks if the queue is empty. Time
                  Complexity: O(1)
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-2 bg-muted rounded-md text-center"
          >
            {message}
          </motion.div>
        )}

        <div className="space-y-2">
          <h3 className="text-lg font-medium">Applications</h3>
          <div className="text-sm text-muted-foreground">
            <p>
              <strong>Stack Applications:</strong> Function call management,
              expression evaluation, undo mechanisms, browser history, syntax
              parsing, and depth-first search algorithms.
            </p>
            <p>
              <strong>Queue Applications:</strong> Task scheduling, print
              spooling, handling requests, breadth-first search algorithms, and
              buffering.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
