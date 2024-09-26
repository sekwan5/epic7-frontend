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
  return Object.values(heroes).sort((a, b) => {
    // new와 update 상태의 영웅을 먼저 정렬
    if (
      (a.status === "new" || a.status === "update") &&
      b.status !== "new" &&
      b.status !== "update"
    ) {
      return -1;
    }
    if (
      (b.status === "new" || b.status === "update") &&
      a.status !== "new" &&
      a.status !== "update"
    ) {
      return 1;
    }

    // new와 update 사이에서는 new가 먼저 오도록
    if (a.status === "new" && b.status === "update") {
      return -1;
    }
    if (b.status === "new" && a.status === "update") {
      return 1;
    }

    // status가 같거나 둘 다 new/update가 아니라면 grade로 정렬
    const gradeOrder: { [key: string]: number } = { "5": 3, "4": 2, "3": 1 };
    return (gradeOrder[b.grade] || 0) - (gradeOrder[a.grade] || 0);
  });
}

export function getHeroById(id: string): IHero | undefined {
  return heroes[id];
}

export function getHeroesByIds(ids: string[]): IHero[] {
  return ids
    .map((id) => heroes[id])
    .filter((hero): hero is IHero => hero !== undefined)
    .sort((a, b) => {
      // 정렬 로직은 getAllHeroes 함수와 동일하게 유지
      if (
        (a.status === "new" || a.status === "update") &&
        b.status !== "new" &&
        b.status !== "update"
      ) {
        return -1;
      }
      if (
        (b.status === "new" || b.status === "update") &&
        a.status !== "new" &&
        a.status !== "update"
      ) {
        return 1;
      }

      if (a.status === "new" && b.status === "update") {
        return -1;
      }
      if (b.status === "new" && a.status === "update") {
        return 1;
      }

      const gradeOrder: { [key: string]: number } = { "5": 3, "4": 2, "3": 1 };
      return (gradeOrder[b.grade] || 0) - (gradeOrder[a.grade] || 0);
    });
}

export function getHeroStats(): IHero[] {
  return Object.values(heroes)
    .filter((hero) => hero.status === "new" || hero.status === "update")
    .sort((a, b) => {
      // 먼저 status로 정렬 (new가 update보다 앞으로)
      if (a.status !== b.status) {
        return a.status === "new" ? -1 : 1;
      }

      // status가 같다면 grade로 정렬 (높은 grade가 앞으로)
      const gradeOrder: { [key: string]: number } = { "5": 3, "4": 2, "3": 1 };
      return (gradeOrder[b.grade] || 0) - (gradeOrder[a.grade] || 0);
    });
}

// Hero와 HeroData 인터페이스도 export
export type { IHero, HeroData };
