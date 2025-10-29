"use client";

import "react-calendar/dist/Calendar.css";
import { Value } from "react-calendar/dist/shared/types.js";
import ReactDatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "./date-picker.css";

export function DatePicker({
  isOpen,
  onChange,
  value,
  onClose,
}: {
  isOpen: boolean;
  onChange: (value: Value) => void;
  onClose: () => void;
  value: Value;
}) {
  return (
    <div className="relative w-full">
      <ReactDatePicker
        isOpen={isOpen}
        onChange={onChange}
        value={value}
        className="hidden"
        onCalendarClose={onClose}
      />
    </div>
  );
}
