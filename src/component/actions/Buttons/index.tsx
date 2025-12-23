import type React from "react";
import { useState, useMemo } from "react";
// import {
//   Flex,
//   Icon,
//   Button,
//   LoadingButton,
//   Text,
//   Box,
// } from "@hubspot/ui-extensions";

// import EditCosellModal from "../UpsertCosell";
import { useCoSellContext } from "@template/context/Cosell.context";
// import { NextStepModal } from "../NextStep";
// import TransferOwnershipModal from "../TransferOwner";
// import UpdateModal from "../UpdateCosell";
import { ToastService } from "@template/services/toast.service";
import {
  associateDisable,
  changeStageDisable,
  editDisable,
  isDisplayOid,
  isPending,
  linkCrmDisable,
  nextStepDisable,
  transferDisable,
  updateDisable,
} from "./actionDisabilityRules";
import { FormButton } from "@template/enum/button.enum";
import { pullCosell } from "./apiHandler";

// import LinkcrmModal from "../LinkCrm";
import { requestPayload } from "@template/common/listCosell";
import PDButton from "@template/component/ui-components/pipedriveButton";
import {
  ModelType,
  PDButtonSize,
  PDButtonType,
} from "@template/enum/pipedrive.enum";
import { useTranslation } from "react-i18next";
import type { AlertNotification } from "@template/common/messageAlert";
// import RejectCosell from "../RejectCosell";
// import { acceptCosell } from "../AcceptCosell/apiHandler";
// import { displayOid } from "../../CloudCoSellManager/helper";

type Props = {
  actions: any;
};

const _ConditionalActionButton: React.FC<{
  show: boolean;
  label: string;
  overlay: React.ReactElement;
  disabled?: boolean;
}> = ({ show, label, disabled = false }) => {
  return show ? (
    <PDButton
      label={label}
      type={PDButtonType.SECONDARY}
      size={PDButtonSize.TINY}
      disabled={disabled}
    />
  ) : null;
};
const ActionButtons: React.FC<Props> = () => {
  const {
    data,
    setData,
    setIsSpecificLoading,
    partnerType,
    setOpportunityList,
    opportunityList,
  } = useCoSellContext();

  const [isAccepting, _setIsAccepting] = useState(false);

  const { DealType = requestPayload.dealType.po } = data ?? {};
  const { LifeCycle } = data?.CoSellEntity || {};
  const { ReviewStatus, Stage } = LifeCycle || {};
  const status = data?.CloudProviderStatus ?? ReviewStatus;
  const isPendingFromAoInBound = isPending(data);
  const { t } = useTranslation();
  const { setCurrentPage } = useCoSellContext();
  const statusRequired = !!status;

  const showButtons = useMemo(
    () => ({
      accept: isPendingFromAoInBound,
      reject: isPendingFromAoInBound,
      displayOd: isDisplayOid(data),
      linkCrm: statusRequired && linkCrmDisable(data, DealType),
      edit: editDisable(
        status,
        Stage,
        data?.CloudProviderIdentifier,
        DealType,
        data,
      ),
      update:
        statusRequired &&
        updateDisable(
          status,
          Stage,
          partnerType,
          data?.CloudProviderIdentifier,
          DealType,
          data,
        ),
      changeStage:
        statusRequired &&
        changeStageDisable(
          status,
          Stage,
          data?.CloudProviderIdentifier,
          DealType,
          data,
        ),
      transfer:
        statusRequired &&
        transferDisable(
          status,
          Stage,
          data?.CloudProviderIdentifier,
          DealType,
          data,
        ),
      associate:
        statusRequired &&
        associateDisable(
          status,
          Stage,
          !!data?.CoSellEntity?.MarketplaceTransactions?.[0]?.MarketplaceOffer
            ?.OfferID,
          data?.CloudProviderIdentifier,
          DealType,
          data,
        ),
      nextStep:
        statusRequired &&
        nextStepDisable(
          status,
          Stage,
          data?.CloudProviderIdentifier,
          DealType,
          data,
        ),
    }),
    [
      data,
      status,
      Stage,
      DealType,
      partnerType,
      isPendingFromAoInBound,
      statusRequired,
    ],
  );

  const triggerAlert = ({ type, message, title }: AlertNotification) => {
    (ToastService as any)?.[type]?.(title, message);
  };

  return (
    <div className="flex items-center justify-center gap-1">
      <PDButton
        label={t("buttonLabel.edit")}
        type={PDButtonType.SECONDARY}
        size={PDButtonSize.TINY}
        onClick={() => {
          setCurrentPage({
            page: ModelType.COSELL_CREATE,
          });
        }}
      />
      <PDButton
        className="pi pi-refresh"
        label={t("buttonLabel.reset")}
        type={PDButtonType.SECONDARY}
        size={PDButtonSize.TINY}
        onClick={() => {
          pullCosell(
            data,
            triggerAlert,
            setIsSpecificLoading,
            setData,
            setOpportunityList,
            opportunityList,
            true,
            isPendingFromAoInBound,
          );
        }}
      />

      {/* Accept */}
      {showButtons.accept && (
        <PDButton
          label={FormButton.ACCEPT}
          type={PDButtonType.SECONDARY}
          size={PDButtonSize.TINY}
          loading={isAccepting}
          onClick={() => {
            // acceptCosell(
            //   data,
            //   actions,
            //   setIsAccepting,
            //   opportunityList,
            //   setOpportunityList,
            //   triggerAlert,
            //   setData
            // );
          }}
        ></PDButton>
      )}

      {/* <ConditionalActionButton
        show={showButtons.reject}
        label={FormButton.REJECT}
        overlay={
          <RejectCosell
            actions={actions}
            modalTitle={ModalTitle.REJECT_COSELL}
            data={data}
            context={context}
            cloudProvider={dropdownShow}
          />
        }
      />
      <ConditionalActionButton
        show={showButtons.linkCrm}
        label={ActionButton.LINK_CRM}
        overlay={
          <LinkcrmModal
            actions={actions}
            modalTitle={ModalTitle.LINK_CRM}
            data={data}
            context={context}
            cloudProvider={dropdownShow}
          />
        }
      />
      <ConditionalActionButton
        show={showButtons.edit}
        label={ActionButton.EDIT}
        overlay={
          <EditCosellModal
            modalTitle={ModalTitle.EDIT_COSELL}
            actions={actions}
            slug={CosellAction.EDIT}
            context={context}
          />
        }
      />

      <ConditionalActionButton
        show={showButtons.update}
        label={ActionButton.UPDATE}
        overlay={
          <UpdateModal modalTitle={ModalTitle.UPDATE} actions={actions} />
        }
      />

      <ConditionalActionButton
        show={showButtons.changeStage}
        label={ActionButton.CHANGE_STAGE}
        overlay={
          <ChangeStageModal
            context={context}
            modalTitle={ModalTitle.STAGE}
            actions={actions}
          />
        }
      />

      <ConditionalActionButton
        show={showButtons.transfer}
        label={ActionButton.TRANSFER}
        overlay={
          <TransferOwnershipModal
            modalTitle={ModalTitle.TRANSFER}
            actions={actions}
          />
        }
      />

      <ConditionalActionButton
        show={showButtons.associate}
        label={ActionButton.ASSOCIATE_OFFER}
        overlay={
          <AssociateModal
            modalTitle={ModalTitle.ASSOCIATE_OFFER}
            actions={actions}
            type={associateOfferType.add}
          />
        }
      />

      <ConditionalActionButton
        show={showButtons.nextStep}
        label={ActionButton.NEXT_STEP}
        overlay={
          <NextStepModal modalTitle={ModalTitle.NEXT_STEP} actions={actions} />
        }
      /> */}
    </div>
  );
};

export default ActionButtons;
