import type { RC3CosellResponse } from "../../types/cosellResponse";
import { displayDate, getValue } from "../../utils/globalHelper";
import { awsConstants } from "../constants/awsCosellFieldMappings";

export const marketplaceSectionData = (data: RC3CosellResponse) => {
  const { MarketplaceOffer } =
    data?.CoSellEntity?.MarketplaceTransactions?.[0] || {};
  return [
    [
      {
        label: awsConstants.marketplace.offerId,
        value: getValue(MarketplaceOffer?.OfferID),
      },
      {
        label: awsConstants.marketplace.offerName,
        value: getValue(MarketplaceOffer?.OfferName),
      },
    ],
    [
      {
        label: awsConstants.marketplace.offerCreatedDate,
        value: displayDate(MarketplaceOffer?.OfferCreatedDate),
      },
      {
        label: awsConstants.marketplace.offerExpiryDate,
        value: displayDate(MarketplaceOffer?.OfferExpiryDate),
      },
    ],
  ];
};
