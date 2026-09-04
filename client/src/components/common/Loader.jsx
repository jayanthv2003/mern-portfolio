/**
 * Full-page loading spinner, used as the Suspense fallback for lazy-loaded
 * routes and while async data (projects, certificates) is being fetched.
 */
const Loader = ({ label = 'Loading' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] gap-3">
      <div
        className="w-10 h-10 border-[3px] border-border-light dark:border-border-dark border-t-signal rounded-full animate-spin"
        role="status"
        aria-label={label}
      />
      <span className="font-mono text-xs text-ink/60 dark:text-mist/60">{label}...</span>
    </div>
  );
};

export default Loader;
