"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
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
  Sword,
  Crown,
  Skull,
  Brain,
  Network,
  Hash,
  TreePine,
  Layers,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { notFound } from "next/navigation";

// Boss battle configurations
const BOSS_DATA = {
  "array-guardian": {
    title: "Array Guardian",
    slug: "array-guardian",
    description:
      "Defeat the Array Guardian by solving complex array algorithm challenges.",
    image: "/placeholder.svg?height=300&width=300",
    icon: Layers,
    color: "from-emerald-500 to-teal-600",
    health: 100,
    difficulty: "Medium",
    timeLimit: 300, // 5 minutes
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
        damage: 25,
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
        damage: 30,
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
        damage: 35,
      },
    ],
  },
  "linked-list-guardian": {
    title: "Linked List Guardian",
    slug: "linked-list-guardian",
    description:
      "Challenge the Linked List Guardian with advanced pointer manipulation problems.",
    image: "/placeholder.svg?height=300&width=300",
    icon: Network,
    color: "from-blue-500 to-indigo-600",
    health: 120,
    difficulty: "Hard",
    timeLimit: 420, // 7 minutes
    questions: [
      {
        id: 1,
        text: "Write a function to reverse a linked list iteratively. Return the new head of the reversed list.",
        hint: "Use three pointers: previous, current, and next.",
        solution: `function reverseList(head) {
  let prev = null;
  let current = head;
  
  while (current !== null) {
    let next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  
  return prev;
}`,
        difficulty: "Medium",
        damage: 30,
      },
      {
        id: 2,
        text: "Write a function to detect if a linked list has a cycle. Return true if there is a cycle, false otherwise.",
        hint: "Use Floyd's Cycle Detection Algorithm (tortoise and hare).",
        solution: `function hasCycle(head) {
  if (!head || !head.next) return false;
  
  let slow = head;
  let fast = head.next;
  
  while (fast && fast.next) {
    if (slow === fast) return true;
    slow = slow.next;
    fast = fast.next.next;
  }
  
  return false;
}`,
        difficulty: "Medium",
        damage: 35,
      },
      {
        id: 3,
        text: "Write a function to merge two sorted linked lists into one sorted linked list.",
        hint: "Use a dummy node to simplify the logic.",
        solution: `function mergeTwoLists(l1, l2) {
  const dummy = { next: null };
  let current = dummy;
  
  while (l1 && l2) {
    if (l1.val <= l2.val) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }
  
  current.next = l1 || l2;
  return dummy.next;
}`,
        difficulty: "Hard",
        damage: 40,
      },
    ],
  },
  "tree-spirit": {
    title: "Ancient Tree Spirit",
    slug: "tree-spirit",
    description:
      "Face the Ancient Tree Spirit in the ultimate tree algorithm challenge.",
    image: "/placeholder.svg?height=300&width=300",
    icon: TreePine,
    color: "from-green-500 to-emerald-600",
    health: 150,
    difficulty: "Expert",
    timeLimit: 600, // 10 minutes
    questions: [
      {
        id: 1,
        text: "Write a function to find the lowest common ancestor (LCA) of two nodes in a binary search tree.",
        hint: "Use the BST property to navigate efficiently.",
        solution: `function lowestCommonAncestor(root, p, q) {
  while (root) {
    if (p.val < root.val && q.val < root.val) {
      root = root.left;
    } else if (p.val > root.val && q.val > root.val) {
      root = root.right;
    } else {
      return root;
    }
  }
  return null;
}`,
        difficulty: "Medium",
        damage: 35,
      },
      {
        id: 2,
        text: "Write a function to validate if a binary tree is a valid binary search tree.",
        hint: "Use in-order traversal or maintain min/max bounds.",
        solution: `function isValidBST(root) {
  function validate(node, min, max) {
    if (!node) return true;
    
    if (node.val <= min || node.val >= max) {
      return false;
    }
    
    return validate(node.left, min, node.val) && 
           validate(node.right, node.val, max);
  }
  
  return validate(root, -Infinity, Infinity);
}`,
        difficulty: "Hard",
        damage: 45,
      },
      {
        id: 3,
        text: "Write a function to serialize and deserialize a binary tree.",
        hint: "Use pre-order traversal with null markers.",
        solution: `function serialize(root) {
  const result = [];
  
  function preorder(node) {
    if (!node) {
      result.push('null');
      return;
    }
    result.push(node.val.toString());
    preorder(node.left);
    preorder(node.right);
  }
  
  preorder(root);
  return result.join(',');
}

function deserialize(data) {
  const values = data.split(',');
  let index = 0;
  
  function buildTree() {
    if (values[index] === 'null') {
      index++;
      return null;
    }
    
    const node = { val: parseInt(values[index++]) };
    node.left = buildTree();
    node.right = buildTree();
    return node;
  }
  
  return buildTree();
}`,
        difficulty: "Expert",
        damage: 50,
      },
    ],
  },
  "cosmic-entity": {
    title: "Cosmic Entity",
    slug: "cosmic-entity",
    description:
      "Face the ultimate challenge against the Cosmic Entity in graph algorithm mastery.",
    image: "/placeholder.svg?height=300&width=300",
    icon: Network,
    color: "from-purple-500 to-pink-600",
    health: 200,
    difficulty: "Legendary",
    timeLimit: 900, // 15 minutes
    questions: [
      {
        id: 1,
        text: "Implement Dijkstra's algorithm to find the shortest path from a source vertex to all other vertices in a weighted graph.",
        hint: "Use a priority queue (min-heap) for efficient vertex selection.",
        solution: `function dijkstra(graph, start) {
  const distances = {};
  const visited = new Set();
  const pq = [[0, start]]; // [distance, vertex]
  
  // Initialize distances
  for (let vertex in graph) {
    distances[vertex] = Infinity;
  }
  distances[start] = 0;
  
  while (pq.length > 0) {
    pq.sort((a, b) => a[0] - b[0]);
    const [currentDist, currentVertex] = pq.shift();
    
    if (visited.has(currentVertex)) continue;
    visited.add(currentVertex);
    
    for (let [neighbor, weight] of graph[currentVertex]) {
      const distance = currentDist + weight;
      
      if (distance < distances[neighbor]) {
        distances[neighbor] = distance;
        pq.push([distance, neighbor]);
      }
    }
  }
  
  return distances;
}`,
        difficulty: "Hard",
        damage: 50,
      },
      {
        id: 2,
        text: "Implement a function to detect cycles in a directed graph using DFS.",
        hint: "Use three colors: white (unvisited), gray (visiting), black (visited).",
        solution: `function hasCycleDirected(graph) {
  const WHITE = 0, GRAY = 1, BLACK = 2;
  const colors = {};
  
  // Initialize all vertices as white
  for (let vertex in graph) {
    colors[vertex] = WHITE;
  }
  
  function dfs(vertex) {
    colors[vertex] = GRAY;
    
    for (let neighbor of graph[vertex]) {
      if (colors[neighbor] === GRAY) {
        return true; // Back edge found, cycle detected
      }
      if (colors[neighbor] === WHITE && dfs(neighbor)) {
        return true;
      }
    }
    
    colors[vertex] = BLACK;
    return false;
  }
  
  for (let vertex in graph) {
    if (colors[vertex] === WHITE && dfs(vertex)) {
      return true;
    }
  }
  
  return false;
}`,
        difficulty: "Expert",
        damage: 60,
      },
      {
        id: 3,
        text: "Implement Kruskal's algorithm to find the minimum spanning tree of a weighted undirected graph.",
        hint: "Use Union-Find data structure to detect cycles.",
        solution: `function kruskalMST(edges, numVertices) {
  // Sort edges by weight
  edges.sort((a, b) => a[2] - b[2]);
  
  const parent = Array.from({length: numVertices}, (_, i) => i);
  const rank = Array(numVertices).fill(0);
  
  function find(x) {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]);
    }
    return parent[x];
  }
  
  function union(x, y) {
    const rootX = find(x);
    const rootY = find(y);
    
    if (rootX !== rootY) {
      if (rank[rootX] < rank[rootY]) {
        parent[rootX] = rootY;
      } else if (rank[rootX] > rank[rootY]) {
        parent[rootY] = rootX;
      } else {
        parent[rootY] = rootX;
        rank[rootX]++;
      }
      return true;
    }
    return false;
  }
  
  const mst = [];
  for (let [u, v, weight] of edges) {
    if (union(u, v)) {
      mst.push([u, v, weight]);
      if (mst.length === numVertices - 1) break;
    }
  }
  
  return mst;
}`,
        difficulty: "Master",
        damage: 70,
      },
    ],
  },
  "sorting-sage": {
    title: "Sorting Sage",
    slug: "sorting-sage",
    description:
      "Challenge the Sorting Sage in an algorithm efficiency battle.",
    image: "/placeholder.svg?height=300&width=300",
    icon: Layers,
    color: "from-orange-500 to-red-600",
    health: 100,
    difficulty: "Medium",
    timeLimit: 360, // 6 minutes
    questions: [
      {
        id: 1,
        text: "Implement the quicksort algorithm to sort an array in ascending order.",
        hint: "Choose a pivot and partition the array around it.",
        solution: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
        difficulty: "Medium",
        damage: 30,
      },
      {
        id: 2,
        text: "Implement merge sort algorithm with O(n log n) time complexity.",
        hint: "Divide the array into halves and merge them back in sorted order.",
        solution: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  
  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
        difficulty: "Medium",
        damage: 35,
      },
      {
        id: 3,
        text: "Implement heap sort algorithm using a max heap.",
        hint: "Build a max heap, then repeatedly extract the maximum element.",
        solution: `function heapSort(arr) {
  const n = arr.length;
  
  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  
  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  
  return arr;
}

function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }
  
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }
  
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}`,
        difficulty: "Hard",
        damage: 40,
      },
    ],
  },
  "hash-monarch": {
    title: "Hash Monarch",
    slug: "hash-monarch",
    description: "Challenge the Hash Monarch in the royal coding duel.",
    image: "/placeholder.svg?height=300&width=300",
    icon: Hash,
    color: "from-yellow-500 to-orange-600",
    health: 110,
    difficulty: "Hard",
    timeLimit: 480, // 8 minutes
    questions: [
      {
        id: 1,
        text: "Implement a hash table with linear probing for collision resolution.",
        hint: "Use an array and handle collisions by checking the next available slot.",
        solution: `class HashTable {
  constructor(size = 10) {
    this.size = size;
    this.keys = new Array(size);
    this.values = new Array(size);
  }
  
  hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % this.size;
  }
  
  set(key, value) {
    let index = this.hash(key);
    
    while (this.keys[index] && this.keys[index] !== key) {
      index = (index + 1) % this.size;
    }
    
    this.keys[index] = key;
    this.values[index] = value;
  }
  
  get(key) {
    let index = this.hash(key);
    
    while (this.keys[index]) {
      if (this.keys[index] === key) {
        return this.values[index];
      }
      index = (index + 1) % this.size;
    }
    
    return undefined;
  }
}`,
        difficulty: "Medium",
        damage: 35,
      },
      {
        id: 2,
        text: "Design a hash function that minimizes collisions for string keys.",
        hint: "Use polynomial rolling hash or djb2 algorithm.",
        solution: `function djb2Hash(str, tableSize) {
  let hash = 5381;
  
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
  }
  
  return Math.abs(hash) % tableSize;
}

function polynomialHash(str, tableSize) {
  const prime = 31;
  let hash = 0;
  let pow = 1;
  
  for (let i = 0; i < str.length; i++) {
    hash = (hash + str.charCodeAt(i) * pow) % tableSize;
    pow = (pow * prime) % tableSize;
  }
  
  return hash;
}`,
        difficulty: "Hard",
        damage: 40,
      },
      {
        id: 3,
        text: "Implement a hash table with separate chaining using linked lists.",
        hint: "Use an array of linked lists to handle collisions.",
        solution: `class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTableChaining {
  constructor(size = 10) {
    this.size = size;
    this.buckets = new Array(size).fill(null);
  }
  
  hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % this.size;
  }
  
  set(key, value) {
    const index = this.hash(key);
    
    if (!this.buckets[index]) {
      this.buckets[index] = new Node(key, value);
      return;
    }
    
    let current = this.buckets[index];
    while (current) {
      if (current.key === key) {
        current.value = value;
        return;
      }
      if (!current.next) break;
      current = current.next;
    }
    
    current.next = new Node(key, value);
  }
  
  get(key) {
    const index = this.hash(key);
    let current = this.buckets[index];
    
    while (current) {
      if (current.key === key) {
        return current.value;
      }
      current = current.next;
    }
    
    return undefined;
  }
}`,
        difficulty: "Expert",
        damage: 45,
      },
    ],
  },
  "castle-lord": {
    title: "Castle Lord",
    slug: "castle-lord",
    description: "Face the Castle Lord in the ultimate LIFO/FIFO challenge.",
    image: "/placeholder.svg?height=300&width=300",
    icon: Crown,
    color: "from-gray-500 to-slate-600",
    health: 90,
    difficulty: "Medium",
    timeLimit: 300, // 5 minutes
    questions: [
      {
        id: 1,
        text: "Implement a stack that supports push, pop, and getMin operations in O(1) time.",
        hint: "Use an auxiliary stack to keep track of minimum values.",
        solution: `class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = [];
  }
  
  push(val) {
    this.stack.push(val);
    
    if (this.minStack.length === 0 || val <= this.getMin()) {
      this.minStack.push(val);
    }
  }
  
  pop() {
    const popped = this.stack.pop();
    
    if (popped === this.getMin()) {
      this.minStack.pop();
    }
    
    return popped;
  }
  
  top() {
    return this.stack[this.stack.length - 1];
  }
  
  getMin() {
    return this.minStack[this.minStack.length - 1];
  }
}`,
        difficulty: "Medium",
        damage: 30,
      },
      {
        id: 2,
        text: "Implement a queue using two stacks.",
        hint: "Use one stack for enqueue and another for dequeue operations.",
        solution: `class QueueUsingStacks {
  constructor() {
    this.inStack = [];
    this.outStack = [];
  }
  
  enqueue(val) {
    this.inStack.push(val);
  }
  
  dequeue() {
    if (this.outStack.length === 0) {
      while (this.inStack.length > 0) {
        this.outStack.push(this.inStack.pop());
      }
    }
    
    return this.outStack.pop();
  }
  
  peek() {
    if (this.outStack.length === 0) {
      while (this.inStack.length > 0) {
        this.outStack.push(this.inStack.pop());
      }
    }
    
    return this.outStack[this.outStack.length - 1];
  }
  
  empty() {
    return this.inStack.length === 0 && this.outStack.length === 0;
  }
}`,
        difficulty: "Medium",
        damage: 35,
      },
      {
        id: 3,
        text: "Use a stack to evaluate a postfix expression.",
        hint: "Push operands onto the stack and apply operators to the top two elements.",
        solution: `function evaluatePostfix(expression) {
  const stack = [];
  const tokens = expression.split(' ');
  
  for (let token of tokens) {
    if (isOperator(token)) {
      const b = stack.pop();
      const a = stack.pop();
      
      switch (token) {
        case '+':
          stack.push(a + b);
          break;
        case '-':
          stack.push(a - b);
          break;
        case '*':
          stack.push(a * b);
          break;
        case '/':
          stack.push(Math.floor(a / b));
          break;
      }
    } else {
      stack.push(parseInt(token));
    }
  }
  
  return stack[0];
}

function isOperator(token) {
  return ['+', '-', '*', '/'].includes(token);
}`,
        difficulty: "Hard",
        damage: 40,
      },
    ],
  },
  "dungeon-master": {
    title: "Dungeon Master",
    slug: "dungeon-master",
    description: "Face the ultimate DP challenge against the Dungeon Master.",
    image: "/placeholder.svg?height=300&width=300",
    icon: Brain,
    color: "from-indigo-500 to-purple-600",
    health: 250,
    difficulty: "Legendary",
    timeLimit: 1200, // 20 minutes
    questions: [
      {
        id: 1,
        text: "Solve the 0/1 Knapsack problem using dynamic programming. Given weights and values of items, find the maximum value that can be obtained with a given weight capacity.",
        hint: "Use a 2D DP table where dp[i][w] represents the maximum value with first i items and weight capacity w.",
        solution: `function knapsack(weights, values, capacity) {
  const n = weights.length;
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
        difficulty: "Hard",
        damage: 60,
      },
      {
        id: 2,
        text: "Find the length of the Longest Common Subsequence (LCS) between two strings using dynamic programming.",
        hint: "Use a 2D DP table where dp[i][j] represents LCS length of first i characters of string1 and first j characters of string2.",
        solution: `function longestCommonSubsequence(text1, text2) {
  const m = text1.length;
  const n = text2.length;
  const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
  
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
        difficulty: "Expert",
        damage: 70,
      },
      {
        id: 3,
        text: "Solve the Edit Distance problem: find the minimum number of operations (insert, delete, replace) to convert one string to another.",
        hint: "Use a 2D DP table where dp[i][j] represents the minimum edit distance between first i characters of string1 and first j characters of string2.",
        solution: `function minDistance(word1, word2) {
  const m = word1.length;
  const n = word2.length;
  const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
  
  // Initialize base cases
  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(
          dp[i - 1][j],     // delete
          dp[i][j - 1],     // insert
          dp[i - 1][j - 1]  // replace
        );
      }
    }
  }
  
  return dp[m][n];
}`,
        difficulty: "Master",
        damage: 80,
      },
    ],
  },
};

import { useParams } from "next/navigation";

export default function BossBattlePage() {
  const params = useParams();
  const boss = BOSS_DATA[params?.slug as keyof typeof BOSS_DATA];

  if (!boss) {
    notFound();
  }

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [bossHealth, setBossHealth] = useState(boss.health);
  const [playerHealth, setPlayerHealth] = useState(100);
  const [timeLeft, setTimeLeft] = useState(boss.timeLimit);
  const [userCode, setUserCode] = useState("");
  const [battlePhase, setBattlePhase] = useState<
    "intro" | "battle" | "victory" | "defeat"
  >("intro");
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [battleLog, setBattleLog] = useState<string[]>([]);

  const { toast } = useToast();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const IconComponent = boss.icon;

  useEffect(() => {
    if (battlePhase === "battle" && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && battlePhase === "battle") {
      handleTimeUp();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timeLeft, battlePhase]);

  const startBattle = () => {
    setBattlePhase("battle");
    setBattleLog([`The battle against ${boss.title} begins!`]);
  };

  const handleTimeUp = () => {
    setPlayerHealth(0);
    setBattlePhase("defeat");
    setBattleLog((prev) => [...prev, "Time's up! You have been defeated!"]);
  };

  const submitCode = () => {
    if (!userCode.trim()) {
      toast({
        title: "No code submitted",
        description: "Please write your solution before submitting.",
        variant: "destructive",
      });
      return;
    }

    const question = boss.questions[currentQuestion];
    const isCorrect = evaluateCode(userCode, question.solution);

    if (isCorrect) {
      // Player deals damage
      const newBossHealth = Math.max(0, bossHealth - question.damage);
      setBossHealth(newBossHealth);
      setStreak(streak + 1);
      setScore(score + question.damage * (streak + 1));

      setBattleLog((prev) => [
        ...prev,
        `Correct! You deal ${question.damage} damage to ${boss.title}!`,
        `Streak: ${streak + 1}x | Score: ${
          score + question.damage * (streak + 1)
        }`,
      ]);

      toast({
        title: "Correct Solution!",
        description: `You dealt ${question.damage} damage! Streak: ${
          streak + 1
        }x`,
      });

      if (newBossHealth === 0) {
        setBattlePhase("victory");
        setBattleLog((prev) => [
          ...prev,
          `Victory! You have defeated ${boss.title}!`,
        ]);
      } else if (currentQuestion < boss.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setUserCode("");
        setShowHint(false);
      }
    } else {
      // Boss deals damage
      const damage = Math.floor(Math.random() * 20) + 10;
      const newPlayerHealth = Math.max(0, playerHealth - damage);
      setPlayerHealth(newPlayerHealth);
      setStreak(0);

      setBattleLog((prev) => [
        ...prev,
        `Incorrect solution! ${boss.title} deals ${damage} damage to you!`,
        "Streak broken!",
      ]);

      toast({
        title: "Incorrect Solution",
        description: `You took ${damage} damage! Try again.`,
        variant: "destructive",
      });

      if (newPlayerHealth === 0) {
        setBattlePhase("defeat");
        setBattleLog((prev) => [
          ...prev,
          `Defeat! ${boss.title} has bested you in battle!`,
        ]);
      }
    }
  };

  const evaluateCode = (userCode: string, solution: string): boolean => {
    // Simple evaluation - in a real app, you'd want to run the code safely
    // This is a simplified check for demonstration
    const normalizeCode = (code: string) =>
      code
        .replace(/\s+/g, " ")
        .replace(/[{}();]/g, "")
        .toLowerCase()
        .trim();

    const userNormalized = normalizeCode(userCode);
    const solutionNormalized = normalizeCode(solution);

    // Check if user code contains key elements of the solution
    const keyWords = solutionNormalized
      .split(" ")
      .filter(
        (word) =>
          word.length > 3 &&
          !["function", "return", "const", "let", "var"].includes(word)
      );

    const matchCount = keyWords.filter((word) =>
      userNormalized.includes(word)
    ).length;
    return matchCount >= Math.ceil(keyWords.length * 0.6); // 60% match threshold
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const restartBattle = () => {
    setCurrentQuestion(0);
    setBossHealth(boss.health);
    setPlayerHealth(100);
    setTimeLeft(boss.timeLimit);
    setUserCode("");
    setBattlePhase("intro");
    setShowHint(false);
    setScore(0);
    setStreak(0);
    setBattleLog([]);
  };

  if (battlePhase === "intro") {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-xl text-white"
            >
              <Boxes className="h-6 w-6 text-primary" />
              <span>AlgoQuest</span>
            </Link>
            <Link
              href="/levels"
              className="text-white hover:text-primary transition-colors"
            >
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Levels
              </Button>
            </Link>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-6">
          <Card className="max-w-2xl w-full bg-black/50 border-red-500/50">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div
                  className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-r ${boss.color} flex items-center justify-center mb-4`}
                >
                  <IconComponent className="h-16 w-16 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  {boss.title}
                </h1>
                <Badge className="bg-red-600 text-white mb-4">
                  {boss.difficulty}
                </Badge>
                <p className="text-gray-300 mb-6">{boss.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 text-white">
                <div className="bg-red-900/50 p-4 rounded-lg">
                  <Heart className="h-6 w-6 mx-auto mb-2 text-red-400" />
                  <div className="text-sm text-gray-300">Boss Health</div>
                  <div className="text-xl font-bold">{boss.health}</div>
                </div>
                <div className="bg-blue-900/50 p-4 rounded-lg">
                  <Clock className="h-6 w-6 mx-auto mb-2 text-blue-400" />
                  <div className="text-sm text-gray-300">Time Limit</div>
                  <div className="text-xl font-bold">
                    {formatTime(boss.timeLimit)}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-2">
                  Battle Challenges
                </h3>
                <div className="text-sm text-gray-300">
                  {boss.questions.length} coding challenges await you
                </div>
              </div>

              <Button
                onClick={startBattle}
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <Sword className="mr-2 h-5 w-5" />
                Begin Battle
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (battlePhase === "victory") {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-xl text-white"
            >
              <Boxes className="h-6 w-6 text-primary" />
              <span>AlgoQuest</span>
            </Link>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-6">
          <Card className="max-w-2xl w-full bg-black/50 border-yellow-500/50">
            <CardContent className="p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Trophy className="h-24 w-24 mx-auto text-yellow-400 mb-4" />
                <h1 className="text-4xl font-bold text-white mb-2">VICTORY!</h1>
                <p className="text-xl text-gray-300 mb-6">
                  You have defeated {boss.title}!
                </p>
              </motion.div>

              <div className="grid grid-cols-2 gap-4 mb-6 text-white">
                <div className="bg-yellow-900/50 p-4 rounded-lg">
                  <Trophy className="h-6 w-6 mx-auto mb-2 text-yellow-400" />
                  <div className="text-sm text-gray-300">Final Score</div>
                  <div className="text-xl font-bold">{score}</div>
                </div>
                <div className="bg-green-900/50 p-4 rounded-lg">
                  <Zap className="h-6 w-6 mx-auto mb-2 text-green-400" />
                  <div className="text-sm text-gray-300">Max Streak</div>
                  <div className="text-xl font-bold">{streak}</div>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Button onClick={restartBattle} variant="outline">
                  Battle Again
                </Button>
                <Link href="/levels">
                  <Button className="bg-green-600 hover:bg-green-700">
                    Continue Journey
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (battlePhase === "defeat") {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-900 via-gray-900 to-black">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-xl text-white"
            >
              <Boxes className="h-6 w-6 text-primary" />
              <span>AlgoQuest</span>
            </Link>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-6">
          <Card className="max-w-2xl w-full bg-black/50 border-red-500/50">
            <CardContent className="p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Skull className="h-24 w-24 mx-auto text-red-400 mb-4" />
                <h1 className="text-4xl font-bold text-white mb-2">DEFEAT</h1>
                <p className="text-xl text-gray-300 mb-6">
                  {boss.title} has proven too powerful... for now.
                </p>
              </motion.div>

              <div className="grid grid-cols-2 gap-4 mb-6 text-white">
                <div className="bg-red-900/50 p-4 rounded-lg">
                  <Trophy className="h-6 w-6 mx-auto mb-2 text-red-400" />
                  <div className="text-sm text-gray-300">Score Achieved</div>
                  <div className="text-xl font-bold">{score}</div>
                </div>
                <div className="bg-blue-900/50 p-4 rounded-lg">
                  <Shield className="h-6 w-6 mx-auto mb-2 text-blue-400" />
                  <div className="text-sm text-gray-300">Progress</div>
                  <div className="text-xl font-bold">
                    {currentQuestion + 1}/{boss.questions.length}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Button
                  onClick={restartBattle}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Try Again
                </Button>
                <Link href="/levels">
                  <Button variant="outline">Return to Levels</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const question = boss.questions[currentQuestion];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-red-900 to-black">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-white"
          >
            <Boxes className="h-6 w-6 text-primary" />
            <span>AlgoQuest</span>
          </Link>
          <div className="flex items-center gap-4 text-white">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className={timeLeft < 60 ? "text-red-400" : ""}>
                {formatTime(timeLeft)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              <span>{score}</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <span>{streak}x</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="container max-w-7xl">
          {/* Battle Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card className="bg-black/50 border-red-500/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-white">{boss.title}</h3>
                  <Badge className="bg-red-600">{boss.difficulty}</Badge>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="h-4 w-4 text-red-400" />
                  <Progress
                    value={(bossHealth / boss.health) * 100}
                    className="flex-1 h-2"
                  />
                  <span className="text-sm text-white">
                    {bossHealth}/{boss.health}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <IconComponent className="h-8 w-8 text-red-400" />
                  <div className="text-sm text-gray-300">
                    Challenge {currentQuestion + 1} of {boss.questions.length}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/50 border-blue-500/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-white">Your Status</h3>
                  <Badge className="bg-blue-600">Hero</Badge>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="h-4 w-4 text-blue-400" />
                  <Progress value={playerHealth} className="flex-1 h-2" />
                  <span className="text-sm text-white">{playerHealth}/100</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-8 w-8 text-blue-400" />
                  <div className="text-sm text-gray-300">
                    Streak: {streak}x | Score: {score}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Challenge */}
            <div className="space-y-6">
              <Card className="bg-black/50 border-yellow-500/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white">
                      Challenge {currentQuestion + 1}
                    </h2>
                    <Badge
                      className={
                        question.difficulty === "Easy"
                          ? "bg-green-600"
                          : question.difficulty === "Medium"
                          ? "bg-yellow-600"
                          : question.difficulty === "Hard"
                          ? "bg-red-600"
                          : question.difficulty === "Expert"
                          ? "bg-purple-600"
                          : "bg-pink-600"
                      }
                    >
                      {question.difficulty}
                    </Badge>
                  </div>
                  <p className="text-gray-300 mb-4">{question.text}</p>

                  {showHint && (
                    <div className="bg-blue-900/50 p-4 rounded-lg mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="h-4 w-4 text-blue-400" />
                        <span className="text-sm font-medium text-blue-400">
                          Hint
                        </span>
                      </div>
                      <p className="text-sm text-gray-300">{question.hint}</p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      onClick={() => setShowHint(!showHint)}
                      variant="outline"
                      size="sm"
                    >
                      {showHint ? "Hide Hint" : "Show Hint"}
                    </Button>
                    <div className="text-sm text-gray-400 flex items-center">
                      Damage: {question.damage}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/50 border-gray-500/50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4">
                    Your Solution
                  </h3>
                  <Textarea
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    placeholder="Write your solution here..."
                    className="min-h-[300px] font-mono text-sm bg-gray-900 border-gray-600 text-white"
                  />
                  <div className="flex gap-2 mt-4">
                    <Button
                      onClick={submitCode}
                      className="bg-green-600 hover:bg-green-700"
                      disabled={!userCode.trim()}
                    >
                      <Sword className="mr-2 h-4 w-4" />
                      Attack!
                    </Button>
                    <Button onClick={() => setUserCode("")} variant="outline">
                      Clear
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Battle Log */}
            <div className="space-y-6">
              <Card className="bg-black/50 border-purple-500/50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4">
                    Battle Log
                  </h3>
                  <div className="bg-gray-900 p-4 rounded-lg h-[400px] overflow-y-auto">
                    <AnimatePresence>
                      {battleLog.map((log, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-gray-300 mb-2 p-2 bg-gray-800 rounded"
                        >
                          {log}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/50 border-gray-500/50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4">
                    Battle Progress
                  </h3>
                  <div className="space-y-4">
                    {boss.questions.map((q, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            index < currentQuestion
                              ? "bg-green-600 text-white"
                              : index === currentQuestion
                              ? "bg-yellow-600 text-white"
                              : "bg-gray-600 text-gray-300"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-white">
                            Challenge {index + 1}
                          </div>
                          <div className="text-xs text-gray-400">
                            {q.difficulty} - {q.damage} damage
                          </div>
                        </div>
                        {index < currentQuestion && (
                          <Trophy className="h-4 w-4 text-green-400" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
