import Header from "@/components/Voluntario/Header/Header";
import style from "./Convite.module.css";
import { Pesquisa } from "@/assets/icons/Pesquisa";
import { Pagination } from "@/components/Pagination/Pagination";
import { Localizacao } from "@/assets/icons/Localizacao";
import { Telefone } from "@/assets/icons/Telefone";
import { Usuario } from "@/assets/icons/Usuario";
import { useState } from "react";
import { Relogio } from "@/assets/icons/Relogio";
import { Check } from "@/assets/icons/Check";
import { Lixo } from "@/assets/icons/Lixo";


// RETORNAR A API COM NOME 'projetos'
const projetos = [
  {
    id: 1,
    titulo: "Campanha de Arrecadação de Alimentos",
    descricao:
      "Ensinar reutilização de materiais recicláveis,Ensinar reutilização de materiais recicláveis",
    status: "Solicitado",
    localizacao: "São Paulo - SP",
    habilidades: ["Organização", "Comunicação", "Logística"],
    ong: "Instituto Solidário SP",
    telefone: "(11) 98888-1234",
    dataHora: "2025-10-15 09:00",
  },
  {
    id: 2,
    titulo: "Aulas de Reforço Escolar",
    descricao:
      "Apoio escolar para crianças do ensino fundamental com foco em matemática e português.",
    status: "Pendente",
    localizacao: "Curitiba - PR",
    habilidades: ["Didática", "Paciência", "Pedagogia"],
    ong: "Associação Educar Curitiba",
    telefone: "(41) 97777-4567",
    dataHora: "2025-10-15 10:15",
  },
  {
    id: 3,
    titulo: "Mutirão de Limpeza Ambiental",
    descricao:
      "Grupo de voluntários para limpeza de rios e parques com conscientização ambiental.",
    status: "Recusado",
    localizacao: "Rio de Janeiro - RJ",
    habilidades: [
      "Trabalho em equipe",
      "Esforço físico",
      "Conscientização ambiental",
    ],
    ong: "Verde+ RJ",
    telefone: "(21) 96666-7890",
    dataHora: "2025-10-15 11:45",
  },
  {
    id: 4,
    titulo: "Campanha de Adoção de Animais",
    descricao:
      "Apoio em feiras de adoção e cuidados temporários para animais resgatados.",
    status: "Solicitado",
    localizacao: "Porto Alegre - RS",
    habilidades: ["Empatia", "Atendimento ao público", "Organização"],
    ong: "Amigos dos Pets RS",
    telefone: "(51) 95555-3210",
    dataHora: "2025-10-15 13:00",
  },
  {
    id: 5,
    titulo: "Oficina de Inclusão Digital para Idosos",
    descricao: "Ensinar idosos a utilizarem smartphones e aplicativos básicos.",
    status: "Pendente",
    localizacao: "Belo Horizonte - MG",
    habilidades: ["Paciência", "Tecnologia básica", "Ensino"],
    ong: "Conectar BH",
    telefone: "(31) 94444-6543",
    dataHora: "2025-10-15 14:20",
  },
  {
    id: 6,
    titulo: "Oficina de Inclusão Digital para Idosos",
    descricao: "Ensinar idosos a utilizarem smartphones e aplicativos básicos.",
    status: "Pendente",
    localizacao: "Belo Horizonte - MG",
    habilidades: ["Paciência", "Tecnologia básica", "Ensino"],
    ong: "Conectar BH",
    telefone: "(31) 94444-6543",
    dataHora: "2025-10-15 14:20",
  },
  {
    id: 7,
    titulo: "Oficina de Inclusão Digital para Idosos",
    descricao: "Ensinar idosos a utilizarem smartphones e aplicativos básicos.",
    status: "Pendente",
    localizacao: "Belo Horizonte - MG",
    habilidades: ["Paciência", "Tecnologia básica", "Ensino"],
    ong: "Conectar BH",
    telefone: "(31) 94444-6543",
    dataHora: "2025-10-15 14:20",
  },
  {
    id: 8,
    titulo: "Oficina de Inclusão Digital para Idosos",
    descricao: "Ensinar idosos a utilizarem smartphones e aplicativos básicos.",
    status: "Pendente",
    localizacao: "Belo Horizonte - MG",
    habilidades: ["Paciência", "Tecnologia básica", "Ensino"],
    ong: "Conectar BH",
    telefone: "(31) 94444-6543",
    dataHora: "2025-10-15 14:20",
  },
  {
    id: 9,
    titulo: "Oficina de Inclusão Digital para Idosos",
    descricao: "Ensinar idosos a utilizarem smartphones e aplicativos básicos.",
    status: "Pendente",
    localizacao: "Belo Horizonte - MG",
    habilidades: ["Paciência", "Tecnologia básica", "Ensino"],
    ong: "Conectar BH",
    telefone: "(31) 94444-6543",
    dataHora: "2025-10-15 14:20",
  },
  {
    id: 10,
    titulo: "Oficina de Inclusão Digital para Idosos",
    descricao: "Ensinar idosos a utilizarem smartphones e aplicativos básicos.",
    status: "Pendente",
    localizacao: "Belo Horizonte - MG",
    habilidades: ["Paciência", "Tecnologia básica", "Ensino"],
    ong: "Conectar BH",
    telefone: "(31) 94444-6543",
    dataHora: "2025-10-15 14:20",
  },
  {
    id: 11,
    titulo: "Oficina de Inclusão Digital para Idosos",
    descricao: "Ensinar idosos a utilizarem smartphones e aplicativos básicos.",
    status: "Pendente",
    localizacao: "Belo Horizonte - MG",
    habilidades: ["Paciência", "Tecnologia básica", "Ensino"],
    ong: "Conectar BH",
    telefone: "(31) 94444-6543",
    dataHora: "2025-10-15 14:20",
  },
  {
    id: 12,
    titulo: "Oficina de Inclusão Digital para Idosos",
    descricao: "Ensinar idosos a utilizarem smartphones e aplicativos básicos.",
    status: "Pendente",
    localizacao: "Belo Horizonte - MG",
    habilidades: ["Paciência", "Tecnologia básica", "Ensino"],
    ong: "Conectar BH",
    telefone: "(31) 94444-6543",
    dataHora: "2025-10-15 14:20",
  },
  {
    id: 13,
    titulo: "Oficina de Inclusão Digital para Idosos",
    descricao: "Ensinar idosos a utilizarem smartphones e aplicativos básicos.",
    status: "Pendente",
    localizacao: "Belo Horizonte - MG",
    habilidades: ["Paciência", "Tecnologia básica", "Ensino"],
    ong: "Conectar BH",
    telefone: "(31) 94444-6543",
    dataHora: "2025-10-15 14:20",
  },
  {
    id: 14,
    titulo: "Oficina de Inclusão Digital para Idosos",
    descricao: "Ensinar idosos a utilizarem smartphones e aplicativos básicos.",
    status: "Pendente",
    localizacao: "Belo Horizonte - MG",
    habilidades: ["Paciência", "Tecnologia básica", "Ensino"],
    ong: "Conectar BH",
    telefone: "(31) 94444-6543",
    dataHora: "2025-10-15 14:20",
  },
  {
    id: 15,
    titulo: "Oficina de Inclusão Digital para Idosos",
    descricao: "Ensinar idosos a utilizarem smartphones e aplicativos básicos.",
    status: "Pendente",
    localizacao: "Belo Horizonte - MG",
    habilidades: ["Paciência", "Tecnologia básica", "Ensino"],
    ong: "Conectar BH",
    telefone: "(31) 94444-6543",
    dataHora: "2025-10-15 14:20",
  },
  {
    id: 16,
    titulo: "Oficina de Inclusão Digital para Idosos",
    descricao: "Ensinar idosos a utilizarem smartphones e aplicativos básicos.",
    status: "Pendente",
    localizacao: "Belo Horizonte - MG",
    habilidades: ["Paciência", "Tecnologia básica", "Ensino"],
    ong: "Conectar BH",
    telefone: "(31) 94444-6543",
    dataHora: "2025-10-15 14:20",
  },
  {
    id: 17,
    titulo: "Oficina de Inclusão Digital para Idosos",
    descricao: "Ensinar idosos a utilizarem smartphones e aplicativos básicos.",
    status: "Pendente",
    localizacao: "Belo Horizonte - MG",
    habilidades: ["Paciência", "Tecnologia básica", "Ensino"],
    ong: "Conectar BH",
    telefone: "(31) 94444-6543",
    dataHora: "2025-10-15 14:20",
  },
  {
    id: 18,
    titulo: "Oficina de Inclusão Digital para Idosos",
    descricao: "Ensinar idosos a utilizarem smartphones e aplicativos básicos.",
    status: "Pendente",
    localizacao: "Belo Horizonte - MG",
    habilidades: ["Paciência", "Tecnologia básica", "Ensino"],
    ong: "Conectar BH",
    telefone: "(31) 94444-6543",
    dataHora: "2025-10-15 14:20",
  },
];

function Convite() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filtro, setFiltro] = useState("Todos");
  const [textPesquisa, setTextPesquisa] = useState("");

  const itemsPerPage = 4;

  // Aplica o filtro
  const projetosFiltrados = projetos.filter((p) => {
    const pesquisa = textPesquisa.toLocaleLowerCase();
    const statusValido = filtro === "Todos" || p.status === filtro;
    const pesquisaValida =
      p.titulo.toLowerCase().includes(pesquisa) ||
      p.ong.toLowerCase().includes(pesquisa);

    return statusValido && pesquisaValida;
  });

  // Aplica a paginação DEPOIS do filtro
  const start = (currentPage - 1) * itemsPerPage;
  const paginatedItems = projetosFiltrados.slice(start, start + itemsPerPage);

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
              onClick={() => setFiltro("Pendente")}
              className={`${style.button} ${
                filtro === "Pendente" ? style.active : ""
              }`}
            >
              Pendentes
            </button>
            <button
              onClick={() => setFiltro("Aceito")}
              className={`${style.button} ${
                filtro === "Aceito" ? style.active : ""
              }`}
            >
              Aceitos
            </button>
            <button
              onClick={() => setFiltro("Recusado")}
              className={`${style.button} ${
                filtro === "Recusado" ? style.active : ""
              }`}
            >
              Recusados
            </button>
            <button
              onClick={() => setFiltro("Solicitado")}
              className={`${style.button} ${
                filtro === "Solicitado" ? style.active : ""
              }`}
            >
              Solicitados
            </button>
          </div>
        </div>
        <div className={style.container__table_body}>
          {paginatedItems.length === 0 ? (
            <p className={style.alertMensage}>
              Ops! Não encontramos nenhum projeto.
            </p>
          ) : (
            paginatedItems.map((item) => (
              <div key={item.id} className={style.card}>
                <div className={style.card__title}>
                  <div className={style.card__title_tag}>
                    <p>{item.status}</p>
                  </div>
                  <h1>{item.titulo}</h1>
                </div>
                <div className={style.card__descricao}>
                  <p>{item.descricao}</p>
                </div>
                <div className={style.habilidades}>
                  {item.habilidades.map((hab, i) => (
                    <div key={i} className={style.badge}>
                      <p>{hab}</p>
                    </div>
                  ))}
                </div>
                <div className={style.container__details}>
                  <div className={style.card__location_date}>
                    <p>
                      <Localizacao className={style.icon} />
                      {item.localizacao}
                    </p>
                    <p>
                      <Relogio className={style.icon} />
                      {item.dataHora}
                    </p>
                  </div>
                  <div className={style.card__ong_phone}>
                    <p>
                      <Usuario className={style.icon} />
                      {item.ong}
                    </p>
                    <p>
                      <Telefone className={style.icon} /> {item.telefone}
                    </p>
                  </div>
                </div>
                <div className={style.container__buttons} style={{
                    display: item.status.toLocaleLowerCase() == 'solicitado' ? 'flex' : 'none'
                  }}>
                    <button className={`${style.button} ${style.buttonAccept}`}><Check className={style.icon}/> Aceitar</button>
                    <button className={`${style.button} ${style.buttonDecline}`}><Lixo className={style.icon}/> Recusar</button>
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

export default Convite;
