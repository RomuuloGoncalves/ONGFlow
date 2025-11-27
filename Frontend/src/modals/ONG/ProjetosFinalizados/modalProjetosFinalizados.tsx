import { Fechar } from "@/assets/icons/Fechar";
import style from "./modalProjetosFinalizados.module.css";
import { Usuario } from "@/assets/icons/Usuario";
import { Lixo } from "@/assets/icons/Lixo";
import { useEffect } from "react";
import type { Projeto } from "@/interfaces/projeto";

interface Modalprops {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  projeto: Projeto | null;
}

function ModalProjetosFinalizados({ isOpen, setIsOpen, projeto }: Modalprops) {
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
          <div className={style.description}>
            <p>Sobre</p>
            <span>{projeto.descricao}</span>
          </div>
          <div className={style.card__habilities}>
            <p>Habilidades</p>
            <div className={style.habilities}>
              {projeto.habilidades?.slice(0, 3).map((hab, i) => (
                <div key={i} className={style.badge} title={hab.descricao}>
                  <span>{hab.descricao}</span>
                </div>
              ))}
              {projeto.habilidades && projeto.habilidades.length > 3 && (
                <div className={style.badge}>
                  <span>+{projeto.habilidades.length - 3}</span>
                </div>
              )}
            </div>
          </div>
          <div className={style.location__status}>
            <div className={style.location}>
              <p>Localização</p>
              <span>
                {projeto.ong?.endereco
                  ? `${projeto.ong.endereco.cidade} - ${projeto.ong.endereco.estado}`
                  : "Não informada"}
              </span>
            </div>
            <div className={style.status}>
              <p>Status</p>
              <div className={style.tag}>
                <span>{projeto.status}</span>
              </div>
            </div>
          </div>
          <div className={style.voluntarios}>
            <div className={style.voluntarios__header}>
              <Usuario className={style.icon} />
              <p>Voluntários que Participaram</p>
            </div>

            <div className={style.voluntarios__body}>
              {/* Placeholder for volunteers */}
            </div>
          </div>
        </div>
        <div className={style.modal__footer}>
          <button>
            <Lixo />
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalProjetosFinalizados;
