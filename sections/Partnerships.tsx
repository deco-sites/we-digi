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
   * @format rich-text
   * @default Click here to tweak this text however you want.
   */
  title?: string;
  logos?: Logo[];
}

const IMG_PLACEHODLER = Array(30).fill(0).map(() => ({
  src:
    "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1527/03fbcc78-ca86-4616-a59a-b8aa18331a9c",
  altText: "Logo",
}));

export default function Partnerships({
  title = "Edit this heading however you want",
  logos = IMG_PLACEHODLER,
}: Props) {
  const slideContent = (
    <div class="flex items-center justify-around gap-72">
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
    <div class="w-full mx-auto py-6 lg:py-20 bg-[#0C1E2A]">
      <div class="flex flex-col gap-24">
        <div
              class="text-center text-lg [&_a]:[margin:0_0_16px] [&_img]:[margin:16px_auto] flex flex-col gap-4"
              dangerouslySetInnerHTML={{
                __html: title,
              }}
            />
        <div class="relative w-full overflow-hidden h-20">
          <div class="animate-sliding w-full absolute top-0 left-0 flex flex-nowrap h-20">
            {slideContent}
          </div>
        </div>
      </div>
    </div>
  );
}
