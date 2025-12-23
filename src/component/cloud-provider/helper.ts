import { t } from "i18next";

export const labelMapper = {
  cloudProvider: "Cloud Provider",
  providers: [{ label: "ACE (APN Customer Engagements)", value: "AWS" }],
  provider: {
    name: "provider",
  },
  sellerCode: {
    label: t("awsCosell.inputLabelMapper.sellerCode.label"),
    placeHolder: t("awsCosell.inputLabelMapper.sellerCode.placeHolder"),
    name: "sellerCode",
    validationMessage:t("awsCosell.inputLabelMapper.sellerCode.validationMessage"),
  },
};
