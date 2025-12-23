import { Divider } from "primereact/divider";
import React from "react";

const ErrorDetails: React.FC<{ errorStatus: string }> = ({ errorStatus }) => {
  return errorStatus ? (
    <>
      <Divider />
      <div className="p-error">Errors: {errorStatus}</div>
    </>
  ) : (
    <></>
  );
};

export default ErrorDetails;
