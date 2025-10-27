import Header from "@/components/Ong/Header/Header";
import style from "./ConviteOng.module.css";
import { Pagination } from "@/components/Pagination/Pagination";
import { Lixo } from "@/assets/icons/Lixo";
import { Check } from "@/assets/icons/Check";
import { Telefone } from "@/assets/icons/Telefone";
import { Usuario } from "@/assets/icons/Usuario";
import { Relogio } from "@/assets/icons/Relogio";
import { Localizacao } from "@/assets/icons/Localizacao";
import Loading from "@/components/Loading/Loading";
import { Pesquisa } from "@/assets/icons/Pesquisa";
import { useState, useEffect } from "react";

// Dados Falsos - Retirar quando fizer a integração
const mockConvites = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  status: ["pendente", "aceito", "recusado", "solicitacao"][i % 4],
  iniciador: i % 2 === 0 ? "voluntario" : "ong",
  created_at: new Date().toISOString(),
  projeto: {
    nome: `Projeto ${i + 1}`,
    descricao: `Descrição do Projeto ${i + 1}`,
    ong: {
      nome_fantasia: `ONG ${i + 1}`,
      telefone: `(11) 9${i}000-000${i}`,
      endereco: {
        cidade: `Cidade ${i + 1}`,
        estado: "SP",
      },
    },
  },
}));

function ConviteOng() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filtro, setFiltro] = useState("Todos");
  const [textPesquisa, setTextPesquisa] = useState("");
  const [convites, setConvites] = useState(mockConvites);

  const itemsPerPage = 6;

  // Simula carregamento
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Reseta página ao mudar filtro ou pesquisa
  useEffect(() => {
    setCurrentPage(1);
  }, [filtro, textPesquisa]);

  const convitesFiltrados = convites.filter((c) => {
    if (!c.projeto) return false;
    const pesquisa = textPesquisa.toLowerCase();
    const statusValido = filtro === "Todos" || c.status === filtro;
    const pesquisaValida =
      c.projeto.nome.toLowerCase().includes(pesquisa) ||
      (c.projeto.ong?.nome_fantasia.toLowerCase().includes(pesquisa) ?? false);
    return statusValido && pesquisaValida;
  });

  const start = (currentPage - 1) * itemsPerPage;
  const paginatedItems = convitesFiltrados.slice(start, start + itemsPerPage);

  return (
    <div className={style.main}>
      <Header />
      <div className={style.convite}>
        <div className={style.convite__title}>
          <h1>Convites</h1>
          <p>
            Envie convites e descubra quem está pronto para se juntar a você.
            Acompanhe as respostas, veja quem aceitou e forme sua equipe ideal.
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
              {["Todos", "pendente", "aceito", "recusado", "solicitações"].map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => setFiltro(status)}
                    className={`${style.button} ${
                      filtro === status ? style.active : ""
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
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
                          item.iniciador.toLowerCase() === "voluntario" &&
                          item.status.toLowerCase() === "solicitacao"
                            ? "flex"
                            : "none",
                      }}
                    >
                      <button
                        className={`${style.button} ${style.buttonAccept}`}
                      >
                        <Check className={style.icon} /> Aceitar
                      </button>
                      <button
                        className={`${style.button} ${style.buttonDecline}`}
                      >
                        <Lixo className={style.icon} /> Recusar
                      </button>
                    </div>
                                        <div
                      className={style.container__buttons}
                      style={{
                        display:
                          item.iniciador.toLowerCase() === "voluntario" &&
                          item.status.toLowerCase() === "solicitacao"
                            ? "flex"
                            : "none",
                      }}
                    >
                      <button
                        className={`${style.button} ${style.buttonAccept}`}
                      >
                        <Check className={style.icon} /> Aceitar
                      </button>
                      <button
                        className={`${style.button} ${style.buttonDecline}`}
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
      </div>
    </div>
  );
}

export default ConviteOng;
