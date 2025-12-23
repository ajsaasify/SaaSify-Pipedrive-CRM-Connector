import type { ColumnFilterElementTemplateOptions } from "primereact/column";
import type {
  DataTableFilterMeta,
  DataTablePageEvent,
  DataTableSortEvent,
} from "primereact/datatable";

export enum FilterType {
  TEXT = "text",
  DROPDOWN = "dropdown",
  MULTISELECT = "multiselect",
  CALENDAR = "calendar",
  NUMBER = "number",
  BOOLEAN = "boolean",
  CUSTOM = "custom",
  DATE = "date",
  NUMBER_RANGE = "numberRange",
  DATE_RANGE = "dateRange",
}

export type PDColumnConfig = {
  field: string;
  header: string;
  width?: string;
  body?: (row: any) => React.ReactNode;
  sortable?: boolean;
  filterType?: FilterType;
  filterField?: string;
  options?: any[];
  filterPlaceholder?: string;
  filterElement?: (
    options: ColumnFilterElementTemplateOptions,
  ) => React.ReactNode;
  alignFrozen?: "left" | "right";
  frozen?: boolean;
};

export type PDAdvancedTableProps = {
  data: any[];
  columns: PDColumnConfig[];

  loading?: boolean;

  // Pagination
  totalRecords: number;
  rows: number;
  first: number;

  backendPagination?: boolean;
  onPageChange?: (event: DataTablePageEvent) => void;

  // Sorting
  backendSorting?: boolean;
  onSortChange?: (event: DataTableSortEvent) => void;

  backendFiltering?: boolean;
  onFilterChange?: (filters: DataTableFilterMeta) => void;

  // Filters
  enableGlobalFilter?: boolean;
  globalFilterFields?: string[];
  emptyMessage?: React.ReactNode;
  showPaginator?: boolean;
};
