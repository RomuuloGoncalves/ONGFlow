import Header from "@/components/Ong/Header/Header";
import style from "./Dashboard.module.css";
import { ProjetosIcone } from "@/assets/icons/ProjetosIcone";
import { Check } from "@/assets/icons/Check";
import { Usuario } from "@/assets/icons/Usuario";
import { Maior } from "@/assets/icons/Maior";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import dashboardService from "@/services/dashboardService";
import type { DashboardProjeto } from "@/interfaces/projeto";
import type { DashboardConvite } from "@/interfaces/convite";
import type { DashboardHabilidade } from "@/interfaces/habilidade";

function Dashboard() {
  const [stats, setStats] = useState({
    projetosAtivos: 0,
    projetosFinalizados: 0,
    voluntariosAtivos: 0,
  });
  const [voluntariosAtivos, setVoluntariosAtivos] = useState<
    DashboardConvite[]
  >([]);
  const [voluntariosDisponiveis, setVoluntariosDisponiveis] = useState<
    DashboardConvite[]
  >([]);
  const [projetosAtivos, setProjetosAtivos] = useState<DashboardProjeto[]>([]);
  const [projetosFinalizados, setProjetosFinalizados] = useState<
    DashboardProjeto[]
  >([]);

  useEffect(() => {
    dashboardService.getDashboardData().then((response) => {
      const data = response.data;
      setStats(data.stats);
      setVoluntariosAtivos(data.voluntariosAtivos);
      setVoluntariosDisponiveis(data.voluntariosDisponiveis);
      setProjetosAtivos(data.projetosAtivos);
      setProjetosFinalizados(data.projetosFinalizados);
    });
  }, []);

  return (
    <div className={style.main}>
      <Header />
      <div className={style.dashboard}>
        <div className={style.dashboard__title}>
          <h1>Dashboard</h1>
          <div className={style.stats}>
            <div className={style.projetos__ativos}>
              <ProjetosIcone className={style.icon} />
              <div className={style.text}>
                <p>Projetos Ativos</p>
                <span>{stats.projetosAtivos}</span>
              </div>
            </div>
            <div className={style.projetos__finalizados}>
              <Check className={style.icon} />
              <div className={style.text}>
                <p>Projetos Finalizados</p>
                <span>{stats.projetosFinalizados}</span>
              </div>
            </div>
            <div className={style.voluntario__ativos}>
              <Usuario className={style.icon} />
              <div className={style.text}>
                <p>Voluntários Ativos</p>
                <span>{stats.voluntariosAtivos}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={style.dashboard__lista_voluntarios}>
          <div className={style.container__voluntario_ativos}>
            <div className={style.title__voluntario}>
              <h1>Voluntários Ativos em Projetos</h1>
            </div>
            <div className={style.list}>
              {voluntariosAtivos.map((convite) => (
                <div key={convite.id} className={style.voluntario}>
                  <div className={style.voluntario__icon}>
                    <div className={style.icon} />
                  </div>
                  <div className={style.voluntario__info}>
                    <p>{convite.voluntario?.nome}</p>
                    <span>{convite.projeto?.nome}</span>
                  </div>
                  <div className={style.voluntario__stats}>
                    <div className={style.tag}>
                      <p>Ativo</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/voluntarios/ong" className={style.container__button}>
              Ver Todos
              <Maior className={style.icon} />
            </Link>
          </div>
          <div className={style.container__voluntario_disponiveis}>
            <div className={style.title__voluntario}>
              <h1>Voluntários Disponíveis</h1>
            </div>
            <div className={style.list}>
              {voluntariosDisponiveis.map((convite) => (
                <div key={convite.id} className={style.voluntario}>
                  <div className={style.voluntario__icon}>
                    <div className={style.icon} />
                  </div>
                  <div className={style.voluntario__info}>
                    <p>{convite.voluntario?.nome}</p>
                    <span>
                      {convite.voluntario?.habilidades
                        ?.map((h: DashboardHabilidade) => h.descricao)
                        .join(", ")}
                    </span>
                  </div>
                  <div className={style.voluntario__stats}>
                    <div className={style.tag}>
                      <p>Disponível</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/voluntarios/ong" className={style.container__button}>
              Ver Todos
              <Maior className={style.icon} />
            </Link>
          </div>
        </div>
        <div className={style.dashboard__lista_projetos}>
          <div className={style.container__projetos_ativos}>
            <div className={style.title__projetos}>
              <h1>Projetos Ativos</h1>
            </div>
            <div className={style.list}>
              {projetosAtivos.map((projeto) => (
                <div key={projeto.id} className={style.projeto}>
                  <div className={style.projeto__icon}>
                    <div className={style.icon} />
                  </div>
                  <div className={style.projeto__info}>
                    <p>{projeto.nome}</p>
                  </div>
                  <div className={style.projeto__data}>
                    <p>{new Date(projeto.data_inicio!).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/projetos/ong" className={style.container__button}>
              Ver Todos
              <Maior className={style.icon} />
            </Link>
          </div>
          <div className={style.container__projetos_finalizados}>
            <div className={style.title__projetos}>
              <h1>Projetos Finalizados</h1>
            </div>
            <div className={style.list}>
              {projetosFinalizados.map((projeto) => (
                <div key={projeto.id} className={style.projeto}>
                  <div className={style.projeto__info}>
                    <p>{projeto.nome}</p>
                  </div>
                  <div className={style.projeto__data}>
                    <p>{new Date(projeto.data_final!).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/projetos/ong" className={style.container__button}>
              Ver Todos
              <Maior className={style.icon} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
