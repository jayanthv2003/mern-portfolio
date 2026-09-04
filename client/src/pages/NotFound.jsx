import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO.jsx';

const NotFound = () => {
  return (
    <>
      <SEO title="Page Not Found | Jayanth" description="This page doesn't exist." />
      <div className="min-h-screen flex flex-col items-center justify-center container-px text-center">
        <p className="font-mono text-signal text-sm mb-4">{'// Error 404'}</p>
        <h1 className="font-display text-5xl sm:text-7xl font-semibold mb-4">Not found</h1>
        <p className="text-ink/70 dark:text-mist/70 max-w-md mb-8">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
        <Link to="/" className="btn-primary">
          Back to home
        </Link>
      </div>
    </>
  );
};

export default NotFound;
