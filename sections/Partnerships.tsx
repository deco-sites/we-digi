import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

/**
 * @title {{{src}}}
 */
export interface Logo {
  src?: ImageWidget;
  /** @description text alternative */
  altText?: string;
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
  /**
   * @title Subtitle
   */
  description?: string;
  logos?: Logo[];
}

const IMG_PLACEHODLER = Array(30).fill(0).map(() => ({
  src:
    "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1527/03fbcc78-ca86-4616-a59a-b8aa18331a9c",
  altText: "Logo",
}));

export default function Partnerships({
  description = "we.digi",
  title = "we.digi",
  tag,
  logos = IMG_PLACEHODLER,
}: Props) {
  const slideContent = (
    <div class="flex items-center justify-around gap-14 md:gap-72">
      {logos?.map((logo) => {
        return (
          <Image
            src={logo.src || ""}
            alt={logo.altText || ""}
            width={110}
            class="h-auto object-cover max-h-full"
          />
        );
      })}
      {logos?.map((logo) => {
        return (
          <Image
            src={logo.src || ""}
            alt={logo.altText || ""}
            width={110}
            class="h-auto object-cover max-h-full"
          />
        );
      })}
    </div>
  );
  return (
    <div class="w-full mx-auto px-4 py-8 md:py-6 lg:py-20 bg-[#0C1E2A]">
      <div class="flex flex-col gap-4">
        {tag && <p class="text-[#76F5F7] text-base text-center">{tag}</p>}
        {title && <p class="text-[#7a7373] text-2xl md:text-[40px] text-center ">{title}</p>}        
        {description && <p class="text-white  px-2 text-base md:text-2xl text-center ">{description}</p>}
        <img class="my-2 mx-auto max-w-[75%]" src="https://deco-sites-assets.s3.sa-east-1.amazonaws.com/we-digi/0eee39dc-0b46-4ffd-b5a1-ff3bbe0f2fa6/box-dots.png"/>
        <div class="relative w-full overflow-hidden h-24 md:h-20">
          <div class="animate-sliding w-full absolute top-0 left-0 flex flex-nowrap h-20">
            {slideContent}
          </div>
        </div>
      </div>
    </div>
  );
}
