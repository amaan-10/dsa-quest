import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../../public/images/logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-copper-200 py-12 bg-sandstone-50">
      <div className="px-4 md:px-8">
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
            <div className="text-xs text-copper-600 mt-1">
              ज्ञानम् पारम् बलम्
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
