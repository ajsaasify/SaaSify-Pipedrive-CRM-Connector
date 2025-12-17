import { OptionTypes } from "../../types/dropdown.options";
import { DropdownOptions } from "../../enum/options.enum";
import { PartnerConnectionProps } from "../../types/partner";
import {
  displayDate,
  getOpportunityOwner,
  parseArray,
  parseSemiColon,
} from "../../utils/globalHelper";
import { awsConstants } from "../constants/awsCosellFieldMappings";
import { getFullNameTeam, getValue } from "./accept";

export const partnerConnectionopportunitySegmentData = (
  cosell: PartnerConnectionProps,
  optionValues: OptionTypes
) => {
  const { OpportunitySummary } = cosell;
  const { Solutions = [] } = OpportunitySummary?.RelatedEntityIdentifiers || {};
  const solutionsOffered =
    optionValues?.solutions
      ?.filter((item) => Solutions?.includes(item.value))
      .map((item) => `${item.value} - ${item.label}`)
      ?.join(", ") || parseSemiColon(Solutions);
  const contact = getOpportunityOwner(
    cosell?.OpportunitySummary?.OpportunityTeam
  );

  const opportunity = [
    [
      {
        label: awsConstants.opportunity.id,
        value: getValue(cosell?.ResourceId),
      },
      {
        label: awsConstants.opportunity.stage,
        value: getValue(OpportunitySummary?.LifecycleSummary?.Stage),
      },
    ],
    [
      {
        label: awsConstants.opportunity.status,
        value: getValue(OpportunitySummary?.LifecycleSummary?.ReviewStatus),
      },
      {
        label: awsConstants.opportunity.type,
        value: getValue(OpportunitySummary?.OpportunityType),
      },
    ],
    [
      {
        label: awsConstants.opportunity.targetCloseDate,
        value: displayDate(
          OpportunitySummary?.LifecycleSummary?.TargetCloseDate
        ),
      },
      {
        label: awsConstants.opportunity.owner,
        value: getFullNameTeam(contact),
      },
    ],
    [
      {
        label: awsConstants.opportunity.ownerEmail,
        value: getValue(contact?.Email),
      },
      {
        label: awsConstants.opportunity.useCase,
        value: getValue(OpportunitySummary?.ProjectSummary?.CustomerUseCase),
      },
    ],
    [
      {
        label: awsConstants.opportunity.deliveryModel,
        value: parseArray(OpportunitySummary?.ProjectSummary?.DeliveryModels),
      },
      {
        label: awsConstants.opportunity.salesActivities,
        value: parseArray(OpportunitySummary?.ProjectSummary?.SalesActivities),
      },
    ],
    [
      {
        label: awsConstants.opportunity.awsProducts,
        value: parseArray(
          OpportunitySummary?.RelatedEntityIdentifiers?.AWSProducts
        ),
      },
      {
        label: awsConstants.opportunity.primaryNeed,
        value: parseArray(OpportunitySummary?.PrimaryNeedsFromAws),
      },
    ],
    [
      {
        label: awsConstants.opportunity.solutionsOffered,
        value: solutionsOffered,
      },
      {
        label: awsConstants.opportunity.nextSteps,
        value: getValue(OpportunitySummary?.LifecycleSummary?.NextSteps),
      },
    ],
  ];

  return { opportunity };
};
