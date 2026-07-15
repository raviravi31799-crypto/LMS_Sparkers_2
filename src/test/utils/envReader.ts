import dotenv from "dotenv";
import path from "path";
import { EnvConfig } from "../types/training.types";

export function loadEnv(): EnvConfig {
  const env = process.env.TEST_ENV || "qa";
  const envPath = path.join(process.cwd(), "env", `.env.${env}`);
  dotenv.config({ path: envPath });
  return {
    BASE_URL: process.env.BASE_URL || "https://frontend-69a7.vercel.app/",
  };
}
