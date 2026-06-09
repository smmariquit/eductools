import { useParams, Link } from 'react-router-dom';
import AdUnit from '../components/AdUnit';
import { blogPosts } from '../data/blogPosts';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const post = id ? blogPosts.find(p => p.id === id) : null;

  if (!post) {
    return (
      <div className="page-container">
        <h2>Article not found</h2>
        <Link to="/blog" className="legacy-btn legacy-btn-outline">Return to Blog</Link>
      </div>
    );
  }

  return (
    <div className="page-container" style={{ maxWidth: '800px' }}>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between' }}>
        <Link to="/blog" className="legacy-btn legacy-btn-outline">&larr; Back to Articles</Link>
        <Link to={`/visualizer/${post.toolId}`} className="legacy-btn legacy-btn-primary">Try the Visualizer Tool</Link>
      </div>
      <article className="article-content" style={{ background: 'var(--card-bg, #1e293b)', padding: '2rem', borderRadius: '12px' }}>
        <h1 style={{ color: 'var(--accent-color)' }}>{post.title}</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontStyle: 'italic' }}>{post.date}</p>
        
        <div style={{ lineHeight: '1.8' }} dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>

      <div style={{ marginTop: '3rem' }}>
        <AdUnit slotId="3005" format="horizontal" />
      </div>
    </div>
  );
};

export default BlogPost;
