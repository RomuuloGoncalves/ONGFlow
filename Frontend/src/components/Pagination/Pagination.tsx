import React from "react";
import style from "./Pagination.module.css"
import { Menor } from "@/assets/icons/Menor"
import { Maior } from "@/assets/icons/Maior"

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  windowSize?: number; // quantos botões de página mostrar por vez
};

export function Pagination({ currentPage, totalPages, onPageChange, windowSize = 3 }: PaginationProps) {
  const [currentWindow, setCurrentWindow] = React.useState(0);

  const startPage = currentWindow * windowSize + 1;
  const endPage = Math.min(startPage + windowSize - 1, totalPages);

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  const handleNext = () => {
    if (currentPage < endPage) {
      // Ainda dentro da janela → só vai pra próxima página
      onPageChange(currentPage + 1);
    } else if (endPage < totalPages) {
      // Chegou no fim da janela → avança a janela e vai para o primeiro item dela
      setCurrentWindow(currentWindow + 1);
      onPageChange(endPage + 1); // vai para a primeira página da nova janela
    }
  };

  const handlePrev = () => {
    if (currentPage > startPage) {
      onPageChange(currentPage - 1);
    } else if (currentWindow > 0) {
      setCurrentWindow(currentWindow - 1);
      onPageChange(startPage - 1);
    }
  };

  return (
    <div className={style.container__pagination} style={{
      display: totalPages < 2 ? "none" : "flex"
    }}>
      <button disabled={currentPage === 1} onClick={handlePrev} className={style.buttonBefore}>
        <Menor/>
      </button>

      {pages.map((page) => (
        <button
          key={page}
          style={{ fontWeight: page === currentPage ? "bold" : "normal" }}
          onClick={() => onPageChange(page)}
          className={page === currentPage ? style.activeButton : style.button}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={handleNext}
        className={style.buttonNext}
      >
        <Maior/>
      </button>
    </div>
  );
}

