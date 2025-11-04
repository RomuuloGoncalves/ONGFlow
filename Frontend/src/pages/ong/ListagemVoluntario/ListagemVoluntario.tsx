import Header from "@/components/Ong/Header/Header";
import style from "./ListagemVoluntario.module.css";
import { useState, useEffect } from "react";
import ModalExibirVoluntario from "@/modals/ONG/ExibirVoluntario/modalExibirVoluntario";
import { Projetos } from "@/assets/icons/Projetos";
import { Usuario } from "@/assets/icons/Usuario";
import { Pagination } from "@/components/Pagination/Pagination";
import { Pesquisa } from "@/assets/icons/Pesquisa";
import Loading from "@/components/Loading/Loading";
import { Localizacao } from "@/assets/icons/Localizacao";
import { Telefone } from "@/assets/icons/Telefone";

interface Voluntario {
  id: number;
  nome: string;
  descricao: string;
  status: string;
  telefone: string;
  habilidades: { descricao: string }[];
  ong?: {
    endereco?: {
      cidade: string;
      estado: string;
    };
  };
}

function ListagemVoluntario() {
  const [isModalExibirOpen, setIsModalExibirOpen] = useState(false);
  const [voluntarios, setVoluntarios] = useState<Voluntario[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [textPesquisa, setTextPesquisa] = useState("");
  const [filtro, setFiltro] = useState("Todos");

  const itemsPerPage = 4;

  // Dados fictícios
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setVoluntarios([
        {
          id: 1,
          nome: "Lucas Nogueira",
          descricao: "Desenvolvedor Front-end com interesse em UI/UX.",
          status: "aceito",
          telefone: "(11) 91234-5678",
          habilidades: [
            { descricao: "React.js" },
            { descricao: "Figma" },
            { descricao: "CSS" },
          ],
          ong: { endereco: { cidade: "São Paulo", estado: "SP" } },
        },
        {
          id: 2,
          nome: "Mariana Silva",
          descricao: "Estudante de engenharia e apaixonada por voluntariado.",
          status: "pendente",
          telefone: "(21) 99876-5432",
          habilidades: [
            { descricao: "Comunicação" },
            { descricao: "Organização" },
          ],
          ong: { endereco: { cidade: "Rio de Janeiro", estado: "RJ" } },
        },
        {
          id: 3,
          nome: "Pedro Almeida",
          descricao: "Voluntário experiente em projetos sociais e esportivos.",
          status: "andamento",
          telefone: "(31) 97777-2233",
          habilidades: [
            { descricao: "Gestão" },
            { descricao: "Trabalho em equipe" },
          ],
          ong: { endereco: { cidade: "Belo Horizonte", estado: "MG" } },
        },
        {
          id: 4,
          nome: "Ana Clara",
          descricao: "Professora de inglês e voluntária em ONGs educacionais.",
          status: "concluido",
          telefone: "(41) 95555-3322",
          habilidades: [
            { descricao: "Inglês" },
            { descricao: "Ensino" },
            { descricao: "Empatia" },
          ],
          ong: { endereco: { cidade: "Curitiba", estado: "PR" } },
        },
        {
          id: 5,
          nome: "João Victor",
          descricao: "Designer e ilustrador com foco em causas sociais.",
          status: "aceito",
          telefone: "(85) 96666-7788",
          habilidades: [
            { descricao: "Design Gráfico" },
            { descricao: "Photoshop" },
            { descricao: "Ilustração" },
            { descricao: "Criatividade" },
          ],
          ong: { endereco: { cidade: "Fortaleza", estado: "CE" } },
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const voluntariosFiltrados = voluntarios.filter((v) => {
    const nomeMatch = v.nome.toLowerCase().includes(textPesquisa.toLowerCase());
    const statusMatch =
      filtro === "Todos" ? true : v.status.toLowerCase() === filtro.toLowerCase();
    return nomeMatch && statusMatch;
  });

  const start = (currentPage - 1) * itemsPerPage;
  const paginatedItems = voluntariosFiltrados.slice(start, start + itemsPerPage);

  return (
    <div className={style.main}>
      <Header />
      <div className={style.listagem__voluntario}>
        <div className={style.listagem__voluntario_title}>
          <h1>Lista de Voluntários</h1>
          <div className={style.stats}>
            <div className={style.voluntario__ativo}>
              <Projetos className={style.icon} />
              <div className={style.text}>
                <p>Voluntários Ativos</p>
                <span>
                  {voluntarios.filter((v) => v.status === "aceito").length}
                </span>
              </div>
            </div>
            <div className={style.voluntario__cadastrado}>
              <Usuario className={style.icon} />
              <div className={style.text}>
                <p>Voluntários Cadastrados</p>
                <span>{voluntarios.length}</span>
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
                className={style.search}
                placeholder="Filtrar por nome"
                value={textPesquisa}
                onChange={(e) => setTextPesquisa(e.target.value)}
              />
            </div>
            <div className={style.container__tags}>
              {["Todos", "ativo", "disponivel"].map(
                (tag) => (
                  <button
                    key={tag}
                    onClick={() => setFiltro(tag)}
                    className={`${style.button} ${
                      filtro === tag ? style.active : ""
                    }`}
                  >
                    {tag.charAt(0).toUpperCase() + tag.slice(1)}
                  </button>
                )
              )}
            </div>
          </div>

          {isLoading ? (
            <Loading />
          ) : (
            <div className={style.container__table_body}>
              {paginatedItems.length === 0 ? (
                <p className={style.alertMensage}>
                  Ops! Não encontramos nenhum voluntário.
                </p>
              ) : (
                paginatedItems.map((v) => (
                  <div
                    key={v.id}
                    className={style.card}
                    onClick={() => setIsModalExibirOpen(true)}
                  >
                    <div className={style.card__title}>
                      <div className={style.card__title_tag}>
                        <p>{v.status}</p>
                      </div>
                      <h1>{v.nome}</h1>
                    </div>

                    <div className={style.card__descricao}>
                      <p>{v.descricao}</p>
                    </div>

                    {/* Localização */}
                    <div className={style.card__location}>
                      <Localizacao className={style.icon} />
                      <p>
                        {v.ong?.endereco
                          ? `${v.ong.endereco.cidade} - ${v.ong.endereco.estado}`
                          : "Localização não informada"}
                      </p>
                    </div>

                    {/* Telefone */}
                    <div className={style.card__telefone}>
                      <Telefone className={style.icon} />
                      <p>{v.telefone}</p>
                    </div>

                    {/* Habilidades */}
                    <div className={style.habilidades}>
                      {(v.habilidades || []).slice(0, 3).map((hab, i) => (
                        <div key={i} className={style.badge}>
                          <p>{hab.descricao}</p>
                        </div>
                      ))}

                      {(v.habilidades?.length || 0) > 3 && (
                        <div className={style.badge}>
                          <p>+{(v.habilidades?.length || 0) - 3}</p>
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
              totalPages={Math.ceil(voluntariosFiltrados.length / itemsPerPage)}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>

      <ModalExibirVoluntario
        isOpen={isModalExibirOpen}
        setIsOpen={setIsModalExibirOpen}
      />
    </div>
  );
}

export default ListagemVoluntario;