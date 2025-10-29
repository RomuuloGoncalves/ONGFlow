import Header from "@/components/Ong/Header/Header";
import style from "./ListagemVoluntario.module.css";
import { useState } from "react";
import ModalExibirVoluntario from "@/modals/ONG/ExibirVoluntario/modalExibirVoluntario";

function ListagemVoluntario() {
  const [isModalExibirOpen, setIsModalExibirOpen] = useState(false);
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
        <button
          onClick={() => setIsModalExibirOpen(true)}
          style={{ border: "1px solid black", margin: "10px" }}
        >
          Abrir Modal Exibir voluntario
        </button>    </div>
          </div>
        </div>
      </div>
              <ModalExibirVoluntario isOpen={isModalExibirOpen} setIsOpen={setIsModalExibirOpen}/>
    </div>
  );
}

export default ListagemVoluntario;
