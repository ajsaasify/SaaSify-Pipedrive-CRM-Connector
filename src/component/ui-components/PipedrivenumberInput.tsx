import type { InputBoxProps } from "@template/types/pipedrive-ui-interface";
import PDText from "./pipedrive-text";
import { PDTextType } from "@template/enum/pipedrive.enum";
import { InputNumber } from "primereact/inputnumber";
const NumberInput = ({
  label,
  info,
  value,
  placeholder,
  isrequired,
  className,
  onChange,
}: InputBoxProps<number>) => {
  return (
    <div className="flex flex-col w-full">
      {label && <PDText type={PDTextType.LABEL}>{label}</PDText>}
      {info && <div className="hub-field-info">{info}</div>}

      <InputNumber
        value={value ?? null}
        onChange={(e) => onChange(e?.value)}
        placeholder={placeholder}
        className={`hub-input ${className}`}
        required={isrequired}
      />
    </div>
  );
};

export default NumberInput;
