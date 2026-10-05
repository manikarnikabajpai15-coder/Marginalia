import { useState } from 'react';
import { useBlog, fmtDate } from '../BlogContext.jsx';

export default function CommentSection({ post }) {
  const { addComment, deleteComment } = useBlog();
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addComment(post.id, name.trim(), text.trim());
    setText('');
  };
  return (
    <section className="comments" aria-labelledby="c-title">
      <h2 id="c-title">Comments ({post.comments.length})</h2>
      <form onSubmit={submit} className="stack">
        <input className="input" placeholder="Your name (optional)" aria-label="Your name" value={name} onChange={(e) => setName(e.target.value)} />
        <textarea className="input" rows="3" placeholder="Add a comment" aria-label="Comment" value={text} onChange={(e) => setText(e.target.value)} />
        <button className="btn primary" type="submit" disabled={!text.trim()}>Post comment</button>
      </form>
      {post.comments.length === 0 && <p className="meta">No comments yet. Start the conversation.</p>}
      <ul className="clist">
        {post.comments.map((c) => (
          <li key={c.id} className="comment">
            <div className="row"><strong>{c.name}</strong><span className="meta">{fmtDate(c.date)}</span><span className="spacer" />
              <button className="btn ghost danger" onClick={() => deleteComment(post.id, c.id)} aria-label={`Delete comment by ${c.name}`}>Delete</button></div>
            <p>{c.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
