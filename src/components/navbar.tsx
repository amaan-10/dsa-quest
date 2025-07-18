/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Logo from "../../public/images/logo.png";
import { usePathname } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Cookies from "js-cookie";

const Navbar = () => {
  const pathname = usePathname();

  const login = pathname === "/auth/login";
  const register = pathname === "/auth/register";

  const { toast } = useToast();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const token = Cookies.get("authToken");

  // Validate token from cookies
  useEffect(() => {
    if (!token) {
      setIsLoggedIn(false);
      setCheckingAuth(false);
      return;
    } else {
      setIsLoggedIn(true);
      setCheckingAuth(false);
    }
  }, [token]);

  const handleLogout = () => {
    Cookies.remove("authToken");
    setIsLoggedIn(false);
    toast({
      description: "You have been logged out.",
      variant: "destructive",
      duration: 2000,
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-copper-200 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="px-4 md:px-8 flex h-20 items-center justify-between">
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
            href="/"
            className="text-sm font-medium text-sandstone-700 hover:text-copper-600 transition-colors duration-300 relative group"
          >
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-copper-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/levels"
            className="text-sm font-medium text-sandstone-700 hover:text-copper-600 transition-colors duration-300 relative group"
          >
            Levels
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-copper-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/leaderboard"
            className="text-sm font-medium text-sandstone-700 hover:text-copper-600 transition-colors duration-300 relative group"
          >
            Leaderboard
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-copper-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-sandstone-700 hover:text-copper-600 transition-colors duration-300 relative group"
          >
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-copper-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {token ? (
            <>
              {isLoggedIn && (
                <Button
                  variant="destructive"
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-copper-500 to-copper-700 hover:from-copper-600 hover:to-copper-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:animate-glow"
                >
                  Logout
                </Button>
              )}
            </>
          ) : (
            <>
              {!login && (
                <Link href="/auth/login">
                  <Button
                    variant="outline"
                    className="border-copper-300 text-copper-700 hover:bg-copper-50 hover:border-copper-500 hover:text-primary transition-all duration-300 bg-transparent"
                  >
                    Login
                  </Button>
                </Link>
              )}
              {!register && (
                <Link href="/auth/register">
                  <Button className="bg-gradient-to-r from-copper-500 to-copper-700 hover:from-copper-600 hover:to-copper-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:animate-glow">
                    Register
                  </Button>
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
