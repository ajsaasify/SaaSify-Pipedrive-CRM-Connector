import type React from "react";
import { useState } from "react";
import { Calendar, type CalendarSelectionMode } from "primereact/calendar";
import { classNames } from "primereact/utils";

interface PDDatePickerProps {
  label?: string;
  value: Date | Date[] | null;
  onChange: (value: Date | Date[] | null) => void;
  placeholder?: string;
  required?: boolean;
  error?: boolean;
  maxDate?: Date;
  disabled?: boolean;
  dateFormat?: string;
  selectionMode?: CalendarSelectionMode;
  name?: string;
  validationMessage?: string;
  readOnly?: boolean;
  minDate?: Date;
}

const PDDatePicker: React.FC<PDDatePickerProps> = ({
  label,
  value,
  onChange,
  placeholder = "Select date",
  required,
  error,
  minDate,
  maxDate,
  disabled,
  dateFormat = "dd/mm/yy",
  selectionMode = "single",
  validationMessage,
  readOnly,
  name,
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="flex flex-col gap-1 w-full mb-3">
      {label && (
        // biome-ignore lint/a11y/noLabelWithoutControl: Design choices separate label
        <label className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div
        className={classNames(
          "pd-datepicker-wrapper flex items-center gap-2 border rounded-md px-3 h-9 transition-all cursor-pointer",
          {
            "border-blue-500 shadow-sm": focused,
            "border-[#c5cbd3]": !focused,
            "border-red-500": !!error,
            "opacity-60 cursor-not-allowed": disabled,
          },
        )}
      >
        <Calendar
          value={value}
          onChange={(e) => onChange(e.value as Date)}
          placeholder={placeholder}
          showIcon
          name={name}
          dateFormat={dateFormat}
          disabled={disabled}
          readOnlyInput={readOnly}
          minDate={minDate}
          maxDate={maxDate}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          inputClassName="pd-datepicker-input"
          className="w-full border-none shadow-none"
          selectionMode={selectionMode}
          invalid={!!error}
        />
      </div>

      {error && (
        <small className="text-red-500 text-xs">{validationMessage}</small>
      )}
    </div>
  );
};

export default PDDatePicker;
