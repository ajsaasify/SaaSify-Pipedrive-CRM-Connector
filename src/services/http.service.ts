import { Method } from "../enum/http.enum";

class HttpWrapper {
  private headers: HeadersInit;

  constructor() {
    this.headers = {
      Authorization: process.env.NEXT_PUBLIC_API_TOKEN || "",
      credentials: "include",
    };
  }
  payloadConversion = (payload: any) =>
    typeof payload !== "string" ? JSON.stringify(payload) : payload;
  public async get(url: string) {
    const response = await fetch(url, {
      method: Method.GET,
      headers: this.headers,
    });
    return await response.json();
  }

  public async post(url: string, payload?: any) {
    const response = await fetch(url, {
      method: Method.POST,
      headers: this.headers,
      body: this.payloadConversion(payload),
    });
    return await response.json();
  }

  public async patch(url: string, payload: any) {
    const response = await fetch(url, {
      method: Method.PATCH,
      headers: this.headers,
      body: this.payloadConversion(payload),
    });
    return await response.json();
  }

  public async delete(url: string) {
    const response = await fetch(url, {
      method: Method.DELETE,
      headers: this.headers,
    });
    return await response.json();
  }
}

export default HttpWrapper;
