import { MultiSelect } from "primereact/multiselect";
import PDText from "./pipedrive-text";
import { PDTextType } from "@template/enum/pipedrive.enum";

export const MultiSelectField: React.FC<{
  label: string;
  value?: string[] | null;
  options: { label: string; value: string }[];
  info?: string;
  onChange: (val: string[]) => void;
  placeholder?: string;
  required?: boolean;
  maxSelectedLabels?: number;
  error?: boolean;
  name?: string;
  readOnly?: boolean;
  validationMessage?: string;
  tooltip?: string;
  display?: "comma" | "chip" | undefined;
}> = ({
  label,
  value = [],
  options,
  info,
  onChange,
  required,
  placeholder,
  maxSelectedLabels,
  error,
  name,
  readOnly,
  validationMessage,
  tooltip,
  display = "comma",
}) => {
  const itemTemplate = (option: any) => {
    const isSelected = value?.includes(option.value);

    return (
      <div className="flex items-center justify-between w-full h-3">
        <span>
          {option.label}
        </span>

        {isSelected && <i className="pi pi-check text-sm"></i>}
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full mb-3">
      {label && (
        <PDText type={PDTextType.LABEL} className="my-1">
          {label}
          <span className="text-state-danger">{required ? " *" : ""}</span>
        </PDText>
      )}
      {info && <div className="hub-field-info">{info}</div>}

      <MultiSelect
        tooltip={tooltip}
        value={value}
        onChange={(e) => onChange(e.value)}
        options={options}
        placeholder={placeholder}
        required={required}
        maxSelectedLabels={maxSelectedLabels}
        optionLabel="label"
        optionValue="value"
        className="hub-multiselect"
        itemTemplate={itemTemplate}
        invalid={!!error}
        name={name || ""}
        readOnly={readOnly}
        display={display}
      />
      {error && <small className="pd-text-error">{validationMessage}</small>}
    </div>
  );
};
