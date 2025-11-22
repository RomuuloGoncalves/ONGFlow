"use client";

import { DateField } from "@/components/ui/datefield-rac";
import React from "react";

interface DateCalendarProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
}

export default function DateCalendar({ value, onChange }: DateCalendarProps) {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateString = e.target.value;
    if (dateString) {
      // Create date in local timezone to avoid off-by-one day issues
      const [year, month, day] = dateString.split('-').map(Number);
      const newDate = new Date(year, month - 1, day);
      onChange(newDate);
    } else {
      onChange(null);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <DateField className="*:not-first:mt-2">
        <input
          type="date"
          value={value ? value.toISOString().split("T")[0] : ""}
          onChange={handleDateChange}
          className="border rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </DateField>
    </div>
  );
}
