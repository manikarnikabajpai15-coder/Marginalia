# Marginalia – Blog Management Platform

A responsive, fully client-side blog platform built with React. Browse, read, search, create, edit and delete posts, with likes, bookmarks, comments and a dark/light theme. No backend required: data persists in `localStorage`.

## Features
- **Explore:** responsive card grid with category, tags, author, date, read time, cover (or placeholder) and excerpt
- **Reader view:** serif typography, 700px measure, `## ` headings supported in content
- **Search and filters:** instant title/content search, category and tag pills, "Saved" filter
- **CRUD:** create, edit and delete posts through a validated form
- **Engagement:** like and bookmark on cards and reader, add and delete comments
- **Theme:** dark/light toggle (respects system preference, remembered across visits)
- **States:** empty results, missing/broken images, missing post, empty content fallbacks
- **Motion:** CSS transitions and keyframes, disabled under `prefers-reduced-motion`

## Tech stack
React 18 (hooks, Context API) · Vite 5 · plain CSS with custom properties · `localStorage` persistence

## Project structure
```
blog-platform/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx            # entry, wraps App in BlogProvider
    ├── App.jsx             # view switching (home / post / form)
    ├── BlogContext.jsx     # global state: posts, theme, view, all actions
    ├── data.js             # seed posts
    ├── styles.css          # theme tokens + layout
    └── components/
        ├── Header.jsx  Home.jsx  PostCard.jsx  Cover.jsx
        └── Reader.jsx  BlogForm.jsx  CommentSection.jsx
```

## Setup
```bash
npm install && npm start
```
Open the URL Vite prints (default http://localhost:5173). Use `npm run build` for a production bundle.

## Challenges faced & solutions
1. **Keeping state consistent across views.** Cards, the reader and the form all mutate the same post. A single `BlogProvider` owns `posts` and exposes small action functions (`toggleLike`, `addComment`, …) that update via functional `setPosts`, so every view re-renders from one source of truth with no stale copies. Views store only a post `id`, never a post object.
2. **Dynamic CRUD without drift.** Editing and deleting while a filter is active could leave the UI showing stale results. Filtered lists are derived with `useMemo` from `posts` + filter state rather than stored, so changes appear instantly. The reader handles a deleted post with a dedicated "Post not found" state.
3. **Accessible theme toggle.** The toggle is a real `<button role="switch" aria-checked>` with a label, keyboard operable, and sets `data-theme` on `<html>` so CSS variables swap everywhere with a single transition. The initial value comes from `prefers-color-scheme`, then the saved choice.
4. **Persistence that can't crash the app.** `localStorage` can be blocked or hold corrupt JSON. Reads and writes are wrapped in `try/catch` with seed-data fallback.
5. **Broken images.** `Cover` swaps to a lettered gradient placeholder on missing URL or `onError`, so layouts never collapse.
6. **Animations without clutter.** Page changes use a keyed fade, cards use a short staggered entrance, and all motion is removed for users who prefer reduced motion.

## Ideas for next steps
Router (React Router) for shareable URLs, Markdown rendering, Framer Motion `AnimatePresence` for exit animations, a real API layer.
[README.md](https://github.com/user-attachments/files/33052927/README.md)
