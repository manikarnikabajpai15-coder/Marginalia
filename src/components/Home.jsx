import { useMemo, useState } from 'react';
import { useBlog } from '../BlogContext.jsx';
import PostCard from './PostCard.jsx';

export default function Home() {
  const { posts, go } = useBlog();
  const [q, setQ] = useState('');
  const [pill, setPill] = useState('All');
  const [savedOnly, setSavedOnly] = useState(false);

  const pills = useMemo(() => ['All', ...new Set(posts.flatMap((p) => [p.category, ...p.tags]))], [posts]);
  const shown = useMemo(() => {
    const s = q.trim().toLowerCase();
    return posts.filter((p) =>
      (pill === 'All' || p.category === pill || p.tags.includes(pill)) &&
      (!savedOnly || p.bookmarked) &&
      (!s || p.title.toLowerCase().includes(s) || p.content.toLowerCase().includes(s)));
  }, [posts, q, pill, savedOnly]);

  return (
    <>
      <section className="hero">
        <h1>Notes on building, designing, and getting things done.</h1>
        <input type="search" className="input" placeholder="Search titles and content" aria-label="Search posts" value={q} onChange={(e) => setQ(e.target.value)} />
        <div className="pills" role="group" aria-label="Filter by category or tag">
          {pills.map((p) => (
            <button key={p} className={`pill ${pill === p ? 'active' : ''}`} aria-pressed={pill === p} onClick={() => setPill(p)}>{p}</button>
          ))}
          <button className={`pill ${savedOnly ? 'active' : ''}`} aria-pressed={savedOnly} onClick={() => setSavedOnly((v) => !v)}>★ Saved</button>
        </div>
      </section>
      {shown.length ? (
        <div className="grid">{shown.map((p, i) => <PostCard key={p.id} post={p} index={i} />)}</div>
      ) : (
        <div className="empty">
          <h2>No matching posts found</h2>
          <p>{posts.length ? 'Try a different search or clear the filters.' : 'Write your first post to get started.'}</p>
          <div className="row center">
            {posts.length > 0 && <button className="btn" onClick={() => { setQ(''); setPill('All'); setSavedOnly(false); }}>Clear filters</button>}
            <button className="btn primary" onClick={() => go('form')}>New post</button>
          </div>
        </div>
      )}
    </>
  );
}
