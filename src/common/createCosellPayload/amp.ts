export const createGcpCosellTemplate = {
  SellerCode: null,
  CloudProvider: "AMP",
  CRMReferenceId: null,
  CoSellEntity: {
    CustomerDetails: {
      AddressLine1: null,
      AddressLine2: null,
      Name: null,
      City: null,
      State: null,
      PostalCode: null,
      Country: null,
      Duns: null,
    },
    CustomerContactDetails: {
      FirstName: null,
      LastName: null,
      PhoneNumber: null,
      Email: null,
    },
    DealDetails: {
      DealValue: null,
      CurrencyType: null,
      MarketingCampaignId: null,
      Name: null,
      Description: null,
      TargetCloseDate: null,
      CRMId: null,
      Location: null,
      CloudAssistance: {
        CanDealViewedBySeller: null,
        CloudAssistanceCode: null,
        NotesForCloudAssistance: null,
      },
      CustomerMarketplaceIntent: null,
      PartnerRole: null,
      SolutionArea: null,
      SolutionPlay: null,
    },
    PartnerDetails: {
      SalesTeam: [],
    },
    CloudProviderDetails: {
      IsConsentAccepted: null,
      MicrosoftSolutions: [],
      Status: "pending", //won or lost;
      Stage: "qualified",
      ClosingNote: "Test reason for closing",
      ClosingReason: "Customer did not have budget",
    },
  },
};
