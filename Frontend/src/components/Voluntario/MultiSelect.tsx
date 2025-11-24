import { Label } from "@/components/ui/label";
import MultipleSelector, { type Option } from "@/components/ui/multiselect";
import type { Habilidade } from "@/interfaces/habilidade";

interface SelectInputProps {
  options?: Habilidade[];
  value?: number[];
  onChange?: (values: number[]) => void;
}
// console.log("HABILIDADES", habilidades)

export default function SelectInput({
  options = [],
  value = [],
  onChange
}: SelectInputProps) {

  const mappedOptions: Option[] = options.map(opt => ({
    value: String(opt.id),
    label: opt.descricao
  }));

  const selectedValues: Option[] = value.map(v => ({
    value: String(v),
    label: options.find(opt => opt.id === v)?.descricao || ""
  }));

  const handleChange = (selected: Option[]) => {
    const values = selected.map(opt => Number(opt.value));
    onChange?.(values);
  };

  return (
    <div className="*:not-first:mt-2">
      <Label>Habilidades</Label>
      <MultipleSelector
        commandProps={{ label: "Selecione as Habilidades" }}
        options={mappedOptions}
        placeholder="Selecione as habilidades"
        value={selectedValues}
        onChange={handleChange}
        hideClearAllButton
        hidePlaceholderWhenSelected
        emptyIndicator={
          <p className="text-center text-sm">Sem resultados encontrados</p>
        }
      />
    </div>
  );
}
