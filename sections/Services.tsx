import type { ImageWidget } from "apps/admin/widgets.ts";
// import { useScript } from "@deco/deco/hooks";
// import { useScript } from "deco/hooks/useScript.ts";
export interface CTA {
    href: string;
    text: string;
}
export interface Title {
    text?: string;
    /**
     * @format color
     */
    color?: string;
}
interface DescriptionList {
    /**
     * @title Title
     */
    title?: string;
    /**
     * @title Title color
     */
    color?: string;
    /**
     * @title Description
     * @format rich-text
     */
    label: string;
    /**
     * @title Gráfico
     */
    background?: ImageWidget;
}
export interface Props {
    /**
   * @title Cor do fundo
   * @format color
   */
    bgColor?: string;
    /**
   * @title Title
   */
    title?: Title;
    /**
   * @title Serviço da esquerda
   */
    leftText?: Title;
    /**
   * @title Serviço da direita
   */
    rightText?: Title;
    /**
     * @title Lista de serviços
     * @minItems 7
     * @maxItems 7
     */
    services?: string[];
    /**
     * @title Imagem Esquerda
     */
    sideImage1?: ImageWidget;
    /**
     * @title Imagem Direita
     */
    sideImage2?: ImageWidget;
    cta?: CTA;
}
export default function Chart({bgColor, title, leftText, rightText, services, sideImage1, sideImage2, cta }: Props) {

    return (<section class='font-effraTrial flex flex-col items-center gap-8 lg:gap-16 px-4 py-8 lg:py-16' style={{ backgroundColor: bgColor ?? null}}>
      {title && <h2 class="text-xl md:text-[40px]/[50px]" style={{ color: title.color ?? '#0A4A60'}}>{title.text}</h2>}
      <div class="flex items-center max-[1024px]:flex-col gap-6 lg:gap-12">
        {leftText && sideImage1 &&
          <div class="w-fit relative flex items-center text-center">
            <img class="w-60 md:w-full" src={sideImage1} alt="Imagem de fundo" />
            <h3 class="absolute w-full text-2xl md:text-[40px]/[50px]" style={{ color: leftText.color ?? '#0A4A60'}}>{leftText.text}</h3>
          </div>
        }
        {rightText && sideImage2 && services &&
        <div class="flex items-center max-md:flex-col max-md:gap-6" >
          <div class="w-fit relative flex items-center text-center">
            <img class="w-60 md:w-full" src={sideImage2} alt="Imagem de fundo" />
            <h3 class="absolute w-full text-2xl md:text-[40px]/[50px]" style={{ color: rightText.color ?? '#FFFFFF'}}>{rightText.text}</h3>
          </div>
          <ul class="flex flex-col gap-6">
            {services?.map((service) => (
              <li class='flex items-center gap-4 custom-li max-w-64 font-bold text-sm text-black md:relative'>{service}</li>
              ))}
          </ul>
        </div>
        }
      </div>
      <div class="flex items-center ">
        {cta && (
          <a href={cta?.href} target={cta?.href.includes("http") ? "_blank" : "_self"} class={`font-effraTrial text-white btn btn-rounded`}>
              {cta?.text}
          </a>
        )}
      </div>
    </section>);
}
