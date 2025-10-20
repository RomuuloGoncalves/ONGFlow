import { useId } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SelectSimpleProps {
  value: string
  onChange: (valor: string) => void
}

export default function SelectSimple({ value, onChange }: SelectSimpleProps) {
  const id = useId()

  return (
    <div className="*:not-first:mt-2" style={{outline: "none"}}>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={id}>
          <SelectValue placeholder="Categorias" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Todos">Todos</SelectItem>
          <SelectItem value="Pendente">Pendente</SelectItem>
          <SelectItem value="Andamento">Andamento</SelectItem>
          <SelectItem value="Concluido">Concluído</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
