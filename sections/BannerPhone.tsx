import { ImageWidget } from "apps/admin/widgets.ts";
import PhoneSlider from 'site/islands/PhoneSlider.tsx'

/**@title {{ alt }} */
export interface Image {
    /**
     * @title Imagem
     */
    image: ImageWidget
    /**
     * @title Texto alternativo
     */
    alt: string
}

interface Props {
    /**
     * @format rich-text
     */
    text1: string
    bg: ImageWidget
    images?: Image[]
    /**
     * @hide
     * @readonly
     */
    phoneImage: ImageWidget
    /**
     * @format rich-text
     */
    text2: string
    cta?: {
        label: string
        link: string
        /**
         * @title Cor de background do botão
         * @format color
         */
        bgColor?: string
        /**
         * @title Cor do texto do botão
         * @format color
         */
        textColor?: string
    }
}

const BannerPhone = ({ text1, text2, phoneImage, cta, bg, images }: Props) => {
    return (
        <div class="pb-5" style={bg ? { backgroundImage: `url(${bg})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' } : {}}>
            <header class="w-full flex items-center justify-center py-10">
                <a href="/">
                    <img src='https://assets.decocache.com/we-digi/c16836f8-c94a-46d3-80ce-147d8835149b/logo-wedigi-1.png' alt="" />
                </a>
            </header>
            <div class="flex flex-col lg:flex-row justify-between w-full max-w-[94vw] mx-auto gap-5">
                <div class="max-w-[500px] [&_h1]:text-xl md:[&_h1]:text-3xl lg:[&_h1]:text-4xl xl:[&_h1]:text-5xl 2xl:[&_h1]:text-6xl [&_h1]:font-extralight max-md:[&_h1]:text-center [&_h1]:text-white">
                    <div dangerouslySetInnerHTML={{ __html: text1 }} />
                </div>
                <div class="w-full">
                    {images && images?.length > 0 && phoneImage &&
                        <PhoneSlider phoneImage={phoneImage} images={images} />
                    }
                </div>
                <div class="max-w-[500px] flex items-center lg:items-start justify-end flex-col">
                    <div class="max-md:[&_p]:text-center [&_p]:text-xl md:[&_p]:text-2xl lg:[&_p]:text-3xl xl:[&_p]:text-4xl [&_p]:font-extralight text-white" dangerouslySetInnerHTML={{ __html: text2 }} />
                    {cta && cta.label && cta.link &&
                        <a style={{ backgroundColor: cta.bgColor ?? '#F0857D', color: cta?.textColor ?? '#000000'}} class="py-3 mt-11 px-8 font-bold rounded-xl hover:!brightness-75 transition-all text-sm duration-300 ease-in-out" href={cta.link}>{cta.label}</a>
                    }
                </div>
            </div>
            <div class="hidden lg:flex w-full justify-center items-center">
                <svg width="78" height="78" viewBox="0 0 78 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_5_151)">
                        <path d="M26 45.875C28.5558 48.5299 35.359 59 39 59M39 59C42.641 59 49.4442 48.5299 52 45.875M39 59V17" stroke="#76F5F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                    <defs>
                        <clipPath id="clip0_5_151">
                            <rect width="31" height="54" fill="white" transform="translate(23.5 12)" />
                        </clipPath>
                    </defs>
                </svg>
            </div>
        </div>
    )
}

export default BannerPhone