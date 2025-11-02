import { useEffect, useState } from "react";
import { Menor } from "@/assets/icons/Menor";
import style from "./EditarProjeto.module.css";
import SelectInput from "@/components/Voluntario/MultiSelect";
import DateCalendar from "@/components/ui/DateCalendar";
import Clock from "@/components/ui/Clock";
import { Fechar } from "@/assets/icons/Fechar";
import { Salvar } from "@/assets/icons/Salvar";
import { Usuario } from "@/assets/icons/Usuario";

// 🔹 Dados falsos de voluntários
const VOLUNTARIOS_FAKE = [
  {
    id: 1,
    nome: "Ana Souza",
    habilidades: ["Comunicação interpessoal", "Empatia", "Trabalho em equipe"],
  },
  {
    id: 2,
    nome: "Carlos Lima",
    habilidades: ["Gestão de projetos", "Coordenação de voluntários"],
  },
  {
    id: 3,
    nome: "Marina Costa",
    habilidades: ["Design gráfico", "Criação de conteúdo digital"],
  },
  {
    id: 4,
    nome: "Paulo Henrique",
    habilidades: ["Sustentabilidade e ecologia"],
  },
];

// 🔹 Exemplo de projeto já existente
const PROJETO_EXISTENTE = {
  nome: "Mutirão de Limpeza Urbana",
  descricao: "Projeto voltado à limpeza e conscientização ambiental na cidade.",
  localizacao: "Praça Central - Belo Horizonte",
  dataInicio: new Date("2025-11-10"),
  horaInicio: "09:30",
  habilidades: ["Sustentabilidade e ecologia"],
  voluntariosSelecionados: [
    {
      id: 4,
      nome: "Paulo Henrique",
      habilidades: ["Sustentabilidade e ecologia"],
    },
  ],
};

function EditarProjeto() {
  const [nome, setNome] = useState(PROJETO_EXISTENTE.nome);
  const [descricao, setDescricao] = useState(PROJETO_EXISTENTE.descricao);
  const [localizacao, setLocalizacao] = useState(PROJETO_EXISTENTE.localizacao);
  const [dataInicio, setDataInicio] = useState<Date | null>(
    PROJETO_EXISTENTE.dataInicio
  );
  const [horaInicio, setHoraInicio] = useState(PROJETO_EXISTENTE.horaInicio);
  const [habilidadesSelecionadas, setHabilidadesSelecionadas] = useState<
    string[]
  >(PROJETO_EXISTENTE.habilidades);
  const [voluntariosSelecionados, setVoluntariosSelecionados] = useState<any[]>(
    PROJETO_EXISTENTE.voluntariosSelecionados
  );
  const [voluntariosCompatíveis, setVoluntariosCompatíveis] = useState<any[]>(
    []
  );

  // 🔹 Atualiza lista de compatíveis sempre que habilidades mudam
  useEffect(() => {
    const filtrados = VOLUNTARIOS_FAKE.filter(
      (vol) =>
        vol.habilidades.some((hab) => habilidadesSelecionadas.includes(hab)) &&
        !voluntariosSelecionados.some((sel) => sel.id === vol.id)
    );
    setVoluntariosCompatíveis(filtrados);
  }, [habilidadesSelecionadas, voluntariosSelecionados]);


  // 🔹 Convidar voluntário (move dos compatíveis para selecionados)
  const handleConvidar = (voluntario: any) => {
    if (!voluntariosSelecionados.some((v) => v.id === voluntario.id)) {
      setVoluntariosSelecionados([...voluntariosSelecionados, voluntario]);
      setVoluntariosCompatíveis(
        voluntariosCompatíveis.filter((v) => v.id !== voluntario.id)
      );
      console.log("✅ Voluntário adicionado:", voluntario.nome);
    }
  };

  // 🔹 Remover voluntário (volta para lista compatível se ainda for relevante)
  const handleRemover = (id: number) => {
    const removido = voluntariosSelecionados.find((v) => v.id === id);
    const atualizados = voluntariosSelecionados.filter((v) => v.id !== id);
    setVoluntariosSelecionados(atualizados);

    if (
      removido &&
      habilidadesSelecionadas.some((hab) => removido.habilidades.includes(hab))
    ) {
      setVoluntariosCompatíveis([...voluntariosCompatíveis, removido]);
    }

    console.log("🗑️ Voluntário removido:", removido?.nome);
  };

  // 🔹 Simula salvar o projeto atualizado
  const handleSalvarProjeto = () => {
    const projetoAtualizado = {
      nome,
      descricao,
      localizacao,
      dataInicio: dataInicio ? dataInicio.toLocaleDateString("pt-BR") : "",
      horaInicio,
      habilidades: habilidadesSelecionadas,
      voluntariosSelecionados,
    };

    console.log("📦 Projeto atualizado com sucesso!");
    console.log(projetoAtualizado);
    alert("Projeto atualizado com sucesso! Veja no console.log ✅");
  };

  return (
    <div className={style.main}>
      <div className={style.actionButton}>
        <Menor className={style.icon} />
        <p>Voltar para lista de projetos</p>
      </div>

      <div className={style.title}>
        <h1>Editar Projeto</h1>
      </div>

      <div className={style.container__form}>
        {/* FORMULÁRIO */}
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

            {/* SelectInput */}
            <div className={style.habilities}>
              <SelectInput
                onChange={(values) => setHabilidadesSelecionadas(values)}
              />{" "}
            </div>

            <div className={style.location}>
              <label>Localização</label>
              <input
                type="text"
                placeholder="Digite a localização do projeto"
                value={localizacao}
                onChange={(e) => setLocalizacao(e.target.value)}
              />
            </div>

            <div className={style.date__time}>
              <div className={style.date}>
                <label>Data Início</label>
                <DateCalendar onChange={(value) => setDataInicio(value)} />
              </div>
              <div className={style.time}>
                <label>Hora Início</label>
                <Clock onChange={(value) => setHoraInicio(value)} />
              </div>
            </div>
          </div>

          <div className={style.form__footer}>
            <button className={`${style.button} ${style.buttonCancel}`}>
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

        {/* LISTAS */}
        <div className={style.container__list}>
          {/* Voluntários Selecionados */}
          {voluntariosSelecionados.length > 0 && (
            <div className={style.list__voluntarios_selecionados}>
              <div className={style.list__header}>
                <Usuario />
                <p>Voluntários Selecionados</p>
              </div>
              <div className={style.list__body}>
                {voluntariosSelecionados.map((vol) => (
                  <div key={vol.id} className={style.card}>
                    <div className={style.card__header}>
                      <h1>{vol.nome}</h1>
                      <p
                        className={style.removerButton}
                        onClick={() => handleRemover(vol.id)}
                      >
                        Remover
                      </p>
                    </div>
                    <div className={style.card__body}>
                      <p>Habilidades:</p>
                      <div className={style.habilities}>
                        {vol.habilidades.map((hab: string, i: number) => (
                          <div key={i} className={style.badge}>
                            <span>{hab}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Voluntários Compatíveis */}
          {voluntariosCompatíveis.length > 0 && (
            <div className={style.list__voluntarios_compativeis}>
              <div className={style.list__header}>
                <Usuario />
                <p>Voluntários Compatíveis</p>
              </div>
              <div className={style.list__body}>
                {voluntariosCompatíveis.map((vol) => (
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
                        {vol.habilidades.map((hab: string, i: number) => (
                          <div key={i} className={style.badge}>
                            <span>{hab}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditarProjeto;
