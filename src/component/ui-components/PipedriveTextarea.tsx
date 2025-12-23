import { InputTextarea } from "primereact/inputtextarea";
import PDText from "./pipedrive-text";
import { PDTextType } from "@template/enum/pipedrive.enum";

const TextAreaFieldBox: React.FC<{
  label?: string;
  info?: string;
  value?: string | null;
  placeholder?: string;
  isrequired?: boolean;
  className?: string;
  error?: boolean;
  name?: string;
  maxLength?: number;
  rows: number;
  validationMessage?: string;
  readOnly?: boolean;
  tooltip?: string;
  onChange: (val: string) => void;
}> = ({
  label,
  info,
  value,
  placeholder,
  isrequired,
  onChange,
  error,
  name,
  rows,
  validationMessage,
  readOnly,
  tooltip,
  maxLength = 3000,
}) => (
  <div className="flex flex-col w-full mb-3">
    {label && (
      <PDText type={PDTextType.LABEL}>
        {label}{" "}
        <span className="text-state-danger">{isrequired ? " *" : ""}</span>
      </PDText>
    )}
    {info && <div className="hub-field-info">{info}</div>}

    <InputTextarea
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="hub-textarea"
      required={isrequired}
      rows={rows}
      invalid={!!error}
      name={name}
      maxLength={maxLength}
      readOnly={readOnly}
      tooltip={tooltip}
      tooltipOptions={{ position: "top" }}
    />
    {error && <small className="pd-text-error">{validationMessage}</small>}
  </div>
);

export default TextAreaFieldBox;
