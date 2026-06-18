export interface PaginationProps {
  /** 1-based current page. */
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  /** Accessible label for the nav landmark. Defaults to "Pagination". */
  label?: string;
}

/** Builds the page list with `'ellipsis'` gaps: always shows first, last, and a window around current. */
function pageItems(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const items: (number | 'ellipsis')[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  if (start > 2) items.push('ellipsis');
  for (let p = start; p <= end; p++) items.push(p);
  if (end < total - 1) items.push('ellipsis');

  items.push(total);
  return items;
}

export const Pagination = ({ currentPage, totalPages, onPageChange, className = '', label = 'Pagination' }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const goTo = (page: number) => {
    const clamped = Math.min(Math.max(page, 1), totalPages);
    if (clamped !== currentPage) onPageChange(clamped);
  };

  return (
    <nav className={`flex justify-center ${className}`} aria-label={label}>
      <div className="join">
        <button
          type="button"
          className="join-item btn btn-sm sm:btn-md"
          onClick={() => goTo(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          «
        </button>

        {pageItems(currentPage, totalPages).map((item, i) =>
          item === 'ellipsis' ? (
            <button key={`ellipsis-${i}`} type="button" className="join-item btn btn-sm sm:btn-md btn-disabled pointer-events-none" tabIndex={-1} aria-hidden="true">
              …
            </button>
          ) : (
            <button
              key={item}
              type="button"
              className={`join-item btn btn-sm sm:btn-md ${item === currentPage ? 'btn-primary' : ''}`}
              onClick={() => goTo(item)}
              aria-current={item === currentPage ? 'page' : undefined}
              aria-label={`Page ${item}`}
            >
              {item}
            </button>
          )
        )}

        <button
          type="button"
          className="join-item btn btn-sm sm:btn-md"
          onClick={() => goTo(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          »
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
