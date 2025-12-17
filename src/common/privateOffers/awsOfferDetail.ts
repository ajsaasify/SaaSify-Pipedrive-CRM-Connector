import { awsOfferCloudDetails } from "../../enum/awsOfferCloudDetails.enum";
import { DurationColumn, OfferDetail } from "../../types/private-offers/defaultView";
import {
  camelCasetoReadView,
  displayBoolean,
  formatUTCDate,
  formatUTCDateOnly,
  getOfferDuration,
  getValue,
} from "../../utils/globalHelper";


export const offerBasicDetails = (offers: any, privateOfferList: any[]) => {
  return [
    [
      {
        label: awsOfferCloudDetails.DEAL_NAME,
        value: getValue(offers.DealBasicDetails?.DealName),
      },
      {
        label: awsOfferCloudDetails.DESCRIPTION,
        value: getValue(offers.DealBasicDetails?.Description),
      },
    ],
    [
      {
        label: awsOfferCloudDetails.SALES_NAME,
        value: getValue(offers.DealBasicDetails?.Salesagent),
      },
      {
        label: awsOfferCloudDetails.SALES_EMAIL,
        value: getValue(offers.DealBasicDetails?.PreparedBy),
      },
    ],
    [
      {
        label: awsOfferCloudDetails.OFFER_ID,
        value: getValue(
          offers.DealBasicDetails?.AWSCPOfferData?.[0]?.OfferID
        ),
      },
      {
        label: awsOfferCloudDetails.OFFER_TYPE,
        value: getValue(
          offers?.DealTermDetails?.PrivateOfferTypeDescription
        ),
      },
    ],
    [
      {
        label: awsOfferCloudDetails.OFFER_URL,
        value: getValue(offers.DealBasicDetails?.PrivateOfferLink),
      },
      {
        label: "",
        value: "",
      }
      // { label: awsOfferCloudDetails.STAGE_NAME, value: status },
    ],
  ];
};

export const offerCppoBasicDetails = (offers: any, privateOfferList:any[]) => {

  return [
    [
      {
        label: "Authorization Name",
        value: getValue(offers.DealCPPOBasicDetails?.DealName),
      },
      {
        label: "Authorization Description",
        value: getValue(offers.DealCPPOBasicDetails?.Description),
      },
    ],
    [
      {
        label: "Sales Agent Name ",
        value: getValue(offers.DealCPPOBasicDetails?.Salesagent),
      },
      {
        label: "Sales Agent Primary Contact ",
        value: getValue(offers.DealCPPOBasicDetails?.PreparedBy),
      },
    ],
   
  ];
};

export const offerCustomerDetails = (offers: any) => {
  return [
    [
      {
        label: awsOfferCloudDetails.CUSTOMER_COMPANY,
        value: getValue(offers?.DealPurchaserDetails?.CustomerName),
      },
      {
        label: awsOfferCloudDetails.CUSTOMER_EMAIL,
        value: getValue(offers?.DealPurchaserDetails?.Email),
      },
    ],
    [
      {
        label: awsOfferCloudDetails.ADDRESS,
        value: getValue(offers?.DealBasicDetails?.AddressLine1),
      },
      {
        label: awsOfferCloudDetails.COUNTRY,
        value: getValue(offers?.DealBasicDetails?.Country),
      },
    ],
    [
      {
        label: awsOfferCloudDetails.STATE,
        value: getValue(offers?.DealBasicDetails?.State),
      },
      {
        label: awsOfferCloudDetails.ZIP_CODE,
        value: getValue(offers?.DealBasicDetails?.ZipCode),
      },
    ],
    [
      {
        label: awsOfferCloudDetails.AWS_ID,
        value: getValue(offers?.DealPurchaserDetails?.CustomerAccountId),
      },
    ],
  ];
};

export const offerResellerDetails = (offers: any) =>{
  return [
    [
      {
        label: "Reseller Id",
        value: getValue(offers?.DealCPPOResellerDetails?.ResellerIds),
      }, 
    ],
    [
      {
        label: "Private Offer Id",
        value: getValue(offers?.DealCPPOBasicDetails?.AWSCPOfferData[0]?.OfferID),
      }, 
    ]
  ]
}

export const offerCppoCustomerDetails = (offers:any) => {
  return [
    [
      {
        label: "Buyer(s)",
        value: offers?.DealCPPOResellerDetails?.CustomerAccountId ?? "All buyers",
      },
    ],
    [
      {
        label: "Customer Company Name",
        value: getValue(offers?.DealCPPOResellerDetails?.CustomerCompanyName),
      },
    ],
  ]
}

export const parseOfferDetails = (
  details: OfferDetail[][],
  groupSize: number
) => {
  // Step 1: Flatten and filter
  const flattened = details.flat().filter(Boolean) as OfferDetail[];

  // Step 2: Group into chunks of `groupSize`
  const grouped: OfferDetail[][] = [];
  for (let i = 0; i < flattened.length; i += groupSize) {
    const group = flattened.slice(i, i + groupSize);

    // Step 3: Fill last group if it has less than `groupSize` items
    while (group.length < groupSize) {
      group.push({ label: "", value: "" });
    }

    grouped.push(group);
  }

  return grouped;
};

export const getContractDurationHeader = (offers : any) => {
  const agreementData = offers?.DealTermDetails?.AgreementData;
  const agreementArray = agreementData?.extraData;
  if (!agreementData) {
    return "Units";
  }
  if (!agreementArray) {
    return "Units";
  }
  let contractType = agreementArray?.contractType;
  let contractDuration = agreementArray?.contractDuration;
  return contractType !== "days" ? `${contractDuration}-month contract ${offers?.DealTermDetails?.IsFPSEnabled ? "usage (qty.)" : "Price (USD)"}`
  : `${contractDuration}-day contract ${offers?.DealTermDetails?.IsFPSEnabled ? "usage (qty.)" : "Price (USD)"}`


}

export const offerCloudDetails = (offers: any) => {
  const IssaasContract = offers?.DealPricingDetails?.PricingJson?.IsSaaSContract;
  const { extraData = {} } = offers.DealTermDetails.AgreementData || {};
  const offerCreatedDate = formatUTCDate(
    offers?.DealBasicDetails?.OfferCreatedDate
  );
  const offerExpiredDate = formatUTCDate(
    offers?.DealTermDetails?.EndDate
  );
  const render = [
    [
      {
        label: awsOfferCloudDetails.PRODUCT,
        value: getValue(offers?.DealPricingDetails?.PricingJson?.OfferName),
      },
     {
        label: awsOfferCloudDetails.PRICING_MODEL,
        value: offers?.DealPricingDetails?.PricingJson?.IsSaaSContract
          ? awsOfferCloudDetails.CONTRACT_MODEL
          : awsOfferCloudDetails.USAGE_MODEL,
      },
      {
        label: awsOfferCloudDetails.PRODUCT_ID,
        value: getValue(offers?.DealTermDetails?.MarketplaceProductId),
      },
    ],
    [
      offers?.DealPricingDetails?.PricingJson?.IsSaaSContract && {
        label: awsOfferCloudDetails.FPS,
        value: displayBoolean(offers?.DealTermDetails?.IsFPSEnabled),
      },
      {
        label: awsOfferCloudDetails.OFFER_CREATED,
        value: formatUTCDate(offers?.DealBasicDetails?.OfferCreatedDate),
      },
      {
        label: awsOfferCloudDetails.OFFER_EXPERIED,
        value: formatUTCDate(offers?.DealTermDetails?.ExpirationDate),
      },
    ],
    [
      {
        label: awsOfferCloudDetails.RENEWAL_STATUS,
        value: offers?.DealTermDetails?.IsRenewal
          ? awsOfferCloudDetails.RENEWAL_OFFER
          : awsOfferCloudDetails.NON_RENEWAL_OFFER,
      },
    ],
    [],
  ];

  // Access the last sub-array properly
  const lastSection = render[render.length - 1];
  const lastPrevSection = render[render.length - 2];
  if(extraData?.IsAgreementExists){
    lastPrevSection.push({
      label: awsOfferCloudDetails.RENEWAL_TYPE,
      value: getValue(offers?.DealTermDetails?.RenewalType),
    });
    lastSection.push({
      label: awsOfferCloudDetails.CONTRACT_END_DATE,
      value: formatUTCDate(offers?.DealTermDetails?.AgreementEndDate),
    });
  }
  else if (offers?.DealTermDetails?.IsRenewal) {
    lastPrevSection.push({
      label: awsOfferCloudDetails.RENEWAL_TYPE,
      value: getValue(offers?.DealTermDetails?.RenewalType),
    });
    lastPrevSection.push({
      label: offers?.DealPricingDetails?.PricingJson?.IsSaaSContract
        ? awsOfferCloudDetails.CONTRACT_START_DATE
        : awsOfferCloudDetails.USAGE_START_DATE,
      value: offers?.DealTermDetails?.IsFutureDateAgreementExists
        ? formatUTCDate(offers?.DealTermDetails?.AgreementStartDate)
        : awsOfferCloudDetails.AT_ACCEPTANCE,
    });
    if (offers?.DealTermDetails?.IsFutureDateAgreementExists) {
      lastSection.push({
        label: awsOfferCloudDetails.CONTRACT_END_DATE,
        value: formatUTCDate(offers?.DealTermDetails?.AgreementEndDate),
      });
    } else {
      lastSection.push({
        label: offers?.DealPricingDetails?.PricingJson?.IsSaaSContract
          ? awsOfferCloudDetails.CONTRACT_DURATION
          : awsOfferCloudDetails.USAGE_DURATION,
        value: offers?.DealPricingDetails?.PricingJson?.IsSaaSContract
          ? `${extraData?.contractDuration}-${extraData?.contractDuration > 1 ? (extraData?.contractType === "months" ? "months" : "days") : (extraData?.contractType === "days" ? "day" : "month") }`
          : `${getOfferDuration(offerCreatedDate, offerExpiredDate)} days`,
      }); // need to change not contract !
      lastPrevSection.push(
        !offers?.DealPricingDetails?.PricingJson?.IsSaaSContract && 
      {
        label: awsOfferCloudDetails.USAGE_END_DATE,
        value: formatUTCDate(offers?.DealTermDetails?.EndDate)
      }
    );
    }
  } else {
    lastPrevSection.push({
      label: awsOfferCloudDetails.CONTRACT_START_DATE,
      value: offers?.DealTermDetails?.IsFutureDateAgreementExists
        ? formatUTCDate(offers?.DealTermDetails?.AgreementStartDate)
        : awsOfferCloudDetails.AT_ACCEPTANCE,
    });
    if (offers?.DealTermDetails?.IsFutureDateAgreementExists) {
      lastPrevSection.push({
        label: awsOfferCloudDetails.CONTRACT_END_DATE,
        value: formatUTCDate(offers?.DealTermDetails?.AgreementEndDate),
      });
    } else {
      lastPrevSection.push({
        label: awsOfferCloudDetails.CONTRACT_DURATION,
        value: `${extraData?.contractDuration}-${extraData?.contractDuration > 1 ? (extraData?.contractType === "months" ? "months" : "days") : (extraData?.contractType === "days" ? "day" : "month") }`,
      });
    }
  }
  lastSection.push({
    label: awsOfferCloudDetails.LEGAL_TERM_TYPE,
    value: camelCasetoReadView(offers?.DealTermDetails?.LegalTermType),
  });
  lastSection.push({
    label: awsOfferCloudDetails.TERMS_CONDITIONS,
    value: getValue(offers?.DealTermDetails?.AgreementURL),
  });

    if (!offers?.DealTermDetails.IsFPSEnabled && IssaasContract) {
      lastSection.push({
        label: awsOfferCloudDetails.PURCHASING_OPTIONS,
        value: offers?.DealPricingDetails?.PricingJson
          ?.IsMultipleDimensionSubscriptionEnabled
          ? awsOfferCloudDetails.MULTIPLE_DIMENSIONS
          : awsOfferCloudDetails.SINGLE_DIMENSIONS,
      });

  }
  const grouped = parseOfferDetails(render, 3);
  return grouped;
};

export const offerCppoCloudDetails = (offers: any) => {
  const customContractData = offers.DealCPPOTermDetails?.CustomContractData;
   let contractDuration;
  if (customContractData?.contractDuration != null && customContractData.contractDuration > 0) {
    contractDuration = customContractData.contractDuration;
  } else {
    contractDuration = customContractData?.customDurationVal;
  }
  const CustomeLegalTermData = offers.DealCPPOTermDetails?.CustomeLegalTermData;
  const { agreementUrl } = CustomeLegalTermData;
  const termDetails = offers?.DealCPPOTermDetails;
  let resellerAgreementValue;
  let resellerAgreementUrl;
  let aggrementEulaUrl;
  if(termDetails?.LegalTermsTypeId === "2" || termDetails?.LegalTermsTypeId === "Standard Contract for AWS Marketplace (SCMP)") {
    aggrementEulaUrl = "https://aws-mp-standard-contracts.s3.us-east-1.amazonaws.com/Standard-Contact-for-AWS-Marketplace-2022-07-14.pdf";
  }

  if(termDetails?.LegalTermsTypeId === "1" || termDetails?.LegalTermsTypeId === "Public EULA") {
    aggrementEulaUrl = agreementUrl;
  }
  if(termDetails?.LegalTermsTypeId === "3" || termDetails?.LegalTermsTypeId === "Custom EULA") {
    aggrementEulaUrl = agreementUrl;
  }
  if (termDetails?.IsResellerContractEnabled) {
    resellerAgreementValue = "Reseller Contract for AWS Marketplace (RCMP)";
    resellerAgreementUrl = "https://aws-mp-rcmp.s3.us-east-1.amazonaws.com/Reseller-Contract-for-AWS-Marketplace-2021-12-01.pdf"; 
  } else if (
    termDetails?.IsCustomContractEnabled &&
    termDetails?.CustomContractData?.resellerFileUrl
  ) {
    resellerAgreementValue = "Custom Contract";
    resellerAgreementUrl = termDetails?.CustomContractData?.resellerFileUrl; 
  }else{
    resellerAgreementValue = "--"
  }

  let fields =  [
    [
      {
        label: "Authorization ID",
        value: getValue(offers?.DealCPPOTermDetails?.AWSCPPOIdentifier),
      },
      {
        label: "Product",
        value: getValue(offers?.DealCPPOPricingDetails?.CPPOPricingJson?.OfferName),
      },
      {
        label: "Authorization Time Length",
        value: getValue(offers?.DealCPPOTermDetails?.OpportunityDurationTypeID) || "true",
      },
    ],
    [ 
      {       
        label: "Authorization End Date",
        value: formatUTCDate(offers?.DealCPPOTermDetails?.Enddate),
      },
      {
        label: "Maximum Allowed Service Start Date",
        value: offers?.DealCPPOTermDetails?.ServiceStartDate ? formatUTCDate(offers?.DealCPPOTermDetails?.ServiceStartDate) : "--",
      },
      {
        label: "Authorization Duration",
        value: contractDuration ? `${contractDuration}-Month${contractDuration > 1 ? "s" : ""}` : "Standard",
      },
    ],
    [
      {
        label: "Discount Type",
        value: getValue(offers?.DealCPPOTermDetails?.DiscountTypeID),
      },
      {
        label: "Renewal",
        value: getValue(offers?.DealCPPOResellerDetails?.IsRenewal ? "Yes" : "No"),
      },
      {
        label: "End User License Agreement For Buyer",
        value: getValue(offers?.DealCPPOTermDetails?.LegalTermsTypeId),
        url: aggrementEulaUrl,
      },
    ],
    [
      {
        label: "Reseller Agreement",
        value: resellerAgreementValue,
         url: resellerAgreementUrl,
      },
      {},
    ]
  ]

  if (!offers?.DealCPPOPricingDetails?.CPPOPricingJson?.IsSaaSContract) {
    fields = fields.map((group) => group.filter(field => field?.label !== "Authorization Duration"));
  }

  return chunkArray(fields.flat(), 3);

}

// Function to chunk array into groups of 3
export const chunkArray = (arr: any[], size: number) => {
  return arr.reduce((acc, _, i) => {
    if (i % size === 0) acc.push(arr.slice(i, i + size));
    return acc;
  }, []);
};

export function getActiveColumns(plans: any[]): DurationColumn[] {
  // Gather all durations that appear in the raw data
  const durationsInData = new Set(plans.map((p) => p.Duration));

  // Map each known duration to its corresponding table column
  const possibleDurationColumns: Record<string, DurationColumn> = {
      "Monthly": { value: "monthlyPrice", header: "1 Month Rate (USD)" },
      "One Year": { value: "oneYearPrice", header: "12 Months Rate (USD)" },
      "Two Years": { value: "twoYearPrice", header: "24 Months Rate (USD)" },
      "Three Years": { value: "threeYearPrice", header: "36 Months Rate (USD)" },
  };

  // Build an array of columns for each duration we actually have in the data
  const durationColumns = Array
      .from(durationsInData)
      .reduce<DurationColumn[]>((cols, duration) => {
          if (possibleDurationColumns[duration]) {
              cols.push(possibleDurationColumns[duration]);
          }
          return cols;
      }, []);

  // Always show Name & Description columns, then only the durations that exist
  return [
      { value: "planName", header: "Name" },
      { value: "planDescription", header: "Description" },
      ...durationColumns,
  ];
}


export function transformPlansData(plans: any[]) {
  const groupedData: Record<string, any> = {};

  plans.forEach((plan) => {
      const {
          Description,
          MarketplaceDescription,
          Duration,
          Price,
      } = plan;
      const key = `${Description}-${MarketplaceDescription}`;
      if (!groupedData[key]) {
          groupedData[key] = {
              planName: Description,
              planDescription: MarketplaceDescription,
              monthlyPrice: 0,
              oneYearPrice: 0,
              twoYearPrice: 0,
              threeYearPrice: 0,
          };
      }
      switch (Duration) {
          case "Monthly":
              groupedData[key].monthlyPrice = `$${Price}`;
              break;
          case "One Year":
              groupedData[key].oneYearPrice = `$${Price}`;
              break;
          case "Two Years":
              groupedData[key].twoYearPrice = `$${Price}`;
              break;
          case "Three Years":
              groupedData[key].threeYearPrice = `$${Price}`;
              break;
          default:
              break;
      }
  });
  return Object.values(groupedData);
}

export const renderSubscription = (subscriptions: any) => {
  const offerAcceptedDate = returnValueFromList(
    "ActivatedON",
    subscriptions?.SubscriptionDetails
  );
  const offerStartDate = returnValueFromList(
    "StartDate",
    subscriptions?.SubscriptionDetails
  );
  const offerEndDate = returnValueFromList(
    "EndDate",
    subscriptions?.SubscriptionDetails
  );
  const offerRenewal = returnValueFromList(
    "AutoRenewal",
    subscriptions?.SubscriptionDetails
  );
  return [
    [
      {
        label: "Agreement ID",
        value: getValue(subscriptions?.Headers?.AWSAgreementID),
      },
      { label: "Offer Accepted Date", value: formatUTCDate(offerAcceptedDate) },
    ],
    [
      { label: "Agreement Start Date", value: formatUTCDate(offerStartDate) },
      { label: "Agreement End Date", value: formatUTCDate(offerEndDate) },
    ],
    [
      {
        label: "Status",
        value: getValue(
          subscriptions?.Headers?.SubscriptionStatusDescription
        ),
      },
      { label: "Auto Renewal", value: getValue(offerRenewal) },
    ],
  ];
};

export const renderCPPOSubscription = (subscriptions: any, showDetails: any) => {  
  const offerAcceptedDate = returnValueFromList(
    "ActivatedON",
    subscriptions?.SubscriptionDetails
  );
  const offerStartDate = returnValueFromList(
    "StartDate",
    subscriptions?.SubscriptionDetails
  );
  const offerEndDate = returnValueFromList(
    "EndDate",
    subscriptions?.SubscriptionDetails
  );
  const offerRenewal = returnValueFromList(
    "AutoRenewal",
    subscriptions?.SubscriptionDetails
  );
  const customerName = returnValueFromList(
    "CustomerName",
    subscriptions?.SubscriptionDetails
  );

  return [
    [
      {
        label: "Private Offer ID",
        value: getValue(showDetails?.DealCPPOBasicDetails?.AWSCPOfferData[0]?.OfferID),
      },
      {
        label: "Agreement ID",
        value: getValue(subscriptions?.Headers?.AWSAgreementID),
      },
      {
        label: "Status",
        value: getValue(
          subscriptions?.Headers?.SubscriptionStatusDescription
        ),
      },
    ],
    [
      { label: "Offer Accepted Date", value: formatUTCDateOnly(offerAcceptedDate) },
      { label: "Agreement Start Date", value: formatUTCDateOnly(offerStartDate) },
      { label: "Agreement End Date", value: formatUTCDateOnly(offerEndDate) },
    ],
    [
      { label: "Customer AWS Account ID", value: getValue(subscriptions?.Headers?.AWSCustomerAccountID)},
      { label: "Customer Name", value: getValue(customerName) },
      { label: "Auto Renewal", value: getValue(offerRenewal) },
    ],
  ];
}

export const renderProductDimension = (subscriptions: any) => {
  const plan = returnValueFromList(
    "PlanName",
    subscriptions?.SubscriptionDetails
  );
  const quantity = returnValueFromList(
    "Quantity",
    subscriptions?.SubscriptionDetails
  );

  return [
    [
      {
        label: "Display Name",
        value: getValue(plan),
      },
      { label: "Quantity", value: getValue(quantity) },
    ],
  ];
};
export const renderPurchaseAttributes = (subscriptions: any) => {
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
        value: getValue(chargebeeId),
      },
      {
        label: "Chargebee Subscription URL",
        value: getValue(chargebeeSubscriptionURL),
      },
    ],
    [
      {
        label: "Chargebee Subscription Id",
        value: getValue(chargebeeSubscriptionID),
      },
      { label: "", value: "" },
    ],
  ];
};
export const renderViewDetailsOverlay = (subscriptions: any) => {  
  const companyName = returnValueFromList(
    "Company",
    subscriptions?.PaymentDetails
  );
  const transactionRefferenceId = returnValueFromList(
    "TransactionReferenceId",
    subscriptions?.PaymentDetails
  );
  const ExpectedPaymentDate = returnValueFromList(
    "ExpectedPaymentDate",
    subscriptions?.PaymentDetails
  );
  const TransactionAmount = returnValueFromList(
    "TransactionAmount",
    subscriptions?.PaymentDetails
  );
  const ExpectedAmountInISVCurrency = returnValueFromList(
    "SaaSifyEarningAmount",
    subscriptions?.PaymentDetails
  );
  const EarningAmount = returnValueFromList(
    "EarningAmount",
    subscriptions?.PaymentDetails
  );
  const ISVCurrencyCode = returnValueFromList(
    "ISVCurrencyCode",
    subscriptions?.PaymentDetails
  );
  const StoreFee = returnValueFromList(
    "StoreFee",
    subscriptions?.PaymentDetails
  );
  const StoreFeeInPercent = returnValueFromList(
    "StoreFeeInPercent",
    subscriptions?.PaymentDetails
  );
  const PayDate = returnValueFromList(
    "PaymentDate",
    subscriptions?.PaymentDetails
  );
  const subsId = returnValueFromList(
    "SaaSSubscriptionResourceID",
    subscriptions?.PaymentDetails
  );
  const PaymentStatus = returnValueFromList(
    "PaymentStatus",
    subscriptions?.PaymentDetails
  );
  return [
    {
      title: "Company Name",
      value: getValue(companyName),
    },
    {
      title: "Transaction Reference",
      value: getValue(transactionRefferenceId),
    },
    {
      title: "Expected Payment Month",
      value: ExpectedPaymentDate,
    },
    {
      title: "Transaction Amount",
      value: getValue(TransactionAmount),
    },
    {
      title: "Expected Pay",
      value: getValue(ExpectedAmountInISVCurrency),
    },
    {
      title: "Actual Pay",
      value: getValue(EarningAmount),
    },
    {
      title: "Currency",
      value: getValue(ISVCurrencyCode),
    },
    {
      title: "Store Fee Amount",
      value: getValue(StoreFee),
    },
    {
      title: "Store Fee Percentage",
      value: getValue(StoreFeeInPercent),
    },
    {
      title: "Actual Pay Date",
      value: PayDate,
    },
    {
      title: "SaaS Subscription Resource ID",
      value: getValue(subsId),
    },
    {
      title: "Status",
      value: getValue(PaymentStatus),
    },
  ];
};
export const ampRenderViewDetails = [
  {
    title: "Company Name",
    value: "Trinity Enterprises",
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
export const awsRenderViewDetails = [
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
  SubscriptionDetails?.find((value) => value?.AttributeName == attribute)
    ?.AttributeValueDescription || "--";

export const returnPayoutDetails = [
  {
    companyName: "Globex Corporation",
    TranscationRefference: "58dyy78f4ee576b8883a7efe607978fb79545e7p",
    SaasSubscriptionDate: "7564289C-9A7B-47C6-B200-12A6CA18848B",
    TransactionDate: "2025-02-28",
    TransactionType: "Contract",
    TransactionAmount: "100",
    ExpectedPaymentDate: "Feb-2025",
    SaaSifyEarningAmount: "97",
    PaymentDate: "",
    EarningAmount: "",
    StoreFeeInPercent: "3",
    PaymentStatus: "Scheduled",
  },
  {
    companyName: "Globex Corporation",
    TranscationRefference: "89dpp78f4ee576b7683a7efe607978fb79545e7p",
    SaasSubscriptionDate: "9864289C-9A7B-47C6-B200-12A6CA18848B",
    TransactionDate: "2025-03-13",
    TransactionType: "Contract",
    TransactionAmount: "100",
    ExpectedPaymentDate: "Mar-2025",
    SaaSifyEarningAmount: "97",
    PaymentDate: "",
    EarningAmount: "",
    StoreFeeInPercent: "3",
    PaymentStatus: "Scheduled",
  },
  {
    companyName: "Globex Corporation",
    TranscationRefference: "67dyy78f4ee576b8973a7efe607978fb79545e7p",
    SaasSubscriptionDate: "9864289C-9A7B-47C6-B200-12A6CA18848B",
    TransactionDate: "2025-03-25",
    TransactionType: "Contract",
    TransactionAmount: "100",
    ExpectedPaymentDate: "Mar-2025",
    SaaSifyEarningAmount: "97",
    PaymentDate: "",
    EarningAmount: "",
    StoreFeeInPercent: "3",
    PaymentStatus: "Scheduled",
  },
];