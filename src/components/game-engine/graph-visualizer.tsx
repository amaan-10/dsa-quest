/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Plus, Minus, RotateCcw, Play, Pause } from "lucide-react";

interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

interface GraphEdge {
  id: string;
  source: string;
  target: string;
  weight?: number;
  directed?: boolean;
}

interface GraphVisualizerProps {
  initialNodes?: GraphNode[];
  initialEdges?: GraphEdge[];
  directed?: boolean;
  weighted?: boolean;
}

export function GraphVisualizer({
  initialNodes = [],
  initialEdges = [],
  directed = false,
  weighted = false,
}: GraphVisualizerProps) {
  const [nodes, setNodes] = useState<GraphNode[]>(
    initialNodes.length > 0 ? initialNodes : []
  );
  const [edges, setEdges] = useState<GraphEdge[]>(
    initialEdges.length > 0 ? initialEdges : []
  );
  const [nodeLabel, setNodeLabel] = useState("");
  const [sourceNode, setSourceNode] = useState("");
  const [targetNode, setTargetNode] = useState("");
  const [edgeWeight, setEdgeWeight] = useState("1");
  const [isDirected, setIsDirected] = useState(directed);
  const [isWeighted, setIsWeighted] = useState(weighted);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<string | null>(null);
  const [highlightedNodes, setHighlightedNodes] = useState<string[]>([]);
  const [highlightedEdges, setHighlightedEdges] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [algorithm, setAlgorithm] = useState<
    "bfs" | "dfs" | "dijkstra" | "mst"
  >("bfs");
  const [startNode, setStartNode] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  type AlgorithmStep = {
    type: "visit-node" | "visit-edge";
    visited: string[];
    edges: string[];
  };
  const [algorithmSteps, setAlgorithmSteps] = useState<AlgorithmStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const animationRef = useRef<number | null>(null);

  // Initialize with a sample graph if none provided
  useEffect(() => {
    if (
      initialNodes.length === 0 &&
      initialEdges.length === 0 &&
      nodes.length === 0 &&
      edges.length === 0
    ) {
      createSampleGraph();
    }
  }, [initialNodes, initialEdges, nodes, edges]);

  // Handle algorithm animation
  useEffect(() => {
    if (isRunning && currentStep < algorithmSteps.length) {
      const step = algorithmSteps[currentStep];

      // Apply the step
      if (step.type === "visit-node") {
        setHighlightedNodes([...step.visited]);
        setHighlightedEdges([...step.edges]);
      } else if (step.type === "visit-edge") {
        setHighlightedEdges([...step.edges]);
      }

      // Schedule next step
      animationRef.current = window.setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 1000);
    } else if (isRunning && currentStep >= algorithmSteps.length) {
      // Algorithm complete
      setIsRunning(false);
      setMessage(`${getAlgorithmName(algorithm)} traversal complete!`);
    }

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [isRunning, currentStep, algorithmSteps, algorithm]);

  const getAlgorithmName = (algo: string) => {
    switch (algo) {
      case "bfs":
        return "Breadth-First Search";
      case "dfs":
        return "Depth-First Search";
      case "dijkstra":
        return "Dijkstra's Shortest Path";
      case "mst":
        return "Minimum Spanning Tree";
      default:
        return algo.toUpperCase();
    }
  };

  const createSampleGraph = () => {
    // Create a sample graph with 6 nodes and 7 edges
    const sampleNodes: GraphNode[] = [
      { id: "A", label: "A", x: 100, y: 100 },
      { id: "B", label: "B", x: 250, y: 50 },
      { id: "C", label: "C", x: 400, y: 100 },
      { id: "D", label: "D", x: 100, y: 250 },
      { id: "E", label: "E", x: 250, y: 300 },
      { id: "F", label: "F", x: 400, y: 250 },
    ];

    const sampleEdges: GraphEdge[] = [
      { id: "AB", source: "A", target: "B", weight: 4, directed: isDirected },
      { id: "AC", source: "A", target: "C", weight: 2, directed: isDirected },
      { id: "BC", source: "B", target: "C", weight: 1, directed: isDirected },
      { id: "BD", source: "B", target: "D", weight: 5, directed: isDirected },
      { id: "CE", source: "C", target: "E", weight: 3, directed: isDirected },
      { id: "DE", source: "D", target: "E", weight: 2, directed: isDirected },
      { id: "EF", source: "E", target: "F", weight: 1, directed: isDirected },
    ];

    setNodes(sampleNodes);
    setEdges(sampleEdges);
    setIsWeighted(true);
  };

  const handleAddNode = () => {
    if (!nodeLabel.trim()) {
      setMessage("Please enter a node label");
      return;
    }

    // Check if node with this label already exists
    if (nodes.some((node) => node.label === nodeLabel)) {
      setMessage(`Node with label "${nodeLabel}" already exists`);
      return;
    }

    // Generate random position if not dragging to add
    const newX = Math.random() * 500 + 50;
    const newY = Math.random() * 300 + 50;

    const newNode: GraphNode = {
      id: nodeLabel,
      label: nodeLabel,
      x: newX,
      y: newY,
    };

    setNodes([...nodes, newNode]);
    setNodeLabel("");
    setMessage(`Added node "${nodeLabel}"`);
  };

  const handleAddEdge = () => {
    if (!sourceNode || !targetNode) {
      setMessage("Please select source and target nodes");
      return;
    }

    if (sourceNode === targetNode) {
      setMessage("Self-loops are not supported");
      return;
    }

    // Check if this edge already exists
    if (
      edges.some(
        (edge) =>
          (edge.source === sourceNode && edge.target === targetNode) ||
          (!isDirected &&
            edge.source === targetNode &&
            edge.target === sourceNode)
      )
    ) {
      setMessage(
        `Edge between "${sourceNode}" and "${targetNode}" already exists`
      );
      return;
    }

    const weight = isWeighted ? Number.parseInt(edgeWeight) || 1 : undefined;

    const newEdge: GraphEdge = {
      id: `${sourceNode}${targetNode}`,
      source: sourceNode,
      target: targetNode,
      weight,
      directed: isDirected,
    };

    setEdges([...edges, newEdge]);
    setSourceNode("");
    setTargetNode("");
    setEdgeWeight("1");
    setMessage(
      `Added edge from "${sourceNode}" to "${targetNode}"${
        weight ? ` with weight ${weight}` : ""
      }`
    );
  };

  const handleDeleteNode = () => {
    if (!selectedNode) {
      setMessage("Please select a node to delete");
      return;
    }

    // Remove the node
    const updatedNodes = nodes.filter((node) => node.id !== selectedNode);

    // Remove all edges connected to this node
    const updatedEdges = edges.filter(
      (edge) => edge.source !== selectedNode && edge.target !== selectedNode
    );

    setNodes(updatedNodes);
    setEdges(updatedEdges);
    setSelectedNode(null);
    setMessage(`Deleted node "${selectedNode}" and its connected edges`);
  };

  const handleDeleteEdge = () => {
    if (!selectedEdge) {
      setMessage("Please select an edge to delete");
      return;
    }

    const updatedEdges = edges.filter((edge) => edge.id !== selectedEdge);
    setEdges(updatedEdges);
    setSelectedEdge(null);
    setMessage(`Deleted edge "${selectedEdge}"`);
  };

  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(nodeId);
    setSelectedEdge(null);
  };

  const handleEdgeClick = (edgeId: string) => {
    setSelectedEdge(edgeId);
    setSelectedNode(null);
  };

  const resetGraph = () => {
    createSampleGraph();
    setSelectedNode(null);
    setSelectedEdge(null);
    setHighlightedNodes([]);
    setHighlightedEdges([]);
    setMessage("Graph reset to sample graph");
    stopAlgorithm();
  };

  const clearGraph = () => {
    setNodes([]);
    setEdges([]);
    setSelectedNode(null);
    setSelectedEdge(null);
    setHighlightedNodes([]);
    setHighlightedEdges([]);
    setMessage("Graph cleared");
    stopAlgorithm();
  };

  const stopAlgorithm = () => {
    setIsRunning(false);
    setAlgorithmSteps([]);
    setCurrentStep(0);
    setHighlightedNodes([]);
    setHighlightedEdges([]);
    if (animationRef.current) {
      clearTimeout(animationRef.current);
      animationRef.current = null;
    }
  };

  const runAlgorithm = () => {
    if (!startNode) {
      setMessage("Please select a start node");
      return;
    }

    // Check if start node exists
    if (!nodes.some((node) => node.id === startNode)) {
      setMessage(`Start node "${startNode}" does not exist`);
      return;
    }

    stopAlgorithm();

    // Generate algorithm steps
    type Step = {
      type: "visit-node" | "visit-edge";
      visited: string[];
      edges: string[];
    };
    let steps: Step[] = [];
    switch (algorithm) {
      case "bfs":
        steps = generateBFSSteps(startNode);
        break;
      case "dfs":
        steps = generateDFSSteps(startNode);
        break;
      case "dijkstra":
        steps = generateDijkstraSteps(startNode);
        break;
      case "mst":
        steps = generateMSTSteps();
        break;
    }

    setAlgorithmSteps(steps);
    setCurrentStep(0);
    setIsRunning(true);
    setMessage(
      `Running ${getAlgorithmName(algorithm)} from node "${startNode}"...`
    );
  };

  // Build adjacency list from edges
  const buildAdjacencyList = () => {
    const adjList: Record<string, { node: string; weight?: number }[]> = {};

    // Initialize empty arrays for all nodes
    nodes.forEach((node) => {
      adjList[node.id] = [];
    });

    // Add edges to adjacency list
    edges.forEach((edge) => {
      adjList[edge.source].push({ node: edge.target, weight: edge.weight });

      // If undirected, add the reverse edge
      if (!edge.directed) {
        adjList[edge.target].push({ node: edge.source, weight: edge.weight });
      }
    });

    return adjList;
  };

  const getEdgeId = (source: string, target: string) => {
    // Find the edge between these nodes
    const edge = edges.find(
      (e) =>
        (e.source === source && e.target === target) ||
        (!e.directed && e.source === target && e.target === source)
    );
    return edge ? edge.id : null;
  };

  const generateBFSSteps = (start: string) => {
    type Step = {
      type: "visit-node" | "visit-edge";
      visited: string[];
      edges: string[];
    };
    const steps: Step[] = [];
    const adjList = buildAdjacencyList();
    const visited = new Set<string>();
    const queue: string[] = [start];
    visited.add(start);

    steps.push({
      type: "visit-node",
      visited: [...visited],
      edges: [],
    });

    while (queue.length > 0) {
      const current = queue.shift()!;
      const visitedEdges: string[] = [];

      for (const { node: neighbor } of adjList[current]) {
        const edgeId = getEdgeId(current, neighbor);
        if (edgeId) visitedEdges.push(edgeId);

        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);

          steps.push({
            type: "visit-node",
            visited: [...visited],
            edges: [...visitedEdges],
          });
        }
      }
    }

    return steps;
  };

  const generateDFSSteps = (start: string) => {
    type Step = {
      type: "visit-node" | "visit-edge";
      visited: string[];
      edges: string[];
    };
    const steps: Step[] = [];
    const adjList = buildAdjacencyList();
    const visited = new Set<string>();

    const dfs = (node: string, visitedEdges: string[] = []) => {
      visited.add(node);

      steps.push({
        type: "visit-node",
        visited: [...visited],
        edges: [...visitedEdges],
      });

      for (const { node: neighbor } of adjList[node]) {
        const edgeId = getEdgeId(node, neighbor);
        const newVisitedEdges = edgeId
          ? [...visitedEdges, edgeId]
          : visitedEdges;

        if (!visited.has(neighbor)) {
          dfs(neighbor, newVisitedEdges);
        }
      }
    };

    dfs(start);
    return steps;
  };

  const generateDijkstraSteps = (start: string) => {
    type Step = {
      type: "visit-node" | "visit-edge";
      visited: string[];
      edges: string[];
    };
    const steps: Step[] = [];
    const adjList = buildAdjacencyList();

    // Initialize distances
    const distances: Record<string, number> = {};
    const previous: Record<string, string | null> = {};
    const unvisited = new Set<string>();

    // Set initial distances to Infinity
    nodes.forEach((node) => {
      distances[node.id] = Number.POSITIVE_INFINITY;
      previous[node.id] = null;
      unvisited.add(node.id);
    });

    // Distance from start to itself is 0
    distances[start] = 0;

    // Track visited nodes and edges for visualization
    const visited = new Set<string>();
    const visitedEdges = new Set<string>();

    while (unvisited.size > 0) {
      // Find the unvisited node with the smallest distance
      let current: string | null = null;
      let smallestDistance = Number.POSITIVE_INFINITY;

      for (const nodeId of unvisited) {
        if (distances[nodeId] < smallestDistance) {
          smallestDistance = distances[nodeId];
          current = nodeId;
        }
      }

      // If we can't find a node or the smallest distance is Infinity,
      // then we're done or there's no path
      if (current === null || distances[current] === Number.POSITIVE_INFINITY)
        break;

      // Mark as visited
      unvisited.delete(current);
      visited.add(current);

      steps.push({
        type: "visit-node",
        visited: [...visited],
        edges: [...visitedEdges],
      });

      // Update distances to neighbors
      for (const { node: neighbor, weight = 1 } of adjList[current]) {
        if (unvisited.has(neighbor)) {
          const newDistance = distances[current] + weight;

          if (newDistance < distances[neighbor]) {
            distances[neighbor] = newDistance;
            previous[neighbor] = current;

            // Add edge to visualization
            const edgeId = getEdgeId(current, neighbor);
            if (edgeId) {
              visitedEdges.add(edgeId);
              steps.push({
                type: "visit-edge",
                visited: [...visited],
                edges: [...visitedEdges],
              });
            }
          }
        }
      }
    }

    return steps;
  };

  const generateMSTSteps = () => {
    // Implement Prim's algorithm for MST
    type Step = {
      type: "visit-node" | "visit-edge";
      visited: string[];
      edges: string[];
    };
    const steps: Step[] = [];
    const adjList = buildAdjacencyList();

    if (nodes.length === 0) return steps;

    // Start with any node
    const start = nodes[0].id;

    const visited = new Set<string>([start]);
    const mstEdges = new Set<string>();

    steps.push({
      type: "visit-node",
      visited: [...visited],
      edges: [],
    });

    while (visited.size < nodes.length) {
      let minEdge: { source: string; target: string; weight: number } | null =
        null;

      // Find the minimum weight edge from a visited node to an unvisited node
      for (const nodeId of visited) {
        for (const { node: neighbor, weight = 1 } of adjList[nodeId]) {
          if (!visited.has(neighbor)) {
            if (minEdge === null || weight < minEdge.weight) {
              minEdge = { source: nodeId, target: neighbor, weight };
            }
          }
        }
      }

      if (minEdge === null) break; // No more edges to add

      // Add the edge to MST
      const edgeId = getEdgeId(minEdge.source, minEdge.target);
      if (edgeId) {
        mstEdges.add(edgeId);
        visited.add(minEdge.target);

        steps.push({
          type: "visit-node",
          visited: [...visited],
          edges: [...mstEdges],
        });
      }
    }

    return steps;
  };

  // Calculate edge path for rendering
  const calculateEdgePath = (edge: GraphEdge) => {
    const source = nodes.find((n) => n.id === edge.source);
    const target = nodes.find((n) => n.id === edge.target);

    if (!source || !target) return "";

    // For directed edges, create a curved path
    if (edge.directed) {
      // Calculate midpoint
      const mx = (source.x + target.x) / 2;
      const my = (source.y + target.y) / 2;

      // Calculate normal vector
      const dx = target.x - source.x;
      const dy = target.y - source.y;
      const len = Math.sqrt(dx * dx + dy * dy);
      const nx = -dy / len;
      const ny = dx / len;

      // Create control point
      const cpx = mx + nx * 30;
      const cpy = my + ny * 30;

      return `M${source.x},${source.y} Q${cpx},${cpy} ${target.x},${target.y}`;
    }

    // For undirected edges, use a straight line
    return `M${source.x},${source.y} L${target.x},${target.y}`;
  };

  // Calculate position for edge weight label
  const calculateEdgeWeightPosition = (edge: GraphEdge) => {
    const source = nodes.find((n) => n.id === edge.source);
    const target = nodes.find((n) => n.id === edge.target);

    if (!source || !target) return { x: 0, y: 0 };

    // For directed edges, position the weight near the control point
    if (edge.directed) {
      // Calculate midpoint
      const mx = (source.x + target.x) / 2;
      const my = (source.y + target.y) / 2;

      // Calculate normal vector
      const dx = target.x - source.x;
      const dy = target.y - source.y;
      const len = Math.sqrt(dx * dx + dy * dy);
      const nx = -dy / len;
      const ny = dx / len;

      // Position near control point
      return { x: mx + nx * 40, y: my + ny * 40 };
    }

    // For undirected edges, position at midpoint
    return { x: (source.x + target.x) / 2, y: (source.y + target.y) / 2 };
  };

  // Calculate position for arrow marker on directed edges
  const calculateArrowPosition = (edge: GraphEdge) => {
    const source = nodes.find((n) => n.id === edge.source);
    const target = nodes.find((n) => n.id === edge.target);

    if (!source || !target) return { x: 0, y: 0, angle: 0 };

    // Calculate direction vector
    const dx = target.x - source.x;
    const dy = target.y - source.y;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    // Position arrow near target node
    const nodeRadius = 20;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const ratio = (distance - nodeRadius) / distance;

    const x = source.x + dx * ratio;
    const y = source.y + dy * ratio;

    return { x, y, angle };
  };

  return (
    <Card className="p-6 w-full">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h3 className="text-lg font-medium">Graph Visualizer</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={resetGraph}>
              <RotateCcw className="mr-2 h-4 w-4" /> Reset
            </Button>
            <Button variant="outline" size="sm" onClick={clearGraph}>
              Clear
            </Button>
          </div>
        </div>

        <Tabs defaultValue="edit" className="w-full">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="edit">Edit Graph</TabsTrigger>
            <TabsTrigger value="algorithms">Algorithms</TabsTrigger>
          </TabsList>
          <TabsContent value="edit" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Add Node */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Add Node</h4>
                <div className="flex gap-2">
                  <Input
                    placeholder="Node Label"
                    value={nodeLabel}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNodeLabel(e.target.value)
                    }
                  />
                  <Button onClick={handleAddNode}>
                    <Plus className="mr-2 h-4 w-4" /> Add
                  </Button>
                </div>
              </div>

              {/* Add Edge */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Add Edge</h4>
                <div className="flex flex-wrap gap-2">
                  <Select value={sourceNode} onValueChange={setSourceNode}>
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="Source" />
                    </SelectTrigger>
                    <SelectContent>
                      {nodes.map((node) => (
                        <SelectItem key={`source-${node.id}`} value={node.id}>
                          {node.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={targetNode} onValueChange={setTargetNode}>
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="Target" />
                    </SelectTrigger>
                    <SelectContent>
                      {nodes.map((node) => (
                        <SelectItem key={`target-${node.id}`} value={node.id}>
                          {node.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {isWeighted && (
                    <Input
                      type="number"
                      placeholder="Weight"
                      value={edgeWeight}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setEdgeWeight(e.target.value)
                      }
                      className="w-[80px]"
                      min="1"
                    />
                  )}

                  <Button onClick={handleAddEdge}>
                    <Plus className="mr-2 h-4 w-4" /> Add
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Delete Node/Edge */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Delete</h4>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handleDeleteNode}
                    disabled={!selectedNode}
                  >
                    <Minus className="mr-2 h-4 w-4" /> Delete Node
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleDeleteEdge}
                    disabled={!selectedEdge}
                  >
                    <Minus className="mr-2 h-4 w-4" /> Delete Edge
                  </Button>
                </div>
              </div>

              {/* Graph Properties */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Graph Properties</h4>
                <div className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="directed"
                      checked={isDirected}
                      onChange={(e) => setIsDirected(e.target.checked)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="directed" className="text-sm">
                      Directed
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="weighted"
                      checked={isWeighted}
                      onChange={(e) => setIsWeighted(e.target.checked)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="weighted" className="text-sm">
                      Weighted
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="algorithms" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Algorithm Selection */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Select Algorithm</h4>
                <div className="flex gap-2">
                  <Select
                    value={algorithm}
                    onValueChange={(
                      value: "bfs" | "dfs" | "dijkstra" | "mst"
                    ) => setAlgorithm(value)}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select Algorithm" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bfs">Breadth-First Search</SelectItem>
                      <SelectItem value="dfs">Depth-First Search</SelectItem>
                      <SelectItem value="dijkstra">
                        Dijkstra&apos;s Shortest Path
                      </SelectItem>
                      <SelectItem value="mst">Minimum Spanning Tree</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Start Node */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Start Node</h4>
                <div className="flex gap-2">
                  <Select value={startNode} onValueChange={setStartNode}>
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="Start" />
                    </SelectTrigger>
                    <SelectContent>
                      {nodes.map((node) => (
                        <SelectItem key={`start-${node.id}`} value={node.id}>
                          {node.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {isRunning ? (
                    <Button variant="outline" onClick={stopAlgorithm}>
                      <Pause className="mr-2 h-4 w-4" /> Stop
                    </Button>
                  ) : (
                    <Button onClick={runAlgorithm}>
                      <Play className="mr-2 h-4 w-4" /> Run
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Algorithm Progress */}
            {isRunning && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>
                    Step {currentStep + 1} of {algorithmSteps.length}
                  </span>
                  <span>{getAlgorithmName(algorithm)}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{
                      width: `${
                        ((currentStep + 1) / algorithmSteps.length) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-2 bg-muted rounded-md text-center"
          >
            {message}
          </motion.div>
        )}

        <div className="w-full overflow-auto border rounded-md bg-muted/30 p-4">
          <svg
            ref={svgRef}
            width="100%"
            height="400"
            viewBox="0 0 600 400"
            className="mx-auto"
          >
            {/* Render edges */}
            {edges.map((edge) => {
              const isHighlighted = highlightedEdges.includes(edge.id);
              const isSelected = edge.id === selectedEdge;
              const path = calculateEdgePath(edge);

              return (
                <g key={edge.id} onClick={() => handleEdgeClick(edge.id)}>
                  <path
                    d={path}
                    stroke={
                      isHighlighted
                        ? "var(--primary)"
                        : isSelected
                        ? "var(--primary)"
                        : "gray"
                    }
                    strokeWidth={isSelected || isHighlighted ? 3 : 2}
                    fill="none"
                    strokeDasharray={isSelected ? "5,5" : "none"}
                    className="cursor-pointer"
                  />

                  {/* Arrow marker for directed edges */}
                  {edge.directed && (
                    <g>
                      <defs>
                        <marker
                          id={`arrowhead-${edge.id}`}
                          markerWidth="10"
                          markerHeight="7"
                          refX="0"
                          refY="3.5"
                          orient="auto"
                        >
                          <polygon
                            points="0 0, 10 3.5, 0 7"
                            fill={
                              isHighlighted
                                ? "var(--primary)"
                                : isSelected
                                ? "var(--primary)"
                                : "gray"
                            }
                          />
                        </marker>
                      </defs>
                      <path
                        d={path}
                        stroke="none"
                        fill="none"
                        markerEnd={`url(#arrowhead-${edge.id})`}
                      />
                    </g>
                  )}

                  {/* Edge weight label */}
                  {isWeighted && edge.weight !== undefined && (
                    <g>
                      <circle
                        cx={calculateEdgeWeightPosition(edge).x}
                        cy={calculateEdgeWeightPosition(edge).y}
                        r={12}
                        fill="white"
                        stroke={isHighlighted ? "var(--primary)" : "gray"}
                      />
                      <text
                        x={calculateEdgeWeightPosition(edge).x}
                        y={calculateEdgeWeightPosition(edge).y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="12"
                        fill={isHighlighted ? "var(--primary)" : "black"}
                      >
                        {edge.weight}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* Render nodes */}
            {nodes.map((node) => {
              const isHighlighted = highlightedNodes.includes(node.id);
              const isSelected = node.id === selectedNode;

              return (
                <g key={node.id} onClick={() => handleNodeClick(node.id)}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={20}
                    fill={isHighlighted ? "var(--primary)" : "white"}
                    stroke={isSelected ? "var(--primary)" : "gray"}
                    strokeWidth={isSelected || isHighlighted ? 3 : 2}
                    className="cursor-pointer"
                  />
                  <text
                    x={node.x}
                    y={node.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="14"
                    fill={isHighlighted ? "white" : "black"}
                    fontWeight={isSelected || isHighlighted ? "bold" : "normal"}
                    className="pointer-events-none"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium">Graph Algorithms</h3>
          <div className="text-sm text-muted-foreground">
            <p>
              <strong>Breadth-First Search (BFS):</strong> Explores all
              neighbors at the present depth before moving on to nodes at the
              next depth level. Useful for finding the shortest path in an
              unweighted graph.
            </p>
            <p>
              <strong>Depth-First Search (DFS):</strong> Explores as far as
              possible along each branch before backtracking. Useful for
              topological sorting, detecting cycles, and solving puzzles like
              mazes.
            </p>
            <p>
              <strong>Dijkstra&apos;s Algorithm:</strong> Finds the shortest
              path from a start node to all other nodes in a weighted graph with
              non-negative weights.
            </p>
            <p>
              <strong>Minimum Spanning Tree (MST):</strong> Finds a subset of
              edges that forms a tree including every vertex, where the total
              weight is minimized. Implemented using Prim&apos;s algorithm.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
