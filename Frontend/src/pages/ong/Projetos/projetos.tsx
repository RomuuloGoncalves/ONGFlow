import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./projetos.module.css";
import Header from "@/components/Ong/Header/Header";
import ModalProjetosFinalizados from "@/modals/ONG/ProjetosFinalizados/modalProjetosFinalizados";
import ModalProjetosAndamento from "@/modals/ONG/ProjetosAndamento/modalProjetosAndamento";
import { ProjetosIcone } from "@/assets/icons/ProjetosIcone";
import { Check } from "@/assets/icons/Check";
import { Usuario } from "@/assets/icons/Usuario";
import { Pesquisa } from "@/assets/icons/Pesquisa";
import Loading from "@/components/Loading/Loading";
import { Localizacao } from "@/assets/icons/Localizacao";
import { Pagination } from "@/components/Pagination/Pagination";
import { Mais } from "@/assets/icons/Mais";

interface Projeto {
  id: number;
  nome: string;
  descricao: string;
  status: "andamento" | "finalizado";
  telefone: string;
  habilidades: { descricao: string }[];
  ong?: {
    endereco?: {
      cidade: string;
      estado: string;
    };
  };
}

function Projetos() {
  const [isModalProjetosFinalizadosOpen, setIsModalProjetosFinalizadosOpen] =
    useState(false);
  const [isModalProjetosAndamentoOpen, setIsModalProjetosAndamentoOpen] =
    useState(false);
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [textPesquisa, setTextPesquisa] = useState("");
  const [filtro, setFiltro] = useState("Todos");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;

  // --- Simulação de listagem fake ---
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setProjetos([
        {
          id: 1,
          nome: "Educa Jovem",
          descricao:
            "Projeto educacional voltado ao reforço escolar em comunidades.",
          status: "andamento",
          telefone: "(11) 90000-0001",
          habilidades: [{ descricao: "Ensino" }, { descricao: "Empatia" }],
          ong: { endereco: { cidade: "São Paulo", estado: "SP" } },
        },
        {
          id: 2,
          nome: "Verde Futuro",
          descricao: "Ações ambientais e de reflorestamento urbano.",
          status: "finalizado",
          telefone: "(21) 91111-1111",
          habilidades: [
            { descricao: "Sustentabilidade" },
            { descricao: "Organização" },
          ],
          ong: { endereco: { cidade: "Rio de Janeiro", estado: "RJ" } },
        },
        {
          id: 3,
          nome: "Saúde em Ação",
          descricao:
            "Campanhas de prevenção e atendimento básico à saúde.",
          status: "andamento",
          telefone: "(31) 92222-2222",
          habilidades: [
            { descricao: "Comunicação" },
            { descricao: "Empatia" },
          ],
          ong: { endereco: { cidade: "Belo Horizonte", estado: "MG" } },
        },
        {
          id: 4,
          nome: "Tech Solidário",
          descricao:
            "Oficinas de tecnologia para jovens em situação de vulnerabilidade.",
          status: "andamento",
          telefone: "(41) 93333-3333",
          habilidades: [
            { descricao: "React" },
            { descricao: "Lógica de Programação" },
          ],
          ong: { endereco: { cidade: "Curitiba", estado: "PR" } },
        },
        {
          id: 5,
          nome: "Alimente Esperança",
          descricao: "Distribuição de cestas básicas e combate à fome.",
          status: "finalizado",
          telefone: "(85) 94444-4444",
          habilidades: [
            { descricao: "Logística" },
            { descricao: "Empatia" },
          ],
          ong: { endereco: { cidade: "Fortaleza", estado: "CE" } },
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  // --- Filtro + busca ---
  const projetosFiltrados = projetos.filter((p) => {
    const nomeMatch = p.nome.toLowerCase().includes(textPesquisa.toLowerCase());
    const statusMatch =
      filtro === "Todos"
        ? true
        : p.status.toLowerCase() === filtro.toLowerCase();
    return nomeMatch && statusMatch;
  });

  // --- Paginação ---
  const start = (currentPage - 1) * itemsPerPage;
  const paginatedItems = projetosFiltrados.slice(start, start + itemsPerPage);

  // --- Ações ---
  const handleCardClick = (projeto: Projeto) => {
    if (projeto.status === "finalizado") {
      setIsModalProjetosFinalizadosOpen(true);
    } else {
      setIsModalProjetosAndamentoOpen(true);
    }
  };
  return (
    <>
      <div className={style.main}>
        <Header />

        <div className={style.projetos}>
          <div className={style.projetos__title}>
            <h1>Lista de Projetos</h1>

            <div className={style.stats}>
              <div className={style.projetos__ativos}>
                <ProjetosIcone className={style.icon} />
                <div className={style.text}>
                  <p>Projetos Ativos</p>
                  <span>
                    {projetos.filter((p) => p.status === "andamento").length}
                  </span>
                </div>
              </div>

              <div className={style.projetos__finalizados}>
                <Check className={style.icon} />
                <div className={style.text}>
                  <p>Projetos Finalizados</p>
                  <span>
                    {projetos.filter((p) => p.status === "finalizado").length}
                  </span>
                </div>
              </div>

              <div className={style.voluntario__ativos}>
                <Usuario className={style.icon} />
                <div className={style.text}>
                  <p>Total de Projetos</p>
                  <span>{projetos.length}</span>
                </div>
              </div>
            </div>
          </div>

          <div className={style.container__table}>
            <div className={style.container__table_header}>
              <div className={style.search}>
                <Pesquisa />
                <input
                  type="text"
                  placeholder="Filtrar por nome"
                  value={textPesquisa}
                  onChange={(e) => setTextPesquisa(e.target.value)}
                />
                <div className={style.container__criar_projeto}>
                  <Link
                    className={style.buttonCriarProjeto}
                    to = "/criar/projeto/ong"
                  >
                    <Mais className={style.icon} />
                  </Link>
                </div>
              </div>

              <div className={style.container__tags}>
                {["Todos", "andamento", "finalizado"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setFiltro(tag);
                      setCurrentPage(1);
                    }}
                    className={`${style.button} ${
                      filtro === tag ? style.active : ""
                    }`}
                  >
                    {tag.charAt(0).toUpperCase() + tag.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {isLoading ? (
              <Loading />
            ) : (
              <div className={style.container__table_body}>
                {paginatedItems.length === 0 ? (
                  <p className={style.alertMensage}>
                    Ops! Nenhum projeto encontrado.
                  </p>
                ) : (
                  paginatedItems.map((p) => (
                    <div
                      key={p.id}
                      className={style.card}
                      onClick={() => handleCardClick(p)}
                    >
                      <div className={style.card__title}>
                        <div className={style.card__title_tag}>
                          <p>{p.status}</p>
                        </div>
                        <h1>{p.nome}</h1>
                      </div>

                      <div className={style.card__descricao}>
                        <p>{p.descricao}</p>
                      </div>

                      <div className={style.card__location}>
                        <Localizacao className={style.icon} />
                        <p>
                          {p.ong?.endereco
                            ? `${p.ong.endereco.cidade} - ${p.ong.endereco.estado}`
                            : "Localização não informada"}
                        </p>
                      </div>

                      <div className={style.habilidades}>
                        {(p.habilidades || [])
                          .slice(0, 3)
                          .map((hab, i) => (
                            <div key={i} className={style.badge}>
                              <p>{hab.descricao}</p>
                            </div>
                          ))}
                        {(p.habilidades?.length || 0) > 3 && (
                          <div className={style.badge}>
                            <p>+{(p.habilidades?.length || 0) - 3}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            <div className={style.container__table_footer}>
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(
                  projetosFiltrados.length / itemsPerPage
                )}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        </div>
      </div>

      <ModalProjetosFinalizados
        isOpen={isModalProjetosFinalizadosOpen}
        setIsOpen={setIsModalProjetosFinalizadosOpen}
      />
      <ModalProjetosAndamento
        isOpen={isModalProjetosAndamentoOpen}
        setIsOpen={setIsModalProjetosAndamentoOpen}
      />
    </>
  );
}

export default Projetos;
