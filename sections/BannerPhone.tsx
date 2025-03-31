import { ImageWidget } from "apps/admin/widgets.ts";


/**@title {{ alt }} */
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

interface Props {
    /**
     * @format rich-text
     */
    text1: string
    bg: ImageWidget
    images?: Image[]
    /**
     * @format rich-text
     */
    text2: string
    cta?: {
        label: string
        link: string
    }
}

const BannerPhone = ({ text1, text2 }: Props) => {
    return (
        <div class="flex">
            <div>
                <div dangerouslySetInnerHTML={{ __html: text1 }} />
            </div>
            <div>
                
            </div>
            <div>
                <div dangerouslySetInnerHTML={{ __html: text2 }} />
            </div>
        </div>
    )
}

export default BannerPhone