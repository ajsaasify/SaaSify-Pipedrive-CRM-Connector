import type React from "react";
import {
  PDTextType,
  PDTextSize,
  PDTextWeight,
} from "../../enum/pipedrive.enum";

type PDTextProps = {
  type?: PDTextType;
  size?: PDTextSize;
  weight?: PDTextWeight;
  className?: string;
  children: React.ReactNode;
};

const PDText: React.FC<PDTextProps> = ({
  type = PDTextType.BODY,
  size = PDTextSize.MD,
  weight = PDTextWeight.REGULAR,
  className = "",
  children,
}) => {
  const typeClass = {
    [PDTextType.HEADING]: "pd-text-heading",
    [PDTextType.SUBTITLE]: "pd-text-subtitle",
    [PDTextType.BODY]: "pd-text-body",
    [PDTextType.LABEL]: "pd-text-label",
    [PDTextType.CAPTION]: "pd-text-caption",
  }[type];

  const sizeClass = {
    [PDTextSize.XS]: "pd-text-xs",
    [PDTextSize.SM]: "pd-text-sm",
    [PDTextSize.MD]: "pd-text-md",
    [PDTextSize.LG]: "pd-text-lg",
  }[size];

  const weightClass = {
    [PDTextWeight.REGULAR]: "font-normal",
    [PDTextWeight.MEDIUM]: "font-medium",
    [PDTextWeight.SEMIBOLD]: "font-semibold",
  }[weight];

  return (
    <div className={`${typeClass} ${sizeClass} ${weightClass} ${className}`}>
      {children}
    </div>
  );
};

export default PDText;
