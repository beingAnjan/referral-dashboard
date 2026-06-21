import "./index.css";

function Pagination({
  currentPage,
  totalPages,
  pageNumbers,
  startEntry,
  endEntry,
  totalEntries,
  setCurrentPage,
}) {
  return (
    <div className="pagination">

      <p className="pagination-info">
        Showing {startEntry}-{endEntry} of {totalEntries} entries
      </p>

      <div className="page-buttons">

        <button
          className="nav-btn"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>

        {pageNumbers.map((page) => (
          <button
            key={page}
            className={`page-btn ${
              currentPage === page ? "active" : ""
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}

        <button
          className="nav-btn"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>

      </div>
    </div>
  );
}

export default Pagination;