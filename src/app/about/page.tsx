import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Target,
  Lightbulb,
  Heart,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Alex Chen",
      role: "Founder & CEO",
      bio: "Former Google engineer with a passion for making computer science education accessible to everyone.",
      avatar: "/placeholder.svg?height=150&width=150",
      social: {
        github: "#",
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      name: "Sarah Johnson",
      role: "Head of Education",
      bio: "PhD in Computer Science Education, dedicated to creating engaging learning experiences.",
      avatar: "/placeholder.svg?height=150&width=150",
      social: {
        github: "#",
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      name: "Michael Rodriguez",
      role: "Lead Developer",
      bio: "Full-stack developer specializing in interactive web applications and game development.",
      avatar: "/placeholder.svg?height=150&width=150",
      social: {
        github: "#",
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      name: "Emily Zhang",
      role: "UX Designer",
      bio: "Design expert focused on creating intuitive and beautiful user experiences for learning.",
      avatar: "/placeholder.svg?height=150&width=150",
      social: {
        github: "#",
        linkedin: "#",
        twitter: "#",
      },
    },
  ];

  const values = [
    {
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
      title: "Innovation",
      description:
        "We constantly push the boundaries of educational technology to create new and better ways to learn.",
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Community",
      description:
        "Learning is better together. We foster a supportive community where everyone can grow and succeed.",
    },
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "Excellence",
      description:
        "We strive for excellence in everything we do, from our content quality to our user experience.",
    },
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: "Passion",
      description:
        "We're passionate about education and believe that everyone deserves access to quality learning resources.",
    },
  ];

  const stats = [
    { label: "Active Learners", value: "50K+" },
    { label: "Challenges Completed", value: "2M+" },
    { label: "Countries Reached", value: "120+" },
    { label: "Success Rate", value: "95%" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="px-4 md:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <Badge className="mb-4">About RannNeeti</Badge>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  Revolutionizing{" "}
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    CS Education
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  We&apos;re on a mission to make learning Data Structures and
                  Algorithms engaging, interactive, and accessible to everyone
                  through the power of gamification and cutting-edge technology.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/30">
          <div className="px-4 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-xl text-muted-foreground">
                  To democratize computer science education by making it fun,
                  interactive, and accessible to learners worldwide.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold">Why RannNeeti?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Traditional computer science education often feels abstract
                    and disconnected from real-world applications. We believe
                    learning should be engaging, visual, and immediately
                    applicable.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    RannNeeti transforms complex algorithms and data structures
                    into interactive adventures, making it easier for students
                    to understand, remember, and apply these fundamental
                    concepts.
                  </p>
                  <div className="flex gap-4">
                    <Button>Start Learning</Button>
                    <Button variant="outline">View Demo</Button>
                  </div>
                </div>
                <div className="relative">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Learning illustration"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-muted/30">
          <div className="px-4 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-xl text-muted-foreground">
                The principles that guide everything we do at RannNeeti.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center h-full">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-center">
                      <div className="p-3 rounded-full bg-primary/10">
                        {value.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="px-4 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-xl text-muted-foreground">
                The passionate individuals behind RannNeeti&apos;s mission to
                revolutionize CS education.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="text-center h-full">
                  <CardContent className="p-6 space-y-4">
                    <div className="relative w-32 h-32 mx-auto">
                      <Image
                        src={member.avatar || "/placeholder.svg"}
                        alt={member.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{member.name}</h3>
                      <p className="text-primary font-medium">{member.role}</p>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {member.bio}
                    </p>
                    <div className="flex justify-center gap-3">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={member.social.github}>
                          <Github className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={member.social.linkedin}>
                          <Linkedin className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={member.social.twitter}>
                          <Twitter className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="px-4 md:px-8 text-center">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-3xl font-bold">Join Our Mission</h2>
              <p className="text-xl text-primary-foreground/90">
                Ready to transform your understanding of algorithms and data
                structures? Start your learning journey today and join thousands
                of successful learners.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  Start Learning Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
