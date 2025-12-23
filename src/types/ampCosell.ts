export interface CustomerDetails {
  Duns?: string;
  AddressLine1?: string;
  AddressLine2?: string;
  Name?: string;
  City?: string;
  State?: string;
  PostalCode?: string;
  Country?: string;
}

export interface CustomerContactDetails {
  FirstName?: string;
  LastName?: string;
  PhoneNumber?: string;
  Email?: string;
}

export interface CloudAssistance {
  CanDealViewedBySeller?: boolean;
  CloudAssistanceCode?: string;
  NotesForCloudAssistance?: string;
}

export interface DealDetails {
  DealValue?: number;
  CurrencyType?: string;
  Location?: string;
  CustomerMarketplaceIntent?: string;
  PartnerRole?: string;
  SolutionArea?: string;
  SolutionPlay?: string;
  Name?: string;
  Description?: string;
  TargetCloseDate?: string;
  CRMId?: string;
  CloudAssistance?: CloudAssistance;
  MarketingCampaignId?: string;
}

export interface PartnerDetails {
  SalesTeam?: Array<{
    FirstName?: string;
    LastName?: string;
    PhoneNumber?: string;
    Email?: string;
  }>;
}

export interface TeamMembers {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}
export interface MicrosoftSolution {
  ID?: string;
  Name?: string;
  IPCoSellEligible?: string;
  PublisherName?: string;
}

export interface CloudProviderDetails {
  IsConsentAccepted?: boolean;
  MicrosoftSolutions?: MicrosoftSolution[];
  ClosingNote?: string;
  MicrosoftTeam?: any[];
  MicrosoftStatus?: string;
  CreatedDate?: string;
  LastModifiedDate?: string;
  ReferenceID?: string;
  Status?: string;
  Stage?: string;
  ClosingReason?: string;
  ErrorMessage?: any[];
}

export interface CoSellOpportunityJson {
  CustomerDetails?: CustomerDetails;
  CustomerContactDetails?: CustomerContactDetails;
  DealDetails?: DealDetails;
  PartnerDetails?: PartnerDetails;
  CloudProviderDetails?: CloudProviderDetails;
}

export interface LastRunId {
  ValueKind?: number;
}

export interface Address {
  AddressLine1?: string;
  AddressLine2?: string;
  City?: string;
  State?: string;
  PostalCode?: string;
  Country?: string;
  Region?: string;
}

export interface TeamMember {
  FirstName?: string;
  LastName?: string;
  PhoneNumber?: string;
  Email?: string;
  Title?: string;
  EmailValidationStatus?: string;
  PhoneValidationStatus?: string;
  ContactPreference?: {
    Locale?: string | null;
    DisableNotifications?: boolean | null;
  };
}

export interface Id {
  ProfileType?: string;
  Id?: string;
}

export interface CustomerProfile {
  Name?: string;
  Size?: string | null;
  IsMatchingComplete?: boolean;
  Address?: Address;
  Team?: TeamMember[];
  Ids?: Id[];
}

export interface Consent {
  ConsentToToShareInfoWithOthers?: boolean;
  ConsentToContact?: boolean;
  ConsentToMicrosoftToContactSpecificPartners?: boolean | null;
  ConsentToShareReferralWithMicrosoftSellers?: boolean;
}

export interface Solution {
  Id?: string;
  Name?: string | null;
  Type?: string;
  Price?: number | null;
  Quantity?: number | null;
  Currency?: string | null;
  PublisherName?: string | null;
  SolutionType?: string | null;
  ClosingDateTime?: string | null;
}

export interface AdditionalRequirement {
  Type?: string;
  Id?: string;
}

export interface Requirements {
  Industries?: string | null;
  Products?: string | null;
  Services?: string | null;
  Solutions?: Solution[];
  Offers?: string | null;
  SalesPlays?: string | null;
  AdditionalRequirements?: {
    Iot?: string | null;
    Attributes?: AdditionalRequirement[];
  };
}

export interface Details {
  Notes?: string | null;
  DealValue?: number;
  Currency?: string;
  ClosingDateTime?: string;
  CustomerRequestedContact?: string | null;
  CustomerAction?: string | null;
  IncentiveLevel?: string | null;
  Requirements?: Requirements;
}

export interface InviteContext {
  Notes?: string | null;
  AssistanceRequestCode?: string;
  InvitedMpnId?: string;
  InvitedBy?: {
    OrganizationId?: string;
    OrganizationName?: string;
  };
}

export interface Link {
  Uri?: string;
  Method?: string;
}

export interface Links {
  RelatedReferrals?: Link;
  Self?: Link;
}

export interface TrackingInfo {
  MicrosoftMsxId?: string | null;
  MicrosoftUSFedOpportunityId?: string | null;
  MicrosoftUSFedLeadId?: string | null;
  MigratedPSCDealId?: string | null;
  MigratedPSCPartnerDealId?: string | null;
}

export interface MainReferral {
  Id?: string;
  EngagementId?: string;
  Name?: string;
  OrganizationId?: string;
  OrganizationName?: string;
  LastModifiedVia?: string;
  LastRunId?: LastRunId;
  ExternalReferenceId?: string;
  CreatedDateTime?: string;
  UpdatedDateTime?: string;
  ExpirationDateTime?: string | null;
  Status?: string;
  Substatus?: string;
  StatusReason?: string | null;
  Qualification?: string;
  Type?: string;
  ReferralSource?: string | null;
  ETag?: string;
  Favorite?: boolean;
  CampaignId?: string | null;
  SalesStage?: string | null;
  Quality?: string;
  IsSpam?: boolean;
  Direction?: string;
  MPNId?: string;
  ReferralProgram?: string | null;
  DealSensitivity?: string;
  CreatedVia?: string;
  Tags?: string | null;
  AcceptedDateTime?: string;
  ClosedDateTime?: string | null;
  CallToAction?: string | null;
  RegistrationStatus?: string;
  Target?: any[];
  CustomerProfile?: CustomerProfile;
  Consent?: Consent;
  Details?: Details;
  Team?: TeamMember[];
  InviteContext?: InviteContext;
  Links?: Links;
  TrackingInfo?: TrackingInfo;
  Registrations?: string | null;
  Exception?: string | null;
}

export interface CloudResultJson {
  MainReferral?: MainReferral;
  MSEngagedReferral?: string | null;
}

export interface AmpCosellResponse {
  CRMIdentifier?: string;
  CRMReferenceId?: string;
  CoSellOpportunityJson?: CoSellOpportunityJson;
  CoSellEntity?: CoSellOpportunityJson;
  ReferralType?: string;
  DealType?: string;
  SaaSifyStatus?: string;
  CloudProvider?: string;
  CloudStatus?: string;
  CloudStage?: string | null;
  CloudIdentifier?: string;
  ErrorDetail?: string;
  CloudResultJson?: CloudResultJson;
  Version?: string;
  SellerCode?: string;
  ReferenceID?: string;
  CRMMappingID?: string | null;
  CallbackSystem?: string;
}
