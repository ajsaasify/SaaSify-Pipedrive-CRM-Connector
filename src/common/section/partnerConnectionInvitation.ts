import { OpportunityTeam } from "../../types/cosellResponse";
import { StatusState } from "../../enum/status.enum";
import { PartnerConnectionProps } from "../../types/partner";
import {
  currencyNotConvertedFormat,
  displayDate,
  displayDateInvitations,
  parseArray,
} from "../../utils/globalHelper";
import { awsConstants } from "../constants/awsCosellFieldMappings";
import { getValue, toTitleCase } from "./accept";

export const partnerConnectionInvitationSegmentData = (
  cosell: PartnerConnectionProps
) => {
  const {
    Payload,
    InvitationDate,
    Status,
    Message,
    RejectionReason,
    SenderCompanyName,
    SenderAwsAccountId,
  } = cosell?.Invitation || {};

  const opportunitySender =
    SenderAwsAccountId?.toLowerCase() === "aws" ||
    SenderCompanyName?.toLowerCase() === "aws"
      ? "AWS"
      : SenderCompanyName
      ? SenderAwsAccountId
        ? `${SenderCompanyName} (${SenderAwsAccountId})`
        : SenderCompanyName
      : SenderAwsAccountId;

  const RejectField = [awsConstants.invitation.rejectionReason];

  const fields = [
    { title: awsConstants.invitation.status, value: toTitleCase(Status) },
    {
      title: awsConstants.invitation.invitationId,
      value: getValue(cosell?.ResourceId),
    },
    {
      title: awsConstants.invitation.invitationDate,
      value: displayDateInvitations(InvitationDate),
    },
    {
      title: awsConstants.invitation.invitationMessage,
      value: getValue(Message),
    },
    {
      title: awsConstants.invitation.engagementTypes,
      value: parseArray(
        Payload?.OpportunityInvitation?.ReceiverResponsibilities
      ),
    },
    {
      title: awsConstants.invitation.companyName,
      value: getValue(Payload?.OpportunityInvitation?.Customer?.CompanyName),
    },
    {
      title: awsConstants.invitation.website,
      value: getValue(Payload?.OpportunityInvitation?.Customer?.WebsiteUrl),
    },
    {
      title: awsConstants.invitation.sender,
      value: getValue(opportunitySender),
    },
    {
      title: awsConstants.invitation.country,
      value: getValue(Payload?.OpportunityInvitation?.Customer?.CountryCode),
    },
    { title: awsConstants.invitation.postalCode, value: getValue() },
    {
      title: awsConstants.invitation.industry,
      value: getValue(Payload?.OpportunityInvitation?.Customer?.Industry),
    },
    {
      title: awsConstants.invitation.deadline,
      value: displayDateInvitations(cosell?.Invitation?.ExpirationDate),
    },
    {
      title: awsConstants.invitation.targetCloseDate,
      value: displayDate(
        Payload?.OpportunityInvitation?.Project?.TargetCompletionDate
      ),
    },
    {
      title: awsConstants.invitation.estimatedAwsMRR,
      value: currencyNotConvertedFormat(
        Payload?.OpportunityInvitation?.Project?.ExpectedCustomerSpend?.[0]
          ?.CurrencyCode,
        Payload?.OpportunityInvitation?.Project?.ExpectedCustomerSpend?.[0]
          ?.Amount
      ),
    },
    {
      title: awsConstants.invitation.projectTitle,
      value: getValue(Payload?.OpportunityInvitation?.Project?.Title),
    },
    {
      title: awsConstants.invitation.projectDescription,
      value: getValue(Payload?.OpportunityInvitation?.Project?.BusinessProblem),
    },
    {
      title: awsConstants.invitation.rejectionReason,
      value: getValue(RejectionReason),
    },
  ].filter(
    (field) =>
      !RejectField.includes(field.title) ||
      (Status?.toLocaleLowerCase() ===
        StatusState.REJECTED.toLocaleLowerCase() &&
        RejectField.includes(field.title))
  );

  return fields;
};
