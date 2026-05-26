import Decohub from "apps/decohub/mod.ts";

/**
 * @title Deco Hub
 * @description Unlock apps and integrations on deco.cx
 * @category Tool
 * @logo https://decoims.com/we-digi/39e59526-3aee-4e57-bced-fe5acc5c4740/18a28e97_18a28e977196d303f1ba350805504de7.png
 */
export default function App(...params: Parameters<typeof Decohub>) {
  return Decohub(...params);
}

export { Preview } from "apps/decohub/mod.ts";
