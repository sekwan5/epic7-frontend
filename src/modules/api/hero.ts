/* eslint-disable @typescript-eslint/no-explicit-any */
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

export interface IRTAData {
  total_games: number;
  pick_count: number;
  wins: number;
  win_rate: number;
  pick_rate: number;
  preban_count: number;
  preban_rate: number;
  top_8_equips: {
    [key: string]: {
      usage_rate: number;
      win_rate: number;
    };
  };
  top_8_equips_with_artifacts: Array<{
    set: string[];
    arti: {
      [key: string]: {
        usage_rate: number;
        win_rate: number;
      };
    };
    usage_rate: number;
    win_rate: number;
  }>;
  top_4_artifacts: {
    [key: string]: {
      usage_rate: number;
      win_rate: number;
    };
  };
  top_5_teammates: {
    [key: string]: {
      count: number;
      win_rate: number;
    };
  };
  top_5_counters: {
    [key: string]: {
      count: number;
      win_rate: number;
    };
  };
  daily_stats: {
    [date: string]: {
      games: number;
      win_rate: number;
    };
  };
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
  async getHeroRtaData(hero_id: string): Promise<IRTAData> {
    return this.client.get(`/builds/statistics/${hero_id}`).then((res) => {
      return res.data;
    });
  }
}
