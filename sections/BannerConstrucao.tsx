import { ImageWidget } from "apps/admin/widgets.ts";
import PhoneSlider from 'site/islands/PhoneSlider.tsx'

/**@title {{ alt }} */
export interface Image {
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

const BannerConstrucao = ({ text1, text2, cta, bg, images }: Props) => {
    return (
        <div class="pb-5 relative flex flex-col items-center justify-center min-h-[800px]" style={bg ? { backgroundImage: `url(${bg})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' } : {}}>
            <header class="w-full flex items-center justify-center py-10 relative z-10">
                <a href="/">
                    <img src='https://assets.decocache.com/we-digi/c16836f8-c94a-46d3-80ce-147d8835149b/logo-wedigi-1.png' alt="" />
                </a>
            </header>
            <div class="flex flex-col lg:flex-row justify-between w-full max-w-[94vw] gap-5 h-full mx-auto flex-1 relative z-10">
                <div class="lg:max-w-[500px] [&_h1]:text-xl md:[&_h1]:text-3xl lg:[&_h1]:text-4xl xl:[&_h1]:text-5xl 2xl:[&_h1]:text-6xl [&_h1]:font-extralight max-md:[&_h1]:text-center [&_h1]:text-white flex-[2] text-center lg:text-left z-10">
                    <div dangerouslySetInnerHTML={{ __html: text1 }} />
                    {cta && cta.label && cta.link &&
                        <div class="animate-boxShadowCycle w-fit rounded-xl mx-auto hidden lg:block">
                            <a class="py-3 block w-fit mt-11 px-8 animate-backgroundCycle font-bold rounded-xl  text-sm text-black cursor-pointer mx-auto lg:mx-0" href={cta.link}>{cta.label}</a>
                        </div>
                    }
                </div>
                <div class="w-full lg:min-h-[600px] min-h-[50vh] flex-[3] flex items-center justify-center">
                    {images && images?.length > 0 &&
                        <PhoneSlider images={images} construction={true} />
                    }
                </div>
                <div class="lg:max-w-[500px] flex items-center lg:items-start justify-end flex-col flex-[2]">
                    {cta && cta.label && cta.link &&
                        <div class="animate-boxShadowCycle w-fit rounded-xl mx-auto block lg:hidden mb-3">
                            <a class="py-3 block w-fit px-8 animate-backgroundCycle font-bold rounded-xl text-sm text-black cursor-pointer mx-auto lg:mx-0" href={cta.link}>{cta.label}</a>
                        </div>
                    }
                    <div class="max-md:[&_p]:text-center [&_p]:text-xl md:[&_p]:text-2xl text-center lg:text-left lg:[&_p]:text-3xl [&_p]:font-extralight text-white" dangerouslySetInnerHTML={{ __html: text2 }} />
                </div>
            </div>
            <div class="absolute w-full h-full flex items-center justify-center z-0">
                <svg class="max-w-[900px] mx-auto w-[90%] lg:w-[45%]" width="100%" viewBox="0 0 1061 613" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_9_381)">
                        <path d="M123.03 1.31067H939.013C952.92 1.31067 964.221 12.6744 964.221 26.6596V587.651H97.8351V26.6596C97.8351 12.6744 109.136 1.31067 123.043 1.31067H123.03Z" stroke="white" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M941.698 37.7087H119.342V556.47H941.698V37.7087Z" stroke="white" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M619.113 587.743V595.961C617.302 596.302 615.451 596.472 613.587 596.472H447.387C445.536 596.472 443.686 596.302 441.861 595.961V587.743H619.1H619.113Z" stroke="white" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M430.169 594.073C430.169 594.073 437.99 594.611 441.9 595.922H619.165C619.165 595.922 624.379 594.611 629.593 594.073H1058.9C1059.05 594.073 1059.08 594.283 1058.94 594.323C1021.98 605.83 983.499 611.676 944.8 611.676H116.252C77.5538 611.676 39.0767 605.817 2.11159 594.323C1.96822 594.283 2.00732 594.073 2.1507 594.073H430.156" stroke="white" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M1059.7 587.743V594.074H633.047C628.837 594.074 624.666 594.676 620.573 595.66C620.091 595.777 619.609 595.882 619.113 595.974V587.756H1059.7V587.743Z" stroke="white" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M244.347 214.388H155.096C149.563 214.388 145.07 209.881 145.07 204.332V87.0377C145.07 81.4885 149.563 76.9814 155.096 76.9814H244.347C249.879 76.9814 254.373 81.4885 254.373 87.0377V204.332C254.373 209.881 249.879 214.388 244.347 214.388ZM155.124 79.8547C151.164 79.8547 147.962 83.0659 147.962 87.0377V204.332C147.962 208.304 151.164 211.515 155.124 211.515H244.375C248.335 211.515 251.536 208.304 251.536 204.332V87.0377C251.536 83.0659 248.335 79.8547 244.375 79.8547H155.124Z" fill="#848484" fill-opacity="0.5" />
                        <path d="M222.359 122.98C225.323 110.431 217.584 97.8468 205.072 94.8734C192.56 91.8999 180.014 99.6627 177.05 112.212C174.085 124.762 181.825 137.345 194.336 140.319C206.848 143.292 219.394 135.529 222.359 122.98Z" fill="#D9D9D9" fill-opacity="0.5" />
                        <path d="M238.533 153.544H159.926V163.178H238.533V153.544Z" fill="#D9D9D9" fill-opacity="0.5" />
                        <path opacity="0.5" d="M231.316 169.488H167.116V175.459H231.316V169.488Z" fill="#D9D9D9" fill-opacity="0.5" />
                        <path opacity="0.5" d="M219.689 180.304H178.771V186.276H219.689V180.304Z" fill="#D9D9D9" fill-opacity="0.5" />
                        <path opacity="0.5" d="M224.126 191.149H174.333V197.121H224.126V191.149Z" fill="#D9D9D9" fill-opacity="0.5" />
                        <path d="M244.347 376.905H155.096C149.563 376.905 145.07 372.398 145.07 366.848V249.554C145.07 244.005 149.563 239.498 155.096 239.498H244.347C249.879 239.498 254.373 244.005 254.373 249.554V366.848C254.373 372.398 249.879 376.905 244.347 376.905ZM155.124 242.371C151.164 242.371 147.962 245.582 147.962 249.554V366.848C147.962 370.82 151.164 374.031 155.124 374.031H244.375C248.335 374.031 251.536 370.82 251.536 366.848V249.554C251.536 245.582 248.335 242.371 244.375 242.371H155.124Z" fill="#848484" fill-opacity="0.5" />
                        <path d="M222.359 285.496C225.323 272.947 217.584 260.363 205.072 257.39C192.56 254.416 180.014 262.179 177.05 274.728C174.085 287.278 181.825 299.862 194.336 302.835C206.848 305.809 219.394 298.046 222.359 285.496Z" fill="#D9D9D9" fill-opacity="0.5" />
                        <path d="M238.533 316.06H159.926V325.694H238.533V316.06Z" fill="#D9D9D9" fill-opacity="0.5" />
                        <path opacity="0.5" d="M231.316 332.004H167.116V337.975H231.316V332.004Z" fill="#D9D9D9" fill-opacity="0.5" />
                        <path opacity="0.5" d="M219.689 342.82H178.771V348.792H219.689V342.82Z" fill="#D9D9D9" fill-opacity="0.5" />
                        <path opacity="0.5" d="M224.126 353.665H174.333V359.637H224.126V353.665Z" fill="#D9D9D9" fill-opacity="0.5" />
                        <path d="M70.5751 512.132H6.10352e-05V519.54H70.5751V512.132Z" fill="#D9D9D9" fill-opacity="0.5" />
                        <path d="M64.537 498.244H6.10352e-05V505.653H64.537V498.244Z" fill="#D9D9D9" fill-opacity="0.5" />
                        <path d="M41.4239 484.357H6.10352e-05V491.766H41.4239V484.357Z" fill="#D9D9D9" fill-opacity="0.5" />
                        <path d="M60.7176 470.442H6.10352e-05V477.85H60.7176V470.442Z" fill="#D9D9D9" fill-opacity="0.5" />
                        <path d="M28.1643 376.354C17.3239 376.354 8.53357 385.17 8.53357 396.043C8.53357 406.917 17.3239 415.733 28.1643 415.733C39.0047 415.733 47.7949 406.917 47.7949 396.043C47.7949 385.17 39.0047 376.354 28.1643 376.354ZM37.2073 397.903H29.9897V405.142C29.9897 406.156 29.1753 406.973 28.1643 406.973C27.1533 406.973 26.3388 406.156 26.3388 405.142V397.903H19.1212C18.1102 397.903 17.2958 397.086 17.2958 396.072C17.2958 395.058 18.1102 394.241 19.1212 394.241H26.3388V387.001C26.3388 385.987 27.1533 385.17 28.1643 385.17C29.1753 385.17 29.9897 385.987 29.9897 387.001V394.241H37.2073C38.2183 394.241 39.0328 395.058 39.0328 396.072C39.0328 397.086 38.2183 397.903 37.2073 397.903Z" fill="#D9D9D9" fill-opacity="0.5" />
                        <g opacity="0.5">
                            <path d="M495.531 522.204C495.17 522.204 494.736 522.059 494.447 521.842L481.444 512.06C481.01 511.698 480.721 511.19 480.721 510.611C480.721 510.031 481.01 509.451 481.444 509.162L494.447 499.379C495.242 498.8 496.398 498.945 497.048 499.742C497.626 500.539 497.481 501.698 496.687 502.35L485.634 510.611L496.687 518.944C497.481 519.523 497.698 520.683 497.048 521.552C496.687 522.059 496.109 522.277 495.603 522.277L495.531 522.204Z" fill="#D9D9D9" fill-opacity="0.5" />
                        </g>
                        <g opacity="0.5">
                            <path d="M560.115 522.203C559.537 522.203 559.031 521.986 558.67 521.479C558.092 520.682 558.237 519.522 559.031 518.87L570.084 510.537L559.031 502.277C558.237 501.697 558.02 500.465 558.67 499.668C559.32 498.871 560.476 498.726 561.271 499.306L574.274 509.088C574.708 509.45 574.997 509.958 574.997 510.537C574.997 511.117 574.708 511.697 574.274 511.987L561.271 521.769C561.271 521.769 560.548 522.131 560.187 522.131L560.115 522.203Z" fill="#D9D9D9" fill-opacity="0.5" />
                        </g>
                        <path d="M538.225 503.364H513.518V517.638H538.225V503.364Z" fill="#D9D9D9" fill-opacity="0.5" />
                    </g>
                    <defs>
                        <clipPath id="clip0_9_381">
                            <rect width="1061" height="613" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            </div>
            {/* <div class="hidden lg:flex w-full justify-center items-center">
                <svg width="78" height="78" viewBox="0 0 78 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_5_151)">
                        <path d="M26 45.875C28.5558 48.5299 35.359 59 39 59M39 59C42.641 59 49.4442 48.5299 52 45.875M39 59V17" stroke="#76F5F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                    <defs>
                        <clipPath id="clip0_5_151">
                            <rect width="31" height="54" fill="white" transform="translate(23.5 12)" />
                        </clipPath>
                    </defs>
                </svg>
            </div> */}
        </div>
    )
}

export default BannerConstrucao