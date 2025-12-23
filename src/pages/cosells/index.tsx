// React
import { useEffect } from "react";

// Enums
import { ModelType } from "@template/enum/pipedrive.enum";
import { LocalStorage } from "@template/enum/service.enum";

// Services
import SaasifyService from "@template/services/saasify.service";

// Context
import { useCoSellContext } from "@template/context/Cosell.context";

// Utils
import pipeDriveParams from "@template/utils/pipedrive-params";
import { storage } from "@template/utils/storage";

// Components
import { CosellList } from "@template/component/cosell-list";
import CosellDetailView from "@template/component/cosell-detail";
import { CreateCosell } from "@template/component/upsert-cosell";
import CloudProvider from "@template/component/cloud-provider";

const _getCosells = async () => {
  // fetch cosells data
  const service = new SaasifyService();
  const res = await service.getCosellById("auto", "51015859874");
  return res;
};

const CosellsPage = () => {
  const params = pipeDriveParams();
  const { currentPage, setCurrentPage } = useCoSellContext();

  useEffect(() => {
    if (params?.token) {
      storage.set(LocalStorage.TOKEN, params?.token);
    }
  }, []);

  useEffect(() => {
    if (params?.data?.page && currentPage !== params?.data?.page)
      setCurrentPage({ page: params?.data?.page });
  }, [params?.data?.page]);

  return (
    <div className="flex justify-center w-full">
      {currentPage?.page === ModelType.COSELL_LIST && (
        <CosellList page={params?.data?.page} />
      )}
      {currentPage?.page === ModelType.COSELL_DETAIL && <CosellDetailView />}
      {currentPage?.page === ModelType.COSELL_CREATE && <CreateCosell />}
      {currentPage?.page === ModelType.COSELL_CLOUD_PROVIDER && (
        <CloudProvider />
      )}
    </div>
  );
};

export default CosellsPage;
