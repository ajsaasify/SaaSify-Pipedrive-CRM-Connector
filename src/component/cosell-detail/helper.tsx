import {
  ModelType,
  PDButtonSize,
  PDButtonType,
} from "@template/enum/pipedrive.enum";
import PDButton from "../ui-components/pipedriveButton";
import { RC3CosellResponse } from "@template/types/cosellResponse";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { useCoSellContext } from "@template/context/Cosell.context";
import ActionButtons from "../actions/Buttons";

export const CosellDetailHeader = ({
  setCurrentPage,
}: {
  setCurrentPage: Dispatch<
    SetStateAction<{
      page: ModelType;
      params?: Record<string, string>;
    }>
  >;
}) => {
  const { t } = useTranslation();
  const {
    data,
    setData,
    setIsSpecificLoading,
    partnerType,
    setOpportunityList,
    opportunityList,
    dropdownShow,
  } = useCoSellContext();
  return (
    <div className="flex justify-between m-4">
      <div className="flex items-center justify-center">
        <PDButton
          onClick={() => setCurrentPage({ page: ModelType.COSELL_LIST })}
          type={PDButtonType.ACCORDION}
          size={PDButtonSize.ICON_MEDIUM}
          className="pi pi-arrow-left back-btn"
        ></PDButton>
        <h5>Opportunity Id: {data?.CloudProviderIdentifier || "N/A"}</h5>
      </div>
      <ActionButtons actions={{}}/>
      {/* <div className="flex items-center justify-center gap-1">
        <PDButton
          label={t("buttonLabel.edit")}
          type={PDButtonType.SECONDARY}
          size={PDButtonSize.TINY}
        />
        <PDButton
          className="pi pi-refresh"
          label={t("buttonLabel.reset")}
          type={PDButtonType.SECONDARY}
          size={PDButtonSize.TINY}
        />
        <PDButton
          label={t("buttonLabel.linkCrm")}
          type={PDButtonType.SECONDARY}
          size={PDButtonSize.TINY}
        />
        <PDButton
          label={t("buttonLabel.changeStage")}
          type={PDButtonType.SECONDARY}
          size={PDButtonSize.TINY}
        />
        <PDButton
          label={t("buttonLabel.transfer")}
          type={PDButtonType.SECONDARY}
          size={PDButtonSize.TINY}
        />
        <PDButton
          label={t("buttonLabel.associateOffer")}
          type={PDButtonType.SECONDARY}
          size={PDButtonSize.TINY}
        />
        <PDButton
          label={t("buttonLabel.nextStep")}
          type={PDButtonType.SECONDARY}
          size={PDButtonSize.TINY}
        />
        <PDButton
          label={t("buttonLabel.cloneOffer")}
          type={PDButtonType.SECONDARY}
          size={PDButtonSize.TINY}
        />
      </div> */}
    </div>
  );
};
