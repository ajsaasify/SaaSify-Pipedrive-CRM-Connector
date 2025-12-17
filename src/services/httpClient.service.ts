import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { toastMessage } from "@template/common/toastMessage";
import {
  HttpHeaders,
  MapRequest,
  MimeTypes,
} from "@template/enum/request.enum";

class ApiService {
  private apiClient;
  private baseURI;

  constructor() {
    this.baseURI = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    this.apiClient = axios.create({ baseURL: this.baseURI });

    // Interceptor to add headers and handle offline state
    this.apiClient.interceptors.request.use(
      async (config: AxiosRequestConfig): Promise<any> => {
        if (config.headers && !config.headers[HttpHeaders.ContentType]) {
          config.headers[HttpHeaders.ContentType] = MimeTypes.ApplicationJson;
        }
        if (!navigator.onLine) {
          return Promise.reject({ data: toastMessage.offline });
        }
        return config;
      },
      (error: AxiosError): Promise<AxiosError> => {
        return Promise.reject(error);
      },
    );
  }

  // Generic method to handle API errors
  private handleError(error: AxiosError): void {
    throw error.response?.data || error;
  }

  // Generic method to extract and return data from a successful response
  private handleResponse(response: AxiosResponse): any {
    return response.data;
  }

  // Request method
  public async request(
    method: MapRequest,
    url: string,
    data?: any,
  ): Promise<any> {
    try {
      let response: AxiosResponse;

      switch (method.toUpperCase()) {
        case MapRequest.get:
          response = await this.apiClient.get(url);
          break;
        case MapRequest.post:
          response = await this.apiClient.post(url, data);
          break;
        case MapRequest.put:
          response = await this.apiClient.put(url, data);
          break;
        case MapRequest.patch:
          response = await this.apiClient.patch(url, data);
          break;
        case MapRequest.delete:
          response = await this.apiClient.delete(url, data);
          break;
        default:
          throw new Error(`Unsupported method: ${method}`);
      }

      return this.handleResponse(response);
    } catch (error: any) {
      this.handleError(error);
    }
  }
}

export default ApiService;
