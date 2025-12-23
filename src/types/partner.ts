import type { OpportunityTeam } from "./cosellResponse";

export interface PartnerConnectionProps {
  Catalog?: string;
  EngagementId?: string;
  ResourceId?: string;
  ResourceType?: string;
  PartnerAwsAccountId?: string;
  PartnerName?: string;
  Status?: string;
  OpportunitySummary?: {
    OpportunityTeam?: Array<{
      Email?: string;
      FirstName?: string;
      LastName?: string;
      Phone?: string | null;
      BusinessTitle?: string;
    }>;
    OpportunityType?: string;
    PrimaryNeedsFromAws?: string[];
    Customer?: {
      Account?: {
        Address?: {
          City?: string;
          CountryCode?: string;
          PostalCode?: string;
          StateOrRegion?: string;
          StreetAddress?: string | null;
        };
        AwsAccountId?: string;
        CompanyName?: string;
        Duns?: string;
        Industry?: string;
        OtherIndustry?: string | null;
        WebsiteUrl?: string;
      };
      Contacts?: Array<{
        Email?: string;
        FirstName?: string;
        LastName?: string;
        Phone?: string | null;
        BusinessTitle?: string;
      }>;
    };
    RelatedEntityIdentifiers?: {
      AWSMarketplaceOffers?: string[];
      AWSProducts?: string[];
      Solutions?: string[];
    };
    LifecycleSummary?: {
      NextSteps?: string;
      ReviewStatus?: string;
      Stage?: string;
      TargetCloseDate?: string;
    };
    ProjectSummary?: {
      CustomerUseCase?: string;
      DeliveryModels?: string[];
      OtherSolutionDescription?: string | null;
      SalesActivities?: string[];
      ExpectedCustomerSpend?: Array<{
        Amount?: number;
        CurrencyCode?: string;
        Frequency?: string;
        TargetCompany?: string;
      }>;
    };
  } | null;
  Invitation?: {
    Arn?: string;
    Catalog?: string;
    EngagementTitle?: string;
    ExpirationDate?: string;
    Id?: string;
    InvitationDate?: string;
    Payload?: {
      OpportunityInvitation?: {
        Customer?: {
          CompanyName?: string;
          CountryCode?: string;
          Industry?: string;
          WebsiteUrl?: string;
        };
        Project?: {
          BusinessProblem?: string;
          ExpectedCustomerSpend?: Array<{
            Amount?: number;
            CurrencyCode?: string;
            Frequency?: string;
            TargetCompany?: string;
          }>;
          TargetCompletionDate?: string;
          Title?: string;
        };
        ReceiverResponsibilities?: string[] | null;
        SenderContacts?: OpportunityTeam[];
      };
    };
    PayloadType?: string;
    Receiver?: {
      Account?: {
        Alias?: string;
        AwsAccountId?: string;
      };
    };
    RejectionReason?: string | null;
    SenderAwsAccountId?: string;
    SenderCompanyName?: string;
    Status?: string;
    ResponseMetadata?: {
      RequestId?: string;
    };
    Message?: string;
  } | null;
}
