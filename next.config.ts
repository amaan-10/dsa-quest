import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // You can add other config options here
};

export const config = {
  matcher: [
    '/',                 // root
    '/demo',             // demo page
    '/auth/register',    // register page
    '/auth/login',       // login page
    '/leaderboard',      // leaderboard
    '/((?!api|_next|favicon.ico).*)', // match everything else for middleware logic
  ],
};

export default nextConfig;
