import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star, Crown, Scroll } from "lucide-react";

interface LevelCardProps {
  title: string;
  difficulty: string;
  description: string;
  concepts: string[];
  imagePath: string;
  slug?: string;
  completionRate?: number;
  averageTime?: string;
  rating?: number;
}

export function LevelCard({
  title,
  difficulty,
  description,
  concepts,
  imagePath,
  slug,
  completionRate = 78,
  averageTime = "45 min",
  rating = 4.8,
}: LevelCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "novice":
      case "beginner":
        return "bg-gradient-to-r from-green-500 to-green-600 text-white";
      case "apprentice":
      case "intermediate":
        return "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white";
      case "adept":
      case "advanced":
        return "bg-gradient-to-r from-orange-500 to-orange-600 text-white";
      case "sage":
      case "expert":
        return "bg-gradient-to-r from-red-500 to-red-600 text-white";
      case "master":
        return "bg-gradient-to-r from-purple-500 to-purple-600 text-white";
      case "legendary":
        return "bg-gradient-to-r from-copper-500 to-copper-700 text-white";
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600 text-white";
    }
  };

  const levelSlug =
    slug ||
    title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

  return (
    <Card className="overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-white border-copper-200 hover:border-copper-300 group">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={imagePath || "/placeholder.svg?height=200&width=400"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

        <div className="absolute top-4 left-4">
          <Badge
            className={`${getDifficultyColor(
              difficulty
            )} shadow-lg font-medium px-3 py-1`}
          >
            {difficulty}
          </Badge>
        </div>

        <div className="absolute top-4 right-4 flex items-center gap-2">
          <div className="flex items-center gap-1 bg-black/50 rounded-full px-3 py-1 backdrop-blur-sm">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-white text-sm font-medium">{rating}</span>
          </div>
        </div>

        <div className="absolute bottom-4 left-4">
          <div className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-copper-400" />
            <span className="text-white font-serif text-lg font-semibold">
              {title}
            </span>
          </div>
        </div>
      </div>

      <CardContent className="p-6 space-y-6">
        <div>
          <p className="text-sandstone-700 leading-relaxed">{description}</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Scroll className="h-4 w-4 text-copper-600" />
            <span className="text-sm font-medium text-foreground">
              Sacred Teachings:
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {concepts.map((concept, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs border-copper-300 text-copper-700 bg-copper-50 hover:bg-copper-100 transition-colors duration-300"
              >
                {concept}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs text-sandstone-600">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-copper-600" />
            <span>{completionRate}% completed</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-copper-600" />
            <span>{averageTime}</span>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Link href={`/level/${levelSlug}`} className="flex-1">
            <Button
              variant="outline"
              className="w-full border-copper-300 text-copper-700 hover:text-primary hover:bg-copper-50 hover:border-copper-500 transition-all duration-300 bg-transparent"
            >
              View Details
            </Button>
          </Link>
          <Link href={`/level/${levelSlug}/play`} className="flex-1">
            <Button className="w-full bg-gradient-to-r from-copper-500 to-copper-700 hover:from-copper-600 hover:to-copper-800 text-white shadow-md hover:shadow-lg transition-all duration-300">
              Begin Journey
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
