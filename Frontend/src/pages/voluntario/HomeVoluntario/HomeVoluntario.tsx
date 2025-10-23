import Header from "@/components/Voluntario/Header/Header";
import style from "./HomeVoluntario.module.css";
import { useState, useEffect } from "react";
import { Pagination } from "@/components/Pagination/Pagination";
import SelectSimple from "@/components/Voluntario/Select";
import { Pesquisa } from "@/assets/icons/Pesquisa";
import { Localizacao } from "@/assets/icons/Localizacao";
import ModalVoluntario from "@/modals/Voluntarios/VoluntarioHome/modalVoluntarioHome";
import { Link } from "react-router-dom";
// import ProjetoService from "@/services/projetoService";
import type { Projeto } from "@/interfaces/projeto";

function HomeVoluntario() {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [textPesquisa, setTextPesquisa] = useState("");
  const [filtro, setFiltro] = useState("Todos");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchProjetos() {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user && user.id) {
        // const response = await ProjetoService.colocarmetodo(user.id);
        // const response = undefined;
        // setProjetos(response.data);
      }
    }
    fetchProjetos();
  }, []);

  const itemsPerPage = 4;

  // Aplica filtro por status e pesquisa
  const projetosFiltrados = projetos.filter((p) => {
    const pesquisa = textPesquisa.toLowerCase();
    const statusValido = filtro === "Todos" || p.status === filtro;
    const pesquisaValida =
      p.nome.toLowerCase().includes(pesquisa) ||
      p.ong.endereco.cidade.toLowerCase().includes(pesquisa);
    return statusValido && pesquisaValida;
  });

  // Paginação
  const start = (currentPage - 1) * itemsPerPage;
  const paginatedItems = projetosFiltrados.slice(start, start + itemsPerPage);

  return (
    <>
      <ModalVoluntario isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      <Header />
      <div className={style.container__title}>
        <h1>Bem vindo de volta!</h1>
        <p>Acompanhe as suas participações em projetos </p>
        <Link to="/projetos/voluntario" className={style.button__newProject}>
          Participar de um novo Projeto
        </Link>
      </div>
      <div className={style.container__table}>
        <div className={style.container__table_header}>
          <p>Filtro</p>
          <div className={style.input__search}>
            <Pesquisa className={style.icon} />
            <input
              type="text"
              placeholder="Procure por projeto"
              value={textPesquisa}
              onChange={(e) => setTextPesquisa(e.target.value)}
            />
          </div>
          <SelectSimple
            value={filtro}
            onChange={(valor: string) => setFiltro(valor)}
          />
        </div>

        <div className={style.container__table_body}>
          {paginatedItems.length === 0 ? (
            <p className={style.alertMensage}>
             Ops! Não encontramos nenhum projeto.
            </p>
          ) : (
            paginatedItems.map((item) => (
              <div
                key={item.id}
                className={style.card}
                onClick={() => setIsModalOpen(true)}
              >
                <div className={style.card__title}>
                  <div className={style.card__title_tag}>
                    <p>{item.status}</p>
                  </div>
                  <h1>{item.nome}</h1>
                </div>
                <div className={style.card__descricao}>
                  <p>{item.descricao}</p>
                </div>
                <div className={style.card__location}>
                  <Localizacao className={style.icon} />
                  <p>{`${item.ong.endereco.cidade} - ${item.ong.endereco.estado}`}</p>
                </div>
                <div className={style.habilidades}>
                  {item.habilidades.slice(0, 3).map((hab, i) => (
                    <div key={i} className={style.badge}>
                      <p>{hab.descricao}</p>
                    </div>
                  ))}

                  {item.habilidades.length > 3 && (
                    <div className={style.badge}>
                      <p>+{item.habilidades.length - 3}</p>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <div className={style.container__table_footer}>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(projetosFiltrados.length / itemsPerPage)}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </>
  );
}

export default HomeVoluntario;
