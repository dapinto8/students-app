import axios from 'axios';
import { HttpClient, RequestConfig, Response } from '@core/interfaces/http-client.interface';

export class AxiosClient implements HttpClient {
  private instance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        hash: process.env.NEXT_PUBLIC_API_TOKEN ?? ''
      }
    });
  }

  get(url: string, config?: RequestConfig): Promise<Response> {
    return this.instance.get(url, config);
  }
}
