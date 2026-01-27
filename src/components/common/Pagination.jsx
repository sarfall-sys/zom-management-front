import React from "react";

function Pagination({ onPrevious, onNext, currentPage, lastPage }) {


  return (
    <div className="flex items-center justify-center mt-6">
      <button
        disabled={currentPage === 1}
        onClick={onPrevious}
        className="px-4 py-2 transition-colors rounded-md text-text-light dark:text-text-dark bg-bg-light dark:bg-bg-dark hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      <span className="mx-4">
        {currentPage} of {lastPage}
      </span>

      <button
        disabled={currentPage === lastPage}
        onClick={onNext}
        className="px-4 py-2 transition-colors rounded-md text-text-light dark:text-text-dark bg-bg-light dark:bg-bg-dark hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
