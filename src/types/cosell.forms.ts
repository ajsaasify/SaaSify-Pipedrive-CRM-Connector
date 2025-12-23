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
  state?: string | null;
  streetAddress?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  customerWebsite?: string;
  nationalSecurity?: string;
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
export interface ErrorValueInterface {
  // Customer
  customerDuns?: boolean;
  customerCompanyName?: boolean;
  country?: boolean;
  state?: boolean;
  city?: boolean;
  streetAddress?: boolean;
  postalCode?: boolean;
  industryVertical?: boolean;
  industryOther?: boolean;
  customerWebsite?: boolean;

  // Project / Opportunity
  awsCosell?: boolean;
  partnerPrimaryNeedAction?: boolean;
  opportunityType?: boolean;
  relatedOpportunityIndentifier?: boolean;
  partnerProjectTitle?: boolean;
  salesActivities?: boolean;
  customerBusinessProblem?: boolean;
  solutionsOffered?: boolean;
  awsProducts?: boolean;
  nextStep?: boolean;
  useCase?: boolean;
  deliveryModel?: boolean;
  estimatedAWSRecurringRevenue?: boolean;
  targetCloseDate?: boolean;
  apnProgram?: boolean;

  // Marketing
  marketingSourceAction?: boolean;
  marketingSourceIsMarketingFundsAction?: boolean;
  marketingCampaign?: boolean;
  marketingUseCase?: boolean;
  marketingActivityChannel?: boolean;
  isMarketingfunds?: boolean;

  // Additional
  crmUniqueIdentifier?: boolean;
  competitiveTracking?: boolean;
  otherCompetitors?: boolean;
  awsAccountId?: boolean;
  additonalComments?: boolean;

  // Contact
  contactFirstName?: boolean;
  contactLastName?: boolean;
  contactTitle?: boolean;
  contactPhone?: boolean;
  contactEmail?: boolean;

  // Partner Sales Contact
  primaryContactFirstName?: boolean;
  primaryContactLastName?: boolean;
  primaryContactEmail?: boolean;
}
