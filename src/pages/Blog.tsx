import { Link } from 'react-router-dom';
import AdUnit from '../components/AdUnit';
import { blogPosts } from '../data/blogPosts';

const Blog = () => {
  return (
    <div className="page-container">
      <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--accent-color)', fontSize: '2.5rem' }}>Educational Insights Blog</h1>
        <p>Articles and updates from the Eductools team regarding Philippine education technology.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        {blogPosts.map(article => (
          <div key={article.id} className="card">
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--accent-color)' }}>{article.title}</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>{article.date}</p>
            <p style={{ marginBottom: '1.5rem' }}>{article.excerpt}</p>
            <Link to={`/blog/${article.id}`} className="btn btn-outline">Read Full Article &rarr;</Link>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '3rem' }}>
        <AdUnit slotId="3001" format="auto" />
      </div>
    </div>
  );
};

export default Blog;
