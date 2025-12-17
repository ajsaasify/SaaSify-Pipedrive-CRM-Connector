import { OptionTypes } from "../types/dropdown.options";
import React from "react";
export const updateOptionValue = (
  options: { label?: string; value?: any }[],
  setOptionValues: React.Dispatch<React.SetStateAction<OptionTypes>>,
  key: string
) => {
  setOptionValues((prev) => ({ ...prev, [key]: options }));
};
