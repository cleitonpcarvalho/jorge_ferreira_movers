# Jorge Ferreira Movers — Backend

Node.js + Express + PostgreSQL API.

## Local Development

Requirements: Node.js 18+, PostgreSQL 14+

1. Copy `.env.example` to `.env` and fill in the values
2. Run `npm install`
3. Run `createdb -U postgres jorge_ferreira_movers`
4. Run `psql -U postgres -d jorge_ferreira_movers -f src/db/migrations/001_initial.sql`
5. Run `psql -U postgres -d jorge_ferreira_movers -f src/db/seeds/001_settings.sql`
6. Run `npm run dev`

`GET /api/health` — health check

## Railway Deploy

See the root [`DEPLOY.md`](../DEPLOY.md).
