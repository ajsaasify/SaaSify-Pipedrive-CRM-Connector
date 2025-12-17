import AppExtensionsSDK from "@pipedrive/app-extensions-sdk";

let sdkInstance: AppExtensionsSDK | null = null;

export const getPipedriveSDK = () => {
  if (!sdkInstance) {
    sdkInstance = new AppExtensionsSDK({
      identifier: "my-extension" // optional
    });
  }
  return sdkInstance;
};
