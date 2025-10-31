import { Label } from "@/components/ui/label";
import MultipleSelector from "@/components/ui/multiselect";
import type { Option } from "@/components/ui/multiselect";

const habilities: Option[] = [
  { value: "Comunicação interpessoal", label: "Comunicação interpessoal" },
  { value: "Empatia", label: "Empatia" },
  { value: "Trabalho em equipe", label: "Trabalho em equipe" },
  { value: "Gestão de projetos", label: "Gestão de projetos" },
  { value: "Coordenação de voluntários", label: "Coordenação de voluntários" },
  { value: "Design gráfico", label: "Design gráfico" },
  { value: "Criação de conteúdo digital", label: "Criação de conteúdo digital" },
  { value: "Sustentabilidade e ecologia", label: "Sustentabilidade e ecologia" },
  { value: "Conscientização ambiental", label: "Conscientização ambiental" },
];

export default function SelectInput({ onChange }: { onChange?: (values: string[]) => void }) {
  const handleChange = (selected: Option[]) => {
    const values = selected.map((opt) => opt.label);
    onChange?.(values);
  };

  return (
    <div className="*:not-first:mt-2">
      <Label>Habilidades</Label>
      <MultipleSelector
        commandProps={{ label: "Selecione suas Habilidades" }}
        defaultOptions={habilities}
        placeholder="Selecione suas habilidades"
        onChange={handleChange}
        hideClearAllButton
        hidePlaceholderWhenSelected
        emptyIndicator={<p className="text-center text-sm">Sem resultados encontrados</p>}
      />
    </div>
  );
}
