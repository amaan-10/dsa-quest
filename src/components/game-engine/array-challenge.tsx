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

// Define the ChallengeConfig type
type ChallengeConfig = {
  arraySize: number;
  operations: string[];
  timeLimit: number;
  lives: number;
};

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
  const [timeLeft, setTimeLeft] = useState(120);
  const [array, setArray] = useState<number[]>([]);
  const [targetValue, setTargetValue] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [highlightedIndices, setHighlightedIndices] = useState<number[]>([]);
  const [message, setMessage] = useState("");
  const [rotationSteps, setRotationSteps] = useState(0);
  const [searchRange, setSearchRange] = useState<[number, number]>([0, 0]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  // Challenge configuration based on difficulty and challenge type
  const challengeConfigs: Record<string, ChallengeConfig> = {
    "Array Basics": {
      arraySize: difficulty === "Easy" ? 8 : difficulty === "Medium" ? 12 : 16,
      operations: ["access", "insert", "delete", "sort"],
      timeLimit:
        difficulty === "Easy" ? 120 : difficulty === "Medium" ? 180 : 240,
      lives: 3,
    },
    "Linear Search": {
      arraySize: difficulty === "Easy" ? 8 : difficulty === "Medium" ? 12 : 16,
      operations: ["find"],
      timeLimit:
        difficulty === "Easy" ? 120 : difficulty === "Medium" ? 180 : 240,
      lives: 3,
    },
    "Binary Search": {
      arraySize: difficulty === "Easy" ? 8 : difficulty === "Medium" ? 12 : 16,
      operations: ["binary-search"],
      timeLimit:
        difficulty === "Easy" ? 180 : difficulty === "Medium" ? 240 : 300,
      lives: 3,
    },
    "Array Rotation": {
      arraySize: difficulty === "Easy" ? 8 : difficulty === "Medium" ? 10 : 12,
      operations: ["rotate"],
      timeLimit:
        difficulty === "Easy" ? 150 : difficulty === "Medium" ? 210 : 270,
      lives: 3,
    },
  };

  // Then select the config
  const challengeConfig =
    challengeConfigs[challengeId] || challengeConfigs["Array Basics"];

  // Generate challenge steps based on challenge type
  const challengeSteps = () => {
    switch (challengeId) {
      case "Linear Search":
        return [
          {
            type: "find",
            instruction: `Find the value ${targetValue} in the array.`,
            validate: (clickedIndex?: number) =>
              clickedIndex !== null && array[clickedIndex || 0] === targetValue,
          },
        ];

      case "Binary Search":
        return [
          {
            type: "binary-search",
            instruction: `Find ${targetValue} using binary search. Select midpoints.`,
            validate: (clickedIndex?: number) =>
              clickedIndex !== null && array[clickedIndex || 0] === targetValue,
          },
        ];

      case "Array Rotation":
        return [
          {
            type: "rotate",
            instruction: `Rotate the array ${rotationSteps} steps to the ${
              rotationSteps > 0 ? "right" : "left"
            }.`,
            validate: () => {
              const rotated = rotateArray([...array], rotationSteps);
              return arraysEqual(array, rotated);
            },
          },
        ];

      // Array Basics (default)
      default:
        return [
          {
            type: "access",
            instruction: "Select the element at index 3.",
            validate: (clickedIndex?: number) => clickedIndex === 3,
          },
          {
            type: "insert",
            instruction: `Insert ${targetValue} at index 2.`,
            validate: () => array[2] === targetValue,
          },
          {
            type: "delete",
            instruction: "Delete the element at index 4.",
            validate: () => true,
          },
          {
            type: "sort",
            instruction: "Sort the array in ascending order.",
            validate: () => {
              for (let i = 0; i < array.length - 1; i++) {
                if (array[i] > array[i + 1]) return false;
              }
              return true;
            },
          },
        ];
    }
  };

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
    let newArray: number[] = [];
    const size = challengeConfig.arraySize;

    if (challengeId === "Binary Search") {
      // Sorted array for binary search
      newArray = Array.from({ length: size }, () =>
        Math.floor(Math.random() * 100)
      );
      newArray.sort((a, b) => a - b);
    } else {
      // Regular array for other challenges
      newArray = Array.from({ length: size }, () =>
        Math.floor(Math.random() * 100)
      );
    }

    setArray(newArray);

    // Set target value
    const randomIndex = Math.floor(Math.random() * newArray.length);
    setTargetValue(newArray[randomIndex]);

    // Initialize rotation steps
    if (challengeId === "Array Rotation") {
      const steps = difficulty === "Easy" ? 2 : difficulty === "Medium" ? 3 : 4;
      setRotationSteps(Math.random() > 0.5 ? steps : -steps);
    }

    // Initialize binary search range
    if (challengeId === "Binary Search") {
      setSearchRange([0, newArray.length - 1]);
    }

    setLives(challengeConfig.lives);
    setTimeLeft(challengeConfig.timeLimit);
    setScore(0);
    setCurrentStep(0);
    setSelectedIndex(null);
    setHighlightedIndices([]);
    setMessage("");
  };

  // Helper function to rotate arrays
  const rotateArray = (arr: number[], steps: number): number[] => {
    if (arr.length === 0) return arr;
    const k = Math.abs(steps) % arr.length;
    if (steps > 0) {
      // Rotate right
      return [...arr.slice(arr.length - k), ...arr.slice(0, arr.length - k)];
    } else {
      // Rotate left
      return [...arr.slice(k), ...arr.slice(0, k)];
    }
  };

  // Helper to compare arrays
  const arraysEqual = (a: number[], b: number[]): boolean => {
    return a.length === b.length && a.every((val, i) => val === b[i]);
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
    setHighlightedIndices([index]);

    const currentChallenge = challengeSteps()[currentStep];

    if (challengeId === "Binary Search") {
      handleBinarySearchStep(index);
      return;
    }

    if (
      currentChallenge.type === "find" ||
      currentChallenge.type === "access" ||
      currentChallenge.type === "binary-search"
    ) {
      if (currentChallenge.validate(index)) {
        handleSuccess();
      } else {
        handleFailure();
      }
    }
  };

  const handleBinarySearchStep = (clickedIndex: number) => {
    const [low, high] = searchRange;
    const mid = Math.floor((low + high) / 2);

    if (clickedIndex !== mid) {
      handleFailure();
      return;
    }

    if (array[mid] === targetValue) {
      handleSuccess();
    } else if (array[mid] < targetValue!) {
      setSearchRange([mid + 1, high]);
      setMessage(`Target is higher than ${array[mid]}. Searching right half.`);
    } else {
      setSearchRange([low, mid - 1]);
      setMessage(`Target is lower than ${array[mid]}. Searching left half.`);
    }

    // Highlight new search range
    const [newLow, newHigh] = searchRange;
    const indices = Array.from(
      { length: newHigh - newLow + 1 },
      (_, i) => newLow + i
    );
    setHighlightedIndices(indices);
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

    const nextStep = currentStep + 1;
    if (nextStep >= challengeSteps().length) {
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

    const sortedArray = [...array].sort((a, b) => a - b);
    setHighlightedIndices(Array.from({ length: array.length }, (_, i) => i));

    setTimeout(() => {
      setArray(sortedArray);
      const currentChallenge = challengeSteps()[currentStep];
      if (currentChallenge.validate()) {
        handleSuccess();
      } else {
        handleFailure();
      }
    }, 1000);
  };

  const handleInsert = () => {
    if (gameState !== "playing" || targetValue === null) return;

    const newArray = [...array];
    newArray.splice(2, 0, targetValue);
    setHighlightedIndices([2]);

    setTimeout(() => {
      setArray(newArray);
      const currentChallenge = challengeSteps()[currentStep];
      if (currentChallenge.validate()) {
        handleSuccess();
      } else {
        handleFailure();
      }
    }, 1000);
  };

  const handleDelete = () => {
    if (gameState !== "playing") return;

    setHighlightedIndices([4]);

    setTimeout(() => {
      const newArray = [...array];
      newArray.splice(4, 1);
      setArray(newArray);
      handleSuccess();
    }, 1000);
  };

  const handleRotate = (direction: "left" | "right") => {
    if (gameState !== "playing") return;

    const steps = direction === "right" ? 1 : -1;
    setArray((prev) => rotateArray(prev, steps));

    // Highlight all cells during rotation
    setHighlightedIndices(Array.from({ length: array.length }, (_, i) => i));

    setTimeout(() => {
      const currentChallenge = challengeSteps()[currentStep];
      if (currentChallenge.validate()) {
        handleSuccess();
      }
    }, 500);
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
      <div className="flex flex-wrap gap-2 justify-between items-center">
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="text-sm py-1">
            {challengeId}
          </Badge>
          <Badge variant="outline" className="text-sm py-1">
            Step {currentStep + 1}/{challengeSteps().length}
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
          {challengeSteps()[currentStep].instruction}
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
                ${
                  challengeId === "Binary Search" &&
                  (index < searchRange[0] || index > searchRange[1])
                    ? "opacity-50"
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
        {challengeId === "Array Basics" && (
          <>
            <Button variant="outline" onClick={handleSort}>
              Sort
            </Button>
            <Button variant="outline" onClick={handleInsert}>
              Insert at 2
            </Button>
            <Button variant="outline" onClick={handleDelete}>
              Delete at 4
            </Button>
          </>
        )}

        {challengeId === "Array Rotation" && (
          <>
            <Button variant="outline" onClick={() => handleRotate("left")}>
              Rotate Left
            </Button>
            <Button variant="outline" onClick={() => handleRotate("right")}>
              Rotate Right
            </Button>
          </>
        )}
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
            {Math.round((currentStep / challengeSteps().length) * 100)}%
          </span>
        </div>
        <Progress
          value={(currentStep / challengeSteps().length) * 100}
          className="h-2"
        />
      </div>
    </div>
  );
}
