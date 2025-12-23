export interface PaginatorProps {
  StartInd?: number;
  EndInd?: number;
  pageCount?: number;
  isPrevious?: boolean;
  isNext?: boolean;
}

export interface PaginationConfig {
  itemsPerPage?: number;
  initialPage?: number;
}

export interface PaginationResult<T> {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  currentPageItems: T[];
  startIndex: number;
  endIndex: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  resetPagination: () => void;
}