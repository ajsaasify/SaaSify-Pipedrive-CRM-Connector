import PDButton from "@template/component/ui-components/pipedriveButton";
import { PDButtonSize } from "@template/enum/pipedrive.enum";
import SaasifyService from "@template/services/saasify.service";
import React, { useEffect } from "react";
import { ModelType } from "@template/enum/pipedrive.enum";
import CosellModelPage from "../cosell-detail";
import AppExtensionsSDK, { Command } from "@pipedrive/app-extensions-sdk";
import { CosellList } from "@template/component/cosell-list";
import { useCoSellContext } from "@template/context/Cosell.context";
import CosellDetailView from "@template/component/cosell-detail";
import { CreateCosell } from "@template/component/create-cosell";
import pipeDriveParams from "@template/utils/pipedrive-params";
import CloudProvider from "@template/component/cloud-provider";

const getCosells = async () => {
  // fetch cosells data
  const service = new SaasifyService();
  const res = await service.getCosellById("auto", "51015859874");
  return res;
};

const CosellsPage = () => {
  const { currentPage, setCurrentPage } = useCoSellContext();
  const params = pipeDriveParams();
  React.useEffect(() => {
    if (params?.data?.page && currentPage !== params?.data?.page)
      setCurrentPage(() => {
        return { page: params?.data?.page };
      });
  }, []);
  return (
    <div className="flex justify-center w-full">
      {currentPage?.page === ModelType.COSELL_LIST && <CosellList />}
      {currentPage?.page === ModelType.COSELL_DETAIL && <CosellDetailView />}
      {currentPage?.page === ModelType.COSELL_CREATE && <CreateCosell />}
      {currentPage?.page === ModelType.COSELL_CLOUD_PROVIDER && (
        <CloudProvider />
      )}
    </div>
  );
};

export default CosellsPage;
