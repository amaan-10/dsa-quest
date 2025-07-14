import { NextResponse } from "next/server"

// This would typically come from a database
const levels = [
  {
    id: 1,
    title: "Array Valley",
    slug: "array-valley",
    difficulty: "Beginner",
    description: "Master array operations through interactive puzzles and challenges.",
    concepts: ["Array Traversal", "Searching", "Basic Sorting"],
    completionRate: 78,
    averageTime: "45 minutes",
    rating: 4.8,
    players: 12543,
    imagePath: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 2,
    title: "Linked List Labyrinth",
    slug: "linked-list-labyrinth",
    difficulty: "Intermediate",
    description: "Navigate the maze of linked lists, solving puzzles that test your understanding.",
    concepts: ["Singly Linked Lists", "Doubly Linked Lists", "List Operations"],
    completionRate: 65,
    averageTime: "1 hour",
    rating: 4.6,
    players: 8765,
    imagePath: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 3,
    title: "Tree of Knowledge",
    slug: "tree-of-knowledge",
    difficulty: "Advanced",
    description: "Climb the tree of knowledge, mastering tree data structures along the way.",
    concepts: ["Binary Trees", "BST", "Tree Traversal"],
    completionRate: 52,
    averageTime: "1.5 hours",
    rating: 4.9,
    players: 6543,
    imagePath: "/placeholder.svg?height=200&width=400",
  },
  // More levels would be added here
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const difficulty = searchParams.get("difficulty")
  const concept = searchParams.get("concept")
  const search = searchParams.get("search")

  let filteredLevels = [...levels]

  if (difficulty && difficulty !== "all") {
    filteredLevels = filteredLevels.filter((level) => level.difficulty.toLowerCase() === difficulty.toLowerCase())
  }

  if (concept && concept !== "all") {
    filteredLevels = filteredLevels.filter((level) =>
      level.concepts.some((c) => c.toLowerCase().includes(concept.toLowerCase())),
    )
  }

  if (search) {
    filteredLevels = filteredLevels.filter(
      (level) =>
        level.title.toLowerCase().includes(search.toLowerCase()) ||
        level.description.toLowerCase().includes(search.toLowerCase()),
    )
  }

  return NextResponse.json(filteredLevels)
}
