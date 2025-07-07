/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";

type SortingAlgorithm =
  | "bubble"
  | "selection"
  | "insertion"
  | "merge"
  | "quick";

interface SortingVisualizerProps {
  initialArray?: number[];
  maxValue?: number;
  arraySize?: number;
}

export function SortingVisualizer({
  initialArray,
  maxValue = 100,
  arraySize = 20,
}: SortingVisualizerProps) {
  const [array, setArray] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [comparingIndices, setComparingIndices] = useState<number[]>([]);
  const [swappingIndices, setSwappingIndices] = useState<number[]>([]);
  const [pivotIndex, setPivotIndex] = useState<number | null>(null);
  const [algorithm, setAlgorithm] = useState<SortingAlgorithm>("bubble");
  const [speed, setSpeed] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [sortingSteps, setSortingSteps] = useState<any[]>([]);
  const animationRef = useRef<number | null>(null);
  const speedRef = useRef(speed);

  // Update speed ref when speed changes
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  // Initialize array
  useEffect(() => {
    resetArray();
  }, [arraySize, maxValue, initialArray]);

  // Handle animation
  useEffect(() => {
    if (isPlaying && currentStep < sortingSteps.length) {
      const step = sortingSteps[currentStep];

      // Apply the step
      if (step.type === "compare") {
        setComparingIndices(step.indices);
        setSwappingIndices([]);
      } else if (step.type === "swap") {
        setComparingIndices([]);
        setSwappingIndices(step.indices);

        // Update array
        if (step.newArray) {
          setArray([...step.newArray]);
        }
      } else if (step.type === "pivot") {
        setPivotIndex(step.index);
      } else if (step.type === "mark-sorted") {
        setSortedIndices((prev) => [...prev, ...step.indices]);
      }

      // Schedule next step
      const delay = 1000 - speedRef.current * 9;
      animationRef.current = window.setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, delay);
    } else if (isPlaying && currentStep >= sortingSteps.length) {
      // Sorting complete
      setIsPlaying(false);
      setIsSorted(true);
      setSortedIndices(Array.from({ length: array.length }, (_, i) => i));
      setComparingIndices([]);
      setSwappingIndices([]);
      setPivotIndex(null);
    }

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [isPlaying, currentStep, sortingSteps, array.length]);

  const resetArray = () => {
    if (initialArray) {
      setArray([...initialArray]);
    } else {
      const newArray = Array.from(
        { length: arraySize },
        () => Math.floor(Math.random() * maxValue) + 1
      );
      setArray(newArray);
    }

    setSortedIndices([]);
    setComparingIndices([]);
    setSwappingIndices([]);
    setPivotIndex(null);
    setCurrentStep(0);
    setTotalSteps(0);
    setSortingSteps([]);
    setIsSorted(false);
    setIsPlaying(false);

    if (animationRef.current) {
      clearTimeout(animationRef.current);
      animationRef.current = null;
    }
  };

  const generateSortingSteps = () => {
    const steps: any[] = [];
    const arrayCopy = [...array];

    switch (algorithm) {
      case "bubble":
        bubbleSort(arrayCopy, steps);
        break;
      case "selection":
        selectionSort(arrayCopy, steps);
        break;
      case "insertion":
        insertionSort(arrayCopy, steps);
        break;
      case "merge":
        const mergeSteps: any[] = [];
        mergeSort(arrayCopy, 0, arrayCopy.length - 1, mergeSteps);
        steps.push(...mergeSteps);
        break;
      case "quick":
        const quickSteps: any[] = [];
        quickSort(arrayCopy, 0, arrayCopy.length - 1, quickSteps);
        steps.push(...quickSteps);
        break;
    }

    setSortingSteps(steps);
    setTotalSteps(steps.length);
    return steps;
  };

  const startSorting = () => {
    if (isSorted) {
      resetArray();
      return;
    }

    if (!isPlaying) {
      if (currentStep === 0 || currentStep >= sortingSteps.length) {
        // Generate steps if not already generated
        generateSortingSteps();
      }
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  const resetSorting = () => {
    resetArray();
  };

  // Sorting algorithms
  const bubbleSort = (arr: number[], steps: any[]) => {
    const n = arr.length;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        // Compare
        steps.push({
          type: "compare",
          indices: [j, j + 1],
        });

        if (arr[j] > arr[j + 1]) {
          // Swap
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          steps.push({
            type: "swap",
            indices: [j, j + 1],
            newArray: [...arr],
          });
        }
      }

      // Mark as sorted
      steps.push({
        type: "mark-sorted",
        indices: [n - i - 1],
      });
    }
  };

  const selectionSort = (arr: number[], steps: any[]) => {
    const n = arr.length;

    for (let i = 0; i < n; i++) {
      let minIdx = i;

      for (let j = i + 1; j < n; j++) {
        // Compare
        steps.push({
          type: "compare",
          indices: [minIdx, j],
        });

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }

      // Swap
      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        steps.push({
          type: "swap",
          indices: [i, minIdx],
          newArray: [...arr],
        });
      }

      // Mark as sorted
      steps.push({
        type: "mark-sorted",
        indices: [i],
      });
    }
  };

  const insertionSort = (arr: number[], steps: any[]) => {
    const n = arr.length;

    for (let i = 1; i < n; i++) {
      const key = arr[i];
      let j = i - 1;

      // Mark current element
      steps.push({
        type: "compare",
        indices: [i],
      });

      while (j >= 0 && arr[j] > key) {
        // Compare
        steps.push({
          type: "compare",
          indices: [j, j + 1],
        });

        // Move elements
        arr[j + 1] = arr[j];
        steps.push({
          type: "swap",
          indices: [j, j + 1],
          newArray: [...arr],
        });

        j--;
      }

      arr[j + 1] = key;

      if (j + 1 !== i) {
        steps.push({
          type: "swap",
          indices: [j + 1],
          newArray: [...arr],
        });
      }

      // Mark as sorted
      steps.push({
        type: "mark-sorted",
        indices: [0, i],
      });
    }
  };

  const mergeSort = (
    arr: number[],
    left: number,
    right: number,
    steps: any[]
  ) => {
    if (left >= right) {
      return;
    }

    const mid = Math.floor((left + right) / 2);

    mergeSort(arr, left, mid, steps);
    mergeSort(arr, mid + 1, right, steps);

    merge(arr, left, mid, right, steps);
  };

  const merge = (
    arr: number[],
    left: number,
    mid: number,
    right: number,
    steps: any[]
  ) => {
    const n1 = mid - left + 1;
    const n2 = right - mid;

    // Create temp arrays
    const L = new Array(n1);
    const R = new Array(n2);

    // Copy data to temp arrays
    for (let i = 0; i < n1; i++) {
      L[i] = arr[left + i];
    }
    for (let j = 0; j < n2; j++) {
      R[j] = arr[mid + 1 + j];
    }

    // Merge the temp arrays back
    let i = 0;
    let j = 0;
    let k = left;

    while (i < n1 && j < n2) {
      // Compare
      steps.push({
        type: "compare",
        indices: [left + i, mid + 1 + j],
      });

      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        j++;
      }

      steps.push({
        type: "swap",
        indices: [k],
        newArray: [...arr],
      });

      k++;
    }

    // Copy remaining elements
    while (i < n1) {
      arr[k] = L[i];
      steps.push({
        type: "swap",
        indices: [k],
        newArray: [...arr],
      });
      i++;
      k++;
    }

    while (j < n2) {
      arr[k] = R[j];
      steps.push({
        type: "swap",
        indices: [k],
        newArray: [...arr],
      });
      j++;
      k++;
    }

    // Mark subarray as sorted
    steps.push({
      type: "mark-sorted",
      indices: Array.from({ length: right - left + 1 }, (_, i) => left + i),
    });
  };

  const quickSort = (
    arr: number[],
    low: number,
    high: number,
    steps: any[]
  ) => {
    if (low < high) {
      // Partition the array
      const pi = partition(arr, low, high, steps);

      // Sort elements before and after partition
      quickSort(arr, low, pi - 1, steps);
      quickSort(arr, pi + 1, high, steps);
    } else if (low === high) {
      // Single element is sorted
      steps.push({
        type: "mark-sorted",
        indices: [low],
      });
    }
  };

  const partition = (
    arr: number[],
    low: number,
    high: number,
    steps: any[]
  ) => {
    // Choose pivot
    const pivot = arr[high];
    steps.push({
      type: "pivot",
      index: high,
    });

    let i = low - 1;

    for (let j = low; j <= high - 1; j++) {
      // Compare with pivot
      steps.push({
        type: "compare",
        indices: [j, high],
      });

      if (arr[j] < pivot) {
        i++;

        // Swap
        [arr[i], arr[j]] = [arr[j], arr[i]];
        steps.push({
          type: "swap",
          indices: [i, j],
          newArray: [...arr],
        });
      }
    }
    // Swap pivot to its final position
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    steps.push({
      type: "swap",
      indices: [i + 1, high],
      newArray: [...arr],
    });

    // Mark pivot as in correct position
    steps.push({
      type: "mark-sorted",
      indices: [i + 1],
    });

    return i + 1;
  };

  const getBarColor = (index: number) => {
    if (swappingIndices.includes(index)) {
      return "bg-yellow-500";
    } else if (comparingIndices.includes(index)) {
      return "bg-blue-500";
    } else if (pivotIndex === index) {
      return "bg-purple-500";
    } else if (sortedIndices.includes(index)) {
      return "bg-green-500";
    } else {
      return "bg-primary";
    }
  };

  const getBarHeight = (value: number) => {
    return `${(value / maxValue) * 100}%`;
  };

  return (
    <Card className="p-6 w-full">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Select
              value={algorithm}
              onValueChange={(value) => setAlgorithm(value as SortingAlgorithm)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Algorithm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bubble">Bubble Sort</SelectItem>
                <SelectItem value="selection">Selection Sort</SelectItem>
                <SelectItem value="insertion">Insertion Sort</SelectItem>
                <SelectItem value="merge">Merge Sort</SelectItem>
                <SelectItem value="quick">Quick Sort</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={resetSorting}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              Speed:
            </span>
            <div className="w-full sm:w-[150px]">
              <Slider
                value={[speed]}
                min={1}
                max={100}
                step={1}
                onValueChange={(value: number[]) => setSpeed(value[0])}
              />
            </div>
          </div>
          <Button onClick={startSorting}>
            {isPlaying ? (
              <>
                <Pause className="mr-2 h-4 w-4" /> Pause
              </>
            ) : isSorted ? (
              <>
                <RotateCcw className="mr-2 h-4 w-4" /> Reset
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" /> Start
              </>
            )}
          </Button>
        </div>

        <div className="relative h-64 border rounded-md bg-muted/30 overflow-hidden">
          <div className="absolute inset-0 flex items-end justify-around">
            {array.map((value, index) => (
              <motion.div
                key={index}
                className={`w-[4%] rounded-t-sm ${getBarColor(index)}`}
                style={{ height: getBarHeight(value) }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                layout
              >
                {array.length <= 20 && (
                  <div className="text-xs text-center mt-2 rotate-90 origin-bottom-left whitespace-nowrap">
                    {value}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>
              Progress: {currentStep} / {totalSteps || "?"}
            </span>
            <div className="flex gap-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                <span>Comparing</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
                <span>Swapping</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                <span>Sorted</span>
              </div>
              {algorithm === "quick" && (
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-purple-500 mr-1"></div>
                  <span>Pivot</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium">Algorithm Details</h3>
          <div className="text-sm text-muted-foreground">
            {algorithm === "bubble" && (
              <div>
                <p>
                  <strong>Bubble Sort</strong> - Time Complexity: O(n²)
                </p>
                <p>
                  Repeatedly steps through the list, compares adjacent elements,
                  and swaps them if they are in the wrong order. The pass
                  through the list is repeated until no swaps are needed.
                </p>
              </div>
            )}
            {algorithm === "selection" && (
              <div>
                <p>
                  <strong>Selection Sort</strong> - Time Complexity: O(n²)
                </p>
                <p>
                  Divides the input list into two parts: a sorted sublist and an
                  unsorted sublist. It repeatedly selects the smallest element
                  from the unsorted sublist and moves it to the end of the
                  sorted sublist.
                </p>
              </div>
            )}
            {algorithm === "insertion" && (
              <div>
                <p>
                  <strong>Insertion Sort</strong> - Time Complexity: O(n²)
                </p>
                <p>
                  Builds the sorted array one item at a time by comparing each
                  new element with the already sorted elements and inserting it
                  into its correct position.
                </p>
              </div>
            )}
            {algorithm === "merge" && (
              <div>
                <p>
                  <strong>Merge Sort</strong> - Time Complexity: O(n log n)
                </p>
                <p>
                  A divide and conquer algorithm that divides the input array
                  into two halves, recursively sorts them, and then merges the
                  sorted halves.
                </p>
              </div>
            )}
            {algorithm === "quick" && (
              <div>
                <p>
                  <strong>Quick Sort</strong> - Time Complexity: O(n log n)
                  average, O(n²) worst case
                </p>
                <p>
                  A divide and conquer algorithm that picks an element as a
                  pivot and partitions the array around the pivot. Elements
                  smaller than the pivot go to the left, larger elements go to
                  the right.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
