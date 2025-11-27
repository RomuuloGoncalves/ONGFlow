import Header from "@/components/Voluntario/Header/Header";
import style from "./ConviteVoluntario.module.css";
import { Pesquisa } from "@/assets/icons/Pesquisa";
import { Pagination } from "@/components/Pagination/Pagination";
import { Localizacao } from "@/assets/icons/Localizacao";
import { Telefone } from "@/assets/icons/Telefone";
import { Usuario } from "@/assets/icons/Usuario";
import { useState, useEffect } from "react";
import { Relogio } from "@/assets/icons/Relogio";
import { Check } from "@/assets/icons/Check";
import { Lixo } from "@/assets/icons/Lixo";
import { getConvitesVoluntario, aceitarConvite, recusarConvite } from "@/services/conviteService";
import type { Convite } from "@/interfaces/convite";
import Loading from "@/components/Loading/Loading";

function ConviteVoluntario() {
  const [convites, setConvites] = useState<Convite[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filtro, setFiltro] = useState("Todos");
  const [textPesquisa, setTextPesquisa] = useState("");

  const itemsPerPage = 6;

  useEffect(() => {
    async function fetchConvites() {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user && user.id) {
        try {
          const response = await getConvitesVoluntario(user.id);
          setConvites(response.data);
        } catch (error) {
          console.error("Erro ao buscar convites:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    }
    fetchConvites();
  }, []);

  const convitesFiltrados = convites.filter((c) => {
    if (!c.projeto) {
      return false;
    }
    const pesquisa = textPesquisa.toLocaleLowerCase();
    const statusValido = filtro === "Todos" || c.status === filtro;
    const pesquisaValida =
      c.projeto.nome.toLowerCase().includes(pesquisa) ||
      (c.projeto.ong?.nome_fantasia.toLowerCase().includes(pesquisa) ?? false);

    return statusValido && pesquisaValida;
  });

  const handleAceitarConvite = async (id: number) => {
    try {
      await aceitarConvite(id);
      setConvites((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: "aceito" } : c))
      );
    } catch (error) {
      console.error("Erro ao aceitar convite", error);
    }
  };
  const handleRecusarConvite = async (id: number) => {
    try {
      await recusarConvite(id);
      setConvites((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: "recusado" } : c))
      );
    } catch (error) {
      console.error("Erro ao aceitar convite", error);
    }
  };

  // Reseta página ao mudar filtro ou pesquisa
  useEffect(() => {
    setCurrentPage(1);
  }, [filtro, textPesquisa]);

  const start = (currentPage - 1) * itemsPerPage;
  const paginatedItems = convitesFiltrados.slice(start, start + itemsPerPage);

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
              onClick={() => setFiltro("pendente")}
              className={`${style.button} ${
                filtro === "pendente" ? style.active : ""
              }`}
            >
              Pendentes
            </button>
            <button
              onClick={() => setFiltro("aceito")}
              className={`${style.button} ${
                filtro === "aceito" ? style.active : ""
              }`}
            >
              Aceitos
            </button>
            <button
              onClick={() => setFiltro("recusado")}
              className={`${style.button} ${
                filtro === "recusado" ? style.active : ""
              }`}
            >
              Recusados
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
                Ops! Não encontramos nenhum convite.
              </p>
            ) : (
              paginatedItems.map((item) => (
                <div key={item.id} className={style.card}>
                  <div className={style.card__title}>
                    <div className={style.card__title_tag}>
                      <p>{item.status}</p>
                    </div>
                    <h1>{item.projeto?.nome}</h1>
                  </div>
                  <div className={style.card__descricao}>
                    <p>{item.projeto?.descricao}</p>
                  </div>
                  <div className={style.habilidades}>
                    {(item.projeto?.habilidades || []).map((hab, i) => (
                      <div key={i} className={style.badge} title={hab.descricao}>
                        <p>{hab.descricao}</p>
                      </div>
                    ))}
                  </div>
                  <div className={style.container__details}>
                    <div className={style.card__location_date}>
                      <p>
                        <Localizacao className={style.icon} />
                        {item.projeto?.ong?.endereco
                          ? `${item.projeto.ong.endereco.cidade} - ${item.projeto.ong.endereco.estado}`
                          : "Localização não disponível"}
                      </p>
                      <p>
                        <Relogio className={style.icon} />
                        {new Date(item.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className={style.card__ong_phone}>
                      <p>
                        <Usuario className={style.icon} />
                        {item.projeto?.ong?.nome_fantasia}
                      </p>
                      <p>
                        <Telefone className={style.icon} />
                        {item.projeto?.ong?.telefone
                          ? item.projeto.ong.telefone
                          : "Telefone não disponível"}
                      </p>
                    </div>
                  </div>
                  <div
                    className={style.container__buttons}
                    style={{
                      display:
                        item.iniciador.toLocaleLowerCase() === "ong" &&
                        item.status.toLocaleLowerCase() === "pendente"
                          ? "flex"
                          : "none",
                    }}
                  >
                    <button
                      className={`${style.button} ${style.buttonAccept}`}
                      onClick={() => handleAceitarConvite(item.id)}
                    >
                      <Check className={style.icon} /> Aceitar
                    </button>
                    <button
                      className={`${style.button} ${style.buttonDecline}`}
                      onClick={() => handleRecusarConvite(item.id)}
                    >
                      <Lixo className={style.icon} /> Recusar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        <div className={style.container__table_footer}>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(convitesFiltrados.length / itemsPerPage)}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </>
  );
}

export default ConviteVoluntario;
