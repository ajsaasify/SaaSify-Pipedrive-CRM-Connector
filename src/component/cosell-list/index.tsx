"use client";
import { CoSellItem } from "@template/types/api/getListCosellAssociateCrm.t";
import { useEffect, useState } from "react";
import PDAdvancedTable from "../ui-components/PipedriveTable";
import { PDColumnConfig } from "@template/types/pipedrive-table-interface";
import { DataTablePageEvent } from "primereact/datatable";
import initSdk from "@template/helpers/modelInit";
import { cosellTableColumns } from "./helper";
import { getCosellsAPI } from "./apiHandler";
import { useCoSellContext } from "@template/context/Cosell.context";
import { ModelType } from "@template/enum/pipedrive.enum";
import { useTranslation } from "react-i18next";
import { EmptyState } from "../ui-components/empty-data";
import ActionBar from "../actions/ActionBar";
import { DefaultView } from "@template/enum/view.enum";
import pipeDriveParams from "@template/utils/pipedrive-params";

export const CosellList = ({ page }: { page: string }) => {
  // const params = new URLSearchParams(window.location.search);
  // const [dealId, selectedDealId] = useState("");
  const params = pipeDriveParams();
  const [cosells, setCosells] = useState<CoSellItem[]>([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentCosell, setCurrentCosell] = useState<CoSellItem | null>(null);
  const columns: PDColumnConfig[] = cosellTableColumns(setCurrentCosell);
  const [sdk, setSdk] = useState<any>();
  const {
    setData,
    dealName,
    currentPage,
    setDealName,
    setFormValues,
    setCurrentPage,
  } = useCoSellContext();
  const [defaultView, setDefaultView] = useState(DefaultView.COSELL);
  const [filtersEnabled, setFiltersEnabled] = useState(false);
  const [refreshEnabled, setRefreshEnabled] = useState(false);
  // const isTab = useTab();

  useEffect(() => {
    console.log(params, "--params--", page);
    console.log(params, "--params--", page);
  }, [params, page, currentPage]);

  useEffect(() => {
    const sdk = initSdk(1000, 500);
    setSdk(sdk);
    getCosellsAPI(rows, first, setLoading, setCosells, setTotalRecords);
  }, []);

  useEffect(() => {
    console.log(refreshEnabled, "refreshEnabled");
    getCosellsAPI(rows, first, setLoading, setCosells, setTotalRecords);
  }, [rows, first, refreshEnabled]);

  function getCosellsAPIInital() {
    return getCosellsAPI(rows, first, setLoading, setCosells, setTotalRecords);
  }

  const onPageChange = (e: DataTablePageEvent) => {
    if (e?.first !== first) setFirst(e?.first || 0);
    if (e?.rows !== rows) setRows(e?.rows || 10);
  };
  useEffect(() => {
    if (currentCosell?.ReferenceID) {
      setCurrentPage({
        page: ModelType.COSELL_DETAIL,
        params: {
          referenceId: currentCosell?.ReferenceID,
          sellerCode: currentCosell?.SellerCode || "",
        },
      });
    }
  }, [currentCosell?.ReferenceID]);
  return (
    <div className="md:w-full md:max-w-[calc(100%-20px)] p-4 overflow-auto">
      <PDAdvancedTable
        first={first}
        rows={rows}
        totalRecords={totalRecords}
        backendFiltering={false}
        data={cosells}
        columns={columns}
        enableGlobalFilter={false}
        onPageChange={onPageChange}
        backendPagination={true}
        loading={loading}
        emptyMessage={EmptyState({ title: "Cosells not found" })}
      />
    </div>
  );
};
