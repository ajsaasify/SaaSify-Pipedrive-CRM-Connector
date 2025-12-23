import type { OpportunityTeam } from "../../types/cosellResponse";
import { StatusState } from "../../enum/status.enum";
import {
  currencyNotConvertedFormat,
  displayDate,
  displayDateInvitations,
} from "../../utils/globalHelper";
import { awsConstants } from "../constants/awsCosellFieldMappings";
import { requestPayload } from "../listCosell";

export const fallBackKey = "--";

export const acceptSegmentData = (cosell: any) => {
  const { Invitation } = cosell.CoSellEntity || {};
  const {
    Payload,
    InvitationDate,
    Status,
    Receiver,
    Message,
    InvitationMessage,
    RejectionReason,
    SenderCompanyName,
    SenderAwsAccountId,
  } = Invitation || {};

  const opportunitySender =
    SenderAwsAccountId?.toLowerCase() === "aws" ||
    SenderCompanyName?.toLowerCase() === "aws"
      ? "AWS"
      : SenderCompanyName
        ? SenderAwsAccountId
          ? `${SenderCompanyName} (${SenderAwsAccountId})`
          : SenderCompanyName
        : SenderAwsAccountId;

  const RejectField = ["Rejected Reason"];
  const multiPartner = [
    {
      title: awsConstants.accept.senderCompanyName,
      value: getValue(Payload?.OpportunityInvitation?.Customer?.CompanyName),
    },
    {
      title: awsConstants.accept.senderCompanyWebsite,
      value: getValue(Payload?.OpportunityInvitation?.Customer?.WebsiteUrl),
    },
    {
      title: awsConstants.accept.receiverCompanyName,
      value: getValue(Receiver?.Account?.Alias),
    },
    {
      title: awsConstants.accept.receiverCompanyAccountId,
      value: getValue(Receiver?.Account?.AwsAccountId),
    },
  ];

  const multipartnerMessage = [
    {
      title: awsConstants.accept.invitationMessage,
      value: getValue(Message ?? InvitationMessage),
    },
  ];

  const forAws = [
    {
      title: awsConstants.accept.endUserCompanyName,
      value: getValue(Payload?.OpportunityInvitation?.Customer?.CompanyName),
    },
    {
      title: awsConstants.accept.endUserWebsite,
      value: getValue(Payload?.OpportunityInvitation?.Customer?.WebsiteUrl),
    },
    {
      title: awsConstants.accept.opportunitySender,
      value: getValue(opportunitySender),
    },
  ];

  const fields = [
    { title: awsConstants.accept.status, value: toTitleCase(Status) },
    {
      title: awsConstants.accept.invitationId,
      value: getValue(cosell?.CloudProviderIdentifier),
    },
    {
      title: awsConstants.accept.invitationDate,
      value: displayDateInvitations(InvitationDate),
    },
    {
      title: awsConstants.accept.country,
      value: getValue(Payload?.OpportunityInvitation?.Customer?.CountryCode),
    },
    {
      title: awsConstants.accept.postalCode,
      value: getValue(Payload?.OpportunityInvitation?.Customer?.PostalCode),
    },
    {
      title: awsConstants.accept.industryVertical,
      value: getValue(Payload?.OpportunityInvitation?.Customer?.Industry),
    },
    {
      title: awsConstants.accept.partnerAcceptanceDeadline,
      value: displayDateInvitations(Invitation?.ExpirationDate),
    },
    {
      title: awsConstants.accept.targetCloseDate,
      value: displayDate(
        Payload?.OpportunityInvitation?.Project?.TargetCompletionDate,
      ),
    },
    {
      title: awsConstants.accept.estimatedAwsMonthlyRecurringRevenue,
      value: currencyNotConvertedFormat(
        Payload?.OpportunityInvitation?.Project?.ExpectedCustomerSpend?.[0]
          ?.CurrencyCode,
        Payload?.OpportunityInvitation?.Project?.ExpectedCustomerSpend?.[0]
          ?.Amount,
      ),
    },
    {
      title: awsConstants.accept.partnerProjectTitle,
      value: getValue(Payload?.OpportunityInvitation?.Project?.Title),
    },
    {
      title: cosell?.DealType?.includes(requestPayload?.dealType?.inbound)
        ? awsConstants.accept.businessProblem
        : awsConstants.accept.projectDescription,
      value: getValue(Payload?.OpportunityInvitation?.Project?.BusinessProblem),
    },
    {
      title: awsConstants.accept.rejectedReason,
      value: getValue(RejectionReason),
    },
  ].filter(
    (field) =>
      !RejectField.includes(field.title) ||
      (Status?.toLocaleLowerCase() ===
        StatusState.REJECTED.toLocaleLowerCase() &&
        RejectField.includes(field.title)),
  );
  if (
    cosell?.DealType?.toLocaleLowerCase()?.includes(
      requestPayload?.dealType?.multiPartner,
    )
  ) {
    fields.splice(2, 0, ...multipartnerMessage);
  }

  fields.splice(
    4,
    0,
    ...(cosell?.DealType?.includes(requestPayload?.dealType?.inbound)
      ? multiPartner
      : forAws),
  );

  return fields;
};

export const getValue = (field?: any, fallback: string = fallBackKey): string =>
  field || fallback;

export const toTitleCase = (
  field?: any,
  fallback: string = fallBackKey,
): string => {
  if (!field || typeof field !== "string") return fallback;
  return `${field[0].toLocaleUpperCase()}${field.slice(1).toLocaleLowerCase()}`;
};

export const getFullNameTeam = (team: OpportunityTeam): string => {
  return `${team?.FirstName || ""} ${team?.LastName || ""}`.trim() || " -";
};
