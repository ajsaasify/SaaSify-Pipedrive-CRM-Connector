import type { CoSellItem } from "@template/types/api/getListCosellAssociateCrm.t";
import PDButton from "../ui-components/pipedriveButton";
import { PDButtonSize } from "@template/enum/pipedrive.enum";
import type { Dispatch, SetStateAction } from "react";
import type { Menu } from "primereact/menu";
import { Tooltip } from "primereact/tooltip";
import { formatDate } from "@template/utils/formatDate";
import { statusConfig } from "@template/utils/statusConfig";
import { EllipsisCell } from "../EllipsisCell";

export enum Align {
  Right = "right",
  Left = "left",
}

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
    body: (rowData: CoSellItem) => (
      <EllipsisCell
        value={rowData.OpportunityName as string}
        id={`opp-${rowData.ReferenceID}`}
      />
    ),
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
    body: (rowData: CoSellItem) => (
      <EllipsisCell
        value={rowData.Customer as string}
        id={`customer-${rowData.ReferenceID}`}
      />
    ),
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
    header: (
      <i
        className="pi pi-cog"
        style={{ fontSize: "1rem" }}
        title={t("common.actions")}
      />
    ),
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
