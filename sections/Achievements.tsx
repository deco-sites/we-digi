import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
    /**
   * @title Title
   * @format rich-text
   * @default Click here to tweak this text however you want.
   */
  title: string;
  /**
   * @title Title
   * @format rich-text
   * @default Click here to tweak this text however you want.
   */
  subtitle: string;
  logoSrc: ImageWidget;
  /**
   * @title Title
   * @format rich-text
   * @default Click here to tweak this text however you want.
   */
  description: string;
  image: ImageWidget;
}

export default function Achievements({
  title = "Nossa conquista",
  subtitle = "Quadrante 2024",
  logoSrc = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngegg.com%2Fen%2Fsearch%3Fq%3Dvtex&psig=AOvVaw01Cpgt96qdxIFEvwM5KSrE&ust=1725478319330000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOCX_eTBp4gDFQAAAAAdAAAAABAE",
  description = "Estamos entre **as melhores agencias** de e-commerce",
  image,
}: Props) {
  return (
    <section class="container mx-auto px-4 py-16 lg:flex lg:items-center lg:gap-8">
      {/* Bloco de Texto */}
      <div class="lg:w-1/2 space-y-6">
        <h1 class="text-4xl font-bold text-gray-900">{title}</h1>
        <h2 class="text-2xl font-light text-gray-600">{subtitle}</h2>
        <img src={logoSrc} alt="VTEX Logo" class="h-10 my-4" />
        <p class="text-lg text-gray-600">{description}</p>
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
    </section>
  );
}
