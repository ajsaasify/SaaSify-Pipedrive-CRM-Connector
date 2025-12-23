import React, { useState, useEffect } from "react";
import {
  DataTable,
  DataTableFilterMeta,
  DataTablePageEvent,
  DataTableSortEvent,
} from "primereact/datatable";
import { Column, ColumnFilterElementTemplateOptions } from "primereact/column";
import { FilterMatchMode, FilterOperator } from "primereact/api";

import { InputNumber } from "primereact/inputnumber";
import { Slider } from "primereact/slider";
import { TriStateCheckbox } from "primereact/tristatecheckbox";

import PDButton from "./pipedriveButton";
import Input from "./PipedriveInput";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";

import {
  FilterType,
  PDAdvancedTableProps,
  PDColumnConfig,
} from "@template/types/pipedrive-table-interface";
import {
  PDButtonType,
  PDButtonSize,
  PDTextSize,
} from "@template/enum/pipedrive.enum";
import PDSelectField from "./PipedriveDropdown";
import PDDatePicker from "./PipedriveCalendar";
import { MultiSelectField } from "./PipedriveMultiselect";
import PDText from "./pipedrive-text";
import { Skeleton } from "primereact/skeleton";
import { useCoSellContext } from "@template/context/Cosell.context";

const PDAdvancedTable: React.FC<PDAdvancedTableProps> = ({
  data,
  columns,
  loading = false,

  totalRecords = 0,
  rows = 10,
  first = 0,

  backendPagination = false,
  onPageChange,

  backendSorting = false,
  onSortChange,

  backendFiltering = false,
  onFilterChange,

  enableGlobalFilter = false,
  globalFilterFields = [],
  emptyMessage,
  showPaginator = true,
}) => {
  const [filters, setFilters] = useState<DataTableFilterMeta>({});
  const [globalValue, setGlobalValue] = useState("");
  const [localFirst, setLocalFirst] = useState(first);
  const [localRows, setLocalRows] = useState(rows);
  const { setData, dealName, setDealName, setFormValues } = useCoSellContext();

  /* ------------------------------------
    INIT FILTERS 
-------------------------------------*/
  useEffect(() => {
    const defaultFilters: DataTableFilterMeta = {
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    };

    columns.forEach((col) => {
      if (!col.filterType) return;

      const key = col.filterField || col.field;

      switch (col.filterType) {
        /** TEXT */
        case FilterType.TEXT:
          defaultFilters[key] = {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
          };
          break;

        /** NUMBER */
        case FilterType.NUMBER:
          defaultFilters[key] = {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
          };
          break;

        /** NUMBER RANGE */
        case FilterType.NUMBER_RANGE:
          defaultFilters[key] = {
            value: null,
            matchMode: FilterMatchMode.BETWEEN,
          };
          break;

        /** DATE (single) */
        case FilterType.DATE:
        case FilterType.CALENDAR:
          defaultFilters[key] = {
            value: null,
            matchMode: FilterMatchMode.DATE_IS,
          };
          break;

        /** DATE RANGE */
        case FilterType.DATE_RANGE:
          defaultFilters[key] = {
            value: null,
            matchMode: FilterMatchMode.BETWEEN, // <-- FIXED
          };
          break;

        /** DROPDOWN | MULTISELECT | BOOLEAN */
        case FilterType.DROPDOWN:
        case FilterType.MULTISELECT:
        case FilterType.BOOLEAN:
          defaultFilters[key] = {
            value: null,
            matchMode: FilterMatchMode.EQUALS,
          };
          break;

        /** CUSTOM */
        case FilterType.CUSTOM:
          break;

        default:
          break;
      }
    });

    setFilters(defaultFilters);
  }, [columns]);

  /* ------------------------------------
       GLOBAL FILTER HANDLER
  -------------------------------------*/
  const onGlobalChange = (val: string) => {
    let updated = { ...filters };
    // ensure 'global' has a 'value' property without causing a TS error
    updated.global = { ...(updated.global as any), value: val };
    setFilters(updated);
    setGlobalValue(val);
  };

  /* ------------------------------------
        FILTER ELEMENT TEMPLATES
  -------------------------------------*/
  const getFilterTemplate = (col: PDColumnConfig) => {
    return (options: ColumnFilterElementTemplateOptions) => {
      switch (col.filterType) {
        case FilterType.TEXT:
          return (
            <Input
              value={options.value || ""}
              onChange={(e) => options.filterCallback(e)}
              placeholder={col.filterPlaceholder || "Search"}
            />
          );

        case FilterType.DROPDOWN:
          return (
            <PDSelectField
              value={options.value}
              options={col.options || []}
              label="label"
              onChange={(e) => options.filterCallback(e)}
              placeholder={col.filterPlaceholder}
              showClear
            />
          );

        case FilterType.MULTISELECT:
          return (
            <MultiSelectField
              value={options.value}
              options={col.options || []}
              label="label"
              onChange={(e) => options.filterCallback(e)}
              placeholder={col.filterPlaceholder}
            />
          );

        case FilterType.CALENDAR:
          return (
            <PDDatePicker
              value={options.value}
              onChange={(e) => options.filterCallback(e)}
              dateFormat="mm/dd/yy"
              placeholder={col.filterPlaceholder}
            />
          );
        case FilterType.DATE_RANGE:
          return (
            <PDDatePicker
              value={options.value}
              onChange={(e) => options.filterCallback(e)}
              dateFormat="mm/dd/yy"
              placeholder={col.filterPlaceholder || "Select date range"}
              selectionMode="range"
            />
          );
        case FilterType.NUMBER:
          return (
            <InputNumber
              value={options.value}
              onChange={(e) => options.filterCallback(e.value)}
              placeholder={col.filterPlaceholder}
            />
          );

        case FilterType.NUMBER_RANGE:
          return (
            <>
              <PDText
                size={PDTextSize.XS}
                className="flex mb-1 w-full justify-center"
              >
                {options.value?.[0]} - {options.value?.[1]}
              </PDText>
              <Slider
                value={options.value}
                onChange={(e) => options.filterCallback(e.value)}
                range
                min={10000}
                max={100000}
                className="mt-5"
              />
            </>
          );

        case Boolean.name:
          return (
            <TriStateCheckbox
              value={options.value}
              onChange={(e) => options.filterCallback(e.value)}
            />
          );

        case "custom":
          return col.filterElement!(options);

        default:
          return null;
      }
    };
  };

  /* ------------------------------------
         TABLE HEADER
  -------------------------------------*/
  const header = enableGlobalFilter ? (
    <div className="flex justify-between items-center">
      <PDButton
        className="h-8"
        label="Clear"
        size={PDButtonSize.TINY}
        type={PDButtonType.GHOST}
        onClick={() => onGlobalChange("")}
      />

      <IconField iconPosition="right">
        <Input
          value={globalValue}
          onChange={(val) => onGlobalChange(val || "")}
          placeholder="Keyword Search"
        />
        <InputIcon className="pi pi-search" />
      </IconField>
    </div>
  ) : null;

  const skeletonRows = Array.from({ length: rows || 10 }).map((_, i) => ({
    id: `skeleton-${i}`,
  }));

  return (
    <div className="card">
      <DataTable
        value={loading ? skeletonRows : data}
        // loading={loading}
        header={header}
        // header={ActionBar}
        showGridlines
        dataKey="id"
        className="pd-table"
        scrollable
        scrollHeight="400px"
        paginator={showPaginator}
        lazy={backendPagination}
        first={backendPagination ? first : localFirst}
        rows={backendPagination ? rows : localRows}
        totalRecords={totalRecords}
        onPage={(e) => {
          if (backendPagination) {
            onPageChange?.(e); // backend → fire API callback
          } else {
            // frontend pagination → update internal state
            setLocalFirst(e.first);
            setLocalRows(e.rows);
          }
        }}
        /** SORTING */
        onSort={(e) => backendSorting && onSortChange?.(e)}
        /** FILTERING */
        filters={filters}
        onFilter={(e) => {
          if (backendFiltering) {
            onFilterChange?.(e.filters); // send filters to API caller
          } else {
            setFilters(e.filters); // normal local filtering
          }
        }}
        globalFilterFields={globalFilterFields}
        emptyMessage={emptyMessage}
      >
        {/* {columns.map((col, index) => (
          <Column
            key={col?.field + index}
            field={!col?.body ? col?.field || "N/A" : undefined}
            header={col.header}
            body={(rowData) =>
              loading ? (
                <Skeleton width="100%" height="1.2rem" />
              ) : col.body ? (
                col.body(rowData)
              ) : (
                rowData[col?.field] || "N/A"
              )
            }
            sortable={col.sortable ?? false}
            style={{ width: col.width || "auto" }}
            filter={!!col.filterType}
            filterField={col.filterField || col.field}
            filterElement={col.filterType ? getFilterTemplate(col) : undefined}
            showFilterMatchModes={false}
          />
        ))} */}
        {columns.map((col, index) => {
          const isFirstColumn = index === 0;
          const isLastColumn = index === columns.length - 1;

          return (
            <Column
              key={col?.field + index}
              field={!col?.body ? col?.field || "N/A" : undefined}
              header={col.header}
              body={(rowData) =>
                loading ? (
                  <Skeleton width="100%" height="1.2rem" />
                ) : col.body ? (
                  col.body(rowData)
                ) : (
                  rowData[col?.field] || "N/A"
                )
              }
              sortable={col.sortable ?? false}
              style={{ width: col.width || "200px" }}
              filter={!!col.filterType}
              filterField={col.filterField || col.field}
              filterElement={
                col.filterType ? getFilterTemplate(col) : undefined
              }
              showFilterMatchModes={false}
              frozen={isFirstColumn || isLastColumn}
              alignFrozen={isLastColumn ? "right" : undefined}
            />
          );
        })}
      </DataTable>
    </div>
  );
};

export default PDAdvancedTable;
