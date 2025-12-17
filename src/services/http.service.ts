import { Method } from "../enum/http.enum";

class HttpWrapper {
  private headers: HeadersInit;

  constructor() {
    this.headers = {
      Authorization: process.env.NEXT_PUBLIC_API_TOKEN||"",
      credentials:"include",
    };
  }
  public async get(url: string) {
    try {
      const response = await fetch(url, {
        method: Method.GET,
        headers: this.headers,
        
      });
      return await response.json();
    } catch (error: any) {
      throw error;
    }
  }

  public async post(url: string, payload?: any) {
    try {
      const response = await fetch(url, {
        method: Method.POST,
        headers: this.headers,
        body: payload,
      });
      return await response.json();
    } catch (error: any) {
      throw error;
    }
  }

  public async patch(url: string, payload: any) {
    try {
      const response = await fetch(url, {
        method: Method.PATCH,
        headers: this.headers,
        body: payload,
      });
      return await response.json();
    } catch (error: any) {
      throw error;
    }
  }

  public async delete(url: string) {
    try {
      const response = await fetch(url, {
        method: Method.DELETE,
        headers: this.headers,
      });
      return await response.json();
    } catch (error: any) {
      throw error;
    }
  }
}

export default HttpWrapper;
