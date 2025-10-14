import { useId } from "react"

import { Label } from "@/components/ui/label"
import MultipleSelector, { Option } from "@/components/ui/multiselect"
import { Alvo } from "@/assets/icons/Alvo"

const habilities: Option[] = [
  // 💬 Comunicação
  {
    value: "comunicacao-interpessoal",
    label: "Comunicação interpessoal",
  },
  {
    value: "empatia",
    label: "Empatia",
  },
  {
    value: "trabalho-em-equipe",
    label: "Trabalho em equipe",
  },

  // 🧠 Organizacionais
  {
    value: "planejamento-atividades",
    label: "Planejamento de atividades",
  },
  {
    value: "gestao-projetos",
    label: "Gestão de projetos",
  },
  {
    value: "coordenacao-voluntarios",
    label: "Coordenação de voluntários",
  },

  // 💻 Técnicas
  {
    value: "criacao-conteudo-digital",
    label: "Criação de conteúdo digital",
  },
  {
    value: "design-grafico",
    label: "Design gráfico",
  },
  {
    value: "informatica-basica",
    label: "Informática básica",
  },

  // 💚 Sociais e Comunitárias
  {
    value: "acolhimento-orientacao",
    label: "Acolhimento e orientação",
  },
  {
    value: "educacao-reforco-escolar",
    label: "Educação e reforço escolar",
  },
  {
    value: "conscientizacao-ambiental",
    label: "Conscientização ambiental",
  },

  // 🛠️ Práticas
  {
    value: "jardinagem-horta-comunitaria",
    label: "Jardinagem e horta comunitária",
  },
  {
    value: "cozinha-solidaria",
    label: "Cozinha solidária",
  },
  {
    value: "fotografia-filmagem",
    label: "Fotografia e filmagem de eventos",
  },

  // 🌍 Estratégicas e de Impacto
  {
    value: "lideranca-comunitaria",
    label: "Liderança comunitária",
  },
  {
    value: "resolucao-problemas",
    label: "Resolução de problemas",
  },
  {
    value: "sustentabilidade-ecologia",
    label: "Sustentabilidade e ecologia",
  },
];


export default function Component() {
  const id = useId()
  return (
    <div className="*:not-first:mt-2">
      <div className="d-flex">
        <Alvo/>
        <Label>Habilidades</Label>
      </div>
      <MultipleSelector
        commandProps={{
          label: "Selecione suas Habilidades",
        }}
        value={habilities.slice(0, 2)}
        defaultOptions={habilities}
        placeholder="Selecione suas habilidades"
        hideClearAllButton
        hidePlaceholderWhenSelected
        emptyIndicator={<p className="text-center text-sm">Sem resultados encontrados</p>}
      />
    </div>
  )
}
