"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Boxes,
  LinkIcon,
  GitBranch,
  Hash,
  BarChart,
  Network,
  Zap,
  Crown,
  Star,
  Scroll,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MapNode {
  id: string;
  name: string;
  x: number;
  y: number;
  icon: React.ReactNode;
  status: "locked" | "available" | "completed";
  description: string;
  ancientName: string;
}

interface MapConnection {
  from: string;
  to: string;
}

export function GameMap() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const nodes: MapNode[] = [
    {
      id: "arrays",
      name: "Arrays of Ashoka",
      ancientName: "अशोक सरणी",
      x: 20,
      y: 50,
      icon: <Boxes className="h-6 w-6" />,
      status: "completed",
      description:
        "Master the imperial arrays through the wisdom of ancient organization and mathematics.",
    },
    {
      id: "linkedlists",
      name: "Linked Lists of Chandragupta",
      ancientName: "चन्द्रगुप्त श्रृंखला",
      x: 35,
      y: 30,
      icon: <LinkIcon className="h-6 w-6" />,
      status: "available",
      description:
        "Navigate the strategic chains of knowledge, following the wisdom of ancient rulers.",
    },
    {
      id: "trees",
      name: "Tree of Bodhi",
      ancientName: "बोधि वृक्ष",
      x: 50,
      y: 20,
      icon: <GitBranch className="h-6 w-6" />,
      status: "locked",
      description:
        "Climb the sacred tree of enlightenment, mastering hierarchical wisdom.",
    },
    {
      id: "hashing",
      name: "Hash Palace of Pataliputra",
      ancientName: "पाटलिपुत्र हाश महल",
      x: 65,
      y: 30,
      icon: <Hash className="h-6 w-6" />,
      status: "locked",
      description:
        "Explore the royal palace of efficient data retrieval and ancient indexing.",
    },
    {
      id: "sorting",
      name: "Sorting Ashram",
      ancientName: "क्रमबद्ध आश्रम",
      x: 35,
      y: 70,
      icon: <BarChart className="h-6 w-6" />,
      status: "available",
      description:
        "Learn the meditative art of ordering in this peaceful sanctuary.",
    },
    {
      id: "graphs",
      name: "Graphs of Ancient Trade Routes",
      ancientName: "प्राचीन व्यापार मार्ग",
      x: 80,
      y: 50,
      icon: <Network className="h-6 w-6" />,
      status: "locked",
      description:
        "Explore the vast network of ancient trade routes and royal connections.",
    },
    {
      id: "dp",
      name: "Dynamic Programming Darbar",
      ancientName: "गतिशील प्रोग्रामिंग दरबार",
      x: 65,
      y: 70,
      icon: <Zap className="h-6 w-6" />,
      status: "locked",
      description:
        "Enter the royal court where each decision shapes the kingdom's future.",
    },
    {
      id: "advanced",
      name: "Algorithm Akharas",
      ancientName: "एल्गोरिदम अखाड़ा",
      x: 80,
      y: 80,
      icon: <Crown className="h-6 w-6" />,
      status: "locked",
      description:
        "Train in the ultimate arena where algorithmic warriors test their supreme knowledge.",
    },
  ];

  const connections: MapConnection[] = [
    { from: "arrays", to: "linkedlists" },
    { from: "arrays", to: "sorting" },
    { from: "linkedlists", to: "trees" },
    { from: "trees", to: "hashing" },
    { from: "hashing", to: "graphs" },
    { from: "sorting", to: "dp" },
    { from: "dp", to: "advanced" },
    { from: "graphs", to: "advanced" },
  ];

  const getStatusColor = (status: MapNode["status"]) => {
    switch (status) {
      case "completed":
        return "from-green-500 to-green-600";
      case "available":
        return "from-copper-500 to-copper-600";
      case "locked":
        return "from-gray-400 to-gray-500";
    }
  };

  const getNodeById = (id: string) => nodes.find((node) => node.id === id);

  return (
    <div className="relative w-full h-[600px] bg-gradient-to-br from-sandstone-50 to-sandstone-100 rounded-2xl overflow-hidden border-2 border-copper-200 shadow-inner">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 bg-ancient-pattern opacity-40"></div>

      {/* Mountain/Temple Silhouettes */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-sandstone-300/30 to-transparent"></div>
      <div className="absolute bottom-0 left-1/4 w-24 h-24 bg-sandstone-400/20 rounded-t-full"></div>
      <div className="absolute bottom-0 right-1/3 w-32 h-20 bg-sandstone-400/20 rounded-t-full"></div>

      {/* Connections between nodes */}
      <svg className="absolute inset-0 w-full h-full">
        {connections.map((connection, index) => {
          const fromNode = getNodeById(connection.from);
          const toNode = getNodeById(connection.to);

          if (!fromNode || !toNode) return null;

          const isActive =
            activeNode === connection.from || activeNode === connection.to;
          const isAvailable =
            (fromNode.status === "completed" &&
              toNode.status === "available") ||
            (fromNode.status === "available" &&
              toNode.status === "completed") ||
            (fromNode.status === "completed" && toNode.status === "completed");

          return (
            <motion.line
              key={`${connection.from}-${connection.to}`}
              x1={`${fromNode.x}%`}
              y1={`${fromNode.y}%`}
              x2={`${toNode.x}%`}
              y2={`${toNode.y}%`}
              stroke={
                isAvailable ? (isActive ? "#B8860B" : "#D4A574") : "#CBD5E1"
              }
              strokeWidth={isActive ? 4 : 3}
              strokeDasharray={!isAvailable ? "8,8" : ""}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: index * 0.2 }}
            />
          );
        })}
      </svg>

      {/* Nodes */}
      <div className="absolute inset-0">
        <TooltipProvider>
          {nodes.map((node) => (
            <Tooltip key={node.id}>
              <TooltipTrigger asChild>
                <motion.div
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.8 + Math.random() * 0.5,
                  }}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => setActiveNode(node.id)}
                  onMouseLeave={() => setActiveNode(null)}
                >
                  <div className="relative">
                    {/* Glow effect for active/available nodes */}
                    {(node.status === "available" ||
                      node.status === "completed") && (
                      <div className="absolute inset-0 bg-gradient-to-br from-copper-400 to-copper-600 rounded-full blur-md opacity-30 animate-pulse"></div>
                    )}

                    {/* Main node */}
                    <div
                      className={`
                        relative flex items-center justify-center 
                        w-20 h-20 rounded-full 
                        ${
                          node.status === "locked"
                            ? "bg-gradient-to-br from-gray-300 to-gray-400 text-gray-600"
                            : "bg-gradient-to-br from-white to-sandstone-100 text-copper-700 shadow-lg"
                        }
                        border-4 
                        ${
                          activeNode === node.id
                            ? "border-copper-500"
                            : "border-copper-300"
                        }
                        transition-all duration-300
                      `}
                    >
                      {node.icon}

                      {/* Status indicator */}
                      <div
                        className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br ${getStatusColor(
                          node.status
                        )} border-2 border-white shadow-sm`}
                      >
                        {node.status === "completed" && (
                          <Star className="h-3 w-3 text-white m-auto mt-0.5" />
                        )}
                        {node.status === "available" && (
                          <Scroll className="h-3 w-3 text-white m-auto mt-0.5" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Node Label */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 text-center">
                    <div
                      className={`
                      font-serif text-sm font-semibold whitespace-nowrap
                      ${
                        node.status === "locked"
                          ? "text-gray-500"
                          : "text-foreground"
                      }
                    `}
                    >
                      {node.name}
                    </div>
                    <div className="text-xs text-copper-600 font-sans">
                      {node.ancientName}
                    </div>
                  </div>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="max-w-xs bg-white border-copper-200 shadow-xl"
              >
                <div className="space-y-2">
                  <div className="font-serif font-bold text-copper-700">
                    {node.name}
                  </div>
                  <div className="text-xs text-copper-600">
                    {node.ancientName}
                  </div>
                  <div className="text-sm text-sandstone-700">
                    {node.description}
                  </div>
                  <div className="text-xs font-medium text-copper-600">
                    Status:{" "}
                    {node.status.charAt(0).toUpperCase() + node.status.slice(1)}
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-lg p-4 border border-copper-200 shadow-lg">
        <div className="text-sm font-serif font-semibold text-copper-700 mb-2">
          Legend
        </div>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-green-500 to-green-600"></div>
            <span>Mastered</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-copper-500 to-copper-600"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-gray-400 to-gray-500"></div>
            <span>Locked</span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="absolute bottom-6 right-6">
        <Button
          variant="outline"
          size="sm"
          className="border-copper-300 text-copper-700 hover:bg-copper-50 hover:border-copper-500 transition-all duration-300 bg-white/90 backdrop-blur-sm"
        >
          Explore Full Map
        </Button>
      </div>
    </div>
  );
}
