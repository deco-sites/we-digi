import { asset, Head } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import Theme from "../sections/Theme/Theme.tsx";
import { Context } from "@deco/deco";
export default defineApp(async (_req, ctx) => {
  const revision = await Context.active().release?.revision();
  // const serviceWorkerScript = () =>
  //   addEventListener("load", () => console.log("Script inserido"));
  return (<>
    {/* Include default fonts and css vars */}
    <Theme colorScheme="any" />

    {/* Include Icons and manifest */}
    <Head>
      {/* Enable View Transitions API */}
      <style dangerouslySetInnerHTML={{
        __html: `@view-transition { navigation: auto; }`,
      }} />

      <script type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js">
      </script>
      <script type="text/javascript" dangerouslySetInnerHTML={{
        __html: `(function(){
                    emailjs.init({
                    publicKey: "tmKMu4QTTuGaOohNF",
                  });
                })();
      `}}>
      </script>

      {/* Tailwind v3 CSS file */}
      <link href={asset(`/styles.css?revision=${revision}`)} rel="stylesheet" />

      {/* Web Manifest */}
      <link rel="manifest" href={asset("/site.webmanifest")} />

      <link href="https://fonts.cdnfonts.com/css/effra-trial" rel="stylesheet" />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />

    </Head>

    {/* Rest of Preact tree */}
    <ctx.Component />

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script dangerouslySetInnerHTML={{
      __html: `
        var _ss = _ss || [];
        _ss.push(['_setDomain', 'https://koi-3QNODSNZAQ.marketingautomation.services/net']);
        _ss.push(['_setAccount', 'KOI-4DB1W7ODAG']);
        _ss.push(['_trackPageView']);
        (function() {
    var ss = document.createElement('script');
        ss.type = 'text/javascript'; ss.async = true;
        ss.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'koi-3QNODSNZAQ.marketingautomation.services/client/ss.js?ver=2.4.0';
        var scr = document.getElementsByTagName('script')[0];
        scr.parentNode.insertBefore(ss, scr);
})();
        `
    }}></script>
    <script dangerouslySetInnerHTML={{
      __html: `
              var ss_form = {'account': 'MzawMLEwNTK1BAA', 'formID': 'MzAyMDK3SDbVNU80SNM1SU5O1rW0NDLSNTRMTLUwMkw2NjFKBgA'};
              ss_form.width = '100%';
              ss_form.domain = 'app-3QNODSNZAQ.marketingautomation.services';
              // ss_form.hidden = {'field_id': 'value'}; // Modify this for sending hidden variables, or overriding values
              ss_form.target_id = 'contact_form'; // Optional parameter: forms will be placed inside the element with the specified id
              ss_form.polling = true; // Optional parameter: set to true ONLY if your page loads dynamically and the id needs to be  polled continually.
            `
    }} />
    <script type="text/javascript" src="https://koi-3QNODSNZAQ.marketingautomation.services/client/form.js?ver=2.0.1"></script>
  </>);
});
