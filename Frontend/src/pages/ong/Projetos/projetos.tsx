import ModalCriarProjeto from "@/modals/ONG/CriarProjeto/modalCriarProjeto"
import { useState } from "react"

function projetos() {
    const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <>
        <button onClick={() => setIsModalOpen(true)} >Abrir Modal Criar Projeto</button>
        <ModalCriarProjeto isOpen={isModalOpen} setIsOpen={setIsModalOpen}/>
    </>
    )
}

export default projetos