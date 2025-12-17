import { Dropdown } from "primereact/dropdown";
import InfoTooltip from "./PipedriveInfo";
import { InfoTooltipProps } from "@template/types/pipedrive-ui-interface";
import PDText from "./pipedrive-text";
import { PDTextType } from "@template/enum/pipedrive.enum";

const PDSelectField: React.FC<{
  label: string;
  value?: string | null;
  options: { label: string; value: string }[];
  error?: boolean;
  name?: string;
  info?: string;
  placeholder?: string;
  tooltip?: InfoTooltipProps;
  onChange: (val: string) => void;
  required?: boolean;
  showClear?: boolean;
  readOnly?: boolean;
  validationMessage?: string;
}> = ({
  label,
  value,
  options,
  info,
  error,
  onChange,
  placeholder,
  tooltip,
  required,
  showClear,
  readOnly,
  validationMessage,
}) => {
  const itemTemplate = (option: any) => {
    const isSelected = option.value === value;

    return (
      <div className="flex items-center justify-between w-full h-3">
        <span className="p-dropdown-item-label">{option.label}</span>
        {/* Show tick only for selected option */}
        {isSelected && <i className="pi pi-check text-sm"></i>}
      </div>
    );
  };
  return (
    <div className="flex flex-col w-full mb-3">
      {label && (
        <PDText type={PDTextType.LABEL}>
          {label}
          <span className="text-state-danger">{required ? " *" : ""}</span>
          {tooltip?.message && <InfoTooltip message={tooltip?.message} />}
        </PDText>
      )}
      
      {info && <div className="hub-field-info">{info}</div>}
      <Dropdown
        required={required}
        value={value ?? ""}
        options={options}
        onChange={(e) => onChange(e.value)}
        placeholder={placeholder}
        itemTemplate={itemTemplate}
        className="hub-dropdown"
        showClear={showClear}
        invalid={!!error}
        readOnly={readOnly}
      />

      {error && (
        <small className="text-red-500 text-xs">{validationMessage}</small>
      )}
    </div>
  );
};

export default PDSelectField;
