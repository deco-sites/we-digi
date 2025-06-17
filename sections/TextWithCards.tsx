import { ImageWidget } from "apps/admin/widgets.ts";
/**@title {{title}} */
interface Card {
    /**
     * @title ìcone
     */
    icon: ImageWidget
    /**
     * @title Título
     */
    title: string
    /**
     * @title Texto
     * @format textarea
     */
    text: string
    link: string
    linkLabel?: string
    /**
     * @title Cor de Background
     * @format color
     */
    bgColor?: string
    /**
      * @title Cor do texto do botão
      * @format color
    */
    textColor?: string
}

interface Props {
    /**
     * @title Texto
     * @format rich-text
     */
    text: string
    cards: Card[]
}

interface CardProps {
    card: Card
}

const Card = ({ card }: CardProps) => {

    return (
        <div class="rounded-xl overflow-hidden md:flex-1 flex flex-col max-w-96">
            <div class="bg-[#46c2ee] flex flex-col items-center p-4">
                <img src={card.icon} alt={card.title} />
                <h3 class="lg:text-xl text-[#292D6B] font-bold text-center">{card.title}</h3>
            </div>
            <div class="bg-white py-5 px-4 flex-1 flex flex-col items-center justify-center">
                <div class="h-full flex justify-center items-center">
                    <p class="text-black text-sm mb-8">{card.text}</p>
                </div>
                <a style={{ backgroundColor: card.bgColor ?? '#F0857D', color: card?.textColor ?? '#000000'  }} class="text-center text-sm font-bold w-full block px-8 py-3 rounded-xl hover:!brightness-75 transition-all duration-300 ease-in-out" href={card.link}>{card.linkLabel ?? 'TENHO INTERESSE'}</a>
            </div>
        </div>
    )
}

const TextWithCards = ({ cards, text }: Props) => {
    return (
        <div class="bg-[#F2F2F2] ">
            <div class="flex flex-col xl:flex-row py-16 gap-8 max-w-[94vw] mx-auto items-center">
                <div class="flex-1">
                    <div class="lg:[&_h2]:text-[40px] lg:[&_h2]:leading-[48px] [&_h2]:text-xl lg:[&_p]:text-base" dangerouslySetInnerHTML={{ __html: text }} />
                </div>
                <div class="2xl:flex-1 lg:flex-[2] flex-1 flex gap-8 flex-wrap md:flex-row flex-col md:justify-center">
                    {cards?.map((card, index) => (<Card card={card} key={index} />))}
                </div>
            </div>
        </div>
    )
}

export default TextWithCards