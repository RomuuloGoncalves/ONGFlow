import Header from "@/components/Voluntario/Header/Header";
import style from "./HomeVoluntario.module.css";
// import { useState } from "react";
// import { Pagination } from "@/components/Pagination/Pagination";
import  SelectSimple  from "@/components/Voluntario/Select";
import { Pesquisa } from "@/assets/icons/Pesquisa";
import { Localizacao } from "@/assets/icons/Localizacao";

function HomeVoluntario() {
  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 6;
  // const start = (currentPage - 1) * itemsPerPage;
  // const paginatedItems = projetos.slice(start, start + itemsPerPage);

  return (
    
    <>
      <Header />
      <div className={style.container__title}>
        <h1>Bem vindo de volta!</h1>
        <p>Acompanhe as suas participações em projetos </p>
        <button className={style.button__newProject}>Participar de um novo Projeto</button>
      </div>

      <div className={style.container__table}>
        <div className={style.container__table_header}>
          <p>Filtro </p>
          <div className={style.input__search}>
            <Pesquisa className={style.icon}/>
            <input type="text" placeholder="Procure por projeto" />
          </div>
          <SelectSimple />
        </div>
        <div className={style.container__table_body}>
              <div className={style.card}>
                <div className={style.card__title}>
                  <div className={style.card__title_tag}>
                    <p>Status</p>
                  </div>
                  <h1>Titulo</h1>
                </div>
                <div className={style.card__descricao}>
                  <p>Descrição</p>
                </div>
                <div className={style.card__location}>
                    <p>
                      <Localizacao className={style.icon} />
                      Localização
                    </p>
                  </div>
                <div className={style.habilidades}>
                  {/* {item.habilidades.map((hab, i) => (
                    <div key={i} className={style.badge}>
                      <p>{hab}</p>
                    </div>
                  ))} */}
                </div>
              </div>
        </div>
        <div className={style.container__table_footer}>
        </div>
      </div>
    </>
  );
}

export default HomeVoluntario;
