import { requestPayload } from ".";
import { DefaultView } from "../../enum/view.enum";

export const viewLabels: Record<string, string> = {
  privateOffers: "Private offers",
  cosell: "Co-sells",
};
export const views = [DefaultView.PRIVATE_OFFER, DefaultView.COSELL];

export const viewAll = [
  { label: "All Co-sells", value: requestPayload.defaultView },
  { label: "AWS Co-sells", value: requestPayload.cloud.aws },
  { label: "Microsoft Co-sells", value: requestPayload.cloud.amp },
  { label: "Google Co-sells", value: requestPayload.cloud.gcp },
];
export const viewAllPrivate = [
  { label: "All Private Offers", value: requestPayload.defaultView },
  { label: "AWS Private Offers", value: requestPayload.cloud.aws },
  { label: "Microsoft Private Offers", value: requestPayload.cloud.amp },
  { label: "Google Private Offers", value: requestPayload.cloud.gcp },
];
