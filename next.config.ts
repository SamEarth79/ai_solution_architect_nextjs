import type { NextConfig } from "next";
import dotenv from 'dotenv';
dotenv.config();

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
module.exports = {
  env: {
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  },
};