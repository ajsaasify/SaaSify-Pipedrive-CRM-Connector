import React from "react";
import { Button } from "primereact/button";
import { PDButtonType, PDButtonSize } from "../../enum/pipedrive.enum";

type PDButtonProps = {
  label?: string;
  icon?: string;
  type?: PDButtonType;
  size?: PDButtonSize;
  rounded?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: (e: React.MouseEventHandler<HTMLButtonElement>) => void;
};

const PDButton: React.FC<PDButtonProps> = ({
  label,
  icon,
  type = PDButtonType.PRIMARY,
  size = PDButtonSize.MEDIUM,
  rounded = false,
  fullWidth = false,
  loading = false,
  disabled = false,
  className = "",
  onClick,
}) => {
  // Mapping enums → your existing Tailwind classes
  const typeClass = {
    [PDButtonType.PRIMARY]: "pd-btn-primary",
    [PDButtonType.SECONDARY]: "pd-btn-secondary",
    [PDButtonType.GHOST]: "pd-btn-ghost",
    [PDButtonType.DANGER]: "pd-btn-danger",
    [PDButtonType.ACCORDION]: "pd-accordion-btn",
  }[type];

  const sizeClass = {
    [PDButtonSize.SMALL]: "pd-btn-sm",
    [PDButtonSize.MEDIUM]: "pd-btn-md",
    [PDButtonSize.LARGE]: "pd-btn-lg",
    [PDButtonSize.TINY]: "pd-btn-xs",

    // icon sizes:
    [PDButtonSize.ICON_SMALL]: "pd-btn-icon pd-btn-icon-sm",
    [PDButtonSize.ICON_MEDIUM]: "pd-btn-icon pd-btn-icon-md",
    [PDButtonSize.ICON_LARGE]: "pd-btn-icon pd-btn-icon-lg",
  }[size];

  const finalClass = `
    pd-btn 
    ${typeClass} 
    ${sizeClass}
    ${rounded ? "pd-btn-rounded" : ""}
    ${fullWidth ? "pd-btn-block" : ""}
    ${className}
  `.trim();

  return (
    <Button
      label={label}
      icon={icon}
      disabled={disabled}
      loading={loading}
      className={finalClass}
      onClick={(e:any)=>onClick?.(e)}
    />
  );
};

export default PDButton;
