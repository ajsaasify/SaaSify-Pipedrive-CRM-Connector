import { AceCosellProps } from "@template/types/aceCosell";
import { validationConstraint } from "../../../common/buttonActionRules";
import { requestPayload } from "../../../common/payload";
import { PartnerType } from "../../../enum/partnerType.enum";
import { StageState } from "../../../enum/stage.enum";
import { StatusState } from "../../../enum/status.enum";

class CoSellActionValidator {
  private aceCosell: AceCosellProps;
  private reviewStatus: StatusState;
  private stage: StageState;
  private deliveryModel: string[];
  constructor(aceCosell: AceCosellProps) {
    this.aceCosell = aceCosell;
    const lifeCycle = aceCosell?.CoSellEntity?.LifeCycle;
    this.reviewStatus = (lifeCycle?.ReviewStatus ??
      aceCosell?.CloudProviderStatus ??
      "") as StatusState;
    this.stage = (lifeCycle?.Stage ??
      aceCosell?.CloudProviderStatus ??
      "") as StageState;
    this.deliveryModel = aceCosell?.CoSellEntity?.Project?.DeliveryModels ?? [];
  }

  private get isSubmitted(): boolean {
    return this.reviewStatus === StatusState.SUBMITTED;
  }

  public isInvitationEnabled(): boolean {
    const invitationId =
      this.aceCosell?.CoSellEntity?.Invitation?.Id ??
      this.aceCosell.CloudProviderIdentifier;
    const Status =
      this.aceCosell?.CoSellEntity?.Invitation?.Status ??
      this.aceCosell.CloudProviderStatus ??
      this.reviewStatus;
    if (
      invitationId?.includes(requestPayload.oid) &&
      !Status?.includes(StatusState.ACCEPTED)
    )
      return true;
    if (!this.reviewStatus) return false;

    return false;
  }

  public isPendingInvitation(): boolean {
    const invitationId = this.aceCosell?.CoSellEntity?.Invitation?.Id;
    const status = this.aceCosell?.CoSellEntity?.Invitation?.Status;
    if (
      invitationId?.includes(requestPayload.oid) &&
      status === StatusState.PENDING
    )
      return true;

    return false;
  }

  public isResetEnable(): boolean {
    const status =
      this.aceCosell?.CoSellEntity?.Invitation?.Status ?? this.reviewStatus;
    if (status !== StatusState.PENDING_SUBMISSION) return true;
    return false;
  }

  public isAssociateDisabled(): boolean {
    if (!this.reviewStatus || !this.stage) return false;
    if (this.isInvitationEnabled()) return false;
    const transactions =
      this.aceCosell?.CoSellEntity?.MarketplaceTransactions ?? [];
    const isStatusAllowed = validationConstraint.associateOffer.status.includes(
      this.reviewStatus
    );
    const isStageAllowed = validationConstraint.associateOffer.stage.includes(
      this.stage
    );

    if (isStatusAllowed || isStageAllowed) return false;

    return !transactions[0]?.MarketplaceOffer?.OfferID;
  }

  public linkCrmDisable(): boolean {
    if (this.isInvitationEnabled()) return false;
    return !this.aceCosell?.CRMReferenceId;
  }

  public editAceCosell(): boolean {
    if (!this.reviewStatus) return false;
    if (this.isInvitationEnabled() || this.isSubmitted) return false;

    const { approve, reject } = validationConstraint.editCosell;
    const isApproved = approve.status.includes(this.reviewStatus);
    const isRejected = reject.stage.includes(this.stage);

    return isApproved && !isRejected;
  }

  public updateDisable(partnerType: string[]): boolean {
    if (!this.reviewStatus || !this.stage) return false;
    if (this.isInvitationEnabled()) return false;

    const { approve } = validationConstraint.updateCosell;

    return (
      approve.status.includes(this.reviewStatus) &&
      approve.stage.includes(this.stage) &&
      (partnerType.includes(approve.partnerType) ||
        partnerType.includes(PartnerType.SOFTWARE_PARTNER))
    );
  }

  public changeStageDisable(): boolean {
    if (!this.reviewStatus || !this.stage) return false;
    if (this.isInvitationEnabled() || this.isSubmitted) return false;

    const { status, stage } = validationConstraint.changeStage;

    return !status.includes(this.reviewStatus) && !stage.includes(this.stage);
  }

  public transferDisable(): boolean {
    if (!this.reviewStatus || !this.stage) return false;
    if (this.isInvitationEnabled() || this.isSubmitted) return false;

    const { status, stage } = validationConstraint.transferCosell;

    return !status.includes(this.reviewStatus) && !stage.includes(this.stage);
  }

  public nextStepDisable(): boolean {
    if (!this.reviewStatus) return false;
    if (this.isInvitationEnabled()) return false;

    return !validationConstraint.nextStep.reject.status.includes(
      this.reviewStatus
    );
  }

  public isSaaSEditable(partnerType: string[]): boolean {
    if (!this.reviewStatus || !this.stage) return false;

    const isApproved = this.reviewStatus === StatusState.APPROVED;
    const isLaunched = this.stage === StageState.LAUNCHED;
    const { approve } = validationConstraint.updateCosell;
    return !!(
      isApproved &&
      isLaunched &&
      (partnerType.includes(approve.partnerType) ||
        partnerType.includes(PartnerType.SOFTWARE_PARTNER))
    );
  }

  public showOverviewAlert(): boolean {
    return [StatusState.ACTION_REQUIRED, StatusState.REJECTED].includes(
      this.aceCosell?.CoSellEntity?.LifeCycle?.ReviewStatus as StatusState
    );
  }
}

export const cosellActionValidator = (aceCosell: AceCosellProps) =>
  new CoSellActionValidator(aceCosell);
