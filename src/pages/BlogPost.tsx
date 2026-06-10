import { useParams, Link } from 'react-router-dom';
import { lazy, Suspense, type ComponentType } from 'react';
import AdUnit from '../components/AdUnit';
import { blogPosts } from '../data/blogPosts';

// Map all MDX files using Vite's import.meta.glob
const mdxComponents = import.meta.glob('../content/blog/*.mdx');

// Cache lazy components at module level to prevent re-creation on render
const mdxCache = new Map<string, React.LazyExoticComponent<any>>();
function getMdxComponent(id: string) {
  if (!mdxCache.has(id)) {
    const importFn = mdxComponents[`../content/blog/${id}.mdx`];
    if (importFn) {
      mdxCache.set(id, lazy(importFn as () => Promise<{ default: ComponentType }>));
    }
  }
  return mdxCache.get(id) ?? null;
}

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const post = id ? blogPosts.find(p => p.id === id) : null;

  if (!post || !id) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Article not found</h2>
        <Link to="/blog" className="btn btn-outline">Return to Blog</Link>
      </div>
    );
  }

  const MdxContent = getMdxComponent(id);

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-8 flex justify-between items-center">
        <Link to="/blog" className="btn btn-ghost">&larr; Back to Articles</Link>
        <Link to={`/visualizer/${post.toolId}`} className="btn btn-primary">Try the Visualizer Tool</Link>
      </div>
      
      <article className="prose prose-lg dark:prose-invert max-w-none bg-base-100 p-8 md:p-12 rounded-2xl shadow-xl border border-base-200">
        <p className="text-base-content/50 italic mb-8">{post.date}</p>
        
        <Suspense fallback={<div className="flex justify-center p-12"><span className="loading loading-spinner loading-lg"></span></div>}>
          {MdxContent ? <MdxContent /> : <p>Loading content...</p>}
        </Suspense>
      </article>

      <div className="mt-12">
        <AdUnit slotId="3005" format="auto" />
      </div>
    </div>
  );
};

export default BlogPost;
