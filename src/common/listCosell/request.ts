import { StatusState } from "../../enum/status.enum";

export const requestPayload = {
  sellerCode: "auto",
  dealType: {
    ao: "AWS Referral",
    po: "Partner Referral",
    multiPartner: "multi-partner",
    inbound: "Multi-Partner Inbound",
  },
  cloudProviderStatus: {
    ao: StatusState.PENDING,
    po: StatusState.PENDING_SUBMISSION,
  },
  crmOrigin: "HubSpot",
  clouds: { google: "Google" },
  crmMappingId: 4,
  cloudProvider: "AWS",
  cloud: { aws: "AWS", gcp: "GCP", amp: "AMP" },
  isSubmitOpportunity: false,
  isDuplicateOpportunity: false,
  crmEntity: "Deal",
  version: { AWS: 3, GCP: 1, AMP: 1 },
  dealname: "dealname",
  engagementModal: "build",
  defaultView: "Default",
  privateOffers: "Private offers",
  defaultDeals: "saaSify deal",
  us: "United States",
  amp: {
    dealType: "Service Co-sell",
  },
  oid: "engi",
};
