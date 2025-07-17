/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  X,
  RefreshCw,
  Trophy,
  Clock,
  ArrowRightCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface LinkedListNode {
  value: number;
  id: string;
}

interface LinkedListChallengeProps {
  challengeId: string;
  difficulty: "Easy" | "Medium" | "Hard";
  onComplete: (score: number, timeSpent: number) => void;
}

export function LinkedListChallenge({
  challengeId,
  difficulty,
  onComplete,
}: LinkedListChallengeProps) {
  const { toast } = useToast();
  const [gameState, setGameState] = useState<
    "intro" | "playing" | "success" | "failure"
  >("intro");
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const [nodes, setNodes] = useState<LinkedListNode[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [highlightedNodeIds, setHighlightedNodeIds] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [targetValue, setTargetValue] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  // Challenge configuration based on difficulty
  const challengeConfig = {
    Easy: {
      listSize: 6,
      operations: ["traverse", "find", "insertHead", "insertTail"],
      timeLimit: 120,
      lives: 3,
    },
    Medium: {
      listSize: 8,
      operations: [
        "traverse",
        "find",
        "insertHead",
        "insertTail",
        "insertMiddle",
        "deleteNode",
      ],
      timeLimit: 180,
      lives: 3,
    },
    Hard: {
      listSize: 10,
      operations: [
        "traverse",
        "find",
        "insertHead",
        "insertTail",
        "insertMiddle",
        "deleteNode",
        "reverse",
      ],
      timeLimit: 240,
      lives: 3,
    },
  }[difficulty];

  // Challenge steps for this level
  const challengeSteps = [
    {
      type: "traverse",
      instruction:
        "Traverse the linked list by clicking each node in order from head to tail.",
      validate: () => true, // This will be validated during traversal
    },
    {
      type: "find",
      instruction: `Find the node with value ${targetValue} and select it.`,
      validate: () => {
        const selectedNode = nodes.find((node) => node.id === selectedNodeId);
        return selectedNode && selectedNode.value === targetValue;
      },
    },
    {
      type: "insertHead",
      instruction:
        "Insert a new node at the head of the list by clicking the 'Insert at Head' button.",
      validate: () => true, // This will be validated in the insertHead operation
    },
    {
      type: "insertTail",
      instruction:
        "Insert a new node at the tail of the list by clicking the 'Insert at Tail' button.",
      validate: () => true, // This will be validated in the insertTail operation
    },
    {
      type: "deleteNode",
      instruction:
        "Delete the third node in the list by clicking on it and then the 'Delete Node' button.",
      validate: () => true, // This will be validated in the deleteNode operation
    },
  ];

  // Initialize the game
  useEffect(() => {
    if (gameState === "playing") {
      initializeGame();
      startTimer();
      startTimeRef.current = Date.now();
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [gameState]);

  const initializeGame = () => {
    // Generate random linked list
    const newNodes: LinkedListNode[] = Array.from(
      { length: challengeConfig.listSize },
      (_, i) => ({
        value: Math.floor(Math.random() * 100),
        id: `node-${i}-${Date.now()}`,
      })
    );

    setNodes(newNodes);

    // Set a random target value from the list
    const randomIndex = Math.floor(Math.random() * newNodes.length);
    setTargetValue(newNodes[randomIndex].value);

    setLives(challengeConfig.lives);
    setTimeLeft(challengeConfig.timeLimit);
    setScore(0);
    setCurrentStep(0);
    setSelectedNodeId(null);
    setHighlightedNodeIds([]);
    setMessage("");
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleGameOver();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleGameOver = () => {
    setGameState("failure");
    toast({
      title: "Time's up!",
      description: "You ran out of time. Try again!",
      variant: "destructive",
    });
  };

  // Traversal state
  const [traversalState, setTraversalState] = useState({
    isTraversing: false,
    currentIndex: -1,
    expectedNodeId: "",
  });

  const handleNodeClick = (nodeId: string, index: number) => {
    if (gameState !== "playing") return;

    const currentChallenge =
      challengeSteps[currentStep % challengeSteps.length];

    // Handle traversal challenge
    if (currentChallenge.type === "traverse") {
      if (traversalState.isTraversing) {
        // Check if this is the next node in sequence
        if (index === traversalState.currentIndex + 1) {
          // Highlight the node
          setHighlightedNodeIds((prev) => [...prev, nodeId]);

          // Update traversal state
          setTraversalState((prev) => ({
            ...prev,
            currentIndex: index,
          }));

          // Check if traversal is complete
          if (index === nodes.length - 1) {
            // Traversal complete
            setTraversalState({
              isTraversing: false,
              currentIndex: -1,
              expectedNodeId: "",
            });
            handleSuccess();
          }
        } else {
          // Wrong node clicked
          handleFailure();
        }
      } else {
        // Start traversal if clicking the head
        if (index === 0) {
          setTraversalState({
            isTraversing: true,
            currentIndex: 0,
            expectedNodeId: nodes[1]?.id || "",
          });
          setHighlightedNodeIds([nodeId]);
        } else {
          // Not starting from head
          handleFailure();
        }
      }
      return;
    }

    // Handle find challenge
    if (
      currentChallenge.type === "find" ||
      currentChallenge.type === "deleteNode"
    ) {
      setSelectedNodeId(nodeId);
      setHighlightedNodeIds([nodeId]);

      if (currentChallenge.type === "find" && currentChallenge.validate()) {
        handleSuccess();
      }
    }
  };

  const handleSuccess = () => {
    const pointsEarned =
      difficulty === "Easy" ? 10 : difficulty === "Medium" ? 20 : 30;
    setScore((prev) => prev + pointsEarned);

    setMessage(`Correct! +${pointsEarned} points`);
    toast({
      title: "Correct!",
      description: `You earned ${pointsEarned} points.`,
      variant: "default",
    });

    // Move to next step
    const nextStep = currentStep + 1;
    if (nextStep >= challengeSteps.length) {
      // Challenge completed
      const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
      clearInterval(timerRef.current!);
      setGameState("success");
      onComplete(score + pointsEarned, timeSpent);
    } else {
      setCurrentStep(nextStep);
      setSelectedNodeId(null);
      setHighlightedNodeIds([]);
    }
  };

  const handleFailure = () => {
    setLives((prev) => prev - 1);
    setMessage("Incorrect! Try again.");
    toast({
      title: "Incorrect",
      description: "That's not the right answer. Try again!",
      variant: "destructive",
    });

    if (lives <= 1) {
      clearInterval(timerRef.current!);
      setGameState("failure");
    }
  };

  const handleInsertHead = () => {
    if (gameState !== "playing") return;

    const currentChallenge =
      challengeSteps[currentStep % challengeSteps.length];
    if (currentChallenge.type !== "insertHead") {
      handleFailure();
      return;
    }

    // Create new node
    const newNode: LinkedListNode = {
      value: Math.floor(Math.random() * 100),
      id: `node-head-${Date.now()}`,
    };

    // Highlight the new node position
    setHighlightedNodeIds([newNode.id]);

    // Insert at head
    setNodes((prev) => [newNode, ...prev]);

    // Success
    handleSuccess();
  };

  const handleInsertTail = () => {
    if (gameState !== "playing") return;

    const currentChallenge =
      challengeSteps[currentStep % challengeSteps.length];
    if (currentChallenge.type !== "insertTail") {
      handleFailure();
      return;
    }

    // Create new node
    const newNode: LinkedListNode = {
      value: Math.floor(Math.random() * 100),
      id: `node-tail-${Date.now()}`,
    };

    // Highlight the new node position
    setHighlightedNodeIds([newNode.id]);

    // Insert at tail
    setNodes((prev) => [...prev, newNode]);

    // Success
    handleSuccess();
  };

  const handleDeleteNode = () => {
    if (gameState !== "playing" || !selectedNodeId) return;

    const currentChallenge =
      challengeSteps[currentStep % challengeSteps.length];
    if (currentChallenge.type !== "deleteNode") {
      handleFailure();
      return;
    }

    // Find the index of the selected node
    const selectedIndex = nodes.findIndex((node) => node.id === selectedNodeId);

    // Check if it's the third node (index 2)
    if (selectedIndex !== 2) {
      handleFailure();
      return;
    }

    // Delete the node
    setNodes((prev) => prev.filter((node) => node.id !== selectedNodeId));

    // Success
    handleSuccess();
  };

  const handleReverseList = () => {
    if (gameState !== "playing") return;

    // Reverse the list
    setNodes((prev) => [...prev].reverse());

    // Highlight all nodes
    setHighlightedNodeIds(nodes.map((node) => node.id));

    // Success if this is a reverse challenge
    const currentChallenge =
      challengeSteps[currentStep % challengeSteps.length];
    if (currentChallenge.type === "reverse") {
      handleSuccess();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const restartGame = () => {
    setGameState("playing");
  };

  if (gameState === "intro") {
    return (
      <Card className="p-6 max-w-3xl mx-auto">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Linked List Challenge</h2>
          <p className="text-muted-foreground">
            Master linked list operations by completing a series of challenges.
            You&apos;ll need to traverse the list, find elements, insert nodes
            at different positions, and delete nodes.
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <Badge variant="outline" className="text-sm py-1">
              Difficulty: {difficulty}
            </Badge>
            <Badge variant="outline" className="text-sm py-1">
              Time Limit: {formatTime(challengeConfig.timeLimit)}
            </Badge>
            <Badge variant="outline" className="text-sm py-1">
              Lives: {challengeConfig.lives}
            </Badge>
          </div>
          <Button onClick={() => setGameState("playing")} className="mt-4">
            Start Challenge <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Card>
    );
  }

  if (gameState === "success") {
    return (
      <Card className="p-6 max-w-3xl mx-auto">
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto"
          >
            <Trophy className="h-10 w-10 text-green-600" />
          </motion.div>
          <h2 className="text-2xl font-bold">Challenge Completed!</h2>
          <p className="text-muted-foreground">
            Congratulations! You&apos;ve successfully completed the Linked List
            Challenge.
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <Badge className="text-sm py-1">Final Score: {score}</Badge>
            <Badge className="text-sm py-1">
              Time Remaining: {formatTime(timeLeft)}
            </Badge>
            <Badge className="text-sm py-1">Lives Left: {lives}</Badge>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            <Button onClick={restartGame} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" /> Play Again
            </Button>
            <Button onClick={() => (window.location.href = "/levels")}>
              Next Challenge <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  if (gameState === "failure") {
    return (
      <Card className="p-6 max-w-3xl mx-auto">
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto"
          >
            <X className="h-10 w-10 text-red-600" />
          </motion.div>
          <h2 className="text-2xl font-bold">Challenge Failed</h2>
          <p className="text-muted-foreground">
            {lives <= 0 ? "You've run out of lives." : "You ran out of time."}{" "}
            Don&apos;t worry, you can try again!
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <Badge className="text-sm py-1">Score: {score}</Badge>
            <Badge className="text-sm py-1">
              Time Remaining: {formatTime(timeLeft)}
            </Badge>
            <Badge className="text-sm py-1">Lives Left: {lives}</Badge>
          </div>
          <Button onClick={restartGame} className="mt-4">
            <RefreshCw className="mr-2 h-4 w-4" /> Try Again
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Game header */}
      <div className="flex flex-wrap gap-2 justify-between items-center">
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="text-sm py-1">
            Step {currentStep + 1}/{challengeSteps.length}
          </Badge>
          <Badge variant="outline" className="text-sm py-1">
            Score: {score}
          </Badge>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className={timeLeft < 30 ? "text-red-500 font-bold" : ""}>
              {formatTime(timeLeft)}
            </span>
          </div>
          <div className="flex items-center">
            {Array.from({ length: challengeConfig.lives }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 1 }}
                animate={{
                  scale: i >= lives ? 0.7 : 1,
                  opacity: i >= lives ? 0.5 : 1,
                }}
                className="text-red-500 mx-0.5"
              >
                ❤️
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Challenge instruction */}
      <Card className="p-4 bg-muted/50">
        <p className="font-medium text-center">
          {challengeSteps[currentStep % challengeSteps.length].instruction}
        </p>
      </Card>

      {/* Linked List visualization */}
      <div className="bg-card rounded-lg p-6 shadow-md">
        <div className="flex flex-wrap justify-center items-center gap-2">
          {nodes.map((node, index) => (
            <div key={node.id} className="flex items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: highlightedNodeIds.includes(node.id) ? 1.1 : 1,
                  backgroundColor: highlightedNodeIds.includes(node.id)
                    ? "var(--primary-50, #f0f9ff)"
                    : "var(--card, white)",
                }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className={`
                  w-16 h-16 rounded-full border-2 flex items-center justify-center cursor-pointer
                  ${
                    selectedNodeId === node.id
                      ? "border-primary"
                      : "border-border"
                  }
                  ${
                    highlightedNodeIds.includes(node.id)
                      ? "bg-primary/10 text-primary font-bold"
                      : ""
                  }
                  ${
                    index === 0
                      ? 'relative after:content-["HEAD"] after:absolute after:top-full after:text-xs after:text-muted-foreground'
                      : ""
                  }
                  ${
                    index === nodes.length - 1
                      ? 'relative after:content-["TAIL"] after:absolute after:top-full after:text-xs after:text-muted-foreground'
                      : ""
                  }
                `}
                onClick={() => handleNodeClick(node.id, index)}
              >
                {node.value}
              </motion.div>
              {index < nodes.length - 1 && (
                <ArrowRightCircle className="h-6 w-6 mx-1 text-muted-foreground" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Operation buttons */}
      <div className="flex flex-wrap gap-2 justify-center">
        <Button variant="outline" onClick={handleInsertHead}>
          Insert at Head
        </Button>
        <Button variant="outline" onClick={handleInsertTail}>
          Insert at Tail
        </Button>
        <Button
          variant="outline"
          onClick={handleDeleteNode}
          disabled={!selectedNodeId}
        >
          Delete Node
        </Button>
        <Button variant="outline" onClick={handleReverseList}>
          Reverse List
        </Button>
      </div>

      {/* Feedback message */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`text-center p-2 rounded-md ${
              message.includes("Correct")
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Progress</span>
          <span>
            {Math.round((currentStep / challengeSteps.length) * 100)}%
          </span>
        </div>
        <Progress
          value={(currentStep / challengeSteps.length) * 100}
          className="h-2"
        />
      </div>
    </div>
  );
}
