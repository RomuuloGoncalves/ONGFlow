import { Label } from "@/components/ui/label";
import MultipleSelector, { type Option } from "@/components/ui/multiselect";

interface SelectInputProps {
  options?: string[];
  value?: string[];
  onChange?: (values: string[]) => void;
}

export default function SelectInput({ 
  options = [], 
  value = [], 
  onChange 
}: SelectInputProps) {
  
  // Converte as opções de string[] para Option[]
  const mappedOptions: Option[] = options.map(opt => ({ value: opt, label: opt }));
  
  // Converte os valores selecionados de string[] para Option[]
  const selectedValues: Option[] = value.map(v => ({ value: v, label: v }));

  const handleChange = (selected: Option[]) => {
    // Converte de volta para string[] antes de notificar o componente pai
    const values = selected.map((opt) => opt.label);
    onChange?.(values);
  };

  return (
    <div className="*:not-first:mt-2">
      <Label>Habilidades</Label>
      <MultipleSelector
        commandProps={{ label: "Selecione as Habilidades" }}
        defaultOptions={mappedOptions}
        placeholder="Selecione as habilidades necessárias"
        value={selectedValues}
        onChange={handleChange}
        hideClearAllButton
        hidePlaceholderWhenSelected
        emptyIndicator={<p className="text-center text-sm">Sem resultados encontrados</p>}
      />
    </div>
  );
}
