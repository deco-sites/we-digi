import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
    /**
   * @title Title
   * @format rich-text
   * @default Click here to tweak this text however you want.
   */
  title: string;
  logoSrc: ImageWidget;
  /**
   * @title Title
   * @format rich-text
   * @default Click here to tweak this text however you want.
   */
  description: string;
  /**
   * @title Quadrante Image
   */
  image: ImageWidget;
  /**
   * @title Imagem de Fundo
   */
  background: ImageWidget;
}

export default function Achievements({
  title = "Nossa conquista",
  logoSrc = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngegg.com%2Fen%2Fsearch%3Fq%3Dvtex&psig=AOvVaw01Cpgt96qdxIFEvwM5KSrE&ust=1725478319330000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOCX_eTBp4gDFQAAAAAdAAAAABAE",
  description = "Estamos entre **as melhores agencias** de e-commerce",
  background,
  image,
}: Props) {
  return (
    <section class="flex items-center justify-center" style={{backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
      <div class="container mx-auto px-4 py-20 lg:flex lg:items-center lg:gap-8">
        {/* Bloco de Texto */}
        <div class="lg:w-1/2">
          <div
              class="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-8"
              dangerouslySetInnerHTML={{
                __html: title,
              }}
            />
          <Image
            width={227}
            class="h-auto object-cover"
            src={logoSrc}
            alt="Vtex"
            decoding="async"
            loading="lazy"
          />
          <div
              class="text-lg text-gray-600 mt-20"
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
        </div>

        {/* Bloco de Imagem */}
        <div class="lg:w-1/2 mt-8 lg:mt-0">
          <Image
            width={640}
            class="w-full h-auto object-cover"
            sizes="(max-width: 640px) 100vw, 50vw"
            src={image}
            alt="Imagem do Quadrante 2024"
            decoding="async"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
