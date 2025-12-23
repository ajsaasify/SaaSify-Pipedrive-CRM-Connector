"use client";

// React
import { useEffect, useRef, useState } from "react";

// i18n
import { useTranslation } from "react-i18next";

// PrimeReact
import type { DataTablePageEvent } from "primereact/datatable";
import { Menu } from "primereact/menu";

// Types
import type { CoSellItem } from "@template/types/api/getListCosellAssociateCrm.t";

// Enums
import { ModelType } from "@template/enum/pipedrive.enum";

// Context
import { useCoSellContext } from "@template/context/Cosell.context";

// Helpers
import initSdk from "@template/helpers/modelInit";
import pipeDriveParams from "@template/utils/pipedrive-params";
import { cosellTableColumns } from "./helper";

// API
import { getCosellsAPI } from "./apiHandler";

// Components
import PDAdvancedTable from "../ui-components/PipedriveTable";
import { EmptyState } from "../ui-components/empty-data";

export const CosellList = ({ page }: { page: string }) => {
  // i18n
  const { t } = useTranslation();

  // Context
  const { cosells, setCosells, setCurrentPage } = useCoSellContext();

  // Params
  const params = pipeDriveParams();

  // State
  const [currentCosell, setCurrentCosell] = useState<CoSellItem | null>(null);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(50);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [_sdk, setSdk] = useState<any>();

  // Refs
  const menuRef = useRef<Menu>(null!);

  // Derived
  const columns = cosellTableColumns({
    t,
    menuRef,
    setCurrentCosell,
  });

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
      ) : null}
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
