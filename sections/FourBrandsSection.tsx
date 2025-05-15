import { ImageWidget } from "apps/admin/widgets.ts";

/**@title {{ name }} */
interface Brand{
    logo: ImageWidget
    name: string
}

interface Props{
    /**
     * @title Título da Seção
     */
    title: string
    brands: Brand[]
    cta?:{
        text: string
        link: string
    }
    /**
     * @title Cor de Fundo
     * @format color
     */
    bgColor: string
}

const FourBrandsSection = ({title, brands, cta, bgColor}: Props) => {
    return (
        <div style={bgColor ? {backgroundColor: bgColor} : {}}>
            <div class="mx-auto max-w-[1000px] py-12 px-8 flex flex-col md:gap-12 gap-2">
                <h2 class=" text-center text-xl lg:text-3xl text-[#0a4a60]">{title}</h2>
                <div class="w-full flex items-center justify-between flex-wrap">
                    {brands.map((brand) => (
                        <div class="sm:w-auto w-1/2 flex items-center justify-center">
                            <img src={brand.logo} alt={brand.name} />
                        </div>
                    ))}
                </div>
                {cta?.link && cta.text &&
                    <a class="block w-fit text-center mx-auto rounded-[10px] text-xs text-black font-bold bg-[#FFED7B] hover:brightness-75 px-8 py-2 max-sm:mt-8" href={cta.link}>
                        {cta.text}
                    </a>
                }
            </div>
        </div>
    )
}

export default FourBrandsSection