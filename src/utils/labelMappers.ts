export const labelMapper = {
  accordian: {
    customer: "Customer Details",
    project: "Project Details",
    marketing: "Opportunity Marketing Details",
    additional: "Additional Details",
    contact: "Customer Contact Details",
    partnerSalesContact: "Partner Sales Contact Details",
    overview: "Co-sell Overview",
    endUserContact: "Customer End User Contact Details",
  },
  customerDuns: {
    label: "Customer DUNS",
    name: "customerDuns",
    discription: "Customer data universal number system.",
    validation: "Customer Duns is 9 digits. For example: 123456789",
    validationMessage: "Customer DUNS is invalid.",
    toopTip:
      "Customer DUNS format : 123456789 (Mention like For example: 123456789)",
  },
  customerCompanyName: {
    label: "Customer Company Name",
    name: "customerCompanyName",
    validationMessage: "Customer Company Name is required",
  },
  customerWebsite: {
    label: "Customer Website",
    name: "customerWebsite",
    placeHolder: "www.index.com",
    validationMessage: "Customer Website is required",
  },
  industryVertical: {
    label: "Industry Vertical",
    name: "industryVertical",
    value: "Other",
    validationMessage: "Industry Vertical is required",
  },
  nationSecurities: {
    label: "Classified National Security Information",
    name: "nationSecurities",
    value: "Government",
    country: "United States",
    defaultValue: { yes: "Yes", no: "No" },
    discription: { yes: "", no: "" },
  },
  industryOther: {
    label: "Industry Other",
    name: "industryOther",
    validationMessage: "Industry Other is required",
  },
  streetAddress: {
    label: "Address",
    name: "streetAddress",
    validationMessage: "Street Address is required",
  },
  state: {
    label: "State/Province",
    name: "state",
    validationMessage: "State/Province is required",
    value: "United States",
  },
  country: {
    label: "Country",
    name: "country",
    validationMessage: "Country is required",
  },
  city: {
    label: "City",
    name: "city",
    validationMessage: "City is required",
  },
  postalCode: {
    label: "Postal Code",
    name: "postalCode",
    validation: "Postal Code is required",
    validationMessage: "Postal Code is required",
  },
  awsCosell: {
    listItemLabel: "Primary need from AWS *",
    discription: {
      yes: "Share the opportunity with AWS to receive deal assistance and support.",
      no: "Share this opportunity with AWS for visibility only, you will not receive deal assistance and support.",
      select: "Select all that apply.",
    },
    label: "Specific needs from AWS for Co-sell",
    value: { yes: "None", no: "Do Not Need Support from AWS Sales Rep" },
    name: "awsCosell",
    placeholder: "AWS for Co-sell",
    validationMessage: "Specific needs from AWS for Co-sell is required",
  },
  opportunityType: {
    listItemLabel: "Opportunity Type *",
    name: "opportunityType",
    value: {
      expansion: "Expansion",
      netNewBusiness: "Net New Business",
      flatRenewal: "Flat Renewal",
    },
    discription: {
      expansion:
        "This opportunity is based on a new contract or agreement with this new customer/ logo for your company.",
      netNewBusiness:
        "This opportunity is based on an existing contact with this end customer which may include new line of business, partner product, or additional customer instances.",
      flatRenewal:
        "This opportunity is based on an esisting contract with this end customer where no expansion will take place.",
    },
  },
  partnerPrimaryNeedAction: {
    label: "Primary need from AWS *",
    discription: {
      awsSupport:
        "Share the opportunity with AWS to receive deal assistance and support.",
      awsNotSupport:
        "Share this opportunity with AWS for visibility only, you will not receive deal assistance and support.",
    },
    value: {
      awsNotSupport: "Do Not Need Support from AWS Sales Rep",
      awsSupport: "None",
    },
  },
  relatedOpportunityIndentifier: {
    label: "Parent Opportunity ID",
    name: "relatedOpportunityIndentifier",
    description:
      "This original opportunity that this opportunity is renewing from.",
    validationMessage: "Parent Opportunity ID is required",
  },
  partnerProjectTitle: {
    label: "Partner Project Title",
    name: "partnerProjectTitle",
    validationMessage: "Partner Project Title is required",
  },
  salesActivities: {
    label: "Sales Activities",
    name: "salesActivities",
    validationMessage: "Sales Activities is required",
    discription:
      "Choose sales activities that have happened with the end-customer.",
  },
  customerBusinessProblem: {
    label: "Customer Business Problem",
    name: "customerBusinessProblem",
    discription:
      "Provide a clear description of the customer's business problem/pain point you are trying to address.",
    validation:
      "Business problem must have at least 20 characters up to a recommended maximum of 2000 characters.",
    validationMessage: "Customer Business Problem is required",
  },
  solutionsOffered: {
    description:
      "Choose the partner solutions that you're offering to this customer. If other, describe your solution.",
    label: "Solutions Offered",
    name: "solutionsOffered",
    validation: "Solutions Offered selected upto 10",
    validationMessage: "Solutions Offered is required",
  },
  awsProducts: {
    label: "AWS Products",
    name: "awsProducts",
    description:
      "Choose one or more AWS products that will be utilized to soleve the customer's business problem. Adding products enables AWS to connect you with the right support on this opportunity.",
    validation: "AWS products selected upto 20",
    validationMessage: "AWS products is required",
  },
  nextStep: {
    label: "Next Step",
    name: "nextStep",
    description: "Enter the next steps for this opportunity.",
    validation: "Next steps can have up to 255 characters",
    validationMessage: "Next steps is required",
    maxLength: 255,
  },
  useCase: {
    label: "Use Case",
    name: "useCase",
    validationMessage: "Use Case is required",
  },
  deliveryModel: {
    label: "Delivery Model",
    description:
      "Indicate one or more applicable deployment or consumption model for your solution or service.",
    validationMessage: "Delivery Model is required",
    name: "deliveryModel",
  },
  estimatedAWSRecurringRevenue: {
    name: "estimatedAWSRecurringRevenue",
    label: "Estimated AWS Monthly Recurring Revenue",
    validationMessage: "Estimated AWS Monthly Recurring Revenue is required",
    validation: "Estimated AWS Monthly Recurring Revenue is invalid",
    valid: "Estimated AWS Monthly Recurring Revenue is required",
  },
  targetCloseDate: {
    name: "targetCloseDate",
    label: "Target Close Date",
    validationMessage: "Target Close Date is required",
    validation: "Target Close Date is required",
    invalidMessage: "Target Close Date should be a future date",
  },
  apnProgram: {
    placeholder: "APN Program",
    label: "APN Program - optional",
    name: "apnProgram",
  },
  marketingSource: {
    discription: "Is opportunity from marketing activity ? *",
    name: "marketingSource",
    value: { yes: "Marketing Activity", no: "None" },
  },
  marketingCampaign: {
    label: "Marketing Campaign",
    name: "marketingCampaign",
  },
  marketingUseCase: {
    label: "Marketing Activities Use Case",
    name: "marketingUseCase",
  },
  marketingActivityChannel: {
    label: "Marketing Activity Channel",
    name: "marketingActivityChannel",
  },
  isMarketingfunds: {
    label: "Was marketing development funds used ? *",
    name: "isMarketingfunds",
    value: { yes: "Yes", no: "No" },
  },
  crmUniqueIdentifier: {
    label: "Partner CRM Unique Identifier",
    name: "crmUniqueIdentifier",
    validationMessage: "For example: 1234567",
  },
  competitiveTracking: {
    name: "competitiveTracking",
    value: "*Other",
    label: "Competitive Tracking",
  },
  otherCompetitors: {
    label: "Other Competitors",
    name: "otherCompetitors",
    value: "*Other",
    validationMessage: "Other Competitors is required",
  },
  awsAccountId: {
    label: "AWS Account ID (if available)",
    name: "awsAccountId",
    description: "AWS accountID 12 digits.",
    validationMessage: "For example: 123456456147",
    validationErrorMessage: "Account Id must be 12 numerical digits",
  },
  additonalComments: {
    label: "Addtional Comments",
    name: "additonalComments",
    description:
      "Enter project description, opportunity details, customer pain points, customwe needs, etc.",
    validation: "Additional Comments can have up to 255 characters",
    validationMessage: "Additional Comments is required",
  },
  contactFirstName: {
    label: "Customer First Name",
    name: "contactFirstName",
  },
  contactLastName: {
    label: "Customer Last Name",
    name: "contactLastName",
  },
  contactEmail: {
    label: "Customer E-mail",
    name: "contactEmail",
    value: "Contact E-mail is not valid",
  },
  contactPhone: {
    label: "Customer Phone",
    name: "contactPhone",
  },
  contactTitle: {
    label: "Customer Title",
    name: "contactTitle",
  },
  primaryContactFirstName: {
    label: "Primary Contact First Name",
    name: "primaryContactFirstName",
  },
  primaryContactLastName: {
    label: "Primary Contact Last Name",
    name: "primaryContactLastName",
  },
  primaryContactEmail: {
    label: "Primary Contact E-mail",
    name: "primaryContactEmail",
    value: "Contact E-mail is not valid",
  },
  primaryContactPhone: {
    label: "Primary Contact Phone",
    name: "primaryContactPhone",
  },
  primaryContactTitle: {
    label: "Primary Contact Title",
    name: "primaryContactTitle",
  },
  contactDescription:
    " Request you to fill in the end customer details in this section. Though optional it assists us in progressing faster on the opportunity. In case this is not filled, we will populate this with the opportunity submitter information, for the AWS Sales team to contact.",
  partnerDescription:
    "Provide contact information for the primary sales contact responsible for this opportunity within your organization. The AWS sales team may reach out to this individual to discuss the opportunity further.",

  marketingSourceAction: {
    label: "Is opportunity from marketing activity?",
  },
  marketingSourceIsMarketingFundsAction: {
    label: "Was marketing development funds used?",
  },
};
