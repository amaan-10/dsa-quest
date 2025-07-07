/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, X, RefreshCw, Trophy, Clock, Brain } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface DPChallengeProps {
  challengeId: string;
  difficulty: "Easy" | "Medium" | "Hard";
  onComplete: (score: number, timeSpent: number) => void;
}

export function DPChallenge({
  challengeId,
  difficulty,
  onComplete,
}: DPChallengeProps) {
  const { toast } = useToast();
  const [gameState, setGameState] = useState<
    "intro" | "playing" | "success" | "failure"
  >("intro");
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [visualizationState, setVisualizationState] = useState<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  // Challenge configuration based on difficulty
  const challengeConfig = {
    Easy: {
      timeLimit: 600,
      lives: 3,
      problems: [
        {
          id: "fibonacci",
          title: "Fibonacci Numbers",
          description:
            "Implement a function to calculate the nth Fibonacci number using dynamic programming. The Fibonacci sequence is defined as: F(0) = 0, F(1) = 1, and F(n) = F(n-1) + F(n-2) for n > 1.",
          testCases: [
            { input: 5, output: 5 },
            { input: 10, output: 55 },
            { input: 20, output: 6765 },
          ],
          solution: `function fibonacci(n) {
  // Base cases
  if (n <= 1) return n;
  
  // Initialize array for memoization
  const dp = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;
  
  // Fill the dp array
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2];
  }
  
  return dp[n];
}`,
          hint: "Use an array to store previously calculated Fibonacci numbers to avoid redundant calculations.",
          visualization: {
            type: "table",
            data: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55],
          },
        },
        {
          id: "climbStairs",
          title: "Climbing Stairs",
          description:
            "You are climbing a staircase that has n steps. You can take either 1 or 2 steps at a time. How many distinct ways can you climb to the top? Implement a function that returns the number of ways for n steps.",
          testCases: [
            { input: 2, output: 2 },
            { input: 3, output: 3 },
            { input: 5, output: 8 },
          ],
          solution: `function climbStairs(n) {
  if (n <= 2) return n;
  
  // Initialize array for memoization
  const dp = new Array(n + 1);
  dp[1] = 1;
  dp[2] = 2;
  
  // Fill the dp array
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2];
  }
  
  return dp[n];
}`,
          hint: "This problem is similar to Fibonacci. The number of ways to reach step n is the sum of ways to reach step n-1 and n-2.",
          visualization: {
            type: "tree",
            data: {
              value: "n",
              children: [
                {
                  value: "n-1",
                  children: [{ value: "n-2" }, { value: "n-3" }],
                },
                {
                  value: "n-2",
                  children: [{ value: "n-3" }, { value: "n-4" }],
                },
              ],
            },
          },
        },
      ],
    },
    Medium: {
      timeLimit: 900,
      lives: 3,
      problems: [
        {
          id: "coinChange",
          title: "Coin Change",
          description:
            "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.",
          testCases: [
            { input: { coins: [1, 2, 5], amount: 11 }, output: 3 },
            { input: { coins: [2], amount: 3 }, output: -1 },
            { input: { coins: [1, 3, 4, 5], amount: 7 }, output: 2 },
          ],
          solution: `function coinChange(coins, amount) {
  // Initialize dp array with Infinity
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  
  // Fill the dp array
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
          hint: "For each amount from 1 to the target, calculate the minimum number of coins needed by considering each coin denomination.",
          visualization: {
            type: "table",
            data: [0, 1, 1, 2, 1, 1, 2, 2, 3, 3, 2, 3],
          },
        },
        {
          id: "knapsack",
          title: "0/1 Knapsack",
          description:
            "You are given weights and values of N items. Put these items in a knapsack of capacity W to get the maximum total value. You cannot break an item, either pick it completely or don't pick it at all (0/1 property).",
          testCases: [
            {
              input: {
                values: [60, 100, 120],
                weights: [10, 20, 30],
                capacity: 50,
              },
              output: 220,
            },
            {
              input: { values: [10, 15, 40], weights: [1, 2, 3], capacity: 6 },
              output: 65,
            },
          ],
          solution: `function knapsack(values, weights, capacity) {
  const n = values.length;
  const dp = Array(n + 1).fill().map(() => Array(capacity + 1).fill(0));
  
  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= capacity; w++) {
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(
          values[i - 1] + dp[i - 1][w - weights[i - 1]],
          dp[i - 1][w]
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }
  
  return dp[n][capacity];
}`,
          hint: "Use a 2D array where dp[i][w] represents the maximum value that can be obtained with the first i items and a knapsack of capacity w.",
          visualization: {
            type: "matrix",
            data: [
              [0, 0, 0, 0, 0, 0],
              [0, 10, 10, 10, 10, 10],
              [0, 10, 15, 25, 25, 25],
              [0, 10, 15, 40, 50, 65],
            ],
          },
        },
      ],
    },
    Hard: {
      timeLimit: 1200,
      lives: 3,
      problems: [
        {
          id: "editDistance",
          title: "Edit Distance",
          description:
            "Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2. You have the following three operations permitted on a word: Insert a character, Delete a character, Replace a character.",
          testCases: [
            { input: { word1: "horse", word2: "ros" }, output: 3 },
            { input: { word1: "intention", word2: "execution" }, output: 5 },
          ],
          solution: `function minDistance(word1, word2) {
  const m = word1.length;
  const n = word2.length;
  
  // Create a 2D array for memoization
  const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
  
  // Base cases: empty strings
  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
  }
  
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }
  
  // Fill the dp array
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(
          dp[i - 1][j],     // Delete
          dp[i][j - 1],     // Insert
          dp[i - 1][j - 1]  // Replace
        );
      }
    }
  }
  
  return dp[m][n];
}`,
          hint: "Use a 2D array where dp[i][j] represents the minimum edit distance between the first i characters of word1 and the first j characters of word2.",
          visualization: {
            type: "matrix",
            data: [
              [0, 1, 2, 3],
              [1, 1, 2, 3],
              [2, 2, 1, 2],
              [3, 2, 2, 2],
              [4, 3, 3, 2],
              [5, 4, 4, 3],
            ],
          },
        },
        {
          id: "longestCommonSubsequence",
          title: "Longest Common Subsequence",
          description:
            "Given two strings text1 and text2, return the length of their longest common subsequence. A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.",
          testCases: [
            { input: { text1: "abcde", text2: "ace" }, output: 3 },
            { input: { text1: "abc", text2: "abc" }, output: 3 },
            { input: { text1: "abc", text2: "def" }, output: 0 },
          ],
          solution: `function longestCommonSubsequence(text1, text2) {
  const m = text1.length;
  const n = text2.length;
  
  // Create a 2D array for memoization
  const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
  
  // Fill the dp array
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  
  return dp[m][n];
}`,
          hint: "Use a 2D array where dp[i][j] represents the length of the longest common subsequence between the first i characters of text1 and the first j characters of text2.",
          visualization: {
            type: "matrix",
            data: [
              [0, 0, 0, 0],
              [0, 1, 1, 1],
              [0, 1, 1, 1],
              [0, 1, 2, 2],
              [0, 1, 2, 2],
              [0, 1, 2, 3],
            ],
          },
        },
      ],
    },
  }[difficulty];

  // Initialize the game
  useEffect(() => {
    if (gameState === "playing") {
      startTimer();
      startTimeRef.current = Date.now();

      // Set initial visualization state
      const problem = challengeConfig.problems[currentStep];
      setVisualizationState(problem.visualization);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [gameState, currentStep]);

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

  const handleSubmitAnswer = () => {
    if (gameState !== "playing" || !answer.trim()) {
      setMessage("Please enter your solution before submitting");
      return;
    }

    const problem = challengeConfig.problems[currentStep];

    // In a real app, we would evaluate the code submission
    // For this demo, we'll check if the answer contains key parts of the solution
    const solutionParts = problem.solution
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line) => line.trim().replace(/\s+/g, " "));

    const answerParts = answer
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line) => line.trim().replace(/\s+/g, " "));

    // Check if the answer contains at least 70% of the solution parts
    const matchCount = solutionParts.filter((part) =>
      answerParts.some((answerPart) =>
        answerPart.includes(part.substring(0, Math.floor(part.length * 0.7)))
      )
    ).length;

    const matchPercentage = matchCount / solutionParts.length;

    if (matchPercentage >= 0.7) {
      // Correct answer
      handleCorrectAnswer();
    } else {
      // Incorrect answer
      handleIncorrectAnswer();
    }
  };

  const handleCorrectAnswer = () => {
    const pointsEarned =
      difficulty === "Easy" ? 100 : difficulty === "Medium" ? 200 : 300;
    setScore((prev) => prev + pointsEarned);

    setMessage(`Correct! +${pointsEarned} points`);
    toast({
      title: "Correct!",
      description: `Your solution works! You earned ${pointsEarned} points.`,
      variant: "default",
    });

    // Move to next step
    const nextStep = currentStep + 1;
    if (nextStep >= challengeConfig.problems.length) {
      // Challenge completed
      const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
      clearInterval(timerRef.current!);
      setGameState("success");
      onComplete(score + pointsEarned, timeSpent);
    } else {
      setCurrentStep(nextStep);
      setAnswer("");

      // Update visualization for the next problem
      setVisualizationState(challengeConfig.problems[nextStep].visualization);
    }
  };

  const handleIncorrectAnswer = () => {
    setLives((prev) => prev - 1);
    setMessage("Incorrect! Your solution doesn't pass all test cases.");
    toast({
      title: "Incorrect",
      description: "Your solution doesn't work for all test cases. Try again!",
      variant: "destructive",
    });

    if (lives <= 1) {
      clearInterval(timerRef.current!);
      setGameState("failure");
    }
  };

  const handleShowHint = () => {
    const problem = challengeConfig.problems[currentStep];
    toast({
      title: "Hint",
      description: problem.hint,
    });
  };

  const handleShowSolution = () => {
    const problem = challengeConfig.problems[currentStep];
    setAnswer(problem.solution);
    toast({
      title: "Solution Revealed",
      description:
        "The solution has been filled in. You'll receive fewer points if you submit now.",
      variant: "default",
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const restartGame = () => {
    setGameState("playing");
    setCurrentStep(0);
    setLives(challengeConfig.lives);
    setTimeLeft(challengeConfig.timeLimit);
    setAnswer("");
    setScore(0);
    setMessage("");
  };

  const renderVisualization = () => {
    if (!visualizationState) return null;

    switch (visualizationState.type) {
      case "table":
        return (
          <div className="overflow-x-auto">
            <div className="flex space-x-1">
              {visualizationState.data.map((value: number, index: number) => (
                <div
                  key={index}
                  className="w-10 h-10 flex items-center justify-center border rounded-md bg-muted/50"
                >
                  {value}
                </div>
              ))}
            </div>
            <div className="flex space-x-1 mt-1">
              {visualizationState.data.map((_: number, index: number) => (
                <div
                  key={index}
                  className="w-10 h-6 flex items-center justify-center text-xs text-muted-foreground"
                >
                  {index}
                </div>
              ))}
            </div>
          </div>
        );
      case "matrix":
        return (
          <div className="overflow-x-auto">
            <div className="space-y-1">
              {visualizationState.data.map(
                (row: number[], rowIndex: number) => (
                  <div key={rowIndex} className="flex space-x-1">
                    {row.map((value, colIndex) => (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        className="w-10 h-10 flex items-center justify-center border rounded-md bg-muted/50"
                      >
                        {value}
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>
        );
      case "tree":
        // Define a type for the tree node
        interface TreeNode {
          value: string;
          children?: TreeNode[];
        }
        // Simplified tree visualization
        return (
          <div className="flex justify-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center border border-primary">
                {visualizationState.data.value}
              </div>
              <div className="mt-4 flex space-x-8">
                {(visualizationState.data.children as TreeNode[]).map(
                  (child: TreeNode, index: number) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center border">
                        {child.value}
                      </div>
                      <div className="mt-2 flex space-x-4">
                        {child.children &&
                          (child.children as TreeNode[]).map(
                            (grandchild: TreeNode, idx: number) => (
                              <div
                                key={idx}
                                className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center border text-xs"
                              >
                                {grandchild.value}
                              </div>
                            )
                          )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (gameState === "intro") {
    return (
      <Card className="p-6 max-w-3xl mx-auto">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Dynamic Programming Challenge</h2>
          <p className="text-muted-foreground">
            Solve dynamic programming problems by implementing efficient
            solutions. You&apos;ll need to identify overlapping subproblems and
            optimal substructure to create solutions with memoization or
            tabulation.
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
            Congratulations! You&apos;ve successfully completed the Dynamic
            Programming Challenge.
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

  const problem = challengeConfig.problems[currentStep];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Game header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="text-sm py-1">
            Problem {currentStep + 1}/{challengeConfig.problems.length}
          </Badge>
          <Badge variant="outline" className="text-sm py-1">
            Score: {score}
          </Badge>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className={timeLeft < 300 ? "text-red-500 font-bold" : ""}>
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

      {/* Problem description */}
      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">{problem.title}</h2>
            <Brain className="h-5 w-5 text-primary" />
          </div>
          <p className="text-muted-foreground">{problem.description}</p>

          {/* Test cases */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Test Cases:</h3>
            <div className="space-y-2">
              {problem.testCases.map((testCase, index) => (
                <div key={index} className="bg-muted p-2 rounded-md text-sm">
                  <div>
                    <span className="font-medium">Input:</span>{" "}
                    <code>{JSON.stringify(testCase.input)}</code>
                  </div>
                  <div>
                    <span className="font-medium">Expected Output:</span>{" "}
                    <code>{JSON.stringify(testCase.output)}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Visualization */}
      <Card className="p-4">
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Visualization:</h3>
          <div className="flex justify-center p-4 bg-muted/30 rounded-md">
            {renderVisualization()}
          </div>
        </div>
      </Card>

      {/* Code editor */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium">Your Solution:</h3>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleShowHint}>
              Hint
            </Button>
            <Button variant="outline" size="sm" onClick={handleShowSolution}>
              Show Solution
            </Button>
          </div>
        </div>
        <Textarea
          placeholder="Write your solution here..."
          className="font-mono h-64"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <Button onClick={handleSubmitAnswer} className="w-full">
          Submit Solution
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
            {Math.round((currentStep / challengeConfig.problems.length) * 100)}%
          </span>
        </div>
        <Progress
          value={(currentStep / challengeConfig.problems.length) * 100}
          className="h-2"
        />
      </div>
    </div>
  );
}
