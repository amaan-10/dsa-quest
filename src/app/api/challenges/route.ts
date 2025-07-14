import { NextResponse } from "next/server"

// This would typically come from a database
const challenges = [
  {
    id: 1,
    levelId: 1,
    title: "Array Explorer",
    description: "Navigate through an array, collecting elements in the correct order.",
    difficulty: "Easy",
    xp: 100,
    completionRate: 85,
    averageTime: "15 minutes",
  },
  {
    id: 2,
    levelId: 1,
    title: "Search and Rescue",
    description: "Implement linear and binary search to find hidden elements.",
    difficulty: "Medium",
    xp: 200,
    completionRate: 72,
    averageTime: "25 minutes",
  },
  {
    id: 3,
    levelId: 1,
    title: "Sort Master",
    description: "Sort arrays using different techniques and compare their efficiency.",
    difficulty: "Medium",
    xp: 250,
    completionRate: 68,
    averageTime: "30 minutes",
  },
  {
    id: 4,
    levelId: 1,
    title: "Array Boss Battle",
    description: "Combine all your array knowledge to defeat the Array Guardian.",
    difficulty: "Hard",
    xp: 500,
    completionRate: 45,
    averageTime: "45 minutes",
  },
  // More challenges would be added here
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const levelId = searchParams.get("levelId")
  const difficulty = searchParams.get("difficulty")

  let filteredChallenges = [...challenges]

  if (levelId) {
    filteredChallenges = filteredChallenges.filter((challenge) => challenge.levelId === Number.parseInt(levelId))
  }

  if (difficulty && difficulty !== "all") {
    filteredChallenges = filteredChallenges.filter(
      (challenge) => challenge.difficulty.toLowerCase() === difficulty.toLowerCase(),
    )
  }

  return NextResponse.json(filteredChallenges)
}
