# Life OS — Growth Intelligence Platform

A full-stack implementation of the "Life OS Platform" design (Claude Design handoff:
`personal-growth-intelligence-platform`). Built with Next.js 14 (App Router).

## What's here

- **Frontend** — React pages under `app/(app)/*`: Overview, Life Stage, 15 Assessments
  (library + question flow + results), Vision Writing, Vision Board, Goals, 12-Step
  Roadmap, Insight Report, Coaching Feed.
- **Backend** — Next.js API routes under `app/api/*`. All of the platform's "intelligence"
  (assessment scoring, the synthesized insight report, the 12-step roadmap, AI-style goal
  and vision draft suggestions) is computed server-side in `lib/logic.js` and served over
  these routes — the frontend only renders what the backend returns.
- **Auth** — demo-mode login (`app/api/auth/login`), matching the design's "any
  email/password signs you in as Jordan Ellis" copy. `middleware.js` gates every route
  behind a session cookie.

## Data persistence (current state)

There is no database wired up yet. A user's mutable data — assessment scores taken,
goals/actions logged, vision board images/text, life stage result — is persisted in the
browser via `localStorage` (see `context/LifeOSStateContext.jsx`), keyed per-device. The
backend still owns all the *logic* (scoring, synthesis, suggestions); it just doesn't
have a place to durably store per-user records yet.

**To upgrade to real server-side persistence**: provision a database (Postgres/Supabase/
Neon all work well with Vercel), then replace the `localStorage` reads/writes in
`LifeOSStateContext.jsx` with `fetch` calls to new `/api/state` routes backed by that
database, and swap the demo login for real credential checks in
`app/api/auth/login/route.js`.

## Run locally

```bash
npm install
npm run dev
# visit http://localhost:3000 — any email/password signs you in
```

## Deploy

Deployed as its own Vercel project with **Root Directory** set to `life-os/` in this
repository (kept separate from the personal-brand-website static site at the repo root).
