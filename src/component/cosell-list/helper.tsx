import { CoSellItem } from "@template/types/api/getListCosellAssociateCrm.t";
import PDButton from "../ui-components/pipedriveButton";
import { PDButtonSize } from "@template/enum/pipedrive.enum";
import { Dispatch, SetStateAction } from "react";
import { Menu } from "primereact/menu";

enum Align {
Right = "right",
Left="left"
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
    field: "CloudProviderIdentifier",
    header: t("awsCosell.overview.opportunityId"),
  },
  {
    field: "OpportunityName",
    header: t("awsCosell.overview.opportunityOwnership"),
  },
  {
    field: "Customer",
    header: t("awsCosell.overview.customerCompanyName"),
  },
  {
    field: "OpportunityName",
    header: t("awsCosell.overview.opportunityOwnership"),
  },
  {
    field: "Customer",
    header: t("awsCosell.overview.customerCompanyName"),
  },
  {
    field: "OpportunityName",
    header: t("awsCosell.overview.opportunityOwnership"),
  },
  {
    field: "Customer",
    header: t("awsCosell.overview.customerCompanyName"),
  },
  {
    field: "CloudProviderStage",
    header: t("awsCosell.overview.stage"),
  },
  {
    field: "CloudProviderStatus",
    header: t("awsCosell.overview.status"),
  },
  {
    field: "",
    header: "Actions",
    frozen: true,
    alignFrozen: Align.Right,
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
