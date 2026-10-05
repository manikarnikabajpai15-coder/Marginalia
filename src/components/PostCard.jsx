import { useBlog, readTime, fmtDate } from '../BlogContext.jsx';
import Cover from './Cover.jsx';

export default function PostCard({ post, index }) {
  const { go, toggleLike, toggleBookmark, deletePost } = useBlog();
  const excerpt = post.content.replace(/## /g, '').split('\n\n')[0];
  return (
    <article className="card" style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}>
      <button className="card-main" onClick={() => go('post', post.id)}>
        <Cover src={post.cover} title={post.title} />
        <div className="card-body">
          <span className="chip">{post.category}</span>
          <h2>{post.title}</h2>
          <p className="excerpt">{excerpt}</p>
          <p className="meta">{post.author} · {fmtDate(post.date)} · {readTime(post.content)} min read</p>
          <p className="tags">{post.tags.map((t) => `#${t}`).join(' ')}</p>
        </div>
      </button>
      <div className="card-actions">
        <button className={`btn ghost ${post.liked ? 'on' : ''}`} aria-pressed={post.liked} onClick={() => toggleLike(post.id)}>
          {post.liked ? '♥' : '♡'} {post.likes}
        </button>
        <button className={`btn ghost ${post.bookmarked ? 'on' : ''}`} aria-pressed={post.bookmarked} onClick={() => toggleBookmark(post.id)}>
          {post.bookmarked ? '★ Saved' : '☆ Save'}
        </button>
        <span className="spacer" />
        <button className="btn ghost" onClick={() => go('form', post.id)}>Edit</button>
        <button className="btn ghost danger" onClick={() => window.confirm('Delete this post?') && deletePost(post.id)}>Delete</button>
      </div>
    </article>
  );
}
