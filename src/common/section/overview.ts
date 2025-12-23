import { useTranslation } from "react-i18next";
import { RC3CosellResponse } from "../../types/cosellResponse";
import { getFullName, getOpportunityOwner } from "../../utils/globalHelper";
import { awsConstants } from "../constants/awsCosellFieldMappings";
import { getValue } from "./accept";
import { t } from "i18next";

export const overviewSectionData = (data: RC3CosellResponse) => {
  const {
    AwsSummary: { Insights = {} } = {},
    Identifier,
    LifeCycle,
    OpportunityTeam,
    Customer: { Account = {} } = {},
    Invitation,
  } = data?.CoSellEntity || {};
  const { t } = useTranslation();
  const owner = getOpportunityOwner(OpportunityTeam);
  const stage = LifeCycle?.Stage ?? data?.CloudProviderStage;
  const status = LifeCycle?.ReviewStatus ?? data?.CloudProviderStatus;

  const commonSections = [
    [
      {
        label: t("awsCosell.overview.opportunityId"),
        value: getValue(Identifier),
      },
    ],
    [
      {
        label: t("awsCosell.overview.customerCompanyName"),
        value: getValue(Account?.CompanyName),
      },
      {
        label: t("awsCosell.overview.awsMarketplaceEngagementScore"),
        value: getValue(Insights?.EngagementScore),
      },
    ],
    [
      {
        label: awsConstants.overview.opportunityOwner,
        value: getFullName(owner),
      },
      {
        label: awsConstants.overview.opportunityOwnership,
        value: getValue(owner?.Email),
      },
    ],
  ];

  if (Invitation?.Status === "Accepted") {
    commonSections[0].push({
      label: awsConstants.overview.partnerStatus,
      value: getValue(Invitation?.Status),
    });
    commonSections[0].push({
      label: awsConstants.overview.stage,
      value: getValue(stage),
    });
    commonSections[1].unshift({
      label: awsConstants.overview.status,
      value: getValue(status),
    });
    commonSections[2].unshift({
      label: awsConstants.overview.awsRecommendedActions,
      value: getValue(Insights?.NextBestActions),
    });
  } else {
    commonSections[0].push({
      label: awsConstants.overview.stage,
      value: getValue(stage),
    });
    commonSections[0].push({
      label: awsConstants.overview.status,
      value: getValue(status),
    });
    commonSections[1].push({
      label: awsConstants.overview.awsRecommendedActions,
      value: getValue(Insights?.NextBestActions),
    });
    commonSections[2].push({
      label: "",
      value: "",
    });
  }

  return commonSections;
};

export const alertPopupSegment = (aceCosell: RC3CosellResponse) => {
  const { LifeCycle } = aceCosell?.CoSellEntity || {};
  const { alertSection } = awsConstants;
  const labels = {
    actionRequired: [
      {
        label: t("awsCosell.alertSection.apnReviewReason"),
        value: getValue(LifeCycle?.ReviewStatusReason),
      },
      {
        label: t("awsCosell.alertSection.apnReviewComment"),
        value: getValue(LifeCycle?.ReviewComments),
      },
    ],
    rejected: [
      {
        label: t("awsCosell.alertSection.rejectedReason"),
        value: LifeCycle?.ReviewStatusReason ?? alertSection.noReasonProvide,
      },
    ],
  };
  return labels;
};
