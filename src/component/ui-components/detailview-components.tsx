import { labelTagConfig } from "@template/common/constants/awsProjects";
import { Tag } from "primereact/tag";
import type { ReactNode } from "react";
import { tagSeverityClasses } from "@template/styles/tagStyles";

export const InfoField = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  const tagProperty = labelTagConfig.find((val) => val?.match === label);
  const severity = tagProperty?.variant;
  const tagClass = severity ? tagSeverityClasses[severity] : "";
  return (
    <div className={`info-field`}>
      <span className="info-label">{label}</span>
      {/* No variant → show plain value */}
      {!severity && <span className="info-value">{value}</span>}
      {/* Simple tag */}
      {severity && !tagProperty?.separator && (
        <Tag className={`border ${tagClass} max-h-2`}>{value}</Tag>
      )}

      {/* Multiple tags */}
      {severity && tagProperty?.separator && (
        <div>
          {value.split(tagProperty.separator).map((val, idx) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: Index used as key
            <Tag key={idx} className={`border m-1 ${tagClass}`}>
              {val}
            </Tag>
          ))}
        </div>
      )}
    </div>
  );
};

export const Tile = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => <div className={`tile ${className}`}>{children}</div>;

export const DisplayField = ({
  items,
}: {
  items: {
    value: string;
    label: string;
    idx: string;
  }[];
}) => {
  return (
    <div className="display-field">
      {items.map((field, idx) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: Index used as key
        <InfoField key={idx} label={field.label} value={field.value} />
      ))}

      <style jsx>{`
        .display-field {
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        }
      `}</style>
    </div>
  );
};
