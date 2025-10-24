import Header from "@/components/Ong/Header/Header";
import style from "./ListagemVoluntario.module.css";

function ListagemVoluntario() {
  return (
    <div className={style.main}>
      <Header />
      <div className={style.listagem__voluntario}>
        <div className={style.listagem__voluntario_title}>
          <h1>Lista de Voluntários</h1>
          <div className={style.stats}>
            <div className={style.voluntario__ativo}>
              {/* Icon */}
              <div className={style.text}>
                <p>Voluntarios Ativos</p>
                <p></p>
              </div>
            </div>
            <div className={style.voluntario__cadastrado}>
              {/* Icon */}
              <div className={style.text}>
                <p>Voluntarios Cadastrados</p>
                <p></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListagemVoluntario;
