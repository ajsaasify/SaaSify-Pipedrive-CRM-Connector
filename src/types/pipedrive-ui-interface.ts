import { DataTablePageEvent, DataTableSortEvent } from "primereact/datatable";
import { FormEvent } from "react";

export type InfoTooltipProps<t=any> = {
  message?: string;
  icon?: string; // pi pi-info-circle or pi pi-question-circle
  size?: number;
  activeColor?:string;
  element?:t
};
export type InputBoxProps<t=string>={
  label?: string;
  info?: string;
  value?: t|null;
  placeholder?: string;
  isrequired?: boolean;
  className?: string;
  error?: boolean;
  name?:string;
  tooltip?:string;
  validationMessage?:string;
  readOnly?:boolean;
  onInput?: (event: FormEvent<HTMLInputElement>, validatePattern: boolean) => void;
  onChange: (val: t|null) => void;
}

