import { InputBoxProps } from "@template/types/pipedrive-ui-interface";
import { InputText } from "primereact/inputtext";
import PDText from "./pipedrive-text";
import { PDTextType } from "@template/enum/pipedrive.enum";

const Input = ({
  label,
  info,
  value,
  placeholder,
  isrequired,
  className = "",
  onChange,
  onInput,
  name,
  readOnly = false,
  tooltip,
  error,
  validationMessage,
}: InputBoxProps<string>) => {
  return (
    <div className="flex flex-col w-full mb-3">
      {label && (
        <PDText type={PDTextType.LABEL}>
          {label}
          <span className="text-state-danger">{isrequired ? " *" : ""}</span>
        </PDText>
      )}
      {info && <div className="hub-field-info">{info}</div>}

      <InputText
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`hub-input ${className}`}
        required={isrequired}
        invalid={error ? true : false}
        name={name}
        onInput={onInput}
        readOnly={readOnly}
      />
      {error && <small className="pd-text-error">{validationMessage}</small>}
    </div>
  );
};

export default Input;
