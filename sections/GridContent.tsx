import { ImageWidget } from "apps/admin/widgets.ts";

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

/** @title Lista de Imagens */
interface ImagesBlock {
    /**
   * @hide
   * @readonly
   */
    type?: 'Imagens',
    images: Array<Image>;
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
}

/** @title {{title}} */
type Block = StringBlock | ImagesBlock | CtaBlock;

interface Props {
    bg?: ImageWidget;
    /**
     * @title Largura máxima
     * @description Largura máxima do container quando desktop, deixe vazio para seguir o container do projeto
     */
    maxWidth?: number
    blocks: Block[];
}


interface BlockCTAProps {
    block: CtaBlock;
}
const BlockCTA = ({ block }: BlockCTAProps) => {
    return (
        <a
            style={block.bgColor ? {backgroundColor: `${block.bgColor}`} : {}}
            href={block.link}
            class="block w-fit px-8 py-3 rounded-xl [&_p]:text-sm hover:!brightness-75 transition-all duration-300 ease-in-out"
            dangerouslySetInnerHTML={{__html: block.label}}
        />
    )
}

interface BlockImagesProps {
    block: ImagesBlock;
}

const BlockImages = ({ block }: BlockImagesProps) => {
    return (
        <div class="flex flex-wrap lg:gap-8 gap-4 justify-center">
            {/* {block.images.map((image)=>(
                <img src={image.image} alt={image.alt} />
            ))} */}
            {block.images.map((img) => (
                <img src={img.image} alt={img.alt} />
            ))}
        </div>
    )
}

interface BlockTextProps {
    block: StringBlock;
}
const BlockText = ({ block }: BlockTextProps) => {

    return (
        <div
            dangerouslySetInnerHTML={{__html: block.text}}
            class="lg:[&_h2]:text-[40px] [&_h2]:text-xl lg:[&_p]:text-2xl [&_p]:text-base"
        />
    )
}

const GridContent = ({ bg, blocks, maxWidth }: Props) => {

    return (
        <div style={bg ? {backgroundImage: `url(${bg})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat'} : {}}>
            <div class="w-full h-full top-0 left-0 flex justify-center items-center py-16">
                <div style={maxWidth ? {maxWidth: `${maxWidth}px`} : {}} class="flex flex-col lg:gap-8 gap-4 items-center">
                    {blocks?.map((block) => {
                        return (
                            <>
                                {block.type === 'CTA' &&
                                    <BlockCTA block={block} />
                                }
                                {block.type === 'Imagens' &&
                                    <BlockImages block={block} />
                                }
                                {block.type === 'Texto' &&
                                    <BlockText block={block} />
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