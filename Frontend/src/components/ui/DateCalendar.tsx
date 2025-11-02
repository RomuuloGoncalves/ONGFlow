"use client";

import { DateField } from "@/components/ui/datefield-rac";
import { useState } from "react";

interface DateCalendarProps {
  onChange?: (date: Date | null) => void;
}

export default function DateCalendar({ onChange }: DateCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value ? new Date(e.target.value) : null;
    setSelectedDate(newDate);
    onChange?.(newDate);
  };

  return (
    <div className="flex flex-col gap-2">
      <DateField className="*:not-first:mt-2">
        <input
          type="date"
          value={selectedDate ? selectedDate.toISOString().split("T")[0] : ""}
          onChange={handleDateChange}
          className="border rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </DateField>
    </div>
  );
}
