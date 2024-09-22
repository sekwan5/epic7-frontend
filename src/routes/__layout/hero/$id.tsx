// Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2024/02/07.

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
  const hero = getHeroById(args.params.id);

  return { id: args.params.id, hero };
};

export function Component() {
  const { id, hero } = useLoaderData() as {
    id: string;
    hero: IHero;
  };
  return <HeroDtlWrap data={hero} id={id} />;
}
