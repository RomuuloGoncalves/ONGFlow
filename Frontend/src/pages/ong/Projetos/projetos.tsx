import ModalCriarProjeto from "@/modals/ONG/CriarProjeto/modalCriarProjeto"
import ModalEditarProjeto from "@/modals/ONG/EditarProjeto/modalEditarProjeto"
import { useState } from "react"
import Header from "@/components/Ong/Header/Header"

function projetos() {
  const [isModalCriarOpen, setIsModalCriarOpen] = useState(false)
  const [isModalEditarOpen, setIsModalEditarOpen] = useState(false)
  return (
    <>
        <Header />
        <button onClick={() => setIsModalCriarOpen(true)} style={{border: '1px solid black', margin: '10px'}} >Abrir Modal Criar Projeto</button>
        <button onClick={() => setIsModalCriarOpen(true)} style={{border: '1px solid black', margin: '10px'}}>Abrir Modal Editar Projeto</button>
        <ModalCriarProjeto isOpen={isModalCriarOpen} setIsOpen={setIsModalCriarOpen}/>
        <ModalEditarProjeto isOpen={isModalEditarOpen} setIsOpen={setIsModalEditarOpen}/>
    </>
    )
}

export default projetos