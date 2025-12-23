// // utils/actionStateResolver.ts
// import { ActionState } from "@template/component/actions/ActionBar";
// import { RC3CosellResponse } from "@template/types/cosellResponse";

// type ResolverParams = {
//   data?: RC3CosellResponse;
//   partnerType?: string;
//   isLoading?: boolean;
// };

// export const resolveActionState = ({
//   data,
//   partnerType,
//   isLoading,
// }: ResolverParams): ActionState => {
//   const isDraft = data?.stage === "DRAFT";
//   const isLinked = Boolean(data?.crmId);

//   return {
//     associate: {
//       visible: !isLinked,
//       disabled: isLoading || !data,
//     },

//     linkCrm: {
//       visible: !isLinked,
//       disabled: isLoading || !data,
//     },

//     update: {
//       visible: true,
//       disabled: isLoading || isDraft,
//     },

//     changeStage: {
//       visible: isLinked,
//       disabled: isLoading,
//     },

//     transferOwner: {
//       visible: partnerType === "SELLER",
//       disabled: isLoading,
//     },

//     nextStep: {
//       visible: isLinked,
//       disabled: isLoading,
//     },

//     editCosell: {
//       visible: true,
//       disabled: isLoading,
//     },

//     reset: {
//       visible: true,
//       disabled: isLoading,
//     },
//   };
// };
