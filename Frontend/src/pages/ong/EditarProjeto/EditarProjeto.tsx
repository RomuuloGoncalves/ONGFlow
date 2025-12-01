import { useEffect, useState } from "react";
import { Menor } from "@/assets/icons/Menor";
import style from "./EditarProjeto.module.css";
import SelectInput from "@/components/Voluntario/MultiSelect";
import DateCalendar from "@/components/ui/DateCalendar";
import { Fechar } from "@/assets/icons/Fechar";
import { Salvar } from "@/assets/icons/Salvar";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProjeto,
  updateProjeto,
  getHabilidades,
  getVoluntariosDoProjeto,
  getVoluntariosCompativeis,
  removerVoluntarioDoProjeto,
} from "@/services/projetoService";
import {
  verificarConvitePendente,
  enviarConvite,
  type ConvitePayload,
} from "@/services/conviteService";
import useCustomToast from "@/components/ui/use-toast";
import type { Habilidade } from "@/interfaces/habilidade";
import type { Voluntario } from "@/interfaces/voluntario";
import { Usuario } from "@/assets/icons/Usuario";

function EditarProjeto() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataInicio, setDataInicio] = useState<Date | null>(null);
  const [habilidadesSelecionadas, setHabilidadesSelecionadas] = useState<
    number[]
  >([]);
  const [allHabilidades, setAllHabilidades] = useState<Habilidade[]>([]);
  const [voluntariosNoProjeto, setVoluntariosNoProjeto] = useState<
    Voluntario[]
  >([]);
  const [voluntariosCompatíveis, setVoluntariosCompatíveis] = useState<
    Voluntario[]
  >([]);
  const [voluntariosParaConvidar, setVoluntariosParaConvidar] = useState<
    Voluntario[]
  >([]);

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { showToast } = useCustomToast();

  useEffect(() => {
    const fetchProjectData = async () => {
      if (!id) return;
      try {
        const [
          projetoResponse,
          habilidadesResponse,
          voluntariosProjetoResponse,
          voluntariosCompativeisResponse,
        ] = await Promise.all([
          getProjeto(Number(id)),
          getHabilidades(),
          getVoluntariosDoProjeto(Number(id)),
          getVoluntariosCompativeis(Number(id)),
        ]);

        const projeto = projetoResponse.data;
        setNome(projeto.nome);
        setDescricao(projeto.descricao);
        setDataInicio(new Date(projeto.data_inicio));
        if (projeto.habilidades) {
          setHabilidadesSelecionadas(
            projeto.habilidades.map((h: Habilidade) => h.id)
          );
        }

        setAllHabilidades(habilidadesResponse.data || []);
        setVoluntariosNoProjeto(voluntariosProjetoResponse.data.data || []);
        setVoluntariosCompatíveis(voluntariosCompativeisResponse.data || []);
      } catch (error) {
        console.error("Erro ao carregar dados do projeto:", error);
        showToast("Falha ao carregar dados do projeto", "error");
      }
    };

    fetchProjectData();
  }, [id, showToast]);

  const handleSalvarProjeto = async () => {
    if (!id) return;

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const idOng = user.id;

    if (!nome || !descricao || !dataInicio) {
      showToast("Todos os campos obrigatórios devem ser preenchidos.", "error");
      return;
    }

    const habilidadesDescricoes = habilidadesSelecionadas
      .map((id) => {
        const habilidade = allHabilidades.find((h) => h.id === id);
        return habilidade ? habilidade.descricao : "";
      })
      .filter(Boolean);

    const payload = {
      nome,
      descricao,
      data_inicio: dataInicio.toISOString().split("T")[0],
      id_ong: idOng,
      habilidades: habilidadesDescricoes,
    };

    try {
      await updateProjeto(Number(id), payload);

      for (const voluntario of voluntariosParaConvidar) {
        const convitePayload: ConvitePayload = {
          iniciador: "ong",
          status: "pendente",
          mensagem: `A ONG ${user.name} te convidou para o projeto ${nome}`,
          id_ong: idOng,
          id_voluntario: voluntario.id,
          id_projeto: Number(id),
        };
        await enviarConvite(convitePayload);
      }

      showToast(
        "Projeto atualizado e convites enviados com sucesso!",
        "success"
      );
      navigate("/projetos/ong");
    } catch (error) {
      console.error("Erro ao salvar o projeto:", error);
      showToast("Erro ao salvar projeto. Tente novamente.", "error");
    }
  };

  const handleConvidar = async (voluntario: Voluntario) => {
    if (!id) return;
    try {
      const response = await verificarConvitePendente(
        Number(id),
        voluntario.id
      );
      if (response.data.status) {
        showToast("Esse voluntário já possue um convite pendente", "error");
      } else {
        setVoluntariosParaConvidar((prev) => [...prev, voluntario]);
        setVoluntariosCompatíveis((prev) =>
          prev.filter((v) => v.id !== voluntario.id)
        );
      }
    } catch (error) {
      console.error("Erro ao verificar convite pendente:", error);
      showToast("Erro ao verificar convite. Tente novamente.", "error");
    }
  };

  const handleCancelarConvite = (voluntario: Voluntario) => {
    setVoluntariosCompatíveis((prev) => [...prev, voluntario]);
    setVoluntariosParaConvidar((prev) =>
      prev.filter((v) => v.id !== voluntario.id)
    );
  };

  const handleRemover = async (voluntario: Voluntario) => {
    if (!id) return;
    try {
      await removerVoluntarioDoProjeto(Number(id), voluntario.id);
      showToast(`${voluntario.nome} foi removido do projeto.`, "success");
      const [voluntariosProjetoResponse, voluntariosCompativeisResponse] =
        await Promise.all([
          getVoluntariosDoProjeto(Number(id)),
          getVoluntariosCompativeis(Number(id)),
        ]);
      setVoluntariosNoProjeto(voluntariosProjetoResponse.data.data || []);
      setVoluntariosCompatíveis(voluntariosCompativeisResponse.data || []);
    } catch (error) {
      console.error("Erro ao remover voluntário:", error);
      showToast("Erro ao remover voluntário.", "error");
    }
  };

  return (
    <div className={style.main}>
      <div
        className={style.actionButton}
        onClick={() => navigate("/projetos/ong")}
      >
        <Menor className={style.icon} />
        <p>Voltar para lista de projetos</p>
      </div>

      <div className={style.title}>
        <h1>Editar Projeto</h1>
      </div>

      <div className={style.container__form}>
        <div className={style.form}>
          <div className={style.form__header}>
            <h1>Editar Informações</h1>
          </div>

          <div className={style.form__body}>
            <div className={style.name}>
              <label>Nome do projeto</label>
              <input
                type="text"
                placeholder="Digite o nome do projeto"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div className={style.description}>
              <label>Descrição</label>
              <textarea
                placeholder="Dê uma descrição para o projeto"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>

            <div className={style.habilities}>
              <SelectInput
                options={allHabilidades}
                value={habilidadesSelecionadas}
                onChange={(values: number[]) =>
                  setHabilidadesSelecionadas(values)
                }
              />
            </div>

            <div className={style.date__time}>
              <div className={style.date}>
                <label>Data Início</label>
                <DateCalendar value={dataInicio} onChange={setDataInicio} />
              </div>
            </div>
          </div>

          <div className={style.form__footer}>
            <button
              className={`${style.button} ${style.buttonCancel}`}
              onClick={() => navigate("/projetos/ong")}
            >
              <Fechar />
              Cancelar
            </button>
            <button
              onClick={handleSalvarProjeto}
              className={`${style.button} ${style.buttonSave}`}
            >
              <Salvar />
              Salvar
            </button>
          </div>
        </div>

        <div className={style.container__list}>
          {/* Voluntários a Convidar */}
          {voluntariosParaConvidar.length > 0 && (
            <div className={style.list__voluntarios_convidar}>
              <div className={style.list__header}>
                <Usuario />
                <p>Voluntários a Convidar</p>
              </div>
              <div className={style.list__body}>
                {voluntariosParaConvidar.map((vol) => (
                  <div key={vol.id} className={style.card}>
                    <div className={style.card__header}>
                      <h1>{vol.nome}</h1>
                      <p
                        className={style.cancelarButton}
                        onClick={() => handleCancelarConvite(vol)}
                      >
                        Cancelar
                      </p>
                    </div>
                    <div className={style.card__body}>
                      <p>Habilidades:</p>
                      <div className={style.habilities}>
                        {(vol.habilidades || []).slice(0, 3).map((hab, i) => (
                          <div
                            key={i}
                            className={style.badge}
                            title={hab.descricao}
                          >
                            <span>{hab.descricao}</span>
                          </div>
                        ))}
                        {(vol.habilidades?.length || 0) > 3 && (
                          <div className={style.badge}>
                            <span>+{(vol.habilidades?.length || 0) - 3}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Voluntários no Projeto */}
          <div className={style.list__voluntarios_selecionados}>
            <div className={style.list__header}>
              <Usuario />
              <p>Voluntários no Projeto</p>
            </div>
            <div className={style.list__body}>
              {Array.isArray(voluntariosNoProjeto) &&
                voluntariosNoProjeto.map((vol) => (
                  <div key={vol.id} className={style.card}>
                    <div className={style.card__header}>
                      <h1>{vol.nome}</h1>
                      <p
                        className={style.removerButton}
                        onClick={() => handleRemover(vol)}
                      >
                        Remover
                      </p>
                    </div>
                    <div className={style.card__body}>
                      <p>Habilidades:</p>
                      <div className={style.habilities}>
                        {(vol.habilidades || []).map((hab: any, i: number) => (
                          <div
                            key={i}
                            className={style.badge}
                            title={hab.descricao}
                          >
                            <span>{hab.descricao}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Voluntários Compatíveis */}
          <div className={style.list__voluntarios_compativeis}>
            <div className={style.list__header}>
              <Usuario />
              <p>Voluntários Compatíveis</p>
            </div>
            <div className={style.list__body}>
              {Array.isArray(voluntariosCompatíveis) &&
                voluntariosCompatíveis.map((vol: Voluntario) => (
                  <div key={vol.id} className={style.card}>
                    <div className={style.card__header}>
                      <h1>{vol.nome}</h1>
                      <p
                        className={style.convidarButton}
                        onClick={() => handleConvidar(vol)}
                      >
                        Convidar
                      </p>
                    </div>
                    <div className={style.card__body}>
                      <p>Habilidades:</p>
                      <div className={style.habilities}>
                        {(vol.habilidades || []).map((hab: any, i: number) => (
                          <div
                            key={i}
                            className={style.badge}
                            title={hab.descricao}
                          >
                            <span>{hab.descricao}</span>
                          </div>
                        ))}
                      </div>
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

export default EditarProjeto;
