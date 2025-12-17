import { OptionTypes } from "../../types/dropdown.options";
import { RC3CosellResponse } from "../../types/cosellResponse";
import {
  convertCurrency,
  displayDate,
  getValue,
  parseSemiColon,
} from "../../utils/globalHelper";
import { MarketplaceType } from "../../enum/marketplace.enum";
import { awsConstants } from "../constants/awsCosellFieldMappings";

export const projectSegmentData = (
  data: RC3CosellResponse,
  optionValues: OptionTypes
) => {
  const {
    LifeCycle,
    PrimaryNeedsFromAws,
    Project,
    RelatedEntityIdentifiers: { AWSProducts = [], Solutions = [] } = {},
    Marketing,
    OpportunityType,
  } = data?.CoSellEntity || {};

  const solutionsOffered =
    optionValues?.solutions
      ?.filter((item) => Solutions?.includes(item.value))
      .map((item) => `${item.value} - ${item.label}`)
      ?.join(", ") || parseSemiColon(Solutions);

  return {
    projectDetails: [
      [
        {
          label: awsConstants.projectSegment.partnerPrimaryNeed,
          value: parseSemiColon(PrimaryNeedsFromAws),
        },
        {
          label: awsConstants.projectSegment.opportunityType,
          value: getValue(OpportunityType),
        },
      ],
      [
        {
          label: awsConstants.projectSegment.projectTitle,
          value: getValue(Project?.Title),
        },
        {
          label: awsConstants.projectSegment.parentOpportunityId,
          value: getValue(Project?.RelatedOpportunityIdentifier),
        },
      ],
      [
        {
          label: awsConstants.projectSegment.salesActivities,
          value: parseSemiColon(Project?.SalesActivities),
        },
        {
          label: awsConstants.projectSegment.customerBusinessProblem,
          value: getValue(Project?.CustomerBusinessProblem),
        },
      ],
      [
        {
          label: awsConstants.projectSegment.solutionsOffered,
          value: getValue(solutionsOffered),
        },
        {
          label: awsConstants.projectSegment.awsProducts,
          value: parseSemiColon(AWSProducts),
        },
      ],
      [
        {
          label: awsConstants.projectSegment.useCase,
          value: getValue(Project?.CustomerUseCase),
        },
        {
          label: awsConstants.projectSegment.deliveryModel,
          value: parseSemiColon(Project?.DeliveryModels),
        },
      ],
      [
        {
          label: awsConstants.projectSegment.estimatedAwsMRR,
          value: convertCurrency(
            Project?.ExpectedCustomerSpend?.[0]?.CurrencyCode,
            Project?.ExpectedCustomerSpend?.[0]?.Amount
          ),
        },
        {
          label: awsConstants.projectSegment.targetCloseDate,
          value: displayDate(LifeCycle?.TargetCloseDate as string),
        },
      ],
      [
        {
          label: awsConstants.projectSegment.apnProgram,
          value: parseSemiColon(Project?.ApnPrograms),
        },
        {
          label: "",
          value: "",
        },
      ],
    ],
    marketDetail: [
      [
        {
          label: awsConstants.marketing.opportunitySource,
          value: marketPlaceFund(Marketing?.Source ?? ""),
        },
        {
          label: awsConstants.marketing.marketingCampaign,
          value: getValue(Marketing?.CampaignName),
        },
      ],
      [
        {
          label: awsConstants.marketing.marketingUseCase,
          value: parseSemiColon(Marketing?.UseCases),
        },
        {
          label: awsConstants.marketing.marketingChannel,
          value: parseSemiColon(Marketing?.Channels),
        },
      ],
      [
        {
          label: awsConstants.marketing.marketingDevelopmentFunds,
          value: marketPlaceFund(Marketing?.AwsFundingUsed ?? ""),
        },
      ],
    ],
  };
};

const MARKETPLACE_FUND_MESSAGES: Record<string, string> = {
  [MarketplaceType.No]: awsConstants.marketing.no,
  [MarketplaceType.YES]: awsConstants.marketing.yes,
  [MarketplaceType.NONE]: awsConstants.marketing.none,
  [MarketplaceType.MARKETING_ACTIVITY]:
    awsConstants.marketing.marketingActivity,
};

function marketPlaceFund(funds: string | null): string {
  return MARKETPLACE_FUND_MESSAGES[funds ?? ""] ?? "N/A";
}
