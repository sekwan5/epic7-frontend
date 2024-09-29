import { createBrowserRouter } from "react-router-dom";

// 페이지 컴포넌트들을 임포트합니다
import { Layout } from "./modules/home/Layout";
import HomeContent from "@/modules/home";
import HeroListWrap from "./modules/hero";
import CampingWrap from "./modules/camping";
import HeroDtlWrap from "./modules/heroDtl";
import { loadHeroData } from "./loaders/heroLoader";
import NotFound from "./modules/NotFound"; // 새로 추가
import { GearOwnerWrap } from "./modules/gear/owner";
import GearEnhanceWrap from "./modules/gear/gearEnhance";

// import Hero from './routes/Hero';
// import Camping from './routes/Camping';
// import Gear from './routes/Gear';

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <HomeContent />,
        },
        {
          path: "hero",
          element: <HeroListWrap />,
        },
        {
          path: "/hero/:id",
          element: <HeroDtlWrap />,
          loader: loadHeroData,
        },
        {
          path: "gear/owner",
          element: <GearOwnerWrap />,
        },
        {
          path: "gear/enhance",
          element: <GearEnhanceWrap />,
        },
        {
          path: "camping",
          element: <CampingWrap />,
        },
        {
          path: "*", // 모든 알 수 없는 경로에 대해 NotFound 컴포넌트를 렌더링
          element: <NotFound />,
        },
      ],
    },
  ],
  { basename: "/" },
);
