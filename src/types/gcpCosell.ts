export interface GCPCosellResponse {
  CoSellEntity?: CoSellEntity;
  CloudProviderStatus?: string;
  SellerCode?: string;
  ReferenceID?: string;
  [key: string]: any;
}

export interface CoSellEntity {
  name?: string;
  stage?: string;
  state?: string;
  source?: string;
  owner?: string;
  ownerEmail?: string;
  createTime?: string;
  updateTime?: string;
  creatorEmail?: string;
  opportunityInfo?: OpportunityInfo;
  qualificationInfo?: QualificationInfo;
  customerInfo?: CustomerInfo;
  partnerInfo?: PartnerInfo;
  salesCycle?: SalesCycle;
  isvSolutionConnectInfo?: IsvSolutionConnectInfo;
  [key: string]: any;
}

export interface OpportunityInfo {
  displayName?: string;
  productFamily?: string[];
  confidential?: boolean;
  description?: string;
}

export interface QualificationInfo {
  dealSize?: Money;
  estimatedCloseDate?: DateObj;
  contractLengthMonths?: number;
  decisionPhase?: string;
  campaignCode?: string;
}

export interface CustomerInfo {
  customerDetails?: CustomerDetails;
  region?: string;
}

export interface CustomerDetails {
  organizationName?: string;
  domain?: string;
  address?: Address;
  employeeCount?: number;
  industry?: string;
}

export interface Address {
  administrativeArea?: string;
  locality?: string;
  postalCode?: string;
  regionCode?: string;
  addressLines?: string[];
}

export interface PartnerInfo {
  approveTime?: string;
}

export interface SalesCycle {
  closeDatePushCount?: number;
}

export interface IsvSolutionConnectInfo {
  contractVehicle?: string;
  deliveryModel?: string;
  supportLevel?: string;
}

export interface Money {
  currencyCode?: string;
  units?: string;
  nanos?: number;
}

export interface DateObj {
  year?: number;
  month?: number;
  day?: number;
}
