import { Fechar } from "@/assets/icons/Fechar";
import style from "./modalProjetosAndamento.module.css";
import { Lapis } from "@/assets/icons/Lapis";
import { Lixo } from "@/assets/icons/Lixo";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import type { Projeto } from "@/interfaces/projeto";
import { finalizarProjeto } from "@/services/projetoService";
import useCustomToast from "@/components/ui/use-toast";

interface Modalprops {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  projeto: Projeto | null;
}

function ModalProjetosAndamento({ isOpen, setIsOpen, projeto }: Modalprops) {
  const { showToast } = useCustomToast();

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

  const handleFinalizar = async () => {
    if (projeto) {
      try {
        await finalizarProjeto(projeto.id);
        showToast("Projeto finalizado com sucesso!", "success");
        setIsOpen(false);
      } catch (error) {
        showToast("Erro ao finalizar projeto", "error");
      }
    }
  };

  return (
    <div className={style.modal__overlay} onClick={() => setIsOpen(false)}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <div className={style.modal__header}>
          <h1>{projeto.nome}</h1>
          <Fechar onClick={() => setIsOpen(false)} className={style.icon} />
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
        </div>
        <div className={style.modal__footer}>
          <Link
            to={`/editar/projeto/ong/${projeto.id}`}
            className={`${style.buttonEdit} ${style.button}`}
          >
            <Lapis />
            Editar
          </Link>
          <button className={` ${style.buttonDelete} ${style.button}`}>
            <Lixo />
            Excluir
          </button>
          <button onClick={handleFinalizar} className={` ${style.buttonFinalizar} ${style.button}`}>
            Finalizar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalProjetosAndamento;
