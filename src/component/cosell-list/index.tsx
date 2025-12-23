"use client";
import type { CoSellItem } from "@template/types/api/getListCosellAssociateCrm.t";
import { useEffect, useRef, useState } from "react";
import PDAdvancedTable from "../ui-components/PipedriveTable";
import type { DataTablePageEvent } from "primereact/datatable";
import initSdk from "@template/helpers/modelInit";
import { cosellTableColumns } from "./helper";
import { getCosellsAPI } from "./apiHandler";
import { useCoSellContext } from "@template/context/Cosell.context";
import { ModelType } from "@template/enum/pipedrive.enum";
import { useTranslation } from "react-i18next";
import { EmptyState } from "../ui-components/empty-data";
import { Menu } from "primereact/menu";
import { Paginator } from "primereact/paginator";

export const CosellList = () => {
  // const params = new URLSearchParams(window.location.search);
  // const [dealId, selectedDealId] = useState("");
  const [cosells, setCosells] = useState<CoSellItem[]>([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(50);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentCosell, setCurrentCosell] = useState<CoSellItem | null>(null);
  // biome-ignore lint/style/noNonNullAssertion: Required for RefObject typing
  const menuRef = useRef<Menu>(null!);
  const { t } = useTranslation();
  const columns = cosellTableColumns({
    t,
    menuRef,
    setCurrentCosell,
  });
  const [_sdk, setSdk] = useState<any>();
  const { setCurrentPage } = useCoSellContext();

  useEffect(() => {
    const updateSdkSize = () => {
      const width = window.outerWidth - 100;
      const height = window.outerHeight - 180;

      const sdkInstance = initSdk(width, height);
      setSdk(sdkInstance);
    };

    updateSdkSize(); // initial load
    window.addEventListener("resize", updateSdkSize);

    getCosellsAPI(rows, first, setLoading, setCosells, setTotalRecords);

    return () => {
      window.removeEventListener("resize", updateSdkSize);
    };
  }, [rows, first]);

  useEffect(() => {
    getCosellsAPI(rows, first, setLoading, setCosells, setTotalRecords);
  }, [rows, first]);

  const onPageChange = (e: DataTablePageEvent) => {
    if (e?.first !== first) setFirst(e?.first || 0);
    if (e?.rows !== rows) setRows(e?.rows || 10);
  };

  return (
    <div className="md:w-full lg:max-w-full p-4 overflow-auto">
      {!["Pending", "Rejected", "Expired"]?.includes(
        currentCosell?.CloudProviderStatus ?? ""
      ) ? (
        <Menu
          model={[
            {
              label: "Edit",
              command: () => {
                setCurrentPage({
                  page: ModelType.COSELL_CREATE,
                  params: {
                    referenceId: currentCosell?.ReferenceID || "",
                    sellerCode: currentCosell?.SellerCode || "",
                  },
                });
              },
            },

            {
              label: "View",
              command: () => {
                setCurrentPage({
                  page: ModelType.COSELL_DETAIL,
                  params: {
                    referenceId: currentCosell?.ReferenceID || "",
                    sellerCode: currentCosell?.SellerCode || "",
                  },
                });
              },
            },
          ]}
          popup
          ref={menuRef}
        />
      ) : (
        <></>
      )}
      <div className="custom_table">
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
    </div>
  );
};
