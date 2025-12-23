import { StatusState } from "@template/enum/status.enum";

const cloudNames = {
  aws: "AWS",
  gcp: "GCP",
  amp: "AMP",
};

const dealTypes = {
  ao: "AWS Referral",
  po: "Partner Referral",
  multiPartner: "multi-partner",
  inbound: "Multi-Partner Inbound",
};

const cloudProviderStatus = {
  ao: StatusState.PENDING,
  po: StatusState.PENDING_SUBMISSION,
};

const versions = {
  AWS: 3,
  GCP: 1,
  AMP: "1",
};

export const requestPayload = {
  sellerCode: "auto",
  dealType: dealTypes,
  cloudProviderStatus,
  crmOrigin: "Pipedrive",
  clouds: { google: "Google" },
  crmMappingId: 4,
  cloudProvider: cloudNames.aws,
  cloud: cloudNames,
  isSubmitOpportunity: false,
  isDuplicateOpportunity: false,
  crmEntity: "Opportunity",
  version: versions,
  dealname: "dealname",
  sellerConfigurationType: "Cosell",
  engagementModal: "build",
  defaultView: "Default",
  privateOffers: "Private offers",
  defaultDeals: "saaSify deal",
  us: "United States",
  amp: {
    dealType: "Service",
    private: "Private",
    ip: "IP Co-sell",
    stage: ["Won", "Lost"],
    stageExlude: ["created", "accepted", "won"],
    triggerLost: "Lost",
    stageLost: "Prospect",
    stageWon: { label: "Request to Lost", value: "Lost" },
  },
  gcp: {
    stage: {
      label: "Request to close",
      value: "REQUEST_TO_CLOSE",
    },
  },
  oid: "engi",
  statisticsView: "Statistics",
  providerProps: "ProviderName",
  stages: [
    "Prospect",
    "Qualified",
    "Technical Validation",
    "Business Validation",
    "Committed",
    "Launched",
    "Closed Lost",
  ],
  paginator: {
    StartInd: 1,
    EndInd: 10,
  },
};
