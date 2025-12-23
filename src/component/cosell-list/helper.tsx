import type { CoSellItem } from "@template/types/api/getListCosellAssociateCrm.t";
import PDButton from "../ui-components/pipedriveButton";
import { PDButtonSize } from "@template/enum/pipedrive.enum";
import type { Dispatch, SetStateAction } from "react";
import type { Menu } from "primereact/menu";
import { Tooltip } from "primereact/tooltip";
import { formatDate } from "@template/utils/formatDate";

export enum Align {
  Right = "right",
  Left = "left",
}

const EllipsisCell = ({ value, id }: { value?: string; id: string }) => {
  if (!value) return <span>-</span>;

  return (
    <>
      <span id={id} className="ellipsis-cell" data-pr-tooltip={value}>
        {value}
      </span>
      <Tooltip target={`#${id}`}>
        {/* biome-ignore lint/performance/noImgElement: Legacy implementation, keeping img for specific tooltip layout */}
        <img alt="logo" src="/images/logo.png" data-pr-tooltip="PrimeReact-Logo" height="80px" />
        {value}
      </Tooltip>
    </>
  );
};

const statusConfig: Record<string, { icon: string; color: string }> = {
  Accepted: {
    icon: "pi pi-check-circle",
    color: "#76DF96",
  },
  Approved: {
    icon: "pi pi-verified",
    color: "#76DF96",
  },
  Submitted: {
    icon: "pi pi-send",
    color: "#1F7FFF",
  },
  "Pending Submission": {
    icon: "pi pi-clock",
    color: "#F1B408",
  },
  Expired: {
    icon: "pi pi-exclamation-triangle",
    color: "#FF0000",
  },
  Pending: {
    icon: "pi pi-clock",
    color: "#F1B408",
  },
  Rejected: {
    icon: "pi pi-times-circle",
    color: "#FF0000",
  },
  "Action Required": {
    icon: "pi pi-exclamation-triangle",
    color: "#F1B408",
  },
};

export const cosellTableColumns = ({
  t,
  menuRef,
  setCurrentCosell,
}: {
  t: any;
  menuRef: React.RefObject<Menu>;
  setCurrentCosell: Dispatch<SetStateAction<CoSellItem | null>>;
}) => [
  {
    field: "OpportunityName",
    header: t("awsCosell.overview.opportunityOwner"),
    body: (rowData: CoSellItem) => <EllipsisCell value={rowData.OpportunityName as string} id={`opp-${rowData.ReferenceID}`} />,
  },
  {
    field: "CloudProviderIdentifier",
    header: t("awsCosell.overview.opportunityId"),
  },
  {
    field: "CloudProviderStatus",
    header: t("awsCosell.overview.status"),
    body: (rowData: CoSellItem) => {
      const status = rowData.CloudProviderStatus;
      const config = status ? statusConfig[status] : null;

      return (
        <div className="flex items-center gap-2">
          {config ? (
            <>
              <i className={config.icon} style={{ color: config.color }} />
              <span>{status}</span>
            </>
          ) : (
            <span>{status || "-"}</span>
          )}
        </div>
      );
    },
  },
  {
    field: "CloudProviderStage",
    header: t("awsCosell.overview.stage"),
  },
  {
    field: "Customer",
    header: t("awsCosell.overview.customerCompanyName"),
    body: (rowData: CoSellItem) => <EllipsisCell value={rowData.Customer as string} id={`customer-${rowData.ReferenceID}`} />,
  },
  {
    field: "DealType",
    header: t("awsCosell.overview.referenceType"),
  },
  {
    field: "ModifyDate",
    header: t("awsCosell.overview.lastModified"),
    body: (rowData: CoSellItem) => formatDate(rowData.ModifyDate, "mm/dd/yyyy"),
  },
  {
    field: "",
    header: <i className="pi pi-cog" style={{ fontSize: "1rem" }} title={t("common.actions")} />,
    frozen: true,
    alignFrozen: Align.Right,
    width: "80px",
    body: (rowData: CoSellItem) => (
      <PDButton
        className="pi pi-ellipsis-h back-btn"
        size={PDButtonSize.ICON_SMALL}
        onClick={(e: any) => {
          setCurrentCosell(rowData);
          menuRef.current?.toggle(e);
        }}
      />
    ),
  },
];
