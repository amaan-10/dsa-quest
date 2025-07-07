"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Play,
  Star,
  Sparkles,
  Crown,
  Scroll,
  Construction,
} from "lucide-react";
import { motion } from "framer-motion";

export function GameHero() {
  const [isHovered, setIsHovered] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);

  const ancientQuotes = [
    { text: "विद्या ददाति विनयं", translation: "Knowledge gives humility" },
    {
      text: "अहिंसा परमो धर्मः",
      translation: "Non-violence is the highest virtue",
    },
    { text: "सत्यमेव जयते", translation: "Truth alone triumphs" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % ancientQuotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-12 lg:py-20 overflow-hidden bg-gradient-to-b from-background via-sandstone-50 to-background">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-br from-copper-400/20 to-copper-600/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-indigo-600/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-yellow-400/10 to-yellow-600/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Ancient Pattern Overlay */}
      <div className="absolute inset-0 bg-ancient-pattern opacity-30"></div>

      <div className="container relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-copper-100 to-copper-200 border border-copper-300 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <Construction className="h-5 w-5 text-copper-600" />
                <span className="text-copper-700 font-serif text-sm font-medium">
                  Work in Progress
                </span>
              </div>
            </motion.div>
            <br />
            {/* Sacred Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-copper-100 to-copper-200 border border-copper-300 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-copper-600" />
                <span className="text-copper-700 font-serif text-sm font-medium">
                  Ancient Wisdom Meets Modern Learning
                </span>
              </div>
            </motion.div>

            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-tight">
                <span className="block text-foreground">Master the</span>
                <span className="block bg-gradient-to-r from-copper-500 via-copper-600 to-copper-700 bg-clip-text text-transparent">
                  Sacred Arts
                </span>
                <span className="block text-foreground">of Algorithms</span>
              </h1>

              {/* Sanskrit Quote */}
              <motion.div
                key={currentQuote}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6 }}
                className="text-center space-y-2"
              >
                <p className="text-2xl font-serif text-copper-600 font-medium">
                  {ancientQuotes[currentQuote].text}
                </p>
                <p className="text-lg text-sandstone-700 italic">
                  {ancientQuotes[currentQuote].translation}
                </p>
              </motion.div>

              <p className="text-xl md:text-2xl text-sandstone-700 max-w-4xl mx-auto leading-relaxed">
                Embark on a transformative journey through the ancient wisdom of
                algorithms. Discover timeless computational principles through
                interactive experiences inspired by India&apos;s rich
                mathematical heritage.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-copper-500 to-copper-700 hover:from-copper-600 hover:to-copper-800 text-white shadow-xl hover:shadow-2xl transition-all duration-300 px-10 py-6 text-lg font-medium rounded-xl group"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <Scroll className="mr-3 h-6 w-6" />
                  Begin Sacred Quest
                  <motion.div
                    animate={{ x: isHovered ? 8 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </motion.div>
                </Button>
              </Link>

              <Link href="/demo">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-copper-300 text-copper-700 hover:bg-copper-50 hover:border-copper-500 transition-all duration-300 px-10 py-6 text-lg font-medium rounded-xl backdrop-blur-sm bg-transparent"
                >
                  <Play className="mr-3 h-6 w-6" />
                  Explore Demo
                </Button>
              </Link>
            </motion.div>

            {/* Achievement Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 max-w-4xl mx-auto"
            >
              <div className="text-center group">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-copper-200 hover:shadow-xl transition-all duration-300 hover:border-copper-300">
                  <div className="flex justify-center mb-4">
                    <div className="bg-gradient-to-br from-copper-500 to-copper-700 p-3 rounded-full">
                      <Sparkles className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="text-4xl font-serif font-bold text-copper-600 mb-2">
                    50+
                  </div>
                  <div className="text-sandstone-700 font-medium">
                    Sacred Challenges
                  </div>
                </div>
              </div>

              <div className="text-center group">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-copper-200 hover:shadow-xl transition-all duration-300 hover:border-copper-300">
                  <div className="flex justify-center mb-4">
                    <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-3 rounded-full">
                      <Crown className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="text-4xl font-serif font-bold text-indigo-600 mb-2">
                    10K+
                  </div>
                  <div className="text-sandstone-700 font-medium">
                    Wisdom Seekers
                  </div>
                </div>
              </div>

              <div className="text-center group">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-copper-200 hover:shadow-xl transition-all duration-300 hover:border-copper-300">
                  <div className="flex justify-center mb-4">
                    <div className="bg-gradient-to-br from-yellow-500 to-yellow-700 p-3 rounded-full">
                      <Star className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="text-4xl font-serif font-bold text-yellow-600 mb-2">
                    95%
                  </div>
                  <div className="text-sandstone-700 font-medium">
                    Enlightenment Rate
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
