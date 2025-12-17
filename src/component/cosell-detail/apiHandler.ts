import SaasifyService from "@template/services/saasify.service";
import { RC3CosellResponse } from "@template/types/cosellResponse";
import { Dispatch, SetStateAction } from "react";

export const getSingleCosell = async (payload: {
  sellerId: string;
  opportunityId: string;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setData: React.Dispatch<React.SetStateAction<RC3CosellResponse>>;
}) => {
  try {
    payload.setLoading(true);
    const saasify = new SaasifyService();
    const cosellDetail: { Data: RC3CosellResponse } =
      await saasify.getCosellById(payload?.sellerId, payload?.opportunityId);
    const cosellEntity =
      typeof cosellDetail.Data.CoSellEntity === "string"
        ? JSON.parse(cosellDetail.Data.CoSellEntity)
        : cosellDetail.Data.CoSellEntity;
    cosellDetail.Data.CoSellEntity = cosellEntity;
    payload.setData(cosellDetail?.Data);
  } catch (e) {
    console.error("Cosell not loading:", e);
  } finally {
    payload.setLoading(false);
  }
};
