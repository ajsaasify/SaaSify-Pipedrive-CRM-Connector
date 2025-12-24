import type { OpportunityTeam } from "../../types/cosellResponse";
import { StatusState } from "../../enum/status.enum";
import { currencyNotConvertedFormat, displayDate, displayDateInvitations } from "../../utils/globalHelper";

import { requestPayload } from "../listCosell";
import { useTranslation } from "react-i18next";

export const fallBackKey = "--";

export const acceptSegmentData = (cosell: any) => {
  const { Invitation } = cosell.CoSellEntity || {};
  const { Payload, InvitationDate, Status, Receiver, Message, InvitationMessage, RejectionReason, SenderCompanyName, SenderAwsAccountId } =
    Invitation || {};
  const { t } = useTranslation();
  const opportunitySender =
    SenderAwsAccountId?.toLowerCase() === "aws" || SenderCompanyName?.toLowerCase() === "aws"
      ? "AWS"
      : SenderCompanyName
      ? SenderAwsAccountId
        ? `${SenderCompanyName} (${SenderAwsAccountId})`
        : SenderCompanyName
      : SenderAwsAccountId;

  const RejectField = ["Rejected Reason"];
  const multiPartner = [
    {
      title: t("awsCosell.accept.senderCompanyName"),
      value: getValue(Payload?.OpportunityInvitation?.Customer?.CompanyName),
    },
    {
      title: t("awsCosell.accept.senderCompanyWebsite"),
      value: getValue(Payload?.OpportunityInvitation?.Customer?.WebsiteUrl),
    },
    {
      title: t("awsCosell.accept.receiverCompanyName"),
      value: getValue(Receiver?.Account?.Alias),
    },
    {
      title: t("awsCosell.accept.receiverCompanyAccountId"),
      value: getValue(Receiver?.Account?.AwsAccountId),
    },
  ];

  const multipartnerMessage = [
    {
      title: t("awsCosell.accept.invitationMessage"),
      value: getValue(Message ?? InvitationMessage),
    },
  ];

  const forAws = [
    {
      title: t("awsCosell.accept.endUserCompanyName"),
      value: getValue(Payload?.OpportunityInvitation?.Customer?.CompanyName),
    },
    {
      title: t("awsCosell.accept.endUserWebsite"),
      value: getValue(Payload?.OpportunityInvitation?.Customer?.WebsiteUrl),
    },
    {
      title: t("awsCosell.accept.opportunitySender"),
      value: getValue(opportunitySender),
    },
  ];

  const fields = [
    {
      title: t("awsCosell.accept.status"),
      value: toTitleCase(Status),
    },
    {
      title: t("awsCosell.accept.invitationId"),
      value: getValue(cosell?.CloudProviderIdentifier),
    },
    {
      title: t("awsCosell.accept.invitationDate"),
      value: displayDateInvitations(InvitationDate),
    },
    {
      title: t("awsCosell.accept.country"),
      value: getValue(Payload?.OpportunityInvitation?.Customer?.CountryCode),
    },
    {
      title: t("awsCosell.accept.postalCode"),
      value: getValue(Payload?.OpportunityInvitation?.Customer?.PostalCode),
    },
    {
      title: t("awsCosell.accept.industryVertical"),
      value: getValue(Payload?.OpportunityInvitation?.Customer?.Industry),
    },
    {
      title: t("awsCosell.accept.partnerAcceptanceDeadline"),
      value: displayDateInvitations(Invitation?.ExpirationDate),
    },
    {
      title: t("awsCosell.accept.targetCloseDate"),
      value: displayDate(Payload?.OpportunityInvitation?.Project?.TargetCompletionDate),
    },
    {
      title: t("awsCosell.accept.estimatedAwsMonthlyRecurringRevenue"),
      value: currencyNotConvertedFormat(
        Payload?.OpportunityInvitation?.Project?.ExpectedCustomerSpend?.[0]?.CurrencyCode,
        Payload?.OpportunityInvitation?.Project?.ExpectedCustomerSpend?.[0]?.Amount
      ),
    },
    {
      title: t("awsCosell.accept.partnerProjectTitle"),
      value: getValue(Payload?.OpportunityInvitation?.Project?.Title),
    },
    {
      title: cosell?.DealType?.includes(requestPayload?.dealType?.inbound)
        ? t("awsCosell.accept.businessProblem")
        : t("awsCosell.accept.projectDescription"),
      value: getValue(Payload?.OpportunityInvitation?.Project?.BusinessProblem),
    },
    {
      title: t("awsCosell.accept.rejectedReason"),
      value: getValue(RejectionReason),
    },
  ].filter(
    (field) =>
      !RejectField.includes(field.title) ||
      (Status?.toLocaleLowerCase() === StatusState.REJECTED.toLocaleLowerCase() && RejectField.includes(field.title))
  );
  if (cosell?.DealType?.toLocaleLowerCase()?.includes(requestPayload?.dealType?.multiPartner)) {
    fields.splice(2, 0, ...multipartnerMessage);
  }

  fields.splice(4, 0, ...(cosell?.DealType?.includes(requestPayload?.dealType?.inbound) ? multiPartner : forAws));

  return fields;
};

export const getValue = (field?: any, fallback: string = fallBackKey): string => field || fallback;

export const toTitleCase = (field?: any, fallback: string = fallBackKey): string => {
  if (!field || typeof field !== "string") return fallback;
  return `${field[0].toLocaleUpperCase()}${field.slice(1).toLocaleLowerCase()}`;
};

export const getFullNameTeam = (team: OpportunityTeam): string => {
  return `${team?.FirstName || ""} ${team?.LastName || ""}`.trim() || " -";
};
