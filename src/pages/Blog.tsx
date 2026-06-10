import { Link } from 'react-router-dom';
import AdUnit from '../components/AdUnit';
import { blogPosts } from '../data/blogPosts';
import { Helmet } from 'react-helmet-async';

const Blog = () => {
  const fullTitle = 'Educational Insights Blog | Eductools';
  const description = 'Articles and updates on Philippine education technology, MATATAG curriculum alignment, and STEM pedagogy.';
  const ogImageUrl = `https://eductools.ph/api/og?title=${encodeURIComponent('Educational Insights Blog')}&desc=${encodeURIComponent(description.slice(0, 100))}`;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Helmet>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Eductools" />
        <meta property="og:image" content={ogImageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImageUrl} />
      </Helmet>
      <div className="border-b border-base-300 pb-4 mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">Educational Insights Blog</h1>
        <p className="text-lg text-base-content/80">Articles and updates from the Eductools team regarding Philippine education technology.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {blogPosts.map(article => (
          <div key={article.id} className="card bg-base-100 shadow-xl border border-base-200">
            <div className="card-body">
              <h2 className="card-title text-2xl text-primary">{article.title}</h2>
              <p className="text-sm text-base-content/60 italic mb-4">{article.date}</p>
              <p className="text-base-content/80 mb-6">{article.excerpt}</p>
              <div className="card-actions justify-end">
                <Link to={`/blog/${article.id}`} className="btn btn-outline btn-primary">Read Full Article &rarr;</Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <AdUnit slotId="3001" format="auto" />
      </div>
    </div>
  );
};

export default Blog;
