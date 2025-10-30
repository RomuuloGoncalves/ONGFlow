import { Fechar } from "@/assets/icons/Fechar";
import style from "./modalProjetosAndamento.module.css";
import { Usuario } from "@/assets/icons/Usuario";
import { Lapis } from "@/assets/icons/Lapis";
import { Lixo } from "@/assets/icons/Lixo";

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
function modalProjetosAndamento({ isOpen, setIsOpen }: Modalprops) {
  if (!isOpen) return null;

  return (
    <div className={style.modal__overlay} onClick={() => setIsOpen(false)}>
      <div className={style.modal}  onClick={(e) => e.stopPropagation()}>
        <div className={style.modal__header}>
          <h1>Titulo do Projeto</h1>
          <Fechar onClick={() => setIsOpen(false)} className={style.icon} />
        </div>

        <div className={style.modal__body}>
          <div className={style.description}>
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
          <div className={style.location__status}>
            <div className={style.location}>
              <p>Localização</p>
              <span>asdasdad</span>
            </div>
            <div className={style.status}>
              <p>Status</p>
              <div className={style.tag}>
                <span>Andamento</span>
              </div>
            </div>
          </div>
        </div>
        <div className={style.modal__footer}>
          <button className={style.buttonEdit}>
            <Lapis />
            Editar
          </button>
          <button className={style.buttonDelete}>
            <Lixo />
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

export default modalProjetosAndamento;
