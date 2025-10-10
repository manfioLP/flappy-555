// services/db/index.ts
import { neon } from '@neondatabase/serverless';

const url = process.env.NEON_DATABASE_URL;
if (!url) throw new Error('NEON_DATABASE_URL is not set');

export const sql = neon(url);
