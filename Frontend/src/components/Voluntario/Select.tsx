import { useId } from "react"

import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SelectSimple() {
  const id = useId()
  return (
    <div className="*:not-first:mt-2">
      <Select defaultValue="Todos">
        <SelectTrigger id={id}>
          <SelectValue placeholder="Categorias" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Todos">Todos</SelectItem>
          <SelectItem value="Pendente">Pendente</SelectItem>
          <SelectItem value="Andamento">Andamento</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
