import { useParams, Link, Navigate } from 'react-router-dom';
import React, { Suspense, useMemo } from 'react';
import AdUnit from '../components/AdUnit';
import { Figure } from '../components/content/Figure';
import { StudyExamples } from '../components/content/StudyExamples';
import { WriteupExercises } from '../components/content/WriteupExercises';
import { findBlogPost, DEFAULT_AUTHOR } from '../data/blogPosts';
import { visualizerModules } from '../data/registry';
import { resolveStudyExamplesId } from '../data/studyExamples';
import { getMdxComponent } from '../lib/writeupMdx';
import { resolveWriteupSlug } from '../lib/writeupSlugs';
import { WriteupSkeleton } from '../components/loading/WriteupSkeleton';
import { LoadingIndicator } from '../components/ui/LoadingIndicator';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();

  if (id && id !== resolveWriteupSlug(id)) {
    return <Navigate to={`/blog/${resolveWriteupSlug(id)}`} replace />;
  }

  const post = id ? findBlogPost(id) : null;
  const toolModule = post?.toolId ? visualizerModules.find((m) => m.id === post.toolId) : undefined;

  const contentComponent = useMemo(() => (id ? getMdxComponent(id) : null), [id]);

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
        {post.toolId && toolModule && (
          <Link to={toolModule.path} className="btn btn-primary">Try the Visualizer Tool</Link>
        )}
      </div>
      
      <article className="prose prose-lg dark:prose-invert max-w-none bg-base-100 p-8 md:p-12 rounded-2xl shadow-xl border border-base-200">
        {(() => {
          const author = post.author ?? DEFAULT_AUTHOR;
          return (
            <div className="flex items-center gap-3 mb-8 pb-8 border-b border-base-200 not-prose">
              <div className="avatar">
                <div className="w-10 h-10 rounded-full border border-base-300 shadow-sm overflow-hidden">
                  <Figure
                    variant="avatar"
                    src={author.avatar ?? DEFAULT_AUTHOR.avatar}
                    alt={author.name}
                  />
                </div>
              </div>
              <div>
                {author.url ? (
                  <a href={author.url} target="_blank" rel="noopener noreferrer" className="font-bold text-base-content hover:text-primary transition-colors">
                    {author.name}
                  </a>
                ) : (
                  <span className="font-bold text-base-content">{author.name}</span>
                )}
                <p className="text-sm text-base-content/60 m-0">{post.date}</p>
              </div>
            </div>
          );
        })()}
        
        <StudyExamples moduleId={resolveStudyExamplesId(post.toolId || post.id)} />

        <Suspense
          fallback={
            <div className="py-4">
              <LoadingIndicator label="Loading article…" size="sm" className="mb-8" />
              <WriteupSkeleton paragraphs={6} />
            </div>
          }
        >
          {contentComponent ? (
            React.createElement(contentComponent)
          ) : (
            <div className="not-prose text-center py-8">
              <p className="text-base-content/80">This article file is missing. If you were looking for a tool writeup, open the visualizer instead.</p>
              {post.toolId && toolModule && (
                <Link to={toolModule.path} className="btn btn-primary mt-4">Open the visualizer</Link>
              )}
            </div>
          )}
        </Suspense>

        <WriteupExercises moduleId={resolveStudyExamplesId(post.toolId || post.id)} />
      </article>

      <div className="mt-12">
        <AdUnit slotId="3005" format="auto" />
      </div>
    </div>
  );
};

export default BlogPost;
