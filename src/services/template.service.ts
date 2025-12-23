import { MapRequest } from "@template/enum/request.enum";
import type { PathParams, QueryParams } from "../types/url.builder.interface";
import ApiService from "./httpClient.service";
import URLBuilder from "@template/utils/url.builder";

class TemplateService extends ApiService {
  private buildUrl(
    path: string,
    pathParams?: PathParams,
    queryParams?: QueryParams,
  ): string {
    const urlBuilder = new URLBuilder(path, pathParams, queryParams);
    return urlBuilder.buildURL();
  }

  //without pathParam and queryParam
  public async verifyUser(credentials: Record<string, any>) {
    const url = this.buildUrl("/login");
    return this.request(MapRequest.post, url, credentials);
  }

  //without queryParam
  public async createUser(credentials: { email: string; password: string }) {
    const url = this.buildUrl("/login/:email", { email: credentials.email });
    return this.request(MapRequest.post, url, credentials);
  }

  //without pathParam
  public async EditUser(credentials: { email: string; password: string }) {
    const url = this.buildUrl("/login", undefined, {
      email: credentials.email,
    });
    return this.request(MapRequest.post, url, credentials);
  }

  //usage of all url builder
  public async getUserData(email: string, _id: string) {
    const url = this.buildUrl("/login/:email", { email }, { _id });
    return this.request(MapRequest.get, url);
  }
}

const templateService = new TemplateService();
export default templateService;
