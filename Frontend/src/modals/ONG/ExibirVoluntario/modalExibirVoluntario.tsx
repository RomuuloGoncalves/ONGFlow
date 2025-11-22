import { Fechar } from "@/assets/icons/Fechar";
import { Convite } from "@/assets/icons/Convite";
import style from "./modalExibirVoluntario.module.css";
import { Usuario } from "@/assets/icons/Usuario";
import { Relogio } from "@/assets/icons/Relogio";
import { useEffect, useState } from "react";
import api from "@/services/api";
import useCustomToast from "@/components/ui/use-toast";
import Loading from "@/components/Loading/Loading";
import { enviarConvite } from "@/services/conviteService";

interface Voluntario {
  id: number;
  nome: string;
  bio: string;
  status: string;
  telefone: string;
  habilidades: { descricao: string }[];
  endereco?: {
    cidade: string;
    estado: string;
  };
}

interface Projeto {
  id: number;
  nome: string;
  descricao: string;
  data_inicio: string;
  id_ong: number;
}

interface Modalprops {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  voluntario: Voluntario | null;
}

export default function ModalExibirVoluntario({
  isOpen,
  setIsOpen,
  voluntario,
}: Modalprops) {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [isLoadingProjetos, setIsLoadingProjetos] = useState(false);
  const [convitesEnviados, setConvitesEnviados] = useState<number[]>([]);
  const { showToast } = useCustomToast();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const fetchProjetos = async () => {
        setIsLoadingProjetos(true);
        try {
          const userData = localStorage.getItem("user");
          if (userData) {
            const user = JSON.parse(userData);
            const response = await api.get(`/ongs/${user.id}/projetos`);
            setProjetos(response.data);
          } else {
             throw new Error("Usuário não encontrado no localStorage");
          }
        } catch (error) {
          console.log(error);
          showToast("Erro ao carregar os projetos da ONG.", "error");
        } finally {
          setIsLoadingProjetos(false);
        }
      };
      fetchProjetos();
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, showToast]);

  const handleEnviarConvite = async (projeto: Projeto) => {
    if (!voluntario) return;

    const payload = {
      iniciador: "ong" as const,
      status: "pendente" as const,
      mensagem: `Você foi convidado para o projeto: ${projeto.nome}`,
      id_ong: projeto.id_ong,
      id_voluntario: voluntario.id,
      id_projeto: projeto.id,
    };

    try {
      await enviarConvite(payload);
      showToast("Convite enviado com sucesso!", "success");
      setConvitesEnviados((prev) => [...prev, projeto.id]);
    } catch (error) {
      console.error(error);
      showToast("Erro ao enviar convite. Tente novamente.", "error");
    }
  };

  if (!isOpen || !voluntario) return null;

  return (
    <div className={style.modal__overlay} onClick={() => setIsOpen(false)}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <div className={style.modal__header}>
          <h1>{voluntario.nome}</h1>
          <Fechar onClick={() => setIsOpen(false)} />
        </div>

        <div className={style.modal__body}>
          <div className={style.about}>
            <p>Sobre</p>
            <span>{voluntario.bio}</span>
          </div>
          <div className={style.card__habilities}>
            <p>Habilidades</p>
            <div className={style.habilities}>
              {(voluntario.habilidades || []).slice(0, 3).map((hab, i) => (
                <div key={i} className={style.badge}>
                  <span>{hab.descricao}</span>
                </div>
              ))}
              {(voluntario.habilidades?.length || 0) > 3 && (
                <div className={style.badge}>
                  <span>+{(voluntario.habilidades?.length || 0) - 3}</span>
                </div>
              )}
            </div>
          </div>

          <div className={style.location__phone}>
            <div className={style.location}>
              <p>Localização</p>
              <span>
                {voluntario.endereco
                  ? `${voluntario.endereco.cidade} - ${voluntario.endereco.estado}`
                  : "Não informado"}
              </span>
            </div>
            <div className={style.phone}>
              <p>Telefone</p>
              <span>{voluntario.telefone}</span>
            </div>
          </div>

          <div className={style.project}>
            <div className={style.project__header}>
              <Usuario className={style.icon} />
              <p>Convidar para projetos</p>
            </div>

            <div className={style.project__body}>
              {isLoadingProjetos ? (
                <Loading />
              ) : projetos.length > 0 ? (
                projetos.map((projeto) => (
                  <div key={projeto.id} className={style.card}>
                    <div className={style.card__header}>
                      <h1>{projeto.nome}</h1>
                    </div>
                    <div className={style.card__body}>
                      <div className={style.description}>
                        <p>{projeto.descricao}</p>
                      </div>
                      <div className={style.date__hour}>
                        <Relogio className={style.icon} />
                        <p>
                          Início:{" "}
                          {new Date(projeto.data_inicio).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className={style.card__footer}>
                      <button
                        className={style.buttonConvidar}
                        onClick={() => handleEnviarConvite(projeto)}
                        disabled={convitesEnviados.includes(projeto.id)}
                      >
                        <Convite className={style.icon} />
                        {convitesEnviados.includes(projeto.id)
                          ? "Convite Enviado"
                          : "Convidar para esse projeto"}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>Nenhum projeto ativo encontrado para esta ONG.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
