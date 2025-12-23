type DateFormat = "mm/dd/yy" | "mm/dd/yyyy" | "dd/mm/yy" | "dd/mm/yyyy";

export const formatDate = (
  date?: string | Date,
  format: DateFormat = "mm/dd/yyyy"
): string => {
  if (!date) return "--";

  const d = new Date(date);
  if (isNaN(d.getTime())) return "--";

  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const yyyy = d.getFullYear();
  const yy = String(yyyy).slice(-2);

  switch (format) {
    case "mm/dd/yy":
      return `${mm}/${dd}/${yy}`;

    case "mm/dd/yyyy":
      return `${mm}/${dd}/${yyyy}`;

    case "dd/mm/yy":
      return `${dd}/${mm}/${yy}`;

    case "dd/mm/yyyy":
      return `${dd}/${mm}/${yyyy}`;

    default:
      return `${mm}/${dd}/${yyyy}`;
  }
};
