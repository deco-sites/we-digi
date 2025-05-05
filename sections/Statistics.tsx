import { ImageWidget } from "apps/admin/widgets.ts";

/**
 * @title {{ text }}
 */
interface Item {
    number: number
    text: string
}

interface Props {
    title: string
    /**
     * @hide
     * @readonly
     */
    image: ImageWidget
    /**
     * @maxItems 3
     */
    items?: Item[]
    cta?: {
        label: string
        link: string
        /**
         * @title Cor de background do botão
         * @format color
         */
        bgColor?: string
    }
}

const Statistics = ({ items, title, cta, image }: Props) => {


    return (
        <div class="bg-[#f2f2f2] flex flex-col items-center justify-center lg:gap-11 gap-8 py-12">
            <div className="w-full overflow-hidden">
                <div className="animate-marquee inline-flex">
                    <span className="font-montSerrat whitespace-nowrap text-center lg:min-h-28 block font-light text-4xl lg:text-8xl text-[#d9d9d9] mr-4">
                        {title}
                    </span>
                    <span className="font-montSerrat whitespace-nowrap text-center lg:min-h-28 block font-light text-4xl lg:text-8xl text-[#d9d9d9] mr-4">
                        {title}
                    </span>
                    <span className=" font-montSerrat whitespace-nowrap text-center lg:min-h-28 block font-light text-4xl lg:text-8xl text-[#d9d9d9] mr-4">
                        {title}
                    </span>
                    <span className=" font-montSerrat whitespace-nowrap text-center lg:min-h-28 block font-light text-4xl lg:text-8xl text-[#d9d9d9] mr-4">
                        {title}
                    </span>
                </div>
            </div>
            <div class="flex flex-col lg:flex-row items-center justify-between w-full gap-8 max-w-[90vw]">
                {items?.map((item) => {
                    const angle = Math.floor(Math.random() * 361)

                    return (
                        <div class="flex flex-col relative items-center justify-center max-w-56 max-h-56 md:max-w-80 w-full h-full md:max-h-80 z-10">
                            <div class="relative z-0">
                                <img style={{ transform: `rotate(${angle}deg)` }} src={image} alt="circle" />
                            </div>
                            <div class="absolute z-10 flex flex-col items-center justify-center p-5">
                                <span class="text-6xl lg:text-8xl text-black font-montSerrat">+{item.number}</span>
                                <p class="text-base lg:text-3xl text-center text-[#858585] font-montSerrat">{item.text}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div class="flex items-center justify-center">
                {cta?.link && cta.label &&
                    <a style={{ backgroundColor: cta.bgColor ?? '#F0857D' }} class="py-3 px-8 font-bold rounded-xl hover:!brightness-75 transition-all text-sm text-black duration-300 ease-in-out" href={cta.link}>{cta.label}</a>
                }
            </div>
            <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          /* inline-flex garante que a largura seja o somatório dos spans */
          display: inline-flex;
          /* A animação move o container de 0 a -50% (ou seja, a largura de um texto) */
          animation: marquee 10s linear infinite;
        }
      `}</style>
        </div>
    )
}

export default Statistics