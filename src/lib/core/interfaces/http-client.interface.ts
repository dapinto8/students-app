export type RequestHeaders = Record<string, string | number | boolean>;

export interface RequestConfig {
  headers?: RequestHeaders;
  params?: any;
}

export interface Response<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: RequestConfig;
  request?: any;
}

export interface HttpClient {
  get(url: string, config?: RequestConfig): Promise<Response>;
  // post(url: string, data: any, config?: RequestConfig): Promise<Response>;
  // put(url: string, data: any, config?: RequestConfig): Promise<Response>;
  // patch(url: string, data: any, config?: RequestConfig): Promise<Response>;
  // delete(url: string, config?: RequestConfig): Promise<Response>;
  // options(url: string, config?: RequestConfig): Promise<Response>;
}
