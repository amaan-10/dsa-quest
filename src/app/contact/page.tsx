"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Boxes, Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Message Sent!",
        description:
          "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        category: "",
        message: "",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Boxes className="h-6 w-6 text-primary" />
            <span>RannNeeti</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/levels"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Levels
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium text-primary">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold mb-4">Get in Touch</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Have questions about RannNeeti? Need help with your learning
                journey? We&apos;re here to help and would love to hear from
                you.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Send us a Message</CardTitle>
                    <CardDescription>
                      Fill out the form below and we&apos;ll get back to you as
                      soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name *</Label>
                          <Input
                            id="name"
                            placeholder="Your full name"
                            value={formData.name}
                            onChange={(e) =>
                              handleInputChange("name", e.target.value)
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your.email@example.com"
                            value={formData.email}
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Select
                            value={formData.category}
                            onValueChange={(value) =>
                              handleInputChange("category", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="general">
                                General Inquiry
                              </SelectItem>
                              <SelectItem value="technical">
                                Technical Support
                              </SelectItem>
                              <SelectItem value="billing">
                                Billing & Payments
                              </SelectItem>
                              <SelectItem value="partnership">
                                Partnership
                              </SelectItem>
                              <SelectItem value="feedback">Feedback</SelectItem>
                              <SelectItem value="bug">Bug Report</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject *</Label>
                          <Input
                            id="subject"
                            placeholder="Brief description of your inquiry"
                            value={formData.subject}
                            onChange={(e) =>
                              handleInputChange("subject", e.target.value)
                            }
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          placeholder="Please provide details about your inquiry..."
                          className="min-h-[120px]"
                          value={formData.message}
                          onChange={(e) =>
                            handleInputChange("message", e.target.value)
                          }
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          "Sending..."
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium">Email</div>
                        <div className="text-sm text-muted-foreground">
                          support@RannNeeti.com
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium">Phone</div>
                        <div className="text-sm text-muted-foreground">
                          +1 (555) 123-4567
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium">Address</div>
                        <div className="text-sm text-muted-foreground">
                          123 Innovation Drive
                          <br />
                          San Francisco, CA 94105
                          <br />
                          United States
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium">Business Hours</div>
                        <div className="text-sm text-muted-foreground">
                          Monday - Friday: 9:00 AM - 6:00 PM PST
                          <br />
                          Saturday - Sunday: Closed
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Help</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <div className="font-medium text-sm">
                        📚 Documentation
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Find answers in our comprehensive guides
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-sm">
                        💬 Community Forum
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Connect with other learners and get help
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-sm">
                        🎥 Video Tutorials
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Watch step-by-step learning guides
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-sm">❓ FAQ</div>
                      <div className="text-xs text-muted-foreground">
                        Common questions and answers
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Response Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>General Inquiries</span>
                        <span className="text-muted-foreground">24 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Technical Support</span>
                        <span className="text-muted-foreground">12 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Billing Issues</span>
                        <span className="text-muted-foreground">6 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Bug Reports</span>
                        <span className="text-muted-foreground">48 hours</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-8 bg-muted/30">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 font-bold text-xl mb-4 md:mb-0">
              <Boxes className="h-6 w-6 text-primary" />
              <span>RannNeeti</span>
            </div>
            <nav className="flex gap-8 mb-4 md:mb-0">
              <Link
                href="/about"
                className="text-sm hover:text-primary transition-colors"
              >
                About
              </Link>
              <Link
                href="/blog"
                className="text-sm hover:text-primary transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="text-sm hover:text-primary transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/privacy"
                className="text-sm hover:text-primary transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-sm hover:text-primary transition-colors"
              >
                Terms
              </Link>
            </nav>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} RannNeeti. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
