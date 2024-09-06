import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";


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
  cases?: CaseType[];
}

/**
 * @title {{{title}}}
 */
export interface CaseType {
  title: string; // Rich text
  link: string;
  buttonText: string;
  image: ImageWidget; // Caminho para a imagem
}

// const IMG_PLACEHODLER = Array(30).fill(0).map(() => ({
//   src:
//     "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1527/03fbcc78-ca86-4616-a59a-b8aa18331a9c",
//   altText: "Logo",
// })); 

export default function CasesComponent({
  title = "Edit this heading however you want",
  cases = [],
}: Props) {
  const oddItems = cases.filter((_, index) => index % 2 === 0); // Pares
  const evenItems = cases.filter((_, index) => index % 2 !== 0); // Ímpares
  return (
    <div class="lg:container md:max-w-6xl lg:mx-auto mx-4 py-6 lg:py-14">
      <div class="flex flex-col gap-12">
      <div
              class="text-center text-lg"
              dangerouslySetInnerHTML={{
                __html: title,
              }}
            />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 grid-flow-dense">
          <div class="flex flex-col gap-8">
          {oddItems?.map((item, index) => {
            return (
              <div key={index} class="relative group h-auto overflow-hidden">
              <Image
                width={227}
                class="w-full h-auto object-cover group-hover:scale-110"
                src={item.image}
                alt="Vtex"
                decoding="async"
                loading="lazy"
              />
              <div class="absolute w-full p-16 md:p-36 inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center group-hover:opacity-100 transition-opacity">
                <h3
                  class="text-xl font-bold text-white text-center"
                  dangerouslySetInnerHTML={{ __html: item.title }}
                ></h3>
                <a
                  href={item.link}
                  class="mt-4 btn btn-outline"
                >
                  {item.buttonText}
                </a>
              </div>
            </div>
            )
          })}
          </div>
          <div class="flex flex-col gap-8">
          {evenItems?.map((item, index) => {
            return (
              <div key={index} class="relative group h-auto">
              <Image
                width={227}
                class="w-full h-auto object-cover"
                src={item.image}
                alt="Vtex"
                decoding="async"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <h3
                  class="text-xl font-bold text-white text-center"
                  dangerouslySetInnerHTML={{ __html: item.title }}
                ></h3>
                <a
                  href={item.link}
                  class="mt-4 btn btn-primary"
                >
                  {item.buttonText}
                </a>
              </div>
            </div>
            )
          })}
          </div>
        </div>
      </div>
    </div>
  );
}
