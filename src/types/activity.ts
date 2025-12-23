export interface Activitylog {
  TotalRows?: number;
  ActivityType?: string;
  ActivityDate?: string;
  Description?: string;
  ActivityInitiator?: string;
  Context?: {
    EventName?: string;
    CoSellDetails?: {
      CRMID?: string;
      CRMName?: string;
      CRMOpportunityID?: string | null;
      CRMOpportunityName?: string | null;
      ReferenceID?: string;
      CoSellName?: string;
      CloudCoSellIdentifier?: string;
      SchedulerAction?: string | null;
      ErrorMessage?: string;
    }[];
    ProviderReferenceIdentifier?: string;
    SaaSifyReferenceId?: string;
    CRMReferenceId?: string;
    ErrorMessage?: string;
    EventProccesedTime?: string;
    RequestId?: string;
    OriginOfError?: string;
    UserName?: string | null;
  };
  EventDescription?: string;
  ActivityLogID?: number;
  SupportReprocess?: boolean;
  LastReprocessDate?: string | null;
  EventSeverity?: string;
}
