import { StatusState } from "../../enum/status.enum";

const colors = [
  "aqua",
  "purple",
  "orange",
  "green",
  "blue",
  "pink",
  "darkOrange",
  "darkAqua",
  "darkPurple",
  "darkYellow",
  "darkPink",
  "darkBlue",
  "darkGreen",
];

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
  AMP: 1,
};

const preDefinedProviderColor = {
  "GCP Marketplace": colors[0],
  "Azure Marketplace": colors[1],
  "AWS Marketplace": colors[2],
};

const subscriberColor = {
  SubscribedCount: colors[3],
  UnSubscribedCount: colors[5],
};

export const requestPayload = {
  sellerCode: "auto",
  dealType: dealTypes,
  cloudProviderStatus,
  crmOrigin: "HubSpot",
  clouds: { google: "Google" },
  crmMappingId: 4,
  cloudProvider: cloudNames.aws,
  cloud: cloudNames,
  isSubmitOpportunity: false,
  isDuplicateOpportunity: false,
  crmEntity: "Deal",
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
    stageExlude: ["created", "accepted"],
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
  color: colors,
  preDefinedProviderColor,
  subcriberColor: subscriberColor,
};
