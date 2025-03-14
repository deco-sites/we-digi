import { ImageWidget } from "apps/admin/widgets.ts";

/**
 * @title {{{title}}}
 */
interface Question {
    title: string;
    /** @format rich-text */
    answer: string;
}

interface Props {
    /**
     * @title Texto
     * @format rich-text
     */
    text?: string;
    image?: {
        /**
         * @title Imagem
         */
        src?: ImageWidget;
        alt?: string;
    }
    questions: Question[]
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

const FaqImage = ({ image, text, cta, questions }: Props) => {
    return (
        <div class="lg:max-w-[80%] lg:mx-auto px-4">
            <div>
                {text &&
                    <div
                        class="
                lg:[&_h2]:text-5xl lg:[&_h2]:my-8 [&_h2]:my-4 [&_h2]:text-4xl
                lg:[&_h3]:text-3xl [&_h3]:text-2xl [&_h3]:font-light lg:[&_h3]:my-6 [&_h3]:my-3
                lg:[&_h4]:text-2xl [&_h4]:text-lg [&_h4]:my-2 lg:[&_h4]:my-4
                lg:[&_p]:!text-lg [&_p]:!text-sm [&_p]:!font-light [&_p]:!my-3
                [&_ul]:list-disc [&_ul]:pl-8 lg:[&_ul_span]:!text-lg [&_ul_span]:!text-sm"
                        dangerouslySetInnerHTML={{ __html: text }}
                    />
                }
            </div>
            <div class="flex">
                {questions && questions.length > 0 &&
                    <div class="flex-1">
                        {questions?.map((question) => (
                            <details class="border-primary border-b group">
                                <summary class="text-lg cursor-pointer py-6 flex ">
                                    <span class="flex-auto">{question.title}</span>
                                    <span class="flex-none transition group-open:rotate-180 text-primary">
                                        <svg
                                            width="32"
                                            height="33"
                                            viewBox="0 0 32 33"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M8.17674 12.5577L8.17676 12.5577L8.5303 12.2041C8.53031 12.2041 8.53031 12.2041 8.53032 12.2041C8.62794 12.1065 8.78621 12.1065 8.88385 12.2041C8.88385 12.2041 8.88385 12.2041 8.88385 12.2041L15.6464 18.9667L16 19.3202L16.3535 18.9667L23.1161 12.2041C23.2138 12.1064 23.372 12.1064 23.4696 12.2041L23.8232 12.5577C23.9208 12.6553 23.9208 12.8135 23.8232 12.9112L16.1767 20.5577C16.0791 20.6553 15.9209 20.6553 15.8232 20.5577L8.17674 12.9112C8.17674 12.9112 8.17674 12.9112 8.17674 12.9112C8.07911 12.8135 8.07911 12.6553 8.17674 12.5577Z"
                                                fill="currentColor"
                                                stroke="currentColor"
                                            />
                                        </svg>
                                    </span>
                                </summary>
                                <p
                                    class="leading-relaxed mb-6 group-open:animate-fadeIn"
                                    dangerouslySetInnerHTML={{ __html: question.answer }}
                                >
                                </p>
                            </details>
                        ))}
                    </div>
                }
                {image?.src &&
                    <div class="hidden lg:flex flex-1 justify-end">
                        <div class="w-fit max-w-[420px]">
                            <img src={image?.src} alt={image?.alt ?? 'wedigi'} />
                        </div>
                    </div>
                }
            </div>
            {cta?.url &&
                <a class="block w-fit mt-4 px-5 py-1 rounded-[50px] font-light text-base lg:text-xl" style={{ backgroundColor: cta.bgColor ?? '#FFFFFF', color: cta.textColor ?? '#000000', }} href={cta.url}>{cta?.text ?? 'Botão'}</a>
            }
        </div>
    )
}

export default FaqImage