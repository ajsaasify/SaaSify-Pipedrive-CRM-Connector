// import { useState, useMemo, useEffect } from "react";
// import { RC3CosellResponse } from "../../../types/cosellResponse";
// import { requestPayload } from "../../../common/listCosell";
// import { trimString, validateDealName } from "../../../utils/globalHelper";
// import { labelMapper } from "./helper";
// // import { getCosellByCrmId, postCloneCosell } from "./apiHandler";
// // import { cloneCosellGetterBuilder, editClonedCosellGetter } from "./builder";
// import { ModalId } from "@template/enum/modal.enum";
// import { isFieldTooLong } from "@template/component/upsert-cosell/validation";

// interface UseCloneCosellStateProps {
//   opportunityList: RC3CosellResponse[];
//   context: any;
//   actions: any;
//   setOpportunityList: React.Dispatch<React.SetStateAction<RC3CosellResponse[]>>;
//   setGenerateCosell: React.Dispatch<React.SetStateAction<Record<string, any>>>;
//   setEditCloneEnabled: React.Dispatch<React.SetStateAction<boolean>>;
//   cosell: RC3CosellResponse;
//   dealName: string;
// }

// export const useCloneCosellState = ({
//   opportunityList,
//   context,
//   actions,
//   setOpportunityList,
//   cosell,
//   setEditCloneEnabled,
//   setGenerateCosell,
//   dealName,
// }: UseCloneCosellStateProps) => {
//   const [fetchCosellList, setFetchCosellList] = useState(false);
//   const [cosellListByCrmId, setCosellListByCrmId] = useState<
//     RC3CosellResponse[]
//   >([]);
//   const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
//   const [errors, setErrors] = useState<Record<string, any>>({});
//   const [isFetching, setIsFetching] = useState(false);
//   const [formValue, setFormValue] = useState<Record<string, any>>({});

//   const isSaaSifyDeal = useMemo(
//     () => validateDealName(dealName, requestPayload.defaultDeals),
//     [dealName]
//   );

//   const triggerAlert = (alert: {
//     type: string;
//     message: string;
//     title: string;
//   }) => {
//     actions.addAlert(alert);
//   };

//   const awsOpportunityTitles = useMemo(
//     () =>
//       opportunityList
//         ?.filter((c) => c?.CloudProvider === requestPayload.cloud.aws)
//         ?.map((c) => c.OpportunityName) ?? [],
//     [opportunityList]
//   );

//   useEffect(() => {
//     const list = isSaaSifyDeal ? cosellListByCrmId : opportunityList;
//     setFormValue(cloneCosellGetterBuilder(cosell, list));
//   }, [cosell, opportunityList, cosellListByCrmId, isSaaSifyDeal]);

//   const validateForm = (value?: string): boolean => {
//     const enteredTitle = trimString(value ?? formValue?.partnerProjectTitle);
//     const { Title = "" } = cosell?.CoSellEntity?.Project ?? {};
//     const newErrors: Record<string, any> = {};

//     if (!enteredTitle) {
//       newErrors.partnerProjectTitle = labelMapper.partnerProjectTitle.required;
//     } else if (isFieldTooLong(enteredTitle, 255)) {
//       newErrors.partnerProjectTitle = labelMapper.partnerProjectTitle.maxLength;
//     } else if (
//       (awsOpportunityTitles.includes(enteredTitle) && !isSaaSifyDeal) ||
//       enteredTitle === Title
//     ) {
//       newErrors.partnerProjectTitle = labelMapper.partnerProjectTitle.duplicate;
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const onChangeValue = (name: string, value: string) => {
//     setFormValue((prev) => ({ ...prev, [name]: value }));
//     if (name === labelMapper.partnerProjectTitle.name) validateForm(value);
//   };

//   const onOpenUpdateProjectTitle = async () => {
//     setFetchCosellList(true);
//     setEditCloneEnabled(false);
//     setErrors({});

//     if (isSaaSifyDeal) {
//       await getCosellByCrmId(
//         cosell,
//         setCosellListByCrmId,
//         setFetchCosellList,
//         triggerAlert,
//         context
//       );
//     }
//     setFetchCosellList(false);
//   };

//   const onSubmit = async (fromEdit: boolean = false) => {
//     if (!fromEdit && !validateForm()) return;

//     await postCloneCosell(
//       context,
//       setIsFetching,
//       triggerAlert,
//       opportunityList,
//       setOpportunityList,
//       cosell,
//       formValue,
//       actions,
//       {}
//     );
//   };

//   const getValidationMessage = (fieldName: string) => errors[fieldName] || "";

//   const triggerEditCosell = () => {
//     setGenerateCosell(editClonedCosellGetter(formValue, cosell));
//     setIsEditPopupOpen(true);
//     setTimeout(() => setIsEditPopupOpen(false), 1000);
//     setTimeout(() => actions.closeOverlay(ModalId.CLONE_COSELL), 3000);
//   };

//   const isDisabled = useMemo(() => {
//     return (
//       isFetching ||
//       fetchCosellList ||
//       cosell?.DealType !== requestPayload.dealType.po
//     );
//   }, [cosell, isFetching, fetchCosellList]);
//   return {
//     formValue,
//     errors,
//     onChangeValue,
//     onSubmit,
//     isFetching,
//     getValidationMessage,
//     onOpenUpdateProjectTitle,
//     validateForm,
//     isEditPopupOpen,
//     triggerEditCosell,
//     fetchCosellList,
//     isDisabled,
//   };
// };
// function cloneCosellGetterBuilder(
//   cosell: RC3CosellResponse,
//   list: RC3CosellResponse[]
// ): import("react").SetStateAction<Record<string, any>> {
//   throw new Error("Function not implemented.");
// }
