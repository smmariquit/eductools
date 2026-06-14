import { useParams, Link } from 'react-router-dom';
import React, { lazy, Suspense, type ComponentType } from 'react';
import AdUnit from '../components/AdUnit';
import { blogPosts } from '../data/blogPosts';

// Map all MDX files using Vite's import.meta.glob (multi-pattern support)
const mdxComponents = import.meta.glob([
  '../content/blog/*.mdx',
  '../content/deep-dives/*.mdx'
]);

// Cache lazy components at module level to prevent re-creation on render
const mdxCache = new Map<string, React.LazyExoticComponent<ComponentType<Record<string, unknown>>>>();
function getMdxComponent(id: string) {
  if (!mdxCache.has(id)) {
    // Try to find the file in either directory
    let importFn = mdxComponents[`../content/blog/${id}.mdx`] || mdxComponents[`../content/deep-dives/${id}.mdx`];
    if (importFn) {
      mdxCache.set(id, lazy(importFn as () => Promise<{ default: ComponentType }>));
    }
  }
  return mdxCache.get(id) ?? null;
}

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const post = id ? blogPosts.find(p => p.id === id) : null;

  const contentComponent = React.useMemo(() => id ? getMdxComponent(id) : null, [id]);

  if (!post || !id) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Article not found</h2>
        <Link to="/blog" className="btn btn-outline">Return to Blog</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-8 flex justify-between items-center">
        <Link to="/blog" className="btn btn-ghost">&larr; Back to Articles</Link>
        {post.toolId && (
          <Link to={`/visualizer/${post.toolId}`} className="btn btn-primary">Try the Visualizer Tool</Link>
        )}
      </div>
      
      <article className="prose prose-lg dark:prose-invert max-w-none bg-base-100 p-8 md:p-12 rounded-2xl shadow-xl border border-base-200">
        <div className="flex items-center gap-3 mb-8 pb-8 border-b border-base-200 not-prose">
          <div className="avatar">
            <div className="w-10 h-10 rounded-full border border-base-300 shadow-sm overflow-hidden">
              <img src="/team/author.jpg" alt="Simonee Ezekiel Mariquit" className="w-full h-full object-cover" />
            </div>
          </div>
          <div>
            <a href="https://stimmie.dev" target="_blank" rel="noopener noreferrer" className="font-bold text-base-content hover:text-primary transition-colors">
              Simonee Ezekiel Mariquit
            </a>
            <p className="text-sm text-base-content/60 m-0">{post.date}</p>
          </div>
        </div>
        
        <Suspense fallback={<div className="flex justify-center p-12"><span className="loading loading-spinner loading-lg"></span></div>}>
          {contentComponent ? React.createElement(contentComponent) : <p>Loading content...</p>}
        </Suspense>
      </article>

      <div className="mt-12">
        <AdUnit slotId="3005" format="auto" />
      </div>
    </div>
  );
};

export default BlogPost;
