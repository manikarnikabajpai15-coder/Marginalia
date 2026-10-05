import { useBlog, readTime, fmtDate } from '../BlogContext.jsx';
import Cover from './Cover.jsx';
import CommentSection from './CommentSection.jsx';

export default function Reader({ id }) {
  const { getPost, go, toggleLike, toggleBookmark, deletePost } = useBlog();
  const post = getPost(id);
  if (!post) {
    return <div className="empty"><h2>Post not found</h2><p>It may have been deleted.</p><button className="btn primary" onClick={() => go('home')}>Back to posts</button></div>;
  }
  const blocks = (post.content || 'This post has no content yet.').split(/\n{2,}/);
  return (
    <article className="reader">
      <button className="btn ghost" onClick={() => go('home')}>← All posts</button>
      <span className="chip">{post.category}</span>
      <h1>{post.title}</h1>
      <p className="meta">{post.author} · {fmtDate(post.date)} · {readTime(post.content)} min read</p>
      <Cover src={post.cover} title={post.title} className="reader-cover" />
      <div className="prose">
        {blocks.map((b, i) => (b.startsWith('## ') ? <h2 key={i}>{b.slice(3)}</h2> : <p key={i}>{b}</p>))}
      </div>
      <p className="tags">{post.tags.map((t) => `#${t}`).join(' ')}</p>
      <div className="card-actions bar">
        <button className={`btn ${post.liked ? 'on' : ''}`} aria-pressed={post.liked} onClick={() => toggleLike(post.id)}>{post.liked ? '♥' : '♡'} {post.likes}</button>
        <button className={`btn ${post.bookmarked ? 'on' : ''}`} aria-pressed={post.bookmarked} onClick={() => toggleBookmark(post.id)}>{post.bookmarked ? '★ Saved' : '☆ Save'}</button>
        <span className="spacer" />
        <button className="btn" onClick={() => go('form', post.id)}>Edit</button>
        <button className="btn danger" onClick={() => { if (window.confirm('Delete this post?')) { deletePost(post.id); go('home'); } }}>Delete</button>
      </div>
      <CommentSection post={post} />
    </article>
  );
}
