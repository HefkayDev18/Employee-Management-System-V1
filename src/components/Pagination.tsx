import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`mx-1 px-3 py-1 text-sm rounded ${i === currentPage ? 'bg-primary text-white' : 'bg-white text-primary border border-primary'} transition-colors duration-300 hover:bg-primary hover:text-white focus:outline-none`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center mt-6 mb-3">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="mx-1 px-3 py-1 text-sm rounded bg-white text-primary border border-primary transition-colors duration-300 hover:bg-primary hover:text-white focus:outline-none disabled:opacity-50"
      >
        Previous
      </button>
      {renderPageNumbers()}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="mx-1 px-3 py-1 text-sm rounded bg-white text-primary border border-primary transition-colors duration-300 hover:bg-primary hover:text-white focus:outline-none disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
