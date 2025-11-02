"use client";

import { DateField, DateInput } from "@/components/ui/datefield-rac";
import { useState } from "react";

interface DateCalendarProps {
  onChange?: (value: Date | null) => void;
}

export default function DateCalendar({ onChange }: DateCalendarProps) {
  const [date, setDate] = useState<Date | null>(null);

  const handleChange = (e: any) => {
    const value = e.target.value ? new Date(e.target.value) : null;
    setDate(value);
    if (onChange) onChange(value);
  };

  return (
    <DateField className="*:not-first:mt-2">
      <DateInput
        value={date ? date.toISOString().split("T")[0] : ""}
        onChange={handleChange}
      />
    </DateField>
  );
}
