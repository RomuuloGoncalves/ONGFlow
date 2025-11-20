import Header from "@/components/Voluntario/Header/Header";
import style from "./ProjetosDisponiveis.module.css";
import { useEffect, useState } from "react";
import { Pagination } from "@/components/Pagination/Pagination";
import { Pesquisa } from "@/assets/icons/Pesquisa";
import { Localizacao } from "@/assets/icons/Localizacao";
import { Convite } from "@/assets/icons/Convite";
import ModalVoluntarioProjetos from "@/modals/Voluntarios/VoluntarioProjetos/modalVoluntarioProjetos";
import projetoService from "@/services/projetoService";
import type { Projeto } from "@/interfaces/projeto";

function HomeVoluntario() {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [textPesquisa, setTextPesquisa] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjeto, setSelectedProjeto] = useState<Projeto | null>(null);

  useEffect(() => {
    projetoService.getProjetos()
      .then(response => {
        setProjetos(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar projetos:', error);
      });
  }, []);

  const itemsPerPage = 4;

  const projetosFiltrados = projetos.filter((p) => {
    const pesquisa = textPesquisa.toLowerCase();
    const localizacao = p.ong?.endereco ? `${p.ong.endereco.cidade} - ${p.ong.endereco.estado}`.toLowerCase() : '';
    return (
      p.nome.toLowerCase().includes(pesquisa) ||
      localizacao.includes(pesquisa)
    );
  });

  const start = (currentPage - 1) * itemsPerPage;
  const paginatedItems = projetosFiltrados.slice(start, start + itemsPerPage);

  const handleCardClick = (projeto: Projeto) => {
    setSelectedProjeto(projeto);
    setIsModalOpen(true);
  };

  return (
    <>
      <ModalVoluntarioProjetos
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        projeto={selectedProjeto}
      />
      <Header />
      <div className={style.container__title}>
        <h1>Projetos Disponíveis</h1>
        <p>
          Nesta área, você encontrará os projetos das ONGs que podes candidatar.
          Aqui serão exibidas todas os projetos em que você pode se candidatar
        </p>
      </div>
      <div className={style.container__table}>
        <div className={style.container__table_header}>
          <p>Filtro</p>
          <div className={style.input__search}>
            <Pesquisa className={style.icon} />
            <input
              type="text"
              placeholder="Procure por projeto ou localizacao"
              value={textPesquisa}
              onChange={(e) => setTextPesquisa(e.target.value)}
            />
          </div>
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
                onClick={() => handleCardClick(item)}
              >
                <div className={style.card__title}>
                  <h1>{item.nome}</h1>
                </div>
                <div className={style.card__descricao}>
                  <p>{item.descricao}</p>
                </div>
                {item.ong?.endereco && (
                  <div className={style.card__location}>
                    <Localizacao className={style.icon} />
                    <p>{`${item.ong.endereco.cidade} - ${item.ong.endereco.estado}`}</p>
                  </div>
                )}
                <div className={style.habilidades}>
                  {item.habilidades && (
                    <>
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
                    </>
                  )}
                </div>
                <div className={style.buttonInvite}>
                  <button>
                    <Convite className={style.icon} />
                    Candidatar
                  </button>
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
