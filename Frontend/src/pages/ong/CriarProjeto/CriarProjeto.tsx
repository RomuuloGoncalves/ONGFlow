import { useState } from "react";
import { Menor } from "@/assets/icons/Menor";
import style from "./CriarProjeto.module.css";
import SelectInput from "@/components/Voluntario/MultiSelect";
import DateCalendar from "@/components/ui/DateCalendar";
import Clock from "@/components/ui/Clock";
import { Fechar } from "@/assets/icons/Fechar";
import { Salvar } from "@/assets/icons/Salvar";
import { Usuario } from "@/assets/icons/Usuario";
import { useNavigate } from "react-router-dom";

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

function CriarProjeto() {
  const [habilidadesSelecionadas, setHabilidadesSelecionadas] = useState<string[]>([]);
  const [voluntariosCompatíveis, setVoluntariosCompatíveis] = useState<any[]>([]);
  const [voluntariosSelecionados, setVoluntariosSelecionados] = useState<any[]>([]);
  const navigate = useNavigate();
  // 🔹 Exibir listas apenas se houver dados
  const mostrarListaCompatíveis = habilidadesSelecionadas.length > 0;
  const mostrarListaSelecionados = voluntariosSelecionados.length > 0;

  // 🔹 Atualiza habilidades e filtra voluntários
  const handleSelectHabilidades = (habs: string[]) => {
    setHabilidadesSelecionadas(habs);

    const filtrados = VOLUNTARIOS_FAKE.filter((vol) =>
      vol.habilidades.some((hab) => habs.includes(hab))
    );

    setVoluntariosCompatíveis(filtrados);
  };

  // 🔹 Convidar voluntário (adiciona à lista de selecionados)
  const handleConvidar = (voluntario: any) => {
    if (!voluntariosSelecionados.some((v) => v.id === voluntario.id)) {
      setVoluntariosSelecionados([...voluntariosSelecionados, voluntario]);
      console.log("Voluntário convidado:", voluntario);
    }
  };

  // 🔹 Remover voluntário
  const handleRemover = (id: number) => {
    const atualizados = voluntariosSelecionados.filter((v) => v.id !== id);
    setVoluntariosSelecionados(atualizados);
    console.log("Voluntário removido:", id);
  };

  // 🔹 “Cadastro fake” (simula salvar projeto)
  const handleSalvarProjeto = () => {
    const projetoFake = {
      nome: "Exemplo de Projeto",
      habilidades: habilidadesSelecionadas,
      voluntariosSelecionados,
    };
    console.log("Projeto cadastrado:", projetoFake);
    alert("Projeto criado com sucesso! Veja no console.log");
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
        {/* FORMULÁRIO */}
        <div className={style.form}>
          <div className={style.form__header}>
            <h1>Crie um Projeto</h1>
          </div>

          <div className={style.form__body}>
            <div className={style.name}>
              <label>Nome do projeto</label>
              <input type="text" placeholder="Digite o nome do projeto" />
            </div>

            <div className={style.description}>
              <label>Descrição</label>
              <textarea placeholder="Dê uma descrição para o projeto" />
            </div>

            {/* SelectInput recebe callback */}
            <div className={style.habilities}>
              <SelectInput onChange={handleSelectHabilidades} />
            </div>

            <div className={style.location}>
              <label>Localização</label>
              <input type="text" placeholder="Digite a localização do projeto" />
            </div>

            <div className={style.date__time}>
              <div className={style.date}>
                <label>Data Início</label>
                <DateCalendar />
              </div>
              <div className={style.time}>
                <label>Hora Início</label>
                <Clock />
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
          <div
            className={style.list__voluntarios_selecionados}
            style={{ display: mostrarListaSelecionados ? "flex" : "none" }}
          >
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

          {/* Voluntários Compatíveis */}
          <div
            className={style.list__voluntarios_compativeis}
            style={{ display: mostrarListaCompatíveis ? "flex" : "none" }}
          >
            <div className={style.list__header}>
              <Usuario />
              <p>Voluntários Compatíveis</p>
            </div>
            <div className={style.list__body}>
              {voluntariosCompatíveis.length > 0 ? (
                voluntariosCompatíveis.map((vol) => (
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
                ))
              ) : (
                <p style={{ padding: "1rem",color: "#585858" }}>
                  Nenhum voluntário compatível encontrado.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CriarProjeto;
