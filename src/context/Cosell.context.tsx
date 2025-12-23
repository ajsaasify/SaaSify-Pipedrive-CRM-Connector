import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { OptionTypes } from "@template/types/dropdown.options";
import type { RC3CosellResponse } from "@template/types/cosellResponse";
import type { PaginationType } from "@template/types/paginator";
import type { FilterDefaultDeal } from "@template/types/filter";
// import type { Activitylog } from "@template/types/activity";
import { requestPayload } from "@template/common/listCosell";
import type { AmpCosellResponse } from "@template/types/ampCosell";
// import type { GCPCosellResponse } from "@template/types/gcpCosell";
import { paginatorDefault } from "@template/common/constants/paginator";
import type { MappingList } from "@template/types/mapping";
import type { PartnerConnectionProps } from "@template/types/partner";
import type { ReferenceDataProps } from "@template/types/reference";
import type { ModelType } from "@template/enum/pipedrive.enum";

interface CoSellContextProps {
  data: RC3CosellResponse;
  setData: React.Dispatch<React.SetStateAction<RC3CosellResponse>>;
  ampCosell: AmpCosellResponse;
  setAmpCosell: React.Dispatch<React.SetStateAction<AmpCosellResponse>>;
  // gcpCosellData: GCPCosellResponse;
  // setGcpCosellData: React.Dispatch<React.SetStateAction<GCPCosellResponse>>;
  // gcpCosell: GCPCosellResponse;
  // setGcpCosell: React.Dispatch<React.SetStateAction<GCPCosellResponse>>;
  opportunityList: RC3CosellResponse[];
  setOpportunityList: React.Dispatch<React.SetStateAction<RC3CosellResponse[]>>;
  partnerType: string[];
  setPartnerType: React.Dispatch<React.SetStateAction<string[]>>;
  paginator: PaginationType;
  setPaginator: React.Dispatch<React.SetStateAction<PaginationType>>;
  paginatorAuditLog: PaginationType;
  setPaginatorAuditLog: React.Dispatch<React.SetStateAction<PaginationType>>;
  dropdownShow: any;
  setDropdownShow: React.Dispatch<React.SetStateAction<any>>;
  formValues: FilterDefaultDeal;
  setFormValues: React.Dispatch<React.SetStateAction<FilterDefaultDeal>>;
  dealName: string;
  setDealName: React.Dispatch<React.SetStateAction<string>>;
  mappingCrmList: MappingList[];
  setMappingCrmList: React.Dispatch<React.SetStateAction<MappingList[]>>;
  generateCosell: any;
  setGenerateCosell: React.Dispatch<React.SetStateAction<any>>;
  currentPage: { page: ModelType; params?: Record<string, string> };
  setCurrentPage: React.Dispatch<
    React.SetStateAction<{ page: ModelType; params?: Record<string, string> }>
  >;
  // cosellActiviy: Activitylog[];
  // setCosellActivity: React.Dispatch<React.SetStateAction<Activitylog[]>>;
  // selectedActivityLog: Activitylog;
  // setSelectedActivityLog: React.Dispatch<React.SetStateAction<Activitylog>>;
  optionValues: OptionTypes;
  setOptionValues: React.Dispatch<React.SetStateAction<OptionTypes>>;
  isSpecificLoading: boolean;
  setIsSpecificLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isListLoading: boolean;
  setIsListLoading: React.Dispatch<React.SetStateAction<boolean>>;
  emptyState: boolean;
  setEmptyState: React.Dispatch<React.SetStateAction<boolean>>;
  partnerConnections: PartnerConnectionProps[];
  setPartnerConnects: React.Dispatch<
    React.SetStateAction<PartnerConnectionProps[]>
  >;
  selectedPartnerConnect: PartnerConnectionProps;
  setSelectedPartnerConnect: React.Dispatch<
    React.SetStateAction<PartnerConnectionProps>
  >;
  loading: boolean;
  setLoading: React.Dispatch<boolean>;
  referenceData: ReferenceDataProps[];
  setReferenceData: React.Dispatch<React.SetStateAction<ReferenceDataProps[]>>;
  // referenceDataGcp: ReferenceDataProps[];
  // setReferenceDataGcp: React.Dispatch<
  //   React.SetStateAction<ReferenceDataProps[]>
  // >;
  // referenceDataAmp: ReferenceDataProps[];
  // setReferenceDataAmp: React.Dispatch<
  //   React.SetStateAction<ReferenceDataProps[]>
  // >;
}

const CoSellContext = createContext<CoSellContextProps | undefined>(undefined);

export const CoSellProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isSpecificLoading, setIsSpecificLoading] = useState(false);
  const [dealName, setDealName] = useState("");
  const [data, setData] = useState<RC3CosellResponse>({});
  const [ampCosell, setAmpCosell] = useState<any>({});
  // const [gcpCosellData, setGcpCosellData] = useState<GCPCosellResponse>({});
  // const [gcpCosell, setGcpCosell] = useState<GCPCosellResponse>({});
  const [generateCosell, setGenerateCosell] = useState<RC3CosellResponse>({});
  // const [cosellActiviy, setCosellActivity] = useState<Activitylog[]>([]);
  const [optionValues, setOptionValues] = useState<OptionTypes>({});
  const [opportunityList, setOpportunityList] = useState<RC3CosellResponse[]>(
    [],
  );
  const [referenceData, setReferenceData] = useState<ReferenceDataProps[]>([]);
  const [_referenceDataGcp, _setReferenceDataGcp] = useState<
    ReferenceDataProps[]
  >([]);
  const [_referenceDataAmp, _setReferenceDataAmp] = useState<
    ReferenceDataProps[]
  >([]);
  const [currentPage, setCurrentPage] = useState<any>();
  const [paginatorAuditLog, setPaginatorAuditLog] =
    useState<PaginationType>(paginatorDefault);
  // const [selectedActivityLog, setSelectedActivityLog] = useState<Activitylog>(
  //   {}
  // );
  const [partnerConnections, setPartnerConnects] = useState<
    PartnerConnectionProps[]
  >([]);
  const [selectedPartnerConnect, setSelectedPartnerConnect] =
    useState<PartnerConnectionProps>({});
  const [partnerType, setPartnerType] = useState<string[]>([]);
  const [mappingCrmList, setMappingCrmList] = useState<MappingList[]>([]);
  const [emptyState, setEmptyState] = useState(false);
  const [isListLoading, setIsListLoading] = useState(true);
  const [dropdownShow, setDropdownShow] = useState(requestPayload.defaultView);
  const [paginator, setPaginator] = useState<PaginationType>(paginatorDefault);
  const [formValues, setFormValues] = useState<FilterDefaultDeal>({});
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <CoSellContext.Provider
      value={{
        data,
        setData,
        // selectedActivityLog,
        // setSelectedActivityLog,
        ampCosell,
        setAmpCosell,
        // gcpCosellData,
        // setGcpCosellData,
        // gcpCosell,
        // setGcpCosell,
        // cosellActiviy,
        // setCosellActivity,
        optionValues,
        setOptionValues,
        dropdownShow,
        setDropdownShow,
        isSpecificLoading,
        setIsSpecificLoading,
        generateCosell,
        setGenerateCosell,
        dealName,
        setDealName,
        opportunityList,
        setOpportunityList,
        paginator,
        setPaginator,
        isListLoading,
        setIsListLoading,
        emptyState,
        setEmptyState,
        formValues,
        setFormValues,
        mappingCrmList,
        setMappingCrmList,
        partnerType,
        setPartnerType,
        partnerConnections,
        setPartnerConnects,
        selectedPartnerConnect,
        setSelectedPartnerConnect,
        paginatorAuditLog,
        setPaginatorAuditLog,
        currentPage,
        setCurrentPage,
        loading,
        setLoading,
        referenceData,
        setReferenceData,
        // referenceDataGcp,
        // setReferenceDataGcp,
        // referenceDataAmp,
        // setReferenceDataAmp,
      }}
    >
      {children}
    </CoSellContext.Provider>
  );
};

export const useCoSellContext = () => {
  const context = useContext(CoSellContext);
  if (!context) {
    throw new Error("Error on Co-sell ContextProvider");
  }
  return context;
};
