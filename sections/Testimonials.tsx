// deno-lint-ignore-file react-rules-of-hooks
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "../components/ui/Icon.tsx";
import Slider from "../components/ui/Slider.tsx";
import { useId } from "../sdk/useId.ts";
import { useScript } from "@deco/deco/hooks";
/**
 * @titleBy alt
 */
export interface Testimonial {
    /**
       * @title Title
       * @format rich-text
       * @default Click here to tweak this text however you want.
       */
    description?: string;
    avatar?: ImageWidget;
    /** @description Image's alt text */
    alt?: string;
    name?: string;
    position?: string;
}
export interface Props {
    /**
    * @title Tag
    */
    tag?: string;
    /**
    * @title Title
    */
    title?: string;
    slides?: Testimonial[];
    /**
     * @title Show marks
     * @description show arrows to navigate through the images
     */
    mark?: ImageWidget;
    /**
     * @title Show arrows
     * @description show arrows to navigate through the images
     */
    arrows?: boolean;
    /**
     * @title Show dots
     * @description show dots to navigate through the images
     */
    dots?: boolean;
    /**
     * @title Autoplay interval
     * @description time (in seconds) to start the carousel autoplay
     */
    interval?: number;
}
const DEFAULT_PROPS = {
    title: "This is where you'll put your customer testimonials",
    slides: [
        {
            description: "…a gente tem se sentido muito satisfeitos com o trabalho prestado pela we.digi…entregas consistentes…pessoal muito criativo. Conseguiram melhorar muito a qualidade da nossa loja…temos três lojas hoje…",
            avatar: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1527/7286de42-e9c5-4fcb-ae8b-b992eea4b78e",
            alt: "Avatar",
            name: "Name Surname",
            position: "Position, Company name",
        },
        {
            description: "Showcase customer feedback that emphasizes your product or service's key features and addresses prospective clients' concerns. Display endorsements from customer groups that mirror your target audience.",
            avatar: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1527/7286de42-e9c5-4fcb-ae8b-b992eea4b78e",
            alt: "Avatar",
            name: "Name Surname",
            position: "Position, Company name",
        },
        {
            description: "Showcase customer feedback that emphasizes your product or service's key features and addresses prospective clients' concerns. Display endorsements from customer groups that mirror your target audience.",
            avatar: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1527/7286de42-e9c5-4fcb-ae8b-b992eea4b78e",
            alt: "Avatar",
            name: "Name Surname",
            position: "Position, Company name",
        },
        {
            description: "Showcase customer feedback that emphasizes your product or service's key features and addresses prospective clients' concerns. Display endorsements from customer groups that mirror your target audience.",
            avatar: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1527/7286de42-e9c5-4fcb-ae8b-b992eea4b78e",
            alt: "Avatar",
            name: "Name Surname",
            position: "Position, Company name",
        },
        {
            description: "Showcase customer feedback that emphasizes your product or service's key features and addresses prospective clients' concerns. Display endorsements from customer groups that mirror your target audience.",
            avatar: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1527/7286de42-e9c5-4fcb-ae8b-b992eea4b78e",
            alt: "Avatar",
            name: "Name Surname",
            position: "Position, Company name",
        },
    ],
};
function SliderItem({ slide, id, mark }: {
    slide: Testimonial;
    id: string;
    mark: string;
}) {
    return (<div id={id} class="relative overflow-y-hidden w-full min-h-[292px]">
      <div class="flex flex-col justify-center gap-16 p-8  h-full max-w-[1661px]">
        <div class="flex w-full lg:gap-8 gap-1 relative overflow-visible xl:max-w-[1272px] mx-auto lg:pl-10">
          <Image class="object-cover h-max left-[-25px] md:left-[-70px] top-[-13px] max-md:max-w-[21px]" alt={mark} src={mark || ""} width={62} height={51}/>
          <div>
            <div class="flex flex-col [&_p]:!text-xl lg:[&_p]:!text-[40px] [&_p]:font-light [&_strong]:font-light [&_span]:!text-xl lg:[&_span]:!text-[40px] lg:[&_span]:!leading-[120%] [&_p]:text-[#ababab]">
            <p class="text-lg w-full [&_span]:[font-weight:300] [&_p]:!text-xl lg:[&_p]:!text-[40px] [&_span]:!text-xl lg:[&_span]:!text-[40px]" dangerouslySetInnerHTML={{
            __html: slide.description || "",
              }}></p>
          </div>
            <div class="flex mt-10 gap-2">
              <p class="font-semibold text-base text-white">{slide?.name}</p> 
              <p class="text-base text-[#ababab]">{slide?.position}</p>
            </div>
          </div>
        </div>
      </div>
    </div>);
}
function Dots({ slides }: Props) {
    return (<>
      <style dangerouslySetInnerHTML={{
            __html: `
          @property --dot-progress {
            syntax: '<percentage>';
            inherits: false;
            initial-value: 0%;
          }
          `,
        }}/>
      <ul class="carousel col-span-full z-10 gap-4 flex-[initial]" hx-on:click={useScript((total) => {
            const button = event?.currentTarget as HTMLButtonElement;
            setTimeout(() => {
                const buttonSelect = button?.parentElement?.parentElement?.querySelector("ul li button:disabled")?.getAttribute('data-dot');
                const index = Number(buttonSelect) + 1;
                const bar = button?.parentElement?.querySelector<HTMLElement>(".pivot");
                const newValue = (index / total) * 100;
                console.log({ v: total, p: Number(buttonSelect), newValue });
                if (!bar || !buttonSelect)
                    return;
                bar.style.width = `${newValue}%`;
            }, 600);
        }, slides?.length)}>
        {slides?.map((slide, index) => {
            return (<li class="carousel-item [&_button]:[filter:grayscale(1);] [&_button:disabled]:[filter:none]">
            <Slider.Dot index={index}>
              <div class="h-auto">
              <Image class="object-cover w-14 h-14 rounded-full" alt={slide?.alt} src={slide?.avatar || ""} width={56} height={56}/>
                {/* <div
                  class="w-2 h-2 rounded-full group-disabled:animate-progress dot"
                  style={{ animationDuration: `${interval}s` }}
                /> */}
              </div>
            </Slider.Dot>
          </li>);
        })}
      </ul>
    </>);
}
function Buttons(props: {
    total: number;
}) {
    const total = props.total || 0;
    return (<div class="flex gap-4 flex-[auto] items-center">
      <div class="bar-custom w-full h-[2px] bg-[#4C4B4B] flex items-center max-md:hidden">
        <div class="pivot h-full bg-[#76F5F7] transition-all" style={{ width: `${(1 / total) * 100}%` }}></div>
      </div>
      <div class="flex items-center justify-center z-10 col-start-1 row-start-2" hx-on:click={useScript((total) => {
            const button = event?.currentTarget as HTMLButtonElement;
            setTimeout(() => {
                const buttonSelect = button?.parentElement?.parentElement?.querySelector("ul li button:disabled")?.getAttribute('data-dot');
                const index = Number(buttonSelect) + 1;
                const bar = button?.parentElement?.querySelector<HTMLElement>(".pivot");
                const newValue = (index / total) * 100;
                console.log({ v: total, p: Number(buttonSelect), newValue });
                if (!bar || !buttonSelect)
                    return;
                bar.style.width = `${newValue}%`;
            }, 600);
        }, total)}>
        <Slider.PrevButton class="flex items-center justify-center btn-circle border border-base-content min-w-[65px] min-h-[65px]">
          <Icon class="text-base-content" id="ArrowRight2" width="55" height="21"/>
        </Slider.PrevButton>
      </div>
      <div class="flex items-center justify-center z-10 col-start-3 row-start-2" hx-on:click={useScript((total) => {
            const button = event?.currentTarget as HTMLButtonElement;
            setTimeout(() => {
                const buttonSelect = button?.parentElement?.parentElement?.querySelector("ul li button:disabled")?.getAttribute('data-dot');
                const bar = button?.parentElement?.querySelector<HTMLElement>(".pivot");
                const newValue = ((Number(buttonSelect) + 1) / total) * 100;
                console.log({ v: total, p: Number(buttonSelect), newValue });
                if (!bar || !buttonSelect)
                    return;
                bar.style.width = `${newValue}%`;
            }, 600);
        }, total)}>
        <Slider.NextButton class="flex items-center justify-center btn-circle border border-base-content min-w-[65px] min-h-[65px]">
        <Icon class="text-base-content" id="ArrowLeft2" width="55" height="21"/>
        </Slider.NextButton>
      </div>
    </div>);
}
function Carousel(props: Props) {
    const id = useId();
    const { title, slides, interval, mark = "", tag } = { ...DEFAULT_PROPS, ...props };
    return (<div id={id} class="min-h-min flex flex-col !px-4 py-28 lg:pt-28 lg:pb-36 lg:w-10/12 mx-auto">
      <div class="flex flex-col gap-4 2xl:max-w-[1360px] mx-auto w-full lg:pl-20">
          {tag && <p class="text-[#76F5F7] text-base ">{tag}</p>}
          {title && <p class="text-[#ababab] text-2xl md:text-[40px]  ">{title}</p>}        
          </div>
      <Slider class="carousel carousel-center w-full col-span-full row-span-full gap-6 lg:mt-32" rootId={id} interval={interval && interval * 1e3} infinite>
        {slides?.map((slide, index) => (<Slider.Item index={index} class="carousel-item max-w-[1520px] w-full">
            <SliderItem slide={slide} mark={mark} id={`${id}::${index}`}/>
          </Slider.Item>))}
      </Slider>

      <div class="flex justify-between pt-3  gap-6">
        {props.dots && <Dots slides={slides} interval={interval}/>}{" "}
        {props.arrows && <Buttons total={slides.length}/>}
      </div>
    </div>);
}
export default Carousel;
