import Header from "@/components/Ong/Header/Header";
import style from "./ListagemVoluntario.module.css";
import { useState, useEffect } from "react";
import ModalExibirVoluntario from "@/modals/ONG/ExibirVoluntario/modalExibirVoluntario";
import { ProjetosIcone } from "@/assets/icons/ProjetosIcone";
import { Usuario } from "@/assets/icons/Usuario";
import { Pagination } from "@/components/Pagination/Pagination";
import { Pesquisa } from "@/assets/icons/Pesquisa";
import Loading from "@/components/Loading/Loading";
import { Localizacao } from "@/assets/icons/Localizacao";
import { Telefone } from "@/assets/icons/Telefone";
import api from "@/services/api";
import useCustomToast from "@/components/ui/use-toast";

interface Voluntario {
  id: number;
  nome: string;
  bio: string;
  status: string;
  telefone: string;
  habilidades: { descricao: string }[];
  endereco?: {
    cidade: string;
    estado: string;
  };
}

function ListagemVoluntario() {
  const [isModalExibirOpen, setIsModalExibirOpen] = useState(false);
  const [voluntarios, setVoluntarios] = useState<Voluntario[]>([]);
  const [voluntarioSelecionado, setVoluntarioSelecionado] =
    useState<Voluntario | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [textPesquisa, setTextPesquisa] = useState("");
  const [filtro, setFiltro] = useState("Todos");

  const { showToast } = useCustomToast();
  const itemsPerPage = 4;

  const handleOpenModal = (voluntario: Voluntario) => {
    setVoluntarioSelecionado(voluntario);
    setIsModalExibirOpen(true);
  };

  useEffect(() => {
    const fetchVoluntarios = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/voluntarios");
        setVoluntarios(response.data || []);
      } catch (error) {
        showToast("Erro ao carregar os voluntários.", "error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchVoluntarios();
  }, [showToast]);

  const voluntariosFiltrados = voluntarios.filter((v) => {
    const nomeMatch = v.nome.toLowerCase().includes(textPesquisa.toLowerCase());
    const statusMatch =
      filtro === "Todos"
        ? true
        : v.status.toLowerCase() === filtro.toLowerCase();
    return nomeMatch && statusMatch;
  });

  const start = (currentPage - 1) * itemsPerPage;
  const paginatedItems = voluntariosFiltrados.slice(
    start,
    start + itemsPerPage
  );

  return (
    <div className={style.main}>
      {voluntarioSelecionado && (
        <ModalExibirVoluntario
          isOpen={isModalExibirOpen}
          setIsOpen={setIsModalExibirOpen}
          voluntario={voluntarioSelecionado}
        />
      )}
      <Header />
      <div className={style.listagem__voluntario}>
        <div className={style.listagem__voluntario_title}>
          <h1>Lista de Voluntários</h1>
          <div className={style.stats}>
            <div className={style.voluntario__ativo}>
              <ProjetosIcone className={style.icon} />
              <div className={style.text}>
                <p>Voluntários Ativos</p>
                <span>
                  {voluntarios.filter((v) => v.status === "ativo").length}
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
              {["Todos", "ativo", "inativo"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setFiltro(tag)}
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
                  Ops! Não encontramos nenhum voluntário.
                </p>
              ) : (
                paginatedItems.map((v) => (
                  <div
                    key={v.id}
                    className={style.card}
                    onClick={() => handleOpenModal(v)}
                  >
                    <div className={style.card__title}>
                      <div className={style.card__title_tag}>
                        <p>{v.status}</p>
                      </div>
                      <h1>{v.nome}</h1>
                    </div>

                    <div className={style.card__descricao}>
                      <p>{v.bio}</p>
                    </div>

                    {/* Localização */}
                    <div className={style.card__location}>
                      <Localizacao className={style.icon} />
                      <p>
                        {v.endereco
                          ? `${v.endereco.cidade} - ${v.endereco.estado}`
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
    </div>
  );
}

export default ListagemVoluntario;
