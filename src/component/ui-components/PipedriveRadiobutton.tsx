import { PDTextType } from "@template/enum/pipedrive.enum";
import { RadioButton } from "primereact/radiobutton";
import PDText from "./pipedrive-text";

type RadioOption = {
  label: string;
  value: string;
  info?: string;
};

type PDRadioGroupProps = {
  label?: string;
  value?: string;
  name?: string;
  options?: RadioOption[];
  onChange?: (val: string) => void;
  inline?: boolean;
  disabled?: boolean;
  readOnly?:boolean;
};

export const PDRadioGroup = ({
  label,
  value,
  name,
  options,
  onChange,
  inline = false,
  disabled = false,
  readOnly=false
}: PDRadioGroupProps) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <PDText type={PDTextType.LABEL}>{label}</PDText>}

      <div className={inline ? "flex gap-4" : "flex flex-col gap-2"}>
        {options?.map((opt) => (
          <div
            key={opt.value}
            className="flex items-center gap-2 pd-radio"
          >
          
            <RadioButton
              inputId={`${name}-${opt.value}`}
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={(e) => onChange?.(e.value)}
              disabled={disabled}
              className="pd-radio-item"
              readOnly={readOnly}
            />
            <label
              htmlFor={`${name}-${opt.value}`}
              className="pd-radio-label cursor-pointer flex justify-center flex-col"
            >
              {opt.label}
              {opt?.info && <div className="hub-field-info">{opt?.info}</div>}
            </label>
            
          </div>
        ))}
      </div>
    </div>
  );
};
