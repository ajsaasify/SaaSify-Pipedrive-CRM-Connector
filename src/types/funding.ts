export type ErrorFormType = {
  [key: string]: any;
  cashClaimTiles?: {
    [index: number]: {
      [field: string]: string;
    };
  };
};

export type AmountBlock = {
  label: string;
  value: string;
};

export interface FundingTemplate {
  program: string;
  subProgram: string;
  fundingType: string;
  migrationPhase: any;
  annualRunRate: AnnualRunRate;
  accountPifProgramId: string;
  isvWmpSecondTrancheConsentCaptured: boolean;
}

export interface AnnualRunRate {
  units: any;
  nanos: number;
  currency: string;
}

export interface Owner {
  userAccountId: string;
  userName: string;
}

export interface Details {
  activityName: string;
  businessDescription: string;
  awsCalculatorUrl: any;
  sandboxDesignWinActivity: any;
  majorityPublicSector: boolean;
  arn: any;
}

export interface Opportunity {
  aceOpportunityId: string;
  awsPartnerManager: string;
  wwps: boolean;
  opportunityDetail: OpportunityDetail;
  mpeRecordExists: any;
}

export interface OpportunityDetail {
  opportunityId: string;
  opportunityOwner: string;
  opportunityOwnership: string;
  targetCloseDate: string;
  projectDescription: string;
  status: string;
  aceValidationStage: string;
  customerCompanyName: string;
}

export interface Project {
  awsAccountId: any;
  awsAccountIds: any;
  plannedStartDate: string;
  plannedEndDate: string;
  executedCountry: string;
  executedState: any[];
  projectType: any;
  customerConsidering: any;
  annualRunRateForMisc: AnnualrunRateForMisc;
  workloadName: any;
  newServiceDeployed: any;
  projectRoi: any;
  otherNotes: any;
  existingWorkloadSource: any;
  awsArrCalculationType: any;
}

export interface ProjectExtension {
  extendedStartDate: any;
  extendedEndDate: any;
  extendedReason: any;
}

export interface Migrations {
  informationalLetterId: any;
  workloads: any[];
}

export interface PublicSector {
  customerRfx: boolean;
  wwpsConsent: boolean;
}

export interface CashRequest {
  currency: any;
  totalCostOfActivity: TotalCostOfActivity;
  partnerContribution: PartnerContribution;
  otherPartyContribution: OtherPartyContribution;
  cashFundingAmount: CashFundingAmount;
  totalMdfCashAmount: TotalMdfCashAmount;
  invoiceEntityName: string;
  invoiceRemitAddress: string;
  invoiceRemitCountry: string;
  purchaseOrder: PurchaseOrder;
  cashClaims: CashClaims;
  numberOfClaims: number;
  approvedCashAmount: ApprovedCashAmount;
  cashBudgetInfo: any;
}

export interface TotalCostOfActivity {
  units: number;
  nanos: number;
  currency: string;
}

export interface AnnualrunRateForMisc {
  units: number;
  nanos: number;
  currency: string;
}

export interface PartnerContribution {
  units: number;
  nanos: number;
  currency: string;
}

export interface OtherPartyContribution {
  units: number;
  nanos: number;
  currency: string;
}

export interface CashFundingAmount {
  units: number;
  nanos: number;
  currency: string;
}

export interface TotalMdfCashAmount {
  units: number;
  nanos: number;
  currency: string;
}

export interface ApprovedCashAmount {
  units: number;
  nanos: number;
  currency: string;
}

export interface Amount {
  units: number;
  nanos: number;
  currency: string;
}
export interface AmountUsd {
  units: number;
  nanos: number;
  currency: string;
}
export interface IssuranceDate {
  timestamp: number;
}
export interface PurchaseOrder {
  currency: any;
  amount: Amount;
  amountUsd: AmountUsd;
  number: any;
  issuranceDate: IssuranceDate;
  issured: boolean;
  approvedAmount: any;
}

export interface CashClaim {
  fundClaimId: string;
  stage: string;
  plan: {
    mdfActivityType: string | null;
    startDate: string;
    endDate: string;
    dueDate: string;
    percentageCompletion: number | null;
    expectedRevenueRamp: {
      units: number;
      nanos: number;
      currency: string;
    } | null;
    totalCostOfMdfActivity: {
      units: number;
      nanos: number;
      currency: string;
    } | null;
    requestedMdfCashFunding: {
      units: number;
      nanos: number;
      currency: string;
    } | null;
    mdfFundingPercentage: number | null;
    mdfNumberOfProjectedLeads: number | null;
  };
  actual: {
    claimAmount: {
      units: number;
      nanos: number;
      currency: string;
    };
    awsAccountId: string | null;
    customerSignOffAttached: boolean | null;
    startDate: string;
    endDate: string;
    productionDate: string | null;
    completed: boolean;
  };
  invoice: {
    scheduledPaidDate: string;
    currency: string | null;
    amount: {
      units: number;
      nanos: number;
      currency: string;
    } | null;
  };
}

export interface CashClaims {
  [claimId: string]: CashClaim;
}

export interface CreditRequest {
  valuePerCode: ValuePerCode;
  numberOfCodes: number;
  requestedCreditAmount: RequestedCreditAmount;
  awsAccountId: string;
  mdfCreditActivityType: any;
  approvedCreditAmount: ApprovedCreditAmount;
  issuedCreditAmount: any;
  currency: any;
  totalCostOfActivity: any;
  creditBudgetInfo: CreditBudgetInfo;
}

export interface ValuePerCode {
  units: number;
  nanos: number;
  currency: string;
}

export interface RequestedCreditAmount {
  units: number;
  nanos: number;
  currency: string;
}

export interface ApprovedCreditAmount {
  units: number;
  nanos: number;
  currency: string;
}

export interface CreditBudgetInfo {
  budgetId: string;
  budgetRecordType: string;
  budgetName: any;
  budgetStartDate: string;
  budgetEndDate: string;
  fundingTemplate: string;
  fundingType: string;
  fundingContract: string;
  fundingContractName: string;
  fundingContractType: any;
  fundingBenefitType: any;
}
export interface FundingResponse extends BenefitApplicationResponse {
  ReferenceID?: string;
  CRMReferenceId?: string;
  cloudProvider?: string;
  CloudProviderStatus?: any;
  CloudProviderStage?: any;
  CloudProviderIdentifier?: string;
  ErrorMessage?: any;
  SellerCode?: string;
  CRMOrigin?: string;
  Version?: any;
  CreateDate?: any;
  ModifyDate?: any;
  CustomerName?: any;
  HasError?: boolean;
  ActivityName?: string;
  FundRequestEntity?: FundingEntity;
  Template?: string;
}

export interface FundingEntity {
  fundRequestId?: any;
  status?: string;
  stage?: string;
  fundingTemplate?: FundingTemplate;
  owner?: Owner;
  details?: Details;
  opportunity?: Opportunity;
  project?: Project;
  projectExtension?: ProjectExtension;
  migrations?: Migrations;
  publicSector?: PublicSector;
  cashRequest?: CashRequest;
  creditRequest?: CreditRequest;
  pifProgramName?: string;
  pifFundingMotion?: string;
  files?: any[];
  estimatedRequestedAmountUsd?: any;
}
// ------------------ Benefit Application Response ------------------

export interface BenefitApplicationResponse {
  TotalRows?: number;
  RowNum?: number;
  Version?: string;
  SellerCode?: string;
  SaaSifyReferenceID?: string;
  CRMReferenceId?: string;
  CRMOrigin?: string;
  CloudProvider?: string;
  errorMessage?: any[];
  BenefitApplication?: BenefitApplication;
}

// ------------------ Benefit Application ------------------

export interface BenefitApplication {
  Arn?: string;
  CreatedAt?: string;
  Catalog?: string;
  BenefitId?: string;
  Id?: string;
  Name?: string | null;
  Description?: string;
  Programs?: string[];
  FulfillmentTypes?: string[];
  PartnerContacts?: PartnerContact[];
  Tags?: any[] | null;
  AssociatedResources?: any[];
  FileDetails?: any[];
  Revision?: string;
  Stage?: string | null;
  Status?: string;
  StatusReason?: string | null;
  StatusReasonCode?: string | null;
  UpdatedAt?: string;
  BenefitApplicationDetails?: BenefitApplicationDetails;
}

// ------------------ Partner Contact ------------------

export interface PartnerContact {
  BusinessTitle?: string;
  Email?: string;
  FirstName?: string;
  LastName?: string;
  Phone?: string;
}

// ------------------ Benefit Application Details ------------------

export interface BenefitApplicationDetails {
  AwsCalculatorUrls?: string[];
  Program?: string;
  ActivityName?: string;
  CreditRequest?: CreditRequest;
  CustomerConsidering?: string;
  ExecutedState?: string[];
  Wwps?: boolean;
  CustomerRfx?: boolean;
  Template?: string;
  PlannedStartDate?: string;
  BusinessDescription?: string;
  BudgetYear?: number;
  MajorityPublicSector?: boolean;
  OtherNotes?: string;
  CashRequest?: CashClaimRequest;
  WorkloadName?: string;
  WwpsConsent?: boolean;
  ExecutedCountry?: string;
  PlannedEndDate?: string;
  NewServiceDeployed?: boolean;
  AwsAccountId?: string;
  CashRequestedAmount?: AmountCurrency;
  CashCurrency?: string;
  CashInvoiceRemitAddress?: string;
  CashRemainingAmount?: AmountCurrency;
  CashClaims?: CashClaim[];
  CashInvoiceEntityName?: string;
  CashTotalMdfAmount?: AmountCurrency;
  ProjectAwsAccountId?: string;
  CashNumberOfClaims?: number;
  RevisedProjectAwsAccountId?: string;
  CashInvoiceRemitCountry?: string;
  RevisedActivityName?: string;
  WwpsConsentDate?: string;
  PartnerIdentifiers?: any;
  SandboxDesignWinActivity?: string;
}

// ------------------ Credit Request ------------------

export interface CreditRequest {
  Currency?: string;
  NumberOfCodes?: number;
  ValuePerCode?: AmountCurrency;
}

// ------------------ Cash Claim ------------------

export interface CashClaim {
  StartDate?: string;
  MdfFundingPercentage?: string;
  RequestedMdfCashFunding?: AmountCurrency;
  TotalCostOfMdfActivity?: AmountCurrency;
  DueDate?: string;
  MdfCashActivityType?: string;
  EndDate?: string;
  MdfNumberOfProjectedLeads?: number;
}

// ------------------ Amount Currency ------------------

export interface AmountCurrency {
  Amount?: string;
  Currency?: string;
}

export interface CashClaimRequest {
  CashClaims: CashClaim[];
  Currency: string;
  InvoiceRemitCountry: string;
  InvoiceRemitAddress: string;
  InvoiceEntityName: string;
  TotalCostOfActivity: AmountCurrency;
  ApprovedAmount: AmountCurrency;
  RequestedAmountInUsd: AmountCurrency;
  OtherPartyContribution: AmountCurrency;
  RequestedAmount: AmountCurrency;
  PartnerContribution: AmountCurrency;
}
