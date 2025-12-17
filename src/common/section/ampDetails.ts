import { AmpCosellResponse } from "../../types/ampCosell";
import {
  camelCasetoReadView,
  convertCurrency,
  displayBoolean,
  formatUTCDateOnly,
  getValue,
  validateDealName,
} from "../../utils/globalHelper";
import { ampConstants } from "../constants/ampCosellFieldMappings";

export const ampDetialsOverview = (ampCosell: AmpCosellResponse) => {
  const {
    DealDetails = {},
    CustomerDetails = {},
    CloudProviderDetails = {},
  } = ampCosell?.CoSellEntity || {};

  return [
    [
      {
        label: ampConstants.overview.customerName,
        value: getValue(CustomerDetails?.Name),
      },
    ],
    [
      {
        label: ampConstants.overview.dealName,
        value: getValue(DealDetails?.Name),
      },
      {
        label: ampConstants.overview.referralType,
        value: getValue(ampCosell?.DealType ?? ampCosell?.ReferralType),
      },
    ],
    [
      {
        label: ampConstants.overview.msReferralId,
        value: getValue(CloudProviderDetails?.ReferenceID),
      },
      {
        label: ampConstants.overview.msStatus,
        value: getValue(CloudProviderDetails?.MicrosoftStatus),
      },
    ],
    [
      {
        label: ampConstants.overview.partnerStatus,
        value: getValue(CloudProviderDetails?.Status),
      },
      {
        label: ampConstants.overview.partnerStage,
        value: getValue(CloudProviderDetails?.Stage),
      },
    ],
  ];
};

export const ampDetialsCustomer = (ampCosell: AmpCosellResponse) => {
  const {
    CustomerDetails = {},
    DealDetails = {},
    CustomerContactDetails = {},
  } = ampCosell?.CoSellEntity || {};

  return [
    {
      title: "Customer Details",
      labels: [
        [
          {
            label: ampConstants.customer.customerName,
            value: getValue(CustomerDetails?.Name),
          },
        ],
        [
          {
            label: ampConstants.customer.location,
            value: getValue(DealDetails?.Location),
          },
          {
            label: ampConstants.customer.address1,
            value: getValue(CustomerDetails?.AddressLine1),
          },
        ],
        [
          {
            label: ampConstants.customer.address2,
            value: getValue(CustomerDetails?.AddressLine2),
          },
          {
            label: ampConstants.customer.city,
            value: getValue(CustomerDetails?.City),
          },
        ],
        [
          {
            label: ampConstants.customer.state,
            value: getValue(CustomerDetails?.State),
          },
          {
            label: ampConstants.customer.country,
            value: getValue(CustomerDetails?.Country),
          },
        ],
        [
          {
            label: ampConstants.customer.postalCode,
            value: getValue(CustomerDetails?.PostalCode),
          },
        ],
      ],
    },
    {
      title: "Customer Contact Details",
      labels: [
        [
          {
            label: ampConstants.customer.firstName,
            value: getValue(CustomerContactDetails?.FirstName),
          },
          {
            label: ampConstants.customer.lastName,
            value: getValue(CustomerContactDetails?.LastName),
          },
        ],
        [
          {
            label: ampConstants.customer.email,
            value: getValue(CustomerContactDetails?.Email),
          },
          {
            label: ampConstants.customer.phone,
            value: getValue(CustomerContactDetails?.PhoneNumber),
          },
        ],
      ],
    },
  ];
};

export const ampDetialsAdditional = (ampCosell: AmpCosellResponse) => {
  const { DealDetails = {}, CloudProviderDetails } =
    ampCosell?.CoSellEntity || {};

  return [
    [
      {
        label: ampConstants.additional.crmId,
        value: getValue(DealDetails?.CRMId),
      },
      {
        label: ampConstants.additional.campaignId,
        value: getValue(DealDetails?.MarketingCampaignId),
      },
    ],
    [
      CloudProviderDetails?.ClosingReason && {
        label: ampConstants.additional.lostReason,
        value: camelCasetoReadView(CloudProviderDetails?.ClosingReason),
      },
      CloudProviderDetails?.ClosingNote && {
        label: ampConstants.additional.lostReasonNotes,
        value: getValue(CloudProviderDetails?.ClosingNote),
      },
    ],
  ];
};

export const renderDealType = (
  CloudAssistanceCode?: string,
  CanDealViewedBySeller?: boolean,
  PartnerRole?: string,
  fromEdit?: boolean
): string => {
  const isPrivate = validateDealName(CloudAssistanceCode ?? "", "no help");
  if (!CanDealViewedBySeller && isPrivate) {
    return "Private";
  }
  if (CanDealViewedBySeller && isPrivate) {
    return fromEdit ? "Private" : "Partner Led";
  }
  if (CanDealViewedBySeller && !isPrivate) {
    return "IP Co-sell";
  }
  if (CanDealViewedBySeller && PartnerRole) {
    return "Service";
  }
  return getValue();
};

export const ampDetialsDeal = (ampCosell: AmpCosellResponse) => {
  const { DealDetails = {}, CustomerDetails } = ampCosell?.CoSellEntity || {};
  const { PartnerRole, CloudAssistance } = DealDetails;
  const { CanDealViewedBySeller, CloudAssistanceCode } = CloudAssistance ?? {};

  return [
    [
      {
        label: ampConstants.deal.dealName,
        value: getValue(CustomerDetails?.Name),
      },
      {
        label: ampConstants.deal.dealType,
        value: renderDealType(
          CloudAssistanceCode,
          CanDealViewedBySeller,
          PartnerRole
        ),
      },
    ],
    [
      {
        label: ampConstants.deal.helpFromMicrosoft,
        value: getValue(CloudAssistance?.CloudAssistanceCode),
      },
      {
        label: ampConstants.deal.allowMsSellersView,
        value: displayBoolean(CloudAssistance?.CanDealViewedBySeller),
      },
    ],
    [
      {
        label: ampConstants.deal.purchaseIntent,
        value: getValue(DealDetails?.CustomerMarketplaceIntent),
      },
      {
        label: ampConstants.deal.estimatedClose,
        value: formatUTCDateOnly(DealDetails?.TargetCloseDate),
      },
    ],
    [
      {
        label: ampConstants.deal.estimatedValue,
        value: convertCurrency(
          DealDetails?.CurrencyType,
          DealDetails?.DealValue
        ),
      },
      {
        label: ampConstants.deal.currency,
        value: getValue(DealDetails?.CurrencyType),
      },
    ],
    [
      {
        label: ampConstants.deal.solutionArea,
        value: getValue(DealDetails?.SolutionArea),
      },
      {
        label: ampConstants.deal.solutionPlay,
        value: getValue(DealDetails?.SolutionPlay),
      },
    ],
    [
      {
        label: ampConstants.deal.partnerNotes,
        value: getValue(DealDetails?.Description),
      },
    ],
    [
      {
        label: ampConstants.deal.notesToMicrosoft,
        value: getValue(CloudAssistance?.NotesForCloudAssistance),
      },
    ],
  ];
};

export const renderAmpTableContact = [
  { header: "First Name", value: "FirstName" },
  { header: "Last Name", value: "LastName" },
  { header: "Email", value: "Email" },
  { header: "Phone Number", value: "PhoneNumber" },
];

export const renderAmpTableSolutions = [
  { header: "Solution Name", value: "Name" },
  { header: "Solution Id", value: "ID" },
  { header: "IP Co-sell Eligibility", value: "IPCoSellEligible" },
  { header: "Publisher Name", value: "PublisherName" },
];
