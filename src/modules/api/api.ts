import { AbstractApi } from "./AbstractApi";
import { ApiHero } from "./hero";

export class Api extends AbstractApi {
  hero: ApiHero;

  constructor() {
    super(import.meta.env.VITE_API_URL);
    this.hero = new ApiHero(this.client);
  }
}

export const api = new Api();
