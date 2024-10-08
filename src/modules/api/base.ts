import { AxiosInstance } from "axios";
import { IndexSignatureType } from "@/modules/types";

export interface ListResult<T> {
  list: T[];
  boards?: T[];
  count: number;
}

export class ApiBase<T> {
  client: AxiosInstance;
  apiPath: string;

  constructor(client: AxiosInstance, apiPath: string) {
    this.client = client;
    // this.apiPath = apiPath.replace(/([^/])$/, "$1");
    this.apiPath = apiPath;
  }

  async list(
    page: number = 1,
    size: number = 10,
    filter: IndexSignatureType = {},
  ): Promise<ListResult<T>> {
    return this.client
      .request({
        url: this.apiPath,
        params: {
          skip: (page - 1) * size,
          limit: size,
          ...filter,
        },
      })
      .then((res) => {
        return res.data as ListResult<T>;
      });
  }

  async create(item: T): Promise<T> {
    return this.client.post(this.apiPath, item).then((res) => {
      return res.data as T;
    });
  }

  async get(id: string): Promise<T> {
    return this.client.get(`${this.apiPath}/${id}`).then((res) => {
      return res.data as T;
    });
  }

  async update(id: string): Promise<T> {
    return this.client.patch(`${this.apiPath}/${id}`).then((res) => {
      return res.data as T;
    });
  }

  async delete(id: string): Promise<string> {
    return this.client.delete(`${this.apiPath}/${id}`).then((res) => {
      return res.data as string;
    });
  }
}
