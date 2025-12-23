export interface AceCosellProps {
  CoSellEntity?: CoSellEntity;
  CloudProviderStatus?: string;
  CloudProviderStage?: string;
  CloudProviderIdentifier?: string;
  Customer?: string | null;
  OpportunityName?: string | null;
  CreateDate?: string | null;
  ModifyDate?: string | null;
  RowNum?: number | null;
  TotalRows?: number | null;
  CRMMappingId?: string | number;
  HasError?: boolean;
  SellerCode?: string;
  ReferenceID?: string;
  Status?: string;
  CloudProvider?: string;
  ErrorMessage?: string[];
  CRMReferenceId?: string;
  DealType?: string;
  Version?: string | null;
  CRMOrigin?: string;
  IsSubmitOpportunity?: boolean;
  _saasify_opportunity_value?: string;
  _saasify_opportunity_value_value?: string;
}

export interface CoSellEntity {
  Catalog?: string;
  CreatedDate?: string;
  createTime?: string;
  ClientToken?: string | null;
  Customer?: Customer;
  Identifier?: string;
  LastModifiedDate?: string;
  LifeCycle?: LifeCycle;
  Marketing?: Marketing;
  NationalSecurity?: string;
  OpportunityTeam?: OpportunityTeam[];
  OpportunityType?: string;
  PartnerOpportunityIdentifier?: string | number;
  PartnerAcceptance?: any;
  PrimaryNeedsFromAws?: string[];
  Project?: Project;
  RelatedEntityIdentifiers?: RelatedEntityIdentifiers;
  SoftwareRevenue?: SoftwareRevenue;
  MarketplaceTransactions?: MarketplaceTransaction[];
  Invitation?: Invitation;
  AwsSummary?: AwsSummary;
}

export interface MarketplaceTransaction {
  MarketplaceOffer?: {
    OfferID?: string;
    OfferName?: string;
    OfferCreatedDate?: string;
    OfferExpiryDate?: string;
    ProductId?: string;
    ProductCode?: string;
    ProductName?: string;
  };
  MarketplaceAgreement?: {
    AgreementID?: string;
    ServiceStartDate?: string;
    ServiceEndDate?: string;
    OfferID?: string;
    BuyerAccountId?: string;
    AcceptanceTime?: string;
  };
}

interface SoftwareRevenue {
  DeliveryModel?: string;
  EffectiveDate?: string;
  ExpirationDate?: string;
  Value?: {
    Amount?: number;
    CurrencyCode?: string;
  };
}
interface Customer {
  Account?: Account;
  Contacts?: Contact[];
}

interface Account {
  Address?: Address;
  AwsAccountId?: string;
  CompanyName?: string;
  Duns?: string;
  Industry?: string;
  OtherIndustry?: string | null;
  WebsiteUrl?: string;
}

interface Address {
  City?: string;
  CountryCode?: string;
  PostalCode?: string;
  StateOrRegion?: string;
  StreetAddress?: string;
}

export interface Contact {
  Email?: string | null;
  FirstName?: string | null;
  LastName?: string | null;
  Phone?: string | null;
  BusinessTitle?: string | null;
}

interface LifeCycle {
  ClosedLostReason?: string | null;
  NextSteps?: string;
  NextStepsHistory?: StepHistory[];
  ReviewComments?: string | null;
  ReviewStatus?: string;
  ReviewStatusReason?: string | null;
  Stage?: string;
  TargetCloseDate?: string;
}

export interface StepHistory {
  Time?: string;
  Value?: string;
}

interface Marketing {
  AwsFundingUsed?: string | null;
  CampaignName?: string | null;
  Channels?: any[];
  Source?: string;
  UseCases?: any[];
}

export interface OpportunityTeam {
  Email?: string | null;
  FirstName?: string | null;
  LastName?: string | null;
  Phone?: string | null;
  BusinessTitle?: string | null;
}

interface Project {
  AdditionalComments?: string | null;
  ApnPrograms?: string[];
  CompetitorName?: string;
  CustomerBusinessProblem?: string;
  CustomerUseCase?: string;
  DeliveryModels?: string[];
  ExpectedCustomerSpend?: ExpectedCustomerSpend[];
  OtherCompetitorNames?: string | null;
  OtherSolutionDescription?: string | null;
  RelatedOpportunityIdentifier?: string | null;
  SalesActivities?: string[];
  Title?: string;
}

export interface ExpectedCustomerSpend {
  Amount?: number;
  CurrencyCode?: string;
  Frequency?: string;
  TargetCompany?: string;
}

interface RelatedEntityIdentifiers {
  AWSMarketplaceOffers?: any[];
  AWSProducts?: string[];
  Solutions?: string[];
}

interface Invitation {
  Arn?: string | null;
  Message?: string;
  Catalog?: string | null;
  EngagementTitle?: string | null;
  ExpirationDate?: string | null;
  Id?: string | null;
  InvitationDate?: string | null;
  Payload?: OpportunityInvitationPayload;
  PayloadType?: string | null;
  Receiver?: Receiver;
  RejectionReason?: string | null;
  InvitationMessage?: string | null;
  SenderAwsAccountId?: string | null;
  SenderCompanyName?: string | null;
  Status?: string | null;
}

interface Receiver {
  Account?: {
    Alias?: string;
    AwsAccountId?: string;
  };
}
interface OpportunityInvitationPayload {
  OpportunityInvitation?: {
    Customer?: {
      Account?: {
        Address?: {
          City?: string | null;
          CountryCode?: string;
          PostalCode?: string | null;
          StateOrRegion?: string | null;
          StreetAddress?: string | null;
        };
        AwsAccountId?: string | null;
        CompanyName?: string;
        Duns?: string | null;
        Industry?: string;
        OtherIndustry?: string | null;
        WebsiteUrl?: string;
      };
      WebsiteUrl?:string;
      CompanyName?: string;
      Contacts?: any | null;
      CountryCode?:string;
      PostalCode?:string;
      Industry?:string;
    };
    Project?: {
      AdditionalComments?: string | null;
      ApnPrograms?: string | null;
      CompetitorName?: string | null;
      CustomerBusinessProblem?: string;
      CustomerUseCase?: string;
      DeliveryModels?: string[];
      TargetCompletionDate?:string;
      ExpectedCustomerSpend?: {
        Amount?: number;
        CurrencyCode?: string;
        Frequency?: string;
        TargetCompany?: string;
      }[];
      BusinessProblem?:string;
      OtherCompetitorNames?: string | null;
      OtherSolutionDescription?: string | null;
      RelatedOpportunityIdentifier?: string | null;
      SalesActivities?: string | null;
      Title?: string;
    };
    ReceiverResponsibilities?: string[] | null;
    SenderContacts?: {
      Email?: string | null;
      FirstName?: string | null;
      LastName?: string | null;
      Phone?: string | null;
      BusinessTitle?: string | null;
    }[];
  };
}
interface AwsSummary {
  Catalog?: string;
  Customer?: { Contacts?: any | null };
  Insights?: Insights;
  InvolvementType?: string;
  InvolvementTypeChangeReason?: string | null;
  LifeCycle?: AwsLifeCycle;
  OpportunityTeam?: OpportunityTeam[];
  Origin?: string;
  Project?: { ExpectedCustomerSpend?: ExpectedCustomerSpend[] };
  RelatedEntityIds?: any | null;
  RelatedOpportunityId?: string;
  Visibility?: string;
}

interface Insights {
  EngagementScore?: string | null;
  NextBestActions?: string | null;
}

interface AwsLifeCycle {
  ClosedLostReason?: string | null;
  NextSteps?: string;
  NextStepsHistory?: StepHistory[];
  Stage?: string | null;
  TargetCloseDate?: string;
}
