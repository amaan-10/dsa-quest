import { NextResponse } from "next/server"

// This would typically come from a database based on the authenticated user
const userProgress = {
  userId: 1,
  username: "TestUser",
  level: 15,
  xp: 4250,
  nextLevelXp: 5000,
  completedLevels: [
    {
      id: 1,
      title: "Array Valley",
      completedAt: "2023-04-15T10:30:00Z",
      score: 850,
      stars: 3,
    },
    {
      id: 2,
      title: "Linked List Labyrinth",
      completedAt: "2023-04-20T14:45:00Z",
      score: 720,
      stars: 2,
    },
  ],
  completedChallenges: [
    {
      id: 1,
      title: "Array Explorer",
      completedAt: "2023-04-10T09:15:00Z",
      score: 95,
      timeSpent: "12 minutes",
    },
    {
      id: 2,
      title: "Search and Rescue",
      completedAt: "2023-04-12T11:20:00Z",
      score: 85,
      timeSpent: "22 minutes",
    },
    {
      id: 3,
      title: "Sort Master",
      completedAt: "2023-04-14T16:30:00Z",
      score: 90,
      timeSpent: "28 minutes",
    },
    {
      id: 4,
      title: "Array Boss Battle",
      completedAt: "2023-04-15T10:30:00Z",
      score: 78,
      timeSpent: "40 minutes",
    },
  ],
  achievements: [
    {
      id: 1,
      title: "Array Master",
      description: "Complete all challenges in Array Valley",
      unlockedAt: "2023-04-15T10:30:00Z",
      icon: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 2,
      title: "Quick Learner",
      description: "Complete 5 challenges in under 15 minutes each",
      unlockedAt: "2023-04-20T14:45:00Z",
      icon: "/placeholder.svg?height=50&width=50",
    },
  ],
  currentStreak: 5,
  longestStreak: 12,
}

export async function GET() {
  // In a real app, we would verify the user is authenticated
  // and return their specific progress data

  return NextResponse.json(userProgress)
}
