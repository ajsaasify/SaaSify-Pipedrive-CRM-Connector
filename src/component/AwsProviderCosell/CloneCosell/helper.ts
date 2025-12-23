export const labelMapper = {
  partnerProjectTitle: {
    label: "Partner Project Title",
    name: "partnerProjectTitle" as const,
    placeHolder: "Enter Partner Project Title",
    maxLength:
      "Partner Project Title should not be more than 255 characters long.",
    required: "Partner Project Title is required",
    duplicate: "Partner Project Title should be unique",
  },
  crmUniqueIdentifier: {
    label: "Partner CRM Unique Identifier",
    name: "crmUniqueIdentifier",
    validationMessage: "For example: 1234567",
    placeHolder: "Enter Partner CRM Unique Identifier",
  },
  customerCompanyName: {
    label: "Customer Company Name",
    name: "customerCompanyName",
    validationMessage: "Customer Company Name is required",
  },
} as const;
