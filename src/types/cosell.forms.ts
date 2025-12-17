export interface dateFormat {
  year: number;
  month: number;
  date: number;
}

export interface DataPropertyType {
  customerDuns?: string;
  customerCompanyName?: string;
  industryVertical?: string;
  industryOther?: string;
  state?: string;
  streetAddress?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  customerWebsite?: string;
  nationalSecurity?:string;
  awsCosell?: string[];
  parentOpportunityId?: string | number;
  partnerProjectTitle?: string;
  relatedOpportunityIndentifier?: string;
  salesActivities?: string[];
  customerBusinessProblem?: string;
  solutionsOffered?: string[];
  awsProducts?: string[];
  nextStep?: string;
  useCase?: string;
  marketingSource?: string;
  deliveryModel?: string[];
  estimatedAWSRecurringRevenue?: number;
  apnProgram?: string[];
  marketingCampaign?: string | null;
  marketingUseCase?: string[];
  marketingActivityChannel?: string[];
  isMarketingfunds?: string | null;
  crmUniqueIdentifier?: string | number;
  competitiveTracking?: string;
  otherCompetitors?: string;
  awsAccountId?: string;
  additonalComments?: string | null;
  contactFirstName?: string;
  contactLastName?: string;
  contactTitle?: string;
  contactEmail?: string;
  contactPhone?: string | null;
  targetCloseDate?: dateFormat | null;
  opportunityType?: string;
  primaryContactFirstName?: string;
  primaryContactLastName?: string;
  primaryContactPhone?: string;
  primaryContactEmail?: string;
  primaryContactTitle?: string;
  primaryNeedState?: string[];
}

export interface opportunityType {
  "Net New Business"?: boolean;
  Expansion?: boolean;
  "Flat Renewal"?: boolean;
}
