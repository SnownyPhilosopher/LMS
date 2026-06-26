# Soteria Learning — Roadmap

A step-by-step plan for taking the prototype from "looks real" to "works like a product."
Check items off as we complete them. Each phase is shippable on its own.

---

## ✅ Phase 0 — Foundation (DONE)

- [x] React + Vite app scaffolded, matching the HTML prototype's design system
- [x] Four role dashboards ported: Learner, Teacher, Admin, Super Admin
- [x] Shared client-side store (reducer + `localStorage` persistence)
- [x] Login / role-switcher + route guards + account menu (switch role / sign out)
- [x] Working create-forms (institution, user, course, class) with validation + toasts
- [x] Working search, filters, pagination, tabs, accordions
- [x] Production build clean; verified live in browser

---

## 🔹 Phase 1 — Polish the gaps (quick wins)

Small, self-contained tasks that tighten the existing prototype.

- [x] **Reset demo data** button in the account menu
- [x] Make the **Learner dashboard** numbers/progress derive from the store
- [x] **Notifications panel** — top-bar bell opens a role-specific dropdown; unread badge clears on open
- [x] **Empty states** — tables/lists show empty messaging when filtered to nothing
- [x] **Responsive pass** — sidebars/panels stack on tablet & mobile (`responsive.css`)
- [x] **Keyboard/a11y** — modal ESC-to-close + dialog roles, aria labels on icon buttons
- [x] **Spacing fix** — defined missing `--sp-7`/`--sp-9` tokens (content was hugging the nav)
- [x] **Monotone icons** — replaced colorful emoji glyphs with line icons

**Exit criteria:** every visible control does something; no dead ends; works on a phone. ✅

---

## 🔹 Phase 2 — Flagship flows (depth)

Build the pages behind the "Manage / Open" actions so they're real, not toasts.
Tackle in this order (each is independent):

- [x] **Courses list pages** — Learner (`/learner/courses`) and Teacher (`/teacher/courses`) with search/filter, wired from dashboards
- [x] **Course Detail / Player** (`/…/courses/:id`) — shared, role-aware
  - [x] Hero with progress; tabs: Overview, Notes, Quizzes, Exams, Online Classes
  - [x] Notes reader, interactive auto-graded quiz, exam cards (locked state), live + scheduled classes
  - [ ] Mark task complete → updates course % in the store (still display-only)
- [x] **Three demo presets** — University / High School / Primary picker on sign-in; swaps all data (school, people, subjects, identities, greetings, chatbot) per preset, persisted separately
- [x] **Soti chatbot** — learner-only floating assistant, answers grounded in real store data
- [x] **Secondary pages wired up** (sidebar/topnav now navigate, with active states)
  - [x] Learner: Calendar (month grid + events), Library (resource grid + filter), Profile
  - [x] Teacher: Analytics (stats + CSS charts), Live Classes (+ schedule modal), My Learners (filterable table)
  - [x] Admin: Teachers, Learners, Guardians (filterable tables)
- [ ] **Course Builder** (Teacher) — deeper authoring
  - [ ] Add / edit / reorder chapters and tasks
  - [ ] Assign learners; changes reflect in learner counts
- [ ] **Institution detail** (Super Admin → Manage)
  - [ ] Drill into one institution: departments, programs, admins
  - [ ] Add department / program / assign admin from this view
- [ ] **Learner profile** (Admin/Teacher → View profile)
  - [ ] Per-learner page: enrolled courses, progress, activity, at-risk flags

**Exit criteria:** at least one full end-to-end journey (browse → open → act → see it update).

---

## 🔹 Phase 3 — Data model hardening

Make the in-memory data coherent before (optionally) moving to a server.

- [ ] Normalize entities with real relationships (institution → dept → program → course → task)
- [ ] Derive aggregate numbers (learner counts, completion %) instead of hardcoding
- [ ] Centralize actions/selectors; add a `useEntity` hook layer
- [ ] Seed a richer, internally-consistent dataset
- [ ] (Optional) Wrap the store in a mock async API to mimic real fetch latency/errors

**Exit criteria:** numbers add up everywhere; swapping in a real API later is a drop-in.

---

## 🔹 Phase 4 — Real backend (productionize)

Only if this becomes a real product, not just a demo.

- [ ] Choose stack (e.g. Node/Express or Fastify + SQLite/Postgres + Prisma)
- [ ] Schema + migrations mirroring the Phase 3 model
- [ ] REST (or tRPC/GraphQL) endpoints for each entity
- [ ] Real auth: login, sessions/JWT, role-based access control
- [ ] Replace the localStorage store with a data-fetching layer (React Query)
- [ ] Validation, error handling, optimistic updates

**Exit criteria:** data persists server-side; multiple users; real sign-in.

---

## 🔹 Phase 5 — Ship & quality

- [x] **GitHub Pages deploy** — `HashRouter` + relative base (deep links/refresh work), Actions workflow, favicon, per-page tab titles
- [x] **README** with run/build/deploy instructions
- [ ] Push to GitHub + enable Pages (one-time, owner action — see README)
- [ ] Basic tests: a few component + flow tests (Vitest + Testing Library)
- [ ] Performance pass (code-split routes, lazy-load dashboards)

**Exit criteria:** a shareable live URL; green build; documented.

---

## Suggested path

- **Prototype to demo:** Phase 1 → Phase 2 (Course Player first) → Phase 5 (deploy).
- **Real product:** Phase 1 → Phase 3 → Phase 4 → Phase 5.

## Working agreement

- One checklist item (or small group) at a time; verify in the browser before moving on.
- Update this file's checkboxes as we land each piece.
