import { useState } from 'react';
import { useBlog } from '../BlogContext.jsx';

export default function BlogForm({ id }) {
  const { getPost, addPost, updatePost, go } = useBlog();
  const existing = id ? getPost(id) : null;
  const [f, setF] = useState({
    title: existing?.title || '', author: existing?.author || '', category: existing?.category || '',
    cover: existing?.cover || '', tags: existing?.tags.join(', ') || '', content: existing?.content || '',
  });
  const [errors, setErrors] = useState({});
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!f.title.trim()) errs.title = 'Add a title.';
    if (!f.category.trim()) errs.category = 'Add a category.';
    if (f.content.trim().length < 20) errs.content = 'Write at least a couple of sentences.';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    const data = {
      title: f.title.trim(), author: f.author.trim() || 'Anonymous', category: f.category.trim(),
      cover: f.cover.trim(), content: f.content.trim(),
      tags: f.tags.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean),
    };
    if (existing) { updatePost(existing.id, data); go('post', existing.id); }
    else go('post', addPost(data));
  };

  const field = (k, label, props = {}) => (
    <label className="field">{label}
      <input className="input" value={f[k]} onChange={set(k)} aria-invalid={!!errors[k]} {...props} />
      {errors[k] && <span className="err" role="alert">{errors[k]}</span>}
    </label>
  );

  return (
    <form className="form stack" onSubmit={submit} noValidate>
      <h1>{existing ? 'Edit post' : 'New post'}</h1>
      {field('title', 'Title')}
      <div className="two">
        {field('author', 'Author')}
        {field('category', 'Category', { placeholder: 'Tech, Design…' })}
      </div>
      {field('cover', 'Cover image URL (optional)', { type: 'url', placeholder: 'https://…' })}
      {field('tags', 'Tags (comma separated)', { placeholder: 'react, ux' })}
      <label className="field">Content
        <textarea className="input" rows="12" value={f.content} onChange={set('content')} aria-invalid={!!errors.content}
          placeholder={'Separate paragraphs with a blank line.\nStart a line with "## " for a heading.'} />
        {errors.content && <span className="err" role="alert">{errors.content}</span>}
      </label>
      <div className="row">
        <button className="btn primary" type="submit">{existing ? 'Save changes' : 'Publish post'}</button>
        <button className="btn" type="button" onClick={() => go(existing ? 'post' : 'home', existing?.id)}>Cancel</button>
      </div>
    </form>
  );
}
