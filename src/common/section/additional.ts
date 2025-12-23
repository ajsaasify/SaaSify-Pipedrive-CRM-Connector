import { RC3CosellResponse } from "../../types/cosellResponse";
import { displayDate, getValue } from "../../utils/globalHelper";
import { awsConstants } from "../constants/awsCosellFieldMappings";

export const additionalSegmentData = (data: RC3CosellResponse) => {
  const {
    PartnerOpportunityIdentifier,
    Project,
    Customer,
    LifeCycle,
    AwsSummary,
  } = data?.CoSellEntity || {};
  return [
    [
      {
        label: awsConstants.additional.partnerCrmUniqueIdentifier,
        value: getValue(PartnerOpportunityIdentifier),
      },
      {
        label: awsConstants.additional.competitiveTracking,
        value: getValue(Project?.CompetitorName),
      },
    ],
    [
      {
        label: awsConstants.additional.otherCompetitors,
        value: getValue(Project?.OtherCompetitorNames),
      },
      {
        label: awsConstants.additional.reviewStatusReason,
        value: getValue(LifeCycle?.ReviewStatusReason),
      },
    ],
    [
      {
        label: awsConstants.additional.apnReviewerComments,
        value: getValue(LifeCycle?.ReviewComments),
      },
      {
        label: awsConstants.additional.awsAccountsId,
        value: getValue(Customer?.Account?.AwsAccountId),
      },
    ],
    [
      {
        label: awsConstants.additional.additionalComments,
        value: getValue(Project?.AdditionalComments),
      },
      {
        label: awsConstants.additional.closedReason,
        value: getValue(LifeCycle?.ClosedLostReason),
      },
    ],
    [
      {
        label: awsConstants.additional.awsStage,
        value: getValue(AwsSummary?.LifeCycle?.Stage),
      },
      {
        label: awsConstants.additional.awsCloseDate,
        value: displayDate(LifeCycle?.TargetCloseDate),
      },
    ],
    [
      {
        label: awsConstants.additional.awsClosedLostReason,
        value: getValue(AwsSummary?.LifeCycle?.ClosedLostReason),
      },
      {
        label: "",
        value: "",
      },
    ],
  ];
};
