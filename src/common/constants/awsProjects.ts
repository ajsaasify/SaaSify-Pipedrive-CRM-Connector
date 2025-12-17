export enum LabelMatch {
  ParentOpportunityId = "Parent Opportunity ID",
  Marketing = "Marketing",
  SolutionsOffered = "Solutions Offered",
  DeliveryModel = "Delivery Model",
  AwsProducts = "AWS Products",
  AwsRevenue = "Estimated AWS Monthly Recurring Revenue",
  PartnerProjectTitle = "Partner Project Title",
  MarketingActivityUse = "Marketing Activities Use Case",
  MarketingActivityChannel = "Marketing Activity Channel",
  SalesActivities = "Sales Activities",
  apnProgram = "APN Program",
  PrimaryNeed = "Partner Primary Need from AWS",
}
export type TagVarient =
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "secondary"
  | "contrast"
  | null
  | undefined;
  
export const labelTagConfig: {
  match: LabelMatch;
  variant: TagVarient;
  separator: string;
}[] = [
  {
    match: LabelMatch.MarketingActivityUse,
    variant: "warning",
    separator: "; ",
  },
  {
    match: LabelMatch.SalesActivities,
    variant: "secondary",
    separator: "; ",
  },
  { match: LabelMatch.PrimaryNeed, variant: "info", separator: "; " },
  { match: LabelMatch.SolutionsOffered, variant: "info", separator: ", " },
  { match: LabelMatch.apnProgram, variant: "warning", separator: "; " },
  { match: LabelMatch.DeliveryModel, variant: "secondary", separator: "; " },
  { match: LabelMatch.AwsProducts, variant: "warning", separator: "; " },
  {
    match: LabelMatch.MarketingActivityChannel,
    variant: "success",
    separator: "; ",
  },
];

export const singleTagLabels = [];
