import React from "react";
import { Checkbox } from "primereact/checkbox";
import { PDCheckboxSize } from "@template/enum/pipedrive.enum";

type PDCheckboxProps = {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  size?: PDCheckboxSize;
  onChange?: (checked: boolean) => void;
  className?: string;
};

const PDCheckbox: React.FC<PDCheckboxProps> = ({
  label,
  checked = false,
  disabled = false,
  size = PDCheckboxSize.MEDIUM,
  className = "",
  onChange,
}) => {
  const sizeClass = {
    [PDCheckboxSize.SMALL]: "pd-checkbox-sm",
    [PDCheckboxSize.MEDIUM]: "pd-checkbox-md",
    [PDCheckboxSize.LARGE]: "pd-checkbox-lg",
  }[size];

  return (
    <div className={`pd-checkbox-wrapper ${className}`}>
      <Checkbox
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.checked ?? false)}
        className={`pd-checkbox ${sizeClass}`}
      />

      {label && (
        <label className="pd-checkbox-label" onClick={() => onChange?.(!checked)}>
          {label}
        </label>
      )}
    </div>
  );
};

export default PDCheckbox;
