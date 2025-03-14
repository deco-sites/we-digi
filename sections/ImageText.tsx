import { ImageWidget } from "apps/admin/widgets.ts";

interface Props {
    /**
     * @title Texto
     * @format rich-text
     */
    text: string;
    /**
     * @title Imagens
     */
    image: {
        /**
         * @title Imagem Mobile
         */
        mobile?: ImageWidget;
        /**
        * @title Imagem Desktop
        */
        desktop?: ImageWidget;
        alt?: string;
    }
    /**
     * @title Cor de Background da Seção
     * @format color-input
     */
    bgColor?: string;
    cta?: {
        /**
        * @title Texto do Botão
        */
        text?: string;
        /**
         * @title URL de redirecionamento
         */
        url?: string;
        /**
        * @title Cor de Background do botão
        * @format color-input
        */
        bgColor?: string;
        /**
        * @title Cor de Texto
        * @format color-input
        */
        textColor?: string;
    }
    /**
     * @title Inverter Ordem?
     * @description Inverte ordem imagem/texto ~ texto/imagem
     */
    invert?: boolean
}

const ImageText = ({ text, image, bgColor, cta, invert }: Props) => {
    return (
        <div class={`flex flex-col py-4 max-[1024px]:pt-0 ${invert ? 'lg:flex-row-reverse' : 'lg:flex-row'}`} style={{backgroundColor: bgColor ?? '#08151D'}}>
            <div class="w-full lg:w-fit">
                <picture class="lg:w-full">
                    {image.desktop && image.mobile &&
                        <source srcSet={image.desktop} media="(min-width: 1024px)" />
                    }
                    <img class="max-[1024px]:w-full" src={image.mobile ?? image.desktop} alt={image.alt ?? 'imagem'} />
                </picture>
            </div>
            <div class="w-full flex items-center justify-center">
                <div class="lg:w-4/6 flex flex-col items-center lg:items-start">
                    <div class="max-[1024px]:p-4 lg:[&_h2]:text-5xl lg:[&_h2]:mb-8 [&_h2]:mb-4 [&_h2]:text-4xl lg:[&_h3]:text-3xl [&_h3]:text-2xl [&_h3]:font-light lg:[&_h3]:mb-6 [&_h3]:mb-3 lg:[&_p]:!text-lg [&_p]:!text-sm [&_p]:!font-light [&_ul]:list-disc [&_ul]:pl-8 lg:[&_ul_span]:!text-lg [&_ul_span]:!text-sm [&_p]:!my-3" dangerouslySetInnerHTML={{ __html: text }} />
                    {cta?.url &&
                        <a class="block w-fit mt-4 px-5 py-1 rounded-[50px] font-light text-base lg:text-xl" style={{ backgroundColor: cta.bgColor ?? '#FFFFFF', color: cta.textColor ?? '#000000',}} href={cta.url}>{cta?.text ?? 'Botão'}</a>
                    }
                </div>
            </div>
        </div>
    )
}

export default ImageText