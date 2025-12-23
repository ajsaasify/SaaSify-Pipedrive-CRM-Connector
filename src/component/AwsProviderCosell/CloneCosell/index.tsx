// import React from "react";
// import { Dialog } from "primereact/dialog";
// import { Button } from "primereact/button";
// import { useCloneCosellState } from "./useFormState";
// import { useCoSellContext } from "../../../context/Cosell.context";
// import { ModalId, ModalWidth, ModalTitle } from "@template/enum/modal.enum";
// import { ActionButton, FormButton } from "@template/enum/button.enum";
// import Input from "@template/component/ui-components/PipedriveInput";
// import { labelMapper } from "./helper";

// export interface CloneCosellProps {
//   modalTitle: string;
//   actions?: any;
//   context?: any;
// }

// const CloneCosell: React.FC<CloneCosellProps> = ({
//   modalTitle,
//   actions,
//   context,
// }) => {
//   const {
//     data: cosell,
//     opportunityList,
//     setOpportunityList,
//     setGenerateCosell,
//     setEditCloneEnabled,
//     dealName,
//   } = useCoSellContext();

//   const {
//     formValue,
//     errors,
//     onChangeValue,
//     onSubmit,
//     isFetching,
//     getValidationMessage,
//     onOpenUpdateProjectTitle,
//     isEditPopupOpen,
//     validateForm,
//     triggerEditCosell,
//     fetchCosellList,
//     isDisabled,
//   } = useCloneCosellState({
//     opportunityList,
//     context,
//     actions,
//     setOpportunityList,
//     cosell,
//     setEditCloneEnabled,
//     setGenerateCosell,
//     dealName,
//   });

//   const footer = (
//     <div className="flex justify-end gap-2">
//       <Button
//         label={FormButton.CANCEL}
//         severity="secondary"
//         onClick={() => {
//           actions.closeOverlay(ModalId.CLONE_COSELL);
//           onOpenUpdateProjectTitle();
//         }}
//         disabled={isFetching || fetchCosellList}
//       />

//       <Button
//         label={ActionButton.EDIT}
//         loading={isEditPopupOpen}
//         disabled={fetchCosellList}
//         onClick={() => triggerEditCosell()}
//       />

//       <Button
//         label={FormButton.SUBMIT}
//         loading={isFetching}
//         disabled={isDisabled}
//         onClick={() => onSubmit()}
//       />
//     </div>
//   );

//   return (
//     <Dialog
//       header={modalTitle}
//       visible
//       style={{ width: ModalWidth.LARGE }}
//       modal
//       onShow={onOpenUpdateProjectTitle}
//       onHide={() => actions.closeOverlay(ModalId.CLONE_COSELL)}
//       footer={footer}
//     >
//       {fetchCosellList ? (
//         // <Loader />
//         <div>Loading</div>
//       ) : (
//         <>
//           <Input
//             value={formValue?.partnerProjectTitle}
//             name={labelMapper.partnerProjectTitle.name}
//             label={labelMapper.partnerProjectTitle.label}
//             tooltip={labelMapper.partnerProjectTitle.label}
//             placeholder={labelMapper.partnerProjectTitle.placeHolder}
//             error={
//               errors?.partnerProjectTitle
//                 ? getValidationMessage(labelMapper.partnerProjectTitle.name)
//                 : ""
//             }
//             onInput={(e) =>
//               onChangeValue(
//                 labelMapper.partnerProjectTitle.name,
//                 (e.target as HTMLInputElement).value
//               )
//             }
//             onChange={(value) =>
//               onChangeValue(labelMapper.customerCompanyName.name, value ?? "")
//             }
//           />

//           <Input
//             value={formValue?.crmUniqueIdentifier}
//             name={labelMapper.crmUniqueIdentifier.name}
//             label={labelMapper.crmUniqueIdentifier.label}
//             tooltip={labelMapper.crmUniqueIdentifier.label}
//             readOnly
//             onChange={() => {}}
//             onInput={(e) => {
//             }}
//           />
//         </>
//       )}

//       {/* Action Overlay preserved */}
//       {isEditPopupOpen && (
//         <div>Loading Edit Popup...</div>
//         // <ActionCosell
//         //   actions={actions}
//         //   slug={CosellAction.CLONE}
//         //   modalTitle={ModalTitle.ADD_COSELL}
//         //   context={context}
//         // />
//       )}
//     </Dialog>
//   );
// };

// export default CloneCosell;
