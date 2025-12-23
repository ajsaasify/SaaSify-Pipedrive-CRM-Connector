"use client";
import { CoSellItem } from "@template/types/api/getListCosellAssociateCrm.t";
import { useEffect, useRef, useState } from "react";
import PDAdvancedTable from "../ui-components/PipedriveTable";
import { PDColumnConfig } from "@template/types/pipedrive-table-interface";
import { DataTablePageEvent } from "primereact/datatable";
import initSdk from "@template/helpers/modelInit";
import { cosellTableColumns } from "./helper";
import { getCosellsAPI } from "./apiHandler";
import { useRouter } from "next/router";
import { useCoSellContext } from "@template/context/Cosell.context";
import { ModelType } from "@template/enum/pipedrive.enum";
import { useTranslation } from "react-i18next";
import { EmptyState } from "../ui-components/empty-data";
import { Menu } from "primereact/menu";

export const CosellList = () => {
  // const params = new URLSearchParams(window.location.search);
  // const [dealId, selectedDealId] = useState("");
  const [cosells, setCosells] = useState<CoSellItem[]>([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentCosell, setCurrentCosell] = useState<CoSellItem | null>(null);
  const menuRef = useRef<Menu>(null!);
  const { t } = useTranslation();
  const columns = cosellTableColumns({
    t,
    menuRef,
    setCurrentCosell,
  });
  const [sdk, setSdk] = useState<any>();
  const { setCurrentPage } = useCoSellContext();

  useEffect(() => {
    const sdk = initSdk(window.outerWidth, window.outerHeight);
    setSdk(sdk);
    getCosellsAPI(rows, first, setLoading, setCosells, setTotalRecords);
  }, [window]);

  useEffect(() => {
    getCosellsAPI(rows, first, setLoading, setCosells, setTotalRecords);
  }, [rows, first]);

  const onPageChange = (e: DataTablePageEvent) => {
    if (e?.first !== first) setFirst(e?.first || 0);
    if (e?.rows !== rows) setRows(e?.rows || 10);
  };
  return (
    <div className="md:w-full lg:max-w-full p-4 overflow-auto">
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
      <div className="max-w-[calc(100vw-80px)] overflow-auto">
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
