import { trimString } from "./globalHelper";

export const trimObjString = (
  obj: Record<string, any>,
): Record<string, any> => {
  const trimmed: any = {};

  for (const key in obj) {
    const value = obj[key];
    trimmed[key] = trimString(value);
  }
  return trimmed;
};
