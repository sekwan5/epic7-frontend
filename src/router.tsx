import { createBrowserRouter } from "react-router-dom";

// 페이지 컴포넌트들을 임포트합니다
import { Layout } from "./modules/home/Layout";
import HomeContent from "@/modules/home";
import HeroListWrap from "./modules/hero";
import CampingWrap from "./modules/camping";
import HeroDtlWrap from "./modules/heroDtl";
import { loadHeroData } from "./loaders/heroLoader";
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
          path: "camping",
          element: <CampingWrap />,
        },

        // {
        //   path: "gear",
        //   element: <Gear />,
        // },
      ],
    },
  ],
  { basename: "/epic7-frontend" },
);
