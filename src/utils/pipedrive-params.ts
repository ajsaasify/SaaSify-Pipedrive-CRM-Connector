import type { Dispatch, SetStateAction } from "react";

export interface pipedriveParams {
  companyId: string;
  id: string;
  resource: string;
  selectedIds: string;
  theme: string;
  token: string;
  userId: string;
  view: string;
  referenceId: string;
  sellerId: string;
  data: Record<string, any>;
  [key: string]: any;
}

const pipeDriveParams = (
  setParams?: Dispatch<SetStateAction<pipedriveParams | undefined>>,
) => {
  if (typeof window === "undefined") return;

  try {
    const search = window.location.search;
    const sp = new URLSearchParams(search);
    const searchParams = Object.fromEntries(
      sp.entries(),
    ) as unknown as pipedriveParams;
    if (typeof searchParams?.data === "string") {
      searchParams.data = JSON.parse(searchParams?.data || "");
    }
    setParams?.(searchParams);
    return searchParams;
  } catch (err) {
    console.warn("Cannot access parent URL (maybe cross-domain)", err);
  }
};
export default pipeDriveParams;
