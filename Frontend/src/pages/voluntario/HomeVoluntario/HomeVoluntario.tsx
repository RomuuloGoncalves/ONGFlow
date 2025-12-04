import Header from "@/components/Voluntario/Header/Header";
import style from "./HomeVoluntario.module.css";
import { useState, useEffect } from "react";
import { Pagination } from "@/components/Pagination/Pagination";
import { Pesquisa } from "@/assets/icons/Pesquisa";
import { Localizacao } from "@/assets/icons/Localizacao";
import ModalVoluntario from "@/modals/Voluntarios/VoluntarioHome/modalVoluntarioHome";
import { Link } from "react-router-dom";
import voluntarioService from "@/services/voluntarioService";
import type { Projeto } from "@/interfaces/projeto";
import Loading from "@/components/Loading/Loading";

function HomeVoluntario() {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [textPesquisa, setTextPesquisa] = useState("");
  const [filtro, setFiltro] = useState("Todos");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjeto, setSelectedProjeto] = useState<Projeto | null>(null);
  
  const itemsPerPage = 4;

  useEffect(() => {
    async function fetchProjetos() {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user && user.id) {
        try {
          const response = await voluntarioService.getProjetos(user.id);
          setProjetos(response.data);
        } catch (error) {
          console.error("Erro ao buscar projetos:", error);
        } finally {
          setIsLoading(false);
        }
      }
    }
    fetchProjetos();
  }, []);
  
  useEffect(() => {
    setCurrentPage(1);
  }, [filtro, textPesquisa]);

  const handleCardClick = (projeto: Projeto) => {
    setSelectedProjeto(projeto);
    setIsModalOpen(true);
  };

  // Aplica filtro por status e pesquisa
  const projetosFiltrados = projetos.filter((p) => {
    const pesquisa = textPesquisa.toLowerCase();
    const statusValido = filtro === "Todos" || p.status === filtro;
    const pesquisaValida =
      p.nome.toLowerCase().includes(pesquisa) ||
      (p.ong?.endereco?.cidade &&
        p.ong.endereco.cidade.toLowerCase().includes(pesquisa));
    return statusValido && pesquisaValida;
  });

  // Paginação
  const start = (currentPage - 1) * itemsPerPage;
  const paginatedItems = projetosFiltrados.slice(start, start + itemsPerPage);

  return (
    <>
      <ModalVoluntario isOpen={isModalOpen} setIsOpen={setIsModalOpen} projeto={selectedProjeto}/>
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
          <div className={style.search}>
            <Pesquisa />
            <input
              type="text"
              className={style.search}
              placeholder="Filtrar por ONG ou projeto"
              value={textPesquisa}
              onChange={(e) => setTextPesquisa(e.target.value)}
            />
          </div>
          <div className={style.container__tags}>
            <button
              onClick={() => setFiltro("Todos")}
              className={`${style.button} ${
                filtro === "Todos" ? style.active : ""
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFiltro("ativo")}
              className={`${style.button} ${
                filtro === "ativo" ? style.active : ""
              }`}
            >
              Ativos
            </button>
            <button
              onClick={() => setFiltro("finalizado")}
              className={`${style.button} ${
                filtro === "finalizado" ? style.active : ""
              }`}
            >
              Finalizados
            </button>
            <button
              onClick={() => setFiltro("cancelado")}
              className={`${style.button} ${
                filtro === "cancelado" ? style.active : ""
              }`}
            >
              Cancelados
            </button>
          </div>
        </div>

        {isLoading ? (
          <Loading />
        ) : (
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
                  onClick={() => handleCardClick(item)}
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
                    <p>
                      {item.ong?.endereco
                        ? `${item.ong.endereco.cidade} - ${item.ong.endereco.estado}`
                        : "Localização não informada"}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

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