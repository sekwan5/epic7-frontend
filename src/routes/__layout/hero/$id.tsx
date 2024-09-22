// Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2024/02/07.

import { api, IHeroBuild, IRTAData } from "@/modules/api";
import { getHeroById, IHero } from "@/modules/data/getHeroData";
import HeroDtlWrap from "@/modules/heroDtl";
import {
  LoaderFunction,
  LoaderFunctionArgs,
  useLoaderData,
} from "react-router-dom";

export const loader: LoaderFunction = async (args: LoaderFunctionArgs) => {
  if (args.params.id === undefined) {
    throw new Error("ID가 제공되지 않았습니다.");
  }
  const builds = await api.hero.getHeroBuilds(args.params.id);
  const hero = getHeroById(args.params.id);
  const rta = await api.hero.getHeroRtaData(args.params.id);
  return { builds, hero, rta };
};

export function Component() {
  const { builds, hero, rta } = useLoaderData() as {
    builds: IHeroBuild[];
    hero: IHero;
    rta: IRTAData;
  };
  return <HeroDtlWrap data={hero} builds={builds} rta={rta} />;
}
