"use client";

import { TimeField, DateInput } from "@/components/ui/datefield-rac";
import { useState } from "react";

interface ClockProps {
  onChange?: (value: string) => void;
}

export default function Clock({ onChange }: ClockProps) {
  const [time, setTime] = useState("");

  const handleChange = (e: any) => {
    const value = e.target.value;
    setTime(value);
    if (onChange) onChange(value);
  };

  return (
    <TimeField className="*:not-first:mt-2">
      {/* o DateInput já entende o contexto do TimeField, não precisa de type="time" */}
      <DateInput value={time} onChange={handleChange} />
    </TimeField>
  );
}
