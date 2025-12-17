export const fallBackKey = "--";

export const parseSemiColon = (fields: string[] | undefined): string => {
  if (!fields) return fallBackKey;
  return fields?.join("; ") || fallBackKey;
};

export const parseArray = (fields: string[] | undefined | null): string => {
  if (!fields) return fallBackKey;
  return fields?.join(", ") || fallBackKey;
};

export const extactArray = (fields: string): string[] => {
  if (!fields) return [];
  return fields?.split(",") || [fields];
};
