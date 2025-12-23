export const privateOffersSectionName = {
  basicInfo: {
    title: "Private Offer Details",
    cppoTitle: "Authorization Details",
    tableHeader: {
      isvNotification: "ISV Notification Recipients",
      metaData: "Custom Metadata",
    },
  },
  ampList: {
    solutions: "Solutions",
    team: "Team Members",
    product: "Products",
    opportunity: "Opportunity Team",
    contactList: "Contact Detail",
  },
  cloudProvider: {
    title: "Cloud Provider Details",
    productDetails: "Product Details",
    tableHeader: {
      pDimension: "Product Dimensions",
      cppoDimension: "Units per dimension",
      cppoWholeSalePrice: "Wholesale Price",
      payment: "Payment Schedules",
      marketPlace: "Marketplace Metering Service dimensions",
      billing: "Billing Terms",
      pricingPerUsage: "Pricing Per Usage Dimension",
      cppoPricingUsage: "Additional Usage Costs",
      featureList: "Features List",
      installmentShedule: "Installment Schedule",
    },
    label: "Contract Total",
  },
  customer: {
    title: "Customer Details",
    resellerTitle: "Reseller Details",
    tableHeader: {
      email: "Customer Notification Recipients",
      resellerEmail: "Reseller Notification Recipients",
      column: ["Email"],
    },
  },
  subscription: {
    title: "Subscription Details",
    payout: "Payment details",
    tableHeader: {
      title: "Product Dimensions",
      columns: [
        { header: "Display Name", value: "name" },
        { header: "Quantity", value: "quantity" },
      ],
    },
  },
  purchaseAttribute: {
    title: "Purchase Attributes",
    tableHeader: {
      attribute: "Attribute",
      value: "Value",
    },
  },
  usage: {
    title: "Usage Details",
    report: "Report Usage",
  },
  provider: {
    cppo: "CPPO",
  },
};

export const defaultResponseText = {
  FPS: "Flexible payment schedule",
  CUC: "Contract Duration Contract usage(QTY)",
  STD: "Standard",
  MUSD: "Month Rate (USD)",
  UNITS: "units",
};
