import React from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  windowSize?: number; // quantos botões de página mostrar por vez
};

export function Pagination({ currentPage, totalPages, onPageChange, windowSize = 5 }: PaginationProps) {
  const [currentWindow, setCurrentWindow] = React.useState(0);

  const startPage = currentWindow * windowSize + 1;
  const endPage = Math.min(startPage + windowSize - 1, totalPages);

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  const nextWindow = () => {
    if ((currentWindow + 1) * windowSize < totalPages) {
      setCurrentWindow(currentWindow + 1);
    }
  };

  const prevWindow = () => {
    if (currentWindow > 0) {
      setCurrentWindow(currentWindow - 1);
    }
  };

  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
        {"<"}
      </button>

      <button disabled={currentWindow === 0} onClick={prevWindow}>
        ...
      </button>

      {pages.map((page) => (
        <button
          key={page}
          style={{ fontWeight: page === currentPage ? "bold" : "normal" }}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button disabled={(currentWindow + 1) * windowSize >= totalPages} onClick={nextWindow}>
        ...
      </button>

      <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
        {">"}
      </button>
    </div>
  );
}
