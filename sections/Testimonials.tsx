// sections/Testimonials.tsx (ou arquivo onde o Carousel está definido)

import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "../components/ui/Icon.tsx";
// 1. Importe o Slider (default) e os sub-componentes (nomeados) da Island
import Slider, { Dot, Item, NextButton, PrevButton } from "../islands/Slider.tsx";
import { useId } from "../sdk/useId.ts"; // useId para gerar um ID único no servidor

// --- Interfaces (Testimonial, Props) ---
// Mantenha como estavam
export interface Testimonial {
    description?: string;
    avatar?: ImageWidget;
    alt?: string;
    name?: string;
    position?: string;
}
export interface Props {
    tag?: string;
    title?: string;
    slides?: Testimonial[];
    mark?: ImageWidget; // Você ainda precisa disso no SliderItem?
    arrows?: boolean;
    dots?: boolean;
    interval?: number; // Em segundos
}

// --- Default Props ---
// Mantenha como estavam
const DEFAULT_PROPS = { /* ... */ };

// --- SliderItem Component ---
// Componente que renderiza o conteúdo de UM slide. Permanece o mesmo.
function SliderItem({ slide, id, mark }: {
    slide: Testimonial;
    id: string; // Este ID é para o container do *item*, não para o controle do slider
    mark: string;
}) {
    return (
        <div id={id} class="relative overflow-y-hidden w-full min-h-[292px]">
            <div class="flex flex-col justify-center gap-16 p-8 h-full max-w-[1661px]">
                <div class="flex w-full lg:gap-8 gap-1 relative overflow-visible xl:max-w-[1272px] mx-auto lg:pl-10">
                    {/* Renderiza a 'mark' e o conteúdo do depoimento */}
                    <Image class="object-cover h-max left-[-25px] md:left-[-70px] top-[-13px] max-md:max-w-[21px]" alt={"Quote mark"} src={mark || ""} width={62} height={51} />
                    <div>
                        <div class="flex flex-col [&_p]:!text-xl lg:[&_p]:!text-[40px] [&_p]:font-light [&_strong]:font-light [&_span]:!text-xl lg:[&_span]:!text-[40px] lg:[&_span]:!leading-[120%] [&_p]:text-[#ababab]">
                            <p class="text-lg w-full [&_span]:[font-weight:300] [&_p]:!text-xl lg:[&_p]:!text-[40px] [&_span]:!text-xl lg:[&_span]:!text-[40px]" dangerouslySetInnerHTML={{ __html: slide.description || "" }}></p>
                        </div>
                        <div class="flex mt-10 gap-2">
                            <p class="font-semibold text-base text-white">{slide?.name}</p>
                            <p class="text-base text-[#ababab]">{slide?.position}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- Dots Component ---
// Renderiza os dots usando o componente 'Dot' importado.
// Ele será renderizado DENTRO do componente Slider principal.
function Dots({ slides }: Pick<Props, "slides">) {
    return (
        <>
            {/* A tag <style> pode ficar aqui ou ser movida para CSS global */}
            <style dangerouslySetInnerHTML={{ __html: `/* ... CSS @property ... */` }} />
            {/* Container para layout dos dots */}
            <div class="flex justify-center items-center gap-4 z-10 max-md:overflow-x-scroll">
                {slides?.map((slide, index) => (
                    // Use o componente 'Dot' importado diretamente
                    <Dot key={index} index={index}>
                        {/* Conteúdo visual do Dot (Avatar clicável) */}
                        {/* Adicionado estilo para estado ativo/inativo via CSS e data attribute */}
                        <div class="w-14 h-14 rounded-full overflow-hidden border-2 border-transparent group-data-[active]:border-[#76F5F7] transition-all cursor-pointer">
                            <Image
                                class="object-cover w-full h-full grayscale group-data-[active]:grayscale-0 transition-all" // Efeito visual para ativo
                                alt={slide?.alt ?? `Avatar ${index + 1}`}
                                src={slide?.avatar || ""}
                                width={56}
                                height={56}
                                preload={index < 3} // Otimização: preload das primeiras imagens
                                fetchPriority={index < 1 ? "high" : "low"}
                            />
                        </div>
                    </Dot>
                ))}
            </div>
        </>
    );
}

// --- Buttons Component ---
// Renderiza os botões Prev/Next usando os componentes importados.
// Também será renderizado DENTRO do Slider principal.
function Buttons({ total }: { total: number }) {
    const initialWidthPercent = total > 0 ? (1 / total) * 100 : 0;

    return (
        <div class="flex gap-4 flex-[auto] items-center">
            <div class="bar-custom w-full h-[2px] bg-[#4C4B4B] flex items-center mx-4 max-md:hidden pointer-events-auto">
                {/* O elemento 'pivot' que terá sua largura atualizada pelo script */}
                <div
                    id="slider-progress-pivot" // Atributo para o script encontrar este elemento
                    class="pivot h-full bg-[#76F5F7] transition-all duration-300 ease-linear" // transition-all para animar a mudança de largura
                    style={{ width: `${initialWidthPercent}%` }} // Define a largura inicial no servidor
                ></div>
            </div>
            <div class="flex gap-4">
                {/* Botão Anterior */}
                <div class="pointer-events-auto">
                    <PrevButton class="flex items-center justify-center btn-circle border border-[#4C4B4B] min-w-[65px] min-h-[65px] bg-base-100 bg-opacity-80 hover:bg-opacity-100 disabled:opacity-30 disabled:cursor-not-allowed">
                        {/* Ícone de seta (rotacionado para apontar para esquerda) */}
                        <Icon class="text-base-content rotate-180" id="ArrowLeft2" width="55" height="21" />
                    </PrevButton>
                </div>
                {/* Botão Próximo */}
                <div class="pointer-events-auto">
                    <NextButton class="flex items-center justify-center btn-circle border border-[#4C4B4B] min-w-[65px] min-h-[65px] bg-base-100 bg-opacity-80 hover:bg-opacity-100 disabled:opacity-30 disabled:cursor-not-allowed">
                        {/* Ícone de seta */}
                        <Icon class="text-base-content" id="ArrowLeft2" width="55" height="21" />
                    </NextButton>
                </div>
            </div>
        </div>
    );
}


// --- Carousel Component (Principal da Seção) ---
function Carousel(props: Props) {
    const id = useId(); // Gera ID único para esta instância do Carousel
    // Combina props padrão com as recebidas
    const { title, slides = [], interval, mark = "", tag, arrows, dots } = { ...DEFAULT_PROPS, ...props };

    // Não pode haver slides vazios para o slider funcionar
    if (!slides || slides.length === 0) {
        return <div>Sem depoimentos para exibir.</div>; // Ou alguma mensagem/placeholder
    }

    return (
        // Container geral da seção
        <div class="testimonial-carousel-section min-h-min flex flex-col !px-4 py-16 md:py-28 lg:w-10/12 mx-auto">

            {/* Cabeçalho da Seção (Tag, Título) */}
            <div class="flex flex-col gap-4 2xl:max-w-[1360px] mx-auto w-full lg:pl-20 mb-8 md:mb-16">
                {tag && <p class="text-[#76F5F7] text-base ">{tag}</p>}
                {title && <div class="text-[#ababab] text-2xl md:text-[40px]" dangerouslySetInnerHTML={{ __html: title }} />}
            </div>

            {/* 2. Invocação do Componente Slider (Island) */}
            <Slider
                // Props essenciais para o Slider Island
                rootId={id} // O ID único que o script do slider usará
                scroll="smooth" // Comportamento do scroll
                interval={interval ? interval * 1000 : 0} // Converte segundos para ms (0 desativa)
                infinite={true} // Slider infinito (ajuste se necessário)

                // classe CSS aplicada ao container (div#rootId) do slider
                class="relative w-full mb-16 md:mb-24" // Adiciona margem inferior para os dots
            >
                {/* 3. Itens do Slider (Filhos diretos do Slider, renderizados dentro do <ul>) */}
                {slides.map((slide, index) => (
                    // Use o componente 'Item' importado
                    <Item key={`${id}-${index}`} index={index} class="w-full">
                        {/* Renderiza o conteúdo do slide usando o componente SliderItem */}
                        <SliderItem slide={slide} mark={mark} id={`${id}::${index}`} />
                    </Item>
                ))}

                {/* 4. Controles do Slider (Filhos diretos do Slider, renderizados DENTRO do div#rootId, mas FORA do <ul>) */}
                {/* Estes componentes precisam de posicionamento CSS (absolute, etc.) */}

                {/* Posicionamento dos dots abaixo do slider (exemplo) */}
                <div class="absolute flex gap-4 bottom-[-60px] md:bottom-[-80px] left-1/2 transform -translate-x-1/2 w-full"> {/* Ajuste o valor de bottom conforme necessário */}
                    {dots && <Dots slides={slides} />}
                    {arrows && <Buttons total={slides.length}/>}
                </div>

            </Slider>
            {/* Fim da invocação do Slider */}

        </div> // Fim do container geral da seção
    );
}

export default Carousel;