import { PDButtonSize } from "@template/enum/pipedrive.enum";
import PDButton from "./pipedriveButton";

export const EmptyState = ({
  image,
  title,
  description,
  buttonLabel,
  buttonDisable,
  onClick,
}: {
  image?: string;
  title?: string;
  description?: string;
  buttonLabel?: string;
  buttonDisable?: boolean;
  onClick?: () => void;
}) => {
  return (
    <div className="flex flex-col items-center text-center bg-gray-50 border border-dashed border-gray-300 rounded-xl p-5">
      {image && (
        <img src={image} alt="empty" className="w-32 mb-5 opacity-90" />
      )}

      {title && <h5 className="text-sm font-bold">{title}</h5>}

      {description && (
        <p className="text-xs text-gray-600 mt-2 mb-5 px-4">{description}</p>
      )}

      {buttonLabel && (
        <PDButton
          size={PDButtonSize.TINY}
          label={buttonLabel}
          onClick={onClick}
          disabled={buttonDisable}
          className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        ></PDButton>
      )}
    </div>
  );
};
