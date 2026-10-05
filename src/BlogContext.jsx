import { createContext, useContext, useEffect, useState } from 'react';
import { SEED } from './data.js';

const Ctx = createContext(null);
export const useBlog = () => useContext(Ctx);

const load = (k, fallback) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; } catch { return fallback; } };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage unavailable */ } };
const uid = () => Math.random().toString(36).slice(2, 9);
export const readTime = (t = '') => Math.max(1, Math.ceil(t.trim().split(/\s+/).length / 200));
export const fmtDate = (d) => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

export function BlogProvider({ children }) {
  const [posts, setPosts] = useState(() => load('blog.posts', SEED));
  const [theme, setTheme] = useState(() => load('blog.theme', window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  const [view, setView] = useState({ name: 'home' });

  useEffect(() => save('blog.posts', posts), [posts]);
  useEffect(() => { save('blog.theme', theme); document.documentElement.dataset.theme = theme; }, [theme]);

  const go = (name, id = null) => { setView({ name, id }); window.scrollTo({ top: 0 }); };
  const patch = (id, fn) => setPosts((ps) => ps.map((p) => (p.id === id ? fn(p) : p)));

  const api = {
    posts, theme, view, go,
    toggleTheme: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
    getPost: (id) => posts.find((p) => p.id === id),
    addPost: (data) => { const post = { ...data, id: uid(), date: new Date().toISOString().slice(0, 10), likes: 0, liked: false, bookmarked: false, comments: [] }; setPosts((ps) => [post, ...ps]); return post.id; },
    updatePost: (id, data) => patch(id, (p) => ({ ...p, ...data })),
    deletePost: (id) => setPosts((ps) => ps.filter((p) => p.id !== id)),
    toggleLike: (id) => patch(id, (p) => ({ ...p, liked: !p.liked, likes: p.likes + (p.liked ? -1 : 1) })),
    toggleBookmark: (id) => patch(id, (p) => ({ ...p, bookmarked: !p.bookmarked })),
    addComment: (id, name, text) => patch(id, (p) => ({ ...p, comments: [...p.comments, { id: uid(), name: name || 'Anonymous', text, date: new Date().toISOString().slice(0, 10) }] })),
    deleteComment: (id, cid) => patch(id, (p) => ({ ...p, comments: p.comments.filter((c) => c.id !== cid) })),
  };
  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}
