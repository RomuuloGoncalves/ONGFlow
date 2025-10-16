import Header from "@/components/Voluntario/Header/Header";
import style from "./Convite.module.css";
import { Pesquisa } from "@/assets/icons/Pesquisa";
import { Pagination } from "@/components/Pagination/Pagination";
import { Localizacao } from "@/assets/icons/Localizacao";
import { Telefone } from "@/assets/icons/Telefone";
import { Usuario } from "@/assets/icons/Usuario";
import { useState } from "react";
import { Relogio } from "@/assets/icons/Relogio";

const projetos = [
  {
    id: 1,
    titulo: "Campanha de Arrecadação de Alimentos",
    descricao: "Ensinar reutilização de materiais recicláveis,Ensinar reutilização de materiais recicláveis",
    status: "Solicitado",
    localizacao: "São Paulo - SP",
    habilidades: ["Organização", "Comunicação", "Logística"],
    ong: "Instituto Solidário SP",
    telefone: "(11) 98888-1234",
    dataHora: "2025-10-15 09:00"
  },
  {
    id: 2,
    titulo: "Aulas de Reforço Escolar",
    descricao: "Apoio escolar para crianças do ensino fundamental com foco em matemática e português.",
    status: "Pendente",
    localizacao: "Curitiba - PR",
    habilidades: ["Didática", "Paciência", "Pedagogia"],
    ong: "Associação Educar Curitiba",
    telefone: "(41) 97777-4567",
    dataHora: "2025-10-15 10:15"
  },
  {
    id: 3,
    titulo: "Mutirão de Limpeza Ambiental",
    descricao: "Grupo de voluntários para limpeza de rios e parques com conscientização ambiental.",
    status: "Recusado",
    localizacao: "Rio de Janeiro - RJ",
    habilidades: ["Trabalho em equipe", "Esforço físico", "Conscientização ambiental"],
    ong: "Verde+ RJ",
    telefone: "(21) 96666-7890",
    dataHora: "2025-10-15 11:45"
  },
  {
    id: 4,
    titulo: "Campanha de Adoção de Animais",
    descricao: "Apoio em feiras de adoção e cuidados temporários para animais resgatados.",
    status: "Solicitado",
    localizacao: "Porto Alegre - RS",
    habilidades: ["Empatia", "Atendimento ao público", "Organização"],
    ong: "Amigos dos Pets RS",
    telefone: "(51) 95555-3210",
    dataHora: "2025-10-15 13:00"
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
    dataHora: "2025-10-15 14:20"
  },
];


const items = projetos.map((projeto, index) => ({
  id: projeto.id ?? index + 1,
  titulo: projeto.titulo,
  descricao: projeto.descricao,
  status: projeto.status,
  localizacao: projeto.localizacao,
  habilidades: projeto.habilidades,
  telefone: projeto.telefone,
  ong: projeto.ong,
  dataHora: projeto.dataHora
}));

function Convite() {
  // Número da página atual e a quantidade de itens por página
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  // índice do primeiro item da página atual
  const start = (currentPage - 1) * itemsPerPage;

  // fatia do array que representa a página atual
  const paginatedItems = items.slice(start, start + itemsPerPage);

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
            />
          </div>
          <div className={style.container__tags}>
            <button className={`${style.button}`}>Todos</button>
            <button className={`${style.button}`}>Pendentes</button>
            <button className={`${style.button}`}>Aceitos</button>
            <button className={`${style.button}`}>Recusados</button>
            <button className={`${style.button}`}>Solicitações</button>
          </div>
        </div>
        <div className={style.container__table_body}>
          {paginatedItems.map((item) => (
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
                  <p><Localizacao className={style.icon}/>{item.localizacao}</p>
                  <p><Relogio className={style.icon}/>{item.dataHora}</p>
                </div>
                <div className={style.card__ong_phone}>
                  <p><Usuario className={style.icon}/>{item.ong}</p>
                  <p><Telefone className={style.icon}/> {item.telefone}</p>
                </div>
              </div>
             
            </div>
          ))}
        </div>

        <div className={style.container__table_footer}>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(items.length / itemsPerPage)}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </>
  );
}

export default Convite;
