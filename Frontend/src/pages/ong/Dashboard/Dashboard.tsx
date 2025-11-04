import Header from "@/components/Ong/Header/Header";
import style from "./Dashboard.module.css";
import { ProjetosIcone } from "@/assets/icons/ProjetosIcone";
import { Check } from "@/assets/icons/Check";
import { Usuario } from "@/assets/icons/Usuario";
import { Maior } from "@/assets/icons/Maior";
import { Link } from "react-router-dom";

function Dashboard() {
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
                <span>x</span>
              </div>
            </div>
            <div className={style.projetos__finalizados}>
              <Check className={style.icon} />
              <div className={style.text}>
                <p>Projetos Finalizados</p>
                <span>x</span>
              </div>
            </div>
            <div className={style.voluntario__ativos}>
              <Usuario className={style.icon} />
              <div className={style.text}>
                <p>Voluntários Ativos</p>
                <span>x</span>
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
              <div className={style.voluntario}>
                <div className={style.voluntario__icon}>
                  <div className={style.icon} />
                </div>
                <div className={style.voluntario__info}>
                  <p>Alex</p>
                  <span>Projetos cães</span>
                </div>
                <div className={style.voluntario__stats}>
                  <div className={style.tag}>
                    <p>Ativo</p>
                  </div>
                </div>
              </div>
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
              <div className={style.voluntario}>
                <div className={style.voluntario__icon}>
                  <div className={style.icon} />
                </div>
                <div className={style.voluntario__info}>
                  <p>Alex</p>
                  <span>Habilidades</span>
                </div>
                <div className={style.voluntario__stats}>
                  <div className={style.tag}>
                    <p>Ativo</p>
                  </div>
                </div>
              </div>
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
              <h1>Voluntários Ativos em Projetos</h1>
            </div>
            <div className={style.list}>
              <div className={style.projeto}>
                <div className={style.projeto__info}>
                  <p>Titulo do projeto</p>
                  <span>Descrição do projeto...</span>
                </div>
                <div className={style.projeto__data}>
                  <p>02/01/2025</p>
                </div>
              </div>
            </div>
            <div className={style.container__button}>
              Ver Todos
              <Maior className={style.icon} />
            </div>
          </div>
          <div className={style.container__projetos_finalizados}>
            <div className={style.title__projetos}>
              <h1>Voluntários Ativos em Projetos</h1>
            </div>
            <div className={style.list}>
              <div className={style.projeto}>
                <div className={style.projeto__info}>
                  <p>Titulo do projeto</p>
                  <span>Descrição do projeto...</span>
                </div>
                <div className={style.projeto__data}>
                  <p>02/01/2025</p>
                </div>
              </div>
            </div>
            <div className={style.container__button}>
              Ver Todos
              <Maior className={style.icon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
