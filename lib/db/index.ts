import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// This expects a DATABASE_URL variable in your .env.local file
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });
