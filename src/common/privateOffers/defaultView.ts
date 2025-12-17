import { PrivateOffersView } from "../../enum/view.enum";
import { DefaultViewProps } from "../../types/private-offers/defaultView";

export const views: DefaultViewProps[] = [
  PrivateOffersView.DETAILS,
  PrivateOffersView.SUBSCRIPTION,
  PrivateOffersView.USAGE,
  PrivateOffersView.ACTIVITY,
];

export const viewLabels: Record<DefaultViewProps, string> = {
  details: "Details",
  subscription: "Subscription",
  usage: "Usage",
  activity: "Activity"
};
