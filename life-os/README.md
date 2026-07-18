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
- **Auth** — real signup (`/signup`) and sign-in (`/login`), plus a one-click "Continue in
  demo mode" fallback that still signs you in as the Jordan Ellis demo profile.
  `middleware.js` gates every other route behind a session cookie.

## Accounts (current state)

There is no database wired up yet, so accounts aren't server-side user records — signup
collects name/email/password, validates it server-side (`app/api/auth/signup/route.js`),
then creates the account **in the browser**: the password is salted and hashed with
Web Crypto (SHA-256) before it's written to `localStorage` (`context/AccountContext.jsx`).
Login re-hashes the entered password and compares it to that stored hash. This is
meaningfully better than the original "any password works" demo, but it is **not**
production-grade auth — anyone with devtools access to that browser profile can see the
stored hash, only one account can exist per browser, and there's no password reset,
email verification, or cross-device sign-in. Treat it as a fast, honest demo of the flow.

A user's other mutable data — assessment scores taken, goals/actions logged, vision board
images/text, life stage result — persists the same way, in `localStorage`
(`context/LifeOSStateContext.jsx`), keyed per-device. The backend still owns all the
*logic* (scoring, synthesis, suggestions); it just doesn't have a place to durably store
per-user records yet.

**To upgrade to real server-side accounts + persistence**: provision a database
(Postgres/Supabase/Neon all work well with Vercel), move account creation into
`app/api/auth/signup/route.js` (hash with bcrypt/argon2, insert a row, issue a real
session tied to a user id instead of the current flat `life_os_session` cookie), and
replace the `localStorage` reads/writes in `LifeOSStateContext.jsx` and
`AccountContext.jsx` with `fetch` calls to database-backed API routes.

## Run locally

```bash
npm install
npm run dev
# visit http://localhost:3000 — sign up, sign in, or continue in demo mode
```

## Deploy

Deployed as its own Vercel project with **Root Directory** set to `life-os/` in this
repository (kept separate from the personal-brand-website static site at the repo root).
