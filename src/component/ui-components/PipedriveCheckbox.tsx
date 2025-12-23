import type React from "react";
import { Checkbox } from "primereact/checkbox";

interface PDCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  error?: string;
}

const PDCheckbox: React.FC<PDCheckboxProps> = ({
  label,
  checked,
  onChange,
  error,
  disabled = false,
}) => {
  return (
    <div className="pd-checkbox flex items-center gap-2 cursor-pointer">
      <Checkbox
        inputId={label}
        checked={checked}
        onChange={(e) => onChange(!!e.checked)}
        disabled={disabled}
        className="pd-checkbox-box"
        invalid={!!error}
      />
      <label
        htmlFor={label}
        className={`pd-checkbox-label ${disabled ? "opacity-50" : ""}`}
      >
        {label}
      </label>
    </div>
  );
};

export default PDCheckbox;
