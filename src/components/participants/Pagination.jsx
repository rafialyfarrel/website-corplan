const Pagination = ({ currentPage, totalPages, getPageNumbers, onPageChange, embedded = false }) => {
  return (
    <div className={`flex justify-center items-center gap-1 sm:gap-2 ${embedded ? "mt-4 sm:mt-6" : "mt-8"}`}>
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className={`px-2 py-1.5 sm:px-3 sm:py-2 rounded text-xs sm:text-sm transition-all ${
          currentPage === 1
            ? "bg-gray-900 text-gray-600 cursor-not-allowed"
            : "bg-gray-800 text-white hover:bg-gray-700"
        }`}
      >
        Prev
      </button>

      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && onPageChange(page)}
          disabled={page === "..."}
          className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded text-xs sm:text-sm transition-all ${
            page === currentPage
              ? "bg-white text-black"
              : page === "..."
              ? "bg-transparent text-gray-600 cursor-default"
              : "bg-gray-800 text-white hover:bg-gray-700"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`px-2 py-1.5 sm:px-3 sm:py-2 rounded text-xs sm:text-sm transition-all ${
          currentPage === totalPages
            ? "bg-gray-900 text-gray-600 cursor-not-allowed"
            : "bg-gray-800 text-white hover:bg-gray-700"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
