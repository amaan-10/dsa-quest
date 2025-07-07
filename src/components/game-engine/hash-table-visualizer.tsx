"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Plus, Minus, RotateCcw, Search, Hash } from "lucide-react";

interface HashTableEntry {
  key: string;
  value: string;
  hash: number;
  collisions: number;
}

interface HashTableVisualizerProps {
  size?: number;
  hashFunction?: "simple" | "djb2" | "fnv";
  collisionResolution?: "linear" | "quadratic" | "chaining";
}

export function HashTableVisualizer({
  size = 10,
  hashFunction = "simple",
  collisionResolution = "linear",
}: HashTableVisualizerProps) {
  const [tableSize, setTableSize] = useState(size);
  const [table, setTable] = useState<(HashTableEntry | null)[]>(
    Array(size).fill(null)
  );
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [message, setMessage] = useState("");
  const [highlightedIndices, setHighlightedIndices] = useState<number[]>([]);
  const [collisionIndices, setCollisionIndices] = useState<number[]>([]);
  const [activeHashFunction, setActiveHashFunction] = useState(hashFunction);
  const [activeCollisionResolution, setActiveCollisionResolution] =
    useState(collisionResolution);
  const [stats, setStats] = useState({
    totalEntries: 0,
    collisions: 0,
    loadFactor: 0,
  });

  // Update stats when table changes
  useEffect(() => {
    const entries = table.filter(Boolean).length;
    const collisions = table.reduce(
      (acc, entry) => (entry ? acc + entry.collisions : acc),
      0
    );

    setStats({
      totalEntries: entries,
      collisions,
      loadFactor: entries / tableSize,
    });
  }, [table, tableSize]);

  // Hash functions
  const hashFunctions = {
    simple: (key: string) => {
      let hash = 0;
      for (let i = 0; i < key.length; i++) {
        hash += key.charCodeAt(i);
      }
      return hash % tableSize;
    },
    djb2: (key: string) => {
      let hash = 5381;
      for (let i = 0; i < key.length; i++) {
        hash = (hash << 5) + hash + key.charCodeAt(i); // hash * 33 + c
      }
      return Math.abs(hash) % tableSize;
    },
    fnv: (key: string) => {
      const FNV_PRIME = 16777619;
      const FNV_OFFSET_BASIS = 2166136261;
      let hash = FNV_OFFSET_BASIS;
      for (let i = 0; i < key.length; i++) {
        hash ^= key.charCodeAt(i);
        hash *= FNV_PRIME;
      }
      return Math.abs(hash) % tableSize;
    },
  };

  const getHash = (key: string) => {
    return hashFunctions[activeHashFunction](key);
  };

  const handleInsert = () => {
    if (!key.trim() || !value.trim()) {
      setMessage("Please enter both key and value");
      return;
    }

    // Calculate hash
    const hash = getHash(key);
    setHighlightedIndices([hash]);

    // Check if we need to handle a collision
    if (table[hash] && table[hash]?.key !== key) {
      handleCollision(key, value, hash);
    } else {
      // No collision or updating existing key
      const newTable = [...table];
      newTable[hash] = {
        key,
        value,
        hash,
        collisions: 0,
      };
      setTable(newTable);
      setMessage(`Inserted key "${key}" at index ${hash}`);
    }

    setKey("");
    setValue("");

    // Clear highlights after a delay
    setTimeout(() => {
      setHighlightedIndices([]);
      setCollisionIndices([]);
    }, 2000);
  };

  const handleCollision = (key: string, value: string, hash: number) => {
    setCollisionIndices([hash]);

    switch (activeCollisionResolution) {
      case "linear":
        handleLinearProbing(key, value, hash);
        break;
      case "quadratic":
        handleQuadraticProbing(key, value, hash);
        break;
      case "chaining":
        handleChaining(key, value, hash);
        break;
    }
  };

  const handleLinearProbing = (key: string, value: string, hash: number) => {
    let index = hash;
    let collisions = 0;
    const newTable = [...table];

    // Linear probing: check next slot until an empty one is found
    while (newTable[index] !== null && newTable[index]?.key !== key) {
      collisions++;
      index = (index + 1) % tableSize;
      setCollisionIndices((prev) => [...prev, index]);

      // If we've checked all slots, the table is full
      if (index === hash) {
        setMessage("Hash table is full!");
        return;
      }
    }

    // Update or insert the entry
    newTable[index] = {
      key,
      value,
      hash,
      collisions,
    };

    setTable(newTable);
    setMessage(
      `Inserted key "${key}" at index ${index} after ${collisions} collisions`
    );
  };

  const handleQuadraticProbing = (key: string, value: string, hash: number) => {
    let i = 0;
    let collisions = 0;
    const newTable = [...table];

    // Quadratic probing: check slots at hash + i^2 positions
    while (true) {
      const index = (hash + i * i) % tableSize;
      setCollisionIndices((prev) => [...prev, index]);

      if (newTable[index] === null || newTable[index]?.key === key) {
        newTable[index] = {
          key,
          value,
          hash,
          collisions,
        };

        setTable(newTable);
        setMessage(
          `Inserted key "${key}" at index ${index} after ${collisions} collisions`
        );
        return;
      }

      collisions++;
      i++;

      // If we've checked all slots, the table is full
      if (i >= tableSize) {
        setMessage("Hash table is full or cannot find an empty slot!");
        return;
      }
    }
  };

  const handleChaining = (key: string, value: string, hash: number) => {
    // For simplicity in visualization, we'll just overwrite the value
    // In a real implementation, we would maintain a linked list at each index
    setMessage(
      `Collision at index ${hash}. In chaining, we would add to a linked list.`
    );

    const newTable = [...table];
    newTable[hash] = {
      key,
      value,
      hash,
      collisions: (newTable[hash]?.collisions || 0) + 1,
    };

    setTable(newTable);
  };

  const handleSearch = () => {
    if (!searchKey.trim()) {
      setMessage("Please enter a key to search");
      return;
    }

    // Calculate hash
    const hash = getHash(searchKey);
    setHighlightedIndices([hash]);

    // Search based on collision resolution strategy
    switch (activeCollisionResolution) {
      case "linear":
        searchWithLinearProbing(searchKey, hash);
        break;
      case "quadratic":
        searchWithQuadraticProbing(searchKey, hash);
        break;
      case "chaining":
        searchWithChaining(searchKey, hash);
        break;
    }

    setSearchKey("");

    // Clear highlights after a delay
    setTimeout(() => {
      setHighlightedIndices([]);
      setCollisionIndices([]);
    }, 2000);
  };

  const searchWithLinearProbing = (key: string, hash: number) => {
    let index = hash;
    let probes = 0;

    // Linear probing: check next slot until key is found or empty slot is encountered
    while (table[index] !== null) {
      if (table[index]?.key === key) {
        setMessage(
          `Found key "${key}" at index ${index} with value "${table[index]?.value}" after ${probes} probes`
        );
        setHighlightedIndices([index]);
        return;
      }

      probes++;
      index = (index + 1) % tableSize;
      setCollisionIndices((prev) => [...prev, index]);

      // If we've checked all slots, the key is not in the table
      if (index === hash) {
        break;
      }
    }

    setMessage(`Key "${key}" not found in the hash table`);
  };

  const searchWithQuadraticProbing = (key: string, hash: number) => {
    let i = 0;
    let probes = 0;

    // Quadratic probing: check slots at hash + i^2 positions
    while (i < tableSize) {
      const index = (hash + i * i) % tableSize;
      setCollisionIndices((prev) => [...prev, index]);

      if (table[index] === null) {
        break; // Key not found
      }

      if (table[index]?.key === key) {
        setMessage(
          `Found key "${key}" at index ${index} with value "${table[index]?.value}" after ${probes} probes`
        );
        setHighlightedIndices([index]);
        return;
      }

      probes++;
      i++;
    }

    setMessage(`Key "${key}" not found in the hash table`);
  };

  const searchWithChaining = (key: string, hash: number) => {
    // For simplicity, we just check if the key matches
    if (table[hash] && table[hash]?.key === key) {
      setMessage(
        `Found key "${key}" at index ${hash} with value "${table[hash]?.value}"`
      );
      setHighlightedIndices([hash]);
    } else {
      setMessage(`Key "${key}" not found in the hash table`);
    }
  };

  const handleDelete = () => {
    if (!searchKey.trim()) {
      setMessage("Please enter a key to delete");
      return;
    }

    // Calculate hash
    const hash = getHash(searchKey);
    setHighlightedIndices([hash]);

    // Delete based on collision resolution strategy
    switch (activeCollisionResolution) {
      case "linear":
        deleteWithLinearProbing(searchKey, hash);
        break;
      case "quadratic":
        deleteWithQuadraticProbing(searchKey, hash);
        break;
      case "chaining":
        deleteWithChaining(searchKey, hash);
        break;
    }

    setSearchKey("");

    // Clear highlights after a delay
    setTimeout(() => {
      setHighlightedIndices([]);
      setCollisionIndices([]);
    }, 2000);
  };

  const deleteWithLinearProbing = (key: string, hash: number) => {
    let index = hash;

    // Linear probing: check next slot until key is found or empty slot is encountered
    while (table[index] !== null) {
      if (table[index]?.key === key) {
        const newTable = [...table];
        newTable[index] = null;
        setTable(newTable);
        setMessage(`Deleted key "${key}" from index ${index}`);
        return;
      }

      index = (index + 1) % tableSize;
      setCollisionIndices((prev) => [...prev, index]);

      // If we've checked all slots, the key is not in the table
      if (index === hash) {
        break;
      }
    }

    setMessage(`Key "${key}" not found in the hash table`);
  };

  const deleteWithQuadraticProbing = (key: string, hash: number) => {
    let i = 0;

    // Quadratic probing: check slots at hash + i^2 positions
    while (i < tableSize) {
      const index = (hash + i * i) % tableSize;
      setCollisionIndices((prev) => [...prev, index]);

      if (table[index] === null) {
        break; // Key not found
      }

      if (table[index]?.key === key) {
        const newTable = [...table];
        newTable[index] = null;
        setTable(newTable);
        setMessage(`Deleted key "${key}" from index ${index}`);
        return;
      }

      i++;
    }

    setMessage(`Key "${key}" not found in the hash table`);
  };

  const deleteWithChaining = (key: string, hash: number) => {
    // For simplicity, we just check if the key matches
    if (table[hash] && table[hash]?.key === key) {
      const newTable = [...table];
      newTable[hash] = null;
      setTable(newTable);
      setMessage(`Deleted key "${key}" from index ${hash}`);
    } else {
      setMessage(`Key "${key}" not found in the hash table`);
    }
  };

  const resetTable = () => {
    setTable(Array(tableSize).fill(null));
    setMessage("Hash table reset");
    setHighlightedIndices([]);
    setCollisionIndices([]);
  };

  const changeTableSize = (newSize: number) => {
    if (newSize < 1 || newSize > 50) {
      setMessage("Table size must be between 1 and 50");
      return;
    }

    setTableSize(newSize);
    setTable(Array(newSize).fill(null));
    setMessage(`Table size changed to ${newSize}`);
  };

  return (
    <Card className="p-6 w-full">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h3 className="text-lg font-medium">Hash Table Visualizer</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={resetTable}>
              <RotateCcw className="mr-2 h-4 w-4" /> Reset
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Insert */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Insert Key-Value Pair</h4>
            <div className="flex gap-2">
              <Input
                placeholder="Key"
                value={key}
                onChange={(e) => setKey(e.target.value)}
              />
              <Input
                placeholder="Value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <Button onClick={handleInsert}>
                <Plus className="mr-2 h-4 w-4" /> Insert
              </Button>
            </div>
          </div>

          {/* Search/Delete */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Search/Delete by Key</h4>
            <div className="flex gap-2">
              <Input
                placeholder="Key"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
              />
              <Button variant="secondary" onClick={handleSearch}>
                <Search className="mr-2 h-4 w-4" /> Search
              </Button>
              <Button variant="outline" onClick={handleDelete}>
                <Minus className="mr-2 h-4 w-4" /> Delete
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Hash Function */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Hash Function</h4>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={
                  activeHashFunction === "simple" ? "default" : "outline"
                }
                size="sm"
                onClick={() => setActiveHashFunction("simple")}
              >
                Simple Sum
              </Button>
              <Button
                variant={activeHashFunction === "djb2" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveHashFunction("djb2")}
              >
                DJB2
              </Button>
              <Button
                variant={activeHashFunction === "fnv" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveHashFunction("fnv")}
              >
                FNV-1a
              </Button>
            </div>
          </div>

          {/* Collision Resolution */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Collision Resolution</h4>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={
                  activeCollisionResolution === "linear" ? "default" : "outline"
                }
                size="sm"
                onClick={() => setActiveCollisionResolution("linear")}
              >
                Linear Probing
              </Button>
              <Button
                variant={
                  activeCollisionResolution === "quadratic"
                    ? "default"
                    : "outline"
                }
                size="sm"
                onClick={() => setActiveCollisionResolution("quadratic")}
              >
                Quadratic Probing
              </Button>
              <Button
                variant={
                  activeCollisionResolution === "chaining"
                    ? "default"
                    : "outline"
                }
                size="sm"
                onClick={() => setActiveCollisionResolution("chaining")}
              >
                Chaining
              </Button>
            </div>
          </div>

          {/* Table Size */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Table Size</h4>
            <div className="flex gap-2">
              <Input
                type="number"
                value={tableSize}
                onChange={(e) =>
                  changeTableSize(Number.parseInt(e.target.value))
                }
                min="1"
                max="50"
              />
              <Button
                variant="outline"
                onClick={() => changeTableSize(tableSize * 2)}
              >
                2x
              </Button>
            </div>
          </div>
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

        {/* Hash Table Visualization */}
        <div className="border rounded-md overflow-hidden">
          <div className="bg-muted p-2 flex justify-between items-center">
            <h4 className="font-medium">Hash Table</h4>
            <div className="flex gap-4 text-sm">
              <div>Entries: {stats.totalEntries}</div>
              <div>Collisions: {stats.collisions}</div>
              <div>Load Factor: {stats.loadFactor.toFixed(2)}</div>
            </div>
          </div>
          <div className="p-4 grid grid-cols-1 gap-2">
            {Array.from({ length: tableSize }).map((_, index) => {
              const entry = table[index];
              const isHighlighted = highlightedIndices.includes(index);
              const isCollision = collisionIndices.includes(index);

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className={`
                    flex items-center border rounded-md p-2
                    ${isHighlighted ? "bg-primary/10 border-primary" : ""}
                    ${isCollision ? "bg-yellow-100 border-yellow-400" : ""}
                  `}
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-muted rounded-md mr-3">
                    <span className="font-mono font-bold">{index}</span>
                  </div>

                  {entry ? (
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between">
                      <div>
                        <div className="font-medium flex items-center">
                          <span className="mr-2">{entry.key}</span>
                          <Hash className="h-4 w-4 text-muted-foreground" />
                          <span className="ml-1 text-sm text-muted-foreground">
                            {entry.hash}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Value: {entry.value}
                        </div>
                      </div>
                      {entry.collisions > 0 && (
                        <div className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full mt-1 sm:mt-0">
                          {entry.collisions} collision
                          {entry.collisions > 1 ? "s" : ""}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-muted-foreground italic">Empty</div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium">Hash Table Operations</h3>
          <div className="text-sm text-muted-foreground">
            <p>
              <strong>Hash Function:</strong> Converts keys into array indices.
              A good hash function distributes keys uniformly to minimize
              collisions.
            </p>
            <p>
              <strong>Collision Resolution:</strong> Strategies to handle when
              two keys hash to the same index:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2">
              <li>
                <strong>Linear Probing:</strong> If a collision occurs, check
                the next slot sequentially until an empty one is found.
              </li>
              <li>
                <strong>Quadratic Probing:</strong> If a collision occurs, check
                slots at a quadratically increasing distance (hash + 1², hash +
                2², etc.).
              </li>
              <li>
                <strong>Chaining:</strong> Each slot contains a linked list of
                all key-value pairs that hash to that index.
              </li>
            </ul>
            <p className="mt-2">
              <strong>Load Factor:</strong> The ratio of filled slots to total
              slots. As it approaches 1, performance degrades and rehashing
              (increasing table size) may be necessary.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
