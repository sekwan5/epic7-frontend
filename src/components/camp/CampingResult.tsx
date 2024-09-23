import { type CampingResult } from "@/modules/api";
import CampingResultRow from "./CampingResultRow";
import { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  CampDataBuilder,
  getBestChatOptions,
  getHeroCombinations,
} from "./hook";
import { IHero } from "@/modules/data/getHeroData";
import { setCampingResultList } from "@/store/campSlice";

export interface ICampingResultRow {
  tab: number;
}

export default function CampingResult(props: ICampingResultRow) {
  const { tab } = props;

  const dispatch = useAppDispatch();

  const { campingHeroList, campResultList, campBookMarkList } = useAppSelector(
    (state) => state.camp,
  );

  const buildCampData = useCallback((hero: IHero) => {
    if (hero.camping && hero.camping.personalities) {
      const campValue = CampDataBuilder(hero.camping.personalities);
      return {
        ...hero,
        camping: {
          ...hero.camping,
          campValue,
        },
      };
    } else {
      console.warn(`Missing camping data for hero: ${hero.name}`);
      return hero; // 캠핑 데이터가 없는 경우 원본 아이템 반환
    }
  }, []);

  const processCampingData = useCallback(async () => {
    if (campingHeroList.length >= 4) {
      const tmpList = await Promise.all(
        campingHeroList.map(async (item: IHero) => {
          try {
            return buildCampData(item);
          } catch (error) {
            console.error(
              `Error processing camping data for hero: ${item.name}`,
              error,
            );
            return item; // 에러 발생 시 원본 아이템 반환
          }
        }),
      );

      const combinations = getHeroCombinations(tmpList);
      const result = combinations.map((combination) => {
        return getBestChatOptions(combination);
      });
      result.sort((a, b) => b.score - a.score);
      dispatch(setCampingResultList(result));
    } else {
      dispatch(setCampingResultList([]));
    }
  }, [campingHeroList, buildCampData, dispatch]);

  useEffect(() => {
    if (tab === 2) {
      processCampingData();
    }
  }, []);

  return (
    <div className="camping-content-wrap">
      <div className="results-container">
        <CampingResultRow
          data={tab === 2 ? campResultList : campBookMarkList}
          useBookMark={tab === 2}
        />
      </div>
    </div>
  );
}
