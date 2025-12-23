import SaasifyService from "@template/services/saasify.service";
import  { useEffect } from "react";
import { ModelType } from "@template/enum/pipedrive.enum";
import { CosellList } from "@template/component/cosell-list";
import { useCoSellContext } from "@template/context/Cosell.context";
import CosellDetailView from "@template/component/cosell-detail";
import { CreateCosell } from "@template/component/upsert-cosell";
import pipeDriveParams from "@template/utils/pipedrive-params";
import CloudProvider from "@template/component/cloud-provider";
import { storage } from "@template/utils/storage";

const _getCosells = async () => {
  // fetch cosells data
  const service = new SaasifyService();
  const res = await service.getCosellById("auto", "51015859874");
  return res;
};

const CosellsPage = () => {
  const { currentPage, setCurrentPage } = useCoSellContext();
  const params = pipeDriveParams();
  useEffect(()=>{
    if(params?.token){
      storage.set("authToken",params?.token)
    }
  },[])
  useEffect(() => {
    if (params?.data?.page && currentPage !== params?.data?.page)
      setCurrentPage({ page: params?.data?.page });
  }, [params?.data?.page]);
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
