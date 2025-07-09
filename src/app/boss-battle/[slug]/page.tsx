/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Trophy,
  Clock,
  Heart,
  Zap,
  Shield,
  Boxes,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface BossBattleProps {
  params: { slug: string };
}

export default function BossBattlePage({ params }: BossBattleProps) {
  const { toast } = useToast();
  const [gameState, setGameState] = useState<
    "intro" | "playing" | "success" | "failure"
  >("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [playerHealth, setPlayerHealth] = useState(100);
  const [bossHealth, setBossHealth] = useState(100);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [isAttacking, setIsAttacking] = useState(false);
  const [isBossAttacking, setIsBossAttacking] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  // This would normally be fetched from a database based on the slug
  const bossBattle = {
    title: "Array Guardian",
    slug: "array-guardian",
    description:
      "Defeat the Array Guardian by solving complex array algorithm challenges.",
    image: "/placeholder.svg?height=300&width=300",
    questions: [
      {
        id: 1,
        text: "Write a function to find the maximum subarray sum in an array of integers. For example, for the array [-2, 1, -3, 4, -1, 2, 1, -5, 4], the contiguous subarray [4, -1, 2, 1] has the largest sum = 6.",
        hint: "Consider using Kadane's algorithm.",
        solution: `function maxSubarraySum(arr) {
  let maxSoFar = arr[0];
  let maxEndingHere = arr[0];
  
  for (let i = 1; i < arr.length; i++) {
    maxEndingHere = Math.max(arr[i], maxEndingHere + arr[i]);
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }
  
  return maxSoFar;
}`,
        difficulty: "Medium",
        damage: 20,
      },
      {
        id: 2,
        text: "Write a function to find all pairs of elements in an array whose sum is equal to a given target. For example, if the array is [1, 5, 7, 1, 5] and the target is 6, the function should return [[1, 5], [1, 5]].",
        hint: "Consider using a hash map to store elements you've seen.",
        solution: `function findPairs(arr, target) {
  const result = [];
  const seen = {};
  
  for (let i = 0; i < arr.length; i++) {
    const complement = target - arr[i];
    
    if (seen[complement]) {
      result.push([complement, arr[i]]);
    }
    
    seen[arr[i]] = true;
  }
  
  return result;
}`,
        difficulty: "Medium",
        damage: 25,
      },
      {
        id: 3,
        text: "Write a function to rotate an array of n elements to the right by k steps. For example, with n = 7 and k = 3, the array [1, 2, 3, 4, 5, 6, 7] is rotated to [5, 6, 7, 1, 2, 3, 4].",
        hint: "Consider using array reversal.",
        solution: `function rotateArray(arr, k) {
  k = k % arr.length;
  
  // Reverse the entire array
  reverse(arr, 0, arr.length - 1);
  
  // Reverse the first k elements
  reverse(arr, 0, k - 1);
  
  // Reverse the remaining elements
  reverse(arr, k, arr.length - 1);
  
  return arr;
}

function reverse(arr, start, end) {
  while (start < end) {
    const temp = arr[start];
    arr[start] = arr[end];
    arr[end] = temp;
    start++;
    end--;
  }
}`,
        difficulty: "Hard",
        damage: 30,
      },
    ],
  };

  // Initialize the game
  useEffect(() => {
    if (gameState === "playing") {
      startTimer();
      startTimeRef.current = Date.now();
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [gameState]);

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
      description: "You ran out of time. The Array Guardian has defeated you!",
      variant: "destructive",
    });
  };

  const handleSubmitAnswer = () => {
    if (gameState !== "playing" || answer.trim() === "") return;

    const currentQ = bossBattle.questions[currentQuestion];

    // In a real app, we would evaluate the code submission
    // For this demo, we'll just check if the answer contains key parts of the solution
    const solutionParts = currentQ.solution
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
    const damage = bossBattle.questions[currentQuestion].damage;

    // Player attacks boss
    setIsAttacking(true);
    setTimeout(() => {
      setIsAttacking(false);
      setBossHealth((prev) => Math.max(0, prev - damage));

      // Check if boss is defeated
      if (bossHealth - damage <= 0) {
        handleBossDefeated();
        return;
      }

      // Boss attacks player after a delay
      setTimeout(() => {
        handleBossAttack();
      }, 1000);
    }, 1000);

    // Update score and message
    setScore((prev) => prev + damage * 10);
    setMessage(`Correct! You dealt ${damage} damage to the boss.`);
    toast({
      title: "Correct!",
      description: `You dealt ${damage} damage to the Array Guardian.`,
      variant: "default",
    });

    // Move to next question
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < bossBattle.questions.length) {
      setCurrentQuestion(nextQuestion);
      setAnswer("");
    } else {
      // No more questions, but boss still has health
      // Reset to first question
      setCurrentQuestion(0);
      setAnswer("");
    }
  };

  const handleIncorrectAnswer = () => {
    // Boss attacks player
    handleBossAttack();

    setMessage("Incorrect! The boss attacked you.");
    toast({
      title: "Incorrect",
      description:
        "Your solution didn't work. The Array Guardian attacked you!",
      variant: "destructive",
    });
  };

  const handleBossAttack = () => {
    const damage = Math.floor(Math.random() * 10) + 10; // Random damage between 10-20

    setIsBossAttacking(true);
    setTimeout(() => {
      setIsBossAttacking(false);
      setPlayerHealth((prev) => Math.max(0, prev - damage));

      // Check if player is defeated
      if (playerHealth - damage <= 0) {
        handlePlayerDefeated();
      }
    }, 1000);
  };

  const handleBossDefeated = () => {
    clearInterval(timerRef.current!);
    setGameState("success");
    toast({
      title: "Victory!",
      description: "You've defeated the Array Guardian!",
    });
  };

  const handlePlayerDefeated = () => {
    clearInterval(timerRef.current!);
    setGameState("failure");
    toast({
      title: "Defeat!",
      description: "The Array Guardian has defeated you!",
      variant: "destructive",
    });
  };

  const handleShowHint = () => {
    toast({
      title: "Hint",
      description: bossBattle.questions[currentQuestion].hint,
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const restartGame = () => {
    setGameState("playing");
    setCurrentQuestion(0);
    setPlayerHealth(100);
    setBossHealth(100);
    setTimeLeft(300);
    setAnswer("");
    setScore(0);
    setMessage("");
    setIsAttacking(false);
    setIsBossAttacking(false);
  };

  if (gameState === "intro") {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-xl"
            >
              <Boxes className="h-6 w-6 text-primary" />
              <span>RannNeeti</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/levels">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Levels
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 container py-8">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="pt-6">
              <div className="text-center space-y-6">
                <h1 className="text-3xl font-bold">
                  Boss Battle: {bossBattle.title}
                </h1>

                <div className="relative w-48 h-48 mx-auto">
                  <Image
                    src={bossBattle.image || "/placeholder.svg"}
                    alt={bossBattle.title}
                    fill
                    className="object-cover rounded-full border-4 border-primary"
                  />
                </div>

                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {bossBattle.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                  <div className="bg-muted p-4 rounded-md text-center">
                    <Heart className="h-6 w-6 text-red-500 mx-auto mb-2" />
                    <div className="text-sm font-medium">Your Health</div>
                    <div className="text-2xl font-bold">100</div>
                  </div>
                  <div className="bg-muted p-4 rounded-md text-center">
                    <Shield className="h-6 w-6 text-primary mx-auto mb-2" />
                    <div className="text-sm font-medium">Boss Health</div>
                    <div className="text-2xl font-bold">100</div>
                  </div>
                  <div className="bg-muted p-4 rounded-md text-center">
                    <Clock className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
                    <div className="text-sm font-medium">Time Limit</div>
                    <div className="text-2xl font-bold">5:00</div>
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-md max-w-2xl mx-auto">
                  <h2 className="font-bold mb-2">Battle Rules:</h2>
                  <ul className="text-sm text-muted-foreground text-left list-disc list-inside space-y-1">
                    <li>Solve coding challenges to attack the boss</li>
                    <li>Correct solutions deal damage to the boss</li>
                    <li>Incorrect solutions allow the boss to attack you</li>
                    <li>
                      Defeat the boss before time runs out or your health
                      reaches zero
                    </li>
                    <li>
                      You can use hints, but they won&apos;t help you deal
                      maximum damage
                    </li>
                  </ul>
                </div>

                <Button
                  onClick={() => setGameState("playing")}
                  size="lg"
                  className="mt-4"
                >
                  Start Battle
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>

        <footer className="border-t py-6 bg-muted/30">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-2 font-bold text-xl mb-4 md:mb-0">
                <Boxes className="h-6 w-6 text-primary" />
                <span>RannNeeti</span>
              </div>
              <div className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} RannNeeti. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  if (gameState === "success") {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-xl"
            >
              <Boxes className="h-6 w-6 text-primary" />
              <span>RannNeeti</span>
            </Link>
          </div>
        </header>

        <main className="flex-1 container py-8">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="pt-6">
              <div className="text-center space-y-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto"
                >
                  <Trophy className="h-12 w-12 text-green-600" />
                </motion.div>

                <h1 className="text-3xl font-bold">Victory!</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Congratulations! You&apos;ve defeated the {bossBattle.title}{" "}
                  and proven your mastery of array algorithms.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                  <div className="bg-muted p-4 rounded-md text-center">
                    <Heart className="h-6 w-6 text-red-500 mx-auto mb-2" />
                    <div className="text-sm font-medium">Your Health</div>
                    <div className="text-2xl font-bold">{playerHealth}</div>
                  </div>
                  <div className="bg-muted p-4 rounded-md text-center">
                    <Zap className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
                    <div className="text-sm font-medium">Final Score</div>
                    <div className="text-2xl font-bold">{score}</div>
                  </div>
                  <div className="bg-muted p-4 rounded-md text-center">
                    <Clock className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                    <div className="text-sm font-medium">Time Remaining</div>
                    <div className="text-2xl font-bold">
                      {formatTime(timeLeft)}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center space-x-4 mt-4">
                  <Button onClick={restartGame} variant="outline">
                    Battle Again
                  </Button>
                  <Link href="/levels">
                    <Button>Continue Journey</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>

        <footer className="border-t py-6 bg-muted/30">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-2 font-bold text-xl mb-4 md:mb-0">
                <Boxes className="h-6 w-6 text-primary" />
                <span>RannNeeti</span>
              </div>
              <div className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} RannNeeti. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  if (gameState === "failure") {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-xl"
            >
              <Boxes className="h-6 w-6 text-primary" />
              <span>RannNeeti</span>
            </Link>
          </div>
        </header>

        <main className="flex-1 container py-8">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="pt-6">
              <div className="text-center space-y-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto"
                >
                  <Shield className="h-12 w-12 text-red-600" />
                </motion.div>

                <h1 className="text-3xl font-bold">Defeat!</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  The {bossBattle.title} has defeated you. Don&apos;t worry, you
                  can try again and come back stronger!
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                  <div className="bg-muted p-4 rounded-md text-center">
                    <Heart className="h-6 w-6 text-red-500 mx-auto mb-2" />
                    <div className="text-sm font-medium">Your Health</div>
                    <div className="text-2xl font-bold">{playerHealth}</div>
                  </div>
                  <div className="bg-muted p-4 rounded-md text-center">
                    <Shield className="h-6 w-6 text-primary mx-auto mb-2" />
                    <div className="text-sm font-medium">Boss Health</div>
                    <div className="text-2xl font-bold">{bossHealth}</div>
                  </div>
                  <div className="bg-muted p-4 rounded-md text-center">
                    <Zap className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
                    <div className="text-sm font-medium">Score</div>
                    <div className="text-2xl font-bold">{score}</div>
                  </div>
                </div>

                <div className="flex justify-center space-x-4 mt-4">
                  <Button onClick={restartGame}>Try Again</Button>
                  <Link href="/levels">
                    <Button variant="outline">Return to Levels</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>

        <footer className="border-t py-6 bg-muted/30">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-2 font-bold text-xl mb-4 md:mb-0">
                <Boxes className="h-6 w-6 text-primary" />
                <span>RannNeeti</span>
              </div>
              <div className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} RannNeeti. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Boxes className="h-6 w-6 text-primary" />
            <span>RannNeeti</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="text-sm">
              Time:{" "}
              <span
                className={
                  timeLeft < 60 ? "text-red-500 font-bold" : "font-medium"
                }
              >
                {formatTime(timeLeft)}
              </span>
            </div>
            <div className="text-sm">
              Score: <span className="font-medium">{score}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Battle arena */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold">
                    Boss Battle: {bossBattle.title}
                  </h1>
                  <p className="text-muted-foreground">
                    Solve coding challenges to defeat the boss!
                  </p>
                </div>
                <Badge
                  className={`text-white ${
                    bossBattle.questions[currentQuestion].difficulty === "Easy"
                      ? "bg-green-500"
                      : bossBattle.questions[currentQuestion].difficulty ===
                        "Medium"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                >
                  {bossBattle.questions[currentQuestion].difficulty}
                </Badge>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-lg font-medium mb-4">
                    Challenge {currentQuestion + 1}/
                    {bossBattle.questions.length}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {bossBattle.questions[currentQuestion].text}
                  </p>

                  <div className="space-y-4">
                    <Textarea
                      placeholder="Write your solution here..."
                      className="font-mono h-64"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                    />

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={handleShowHint}>
                        Show Hint
                      </Button>
                      <Button onClick={handleSubmitAnswer}>
                        Submit Solution
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {message && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-md ${
                    message.includes("Correct")
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {message}
                </motion.div>
              )}
            </div>

            {/* Battle status */}
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-lg font-medium mb-4">Battle Status</h2>

                  <div className="space-y-6">
                    {/* Player health */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Heart className="h-5 w-5 text-red-500 mr-2" />
                          <span className="font-medium">Your Health</span>
                        </div>
                        <span
                          className={
                            playerHealth < 30
                              ? "text-red-500 font-bold"
                              : "font-medium"
                          }
                        >
                          {playerHealth}/100
                        </span>
                      </div>
                      <Progress value={playerHealth} className="h-2" />

                      {/* Player attack animation */}
                      <AnimatePresence>
                        {isAttacking && (
                          <motion.div
                            initial={{ opacity: 0, x: 0 }}
                            animate={{ opacity: 1, x: 20 }}
                            exit={{ opacity: 0 }}
                            className="text-center text-green-600 font-bold"
                          >
                            ATTACK! 🗡️
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Boss health */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Shield className="h-5 w-5 text-primary mr-2" />
                          <span className="font-medium">Boss Health</span>
                        </div>
                        <span
                          className={
                            bossHealth < 30
                              ? "text-red-500 font-bold"
                              : "font-medium"
                          }
                        >
                          {bossHealth}/100
                        </span>
                      </div>
                      <Progress value={bossHealth} className="h-2 bg-muted" />

                      {/* Boss attack animation */}
                      <AnimatePresence>
                        {isBossAttacking && (
                          <motion.div
                            initial={{ opacity: 0, x: 0 }}
                            animate={{ opacity: 1, x: -20 }}
                            exit={{ opacity: 0 }}
                            className="text-center text-red-600 font-bold"
                          >
                            BOSS ATTACK! 💥
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="relative w-full h-64 bg-muted rounded-md overflow-hidden">
                    <Image
                      src={bossBattle.image || "/placeholder.svg"}
                      alt={bossBattle.title}
                      fill
                      className="object-contain"
                    />

                    {/* Boss damage animation */}
                    <AnimatePresence>
                      {isAttacking && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-red-500/30"
                        />
                      )}
                    </AnimatePresence>
                  </div>

                  <h3 className="text-xl font-bold text-center mt-4">
                    {bossBattle.title}
                  </h3>
                  <p className="text-sm text-muted-foreground text-center">
                    A powerful guardian that tests your array algorithm mastery
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-6 bg-muted/30">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 font-bold text-xl mb-4 md:mb-0">
              <Boxes className="h-6 w-6 text-primary" />
              <span>RannNeeti</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} RannNeeti. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
