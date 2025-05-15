import { ImageWidget } from "apps/admin/widgets.ts";
/**@title {{ label }} */
interface Card {
    /**
     * @title Label (Somente visualização)
     */
    label:string
    /**
     * @title ìcone
     */
    icon: ImageWidget
    /**
     * @title Título
     * @format rich-text
     */
    title: string
    /**
     * @title Texto
     * @format rich-text
     */
    text: string
    link: string
    linkLabel?: string
    /**
     * @title Cor de Background
     * @format color
     */
    bgColor?: string
}

interface Props {
    /**
     * @title Texto
     * @format rich-text
     */
    text: string
    /**
     * @title Cor de Background da Seção
     * @format color
     */
    bgColor?: string
    cards: Card[]
}

interface CardProps {
    card: Card
}

const Card = ({ card }: CardProps) => {

    return (
        <div class="rounded-xl overflow-hidden md:flex-1 flex flex-col">
            <div class="bg-[#46c2ee] flex flex-col items-center p-4 gap-2">
                <img src={card.icon} alt={card.label} />
                <div dangerouslySetInnerHTML={{ __html: card.title }} />
                {/* <h3 class="lg:text-xl text-[#292D6B] font-bold text-center">{card.title}</h3> */}
            </div>
            <div class="bg-white py-5 px-4 flex-1 flex flex-col items-center justify-center gap-8">
                <div class="h-full flex justify-center">
                    <div class="[&_p]:text-sm" dangerouslySetInnerHTML={{ __html: card.text }} />
                    {/* <p class="text-black text-sm mb-8">{card.text}</p> */}
                </div>
                <a style={{ backgroundColor: card.bgColor ?? '#F0857D' }} class="text-black text-center text-sm font-bold w-full block px-8 py-3 rounded-xl hover:!brightness-75 transition-all duration-300 ease-in-out" href={card.link}>{card.linkLabel ?? 'TENHO INTERESSE'}</a>
            </div>
        </div>
    )
}

const TextWithCards = ({ cards, text, bgColor }: Props) => {
    return (
        <div style={bgColor ? { backgroundColor: bgColor } : {}}>
            <div class="flex flex-col xl:flex-row py-16 gap-8 max-w-[95vw] mx-auto items-center">
                <div class="lg:max-w-[25%]">
                    <div class="lg:[&_h2]:text-[40px] lg:[&_h2]:leading-[48px] [&_h2]:text-xl lg:[&_p]:text-base" dangerouslySetInnerHTML={{ __html: text }} />
                </div>
                <div class="flex-1 flex gap-8 flex-wrap">
                    {cards?.map((card, index) => (<Card card={card} key={index} />))}
                </div>
            </div>
        </div>
    )
}

export default TextWithCards