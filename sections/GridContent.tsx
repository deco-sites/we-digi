import { ImageWidget } from "apps/admin/widgets.ts";

/** @title {{ text }} */
interface Cards {
    /**
     * @title Ícone
     */
    icon: ImageWidget
    /**
     * @title Título
     */
    text: string;
    /**
     * @title Texto
     * @format textarea
     */
    text2?: string;
}

/** @title Texto */
interface StringBlock {
    /**
   * @hide
   * @readonly
   */
    type?: 'Texto',
    /**
     * @format rich-text
     */
    text: string;
    maxWidth?: number;
}

/** @title {{ alt }} */
interface Image {
    /**
     * @title Imagem
     */
    image: ImageWidget
    /**
     * @title Texto alternativo
     */
    alt: string
}

/** @title Lista de Cards */
interface CardsBlock {
    /**
   * @hide
   * @readonly
   */
    type: 'Cards',
    images: Array<Cards>;
    /**
     * @title Cor de background dos cards
     * @format color
     */
    cardsBgColor?: string;
    /**
     * @title Cor do texto dos cards
     * @format color
     */
    cardsColor?: string;
}

/** @title CTA */
interface CtaBlock {
    /**
   * @hide
   * @readonly
   */
    type?: 'CTA',
    /**
     * @format rich-text
     */
    label: string;
    link: string;
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

/** @title {{title}} */
type Block = StringBlock | CardsBlock | CtaBlock;

interface Props {
    /**
     * @title Bloco com layout flex
     */
    flexLayout?: boolean;
    /**
     * @title Imagem de Fundo
     */
    bg?: ImageWidget;
    /**
     * @title Cor de Fundo
     * @format color
     */
    bgColor?: string
    /**
     * @title Largura máxima
     * @description Largura máxima do container quando desktop, deixe vazio para seguir o container do projeto
     */
    maxWidth?: number
    blocks: Block[];
    /**
     * @title Cards com layout flex
     */
    flex?: boolean;
    fourCols?: boolean;
    notBoldCards?: boolean;
}


interface BlockCTAProps {
    block: CtaBlock;
}
const BlockCTA = ({ block }: BlockCTAProps) => {
    return (
        <a
            style={{
            ...(block.bgColor ? { backgroundColor: block.bgColor } : {}),
            color: block?.textColor ?? '#000000',
            }}
            href={block.link}
            class="block w-fit px-8 max-sm:px-6 text-center py-3 rounded-xl [&_p]:text-sm hover:!brightness-75 transition-all duration-300 ease-in-out lg:[&_br]:hidden" dangerouslySetInnerHTML={{ __html: block.label }}
        />
    )
}

// interface BlockImagesProps {
//     block: ImagesBlock;
// }

// const BlockImages = ({ block }: BlockImagesProps) => {
//     return (
//         <div class="flex flex-wrap lg:gap-8 gap-4 justify-center">
//             {/* {block.images.map((image)=>(
//                 <img src={image.image} alt={image.alt} />
//             ))} */}
//             {block.images.map((img) => (
//                 <img src={img.image} alt={img.alt} />
//             ))}
//         </div>
//     )
// }background: linear-gradient(255.81deg, #46C2EE -7.22%, #0A4A60 99.2%);


interface BlockCards{
    block: CardsBlock
    flex?: boolean
    fourCols?: boolean
    notBoldCards?: boolean
    flexLayout?: boolean
}

const BlockCards = ({block, flex, fourCols, notBoldCards, flexLayout}:BlockCards) => {

    return(
        <div class={`gap-4 lg:gap-8 ${flex ? 'flex flex-wrap justify-center items-stretch' : fourCols ? `grid grid-cols-2 md:grid-cols-4` : 'grid grid-cols-2 md:grid-cols-3' }`}>
            {block.images.map((item)=>(
                <div class={`${flex ? flexLayout ? 'w-[47%] lg:px-14' : 'lg:w-[30%] lg:px-4' : 'w-full lg:max-w-[240px] lg:px-4'} gap-2 rounded-xl flex flex-col items-center justify-center px-2 py-6 `} style={{color: block.cardsColor ?? '#FFFFFF', background: block.cardsBgColor ?? "linear-gradient(255.81deg, #46C2EE -7.22%, #0A4A60 99.2%)" }}>
                    <img class={`${flexLayout ? 'max-w-16' : 'max-w-11'} w-full`} src={item.icon} alt={item.text} />
                    <h3 class={`text-sm ${notBoldCards ? '' : 'font-bold'} text-center`}>{item.text}</h3>
                    {item?.text2 &&
                        <p class="lg:text-sm text-xs text-center">{item.text2}</p>
                    }
                </div>
            ))}
        </div>
    )
}

interface BlockTextProps {
    block: StringBlock;
    flexLayout?: boolean;
}
const BlockText = ({ block, flexLayout }: BlockTextProps) => {
    return (
        <div
            dangerouslySetInnerHTML={{ __html: block.text }}
            class={`${flexLayout ? '' : 'lg:[&_h2]:text-center' } [&_h2]:text-left lg:[&_h2]:text-[40px]/[1.2] [&_h2]:text-2xl lg:[&_p]:text-2xl [&_p]:text-base [&_ul]:text-left lg:[&_ul]:text-center [&_li]:list-disc lg:[&_li]:list-none [&_ul]:pl-5 lg:[&_ul]:pl-0 lg:[&_ul]:text-2xl [&_ul]:text-base`} style={block.maxWidth ? { maxWidth: `${block.maxWidth}px` } : {}}
        />
    )
}

const GridContent = ({flexLayout, bg, bgColor, blocks, maxWidth, flex, fourCols, notBoldCards }: Props) => {

    return (
        <div style={bg ? { backgroundImage: `url(${bg})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' } : bgColor ? { backgroundColor: bgColor ?? '#08151D' } : {} }>
            <div class={`w-full h-full top-0 left-0 flex justify-center items-center py-8 px-4 ${flexLayout ? 'lg:py-28' : 'lg:py-16'}`}>
                <div style={maxWidth ? { maxWidth: `${maxWidth}px` } : {}} class={`flex items-center ${flexLayout ? 'gap-4 lg:gap-12 max-[1024px]:flex-col' : 'flex-col lg:gap-8 gap-6 '}`}>
                    {blocks?.map((block) => {
                        return (
                            <>
                                {block.type === 'CTA' &&
                                    <BlockCTA block={block} />
                                }
                                {block.type === 'Cards' &&
                                    <BlockCards block={block} flex={flex} fourCols={fourCols} notBoldCards={notBoldCards} flexLayout={flexLayout}/>
                                }
                                {block.type === 'Texto' &&
                                    <BlockText block={block} flexLayout={flexLayout}/>
                                }
                            </>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default GridContent