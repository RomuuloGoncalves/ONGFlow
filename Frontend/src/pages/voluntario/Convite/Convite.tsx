import Header from "@/components/Voluntario/Header/Header";
import style from "./Convite.module.css";
import { Pesquisa } from "@/assets/icons/Pesquisa";
import { Pagination } from "@/components/Pagination/Pagination";
import { useState } from "react";

const items = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`);

function Convite() {
  // Número da página atual e a quantidade de itens por página
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // índice do primeiro item da página atual
  const start = (currentPage - 1) * itemsPerPage;

  // fatia do array que representa a página atual
  const paginatedItems = items.slice(start, start + itemsPerPage);

  return (
    <>
      <Header />
      <div className={style.container__title}>
        <h1>Seus Convites</h1>
        <p>
          Descubra as oportunidades que esperam por você. Explore, analise e
          escolha aceitar ou recusar cada convite.
        </p>
      </div>
      <div className={style.container__table}>
        <div className={style.container__table_header}>
          <div className={style.search}>
            <Pesquisa />
            <input
              type="text"
              className={style.search}
              placeholder="Filtrar por ONG ou projeto"
            />
          </div>
          <div className={style.container__tags}>
            <button className={`${style.button}`}>Todos</button>
            <button className={`${style.button}`}>Pendentes</button>
            <button className={`${style.button}`}>Aceitos</button>
            <button className={`${style.button}`}>Recusados</button>
            <button className={`${style.button}`}>Solicitações</button>
          </div>
        </div>
        <div className={style.container__table_body}>
          <ul>
            {paginatedItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className={style.container__table_footer}>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(items.length / itemsPerPage)}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </>
  );
}

export default Convite;
