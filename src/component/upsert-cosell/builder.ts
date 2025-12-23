import {
  getPartnerAccountManager,
  parseBaseDate,
  parseDateISO,
  trimString,
} from "@template/utils/globalHelper";
import { OpportunityTeam as Team } from "@template/enum/opportunityTeam.enum";
import { CosellAction } from "@template/enum/action.enum";
import type { DataPropertyType } from "@template/types/cosell.forms";
import { StatusState } from "@template/enum/status.enum";
import type { RC3CosellResponse } from "@template/types/cosellResponse";
import { requestPayload } from "@template/common/listCosell";

export function buildProject(
  formValue: any,
  existingProject: any,
  revenuePayload: any
) {
  return {
    ...existingProject,
    AdditionalComments: trimString(formValue?.additonalComments),
    ApnPrograms: formValue?.apnProgram,
    CustomerBusinessProblem: trimString(formValue?.customerBusinessProblem),
    CustomerUseCase: formValue?.useCase,
    CompetitorName: formValue?.competitiveTracking,
    DeliveryModels: formValue?.deliveryModel,
    ExpectedCustomerSpend: revenuePayload,
    OtherCompetitorNames: trimString(formValue?.otherCompetitors),
    RelatedOpportunityIdentifier: trimString(
      formValue?.relatedOpportunityIndentifier
    ),
    SalesActivities: formValue?.salesActivities || [],
    Title: trimString(formValue?.partnerProjectTitle),
  };
}

export function buildMarketing(formValue: any, existingMarketing: any) {
  return {
    ...existingMarketing,
    CampaignName: trimString(formValue?.marketingCampaign),
    UseCases: formValue?.marketingUseCase,
    Channels: formValue?.marketingActivityChannel,
    AwsFundingUsed: formValue?.isMarketingfunds,
    Source: formValue?.marketingSource,
  };
}

export function buildLifeCycle(formValue: any, existingLifeCycle: any) {
  return {
    ...existingLifeCycle,
    TargetCloseDate: parseBaseDate(formValue?.targetCloseDate),
    NextSteps: trimString(formValue?.nextStep),
  };
}

export function buildCustomer(
  formValue: any,
  existingCustomer: any,
  contactPayload: any
) {
  return {
    ...existingCustomer,
    Account: {
      ...existingCustomer?.Account,
      Address: {
        ...existingCustomer?.Account?.Address,
        StateOrRegion: trimString(formValue?.state),
        StreetAddress: trimString(formValue?.streetAddress),
        City: trimString(formValue?.city),
        PostalCode: trimString(formValue?.postalCode),
        CountryCode: trimString(formValue?.country),
      },
      CompanyName: trimString(formValue?.customerCompanyName),
      Duns: trimString(formValue?.customerDuns),
      Industry: trimString(formValue?.industryVertical),
      OtherIndustry: trimString(formValue?.industryOther),
      WebsiteUrl: trimString(formValue?.customerWebsite),
      AwsAccountId: formValue?.awsAccountId ?? "",
    },
    Contacts: contactPayload,
  };
}

export function buildRelatedEntities(formValue: any, existingIdentifiers: any) {
  return {
    ...existingIdentifiers,
    Solutions: formValue?.solutionsOffered || [],
    AWSProducts: formValue?.awsProducts || [],
  };
}

export function buildCosellPayload({
  formValue,
  slug,
  data,
  generateCosell,
}: {
  formValue: any;
  slug: CosellAction;
  data: RC3CosellResponse;
  generateCosell: RC3CosellResponse;
}) {
  const payload = slug === CosellAction.EDIT ? data : generateCosell;

  const {
    Customer: { Contacts } = {},
    Project: { ExpectedCustomerSpend } = {},
    OpportunityTeam,
  } = payload?.CoSellEntity || {};

  const contactPayload = Contacts?.map((team: any, index: number) =>
    index === 0
      ? {
          FirstName: trimString(formValue?.contactFirstName),
          LastName: trimString(formValue?.contactLastName),
          Email: trimString(formValue?.contactEmail),
          BusinessTitle: trimString(formValue?.contactTitle),
          Phone: trimString(formValue?.contactPhone),
        }
      : team
  );

  const partnerManagerPayload = OpportunityTeam?.map((team: any) =>
    team.BusinessTitle === Team.PARTNER_MANAGER
      ? {
          FirstName: trimString(formValue?.primaryContactFirstName),
          LastName: trimString(formValue?.primaryContactLastName),
          Email: trimString(formValue?.primaryContactEmail),
          BusinessTitle: Team.PARTNER_MANAGER,
          Phone: trimString(formValue?.primaryContactPhone),
        }
      : team
  );

  const revenuePayload = ExpectedCustomerSpend?.map(
    (spend: any, index: number) =>
      index === 0
        ? { ...spend, Amount: formValue?.estimatedAWSRecurringRevenue }
        : spend
  );

  const coSellEntity = payload.CoSellEntity || {};
  return {
    ...payload,
    Version: payload?.Version ?? requestPayload.version?.AWS,
    IsSubmitOpportunity: true,
    CoSellEntity: {
      ...coSellEntity,
      OpportunityTeam: partnerManagerPayload,
      Customer: buildCustomer(
        formValue,
        coSellEntity?.Customer,
        contactPayload
      ),
      LifeCycle: buildLifeCycle(formValue, coSellEntity?.LifeCycle),
      Marketing: buildMarketing(formValue, coSellEntity?.Marketing),
      Project: buildProject(formValue, coSellEntity?.Project, revenuePayload),
      RelatedEntityIdentifiers: buildRelatedEntities(
        formValue,
        coSellEntity?.RelatedEntityIdentifiers
      ),
      PartnerOpportunityIdentifier: formValue?.crmUniqueIdentifier,
      PrimaryNeedsFromAws: formValue?.awsCosell || [],
      OpportunityType: formValue?.opportunityType,
      NationalSecurity: formValue?.nationalSecurity,
    },
  };
}

export function buildDataProperty({
  slug,
  data,
  generateCosell,
  dealName,
}: {
  slug: CosellAction;
  data: any;
  generateCosell: any;
  dealName: string;
}): DataPropertyType {
  const payload =
    slug === CosellAction.EDIT
      ? data
      : {
          ...generateCosell,
          CoSellEntity: {
            ...generateCosell.CoSellEntity,
            Project: {
              ...(generateCosell?.CoSellEntity?.Project || {}),
              Title: dealName,
            },
          },
        };

  const {
    Customer = {},
    Marketing,
    PartnerOpportunityIdentifier,
    PrimaryNeedsFromAws,
    Project,
    RelatedEntityIdentifiers,
    OpportunityType,
    LifeCycle,
    OpportunityTeam,
    NationalSecurity,
  } = payload?.CoSellEntity || {};

  const { Account = {}, Contacts = [] } = Customer || {};
  const { ExpectedCustomerSpend = [] } = Project || {};

  const customerSpend = ExpectedCustomerSpend?.[0] || {};
  const customerProperty = Contacts?.[0] || {};
  const { Address } = Account || {};

  const partnerManager =
    data?.CloudProviderStatus === StatusState.PENDING_SUBMISSION
      ? (() => {
          const manager = getPartnerAccountManager(OpportunityTeam || []);
          return manager && Object.keys(manager).length
            ? manager
            : OpportunityTeam?.[0];
        })()
      : getPartnerAccountManager(OpportunityTeam || []);

  return {
    customerDuns: Account?.Duns,
    customerCompanyName: Account?.CompanyName,
    industryVertical: Account?.Industry,
    industryOther: Account?.OtherIndustry,
    state: Address?.StateOrRegion,
    streetAddress: Address?.StreetAddress,
    city: Address?.City,
    postalCode: Address?.PostalCode,
    country: Address?.CountryCode,
    customerWebsite: Account?.WebsiteUrl,
    awsCosell: PrimaryNeedsFromAws,
    parentOpportunityId: PartnerOpportunityIdentifier,
    partnerProjectTitle: Project?.Title,
    relatedOpportunityIndentifier: Project?.RelatedOpportunityIdentifier,
    salesActivities: Project?.SalesActivities,
    customerBusinessProblem: Project?.CustomerBusinessProblem,
    useCase: Project?.CustomerUseCase,
    nationalSecurity: NationalSecurity ?? "No",
    deliveryModel: Project?.DeliveryModels,
    estimatedAWSRecurringRevenue: Number.isNaN(Number(customerSpend?.Amount))
      ? 0
      : customerSpend?.Amount,
    apnProgram: Project?.ApnPrograms,
    competitiveTracking: Project?.CompetitorName,
    otherCompetitors: Project?.OtherCompetitorNames,
    additonalComments: Project?.AdditionalComments,
    solutionsOffered: RelatedEntityIdentifiers?.Solutions,
    awsProducts: RelatedEntityIdentifiers?.AWSProducts,
    marketingSource: Marketing?.Source,
    nextStep: LifeCycle?.NextSteps,
    marketingCampaign: Marketing?.CampaignName,
    marketingUseCase: Marketing?.UseCases,
    marketingActivityChannel: Marketing?.Channels,
    isMarketingfunds: Marketing?.AwsFundingUsed,
    crmUniqueIdentifier: PartnerOpportunityIdentifier,
    awsAccountId: Account?.AwsAccountId,
    contactFirstName: customerProperty?.FirstName,
    contactLastName: customerProperty?.LastName,
    contactTitle: customerProperty?.BusinessTitle,
    contactEmail: customerProperty?.Email,
    contactPhone: customerProperty?.Phone,
    targetCloseDate: parseDateISO(LifeCycle?.TargetCloseDate),
    opportunityType: OpportunityType,
    primaryContactFirstName: partnerManager?.FirstName,
    primaryContactLastName: partnerManager?.LastName,
    primaryContactEmail: partnerManager?.Email,
    primaryContactPhone: partnerManager?.Phone,
    primaryContactTitle: partnerManager?.BusinessTitle,
  };
}
