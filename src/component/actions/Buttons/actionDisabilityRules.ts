import { validationConstraint } from "@template/common/forms/buttonActionRules";
import { requestPayload } from "@template/common/listCosell";
import type { AmpCosellResponse } from "@template/types/ampCosell";
import type { RC3CosellResponse } from "@template/types/cosellResponse";
import { PartnerType } from "@template/enum/partnerType.enum";
import { StageState } from "@template/enum/stage.enum";
import { StatusState } from "@template/enum/status.enum";
// import { GCPCosellResponse } from "@template/types/gcpCosell";
import { validateDealName } from "@template/utils/globalHelper";

const validationConstraints = validationConstraint;

export const invitationEnable = (
  status?: string,
  oid?: string,
  dealType: string = requestPayload.dealType.ao,
  data?: RC3CosellResponse,
): boolean => {
  if ((oid || data?.CoSellEntity?.Invitation?.Id)?.includes(requestPayload.oid))
    return true;
  const dealtypes = dealType?.toLocaleLowerCase();
  return (
    (dealtypes?.includes(requestPayload.dealType.multiPartner) ||
      dealType?.includes(requestPayload.dealType.ao)) &&
    validationConstraints.invitation.status.includes(status as StatusState)
  );
};

export const invitationPendingEnable = (
  status?: string,
  dealType: string = requestPayload.dealType.ao,
): boolean => {
  return (
    validationConstraints.invitationPending.status.includes(
      status as StatusState,
    ) &&
    (dealType === requestPayload.dealType.ao ||
      dealType
        ?.toLocaleLowerCase()
        ?.includes(requestPayload?.dealType?.multiPartner))
  );
};

export function editDisable(
  status?: string,
  stage?: string,
  oid?: string,
  dealType?: string,
  data?: RC3CosellResponse,
): boolean {
  if (invitationEnable(status, oid, dealType, data)) return false;
  if (
    status === StatusState.ACCEPTED &&
    data?.CoSellEntity?.LifeCycle?.ReviewStatus === StatusState?.SUBMITTED
  )
    return false;
  if (
    validationConstraints.editCosell.approve.status.includes(
      status as StatusState,
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
  oid?: string,
  dealType?: string,
  data?: RC3CosellResponse,
): boolean {
  if (invitationEnable(status, oid, dealType, data)) return false;
  return !!(
    validationConstraints.updateCosell.approve.status.includes(
      status as StatusState,
    ) &&
    validationConstraints.updateCosell.approve.stage.includes(
      stage as StageState,
    ) &&
    partnerType?.includes(
      validationConstraints.updateCosell?.approve.partnerType,
    )
  );
}

export function changeStageDisable(
  status?: string,
  stage?: string,
  oid?: string,
  dealType?: string,
  data?: RC3CosellResponse,
): boolean {
  if (invitationEnable(status, oid, dealType, data)) return false;
  if (!stage || !status) return false;
  if (
    status === StatusState.ACCEPTED &&
    data?.CoSellEntity?.LifeCycle?.ReviewStatus === StatusState?.SUBMITTED
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
): boolean {
  return !!(
    [StatusState.APPROVED].includes(status as StatusState) &&
    [StageState.LAUNCHED].includes(stage as StageState) &&
    partnerType?.includes(PartnerType.SAAS)
  );
}

export function transferDisable(
  status?: string,
  stage?: string,
  oid?: string,
  dealType?: string,
  data?: RC3CosellResponse,
): boolean {
  if (invitationEnable(status, oid, dealType, data)) return false;
  if (!stage || !status) return false;
  if (
    status === StatusState.ACCEPTED &&
    data?.CoSellEntity?.LifeCycle?.ReviewStatus === StatusState?.SUBMITTED
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
  oid?: string,
  dealType?: string,
  data?: RC3CosellResponse,
): boolean {
  if (invitationEnable(status, oid, dealType, data)) return false;
  if (offer) return false;
  if (!stage || !status) return false;
  if (
    status === StatusState.ACCEPTED &&
    data?.CoSellEntity?.LifeCycle?.ReviewStatus === StatusState?.SUBMITTED
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
  _stage?: string,
  oid?: string,
  dealType?: string,
  data?: RC3CosellResponse,
): boolean {
  if (invitationEnable(status, oid, dealType, data)) return false;
  if (
    validationConstraints.nextStep.reject?.status.includes(
      status as StatusState,
    )
  )
    return false;
  return true;
}

export function linkCrmDisable(
  cosell: RC3CosellResponse,
  dealType: string,
): boolean {
  const { ReviewStatus, Stage } = cosell?.CoSellEntity?.LifeCycle ?? {};
  const status = ReviewStatus ?? cosell?.CloudProviderStatus;
  const oid = cosell?.CloudProviderIdentifier;
  const stage = Stage ?? cosell?.CloudProviderStage;
  if (invitationEnable(status, oid, dealType, cosell)) return false;
  if (
    stage &&
    [StageState.LAUNCHED, StageState.CLOSED_LOST].includes(stage as StageState)
  ) {
    return false;
  }
  return !cosell?.CRMReferenceId;
}

// export const editFieldGcp = (cosell: GCPCosellResponse): boolean => {
//   const { state, stage } = cosell?.CoSellEntity ?? {};
//   if ([GcpStage.ACCEPTED, GcpStage.DRAFT]?.includes(state as GcpStage))
//     return !validateDealName(stage ?? "", StageState.CLOSED);
//   return false;
// };

// export const changeStageGcp = (cosell: GCPCosellResponse): boolean => {
//   const { state, stage } = cosell?.CoSellEntity ?? {};
//   if ([GcpStage.ACCEPTED]?.includes(state as GcpStage))
//     return !validateDealName(stage ?? "", StageState.CLOSED);
//   return false;
// };

export const changeStageAmp = (cosell: AmpCosellResponse): boolean => {
  const status = cosell?.CoSellEntity?.CloudProviderDetails?.Status;
  return validateDealName(status ?? "", StatusState.ACCEPTED);
};

export const editCosellAmp = (cosell: AmpCosellResponse): boolean => {
  const status = cosell?.CoSellEntity?.CloudProviderDetails?.Status;
  return [StatusState.ACCEPTED, StatusState.DRAFT].includes(
    status as StatusState,
  );
};

export const isPending = (list: RC3CosellResponse): boolean => {
  const status =
    list?.CloudProviderStatus?.toLocaleLowerCase() ||
    list?.CoSellEntity?.Invitation?.Status?.toLocaleLowerCase() ||
    "";

  const dealType = list?.DealType?.toLocaleLowerCase() ?? "";
  const pendingStatus = StatusState.PENDING.toLocaleLowerCase();

  return (
    status === pendingStatus &&
    (dealType === requestPayload.dealType.ao.toLocaleLowerCase() ||
      dealType.includes(requestPayload.dealType.inbound.toLocaleLowerCase()))
  );
};

export const isAddMultipartner = (list: RC3CosellResponse): boolean => {
  const status =
    list?.CoSellEntity?.LifeCycle?.ReviewStatus ?? list?.CloudProviderStatus;
  if (!status) return false;
  return [StatusState.APPROVED, StatusState.SUBMITTED]?.includes(
    status as StatusState,
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

// export const gcpLinkCrmDisability = (cosell: GCPCosellResponse) =>
//   !!cosell?.CRMReferenceId;

export const isDisplayOid = (list: RC3CosellResponse): boolean => {
  const status =
    list?.CloudProviderStatus ?? list?.CoSellEntity?.Invitation?.Status ?? "";

  return [StatusState.PENDING, StatusState.REJECTED]?.includes(
    status as StatusState,
  );
};
