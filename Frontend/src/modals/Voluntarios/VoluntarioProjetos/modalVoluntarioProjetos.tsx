import { useEffect } from "react";
import style from "./modalVoluntarioProjetos.module.css";
import { Fechar } from "@/assets/icons/Fechar";
import type { Projeto } from "@/interfaces/projeto";
import type { Endereco } from "@/interfaces/endereco";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  projeto: (Projeto & { endereco?: Endereco }) | null;
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

  const endereco = projeto.endereco || projeto.ong?.endereco;

  // Remove duplicate habilidades
  const uniqueHabilidades = projeto.habilidades
    ? [...new Map(projeto.habilidades.map((item) => [item["id"], item])).values()]
    : [];

  return (
    <div className={style.modal__overlay} onClick={() => setIsOpen(false)}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <div className={style.modal__header}>
          <h1>{projeto.nome}</h1>
          <Fechar onClick={() => setIsOpen(false)} style={{cursor: 'pointer'}}/>
        </div>
        <div className={style.modal__body}>
          <div className={style.descricao}>
            <label>Descrição completa</label>
            <p>{projeto.descricao}</p>
          </div>
          {uniqueHabilidades.length > 0 && (
            <div className={style.habilidades}>
              <label>Habilidades necessárias</label>
              <div className={style.habilidades__badge}>
                {uniqueHabilidades.map(habilidade => (
                  <div key={`habilidade-${habilidade.id}`} className={style.badge}>
                    <p>{habilidade.descricao}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {endereco && (
            <div className={style.location}>
              <label>Localização</label>
              <p>{`${endereco.logradouro}, ${endereco.numero} - ${endereco.cidade}, ${endereco.estado}`}</p>
            </div>
          )}
          {projeto.ong && (
            <div className={style.ong__phone}>
              <div className={style.ong}>
                <label>Nome da ONG</label>
                <p>{projeto.ong.nome_fantasia}</p>
              </div>
              <div className={style.phone}>
                <label>Telefone</label>
                <p>{projeto.ong.telefone}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default modalVoluntario;
