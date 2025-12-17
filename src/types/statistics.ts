import { PartnerType } from "../enum/partnerType.enum";

export interface StatisticsProps {
  countProvider?: { ProviderName?: string; SubscriptionCount?: string }[];
  countMonth?: {
    MonthName?: string;
    SubscriptionCount?: string;
    ProviderName?: string;
  }[];
  invoice?: { MonthName?: string; Amount?: string | number; type?: string }[];
  invoiceByMonth?: {
    MonthName?: string;
    Revenue?: string | number;
    ProviderName?: string;
  }[];
  subscribeCount?: {
    Monthname?: string;
    count?: number;
    PartnerType?: number;
  }[];
}
