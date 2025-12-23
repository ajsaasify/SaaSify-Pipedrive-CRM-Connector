import { StatusState } from "@template/enum/status.enum";
import { validationConstraint } from "../common/forms/buttonActionRules";
import { requestPayload } from "../common/listCosell";
import { AmpCosellResponse } from "../types/ampCosell";
import { RC3CosellResponse } from "../types/cosellResponse";
import { validateDealName } from "../utils/globalHelper";
import { GcpStage, StageState } from "@template/enum/stage.enum";
import { PartnerType } from "@template/enum/partnerType.enum";
import { GCPCosellResponse } from "@template/types/gcpCosell";
import { FundingResponse } from "@template/types/funding";

const validationConstraints = validationConstraint;

export const invitationEnable = (
  aceCosell: RC3CosellResponse = {}
): boolean => {
  const status =
    aceCosell?.CoSellEntity?.Invitation?.Status ??
    aceCosell?.CoSellEntity?.LifeCycle?.ReviewStatus ??
    aceCosell?.CloudProviderStatus;
  const invitationId = aceCosell?.CoSellEntity?.Invitation?.Id;
  if (invitationId) {
    return validationConstraints.invitation.status.includes(
      status as StatusState
    );
  }
  return false;
};

export const invitationPendingEnable = (
  status?: string,
  dealType: string = requestPayload.dealType.ao
): boolean => {
  return (
    validationConstraints.invitationPending.status.includes(
      status as StatusState
    ) &&
    (dealType == requestPayload.dealType.ao ||
      dealType
        ?.toLocaleLowerCase()
        ?.includes(requestPayload?.dealType?.multiPartner))
  );
};

export function editDisable(
  status?: string,
  stage?: string,
  aceCosell?: RC3CosellResponse
): boolean {
  if (invitationEnable(aceCosell)) return false;
  if (
    status == StatusState.ACCEPTED &&
    aceCosell?.CoSellEntity?.LifeCycle?.ReviewStatus == StatusState?.SUBMITTED
  )
    return false;
  if (
    validationConstraints.editCosell.approve.status.includes(
      status as StatusState
    ) &&
    !validationConstraints.editCosell.reject.stage.includes(stage as StageState)
  )
    return true;
  return false;
}

export function updateDisable(
  status?: string,
  stage?: string,
  partnerType?: string[],
  aceCosell?: RC3CosellResponse
): boolean {
  const { DeliveryModels } = aceCosell?.CoSellEntity?.Project ?? {};
  if (invitationEnable(aceCosell)) return false;
  return !!(
    validationConstraints.updateCosell.approve.status.includes(
      status as StatusState
    ) &&
    validationConstraints.updateCosell.approve.stage.includes(
      stage as StageState
    ) &&
    (partnerType?.includes(
      validationConstraints.updateCosell?.approve.partnerType
    ) ||
      partnerType?.includes(PartnerType.SOFTWARE_PARTNER))
  );
}

export function changeStageDisable(
  status?: string,
  stage?: string,
  aceCosell?: RC3CosellResponse
): boolean {
  if (invitationEnable(aceCosell)) return false;
  if (!stage || !status) return false;
  if (
    status == StatusState.ACCEPTED &&
    aceCosell?.CoSellEntity?.LifeCycle?.ReviewStatus == StatusState?.SUBMITTED
  )
    return false;
  if (validationConstraints.changeStage.status.includes(status as StatusState))
    return false;
  if (validationConstraints.changeStage.stage.includes(stage as StageState))
    return false;
  return true;
}

export function showSaasDocs(
  status?: string,
  stage?: string,
  partnerType?: string[],
  cosell?: RC3CosellResponse
): boolean {
  return !!(
    [StatusState.APPROVED].includes(status as StatusState) &&
    [StageState.LAUNCHED].includes(stage as StageState) &&
    (partnerType?.includes(PartnerType.ISV) ||
      partnerType?.includes(PartnerType.SOFTWARE_PARTNER))
  );
}

export function transferDisable(
  status?: string,
  stage?: string,
  aceCosell?: RC3CosellResponse
): boolean {
  if (invitationEnable(aceCosell)) return false;
  if (!stage || !status) return false;
  if (
    status == StatusState.ACCEPTED &&
    aceCosell?.CoSellEntity?.LifeCycle?.ReviewStatus == StatusState?.SUBMITTED
  )
    return false;
  if (
    validationConstraints.transferCosell.status.includes(status as StatusState)
  )
    return false;
  if (validationConstraints.transferCosell.stage.includes(stage as StageState))
    return false;
  return true;
}

export function associateDisable(
  status?: string,
  stage?: string,
  offer?: boolean,
  aceCosell?: RC3CosellResponse
): boolean {
  if (invitationEnable(aceCosell)) return false;
  if (offer) return false;
  if (!stage || !status) return false;
  if (
    status == StatusState.ACCEPTED &&
    aceCosell?.CoSellEntity?.LifeCycle?.ReviewStatus == StatusState?.SUBMITTED
  )
    return false;
  if (
    validationConstraints.associateOffer.status.includes(status as StatusState)
  )
    return false;
  if (validationConstraints.associateOffer.stage.includes(stage as StageState))
    return false;
  return true;
}

export function nextStepDisable(
  status?: string,
  aceCosell?: RC3CosellResponse
): boolean {
  if (invitationEnable(aceCosell)) return false;
  if (
    validationConstraints.nextStep.reject?.status.includes(
      status as StatusState
    )
  )
    return false;
  return true;
}

export function linkCrmDisable(cosell: RC3CosellResponse): boolean {
  if (invitationEnable(cosell)) return false;
  return !cosell?.CRMReferenceId;
}

export function pfLinkCrmDisable(isFunding: FundingResponse): boolean {
  return !isFunding?.CRMReferenceId;
  // const {}
}

export const editFieldGcp = (cosell: GCPCosellResponse): boolean => {
  const { state, stage } = cosell?.CoSellEntity ?? {};
  const status = cosell?.CloudProviderStatus ?? state;
  if ([GcpStage.ACCEPTED, GcpStage.DRAFT]?.includes(status as GcpStage))
    return !validateDealName(stage ?? "", StageState.CLOSED);
  return false;
};

export const changeStageGcp = (cosell: GCPCosellResponse): boolean => {
  const { state, stage } = cosell?.CoSellEntity ?? {};
  if ([GcpStage.ACCEPTED]?.includes(state as GcpStage))
    return !validateDealName(stage ?? "", StageState.CLOSED);
  return false;
};

export const changeStageAmp = (cosell: AmpCosellResponse): boolean => {
  const status = cosell?.CoSellEntity?.CloudProviderDetails?.Status;
  return validateDealName(status ?? "", StatusState.ACCEPTED);
};

export const editCosellAmp = (cosell: AmpCosellResponse): boolean => {
  const status = cosell?.CoSellEntity?.CloudProviderDetails?.Status;
  return [StatusState.ACCEPTED, StatusState.PENDING].includes(
    status as StatusState
  );
};

export const isPending = (list: RC3CosellResponse): boolean => {
  const status =
    list?.CloudProviderStatus ?? list?.CoSellEntity?.Invitation?.Status ?? "";
  return status == StatusState.PENDING;
};

export const isAddMultipartner = (list: RC3CosellResponse): boolean => {
  const status =
    list?.CoSellEntity?.LifeCycle?.ReviewStatus ?? list?.CloudProviderStatus;
  if (!status) return false;
  return [StatusState.APPROVED, StatusState.SUBMITTED]?.includes(
    status as StatusState
  );
};

export const isLaunchedCosell = (list: RC3CosellResponse): boolean => {
  const status =
    list?.CloudProviderStage ?? list?.CoSellEntity?.LifeCycle?.Stage;
  if (!status) return false;
  return [StageState.LAUNCHED].includes(status as StageState);
};

export const ampLinkCrmDisability = (cosell: AmpCosellResponse) => {
  return !!cosell?.CoSellEntity?.DealDetails?.CRMId;
};

export const gcpLinkCrmDisability = (cosell: GCPCosellResponse) =>
  !!cosell?.CRMReferenceId;

export const isDisplayOid = (list: RC3CosellResponse): boolean => {
  const status =
    list?.CloudProviderStatus ?? list?.CoSellEntity?.Invitation?.Status ?? "";

  return (
    [StatusState.PENDING, StatusState.REJECTED, StatusState.EXPIRED]?.includes(
      status as StatusState
    ) && !!list?.CoSellEntity?.Invitation?.Id
  );
};

export const cloneCosellDisability = (cosell: RC3CosellResponse): boolean => {
  const status =
    cosell?.CloudProviderStatus ??
    cosell?.CoSellEntity?.LifeCycle?.ReviewStatus;
  if (!status) return false;
  return ![
    StatusState.PENDING,
    StatusState.REJECTED,
    StatusState.EXPIRED,
  ]?.includes(status as StatusState);
};
