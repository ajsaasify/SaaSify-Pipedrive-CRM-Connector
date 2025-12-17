import { PartnerType } from "../../enum/partnerType.enum";
import { StageState } from "../../enum/stage.enum";
import { StatusState } from "../../enum/status.enum";

export const validationConstraint = Object.freeze({
  editCosell: {
    approve: {
      status: [
        StatusState.APPROVED,
        StatusState.ACCEPTED,
        StatusState.ACTION_REQUIRED,
        StatusState.PENDING_SUBMISSION,
      ],
      stage: [],
    },
    reject: {
      status: [],
      stage: [StageState.LAUNCHED, StageState.CLOSED_LOST],
    },
  },
  updateCosell: {
    approve: {
      status: [StatusState.APPROVED],
      stage: [StageState.LAUNCHED],
      partnerType: PartnerType.ISV,
    },
    reject: { status: [], stage: [] },
  },
  changeStage: {
    status: [
      StatusState.REJECTED,
      StatusState.ACTION_REQUIRED,
      StatusState.SUBMITTED,
      StatusState.PENDING_SUBMISSION,
      StatusState.IN_REVIEW,
    ],
    stage: [StageState.CLOSED_LOST, StageState.LAUNCHED],
  },
  transferCosell: {
    status: [
      StatusState.REJECTED,
      StatusState.SUBMITTED,
      StatusState.PENDING_SUBMISSION,
      StatusState.IN_REVIEW,
    ],
    stage: [StageState.LAUNCHED, StageState.CLOSED_LOST],
  },
  associateOffer: {
    status: [
      StatusState.REJECTED,
      StatusState.ACTION_REQUIRED,
      StatusState.SUBMITTED,
      StatusState.PENDING_SUBMISSION,
      StatusState.IN_REVIEW,
    ],
    stage: [StageState.CLOSED_LOST],
  },
  nextStep: {
    approve: {
      status: [StatusState.ACTION_REQUIRED, StatusState.APPROVED],
      stage: [],
    },
    reject: {
      stage: [],
      status: [
        StatusState.PENDING_SUBMISSION,
        StatusState.ACTION_REQUIRED,
        StatusState.IN_REVIEW,
        StatusState.PENDING,
      ],
    },
  },
  linkCrm: {
    reject: {
      status: [StatusState.REJECTED],
      stage: [StageState.LAUNCHED, StageState.CLOSED_LOST],
    },
  },
  createCosell: {
    status: [StatusState.REJECTED],
  },
  invitation: {
    status: [StatusState.PENDING, StatusState.EXPIRED, StatusState.REJECTED],
    multiPartner: [
      StatusState.PENDING,
      StatusState.ACCEPTED,
      StatusState.EXPIRED,
      StatusState.REJECTED,
    ],
  },
  invitationPending: {
    status: [StatusState.PENDING],
  },
});
