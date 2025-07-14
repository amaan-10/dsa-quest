import { NextResponse } from "next/server"

// This would typically come from a database
const leaderboardData = {
  global: [
    {
      rank: 1,
      username: "AlgoMaster",
      avatar: "/placeholder.svg?height=50&width=50",
      level: 42,
      challenges: 156,
      score: 9845,
      streak: 15,
      country: "🇺🇸",
    },
    {
      rank: 2,
      username: "CodeNinja",
      avatar: "/placeholder.svg?height=50&width=50",
      level: 39,
      challenges: 142,
      score: 9254,
      streak: 12,
      country: "🇯🇵",
    },
    {
      rank: 3,
      username: "ByteWizard",
      avatar: "/placeholder.svg?height=50&width=50",
      level: 37,
      challenges: 138,
      score: 8932,
      streak: 8,
      country: "🇩🇪",
    },
    {
      rank: 4,
      username: "DataDragon",
      avatar: "/placeholder.svg?height=50&width=50",
      level: 35,
      challenges: 129,
      score: 8567,
      streak: 6,
      country: "🇨🇦",
    },
    {
      rank: 5,
      username: "SortingSpecialist",
      avatar: "/placeholder.svg?height=50&width=50",
      level: 33,
      challenges: 124,
      score: 8123,
      streak: 10,
      country: "🇬🇧",
    },
  ],
  weekly: [
    {
      rank: 1,
      username: "WeeklyWarrior",
      avatar: "/placeholder.svg?height=50&width=50",
      score: 1250,
      challenges: 25,
      country: "🇺🇸",
    },
    {
      rank: 2,
      username: "SpeedSolver",
      avatar: "/placeholder.svg?height=50&width=50",
      score: 1180,
      challenges: 22,
      country: "🇯🇵",
    },
    {
      rank: 3,
      username: "QuickQuester",
      avatar: "/placeholder.svg?height=50&width=50",
      score: 1095,
      challenges: 20,
      country: "🇩🇪",
    },
  ],
}

type GlobalEntry = {
  rank: number;
  username: string;
  avatar: string;
  level: number;
  challenges: number;
  score: number;
  streak: number;
  country: string;
};

type WeeklyEntry = {
  rank: number;
  username: string;
  avatar: string;
  score: number;
  challenges: number;
  country: string;
};

type LeaderboardEntry = GlobalEntry | WeeklyEntry;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type") || "global"
  const limit = Number.parseInt(searchParams.get("limit") || "10")

  let data: LeaderboardEntry[] = leaderboardData.global
  if (type === "weekly") {
    data = leaderboardData.weekly
  }

  // Apply limit
  const limitedData = data.slice(0, limit)

  return NextResponse.json({
    success: true,
    data: limitedData,
    total: data.length,
  })
}
