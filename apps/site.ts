import website, { Props } from "apps/website/mod.ts";
import manifest, { Manifest } from "../manifest.gen.ts";
import { type App, type AppContext as AC } from "@deco/deco";
type WebsiteApp = ReturnType<typeof website>;
/**
 * @title Site
 * @description Start your site from a template or from scratch.
 * @category Tool
 * @logo https://decoims.com/we-digi/0969e86a-07fd-43b2-bd2c-4aed425312fc/0ac02239_0ac02239-61e6-4289-8a36-e78c0975bcc8.png
 */
export default function Site(state: Props): App<Manifest, Props, [
    WebsiteApp
]> {
    return {
        state,
        manifest,
        dependencies: [
            website(state),
        ],
    };
}
export type SiteApp = ReturnType<typeof Site>;
export type AppContext = AC<SiteApp>;
export { onBeforeResolveProps, Preview } from "apps/website/mod.ts";
