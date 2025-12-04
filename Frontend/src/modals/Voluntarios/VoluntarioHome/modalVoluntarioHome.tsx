import { useEffect } from "react";
import style from "./modalVoluntarioHome.module.css";
import { Fechar } from "@/assets/icons/Fechar";
import type { Projeto } from "@/interfaces/projeto";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  projeto: Projeto | null;
}

function modalVoluntario({ isOpen, setIsOpen, projeto }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen || !projeto) return null;
  return (
    <div className={style.modal__overlay} onClick={() => setIsOpen(false)}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <div className={style.modal__header}>
          <h1>{projeto.nome}</h1>
          <Fechar onClick={() => setIsOpen(false)} />
        </div>
        <div className={style.modal__body}>
          <div className={style.descricao}>
            <label>Descrição completa</label>
            <p>{projeto.descricao}</p>
          </div>
          {/* <div className={style.habilidades}>
            <label>Habilidades necessárias</label>
            <div className={style.habilidades__badge}>
              {projeto.habilidades?.map((habilidade) => (
                <div key={habilidade.id} className={style.badge}>
                  <p>{habilidade.descricao}</p>
                </div>
              ))}
            </div>
          </div> */}
          <div className={style.status__location}>
            <div className={style.location}>
              <label>Localização</label>
              <p>
                {projeto.ong?.endereco
                  ? `${projeto.ong.endereco.cidade} - ${projeto.ong.endereco.estado}`
                  : "Localização não informada"}
              </p>
            </div>
            <div className={style.status}>
              <label>Status</label>
              <div className={style.badge__status}>
                <p>{projeto.status}</p>
              </div>
            </div>
          </div>
          {/* <div className={style.ong__phone}>
            <div className={style.ong}>
              <label>Nome da ONG</label>
              <p>{projeto.ong?.nome}</p>
            </div>
            <div className={style.phone}>
              <label>Telefone</label>
              <p>{projeto.ong?.telefone ?? "Não informado"}</p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default modalVoluntario;