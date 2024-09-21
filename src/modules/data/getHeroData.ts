/* eslint-disable @typescript-eslint/no-explicit-any */
// 영웅 데이터의 타입 정의
interface IHero {
  id: string;
  nm_kr: string;
  type_nm_en: string;
  job_nm_kr: string;
  zodiac_id: string;
  zodiac_nm_en: string;
  keyword: string | null;
  type_id: string;
  type_nm_kr: string;
  nm_en: string;
  job_id: string;
  job_nm_en: string;
  zodiac_nm_kr: string;
  grade: string;
  status: string | null;
  name: string;
  isShow: boolean;
  campPick: boolean;
  isLock: boolean;
  camping: {
    id: string;
    personalities: string[];
    topics_en: string[];
    topics_kr: string[];
    common_skills: any[];
    buff_skills: any[];
    debuff_skills: any[];
    buffs: any[];
    debuffs: any[];
    common: any[];
  };
  self_devotion: {
    type: string;
    grades: {
      [key: string]: number;
    };
  };
  ex_equip: any[];
  skills: {
    [key: string]: {
      hitTypes: string[];
      rate?: number;
      pow?: number;
      targets?: number;
      options: any[];
    };
  };
  lv60SixStarFullyAwakened: {
    cp: number;
    atk: number;
    hp: number;
    spd: number;
    def: number;
    chc: number;
    chd: number;
    dac: number;
    eff: number;
    efr: number;
  };
}
// export interface CampingResult {
//     id: string;
//     personalities: string[];
//     topics_en: string[];
//     topics_kr: string[];
//     common_skills: any[];
//     buff_skills: any[];
//     debuff_skills: any[];
//     buffs: any[];
//     debuffs: any[];
//     common: any[];
//   }

// 전체 영웅 데이터의 타입 정의
interface HeroData {
  [key: string]: IHero;
}

import heroData from "./hero.json";

// JSON 데이터를 HeroData 타입으로 안전하게 변환
const heroes: HeroData = Object.fromEntries(
  (heroData as any[]).map((hero) => [hero.id, hero]),
);

export function getAllHeroes(): IHero[] {
  return Object.values(heroes);
}

export function getHeroById(id: string): IHero | undefined {
  return heroes[id];
}

export function getHeroSkills(id: string): IHero["skills"] | undefined {
  const hero = getHeroById(id);
  return hero?.skills;
}

export function getHeroStats(
  id: string,
): IHero["lv60SixStarFullyAwakened"] | undefined {
  const hero = getHeroById(id);
  return hero?.lv60SixStarFullyAwakened;
}

// Hero와 HeroData 인터페이스도 export
export type { IHero, HeroData };
