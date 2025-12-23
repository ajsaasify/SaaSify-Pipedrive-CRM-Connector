import React, { useState } from "react";

import { useCoSellContext } from "@template/context/Cosell.context";
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
import {
  ActionButton,
  ButtonSize,
  ButtonVariant,
  FormButton,
} from "@template/enum/button.enum";
import { ModalTitle } from "@template/enum/modal.enum";
import { associateOfferType } from "../../../common/forms/associateOfferType";
import { CosellAction } from "@template/enum/action.enum";
import { acceptCosell, pullCosell, pushCrm } from "./apiHandler";

import { requestPayload } from "@template/common/listCosell";
import PDButton from "@template/component/ui-components/pipedriveButton";
import {
  ModelType,
  PDButtonSize,
  PDButtonType,
} from "@template/enum/pipedrive.enum";
import { useTranslation } from "react-i18next";
import { AlertNotification } from "@template/common/messageAlert";
import { Dialog } from "primereact/dialog";
import { NextStepDialog } from "@template/component/AwsProviderCosell/AddNextStep";

export type Props = {
  actionState: any;
};

export type ConditionalActionButtonProps = {
  show: boolean;
  label: string;
  overlay: React.ReactNode;
  disabled?: boolean;
  dialogHeader?: string;
};

const ConditionalActionButton: React.FC<ConditionalActionButtonProps> = ({
  show,
  label,
  overlay,
  disabled = false,
  dialogHeader,
}) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  if (!show) return null;

  return (
    <>
      <PDButton
        label={t(label)}
        type={PDButtonType.SECONDARY}
        size={PDButtonSize.TINY}
        disabled={disabled}
        onClick={() => setVisible(true)}
      />

      <Dialog
        header={dialogHeader ? t(dialogHeader) : t(label)}
        visible={visible}
        style={{ width: "40rem" }}
        onHide={() => setVisible(false)}
        closable
        modal
      >
        {overlay}
      </Dialog>
    </>
  );
};

const ActionButtons: React.FC<Props> = ({ actionState }) => {
  const {
    data,
    setData,
    setIsSpecificLoading,
    partnerType,
    setOpportunityList,
    opportunityList,
    dropdownShow,
    setCurrentPage,
  } = useCoSellContext();

  const [isAccepting, setIsAccepting] = useState(false);

  const { DealType = requestPayload.dealType.po } = data ?? {};
  const { LifeCycle } = data?.CoSellEntity || {};
  const { ReviewStatus, Stage } = LifeCycle || {};
  const status = data?.CloudProviderStatus ?? ReviewStatus;

  const isPendingFromAoInBound = isPending(data);
  const { t } = useTranslation();
  const [showNextStep, setShowNextStep] = useState(false);
  const triggerAlert = ({ type, message, title }: AlertNotification) => {
    (ToastService as any)?.[type]?.(title, message);
  };

  return (
    <div className="flex items-center justify-center gap-1">
      {/* Edit */}
      {actionState.editCosell.visible && (
        <PDButton
          label={t("buttonLabel.edit")}
          type={PDButtonType.SECONDARY}
          size={PDButtonSize.TINY}
          disabled={actionState.editCosell.disabled}
          onClick={() => setCurrentPage({ page: ModelType.COSELL_CREATE })}
        />
      )}

      {/* Reset */}
      {actionState.reset.visible && (
        <PDButton
          className="pi pi-refresh"
          label={t("buttonLabel.reset")}
          type={PDButtonType.SECONDARY}
          size={PDButtonSize.TINY}
          disabled={actionState.reset.disabled}
          onClick={() => {
            pullCosell(
              data,
              triggerAlert,
              setIsSpecificLoading,
              setData,
              setOpportunityList,
              opportunityList,
              true,
              isPendingFromAoInBound
            );
          }}
        />
      )}

      {/* Accept */}
      {actionState.accept?.visible && (
        <PDButton
          label={FormButton.ACCEPT}
          type={PDButtonType.SECONDARY}
          size={PDButtonSize.TINY}
          loading={isAccepting}
          disabled={actionState.accept.disabled}
          onClick={() => {
            acceptCosell(
              data,
              setIsAccepting,
              opportunityList,
              setOpportunityList,
              triggerAlert,
              setData,
              {}
            );
          }}
        />
      )}

      {/* Reject */}
      <ConditionalActionButton
        show={actionState.reject?.visible}
        disabled={actionState.reject?.disabled}
        label={FormButton.REJECT}
        overlay={<div>Text</div>}
      />

      {/* Link CRM */}
      <ConditionalActionButton
        show={actionState.linkCrm.visible}
        disabled={actionState.linkCrm.disabled}
        label={ActionButton.LINK_CRM}
        overlay={<div>{ModalTitle.LINK_CRM}</div>}
      />

      {/* Update */}
      <ConditionalActionButton
        show={actionState.update.visible}
        disabled={actionState.update.disabled}
        label={ActionButton.UPDATE}
        overlay={<div>{ModalTitle.UPDATE}</div>}
      />

      {/* Change Stage */}
      <ConditionalActionButton
        show={actionState.changeStage.visible}
        disabled={actionState.changeStage.disabled}
        label={ActionButton.CHANGE_STAGE}
        overlay={<div>{ModalTitle.STAGE}</div>}
      />

      {/* Transfer Owner */}
      <ConditionalActionButton
        show={actionState.transferOwner.visible}
        disabled={actionState.transferOwner.disabled}
        label={ActionButton.TRANSFER}
        overlay={<div>{ModalTitle.TRANSFER}</div>}
      />

      {/* Associate Offer */}
      <ConditionalActionButton
        show={actionState.associate.visible}
        disabled={actionState.associate.disabled}
        label={ActionButton.ASSOCIATE_OFFER}
        overlay={<div>{ModalTitle.ASSOCIATE_OFFER}</div>}
      />

      {/* Next Step */}
      <ConditionalActionButton
        show={actionState.nextStep.visible}
        disabled={actionState.nextStep.disabled}
        label={ActionButton.NEXT_STEP}
        overlay={
          <NextStepDialog
            modalTitle={ModalTitle.NEXT_STEP}
            visible={showNextStep}
            actions={{}}
            onHide={() => setShowNextStep(false)}
          />
        }
      />

      {/* Clone */}
      <ConditionalActionButton
        show={actionState.clone.visible}
        disabled={actionState.clone.disabled}
        label={FormButton.CLONE}
        overlay={<div>{ModalTitle.CLONE_COSELL}</div>}
      />
    </div>
  );
};

export default ActionButtons;
