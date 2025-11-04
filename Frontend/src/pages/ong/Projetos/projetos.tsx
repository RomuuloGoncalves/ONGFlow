import { useState } from "react"
import style from './projetos.module.css'
import Header from "@/components/Ong/Header/Header"
import ModalProjetosFinalizados from "@/modals/ONG/ProjetosFinalizados/modalProjetosFinalizados"
import ModalProjetosAndamento from "@/modals/ONG/ProjetosAndamento/modalProjetosAndamento"

function projetos() {
  const [isModalProjetosFinalizadosOpen, setIsModalProjetosFinalizadosOpen] = useState(false)
  const [isModalProjetosAndamentoOpen, setIsModalProjetosAndamentoOpen] = useState(false)
  return (
    <>
        <div className={style.main}>
          <div className={style.projetos}>
          <div className={style.projetos__title}>
          <h1>Lista Projetos</h1>
          <div className={style.stats}>
            <div className={style.projetos__ativos}>
              {/* Icon */}
              <div className={style.text}>
                <p>Projetos Ativos</p>
                <p></p>
              </div>
            </div>
            <div className={style.projetos__finalizados}>
              {/* Icon */}
              <div className={style.text}>
                <p>Projetos Finalizados</p>
                <p></p>
              </div>
            </div>
            <div className={style.voluntario__ativos}>
              {/* Icon */}
              <div className={style.text}>
                <p>Voluntários Ativos</p>
                <p></p>
              </div>
            </div>
          </div>
        </div>
          </div>
        </div>
        <Header />
        <button onClick={() => setIsModalProjetosFinalizadosOpen(true)} style={{border: '1px solid black', margin: '10px'}}>Abrir Modal Projetos Finalizados</button>
        <button onClick={() => setIsModalProjetosAndamentoOpen(true)} style={{border: '1px solid black', margin: '10px'}}>Abrir Modal Projetos Andamento</button>
        <ModalProjetosFinalizados isOpen={isModalProjetosFinalizadosOpen} setIsOpen={setIsModalProjetosFinalizadosOpen}/>
        <ModalProjetosAndamento isOpen={isModalProjetosAndamentoOpen} setIsOpen={setIsModalProjetosAndamentoOpen}/>
    </>
    )
}

export default projetos