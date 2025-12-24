import pipeDriveParams from "@template/utils/pipedrive-params";
import { useEffect, useMemo } from "react";
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
import { invitationEnable } from "../actions/Buttons/actionDisabilityRules";
import { InviationCard } from "../AwsProviderCosell/Invitations";

const CosellDetailView = () => {
  const _params = pipeDriveParams();
  const { setData, data } = useCoSellContext();
  const { currentPage, setCurrentPage, setIsSpecificLoading, isSpecificLoading } = useCoSellContext();
  const init = async () => {
    await getSingleCosell({
      sellerId: currentPage?.params?.sellerCode || "",
      opportunityId: currentPage?.params?.referenceId || "",
      setLoading: setIsSpecificLoading,
      setData,
    });
  };
  const statusInvitation = useMemo(() => {
    return invitationEnable(undefined, undefined, undefined, data);
  }, [data]);

  useEffect(() => {
    if (!currentPage?.params?.referenceId) return;
    initSdk(window.outerWidth, window.outerHeight);
    init();
  }, [currentPage?.params?.referenceId, currentPage?.params?.sellerCode, setData, setIsSpecificLoading]);
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
        <CosellDetailHeader setCurrentPage={setCurrentPage} />
        {statusInvitation ? (
          <InviationCard />
        ) : (
          <>
            <OverViewCard />
            <ContactCard />
            <NextStepCard />
            <CustomerCard />
            <ProjectCard />
            <AdditionalCard />
            <MarketPlaceCard />
          </>
        )}
        {/* <PartnerConnection /> */}
      </div>
    );
  }
};

export default CosellDetailView;
