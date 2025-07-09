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
  Scroll,
  Mountain,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";

interface MapNode {
  id: string;
  name: string;
  x: number;
  y: number;
  icon?: React.ReactNode;
  image?: string;
  status: "locked" | "available" | "completed";
  description: string;
  ancientName: string;
  terrain: "mountain" | "forest" | "desert" | "river" | "palace" | "temple";
}

interface MapConnection {
  from: string;
  to: string;
  type: "road" | "river" | "trade";
}

export function GameMap() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const nodes: MapNode[] = [
    {
      id: "arrays",
      name: "Arrays of Ashoka",
      ancientName: "अशोक सरणी",
      x: 12,
      y: 38,
      icon: <Boxes className="h-4 w-4" />,
      image: "/images/array-map.png",
      status: "completed",
      description:
        "The imperial arrays of Emperor Ashoka's administrative system",
      terrain: "palace",
    },
    {
      id: "linkedlists",
      name: "Linked Lists of Chandragupta",
      ancientName: "चन्द्रगुप्त श्रृंखला",
      x: 30,
      y: 20,
      icon: <LinkIcon className="h-4 w-4" />,
      image: "/images/linked-list-map.png",
      status: "available",
      description: "Strategic chains connecting the Mauryan Empire",
      terrain: "mountain",
    },
    {
      id: "trees",
      name: "Tree of Bodhi",
      ancientName: "बोधि वृक्ष",
      x: 50,
      y: 10,
      icon: <GitBranch className="h-4 w-4" />,
      image: "/images/tree-map.png",
      status: "available",
      description: "The sacred tree of enlightenment in Bodh Gaya",
      terrain: "temple",
    },
    {
      id: "hashing",
      name: "Hash Palace of Pataliputra",
      ancientName: "पाटलिपुत्र हाश महल",
      x: 67,
      y: 15,
      icon: <Hash className="h-4 w-4" />,
      image: "/images/hash-map.png",
      status: "locked",
      description: "The great palace complex of ancient Pataliputra",
      terrain: "palace",
    },
    {
      id: "sorting",
      name: "Sorting Ashram",
      ancientName: "क्रमबद्ध आश्रम",
      x: 30,
      y: 65,
      icon: <BarChart className="h-4 w-4" />,
      image: "/images/sorting-map.png",
      status: "available",
      description: "Peaceful hermitage in the Western Ghats",
      terrain: "forest",
    },
    {
      id: "graphs",
      name: "Trade Routes of Silk Road",
      ancientName: "रेशम मार्ग",
      x: 85,
      y: 28,
      icon: <Network className="h-4 w-4" />,
      image: "/images/graph-map.png",
      status: "locked",
      description: "Ancient trade networks connecting East and West",
      terrain: "desert",
    },
    {
      id: "stacks-queues",
      name: "Scroll Stambh",
      ancientName: "सूची स्तंभ",
      x: 50,
      y: 45,
      icon: <Scroll className="h-4 w-4" />,
      image: "/images/stacks-queues-map.png",
      status: "available",
      description: "Sacred pillar of order where scrolls reveal secrets",
      terrain: "temple",
    },
    {
      id: "dp",
      name: "Dynamic Programming Darbar",
      ancientName: "गतिशील दरबार",
      x: 60,
      y: 70,
      icon: <Zap className="h-4 w-4" />,
      image: "/images/dp-map.png",
      status: "locked",
      description: "Royal court of the Gupta Dynasty",
      terrain: "palace",
    },
    {
      id: "advanced",
      name: "Algorithm Akharas",
      ancientName: "एल्गोरिदम अखाड़ा",
      x: 80,
      y: 60,
      icon: <Crown className="h-4 w-4" />,
      image: "/images/algorithm-map.png",
      status: "locked",
      description: "Training grounds of ancient mathematical warriors",
      terrain: "mountain",
    },
  ];

  const connections: MapConnection[] = [
    { from: "arrays", to: "linkedlists", type: "road" },
    { from: "arrays", to: "sorting", type: "river" },
    { from: "linkedlists", to: "trees", type: "road" },
    { from: "trees", to: "hashing", type: "trade" },
    { from: "hashing", to: "graphs", type: "trade" },
    { from: "sorting", to: "dp", type: "river" },
    { from: "sorting", to: "stacks-queues", type: "road" },
    { from: "stacks-queues", to: "dp", type: "road" },
    { from: "dp", to: "graphs", type: "trade" },
    { from: "dp", to: "advanced", type: "road" },
    { from: "graphs", to: "advanced", type: "trade" },
  ];

  const getConnectionStyle = (type: MapConnection["type"]) => {
    switch (type) {
      case "road":
        return { stroke: "#8B4513", strokeWidth: 3, strokeDasharray: "" };
      case "river":
        return { stroke: "#4682B4", strokeWidth: 4, strokeDasharray: "2,2" };
      case "trade":
        return { stroke: "#DAA520", strokeWidth: 2, strokeDasharray: "5,3" };
    }
  };

  const getNodeById = (id: string) => nodes.find((node) => node.id === id);

  return (
    <div className="w-full overflow-x-auto">
      <div className="relative min-w-[1200px] h-[700px] overflow-hidden">
        {/* Parchment Background */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100"
          style={{
            backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(139, 69, 19, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(160, 82, 45, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(205, 133, 63, 0.06) 0%, transparent 50%),
            linear-gradient(45deg, transparent 48%, rgba(139, 69, 19, 0.02) 49%, rgba(139, 69, 19, 0.02) 51%, transparent 52%),
            linear-gradient(-45deg, transparent 48%, rgba(160, 82, 45, 0.02) 49%, rgba(160, 82, 45, 0.02) 51%, transparent 52%)
          `,
            backgroundSize:
              "200px 200px, 300px 300px, 250px 250px, 20px 20px, 20px 20px",
          }}
        />

        {/* Aged Paper Texture */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(139, 69, 19, 0.03) 2px,
              rgba(139, 69, 19, 0.03) 4px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(160, 82, 45, 0.03) 2px,
              rgba(160, 82, 45, 0.03) 4px
            )
          `,
          }}
        />

        {/* Weathered Edges */}
        <div
          className="absolute inset-0 border-8 border-amber-800 opacity-60"
          style={{
            borderImage:
              "url(\"data:image/svg+xml,%3csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m0,0 l100,0 l100,100 l0,100 z' fill='none' stroke='%23654321' strokeWidth='8' strokeDasharray='5,3'/%3e%3c/svg%3e\") 8",
          }}
        />

        {/* Decorative Corner Flourishes */}
        <div
          className="absolute top-4 left-4 w-16 h-16 border-l-4 border-t-4 border-amber-800 opacity-60"
          style={{ borderImage: "linear-gradient(45deg, #8B4513, #CD853F) 1" }}
        />
        <div
          className="absolute top-4 right-4 w-16 h-16 border-r-4 border-t-4 border-amber-800 opacity-60"
          style={{ borderImage: "linear-gradient(-45deg, #8B4513, #CD853F) 1" }}
        />
        <div
          className="absolute bottom-4 left-4 w-16 h-16 border-l-4 border-b-4 border-amber-800 opacity-60"
          style={{ borderImage: "linear-gradient(-45deg, #8B4513, #CD853F) 1" }}
        />
        <div
          className="absolute bottom-4 right-4 w-16 h-16 border-r-4 border-b-4 border-amber-800 opacity-60"
          style={{ borderImage: "linear-gradient(45deg, #8B4513, #CD853F) 1" }}
        />

        {/* Compass Rose */}
        <div className="absolute top-8 right-8 w-28 h-28 flex items-center justify-center">
          <div className="relative">
            <Image
              src="/images/compass.png"
              alt="compass"
              width={500}
              height={500}
              className="h-20 w-20"
            />
          </div>
        </div>

        {/* Mountain Ranges */}
        <div className="absolute top-16 left-1/4 flex space-x-1 opacity-40">
          <Mountain className="h-8 w-8 text-amber-700" />
          <Mountain className="h-10 w-10 text-amber-700" />
          <Mountain className="h-6 w-6 text-amber-700" />
        </div>
        <div className="absolute bottom-20 right-1/4 flex space-x-1 opacity-40">
          <Mountain className="h-6 w-6 text-amber-700" />
          <Mountain className="h-12 w-12 text-amber-700" />
          <Mountain className="h-8 w-8 text-amber-700" />
        </div>

        {/* Rivers */}
        <svg className="absolute inset-0 w-full h-full opacity-30">
          <path
            d="M 0 400 Q 200 380 400 420 Q 600 460 800 440"
            stroke="#4682B4"
            strokeWidth="6"
            fill="none"
            strokeDasharray="3,2"
          />
          <path
            d="M 100 100 Q 300 120 500 80 Q 700 40 900 60"
            stroke="#4682B4"
            strokeWidth="4"
            fill="none"
            strokeDasharray="2,1"
          />
        </svg>

        {/* Ancient Map Grid */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <defs>
            <pattern
              id="ancientGrid"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 50 0 L 0 0 0 50"
                fill="none"
                stroke="#8B4513"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ancientGrid)" />
        </svg>

        {/* Connections between nodes */}
        <svg className="absolute inset-0 w-full h-full">
          {connections.map((connection, index) => {
            const fromNode = getNodeById(connection.from);
            const toNode = getNodeById(connection.to);

            if (!fromNode || !toNode) return null;

            const isActive =
              activeNode === connection.from || activeNode === connection.to;
            const style = getConnectionStyle(connection.type);

            return (
              <motion.path
                key={`${connection.from}-${connection.to}`}
                d={`M ${fromNode.x}% ${fromNode.y}% Q ${
                  (fromNode.x + toNode.x) / 2 + (Math.random() - 0.5) * 10
                }% ${
                  (fromNode.y + toNode.y) / 2 + (Math.random() - 0.5) * 10
                }% ${toNode.x}% ${toNode.y}%`}
                stroke={style.stroke}
                strokeWidth={
                  isActive ? style.strokeWidth + 1 : style.strokeWidth
                }
                strokeDasharray={style.strokeDasharray}
                fill="none"
                strokeLinecap="round"
                opacity={0.8}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: index * 0.3 }}
              />
            );
          })}
        </svg>

        {/* Nodes */}
        <div className="absolute inset-0">
          <TooltipProvider>
            {nodes.map((node, index) => (
              <Tooltip key={node.id}>
                <TooltipTrigger asChild>
                  <motion.div
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: 0 + index * 0.2,
                    }}
                    whileHover={{
                      scale: 1.1,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      },
                    }}
                    whileTap={{
                      scale: 0.95,
                      transition: {
                        type: "spring",
                        stiffness: 500,
                        damping: 20,
                      },
                    }}
                    onMouseEnter={() => setActiveNode(node.id)}
                    onMouseLeave={() => setActiveNode(null)}
                  >
                    <div className="relative">
                      {/* Ancient Map Marker */}
                      <div className="relative">
                        {/* Parchment Circle */}
                        {node.status === "completed" && (
                          <Image
                            src="/images/flag.gif"
                            alt="Completed"
                            width={400}
                            height={400}
                            unoptimized
                            className="absolute -top-20 left-2 w-28 h-28"
                          />
                        )}
                        {node.status === "locked" && (
                          <Image
                            src="/images/locked.png"
                            alt="Locked"
                            width={400}
                            height={400}
                            className="absolute left-2 w-28 h-28 z-10"
                          />
                        )}
                        {node.status === "available" && (
                          <Image
                            src="/images/available.png"
                            alt="Available"
                            width={400}
                            height={400}
                            className="absolute left-20 w-28 h-28 z-10"
                          />
                        )}
                        <div className="w-32 h-32 relative overflow-hidden">
                          {/* Icon and terrain symbol */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            {node.image ? (
                              <>
                                <Image
                                  src={node.image}
                                  alt={node.name}
                                  width={1024}
                                  height={1024}
                                  className="w-28 h-28 object-contain mb-1"
                                />
                              </>
                            ) : (
                              <div className="text-amber-800 mb-1">
                                {node.icon}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Ancient-style label */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-center">
                        <div
                          className="bg-amber-50 border border-amber-600 rounded px-2 py-1 shadow-sm"
                          style={{
                            backgroundImage:
                              "linear-gradient(45deg, rgba(139, 69, 19, 0.05) 25%, transparent 25%, transparent 75%, rgba(139, 69, 19, 0.05) 75%)",
                            backgroundSize: "4px 4px",
                          }}
                        >
                          <div className="font-serif text-xs font-bold text-amber-900 whitespace-nowrap">
                            {node.name}
                          </div>
                          <div className="text-xs text-amber-700 font-sans">
                            {node.ancientName}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="max-w-xs bg-amber-50 border-amber-600 shadow-xl"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 20% 20%, rgba(139, 69, 19, 0.1) 0%, transparent 50%)",
                  }}
                >
                  <div className="space-y-2">
                    <div className="font-serif font-bold text-amber-900 flex items-center gap-2">
                      {node.name}
                    </div>
                    <div className="text-xs text-amber-700 italic">
                      {node.ancientName}
                    </div>
                    <div className="text-sm text-amber-800">
                      {node.description}
                    </div>
                    <div className="text-xs font-medium text-amber-700 border-t border-amber-300 pt-1">
                      Status:{" "}
                      {node.status.charAt(0).toUpperCase() +
                        node.status.slice(1)}
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>

        {/* Ancient Map Title Cartouche */}
        <div className="absolute top-8 left-8">
          <div
            className="bg-amber-50 border-2 border-amber-800 rounded-lg p-4 shadow-lg max-w-xs"
            style={{
              backgroundImage: `
              linear-gradient(45deg, rgba(139, 69, 19, 0.05) 25%, transparent 25%, transparent 75%, rgba(139, 69, 19, 0.05) 75%),
              radial-gradient(circle at 20% 20%, rgba(205, 133, 63, 0.1) 0%, transparent 50%)
            `,
              backgroundSize: "8px 8px, 100px 100px",
            }}
          >
            <div className="font-serif text-lg font-bold text-amber-900 mb-1">
              RannNeeti Map
            </div>
            <div className="text-sm text-amber-800 italic mb-2">
              एल्गोरिदम साम्राज्य का मानचित्र
            </div>
            <div className="text-xs text-amber-700">
              Ancient Kingdoms of Data Structures & Algorithms
            </div>
          </div>
        </div>

        {/* Legend Scroll */}
        <div className="absolute bottom-8 left-8">
          <div
            className="bg-amber-50 border-2 border-amber-800 rounded-lg p-3 shadow-lg"
            style={{
              backgroundImage:
                "linear-gradient(45deg, rgba(139, 69, 19, 0.03) 25%, transparent 25%, transparent 75%, rgba(139, 69, 19, 0.03) 75%)",
              backgroundSize: "6px 6px",
            }}
          >
            <div className="font-serif text-sm font-bold text-amber-900 mb-2 flex items-center gap-2">
              <Scroll className="h-4 w-4" />
              Legend
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-1">
                <Image
                  width={50}
                  height={50}
                  src="/images/flag-img.png"
                  className="w-5 h-5 rounded-full"
                  alt={"flag"}
                ></Image>
                <span className="text-amber-800">Mastered Territory</span>
              </div>
              <div className="flex items-center gap-1">
                <Image
                  width={50}
                  height={50}
                  src="/images/available.png"
                  className="w-5 h-5 rounded-full"
                  alt={"flag"}
                ></Image>
                <span className="text-amber-800">Available Path</span>
              </div>
              <div className="flex items-center gap-1">
                <Image
                  width={50}
                  height={50}
                  src="/images/locked.png"
                  className="w-5 h-5 rounded-full"
                  alt={"flag"}
                ></Image>
                <span className="text-amber-800">Locked Region</span>
              </div>
              <div className="border-t border-amber-300 pt-1 mt-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-amber-800"></div>
                  <span className="text-amber-700">Ancient Roads</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-0.5 bg-blue-600"
                    style={{ borderTop: "2px dashed" }}
                  ></div>
                  <span className="text-amber-700">Sacred Rivers</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-0.5 bg-yellow-600"
                    style={{ borderTop: "1px dotted" }}
                  ></div>
                  <span className="text-amber-700">Trade Routes</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scale Reference */}
        <div className="absolute bottom-8 right-8">
          <div
            className="bg-amber-50 border border-amber-600 rounded px-3 py-2 shadow-md"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(139, 69, 19, 0.05) 50%, transparent 50%)",
              backgroundSize: "4px 4px",
            }}
          >
            <div className="text-xs font-serif text-amber-900 mb-1">Scale</div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-0.5 bg-amber-800"></div>
              <span className="text-xs text-amber-700">100 Yojanas</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
