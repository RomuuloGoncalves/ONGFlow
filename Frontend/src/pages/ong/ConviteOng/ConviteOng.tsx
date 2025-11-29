import Header from "@/components/Ong/Header/Header";
import style from "./ConviteOng.module.css";
import { Pagination } from "@/components/Pagination/Pagination";
import { Lixo } from "@/assets/icons/Lixo";
import { Check } from "@/assets/icons/Check";
import { Telefone } from "@/assets/icons/Telefone";
import { Usuario } from "@/assets/icons/Usuario";
import { Relogio } from "@/assets/icons/Relogio";
import { getCandidaturasOng, aceitarConvite, recusarConvite } from "@/services/conviteService";
import Loading from "@/components/Loading/Loading";
import { Pesquisa } from "@/assets/icons/Pesquisa";
import { useState, useEffect } from "react";
import type { Convite } from "@/interfaces/convite";

function ConviteOng() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [textPesquisa, setTextPesquisa] = useState("");
  const [candidaturas, setCandidaturas] = useState<Convite[]>([]);

  const itemsPerPage = 6;

  useEffect(() => {
    async function fetchCandidaturas() {
      try {
        const response = await getCandidaturasOng();
        setCandidaturas(response.data);
      } catch (error) {
        console.error("Erro ao buscar candidaturas:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCandidaturas();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [textPesquisa]);

  const handleAceitar = async (id: number) => {
    try {
      await aceitarConvite(id);
      setCandidaturas(candidaturas.filter(c => c.id !== id));
    } catch (error) {
      console.error("Erro ao aceitar candidatura:", error);
    }
  };

  const handleRecusar = async (id: number) => {
    try {
      await recusarConvite(id);
      setCandidaturas(candidaturas.filter(c => c.id !== id));
    } catch (error) {
      console.error("Erro ao recusar candidatura:", error);
    }
  };

  const candidaturasFiltradas = candidaturas.filter((c) => {
    if (!c.projeto || !c.voluntario) return false;
    const pesquisa = textPesquisa.toLowerCase();
    return (
      c.projeto.nome.toLowerCase().includes(pesquisa) ||
      c.voluntario.nome.toLowerCase().includes(pesquisa)
    );
  });

  const start = (currentPage - 1) * itemsPerPage;
  const paginatedItems = candidaturasFiltradas.slice(start, start + itemsPerPage);

  return (
    <div className={style.main}>
      <Header />
      <div className={style.convite}>
        <div className={style.convite__title}>
          <h1>Candidaturas Recebidas</h1>
          <p>
            Acompanhe os voluntários que se candidataram aos seus projetos.
            Aceite ou recuse as candidaturas para formar sua equipe.
          </p>
        </div>
        <div className={style.container__table}>
          <div className={style.container__table_header}>
            <div className={style.search}>
              <Pesquisa />
              <input
                type="text"
                className={style.search}
                placeholder="Filtrar por voluntário ou projeto"
                value={textPesquisa}
                onChange={(e) => setTextPesquisa(e.target.value)}
              />
            </div>
          </div>
          {isLoading ? (
            <Loading />
          ) : (
            <div className={style.container__table_body}>
              {paginatedItems.length === 0 ? (
                <p className={style.alertMensage}>
                  Nenhuma candidatura recebida até o momento.
                </p>
              ) : (
                paginatedItems.map((item) => (
                  <div key={item.id} className={style.card}>
                    <div className={style.card__title}>
                      <h1>{item.projeto?.nome}</h1>
                    </div>
                    <div className={style.card__descricao}>
                      <p>{item.mensagem}</p>
                    </div>
                    <div className={style.container__details}>
                      <div className={style.card__location_date}>
                        <p>
                          <Usuario className={style.icon} />
                          {item.voluntario?.nome}
                        </p>
                        <p>
                          <Relogio className={style.icon} />
                          {new Date(item.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className={style.card__ong_phone}>
                        <p>
                          <Telefone className={style.icon} />
                          {item.voluntario?.telefone ?? "Não informado"}
                        </p>
                      </div>
                    </div>
                    <div className={style.habilidades}>
                      {(item.voluntario?.habilidades || []).map((hab, i) => (
                        <div key={i} className={style.badge} title={hab.descricao}>
                          <p>{hab.descricao}</p>
                        </div>
                      ))}
                    </div>
                    <div className={style.container__buttons}>
                      <button
                        className={`${style.button} ${style.buttonAccept}`}
                        onClick={() => handleAceitar(item.id)}
                      >
                        <Check className={style.icon} /> Aceitar
                      </button>
                      <button
                        className={`${style.button} ${style.buttonDecline}`}
                        onClick={() => handleRecusar(item.id)}
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
              totalPages={Math.ceil(candidaturasFiltradas.length / itemsPerPage)}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConviteOng;
