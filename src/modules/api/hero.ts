import { AxiosInstance } from "axios";
import { IndexSignatureType } from "../types";
import { ApiBase } from "./base";
import { IHero } from "../data/getHeroData";
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
export interface CampingResult {
  team: IHero[];
  bestChatOption1: ChatOption;
  bestChatOption2: ChatOption;
  score: number;
  id?: string;
}
interface ChatOption {
  option_en: string;
  option_kr: string;
  hero: IHero;
  score: number;
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
