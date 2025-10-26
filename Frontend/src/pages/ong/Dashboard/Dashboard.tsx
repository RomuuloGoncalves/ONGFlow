import Header from "@/components/Ong/Header/Header";
import style from "./Dashboard.module.css";

function Dashboard() {
  return (
    <div className={style.main}>
      <Header />
      <div className={style.dashboard}>
        <div className={style.dashboard__title}>
          <h1>Dashboard</h1>
          <div className={style.stats}>
            <div className={style.projetos__ativos}>
              {/* Icon */}
              <div className={style.text}>
                <p></p>
                <p></p>
              </div>
            </div>
            <div className={style.projetos__finalizados}>
              {/* Icon */}
              <div className={style.text}>
                <p></p>
                <p></p>
              </div>
            </div>
            <div className={style.voluntario__ativos}>
              {/* Icon */}
              <div className={style.text}>
                <p></p>
                <p></p>
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
                <div className={style.voluntario__icon}></div>
                <div className={style.voluntario__info}>
                  <p></p>
                  <p></p>
                </div>
                <div className={style.voluntario__stats}>
                  <p></p>
                </div>
              </div>
            </div>
            <div className={style.container__button}>
              {/* Icon */}
              <button>Ver Todos</button>
            </div>
          </div>
          <div className={style.container__voluntario_disponíveis}>
            <div className={style.title__voluntario}>
              <h1>Voluntários Disponíveis</h1>
            </div>
            <div className={style.list}>
              <div className={style.voluntario}>
                <div className={style.voluntario__icon}></div>
                <div className={style.voluntario__info}>
                  <p></p>
                  <p></p>
                </div>
                <div className={style.voluntario__stats}>
                  <p></p>
                </div>
              </div>
            </div>
            <div className={style.container__button}>
              {/* Icon */}
              <button>Ver Todos</button>
            </div>
          </div>
        </div>
        <div className={style.dashboard__lista_projetos}>
          <div className={style.container__projetos_ativos}>
            <div className={style.list}>
              <div className={style.projeto}>
                <div className={style.projeto__info}>
                  <p></p>
                  <p></p>
                </div>
                <div className={style.projeto__data}>
                  <p></p>
                </div>
              </div>
            </div>
            <div className={style.container__button}>
              {/* Icon */}
              <button>Ver Todos</button>
            </div>
          </div>
          <div className={style.container__projetos_finalizados}>
            <div className={style.list}>
              <div className={style.projeto}>
                <div className={style.projeto__info}>
                  <p></p>
                  <p></p>
                </div>
                <div className={style.projeto__data}>
                  <p></p>
                </div>
              </div>
            </div>
            <div className={style.container__button}>
              {/* Icon */}
              <button>Ver Todos</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
