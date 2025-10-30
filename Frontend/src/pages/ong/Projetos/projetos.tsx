import { useState } from "react"
import ModalCriarProjeto from "@/modals/ONG/CriarProjeto/modalCriarProjeto"
import ModalEditarProjeto from "@/modals/ONG/EditarProjeto/modalEditarProjeto"
import style from './projetos.module.css'
import Header from "@/components/Ong/Header/Header"
import ModalProjetosFinalizados from "@/modals/ONG/ProjetosFinalizados/modalProjetosFinalizados"

function projetos() {
  const [isModalCriarOpen, setIsModalCriarOpen] = useState(false)
  const [isModalEditarOpen, setIsModalEditarOpen] = useState(false)
  const [isModalProjetosFinalizadosOpen, setIsModalProjetosFinalizadosOpen] = useState(false)
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
        <button onClick={() => setIsModalCriarOpen(true)} style={{border: '1px solid black', margin: '10px'}} >Abrir Modal Criar Projeto</button>
        <button onClick={() => setIsModalEditarOpen(true)} style={{border: '1px solid black', margin: '10px'}}>Abrir Modal Editar Projeto</button>
        <button onClick={() => setIsModalProjetosFinalizadosOpen(true)} style={{border: '1px solid black', margin: '10px'}}>Abrir Modal Projetos Finalizados</button>
        <ModalCriarProjeto isOpen={isModalCriarOpen} setIsOpen={setIsModalCriarOpen}/>
        <ModalEditarProjeto isOpen={isModalEditarOpen} setIsOpen={setIsModalEditarOpen}/>
        <ModalProjetosFinalizados isOpen={isModalProjetosFinalizadosOpen} setIsOpen={setIsModalProjetosFinalizadosOpen}/>
    </>
    )
}

export default projetos