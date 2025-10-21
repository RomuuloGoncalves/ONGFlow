import style from "./modalVoluntario.module.css";
import { Fechar } from "@/assets/icons/Fechar";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

function modalVoluntario({ isOpen, setIsOpen }: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className={style.modal__overlay} onClick={() => setIsOpen(false)}>
      <div className={style.modal}>
        <div className={style.modal__header}>
          <h1>Mutirão de Reforma em Escola Comunitária</h1>
          <Fechar onClick={() => setIsOpen(false)} />
        </div>
        <div className={style.modal__body}>
          <div className={style.descricao}>
            <label>Descrição completa</label>
            <p>
              Buscamos voluntários para auxiliar na pintura e reparos
              estruturais de uma escola pública localizada em área carente. O
              objetivo é proporcionar um ambiente mais acolhedor para os alunos
            </p>
          </div>
          <div className={style.habilidades}>
            <label>Habilidades necessárias</label>
            <div className={style.habilidades__badge}>
                <div className={style.badge}>
                    <p>Habilidade</p>
                </div>
            </div>
          </div>
          <div className={style.status__location}>
            <div className={style.location}>
              <label>Location</label>
              <p>São Paulo - SP</p>
            </div>
            <div className={style.status}>
              <label>Status</label>
              <div className={style.badge__status}>
                <p>Concluído</p>
              </div>
            </div>
          </div>
          <div className={style.ong__phone}>
            <div className={style.ong}>
              <label>ONG</label>
              <p>Nome da ONG</p>
            </div>
            <div className={style.phone}>
              <label>Telefone</label>
              <p>(+55) 15 9977777</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default modalVoluntario;
