import {
  camelCasetoReadView,
  displayBoolean,
  fallbackAsNa,
  formatUTCDate,
} from "../../utils/globalHelper";
import { chunkArray } from "./awsOfferDetail";

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
          offers.DealBasicDetails.AWSCPOfferData?.[0]?.OfferID
        ),
      },

      {
        label: "Offer URL",
        value: fallbackAsNa(offers.DealBasicDetails.PrivateOfferLink),
      },
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
        value: fallbackAsNa(offers?.DealBasicDetails?.AddressLine1),
      },
      {
        label: "Country",
        value: fallbackAsNa(offers?.DealBasicDetails?.Country),
      },
    ],
    [
      {
        label: "State",
        value: fallbackAsNa(offers?.DealBasicDetails?.State),
      },
      {
        label: "Zip/Postal Code",
        value: fallbackAsNa(offers?.DealBasicDetails?.ZipCode),
      },
    ],
    [
      {
        label: "Billing Account ID",
        value: fallbackAsNa(offers?.DealTermDetails?.CustomerAccountId),
      },
      {
        label: "Purchaser Azure AD Tenant ID ",
        value: offers?.DealPurchaserDetails?.CustomerTenantID || "--",
      },
    ],
  ];
};

export const offerCloudDetails = (offers: any) => {  
 let fields = [
    [
      {
        label: "Product",
        value: offers?.DealTermDetails?.ProductName ?? offers?.DealTermDetails?.ProductID,
      },
      {
        label: "Plan",
        value: offers?.DealTermDetails?.PlanName ?? offers?.DealTermDetails?.ProductID,
      },
      {
        label: "Pricing model",
        value: camelCasetoReadView(
          offers?.DealPricingDetails.PricingJson?.PricingModel
        ),
      },
    ],
    [
      {
        label: "Price type",
        value: camelCasetoReadView(
          offers?.DealPricingDetails?.PricingJson?.PriceType
        ),
      },
      {
        label: "Customer Renewal",
        value: displayBoolean(offers?.DealTermDetails?.IsRenewal),
      },
      {
        label: "Free Trial",
        value: displayBoolean(offers.DealPricingDetails.PricingJson?.FreeTrail),
      },
    ],
    [
      {
        label: "Start Date Type",
        value: camelCasetoReadView(offers?.DealTermDetails?.StartDateType),
      },
      {
        label: "End Date",
        value: formatUTCDate(offers?.DealBasicDetails?.EndDate),
      },
      {
        label: "Accept by",
        value: formatUTCDate(offers?.DealBasicDetails?.AcceptedDate),
      },
    ],
    [
      {
        label: "Start Date",
        value: formatUTCDate(offers?.DealBasicDetails?.StartDate),
      },
     {
        label: "Discount",
        value: `${offers?.DealPricingDetails?.PricingJson?.Discount} %`,
      },
      {
        label: "Terms and Conditions",
        value: fallbackAsNa(offers?.DealTermDetails?.AgreementURL),
      },
      {},
    ],
  ]
   if (offers?.DealPricingDetails?.PricingJson?.PriceType !== "DiscountedPrice") {
      fields = fields.map((group) => group.filter(field => field?.label !== "Discount"));
    }

    if (offers?.DealBasicDetails?.StartDateType !== "SpecificMonth") {
      fields = fields.map((group) => group.filter(field => field?.label !== "Start Date"));
    }
  
    return chunkArray(fields.flat(), 3);
};

export const renderSubscription = [
  [
    {
      label: "SaaS Subscription Resource ID",
      value: "6F759F8D-1AB5-4A0B-CBCA-5977DFC7217A",
    },
    {
      label: "SaaS Subscription Name",
      value: "Trinity-Enterprises-1month-flat-rate",
    },
  ],
  [
    { label: "Term Start Date", value: "2024-10-30" },
    { label: "Term End Date", value: "2024-11-29" },
  ],
  [
    { label: "Auto Renew", value: "No" },
    { label: "Free Trial", value: "No" },
  ],
];

export const renderProductSubscription = (subscriptions: any) => {
  const ProductName = returnValueFromList(
    "data_morph_engine",
    subscriptions?.SubscriptionDetails
  );
  const PlanName = returnValueFromList(
    "custom_data_morphing_solutions",
    subscriptions?.SubscriptionDetails
  );
  const BilliningTerm = returnValueFromList(
    "BillingTerm",
    subscriptions?.SubscriptionDetails
  );

  return [
  [
    { label: "Product Name", value: fallbackAsNa(ProductName) },
    { label: "Plan Name", value: fallbackAsNa(PlanName) },
  ],
  [
    { label: "Billing Term", value: fallbackAsNa(BilliningTerm) },
    // { label: "Billing Frequency", value: "One-time" },
  ],
]
}

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

export const processBillingData = (offers) => {  
  const IsMonthlyEnabled = offers?.IsMonthlyEnabled;
  const IsAnnualEnabled = offers?.IsAnnualEnabled;
  const IsTwoyearEnabled = offers?.IsTwoyearEnabled;
  const IsThreeyearEnabled = offers?.IsThreeyearEnabled;
  const PublicPlanProviderMonthlyBillingPrice = offers?.IsMonthlyPrice;
  const PublicPlanProviderAnnualBillingPrice = offers?.IsAnnualPrice;
  const PublicPlanProvider2YearBillingPrice = offers?.IsTwoyearPrice;
  const PublicPlanProvider3YearBillingPrice = offers?.IsThreeyearPrice;
  const PlanProviderMonthlyPaymentFrequencyId = offers?.PlanProviderMonthlyPaymentFrequencyId;
  const PlanProviderAnnualPaymentFrequencyId = offers?.PlanProviderAnnualPaymentFrequencyId;
  const PlanProvider2YearPaymentFrequencyId = offers?.PlanProvider2YearPaymentFrequencyId;
  const PlanProvider3YearPaymentFrequencyId = offers?.PlanProvider3YearPaymentFrequencyId;

  const billingList:any = [];

  const billingData = [
    { enabled: IsMonthlyEnabled, title: "1-month", price: PublicPlanProviderMonthlyBillingPrice, frequencyId: PlanProviderMonthlyPaymentFrequencyId, cycle: "Monthly" },
    { enabled: IsAnnualEnabled, title: "1-year", price: PublicPlanProviderAnnualBillingPrice, frequencyId: PlanProviderAnnualPaymentFrequencyId, cycle: "Annual" },
    { enabled: IsTwoyearEnabled, title: "2-year", price: PublicPlanProvider2YearBillingPrice, frequencyId: PlanProvider2YearPaymentFrequencyId, cycle: "2Years" },
    { enabled: IsThreeyearEnabled, title: "3-year", price: PublicPlanProvider3YearBillingPrice, frequencyId: PlanProvider3YearPaymentFrequencyId, cycle: "3Years" },
  ];
  // Filter only enabled billing options
  billingData.forEach(({ enabled, title, price, frequencyId, cycle }) => {
    if (enabled) {
      const paymentOption = offers?.BillingTermsData?.find(
        (d) => d.BillingCycle === cycle && d.PaymentFrequencyId === frequencyId
      );

      billingList.push({
        title,
        option: paymentOption ? paymentOption.PaymentFrequency : "N/A",
        Price: price || "N/A",
      });
    }
  });

  return billingList;
};

const returnValueFromList = (attribute: string, SubscriptionDetails?: any[]) =>
  SubscriptionDetails?.find((value) => value?.AttributeName == attribute)
    ?.AttributeValue || "--";
  
export const renderPurchaseAttributesAmp = (subscriptions: any) => {
  const chargebeeId = returnValueFromList(
    "ChargebeeCustomerId",
    subscriptions?.SubscriptionDetails
  );
  const chargebeeSubscriptionURL = returnValueFromList(
    "ChargebeeSubscriptionDetail",
    subscriptions?.SubscriptionDetails
  );
  const chargebeeSubscriptionID = returnValueFromList(
    "ChargebeeSubscriptionId",
    subscriptions?.SubscriptionDetails
  );
  return [
    [
      {
        label: "Chargebee Customer Id",
        value: chargebeeId,
      },
      { label: "Chargebee Subscription URL", value: chargebeeSubscriptionURL },
    ],
    [
      { label: "Chargebee Subscription Id", value: chargebeeSubscriptionID },
      { label: "", value: "" },
    ],
  ];
};
