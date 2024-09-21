import { AxiosInstance } from "axios";
import { IndexSignatureType } from "../types";
import { ApiBase } from "./base";
export interface IHeroBuild {
  hero_id: string;
  artifactCode: string;
  sets: {
    [key: string]: number;
  };
  atk: number;
  chc: number;
  chd: number;
  spd: number;
  def: number;
  eff: number;
  efr: number;
  gs: number;
  hp: number;
  createDate: Date;
}

export class ApiHero extends ApiBase<IndexSignatureType> {
  client: AxiosInstance;

  constructor(client: AxiosInstance) {
    super(client, "/heroes");
    this.client = client;
  }

  async getHeroBuilds(hero_id: string): Promise<IHeroBuild[]> {
    return this.client.get(`/builds/${hero_id}`).then((res) => {
      return res.data;
    });
  }
}
