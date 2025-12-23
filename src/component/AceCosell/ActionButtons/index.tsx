import React, { useMemo, useState } from "react";
import { AddNextStep } from "../NextStep/AddNextStep";
import { associateOfferType } from "../../../common/associateOfferType";
import { AddMarketplace } from "../Marketplace/AddMarketplace";
import TransferOwner from "../TransferOwner";
import {
  ActionButton,
  ButtonVariant,
  FormButton,
} from "../../../enum/button.enum";
import { ModalTitle } from "../../../enum/modal.enum";
import ChangeStage from "../ChangeStage";
import UpdateDetails from "../UpdateDetails";
import { ArrowClockwiseRegular } from "@fluentui/react-icons";
import { CosellViewProps } from "../../CosellView";
import ButtonPlugin from "../../../Plugin/Button";
import { refreshCosell } from "./apiHandler";
import LinkCRM from "../../LinkCRM";
import { cosellActionValidator } from "./actionDisabilityRules";
import UpsertCosellForm from "../UpsertCosell/Form";
import { CosellAction } from "../../../enum/action.enum";
import { postAcceptInvitation } from "../AOInvitations/apiHander";
import { Reject } from "../AOInvitations/Reject";
import ErrorDetails from "../ErrorDetail";
import { Button, Spinner, Tooltip } from "@fluentui/react-components";
import { translate } from "../../../util/translate";
import { useCoSellContext } from "@template/context/Cosell.context";

const ActionButtons: React.FC<CosellViewProps> = ({ context }) => {
  const { aceCosell, setAceCosell, partnerType, notify, isPickFromSaaSify } =
    useCoSellContext();
  const [loader, setLoader] = useState(false);
  const [acceptLoader, setAcceptLoader] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const cosellValidator = useMemo(
    () => cosellActionValidator(aceCosell),
    [aceCosell]
  );
  const isAssociateDisabled = cosellValidator.isAssociateDisabled();
  const isLinkCrmDisabled = cosellValidator.linkCrmDisable();
  const isUpdateDisabled = cosellValidator.updateDisable(partnerType);
  const isChangeStageDisabled = cosellValidator.changeStageDisable();
  const isTransferOwnerDisabled = cosellValidator.transferDisable();
  const isNextStepDisabled = cosellValidator.nextStepDisable();
  const isEditCosellDisabled = cosellValidator.editAceCosell();
  const isPending = cosellValidator.isPendingInvitation();
  const isResetEnable = cosellValidator.isResetEnable();

  return (
    <>
      <UpsertCosellForm
        open={openForm}
        setOpen={setOpenForm}
        context={context}
        cloudProps={{
          provider: aceCosell?.CloudProvider,
          sellerCode: aceCosell?.SellerCode,
        }}
        modalTitle={ModalTitle.EDIT_COSELL}
        slug={CosellAction.EDIT}
      />
      <UpdateDetails
        open={openUpdate}
        setOpen={setOpenUpdate}
        context={context}
      />
      {isResetEnable && (
        <Tooltip content={translate("buttonToolTip.aws")} relationship="label">
          <Button
            appearance={ButtonVariant.SECONDARY}
            icon={loader ? <Spinner size="tiny" /> : <ArrowClockwiseRegular />}
            disabled={!isPickFromSaaSify || acceptLoader}
            children={ActionButton.RESET}
            onClick={() =>
              refreshCosell(aceCosell, context, setAceCosell, setLoader, notify)
            }
          />
        </Tooltip>
      )}
      {isPending && (
        <>
          <ButtonPlugin
            appearance={ButtonVariant.SECONDARY}
            children={FormButton.ACCEPT}
            loader={acceptLoader}
            disabled={!isPickFromSaaSify}
            onClick={() =>
              postAcceptInvitation(
                context,
                aceCosell,
                setAcceptLoader,
                setAceCosell,
                notify
              )
            }
          />
          <Reject context={context} acceptLoader={acceptLoader} />
        </>
      )}
      {isEditCosellDisabled && (
        <ButtonPlugin
          appearance={ButtonVariant.SECONDARY}
          children={ActionButton.EDIT}
          disabled={!isPickFromSaaSify}
          onClick={() => setOpenForm(true)}
        />
      )}
      {isChangeStageDisabled && (
        <ChangeStage
          buttonTitle={ActionButton.CHANGE_STAGE}
          modalTitle={ModalTitle.STAGE}
          context={context}
        />
      )}
      {isTransferOwnerDisabled && <TransferOwner context={context} />}
      {isLinkCrmDisabled && <LinkCRM context={context} />}
      {isAssociateDisabled ? (
        <AddMarketplace
          modalTitle={ModalTitle.ASSOCIATE_OFFER}
          type={associateOfferType.add}
          label={FormButton.ASSOCIATE_OFFER}
          context={context}
        />
      ) : (
        <></>
      )}
      {isUpdateDisabled && (
        <ButtonPlugin
          appearance={ButtonVariant.SECONDARY}
          children={ActionButton.UPDATE}
          onClick={() => setOpenUpdate(true)}
          disabled={!isPickFromSaaSify}
        />
      )}
      {isNextStepDisabled && <AddNextStep context={context} />}
      {aceCosell?.ErrorMessage?.length ? <ErrorDetails /> : <></>}
    </>
  );
};

export default ActionButtons;
