import { Fechar } from "@/assets/icons/Fechar";
import { Convite } from "@/assets/icons/Convite";
import style from "./modalExibirVoluntario.module.css";
import { Usuario } from "@/assets/icons/Usuario";
import { Relogio } from "@/assets/icons/Relogio";
import { useEffect } from "react";

interface Modalprops {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const habilidades = [
  {
    id: 1,
    habilidades: ["Organização", "Comunicação", "Logística", "Telecomunicação"],
  },
];

export default function ModalExibirVoluntario({isOpen,setIsOpen,}: Modalprops) {
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
  if (!isOpen) return null;

  return (
    <div className={style.modal__overlay} onClick={() => setIsOpen(false)}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <div className={style.modal__header}>
          <h1>Nome Voluntario</h1>
          <Fechar onClick={() => setIsOpen(false)} />
        </div>

        <div className={style.modal__body}>
          <div className={style.about}>
            <p>Sobre</p>
            <span>
              Descrição Descrição Descrição Descrição Descrição
              DescriçãoDescrição Descrição
            </span>
          </div>
          <div className={style.card__habilities}>
            <p>Habilidades</p>
            <div className={style.habilities}>
              {habilidades
                .flatMap((item) => item.habilidades.slice(0, 2))
                .map((hab, i) => (
                  <div key={i} className={style.badge}>
                    <span>{hab}</span>
                  </div>
                ))}
              {habilidades.some((item) => item.habilidades.length > 2) && (
                <div className={style.badge}>
                  <span>
                    +
                    {habilidades.reduce(
                      (acc, item) =>
                        acc + Math.max(item.habilidades.length - 3, 0),
                      0
                    )}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className={style.location__phone}>
            <div className={style.location}>
              <p>Localização</p>
              <span>asdasdad</span>
            </div>
            <div className={style.phone}>
              <p>Telefone</p>
              <span>asdasdadas</span>
            </div>
          </div>

          <div className={style.project}>
            <div className={style.project__header}>
              <Usuario className={style.icon} />
              <p>Convidar para projetos</p>
            </div>

            <div className={style.project__body}>
              {[1, 2, 3].map((id) => (
                <div key={id} className={style.card}>
                  <div className={style.card__header}>
                    <h1>Nome Projeto</h1>
                  </div>
                  <div className={style.card__body}>
                    <div className={style.description}>
                      <p>
                        585858585858 585858 585858 858 858 858858858858
                        858858858858858858858858858858858858858858858 858
                        85885885 85885885 85885885 85885885 85885885 85885885
                        vv85885885 85885885 85885885 85885885 85885885 85885885
                        85885885 85885885 85885885 85885885v858858858858858
                      </p>
                    </div>
                    <div className={style.date__hour}>
                      <Relogio className={style.icon} />
                      <p>Inicio: dd/mm/aaaa, 00:00</p>
                    </div>
                  </div>
                  <div className={style.card__footer}>
                    <button className={style.buttonConvidar}>
                      <Convite className={style.icon} />
                      Convidar para esse projeto
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
