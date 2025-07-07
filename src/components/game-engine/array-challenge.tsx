/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, X, RefreshCw, Trophy, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface ArrayChallengeProps {
  challengeId: string;
  difficulty: "Easy" | "Medium" | "Hard";
  onComplete: (score: number, timeSpent: number) => void;
}

export function ArrayChallenge({
  challengeId,
  difficulty,
  onComplete,
}: ArrayChallengeProps) {
  const { toast } = useToast();
  const [gameState, setGameState] = useState<
    "intro" | "playing" | "success" | "failure"
  >("intro");
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const [array, setArray] = useState<number[]>([]);
  const [targetValue, setTargetValue] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [highlightedIndices, setHighlightedIndices] = useState<number[]>([]);
  const [message, setMessage] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  // Challenge configuration based on difficulty
  const challengeConfig = {
    Easy: {
      arraySize: 8,
      operations: ["find", "access", "insert"],
      timeLimit: 120,
      lives: 3,
    },
    Medium: {
      arraySize: 12,
      operations: ["find", "access", "insert", "delete", "sort"],
      timeLimit: 180,
      lives: 3,
    },
    Hard: {
      arraySize: 16,
      operations: [
        "find",
        "access",
        "insert",
        "delete",
        "sort",
        "reverse",
        "rotate",
      ],
      timeLimit: 240,
      lives: 3,
    },
  }[difficulty];

  // Challenge steps for this level
  const challengeSteps = [
    {
      type: "find",
      instruction: `Find the value ${targetValue} in the array and select its index.`,
      validate: () =>
        selectedIndex !== null && array[selectedIndex] === targetValue,
    },
    {
      type: "access",
      instruction: "Select the element at index 3.",
      validate: () => selectedIndex === 3,
    },
    {
      type: "sort",
      instruction:
        "Sort the array in ascending order by clicking the Sort button.",
      validate: () => {
        for (let i = 0; i < array.length - 1; i++) {
          if (array[i] > array[i + 1]) return false;
        }
        return true;
      },
    },
    {
      type: "insert",
      instruction: `Insert the value ${targetValue} at index 2 by clicking the Insert button.`,
      validate: () => array[2] === targetValue,
    },
    {
      type: "delete",
      instruction:
        "Delete the element at index 4 by clicking the Delete button.",
      validate: () => true, // This will be validated in the delete operation
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
    // Generate random array
    const newArray = Array.from({ length: challengeConfig.arraySize }, () =>
      Math.floor(Math.random() * 100)
    );
    setArray(newArray);

    // Set a random target value from the array
    const randomIndex = Math.floor(Math.random() * newArray.length);
    setTargetValue(newArray[randomIndex]);

    setLives(challengeConfig.lives);
    setTimeLeft(challengeConfig.timeLimit);
    setScore(0);
    setCurrentStep(0);
    setSelectedIndex(null);
    setHighlightedIndices([]);
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

  const handleCellClick = (index: number) => {
    if (gameState !== "playing") return;

    setSelectedIndex(index);

    // Highlight the selected cell
    setHighlightedIndices([index]);

    // Check if this is the correct action for the current step
    const currentChallenge =
      challengeSteps[currentStep % challengeSteps.length];

    if (
      currentChallenge.type === "find" ||
      currentChallenge.type === "access"
    ) {
      if (currentChallenge.validate()) {
        handleSuccess();
      } else {
        handleFailure();
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
      setSelectedIndex(null);
      setHighlightedIndices([]);
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

  const handleSort = () => {
    if (gameState !== "playing") return;

    const currentChallenge =
      challengeSteps[currentStep % challengeSteps.length];
    if (currentChallenge.type !== "sort") {
      handleFailure();
      return;
    }

    // Animate sorting
    const sortedArray = [...array].sort((a, b) => a - b);

    // Highlight all cells during sorting
    setHighlightedIndices(Array.from({ length: array.length }, (_, i) => i));

    setTimeout(() => {
      setArray(sortedArray);
      if (currentChallenge.validate()) {
        handleSuccess();
      } else {
        handleFailure();
      }
    }, 1000);
  };

  const handleInsert = () => {
    if (gameState !== "playing" || targetValue === null) return;

    const currentChallenge =
      challengeSteps[currentStep % challengeSteps.length];
    if (currentChallenge.type !== "insert") {
      handleFailure();
      return;
    }

    // Insert at index 2
    const newArray = [...array];
    newArray.splice(2, 0, targetValue);

    // Highlight the inserted cell
    setHighlightedIndices([2]);

    setTimeout(() => {
      setArray(newArray);
      if (currentChallenge.validate()) {
        handleSuccess();
      } else {
        handleFailure();
      }
    }, 1000);
  };

  const handleDelete = () => {
    if (gameState !== "playing") return;

    const currentChallenge =
      challengeSteps[currentStep % challengeSteps.length];
    if (currentChallenge.type !== "delete") {
      handleFailure();
      return;
    }

    // Highlight the cell to be deleted
    setHighlightedIndices([4]);

    setTimeout(() => {
      const newArray = [...array];
      newArray.splice(4, 1);
      setArray(newArray);
      handleSuccess();
    }, 1000);
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
          <h2 className="text-2xl font-bold">Array Challenge</h2>
          <p className="text-muted-foreground">
            Master array operations by completing a series of challenges.
            You&apos;ll need to find elements, access specific indices, insert
            and delete elements, and sort the array.
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
            Congratulations! You&apos;ve successfully completed the Array
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
      <div className="flex justify-between items-center">
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

      {/* Array visualization */}
      <div className="bg-card rounded-lg p-4 shadow-md">
        <div className="grid grid-cols-8 gap-2 mb-4">
          {array.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: highlightedIndices.includes(index) ? 1.1 : 1,
                backgroundColor: highlightedIndices.includes(index)
                  ? "var(--primary-50, #f0f9ff)"
                  : "var(--card, white)",
              }}
              transition={{ delay: index * 0.05, duration: 0.2 }}
              className={`
                aspect-square flex items-center justify-center rounded-md border-2 cursor-pointer
                ${selectedIndex === index ? "border-primary" : "border-border"}
                ${
                  highlightedIndices.includes(index)
                    ? "bg-primary/10 text-primary font-bold"
                    : ""
                }
              `}
              onClick={() => handleCellClick(index)}
            >
              {value}
            </motion.div>
          ))}
        </div>
        <div className="grid grid-cols-8 gap-2">
          {array.map((_, index) => (
            <div
              key={`index-${index}`}
              className="text-center text-xs text-muted-foreground"
            >
              {index}
            </div>
          ))}
        </div>
      </div>

      {/* Operation buttons */}
      <div className="flex flex-wrap gap-2 justify-center">
        <Button variant="outline" onClick={handleSort}>
          Sort
        </Button>
        <Button variant="outline" onClick={handleInsert}>
          Insert at 2
        </Button>
        <Button variant="outline" onClick={handleDelete}>
          Delete at 4
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
