import { Tooltip } from "primereact/tooltip";

export interface EllipsisCellProps {
  value?: string;
  id?: string;
}

export const EllipsisCell = ({ value, id }: EllipsisCellProps) => {
  if (!value) return <span>-</span>;

  return (
    <>
      <span id={id} className="ellipsis-cell" data-pr-tooltip={value}>
        {value}
      </span>
      <Tooltip target={`#${id}`}>
        {/* biome-ignore lint/performance/noImgElement: Legacy implementation, keeping img for specific tooltip layout */}
        <img
          alt="logo"
          src="/images/logo.png"
          data-pr-tooltip="PrimeReact-Logo"
          height="80px"
        />
        {value}
      </Tooltip>
    </>
  );
};
