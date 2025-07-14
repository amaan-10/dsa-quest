import { NextResponse } from "next/server"

// Sample visualization data
const visualizations = {
  array: {
    operations: ["access", "search", "insert", "delete", "sort"],
    complexities: {
      access: "O(1)",
      search: "O(n)",
      insert: "O(n)",
      delete: "O(n)",
      sort: "O(n log n)",
    },
    examples: [
      { operation: "access", input: "[1,2,3,4,5]", index: 2, output: 3 },
      { operation: "search", input: "[1,2,3,4,5]", target: 4, output: 3 },
    ],
  },
  linkedlist: {
    operations: ["insert", "delete", "search", "traverse"],
    complexities: {
      insert: "O(1) at head, O(n) at position",
      delete: "O(1) at head, O(n) at position",
      search: "O(n)",
      traverse: "O(n)",
    },
    examples: [
      { operation: "insert", position: "head", value: 10 },
      { operation: "delete", position: "tail" },
    ],
  },
  tree: {
    operations: ["insert", "delete", "search", "traverse"],
    traversals: ["inorder", "preorder", "postorder", "levelorder"],
    complexities: {
      insert: "O(log n) average, O(n) worst",
      delete: "O(log n) average, O(n) worst",
      search: "O(log n) average, O(n) worst",
    },
  },
  graph: {
    algorithms: ["bfs", "dfs", "dijkstra", "mst"],
    representations: ["adjacency_list", "adjacency_matrix"],
    complexities: {
      bfs: "O(V + E)",
      dfs: "O(V + E)",
      dijkstra: "O(V²) or O(E log V)",
      mst: "O(E log V)",
    },
  },
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")

  if (type && visualizations[type as keyof typeof visualizations]) {
    return NextResponse.json({
      success: true,
      data: visualizations[type as keyof typeof visualizations],
    })
  }

  return NextResponse.json({
    success: true,
    data: visualizations,
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, operation, data } = body

    // Simulate processing the visualization request
    const result = {
      success: true,
      type,
      operation,
      result: `Processed ${operation} on ${type}`,
      data,
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Invalid request body" }, { status: 400 })
  }
}
