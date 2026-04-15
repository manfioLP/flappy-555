// services/db/index.ts
import { neon } from '@neondatabase/serverless';

export function hasDbConfig() {
    return Boolean(process.env.NEON_DATABASE_URL);
}

export function getSql() {
    const url = process.env.NEON_DATABASE_URL;
    if (!url) return null;
    return neon(url);
}
