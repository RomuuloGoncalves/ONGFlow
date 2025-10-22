"use client"

import { DateInput, TimeField } from "@/components/ui/datefield-rac"

export default function Component() {
  return (
    <TimeField className="*:not-first:mt-2">
      <DateInput />
    </TimeField>
  )
}
