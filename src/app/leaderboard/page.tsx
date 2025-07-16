import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Trophy,
  Medal,
  Award,
  Crown,
  TrendingUp,
  Users,
  Calendar,
} from "lucide-react";

export default function LeaderboardPage() {
  const globalLeaderboard = [
    {
      rank: 1,
      username: "Euclid", // Greece
      avatar: "/placeholder.svg?height=50&width=50",
      level: 42,
      challenges: 156,
      score: 9845,
      streak: 15,
      country: "🇬🇷",
    },
    {
      rank: 2,
      username: "Aryabhata", // India
      avatar: "/placeholder.svg?height=50&width=50",
      level: 39,
      challenges: 142,
      score: 9254,
      streak: 12,
      country: "🇮🇳",
    },
    {
      rank: 3,
      username: "Al-Khwarizmi", // Persia
      avatar: "/placeholder.svg?height=50&width=50",
      level: 37,
      challenges: 138,
      score: 8932,
      streak: 8,
      country: "🇮🇷",
    },
    {
      rank: 4,
      username: "Hypatia", // Egypt
      avatar: "/placeholder.svg?height=50&width=50",
      level: 35,
      challenges: 129,
      score: 8567,
      streak: 6,
      country: "🇪🇬",
    },
    {
      rank: 5,
      username: "Srinivasa", // India
      avatar: "/placeholder.svg?height=50&width=50",
      level: 33,
      challenges: 124,
      score: 8123,
      streak: 10,
      country: "🇮🇳",
    },
    {
      rank: 6,
      username: "AdaLovelace", // UK
      avatar: "/placeholder.svg?height=50&width=50",
      level: 31,
      challenges: 118,
      score: 7892,
      streak: 4,
      country: "🇬🇧",
    },
    {
      rank: 7,
      username: "LiuHui", // China
      avatar: "/placeholder.svg?height=50&width=50",
      level: 29,
      challenges: 112,
      score: 7654,
      streak: 7,
      country: "🇨🇳",
    },
    {
      rank: 8,
      username: "OmarKhayyam", // Persia
      avatar: "/placeholder.svg?height=50&width=50",
      level: 28,
      challenges: 108,
      score: 7321,
      streak: 3,
      country: "🇮🇷",
    },
    {
      rank: 9,
      username: "LeonhardEuler", // Switzerland
      avatar: "/placeholder.svg?height=50&width=50",
      level: 26,
      challenges: 102,
      score: 6987,
      streak: 9,
      country: "🇨🇭",
    },
    {
      rank: 10,
      username: "NielsBohr", // Denmark (Physicist, but often used in logical/math contexts)
      avatar: "/placeholder.svg?height=50&width=50",
      level: 25,
      challenges: 98,
      score: 6543,
      streak: 2,
      country: "🇩🇰",
    },
  ];

  const weeklyLeaderboard = [
    {
      rank: 1,
      username: "WeeklyWarrior",
      avatar: "/placeholder.svg?height=50&width=50",
      score: 1250,
      challenges: 25,
      country: "🇺🇸",
    },
    {
      rank: 2,
      username: "SpeedSolver",
      avatar: "/placeholder.svg?height=50&width=50",
      score: 1180,
      challenges: 22,
      country: "🇯🇵",
    },
    {
      rank: 3,
      username: "QuickQuester",
      avatar: "/placeholder.svg?height=50&width=50",
      score: 1095,
      challenges: 20,
      country: "🇩🇪",
    },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Trophy className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-amber-600" />;
      default:
        return <Award className="h-6 w-6 text-muted-foreground" />;
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank <= 3) {
      return (
        <Badge
          className={`${
            rank === 1
              ? "bg-yellow-500"
              : rank === 2
              ? "bg-gray-400"
              : "bg-amber-600"
          } text-white`}
        >
          #{rank}
        </Badge>
      );
    }
    return <Badge variant="outline">#{rank}</Badge>;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
            <p className="text-muted-foreground">
              See how you rank against other algorithm adventurers
            </p>
          </div>
          <div className="flex gap-4">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
                <SelectItem value="expert">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Tabs defaultValue="global" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="global" className="flex items-center gap-2">
                  <Trophy className="h-4 w-4" />
                  Global
                </TabsTrigger>
                <TabsTrigger value="weekly" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Weekly
                </TabsTrigger>
                <TabsTrigger
                  value="friends"
                  className="flex items-center gap-2"
                >
                  <Users className="h-4 w-4" />
                  Friends
                </TabsTrigger>
              </TabsList>

              <TabsContent value="global">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-primary" />
                      Global Leaderboard
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {globalLeaderboard.map((player, index) => (
                        <div
                          key={index}
                          className={`flex items-center justify-between p-4 rounded-lg border ${
                            player.rank <= 3 ? "bg-muted/50" : ""
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              {getRankIcon(player.rank)}
                              {getRankBadge(player.rank)}
                            </div>
                            <div className="flex items-center gap-3">
                              <Image
                                src={player.avatar || "/placeholder.svg"}
                                alt={player.username}
                                width={40}
                                height={40}
                                className="rounded-full"
                              />
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">
                                    {player.username}
                                  </span>
                                  <span className="text-lg">
                                    {player.country}
                                  </span>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Level {player.level} • {player.challenges}{" "}
                                  challenges
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg">
                              {player.score.toLocaleString()}
                            </div>
                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                              <TrendingUp className="h-3 w-3" />
                              {player.streak} day streak
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="weekly">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      Weekly Leaderboard
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {weeklyLeaderboard.map((player, index) => (
                        <div
                          key={index}
                          className={`flex items-center justify-between p-4 rounded-lg border ${
                            player.rank <= 3 ? "bg-muted/50" : ""
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              {getRankIcon(player.rank)}
                              {getRankBadge(player.rank)}
                            </div>
                            <div className="flex items-center gap-3">
                              <Image
                                src={player.avatar || "/placeholder.svg"}
                                alt={player.username}
                                width={40}
                                height={40}
                                className="rounded-full"
                              />
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">
                                    {player.username}
                                  </span>
                                  <span className="text-lg">
                                    {player.country}
                                  </span>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {player.challenges} challenges this week
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg">
                              {player.score.toLocaleString()}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Weekly Score
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="friends">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      Friends Leaderboard
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">
                        No Friends Added Yet
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Add friends to see how you compare with people you know!
                      </p>
                      <Button>Find Friends</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Rank</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-3xl font-bold text-primary">#247</div>
                  <div className="text-sm text-muted-foreground">
                    Global Ranking
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Score</span>
                      <span className="font-medium">4,250</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Level</span>
                      <span className="font-medium">15</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Challenges</span>
                      <span className="font-medium">42</span>
                    </div>
                  </div>
                  <Button className="w-full">View Profile</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Performers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-500 mb-1">
                      🏆
                    </div>
                    <div className="font-medium">AlgoMaster</div>
                    <div className="text-sm text-muted-foreground">
                      9,845 points
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-400 mb-1">
                        🥈
                      </div>
                      <div className="font-medium text-sm">CodeNinja</div>
                      <div className="text-xs text-muted-foreground">
                        9,254 pts
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-amber-600 mb-1">
                        🥉
                      </div>
                      <div className="font-medium text-sm">ByteWizard</div>
                      <div className="text-xs text-muted-foreground">
                        8,932 pts
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Weekly Challenge</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl mb-2">🎯</div>
                    <div className="font-medium">Complete 10 Challenges</div>
                    <div className="text-sm text-muted-foreground">
                      This Week
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>6/10</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: "60%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">
                      Reward: 500 XP
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
