import path from "path";
import { SuiClient } from "@mysten/sui.js/client";
import { config } from "dotenv";

const envPath = path.resolve(__dirname, ".env");

config({
  path: envPath,
});

// Load the environment variables
export const SUI_NETWORK = process.env.SUI_NETWORK!;
export const PACKAGE_ID = process.env.PACKAGE_ID!;
export const TREASURY_CAP = process.env.TREASURY_CAP!;
export const PRIVATE_KEY = process.env.PRIVATE_KEY!;

// Create a SuiClient instance.
export const suiClient = new SuiClient({
  url: SUI_NETWORK,
});
