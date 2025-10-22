"use client"

import { DateField, DateInput } from "@/components/ui/datefield-rac"

export default function Component() {
  return (
    <DateField className="*:not-first:mt-2">
      <DateInput />
    </DateField>
  )
}
