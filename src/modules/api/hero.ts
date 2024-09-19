import { AxiosInstance } from "axios";
import { IndexSignatureType } from "../types";
import { ApiBase } from "./base";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Camping {
  id: string;
  personalities: number[];
  topics_en: string[];
  common_skills: any[]; // 또는 더 구체적인 타입을 사용할 수 있습니다
  buff_skills: any[];
  debuff_skills: any[];
  buffs: any[];
  debuffs: any[];
  common: any[];
  topics_kr: string[];
  campValue?: {
    [key: string]: number;
  };
}

export interface IHero {
  id: string;
  nm_kr: string;
  nm_en: string;
  name: string;
  job_id: string;
  job_nm: string;
  type_id: string;
  type_nm: string;
  zodiac_id: string;
  zodiac_nm: string;
  grade: string;
  keyword?: string;
  status?: string;
  isShow?: boolean;
  campPick?: boolean;
  isLock?: boolean;
  camping: Camping;
}

interface ChatOption {
  option_en: string;
  option_kr: string;
  hero: IHero;
  score: number;
}

export interface CampingResult {
  team: IHero[];
  bestChatOption1: ChatOption;
  bestChatOption2: ChatOption;
  score: number;
  id?: string;
}

export class ApiHero extends ApiBase<IndexSignatureType> {
  client: AxiosInstance;

  constructor(client: AxiosInstance) {
    super(client, "/heroes");
    this.client = client;
  }

  async getHeroes(params: { limit?: number } = {}): Promise<IHero[]> {
    return this.client
      .get(`${this.apiPath}`, { params: params })
      .then((res) => {
        return res.data;
      });
  }
}
