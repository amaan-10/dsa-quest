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
import { motion } from "framer-motion";
import { Plus, Minus, RotateCcw, Search, ArrowRight } from "lucide-react";

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
  id: string;
  x?: number;
  y?: number;
  level?: number;
}

interface TreeVisualizerProps {
  initialTree?: TreeNode | null;
  treeType?: "bst" | "avl" | "heap";
}

export function TreeVisualizer({
  initialTree = null,
  treeType = "bst",
}: TreeVisualizerProps) {
  const [root, setRoot] = useState<TreeNode | null>(initialTree);
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [highlightedNodeIds, setHighlightedNodeIds] = useState<string[]>([]);
  const [traversalType, setTraversalType] = useState<
    "inorder" | "preorder" | "postorder" | "levelorder"
  >("inorder");
  const [traversalSteps, setTraversalSteps] = useState<string[]>([]);
  const [currentTraversalStep, setCurrentTraversalStep] = useState(-1);
  const [isTraversing, setIsTraversing] = useState(false);
  const [message, setMessage] = useState("");
  const svgRef = useRef<SVGSVGElement>(null);
  const traversalTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize with a sample tree if none provided
  useEffect(() => {
    if (!initialTree && !root) {
      const sampleTree = createSampleTree();
      setRoot(sampleTree);
    }
  }, [initialTree, root]);

  // Calculate node positions whenever the tree changes
  useEffect(() => {
    if (root) {
      const updatedRoot = calculateNodePositions(root);
      setRoot(updatedRoot);
    }
  }, [root]); // Only recalculate when the root changes (tree structure changes)

  // Handle traversal animation
  useEffect(() => {
    if (isTraversing && currentTraversalStep < traversalSteps.length - 1) {
      traversalTimerRef.current = setTimeout(() => {
        setCurrentTraversalStep((prev) => prev + 1);

        // Highlight the current node in the traversal
        const nodeId = traversalSteps[currentTraversalStep + 1];
        setHighlightedNodeIds([nodeId]);
      }, 1000);
    } else if (
      isTraversing &&
      currentTraversalStep >= traversalSteps.length - 1
    ) {
      setIsTraversing(false);
      setMessage(
        `${
          traversalType.charAt(0).toUpperCase() + traversalType.slice(1)
        } traversal complete!`
      );

      // Clear highlights after a delay
      setTimeout(() => {
        setHighlightedNodeIds([]);
        setMessage("");
      }, 2000);
    }

    return () => {
      if (traversalTimerRef.current) {
        clearTimeout(traversalTimerRef.current);
      }
    };
  }, [isTraversing, currentTraversalStep, traversalSteps, traversalType]);

  const createSampleTree = (): TreeNode => {
    // Create a sample BST
    const sampleRoot: TreeNode = {
      value: 50,
      left: null,
      right: null,
      id: "node-50",
    };
    insertNode(sampleRoot, 30);
    insertNode(sampleRoot, 70);
    insertNode(sampleRoot, 20);
    insertNode(sampleRoot, 40);
    insertNode(sampleRoot, 60);
    insertNode(sampleRoot, 80);

    return sampleRoot;
  };

  const calculateNodePositions = (
    node: TreeNode | null,
    level = 0,
    position = 0,
    width = 800
  ): TreeNode | null => {
    if (!node) return null;

    // Calculate x and y coordinates
    const x = position;
    const y = level * 80 + 40; // 80px vertical spacing between levels

    // Update node with position and level
    const updatedNode: TreeNode = {
      ...node,
      x,
      y,
      level,
    };

    // Calculate positions for children
    const childWidth = width / 2;

    if (node.left) {
      updatedNode.left = calculateNodePositions(
        node.left,
        level + 1,
        position - childWidth / 2,
        childWidth
      );
    }

    if (node.right) {
      updatedNode.right = calculateNodePositions(
        node.right,
        level + 1,
        position + childWidth / 2,
        childWidth
      );
    }

    return updatedNode;
  };

  const insertNode = (root: TreeNode | null, value: number): TreeNode => {
    if (!root) {
      return { value, left: null, right: null, id: `node-${value}` };
    }

    if (value < root.value) {
      root.left = insertNode(root.left, value);
    } else if (value > root.value) {
      root.right = insertNode(root.right, value);
    }

    return root;
  };

  const deleteNode = (
    root: TreeNode | null,
    value: number
  ): TreeNode | null => {
    if (!root) return null;

    // Find the node to delete
    if (value < root.value) {
      root.left = deleteNode(root.left, value);
    } else if (value > root.value) {
      root.right = deleteNode(root.right, value);
    } else {
      // Node found, delete it

      // Case 1: Leaf node
      if (!root.left && !root.right) {
        return null;
      }

      // Case 2: Node with only one child
      if (!root.left) {
        return root.right;
      }
      if (!root.right) {
        return root.left;
      }

      // Case 3: Node with two children
      // Find the inorder successor (smallest node in right subtree)
      let successor = root.right;
      while (successor.left) {
        successor = successor.left;
      }

      // Replace the node's value with the successor's value
      root.value = successor.value;
      root.id = successor.id;

      // Delete the successor
      root.right = deleteNode(root.right, successor.value);
    }

    return root;
  };

  const handleInsert = () => {
    const value = Number.parseInt(inputValue);

    if (isNaN(value)) {
      setMessage("Please enter a valid number");
      return;
    }

    // Check if value already exists
    if (searchNode(root, value)) {
      setMessage(`Value ${value} already exists in the tree`);
      return;
    }

    let newRoot;
    if (!root) {
      newRoot = { value, left: null, right: null, id: `node-${value}` };
    } else {
      newRoot = { ...root };
      insertNode(newRoot, value);
    }

    setRoot(newRoot);
    setInputValue("");
    setMessage(`Inserted ${value} into the tree`);

    // Highlight the new node
    setHighlightedNodeIds([`node-${value}`]);
    setTimeout(() => setHighlightedNodeIds([]), 2000);
  };

  const handleDelete = () => {
    const value = Number.parseInt(inputValue);

    if (isNaN(value)) {
      setMessage("Please enter a valid number");
      return;
    }

    // Check if value exists
    if (!searchNode(root, value)) {
      setMessage(`Value ${value} does not exist in the tree`);
      return;
    }

    const newRoot = deleteNode(root, value);
    setRoot(newRoot);
    setInputValue("");
    setMessage(`Deleted ${value} from the tree`);
  };

  const handleSearch = () => {
    const value = Number.parseInt(searchValue);

    if (isNaN(value)) {
      setMessage("Please enter a valid number");
      return;
    }

    const foundNode = searchNode(root, value);

    if (foundNode) {
      setMessage(`Found ${value} in the tree`);
      setHighlightedNodeIds([foundNode.id]);
      setTimeout(() => setHighlightedNodeIds([]), 2000);
    } else {
      setMessage(`Value ${value} not found in the tree`);
    }

    setSearchValue("");
  };

  const searchNode = (
    node: TreeNode | null,
    value: number
  ): TreeNode | null => {
    if (!node) return null;

    if (node.value === value) {
      return node;
    }

    if (value < node.value) {
      return searchNode(node.left, value);
    } else {
      return searchNode(node.right, value);
    }
  };

  const startTraversal = () => {
    if (!root) return;

    const steps: string[] = [];

    switch (traversalType) {
      case "inorder":
        inorderTraversal(root, steps);
        break;
      case "preorder":
        preorderTraversal(root, steps);
        break;
      case "postorder":
        postorderTraversal(root, steps);
        break;
      case "levelorder":
        levelOrderTraversal(root, steps);
        break;
    }

    setTraversalSteps(steps);
    setCurrentTraversalStep(-1);
    setIsTraversing(true);
    setMessage(`Starting ${traversalType} traversal...`);
  };

  const inorderTraversal = (node: TreeNode | null, steps: string[]) => {
    if (!node) return;

    inorderTraversal(node.left, steps);
    steps.push(node.id);
    inorderTraversal(node.right, steps);
  };

  const preorderTraversal = (node: TreeNode | null, steps: string[]) => {
    if (!node) return;

    steps.push(node.id);
    preorderTraversal(node.left, steps);
    preorderTraversal(node.right, steps);
  };

  const postorderTraversal = (node: TreeNode | null, steps: string[]) => {
    if (!node) return;

    postorderTraversal(node.left, steps);
    postorderTraversal(node.right, steps);
    steps.push(node.id);
  };

  const levelOrderTraversal = (node: TreeNode | null, steps: string[]) => {
    if (!node) return;

    const queue: TreeNode[] = [node];

    while (queue.length > 0) {
      const current = queue.shift()!;
      steps.push(current.id);

      if (current.left) {
        queue.push(current.left);
      }

      if (current.right) {
        queue.push(current.right);
      }
    }
  };

  const resetTree = () => {
    setRoot(createSampleTree());
    setMessage("Tree reset to sample tree");
    setHighlightedNodeIds([]);
    setIsTraversing(false);
    if (traversalTimerRef.current) {
      clearTimeout(traversalTimerRef.current);
    }
  };

  const renderTree = (node: TreeNode | null) => {
    if (!node || node.x === undefined || node.y === undefined) return null;

    const isHighlighted = highlightedNodeIds.includes(node.id);

    return (
      <g key={node.id}>
        {/* Edges to children */}
        {node.left &&
          node.left.x !== undefined &&
          node.left.y !== undefined && (
            <motion.line
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              x1={node.x}
              y1={node.y}
              x2={node.left.x}
              y2={node.left.y}
              stroke="gray"
              strokeWidth={2}
            />
          )}
        {node.right &&
          node.right.x !== undefined &&
          node.right.y !== undefined && (
            <motion.line
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              x1={node.x}
              y1={node.y}
              x2={node.right.x}
              y2={node.right.y}
              stroke="gray"
              strokeWidth={2}
            />
          )}

        {/* Node circle */}
        <motion.circle
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            fill: isHighlighted ? "var(--primary)" : "white",
            stroke: isHighlighted ? "var(--primary)" : "var(--primary)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          cx={node.x}
          cy={node.y}
          r={25}
          strokeWidth={2}
        />

        {/* Node value */}
        <text
          x={node.x}
          y={node.y}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={isHighlighted ? "white" : "black"}
          fontSize={14}
          fontWeight={isHighlighted ? "bold" : "normal"}
        >
          {node.value}
        </text>

        {/* Recursively render children */}
        {node.left && renderTree(node.left)}
        {node.right && renderTree(node.right)}
      </g>
    );
  };

  // Calculate tree height for SVG dimensions
  const getTreeHeight = (node: TreeNode | null): number => {
    if (!node) return 0;

    const leftHeight = getTreeHeight(node.left);
    const rightHeight = getTreeHeight(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  };

  const treeHeight = root ? getTreeHeight(root) : 0;
  const svgHeight = treeHeight * 80 + 80; // 80px per level + padding

  return (
    <Card className="p-6 w-full">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h3 className="text-lg font-medium">Binary Search Tree Visualizer</h3>
          <Button variant="outline" size="sm" onClick={resetTree}>
            <RotateCcw className="mr-2 h-4 w-4" /> Reset Tree
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 flex gap-2">
            <Input
              type="number"
              placeholder="Enter a value"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button onClick={handleInsert}>
              <Plus className="mr-2 h-4 w-4" /> Insert
            </Button>
            <Button variant="outline" onClick={handleDelete}>
              <Minus className="mr-2 h-4 w-4" /> Delete
            </Button>
          </div>
          <div className="flex-1 flex gap-2">
            <Input
              type="number"
              placeholder="Search value"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button variant="secondary" onClick={handleSearch}>
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm">Traversal:</span>
            <Select
              value={traversalType}
              onValueChange={(value) =>
                setTraversalType(
                  value as "inorder" | "preorder" | "postorder" | "levelorder"
                )
              }
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select traversal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inorder">Inorder</SelectItem>
                <SelectItem value="preorder">Preorder</SelectItem>
                <SelectItem value="postorder">Postorder</SelectItem>
                <SelectItem value="levelorder">Level Order</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            variant="outline"
            onClick={startTraversal}
            disabled={isTraversing}
          >
            <ArrowRight className="mr-2 h-4 w-4" /> Start Traversal
          </Button>
          {isTraversing && (
            <div className="text-sm">
              Step {currentTraversalStep + 1} of {traversalSteps.length}
            </div>
          )}
        </div>

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
            height={svgHeight}
            viewBox={`0 0 800 ${svgHeight}`}
            preserveAspectRatio="xMidYMid meet"
          >
            <g transform="translate(400, 40)">{root && renderTree(root)}</g>
          </svg>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium">Tree Operations</h3>
          <div className="text-sm text-muted-foreground">
            <p>
              <strong>Insert:</strong> Adds a new node to the tree while
              maintaining the BST property (left child &lt; parent &lt; right
              child).
            </p>
            <p>
              <strong>Delete:</strong> Removes a node from the tree while
              maintaining the BST property.
            </p>
            <p>
              <strong>Search:</strong> Finds a node with the given value in the
              tree.
            </p>
            <p>
              <strong>Traversals:</strong>
            </p>
            <ul className="list-disc list-inside ml-4 mt-2">
              <li>
                <strong>Inorder:</strong> Left, Root, Right - Visits nodes in
                ascending order
              </li>
              <li>
                <strong>Preorder:</strong> Root, Left, Right - Used for creating
                a copy of the tree
              </li>
              <li>
                <strong>Postorder:</strong> Left, Right, Root - Used for
                deleting the tree
              </li>
              <li>
                <strong>Level Order:</strong> Visits nodes level by level from
                top to bottom
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
}
