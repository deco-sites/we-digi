import { ImageWidget } from "apps/admin/widgets.ts";

/**@title {{ title }} */
interface Card {
    image: ImageWidget
    icon: ImageWidget
    title: string
}

interface Props {
    /**
     * @title Cor de Background da seção
     * @format color
     */
    bgColor?: string
    cards?: Card[]
}

const SectionCards = ({ bgColor, cards }: Props) => {

    if (!cards) return null

    return (
        <div style={bgColor ? { backgroundColor: bgColor } : {}}>
            <div class="flex flex-col md:flex-row mx-auto max-w-[1514px] gap-8 lg:py-12 py-4 px-4">
                {cards.map((card, index) => (
                    <div>
                        <div class="w-full lg:max-w-[485px] rounded-[10px] h-[204px] overflow-hidden">
                            <img class="w-full h-full object-cover" src={card.image} alt={card.title} />
                        </div>
                        <div class="flex justify-center items-center gap-4 lg:mt-6 mt-2">
                            <img src={card.icon} alt={card.title} />
                            <h2 class="text-sm lg:text-xl font-medium text-white">{card.title}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SectionCards