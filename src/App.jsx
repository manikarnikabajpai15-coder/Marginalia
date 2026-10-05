import { useBlog } from './BlogContext.jsx';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import Reader from './components/Reader.jsx';
import BlogForm from './components/BlogForm.jsx';

export default function App() {
  const { view } = useBlog();
  return (
    <>
      <Header />
      <main className="wrap page" key={`${view.name}-${view.id}`}>
        {view.name === 'home' && <Home />}
        {view.name === 'post' && <Reader id={view.id} />}
        {view.name === 'form' && <BlogForm id={view.id} />}
      </main>
    </>
  );
}
