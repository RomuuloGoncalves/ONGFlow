"use client";

import { TimeField, DateInput } from "@/components/ui/datefield-rac";
import { useState } from "react";

interface ClockProps {
  onChange?: (time: string) => void;
}

export default function Clock({ onChange }: ClockProps) {
  const [time, setTime] = useState<string>("");

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    setTime(newTime);
    onChange?.(newTime);
  };

  return (
    <div className="flex flex-col gap-2">
      <TimeField className="*:not-first:mt-2">
        <input
          type="time"
          value={time}
          onChange={handleTimeChange}
          className="border rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </TimeField>
    </div>
  );
}
