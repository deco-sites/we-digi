import { Rounded } from "site/components/RoundedSection/SvgRounded.tsx";

interface Props {
    /**
     * @title Descrição
     * @format textarea
     */
    description?: string
    link?:{
        label: string
        url: string
        /**
         * @title Cor de Background
         * @format color
         */
        bgColor?: string
    }
}

const RoundedSection = ({description, link}: Props) => {
    return (
        <div class="bg-[#f2f2f2] lg:py-12 py-8 px-4">
            <div class="flex items-center justify-center relative w-full max-w-[649px] mx-auto">
                <Rounded />
            </div>
            <div class="my-8">
                <p class="text-[#4C4B4B] text-2xl font-light text-center mb-3 max-w-[900px] mx-auto">{description}</p>
            </div>
            {link && link.label && link.url &&
                <a style={{backgroundColor: link.bgColor ?? '#BFF776' }} class="block rounded-[10px] text-black text-xs lg:text-sm w-fit py-3 px-8 hover:!brightness-75 transition-all duration-300 ease-in-out font-bold mx-auto" href={link.url}>{link.label}</a>
            }
        </div>
    )
}

export default RoundedSection