/* eslint-disable @typescript-eslint/no-explicit-any */
import { CampingResult } from "@/modules/api/hero";
import { IHero } from "@/modules/data/getHeroData";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface campState {
  heroList: IHero[];
  campingHeroList: IHero[];
  campResultList: CampingResult[];
  campBookMarkList: CampingResult[];
}

const initialState: campState = {
  heroList: [],
  campingHeroList: [],
  campResultList: [],
  campBookMarkList: [],
};

export const campReducer = createSlice({
  name: "camp",
  initialState,
  reducers: {
    setHeroList: (state, action: PayloadAction<IHero[]>) => {
      state.heroList = action.payload;
    },
    resetCampingHeroList: (state) => {
      state.campingHeroList = [];
    },
    setCampingHeroList: (state, action: PayloadAction<IHero>) => {
      if (!state.campingHeroList) {
        state.campingHeroList = [];
      }
      state.campingHeroList.push(action.payload);
    },
    deleteCampingHeroList: (state, action: PayloadAction<IHero>) => {
      if (state.campingHeroList) {
        state.campingHeroList = state.campingHeroList.filter(
          (item) => item.id !== action.payload.id,
        );
      }
    },
    lockCampingHeroList: (state, action: PayloadAction<IHero>) => {
      if (state.campingHeroList) {
        state.campingHeroList = state.campingHeroList.map((hero: IHero) =>
          hero.id === action.payload.id
            ? { ...hero, isLock: !action.payload.isLock }
            : hero,
        );
      }
    },
    setCampingResultList: (state, action: PayloadAction<CampingResult[]>) => {
      state.campResultList = action.payload;
    },
    setCampingBookMarkList: (state, action: PayloadAction<CampingResult>) => {
      if (!state.campBookMarkList) {
        state.campBookMarkList = [];
      }
      state.campBookMarkList.push({
        ...action.payload,
        id: crypto.randomUUID() as `${string}-${string}-${string}-${string}-${string}`,
      });
    },
    delCampingBookMarkList: (state, action: PayloadAction<CampingResult>) => {
      if (state.campBookMarkList) {
        state.campBookMarkList = state.campBookMarkList.filter(
          (item: CampingResult) => item.id !== action.payload.id,
        );
      }
    },
  },
});

export const {
  setHeroList,
  setCampingHeroList,
  deleteCampingHeroList,
  lockCampingHeroList,
  resetCampingHeroList,
  setCampingResultList,
  setCampingBookMarkList,
  delCampingBookMarkList,
} = campReducer.actions;
export default campReducer.reducer;
