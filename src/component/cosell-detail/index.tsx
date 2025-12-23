import pipeDriveParams from "@template/utils/pipedrive-params";
import { useEffect, useMemo, useState } from "react";
import { getSingleCosell } from "./apiHandler";
import { useCoSellContext } from "@template/context/Cosell.context";
import { OverViewCard } from "../AwsProviderCosell/Overviews";
import initSdk from "@template/helpers/modelInit";
import ContactCard from "../AwsProviderCosell/Contacts";
import NextStepCard from "../AwsProviderCosell/NextSteps";
import { CustomerCard } from "../AwsProviderCosell/Customers";
import { ProjectCard } from "../AwsProviderCosell/Projects";
import { AdditionalCard } from "../AwsProviderCosell/AddionalDetails";
import { MarketPlaceCard } from "../AwsProviderCosell/Marketplaces";
import { CosellDetailHeader } from "./helper";
import ActionBar from "../actions/ActionBar";
import { DefaultView } from "@template/enum/view.enum";
import { cosellActionValidator } from "../AceCosell/ActionButtons/actionDisabilityRules";

const CosellDetailView = () => {
  const params = pipeDriveParams();
  const {
    setData,
    aceCosell,
    setAceCosell,
    partnerType,
    dealName,
    currentPage,
    setDealName,
    setFormValues,
    setCurrentPage,
    setIsSpecificLoading,
    isSpecificLoading,
  } = useCoSellContext();
  const [defaultView, setDefaultView] = useState(DefaultView.COSELL);
  const [refreshEnabled, setRefreshEnabled] = useState(false);

  const init = async () => {
    await getSingleCosell({
      sellerId: currentPage?.params?.sellerCode || "",
      opportunityId: currentPage?.params?.referenceId || "",
      setLoading: setIsSpecificLoading,
      setData,
    });
  };

  const cosellValidator = useMemo(
    () => cosellActionValidator(aceCosell),
    [aceCosell]
  );

  const isAssociateDisabled = cosellValidator.isAssociateDisabled();
  const isLinkCrmDisabled = cosellValidator.linkCrmDisable();
  const isUpdateDisabled = cosellValidator.updateDisable(partnerType);
  const isChangeStageDisabled = cosellValidator.changeStageDisable();
  const isTransferOwnerDisabled = cosellValidator.transferDisable();
  const isNextStepDisabled = cosellValidator.nextStepDisable();
  const isEditCosellDisabled = cosellValidator.editAceCosell();
  const isPending = cosellValidator.isPendingInvitation();
  const isResetEnable = cosellValidator.isResetEnable();

  const actionState = {
    associate: {
      visible: true,
      disabled: isAssociateDisabled,
    },
    linkCrm: {
      visible: true,
      disabled: isLinkCrmDisabled,
    },
    update: {
      visible: true,
      disabled: isUpdateDisabled,
    },
    changeStage: {
      visible: true,
      disabled: isChangeStageDisabled,
    },
    transferOwner: {
      visible: true,
      disabled: isTransferOwnerDisabled,
    },
    nextStep: {
      visible: true,
      disabled: isNextStepDisabled,
    },
    editCosell: {
      visible: !isPending,
      disabled: isEditCosellDisabled,
    },
    reset: {
      visible: isResetEnable,
      disabled: false,
    },
    clone: {
      visible: true,
      disabled: false,
    },
  };

  useEffect(() => {
    if (!currentPage?.params?.referenceId) return;
    initSdk(window.outerWidth, window.outerHeight);
    init();
  }, []);

  if (isSpecificLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-5">
        <h2>Co-sell Details</h2>
        <p>Loading...</p>
      </div>
    );
  } else {
    return (
      <div className="w-full">
        <CosellDetailHeader
          setCurrentPage={setCurrentPage}
          actionState={actionState}
        />
        <OverViewCard />
        <ContactCard />
        <NextStepCard />
        <CustomerCard />
        <ProjectCard />
        <AdditionalCard />
        <MarketPlaceCard />
        {/* <PartnerConnection /> */}
      </div>
    );
  }
};

export default CosellDetailView;
