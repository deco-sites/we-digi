interface Props{
    /**
     * @title Texto
     * @format rich-text
     */
    text:string

    /**
     * @title Cor de Background da Seção
     * @format color-input
     */
    bgColor?: string;

    cta?: {
        /**
        * @title Texto do Botão
        */
        text?: string;
        /**
         * @title URL de redirecionamento
         */
        url?: string;
        /**
        * @title Cor de Background do botão
        * @format color-input
        */
        bgColor?: string;
        /**
        * @title Cor de Texto
        * @format color-input
        */
        textColor?: string;
    }
}

const RichText = ({ text }:Props) => {
  return (
    <div class="lg:max-w-[80%] mx-auto px-4">
        <div
            class="
                max-[1024px]:p-4
                lg:[&_h2]:text-5xl lg:[&_h2]:my-8 [&_h2]:my-4 [&_h2]:text-4xl
                lg:[&_h3]:text-3xl [&_h3]:text-2xl [&_h3]:font-light lg:[&_h3]:my-6 [&_h3]:my-3
                lg:[&_h4]:text-2xl [&_h4]:text-lg [&_h4]:my-2 lg:[&_h4]:my-4
                lg:[&_p]:!text-lg [&_p]:!text-sm [&_p]:!font-light [&_p]:!my-3
                [&_ul]:list-disc [&_ul]:pl-8 lg:[&_ul_span]:!text-lg [&_ul_span]:!text-sm"
            dangerouslySetInnerHTML={{ __html: text }}
        />
    </div>
  )
}

export default RichText