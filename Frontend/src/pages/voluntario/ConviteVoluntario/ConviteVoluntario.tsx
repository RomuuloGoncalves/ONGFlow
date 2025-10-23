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
import ConviteService from "@/services/conviteService";
import type { Convite } from "@/interfaces/convite";
import SelectSimple from "@/components/Voluntario/Select";

function ConviteVoluntario() {
  const [convites, setConvites] = useState<Convite[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filtro, setFiltro] = useState("Todos");
  const [textPesquisa, setTextPesquisa] = useState("");

  useEffect(() => {
    async function fetchConvites() {
      // TODO: Obter o ID do voluntário logado
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      console.log(user)
      if (user && user.id) {
        const response = await ConviteService.getConvitesVoluntario(user.id);
        setConvites(response.data);
      }
    }
    fetchConvites();
  }, []);

  const itemsPerPage = 6;

  // Aplica o filtro
  const convitesFiltrados = convites.filter((c) => {
    if (!c.projeto) {
      return false;
    }
    const pesquisa = textPesquisa.toLocaleLowerCase();
    const statusValido = filtro === "Todos" || c.status === filtro;
    const pesquisaValida =
      c.projeto.nome.toLowerCase().includes(pesquisa) ||
      c.projeto.ong.nome_fantasia.toLowerCase().includes(pesquisa);

    return statusValido && pesquisaValida;
  });

  // funcao aceitar/recusar convite
  const aceitarConvite = async(id: number) => {
    try {
      await ConviteService.aceitarConvite(id);
      setConvites((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: "aceito" } : c))
      );
      
    } catch (error) {
      console.error("Erro ao aceitar convite", error);
    }
  };
  const recusarConvite = async(id: number) => {
    try {
      await ConviteService.recusarConvite(id);
      setConvites((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: "recusado" } : c))
      );
    } catch (error) {
      console.error("Erro ao aceitar convite", error);
    }
  };

  // Aplica a paginação DEPOIS do filtro
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
                  {item.projeto?.habilidades.map((hab, i) => (
                    <div key={i} className={style.badge}>
                      <p>{hab.descricao}</p>
                    </div>
                  ))}
                </div>
                <div className={style.container__details}>
                  <div className={style.card__location_date}>
                    <p>
                      <Localizacao className={style.icon} />
                      {/* {item.projeto?.ong.endereco} */}  Localização não disponível
                    </p>
                    <p>
                      <Relogio className={style.icon} />
                      {new Date(item.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className={style.card__ong_phone}>
                    <p>
                      <Usuario className={style.icon} />
                      {item.projeto?.ong.nome_fantasia}
                    </p>
                    <p>
                      <Telefone className={style.icon} /> 
                      {/* {item.projeto?.ong.telefone} */} Telefone não disponível
                    </p>
                  </div>
                </div>
                <div
                  className={style.container__buttons}
                  style={{
                    display:
                      item.iniciador.toLocaleLowerCase() === 'ong' &&
                      item.status.toLocaleLowerCase() === 'pendente'
                        ? 'flex'
                        : 'none',
                  }}
                >
                  <button
                    className={`${style.button} ${style.buttonAccept}`}
                    onClick={() => aceitarConvite(item.id)}
                  >
                    <Check className={style.icon} /> Aceitar
                  </button>
                  <button
                    className={`${style.button} ${style.buttonDecline}`}
                    onClick={() => recusarConvite(item.id)}
                  >
                    <Lixo className={style.icon} /> Recusar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

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
