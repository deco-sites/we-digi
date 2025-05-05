import { ImageWidget } from "apps/admin/widgets.ts";
import ModalContactIsland from "../islands/ModalContact.tsx";

export interface Props {
    /**
     * @title Texto
     * @format rich-text
     */
    text: string
    link?: {
        label: string
        url: string
        /**
         * @title Cor de fundo
         * @format color
         */
        bgColor?: string
    }
    bg:ImageWidget
}

const ModalContact = (props:Props) => {
    return (
        <div>
            <ModalContactIsland {...props} />
        </div>
    )
}

export default ModalContact