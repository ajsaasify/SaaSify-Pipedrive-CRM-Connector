export interface OpportunityLine {
  displayName?: string;
  quantity?: number;
  salesPrice?: CurrencyAmount;
  listPrice?: CurrencyAmount;
  totalPrice?: CurrencyAmount;
  metric?: string;
  description?: string;
}

export interface CurrencyAmount {
  currencyCode?: string;
  units?: string;
  nanos?: number;
}

export interface CustomerContact {
  givenName?: string;
  familyName?: string;
  title?: string;
  role?: string;
  primary?: boolean;
}

export interface Address {
  revision?: number;
  regionCode?: string;
  languageCode?: string;
  postalCode?: string;
  sortingCode?: string | null;
  administrativeArea?: string;
  locality?: string;
  sublocality?: string | null;
  addressLines?: string[];
  recipients?: string[] | null;
  organization?: string | null;
}

export interface IsvSolutionConnectInfo {
  isvSolutionConnectDeal?: boolean;
  customerContactRequested?: boolean;
  supportLevel?: string;
  contractVehicle?: string;
  deliveryModel?: string;
  notes?: string;
  nextStep?: string;
}

export interface CustomerDetails {
  organizationName?: string;
  domain?: string;
  address?: Address;
  industry?: string;
  employeeCount?: number;
}

export interface Contact {
  givenName?: string;
  familyName?: string;
  email?: string;
  phone?: { e164Number?: string };
  primary?: boolean;
}

export interface CustomerInfo {
  customerDetails?: CustomerDetails;
  contact?: Contact;
  region?: string;
}

export interface QualificationInfo {
  dealNumber?: string | null;
  operationType?: string;
  contractLengthMonths?: number;
  quantity?: number;
  dealSize?: CurrencyAmount;
  estimatedCloseDate?: {
    year?: number;
    month?: number;
    day?: number;
  };
  publicSector?: boolean;
  budget?: string;
  authority?: string;
  need?: string;
  timeline?: string;
  campaignCode?: string;
  msspDeal?: boolean;
  legalLanguageAccepted?: boolean;
  decisionPhase?: string;
  region?: string;
  publicTenderAttestation?: boolean;
}

interface DateInfo {
  year?: number;
  month?: number;
  day?: number;
}
interface OpportunityTeamMember {
  name?: string;
  email?: string;
  accessLevel?: number;
}
interface SalesCycle {
  closeDate?: DateInfo;
  partnerReadyToClose?: string | number;
  closeDatePushCount?: number;
  prmSiteDetails?: any;
}

export interface PartnerInfo {
  incentiveEligibility?: boolean;
  incentiveType?: number;
  contractExpiryDate?: DateInfo;
  rebateExpirationDate?: DateInfo;
  distributor?: string;
  subBillingAccountId?: string;
  extensionsCount?: number;
  gcpProjectNumbers?: string[];
  submittedDate?: DateInfo;
  approvedDate?: DateInfo;
  approveTime?: string;
}

export interface GcpCoSellEntity {
  name?: string | null;
  customerDisplayName?: string;
  state?: string;
  stateDescription?: string;
  stage?: string;
  owner?: string;
  createTime?: string;
  updateTime?: string;
  ownerEmail?: string;
  creatorEmail?: string;
  source?: string;
  opportunityInfo?: {
    partnerEntity?: string;
    indirectPartnerEntity?: string | null;
    displayName?: string;
    description?: string;
    productFamily?: string[];
    productCategory?: string[];
    confidential?: boolean;
    gcpWatermark?: number;
    opportunityAmount?: CurrencyAmount;
    contractVehicle?: string;
    deliveryModel?: string;
    supportLevel?: string;
  };
  partnerInfo: PartnerInfo;
  salesCycle?: SalesCycle;
  opportunityTeamMembers?: OpportunityTeamMember[];
  isvSolutionConnectInfo?: IsvSolutionConnectInfo;
  qualificationInfo?: QualificationInfo;
  partnerOpportunityIdentifier?: string;
  customerInfo?: CustomerInfo;
  opportunityLines?: OpportunityLine[];
  customerContacts?: CustomerContact[];
}

export interface GCPCosellResponse {
  CloudProviderStatus?: string;
  CloudProviderStage?: string;
  CloudProviderIdentifier?: string | null;
  Customer?: string | null;
  OpportunityName?: string | null;
  CreateDate?: string | null;
  ModifyDate?: string | null;
  RowNum?: number | null;
  TotalRows?: number | null;
  CRMMappingId?: string | null;
  HasError?: boolean;
  CoSellEntity?: GcpCoSellEntity;
  SellerCode?: string;
  ReferenceID?: string;
  Status?: string;
  CloudProvider?: string;
  ErrorMessage?: string[];
  CRMReferenceId?: string;
  DealType?: string;
  Version?: string | null;
  CRMOrigin?: string;
}
