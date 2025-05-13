import { ImageWidget } from "apps/admin/widgets.ts";


/**@title {{ title }} */
interface Brand {
    /**
     * @title Nome da Marca
     */
    title: string
    /**
     * @title Imagem
     */
    image: ImageWidget
}

interface Props {
    /**
     * @title Título da Seção
     */
    title: string
    /**
     * @title Cor de fundo
     * @format color
     */
    bgColor?: string
    /**
     * @title Marcas
     */ 
    brands?: Brand[]
}

const SimpleBrands = ({ bgColor, brands, title }: Props) => {
    return (
        <div class="py-5 border-b border-b-[#ABABAB]" style={{ backgroundColor: bgColor }}>
            <h2 class="lg:text-3xl text-xl text-[#0A4A60] text-center" >{title}</h2>
            <div class="w-full overflow-hidden">
                <div class="flex w-full animate-marquee h-52">
                    {brands?.map((brand, index) => (
                        <div class="flex items-center justify-center min-w-[50vw] md:min-w-[20vw]" key={index}>
                            <img src={brand.image} alt={brand.title} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SimpleBrands