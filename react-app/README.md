# Soteria Learning — LMS Prototype

A React + Vite prototype of a learning management system with four role dashboards
(Learner, Teacher, Admin, Super Admin), course pages, and an interactive course player
(notes, quizzes, exams, online classes). State is held client-side and persisted to
`localStorage` — no backend required.

## Run locally

```bash
cd react-app
npm install
npm run dev      # http://localhost:5173
```

Build a production bundle:

```bash
npm run build    # outputs to react-app/dist
npm run preview  # serve the built site locally
```

## Sign in

The app opens on a role switcher — pick **Learner / Teacher / Admin / Super Admin**.
Use the avatar menu (top-right) to switch role, **reset demo data**, or sign out.

## Deploy to GitHub Pages

The app uses `HashRouter` and a relative asset base (`base: './'`), so it runs at any
URL with no server config — deep links and refreshes work on GitHub Pages out of the box.

A workflow at [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) builds and
publishes automatically. One-time setup:

1. From the **project root** (the folder that contains `react-app/`), initialise git and push:
   ```bash
   git init
   git add .
   git commit -m "Soteria Learning prototype"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
2. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The workflow runs on every push to `main`. When it finishes, your site is live at
   `https://<you>.github.io/<repo>/`.

To redeploy, push to `main` (or run the workflow manually from the **Actions** tab).

## Project structure

```
react-app/
  src/
    components/   # Icon, layouts, AccountMenu, NotificationBell, shared UI
    pages/        # Login, dashboards, course list + detail pages
    store/        # seed data + reducer/store (localStorage-backed)
    styles/       # design system + per-area stylesheets
```

See [`ROADMAP.md`](./ROADMAP.md) for what's done and what's next.
