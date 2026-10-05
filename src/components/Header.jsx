import { useBlog } from '../BlogContext.jsx';

export default function Header() {
  const { theme, toggleTheme, go, view } = useBlog();
  const dark = theme === 'dark';
  return (
    <header className="header">
      <div className="wrap header-in">
        <button className="logo" onClick={() => go('home')}>Marginalia</button>
        <nav className="row">
          {view.name !== 'form' && <button className="btn primary" onClick={() => go('form')}>New post</button>}
          <button className="btn icon" role="switch" aria-checked={dark} aria-label="Dark mode" onClick={toggleTheme}>
            {dark ? '☀' : '☾'}
          </button>
        </nav>
      </div>
    </header>
  );
}
