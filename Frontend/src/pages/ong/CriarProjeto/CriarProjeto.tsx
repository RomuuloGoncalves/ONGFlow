import { useEffect, useState } from "react";
import { Menor } from "@/assets/icons/Menor";
import style from "./CriarProjeto.module.css";
import SelectInput from "@/components/Voluntario/MultiSelect";
import DateCalendar from "@/components/ui/DateCalendar";
import { Fechar } from "@/assets/icons/Fechar";
import { Salvar } from "@/assets/icons/Salvar";
import { useNavigate } from "react-router-dom";
import { createProjeto, getHabilidades } from "@/services/projetoService";
import useCustomToast from "@/components/ui/use-toast";
import type { Habilidade } from "@/interfaces/habilidade";

function CriarProjeto() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataInicio, setDataInicio] = useState<Date | null>(null);
  const [habilidadesSelecionadas, setHabilidadesSelecionadas] = useState<number[]>([]);
  const [allHabilidades, setAllHabilidades] = useState<Habilidade[]>([]);

  const navigate = useNavigate();
  const { showToast } = useCustomToast();

  useEffect(() => {
    const fetchHabilidades = async () => {
      try {
        const response = await getHabilidades();
        setAllHabilidades(response.data || []);
      } catch (error) {
        console.error("Erro ao carregar habilidades:", error);
        showToast("Falha ao carregar habilidades", "error");
      }
    };
    fetchHabilidades();
  }, [showToast]);

  const handleSalvarProjeto = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const idOng = user.id;

    if (!nome || !descricao || !dataInicio) {
      showToast("Todos os campos obrigatórios devem ser preenchidos.", "error");
      return;
    }

    const habilidadesDescricoes = habilidadesSelecionadas.map(id => {
        const habilidade = allHabilidades.find(h => h.id === id);
        return habilidade ? habilidade.descricao : '' ;
    }).filter(Boolean);

    const payload = {
      nome,
      descricao,
      data_inicio: dataInicio.toISOString().split('T')[0], // Formato YYYY-MM-DD
      id_ong: idOng,
      habilidades: habilidadesDescricoes,
    };

    try {
      await createProjeto(payload);
      showToast("Projeto criado com sucesso!", "success");
      navigate("/projetos/ong");
    } catch (error) {
      console.error("Erro ao criar o projeto:", error);
      showToast("Erro ao criar projeto. Tente novamente.", "error");
    }
  };

  return (
    <div className={style.main}>
      <div className={style.actionButton} onClick={() => navigate("/projetos/ong")}>
        <Menor className={style.icon} />
        <p>Voltar para lista de projetos</p>
      </div>

      <div className={style.title}>
        <h1>Criar Novo Projeto</h1>
      </div>

      <div className={style.container__form}>
        <div className={style.form}>
          <div className={style.form__header}>
            <h1>Crie um Projeto</h1>
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
                onChange={(values) => setHabilidadesSelecionadas(values)}
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
      </div>
    </div>
  );
}

export default CriarProjeto;