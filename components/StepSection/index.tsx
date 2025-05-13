import { StepDesktop, StepMobile } from "./Svg.tsx";

interface Props {
    title: string
    description: string

    link?: {
        label: string
        url: string
        /**
         * @title Cor de Fundo
         * @format color
         */
        bgColor?: string
    }
}

const StepSection = ({ title, description, link }: Props) => {
    return (
        <div class="bg-[#F2F2F2] py-16 px-4 lg:py-8">
            <div>
                <h2 class="lg:text-4xl text-center text-[#0A4A60] mb-4 text-xl">{title}</h2>
                <p class="lg:text-2xl text-center font-light text-[#4C4B4B] text-base">{description}</p>
            </div>
            <div class="max-w-[395px] md:max-w-[620px] lg:max-w-[820px] mx-auto relative my-6 lg:my-10">
                <div class="hidden lg:block">
                    <StepDesktop />
                </div>
                <div class="block lg:hidden">
                    <StepMobile />
                </div>
                <div class="absolute w-full h-full top-0 left-0 z-[2]">
                    <div class="relative w-full h-full">
                        <div class="max-w-[270px] max-lg:w-[34%] absolute lg:left-[120px] lg:top-[90px] left-3 top-[calc(100%_/_4_-_50px)] md:top-[calc(100%_/_4_-_100px)] font-effraTrial">
                            <h3 class="text-[#0A4A60] font-bold text-xxs md:text-sm">Descobrimento do problema</h3>
                            <p class="text-xxs md:text-sm text-[#4C4B4B]">O consumidor inicia sua jornada buscando informações sobre produtos e serviços que possam atender suas necessidades.</p>
                        </div>
                        <div class="max-w-[270px] max-lg:w-[34%] absolute lg:left-3 lg:top-[210px] right-0 top-[calc(100%_/_4_+_35px)] md:top-[calc(100%_/_4_+_55px)] font-effraTrial ">
                            <h3 class="text-[#0A4A60] font-bold text-xxs md:text-sm">Consideração do problema</h3>
                            <p class="text-xxs md:text-sm text-[#4C4B4B]">Após avaliar as opções, o consumidor seleciona os possíveis solucionadores do problema</p>
                        </div>
                        <div class="max-w-[270px] max-lg:w-[34%] absolute lg:right-0 lg:bottom-[125px] max-lg:left-3 bottom-[calc(100%_/_4_+_5px)] font-effraTrial">
                            <h3 class="text-[#0A4A60] font-bold text-xxs md:text-sm">Comparação de soluções</h3>
                            <p class="text-xxs md:text-sm text-[#4C4B4B]">O consumidor compara as soluções entre diferentes promessas</p>
                        </div>
                        <div class="max-w-[270px] max-lg:w-[34%] absolute lg:bottom-2 lg:right-[106px] right-0 bottom-[calc(100%_/_4_-_80px)] md:bottom-[calc(100%_/_4_-_115px)] font-effraTrial">
                            <h3 class="text-[#0A4A60] font-bold text-xxs md:text-sm">Tomada de decisão</h3>
                            <p class="text-xxs md:text-sm text-[#4C4B4B]">Entende qual oferta é a melhor e toma a decisão de compra</p>
                        </div>
                    </div>
                </div>
            </div>
            {link && link.label && link.url &&
                <a style={{ backgroundColor: link.bgColor ?? '#BFF776' }} class="block rounded-[10px] text-black text-xs lg:text-sm w-fit py-3 px-8 max-sm:px-6 hover:!brightness-75 transition-all duration-300 ease-in-out font-bold mx-auto text-center" href={link.url}>{link.label}</a>
            }
        </div>
    )
}

export default StepSection