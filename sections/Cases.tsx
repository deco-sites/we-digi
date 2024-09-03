import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import CasesGrid from "site/components/CasesGrid.tsx";
import type { CaseType } from "site/components/CasesGrid.tsx";


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
  cases?: CaseType[];
}

// const IMG_PLACEHODLER = Array(30).fill(0).map(() => ({
//   src:
//     "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1527/03fbcc78-ca86-4616-a59a-b8aa18331a9c",
//   altText: "Logo",
// })); 

export default function Cases({
  title = "Edit this heading however you want",
  cases = [],
}: Props) {
  const slideContent = (
    <div class="flex items-center gap-20">
      {logos?.map((logo) => {
        return (
          <Image
            src={logo.src || ""}
            alt={logo.altText || ""}
            width={110}
            height={25}
          />
        );
      })}
    </div>
  );
  return (
    <div class="lg:container md:max-w-6xl lg:mx-auto mx-4 py-6 lg:py-14">
      <div class="flex flex-col gap-12">
        <p class="text-center text-lg">{title}</p>
        <CasesGrid cases={cases} />
      </div>
    </div>
  );
}
