import { fallbackAsNa, formatUTCDate } from "../../utils/globalHelper";

export const offerBasicDetails = (offers: any) => {
  return [
    [
      {
        label: "Name",
        value: fallbackAsNa(offers.DealBasicDetails.DealName),
      },
      {
        label: "Description",
        value: fallbackAsNa(offers.DealBasicDetails.Description),
      },
    ],
    [
      {
        label: "Primary Sales Agent Name",
        value: fallbackAsNa(offers.DealBasicDetails.Salesagent),
      },
      {
        label: "Primary Sales Agent Email",
        value: fallbackAsNa(offers.DealBasicDetails.PreparedBy),
      },
    ],
    [
      {
        label: "Offer ID",
        value: fallbackAsNa(
          offers.DealBasicDetails.AWSCPOfferData?.[0]?.OfferID,
        ),
      },
      {
        label: "Offer Type",
        value: fallbackAsNa(offers.DealTermDetails.PrivateOfferTypeDescription),
      },
    ],
    [
      {
        label: "Offer URL",
        value: fallbackAsNa(offers.DealBasicDetails.PrivateOfferLink),
      },
      { label: "", value: "" },
    ],
  ];
};

export const offerCustomerDetails = (offers: any) => {
  return [
    [
      {
        label: "Customer Company Name",
        value: fallbackAsNa(offers?.DealPurchaserDetails?.CustomerName),
      },
      {
        label: "Customer Email",
        value: fallbackAsNa(offers?.DealPurchaserDetails?.Email),
      },
    ],
    [
      {
        label: "Address",
        value: fallbackAsNa(offers.DealBasicDetails.AddressLine1),
      },
      {
        label: "Country",
        value: fallbackAsNa(offers.DealBasicDetails.Country),
      },
    ],
    [
      {
        label: "State",
        value: fallbackAsNa(offers.DealBasicDetails.State),
      },
      {
        label: "Zip/Postal Code",
        value: fallbackAsNa(offers.DealBasicDetails.ZipCode),
      },
    ],
    [
      {
        label: "Customer Billing Account ID",
        value: fallbackAsNa(offers?.DealTermDetails?.CustomerAccountId),
      },
      {
        label: "Notes to your customer",
        value: fallbackAsNa(offers?.DealPurchaserDetails?.CustomerNote),
      },
    ],
  ];
};

export const offerCloudDetails = (offers: any) => {
  const OfferDuration =
    offers?.DealTermDetails?.OfferTermDetailsJson?.ContractDuration;
  const PaymentScheduleName =
    offers?.DealTermDetails?.OfferTermDetailsJson?.PaymentScheduleName;
  let DurationValue: any;
  if (PaymentScheduleName === "Quarterly") {
    DurationValue = `${OfferDuration} ${OfferDuration > 1 ? "Quarters" : "Quarter"}`;
  } else if (PaymentScheduleName === "Annually") {
    DurationValue = `${OfferDuration} ${OfferDuration > 1 ? "Years" : "Year"}`;
  } else {
    DurationValue = `${OfferDuration} ${OfferDuration > 1 ? "Months" : "Month"}`;
  }
  const OfferStartType =
    offers?.DealTermDetails?.OfferTermDetailsJson?.OfferStartType;
  const offerTypeProductName = offers?.DealTermDetails?.ProductName;
  let OfferStartTypeValue = "";
  if (OfferStartType === "CustomerAcceptance") {
    OfferStartTypeValue = offerTypeProductName
      ? "On Customer Acceptance"
      : "On Offer approval";
  } else {
    // need to check the offerStartType is SheduledStartDate
    OfferStartTypeValue = "Schedule start date";
  }
  const MetricDiscounts =
    offers?.DealTermDetails?.OfferTermDetailsJson?.IsMetricDiscountsEnabled;
  const metricDiscountValue = MetricDiscounts ? "Yes" : "No";
  const AgreementName = offers?.DealTermDetails?.AgreementFileName;
  const AgreementUrl = offers?.DealTermDetails?.AgreementURL;
  let AgreementType: any;
  if (AgreementName && AgreementUrl) {
    AgreementType = AgreementName; // need to set the agreementUrl for the condition
  } else {
    AgreementType = "Google Cloud Marketplace Standard EULA";
  }
  const { extraData = {} } = offers.DealTermDetails.AgreementData || {};

  return [
    [
      {
        label: "Product",
        value: fallbackAsNa(
          offers?.DealTermDetails?.OfferTermDetailsJson?.OfferDescription,
        ),
      },
      {
        label: "Plan",
        value: fallbackAsNa(
          offers?.DealTermDetails?.OfferTermDetailsJson?.PlanDescription,
        ),
      },
      {
        label: "Payment Schedule",
        value: fallbackAsNa(
          offers?.DealTermDetails?.OfferTermDetailsJson?.PaymentScheduleName,
        ),
      },
    ],
    [
      {
        label: "Offer Duration",
        value: fallbackAsNa(DurationValue),
      },

      {
        label: "Offer Acceptance Deadline",
        value: fallbackAsNa(
          offers?.DealTermDetails?.OfferTermDetailsJson
            ?.OfferAcceptanceDeadline,
        ),
      },
      {
        label: "Offer Start Type",
        value: OfferStartTypeValue,
      },
    ],
    [
      {
        label: "Configure Auto-Renew",
        value: extraData?.isAutoRenew
          ? `Customer can auto-renew ${extraData?.numberOfRenewals} times`
          : "Customer can't auto-renew",
      },
      {
        label: "Metric Discounts",
        value: metricDiscountValue,
      },
      {
        label: "Proration",
        value: fallbackAsNa(
          offers?.DealTermDetails?.OfferTermDetailsJson?.Proration,
        ),
      },
    ],
    [
      {
        label: "Monthly Flat Fee",
        value: fallbackAsNa(
          `$${offers?.DealPricingDetails?.PricingJson?.MonthlyFlatFee}`,
        ),
      },
      {
        label: "Discount on usage",
        value: fallbackAsNa(
          `${offers?.DealPricingDetails?.PricingJson?.DiscountOnUsage}%`,
        ),
      },
      {
        label: "Total Contract Value",
        value: fallbackAsNa(
          offers?.DealPricingDetails?.PricingJson?.TotalContractValue,
        ),
      },
    ],
    [
      {
        label: "User License Agreement",
        value: AgreementType,
      },
    ],
  ];
};

export const renderSubscription = (subscriptions: any) => {
  let SaaSSubscriptionResourceID = returnValueFromList(
    "SaaSSubscriptionResourceID",
    subscriptions?.SubscriptionDetails,
  );
  if (SaaSSubscriptionResourceID === "--")
    SaaSSubscriptionResourceID = returnValueFromListDis(
      "SaaS Subscription Resource ID",
      subscriptions?.SubscriptionDetails,
    );
  const customerEmail = returnValueFromList(
    "CustomerEmail",
    subscriptions?.SubscriptionDetails,
  );
  const customerName = returnValueFromList(
    "CustomerName",
    subscriptions?.SubscriptionDetails,
  );
  const customerStatus = returnValueFromList(
    "Subscribed",
    subscriptions?.SubscriptionDetails,
  );
  const ActivationDate = returnValueFromList(
    "ActivatedON",
    subscriptions?.SubscriptionDetails,
  );

  const SaaSSubscriptionName = subscriptions?.Headers?.SubscriptionName;

  return [
    [
      {
        label: "SaaS Subscription Resource ID",
        value: fallbackAsNa(SaaSSubscriptionResourceID),
      },
      {
        label: "SaaS Subscription Name",
        value: fallbackAsNa(SaaSSubscriptionName),
      },
    ],
    [
      { label: "Customer Email", value: fallbackAsNa(customerEmail) },
      { label: "Customer Name", value: fallbackAsNa(customerName) },
    ],
    [
      { label: "Status", value: fallbackAsNa(customerStatus) },
      { label: "Activation Date", value: formatUTCDate(ActivationDate) },
    ],
  ];
};

export const renderPurchaseAttributes = (subscriptions: any) => {
  const chargebeeId = returnValueFromList(
    "ChargebeeCustomerId",
    subscriptions?.SubscriptionDetails,
  );
  const chargebeeSubscriptionURL = returnValueFromList(
    "ChargebeeSubscriptionDetail",
    subscriptions?.SubscriptionDetails,
  );
  const chargebeeSubscriptionID = returnValueFromList(
    "ChargebeeSubscriptionId",
    subscriptions?.SubscriptionDetails,
  );
  return [
    [
      {
        label: "Chargebee Customer Id",
        value: fallbackAsNa(chargebeeId),
      },
      {
        label: "Chargebee Subscription URL",
        value: fallbackAsNa(chargebeeSubscriptionURL),
      },
    ],
    [
      {
        label: "Chargebee Subscription Id",
        value: fallbackAsNa(chargebeeSubscriptionID),
      },
      { label: "", value: "" },
    ],
  ];
};

export const renderViewDetailsOverlay = (subscriptions: any) => {
  const companyName = returnValueFromList(
    "Company",
    subscriptions?.PaymentDetails,
  );
  const transactionRefferenceId = returnValueFromList(
    "TransactionReferenceId",
    subscriptions?.PaymentDetails,
  );
  const ExpectedPaymentDate = returnValueFromList(
    "ExpectedPaymentDate",
    subscriptions?.PaymentDetails,
  );
  const TransactionAmount = returnValueFromList(
    "TransactionAmount",
    subscriptions?.PaymentDetails,
  );
  const ExpectedAmountInISVCurrency = returnValueFromList(
    "SaaSifyEarningAmount",
    subscriptions?.PaymentDetails,
  );
  const EarningAmount = returnValueFromList(
    "EarningAmount",
    subscriptions?.PaymentDetails,
  );
  const ISVCurrencyCode = returnValueFromList(
    "ISVCurrencyCode",
    subscriptions?.PaymentDetails,
  );
  const StoreFee = returnValueFromList(
    "StoreFee",
    subscriptions?.PaymentDetails,
  );
  const StoreFeeInPercent = returnValueFromList(
    "StoreFeeInPercent",
    subscriptions?.PaymentDetails,
  );
  const PayDate = returnValueFromList(
    "EarningAmount",
    subscriptions?.PaymentDetails,
  );
  const subsId = returnValueFromList(
    "SaaSSubscriptionResourceID",
    subscriptions?.PaymentDetails,
  );
  const PaymentStatus = returnValueFromList(
    "PaymentStatus",
    subscriptions?.PaymentDetails,
  );
  return [
    {
      title: "Company Name",
      value: fallbackAsNa(companyName),
    },
    {
      title: "Transaction Reference",
      value: fallbackAsNa(transactionRefferenceId),
    },
    {
      title: "Expected Payment Month",
      value: fallbackAsNa(ExpectedPaymentDate),
    },
    {
      title: "Transaction Amount",
      value: fallbackAsNa(TransactionAmount),
    },
    {
      title: "Expected Pay",
      value: fallbackAsNa(ExpectedAmountInISVCurrency),
    },
    {
      title: "Actual Pay",
      value: fallbackAsNa(EarningAmount),
    },
    {
      title: "Currency",
      value: fallbackAsNa(ISVCurrencyCode),
    },
    {
      title: "Store Fee Amount",
      value: fallbackAsNa(StoreFee),
    },
    {
      title: "Store Fee Percentage",
      value: fallbackAsNa(StoreFeeInPercent),
    },
    {
      title: "Actual Pay Date",
      value: fallbackAsNa(PayDate),
    },
    {
      title: "SaaS Subscription Resource ID",
      value: fallbackAsNa(subsId),
    },
    {
      title: "Status",
      value: fallbackAsNa(PaymentStatus),
    },
  ];
};

export const gcpRenderViewDetails = [
  {
    title: "Company Name",
    value: "Star Vision Technologies",
  },
  {
    title: "Transaction Reference",
    value: "58dyy78f4ee576b8883a7efe607978fb79545e7p",
  },
  {
    title: "Expected Payment Month",
    value: "Jan-2025",
  },
  {
    title: "Transaction Amount",
    value: "100",
  },
  {
    title: "Expected Pay",
    value: "97",
  },
  {
    title: "Actual Pay",
    value: "97",
  },
  {
    title: "Currency",
    value: "USD",
  },
  {
    title: "Store Fee Amount",
    value: "0",
  },
  {
    title: "Store Fee Percentage",
    value: "3%",
  },
  {
    title: "Actual Pay Date",
    value: "2024-04-10",
  },
  {
    title: "SaaS Subscription Resource ID",
    value: "7564289C-9A7B-47C6-B200-12A6CA18848B",
  },
  {
    title: "Status",
    value: "Disbursed",
  },
];

export const returnPayoutDetails = [
  {
    TransactionDate: "2025-01-21",
    TransactionType: "Contract",
    TransactionAmount: "100",
    ExpectedPaymentDate: "Jan-2025",
    SaaSifyEarningAmount: "97",
    PaymentDate: "2024-04-10",
    EarningAmount: "97",
    StoreFeeInPercent: "3",
    PaymentStatus: "Disbursed",
  },
];

export const renderViewDetails = [
  {
    title: "Company Name",
    value: "Globex Corporation",
  },
  {
    title: "Transaction Reference",
    value: "58dyy78f4ee576b8883a7efe607978fb79545e7p",
  },
  {
    title: "Expected Payment Month",
    value: "Jan-2025",
  },
  {
    title: "Transaction Amount",
    value: "100",
  },
  {
    title: "Expected Pay",
    value: "100",
  },
  {
    title: "Actual Pay",
    value: "100",
  },
  {
    title: "Currency",
    value: "USD",
  },
  {
    title: "Store Fee Amount",
    value: "0",
  },
  {
    title: "Store Fee Percentage",
    value: "3%",
  },
  {
    title: "Actual Pay Date",
    value: "2024-04-10",
  },
  {
    title: "SaaS Subscription Resource ID",
    value: "7564289C-9A7B-47C6-B200-12A6CA18848B",
  },
  {
    title: "Status",
    value: "Disbursed",
  },
];

const returnValueFromList = (attribute: string, SubscriptionDetails?: any[]) =>
  SubscriptionDetails?.find((value) => value?.AttributeName === attribute)
    ?.AttributeValue || "--";

const returnValueFromListDis = (
  attribute: string,
  SubscriptionDetails?: any[],
) =>
  SubscriptionDetails?.find(
    (value) => value?.AttributeDescription === attribute,
  )?.AttributeValue || "--";
