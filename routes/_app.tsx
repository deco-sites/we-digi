import { asset, Head } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import { Context } from "deco/deco.ts";
import Theme from "../sections/Theme/Theme.tsx";

export default defineApp(async (_req, ctx) => {
  const revision = await Context.active().release?.revision();

  // const serviceWorkerScript = () =>
  //   addEventListener("load", () => console.log("Script inserido"));
  
  

  return (
    <>
      {/* Include default fonts and css vars */}
      <Theme colorScheme="any" />

      {/* Include Icons and manifest */}
      <Head>
        {/* Enable View Transitions API */}
        <style
          dangerouslySetInnerHTML={{
            __html: `@view-transition { navigation: auto; }`,
          }}
        />

        {/* Tailwind v3 CSS file */}
        <link
          href={asset(`/styles.css?revision=${revision}`)}
          rel="stylesheet"
        />

        {/* Web Manifest */}
        <link rel="manifest" href={asset("/site.webmanifest")} />

        <link href="https://fonts.cdnfonts.com/css/effra-trial" rel="stylesheet" />
                
        
      </Head>

      {/* Rest of Preact tree */}
      <ctx.Component />

      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    </>
  );
});
