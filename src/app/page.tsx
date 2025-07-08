import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GameHero } from "@/components/game-hero";
import { FeatureCard } from "@/components/feature-card";
import { GameMap } from "@/components/game-map";
import { LevelCard } from "@/components/level-card";
import {
  Crown,
  BarChart3,
  Network,
  GitBranch,
  Boxes,
  Target,
  Sparkles,
} from "lucide-react";

import Logo from "../../public/images/logo.png";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-ancient-pattern">
      {/* Header with ancient-inspired design */}
      <header className="sticky top-0 z-50 w-full border-b border-copper-200 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src={Logo}
              alt="RannNeeti Logo"
              width="50"
              height="50"
              className="h-12 w-12 text-wte"
            />
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold text-foreground">
                RannNeeti
              </span>
              <span className="text-xs text-copper-600 font-sans tracking-wider">
                ज्ञानम् पारम् बलम्
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex gap-8">
            <Link
              href="#features"
              className="text-sm font-medium text-sandstone-700 hover:text-copper-600 transition-colors duration-300 relative group"
            >
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-copper-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="#map"
              className="text-sm font-medium text-sandstone-700 hover:text-copper-600 transition-colors duration-300 relative group"
            >
              Journey Map
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-copper-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="#levels"
              className="text-sm font-medium text-sandstone-700 hover:text-copper-600 transition-colors duration-300 relative group"
            >
              Levels
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-copper-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="#leaderboard"
              className="text-sm font-medium text-sandstone-700 hover:text-copper-600 transition-colors duration-300 relative group"
            >
              Leaderboard
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-copper-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button
                variant="outline"
                className="border-copper-300 text-copper-700 hover:bg-copper-50 hover:border-copper-500 transition-all duration-300 bg-transparent"
              >
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-copper-500 to-copper-700 hover:from-copper-600 hover:to-copper-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:animate-glow">
                Begin Quest
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <GameHero />

        {/* Features Section with Ancient Motifs */}
        <section
          id="features"
          className="py-24 bg-gradient-to-b from-sandstone-50 to-background relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-scroll-pattern"></div>
          <div className="container relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-copper-100 text-copper-700 text-sm font-medium mb-4">
                <Sparkles className="h-4 w-4" />
                Master the Ancient Art of Algorithms
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
                Learn Through <span className="text-copper-600">Wisdom</span>
              </h2>
              <p className="text-xl text-sandstone-700 max-w-2xl mx-auto">
                Discover the timeless principles of computation through an
                immersive journey that connects ancient wisdom with modern
                technology.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Target className="h-12 w-12 text-copper-600" />}
                title="Interactive Learning"
                description="Master complex algorithms through guided visualizations inspired by ancient teaching methods."
              />
              <FeatureCard
                icon={<Crown className="h-12 w-12 text-copper-600" />}
                title="Achievement System"
                description="Earn royal honors and sacred badges as you conquer different realms of knowledge."
              />
              <FeatureCard
                icon={<BarChart3 className="h-12 w-12 text-copper-600" />}
                title="Progress Tracking"
                description="Chronicle your learning journey with detailed scrolls and wisdom metrics."
              />
              <FeatureCard
                icon={<Network className="h-12 w-12 text-copper-600" />}
                title="Visual Enlightenment"
                description="Witness algorithms unfold through beautiful, temple-inspired animations."
              />
              <FeatureCard
                icon={<GitBranch className="h-12 w-12 text-copper-600" />}
                title="Guardian Battles"
                description="Face ancient guardians in epic battles that test your algorithmic prowess."
              />
              <FeatureCard
                icon={<Boxes className="h-12 w-12 text-copper-600" />}
                title="Sacred Progression"
                description="Follow the ancient path of knowledge from novice to master algorithmic sage."
              />
            </div>
          </div>
        </section>

        {/* Journey Map Section */}
        <section
          id="map"
          className="py-24 bg-gradient-to-b from-background to-sandstone-50"
        >
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
                Your Sacred <span className="text-copper-600">Journey</span>
              </h2>
              <p className="text-xl text-sandstone-700 max-w-2xl mx-auto">
                Embark on a mystical adventure through different realms of
                knowledge. Each kingdom represents a fundamental aspect of
                algorithmic wisdom waiting to be unlocked.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-copper-200">
              <GameMap />
            </div>
          </div>
        </section>

        {/* Levels Section */}
        <section
          id="levels"
          className="py-24 bg-gradient-to-b from-sandstone-50 to-background"
        >
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
                Sacred <span className="text-copper-600">Challenges</span>
              </h2>
              <p className="text-xl text-sandstone-700 max-w-2xl mx-auto">
                Begin your odyssey with these foundational challenges, each
                designed to illuminate the path to algorithmic mastery through
                ancient wisdom.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <LevelCard
                title="Arrays of Ashoka"
                difficulty="Novice"
                description="Master the fundamental arrays through the wisdom of ancient Indian mathematics and organization."
                concepts={["Array Traversal", "Searching", "Basic Sorting"]}
                imagePath="/images/arrays-of-ashoka.jpeg"
              />
              <LevelCard
                title="Linked Lists of Chandragupta"
                difficulty="Apprentice"
                description="Navigate the interconnected chains of knowledge, following the strategic wisdom of ancient rulers."
                concepts={[
                  "Singly Linked Lists",
                  "Doubly Linked Lists",
                  "List Operations",
                ]}
                imagePath="/images/linked-lists-of-chandragupta.jpeg"
              />
              <LevelCard
                title="Tree of Bodhi"
                difficulty="Adept"
                description="Climb the sacred tree of enlightenment, mastering hierarchical wisdom and tree traversals."
                concepts={["Binary Trees", "BST", "Tree Traversal"]}
                imagePath="/images/tree-of-bodhi.jpeg"
              />
              <LevelCard
                title="Trade Routes of Silk Road"
                difficulty="Sage"
                description="Explore the vast network of ancient trade routes, solving complex pathfinding challenges."
                concepts={["Graph Representation", "DFS/BFS", "Shortest Path"]}
                imagePath="/images/trade-routes-of-silk-road.jpeg"
              />
              <LevelCard
                title="Dynamic Programming Darbar"
                difficulty="Master"
                description="Enter the royal court of optimization, where each decision shapes the kingdom's future."
                concepts={["Memoization", "Tabulation", "Optimization"]}
                imagePath="/images/dynamic-programming-darbar.jpeg"
              />
              <LevelCard
                title="Algorithm Akharas"
                difficulty="Legendary"
                description="Train in the ultimate arena where algorithmic warriors test their supreme knowledge."
                concepts={[
                  "Advanced Algorithms",
                  "Optimization",
                  "Problem Solving",
                ]}
                imagePath="/images/algorithm-akharas.jpeg"
              />
            </div>

            <div className="flex justify-center mt-16">
              <Link href="/levels">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-copper-500 to-copper-700 hover:from-copper-600 hover:to-copper-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-6 text-lg font-medium"
                >
                  View All Challenges
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Leaderboard Section */}
        <section
          id="leaderboard"
          className="py-24 bg-gradient-to-b from-background to-sandstone-50"
        >
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
                Hall of <span className="text-copper-600">Legends</span>
              </h2>
              <p className="text-xl text-sandstone-700 max-w-2xl mx-auto">
                Honor the greatest algorithmic warriors who have mastered the
                ancient arts and earned their place in the annals of
                computational history.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl mx-auto border border-copper-200">
              <div className="bg-gradient-to-r from-copper-500 to-copper-700 p-6">
                <div className="grid grid-cols-12 text-white font-medium">
                  <div className="col-span-1 text-center">Rank</div>
                  <div className="col-span-5">Sage</div>
                  <div className="col-span-2 text-center">Level</div>
                  <div className="col-span-2 text-center">Victories</div>
                  <div className="col-span-2 text-center">Wisdom</div>
                </div>
              </div>

              {[
                {
                  rank: 1,
                  name: "Brahmagupta",
                  level: 42,
                  challenges: 156,
                  score: 9845,
                },
                {
                  rank: 2,
                  name: "Aryabhata",
                  level: 39,
                  challenges: 142,
                  score: 9254,
                },
                {
                  rank: 3,
                  name: "Mahavira",
                  level: 37,
                  challenges: 138,
                  score: 8932,
                },
                {
                  rank: 4,
                  name: "Bhaskaracharya",
                  level: 35,
                  challenges: 129,
                  score: 8567,
                },
                {
                  rank: 5,
                  name: "Srinivasa",
                  level: 33,
                  challenges: 124,
                  score: 8123,
                },
              ].map((player, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-12 p-6 transition-all duration-300 hover:bg-sandstone-50 ${
                    index % 2 === 0 ? "bg-background" : "bg-sandstone-50/30"
                  }`}
                >
                  <div className="col-span-1 text-center">
                    <div className="flex items-center justify-center">
                      {player.rank <= 3 ? (
                        <Crown
                          className={`h-6 w-6 ${
                            player.rank === 1
                              ? "text-yellow-500"
                              : player.rank === 2
                              ? "text-gray-400"
                              : "text-amber-600"
                          }`}
                        />
                      ) : (
                        <span className="font-bold text-copper-700">
                          {player.rank}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-span-5">
                    <div className="font-serif font-semibold text-foreground">
                      {player.name}
                    </div>
                    <div className="text-sm text-sandstone-600">
                      Ancient Sage
                    </div>
                  </div>
                  <div className="col-span-2 text-center font-medium text-copper-700">
                    {player.level}
                  </div>
                  <div className="col-span-2 text-center font-medium text-copper-700">
                    {player.challenges}
                  </div>
                  <div className="col-span-2 text-center font-bold text-copper-700">
                    {player.score}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <Link href="/leaderboard">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-copper-300 text-copper-700 hover:bg-copper-50 hover:border-copper-500 transition-all duration-300 px-8 py-6 text-lg bg-transparent"
                >
                  View Full Leaderboard
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-copper-500 via-copper-600 to-copper-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-ancient-pattern opacity-20"></div>
          <div className="container text-center relative">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                Ready to Begin Your{" "}
                <span className="text-yellow-200">Sacred Journey</span>?
              </h2>
              <p className="text-xl mb-8 text-copper-100">
                Join thousands of seekers who have discovered the ancient wisdom
                of algorithms through our transformative learning experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="bg-white text-copper-700 hover:bg-sandstone-50 shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-6 text-lg font-medium"
                  >
                    Begin Your Quest
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 backdrop-blur-sm px-8 py-6 text-lg font-medium bg-transparent"
                  >
                    Explore Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer with Ancient Design */}
      <footer className="border-t border-copper-200 py-12 bg-sandstone-50">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-6 md:mb-0">
              <Image
                src={Logo}
                alt="RannNeeti Logo"
                width="50"
                height="50"
                className="h-12 w-12 text-wte"
              />
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold text-foreground">
                  RannNeeti
                </span>
                <span className="text-xs text-copper-600 font-sans">
                  Ancient Wisdom, Modern Learning
                </span>
              </div>
            </div>

            <nav className="flex gap-8 mb-6 md:mb-0">
              <Link
                href="/about"
                className="text-sm text-sandstone-700 hover:text-copper-600 transition-colors"
              >
                About
              </Link>
              <Link
                href="/blog"
                className="text-sm text-sandstone-700 hover:text-copper-600 transition-colors"
              >
                Chronicles
              </Link>
              <Link
                href="/contact"
                className="text-sm text-sandstone-700 hover:text-copper-600 transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-sandstone-700 hover:text-copper-600 transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-sandstone-700 hover:text-copper-600 transition-colors"
              >
                Terms
              </Link>
            </nav>

            <div className="text-sm text-sandstone-600 text-center">
              <div>
                © {new Date().getFullYear()} RannNeeti. All rights reserved.
              </div>
              <div className="text-xs text-copper-600 mt-1">सत्यमेव जयते</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
