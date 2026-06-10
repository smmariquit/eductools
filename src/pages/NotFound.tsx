import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
      <h1 className="text-8xl font-extrabold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-bold text-base-content mb-2">Page Not Found</h2>
      <p className="text-base-content/60 mb-8 max-w-md">
        The page you're looking for doesn't exist. It may have been moved or the URL might be incorrect.
      </p>
      <div className="flex gap-4">
        <Link to="/" className="btn btn-primary">Go to Home</Link>
        <Link to="/blog" className="btn btn-outline">Browse Blog</Link>
      </div>
    </div>
  );
};

export default NotFound;
