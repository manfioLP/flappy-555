-- Bootstrap schema for Flappy-555 leaderboard storage.
-- Run this in the Neon SQL editor after creating a fresh database.

CREATE TABLE IF NOT EXISTS plays (
    id BIGSERIAL PRIMARY KEY,
    wallet_address TEXT NOT NULL,
    score INTEGER NOT NULL CHECK (score >= 0),
    play_id TEXT UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS plays_wallet_address_idx
    ON plays (wallet_address);

CREATE INDEX IF NOT EXISTS plays_created_at_idx
    ON plays (created_at DESC);

CREATE INDEX IF NOT EXISTS plays_score_idx
    ON plays (score DESC);
