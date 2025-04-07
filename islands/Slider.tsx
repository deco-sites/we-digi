// islands/Slider.tsx

import type { ComponentChildren, JSX } from "preact";
import { useEffect } from "preact/hooks";

/**
 * Props para o componente Slider e a função setup.
 */
export interface Props {
    /** ID único para o elemento container principal do slider. */
    rootId: string;
    scroll?: "smooth" | "auto";
    /** Intervalo em milissegundos para autoplay. Se 0 ou undefined, desativa autoplay. */
    interval?: number;
    /** Habilita navegação infinita (ao chegar no fim, volta pro começo e vice-versa). */
    infinite?: boolean;
}

/**
 * Lógica principal do slider que manipula o DOM, observa interseções e adiciona listeners.
 * Executada no cliente através do useEffect.
 */
const setup = ({ rootId, scroll = "smooth", interval, infinite = false }: Props) => {
    // Constantes e seletores
    const ATTRIBUTES = {
        "data-slider": "data-slider",
        "data-slider-item": "data-slider-item",
        'data-slide="prev"': 'data-slide="prev"',
        'data-slide="next"': 'data-slide="next"',
        "data-dot": "data-dot",
    };
    const THRESHOLD = 0.6; // % de um item visível para ser considerado "ativo"

    // --- Funções Auxiliares ---
    const intersectionX = (element: DOMRect, container: DOMRect): number => {
        const delta = container.width / 1000;
        if (element.right < container.left - delta) return 0.0;
        if (element.left > container.right + delta) return 0.0;
        if (element.left < container.left - delta) return element.right - container.left + delta;
        if (element.right > container.right + delta) return container.right - element.left + delta;
        return element.width;
    };

    const isHTMLElement = (x: Element | null): x is HTMLElement =>
        x instanceof HTMLElement && typeof x.offsetLeft === "number";

    // --- Seleção de Elementos DOM ---
    // O root é o container principal com o ID fornecido
    const root = document.getElementById(rootId);
    if (!root) {
        console.error(`Slider error: Root element with ID "${rootId}" not found.`);
        return () => {}; // Retorna cleanup vazio
    }

    const slider = root.querySelector<HTMLElement>(`[${ATTRIBUTES["data-slider"]}]`);
    const items = root.querySelectorAll<HTMLElement>(`[${ATTRIBUTES["data-slider-item"]}]`);
    const prev = root.querySelector<HTMLButtonElement>(`[${ATTRIBUTES['data-slide="prev"']}]`);
    const next = root.querySelector<HTMLButtonElement>(`[${ATTRIBUTES['data-slide="next"']}]`);
    const dots = root.querySelectorAll<HTMLButtonElement>(`[${ATTRIBUTES["data-dot"]}]`);
    const pivot = root.querySelector<HTMLElement>(`#slider-progress-pivot`);

    console.log(pivot, root, 'pivoooooot')

    if (!slider || !items || items.length === 0) {
        console.warn(
            `Slider Warning (${rootId}): Missing necessary elements inside root. Check for [data-slider] and [data-slider-item].`,
            { slider, items }
        );
        return () => {}; // Retorna cleanup vazio
    }

    // --- Lógica do Slider ---
    const getElementsInsideContainer = (): number[] => {
        const indices: number[] = [];
        const sliderRect = slider.getBoundingClientRect();
        items.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const ratio = intersectionX(rect, sliderRect) / rect.width;
            if (ratio >= THRESHOLD) { // Usar >= para garantir que 60% exato conte
                indices.push(index);
            }
        });
        return indices;
    };

     let scrollTimeoutId: number | null = null;
     const handleScroll = () => {
        if (scrollTimeoutId !== null) {
            clearTimeout(scrollTimeoutId);
        }
        scrollTimeoutId = setTimeout(() => {
            updateControlsState(); // Atualiza estado dos botões/dots após scroll parar
            scrollTimeoutId = null;
        }, 150); // Ajuste o delay conforme necessário
     };

     const updateControlsState = () => {
        const indices = getElementsInsideContainer();
        if (indices.length === 0) return;

        const currentIndex = indices[0]; // Índice do primeiro item visível
        const totalItems = items.length;

        const currentActiveIndex = indices.length > 0 ? indices[0] : -1;

        // Atualiza dots
        dots?.forEach((dot) => { // Itera sobre cada elemento dot encontrado
            const dotIndexStr = dot.getAttribute("data-dot"); // Pega o índice do atributo do dot
            if (dotIndexStr === null) return; // Pula se não tiver o atributo

            const dotIndex = parseInt(dotIndexStr, 10);
            if (isNaN(dotIndex)) return; // Pula se não for um número

            // Verifica se este dot corresponde ao ÚNICO índice ativo que definimos
            const isActive = (dotIndex === currentActiveIndex);
            // Adiciona/remove o atributo data-active
            dot.toggleAttribute("data-active", isActive);
        });

        // Atualiza botões prev/next (se não for infinito)
        if (!infinite) {
            const firstVisible = indices[0] === 0;
            const lastVisible = indices[indices.length - 1] === items.length - 1;
            prev?.toggleAttribute("disabled", firstVisible);
            next?.toggleAttribute("disabled", lastVisible);
        } else {
             // Garante que botões estejam sempre habilitados no modo infinito
             prev?.removeAttribute("disabled");
             next?.removeAttribute("disabled");
        }

        console.log('antes if')
        if (pivot && totalItems > 0) {
            console.log('depois if')
            // Calcula a porcentagem baseada no índice atual + 1
            const percentage = ((currentIndex + 1) / totalItems) * 100;
            // Atualiza o estilo width do elemento pivot
            pivot.style.width = `${percentage}%`;
        }
    };


    const goToItem = (index: number) => {
        const item = items.item(index);
        if (!isHTMLElement(item) || !isHTMLElement(slider)) {
            console.warn(`Slider (${rootId}): Element at index ${index} not valid HTMLElement.`);
            return;
        }
        // Garante que o índice esteja dentro dos limites
        const targetIndex = Math.max(0, Math.min(index, items.length - 1));
        const targetItem = items.item(targetIndex);
         if (!isHTMLElement(targetItem)) return;

        slider.scrollTo({
            top: 0,
            behavior: scroll,
            left: targetItem.offsetLeft - slider.offsetLeft,
        });
         // Atualiza estado após iniciar o scroll (pode ser refinado com evento 'scrollend')
         // Usar um pequeno timeout ou o listener de scroll é mais confiável
         // handleScroll(); // Chamada inicial pode ser feita aqui ou após timeout
    };

    const onClickPrev = () => {
        const indices = getElementsInsideContainer();
        if (indices.length === 0) return;

        const firstVisibleIndex = indices[0];
        const itemsPerPage = indices.length; // Assumindo que todos os itens visíveis são uma "página"

        let targetIndex = firstVisibleIndex - itemsPerPage;

        if (firstVisibleIndex === 0) {
            if (infinite) {
                 // Vai para a última página (garante que caiba pelo menos itemsPerPage)
                 targetIndex = Math.max(0, items.length - itemsPerPage);
            } else {
                targetIndex = 0; // Já está no início, não faz nada ou mantém em 0
                 return; // Ou não faz nada se já está no início e não é infinito
            }
        }
        goToItem(Math.max(0, targetIndex));
    };

    const onClickNext = () => {
        const indices = getElementsInsideContainer();
        if (indices.length === 0) return;

        const lastVisibleIndex = indices[indices.length - 1];
        const firstVisibleIndex = indices[0]
        const itemsPerPage = indices.length;

        let targetIndex = firstVisibleIndex + itemsPerPage;

        if (lastVisibleIndex === items.length - 1) {
            if (infinite) {
                targetIndex = 0; // Volta para o início
            } else {
                 targetIndex = items.length -1; // Já está no fim
                 return; // Ou não faz nada se já está no fim e não é infinito
            }
        }
         // Garante que não tentemos ir para um índice que não existe
        goToItem(Math.min(targetIndex, items.length - 1));
    };

    // Armazenar referências dos listeners para removê-los corretamente
    const dotClickListeners: Array<[HTMLElement, () => void]> = [];

    // --- Intersection Observer para estado dos dots/botões ---
     // Este observer é bom para performance, mas pode ser redundante com handleScroll
     // Pode ser usado para aplicar classes/atributos quando um item entra/sai da visão
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const item = entry.target as HTMLElement;
                const indexStr = item.getAttribute("data-slider-item");
                if (indexStr === null) return;
                const index = parseInt(indexStr, 10);
                if (isNaN(index)) return;

                const dot = dots?.item(index);

                // Marca o dot como 'disabled' quando o item correspondente está visível
                // (Isso pode ser usado para estilização ou lógica adicional)
                 // A lógica de `data-active` é mais comum e feita no `updateControlsState`.
                 // Vamos usar o observer para o estado `disabled` dos botões se não for infinito.
                // dot?.toggleAttribute("disabled", entry.isIntersecting);

                 // Atualiza estado dos botões prev/next baseado na visibilidade dos itens extremos
                 // Esta lógica foi movida para updateControlsState para consistência com o scroll manual
                 /*
                 if (!infinite) {
                     if (index === 0) {
                         prev?.toggleAttribute("disabled", entry.isIntersecting);
                     }
                     if (index === items.length - 1) {
                         next?.toggleAttribute("disabled", entry.isIntersecting);
                     }
                 }
                 */
            });
             // Após qualquer mudança de interseção, reavalia o estado geral dos controles
             // Debounce pode ser útil aqui se houver muitas mudanças rápidas
             updateControlsState();
        },
        { root: slider, threshold: THRESHOLD }
    );

    // --- Adicionar Event Listeners ---
    items.forEach((item) => observer.observe(item));

    dots?.forEach((dot, index) => {
        const itemIndexStr = dot.getAttribute("data-dot");
         if(itemIndexStr === null) return;
         const itemIndex = parseInt(itemIndexStr, 10);
         if (isNaN(itemIndex)) return;

        const listener = () => goToItem(itemIndex);
        dotClickListeners.push([dot, listener]); // Armazena a referência [elemento, função]
        dot.addEventListener("click", listener);
    });

    prev?.addEventListener("click", onClickPrev);
    next?.addEventListener("click", onClickNext);
    slider.addEventListener("scroll", handleScroll, { passive: true }); // Ouve o scroll


    // --- Autoplay ---
    let intervalId: number | undefined = undefined;
    const startAutoplay = () => {
        if (intervalId) clearInterval(intervalId); // Limpa anterior se houver
        if (interval && interval > 0) {
            intervalId = setInterval(onClickNext, interval);
        }
    };
    const stopAutoplay = () => {
        if (intervalId) clearInterval(intervalId);
        intervalId = undefined;
    };

    // Inicia autoplay e para ao interagir
    startAutoplay();
    root.addEventListener("mouseenter", stopAutoplay);
    root.addEventListener("touchstart", stopAutoplay, { passive: true });
    root.addEventListener("mouseleave", startAutoplay);
    root.addEventListener("touchend", startAutoplay, { passive: true });


     // --- Estado Inicial ---
     updateControlsState(); // Define o estado inicial dos controles

    // --- Função de Limpeza ---
    // Retornada pelo setup e chamada pelo useEffect quando o componente desmonta
    return () => {
        console.log(`Slider cleanup (${rootId})`);
         stopAutoplay(); // Limpa intervalo do autoplay
         if (scrollTimeoutId) clearTimeout(scrollTimeoutId); // Limpa timeout do scroll

        // Remove listeners dos dots
        dotClickListeners.forEach(([dotElement, listenerFunc]) => {
            dotElement.removeEventListener("click", listenerFunc);
        });

        // Remove listeners dos botões prev/next
        prev?.removeEventListener("click", onClickPrev);
        next?.removeEventListener("click", onClickNext);

         // Remove listener de scroll
         slider?.removeEventListener("scroll", handleScroll);

         // Remove listeners de interação do autoplay
         root?.removeEventListener("mouseenter", stopAutoplay);
         root?.removeEventListener("touchstart", stopAutoplay);
         root?.removeEventListener("mouseleave", startAutoplay);
         root?.removeEventListener("touchend", startAutoplay);

        // Desconecta o observer
        observer.disconnect();
    };
};

// --- Componente Slider Principal (Island) ---
// Renderiza o container e o <ul>, e aplica o useEffect para a lógica do cliente.
// Não renderiza os itens, botões ou dots diretamente; eles devem vir como children do pai.
function Slider({
    rootId,
    scroll = "smooth",
    interval,
    infinite = false,
    children, // Espera receber Slider.Item como children diretos do <ul>
              // e Slider.NextButton, Slider.PrevButton, Slider.Dot como children do container (fora do ul)
    class: className, // Renomeia 'class' para 'className'
    ...props // Outras props para o container div
}: JSX.IntrinsicElements["div"] & Props) {

    // useEffect para executar a lógica do 'setup' no cliente após a montagem
    useEffect(() => {
        // Garante que só executa no browser
        if (typeof document !== "undefined") {
            console.log(`Setting up slider: ${rootId}`);
            const cleanup = setup({ rootId, scroll, interval, infinite });
            // Retorna a função de cleanup para ser executada na desmontagem
            return cleanup;
        }
        return () => {}; // Cleanup vazio se não estiver no browser
    }, [rootId, scroll, interval, infinite]); // Dependências do efeito

    // Renderiza o container div com rootId e o ul[data-slider] dentro.
    // Os children (itens) são colocados dentro do <ul>.
    // Os controles (botões, dots) devem ser colocados pelo componente pai DENTRO deste div, mas FORA do ul.
    return (
        <div
            id={rootId}
            class={`slider-container relative ${className ?? ''}`} // Adiciona relative para posicionamento absoluto de controles
            {...props}
        >
            <ul
                data-slider
                class="slider-list flex overflow-x-scroll snap-x snap-mandatory scroll-smooth scrollbar-none" // Estilos básicos funcionais
                 style={{ scrollBehavior: scroll /* Controla via JS tb */ }}
            >
                {children} {/* Renderiza os Slider.Item aqui */}
            </ul>
            {/* Os botões e dots devem ser renderizados AQUI pelo componente pai (Carousel),
                para que setup() os encontre via root.querySelector() */}
        </div>
    );
}

// --- Sub-Componentes ---
// Exportados nomeadamente para uso em componentes Server-Side (como Carousel)

/** Componente para cada Dot de navegação. */
export function Dot({ index, children }: { index: number; children: ComponentChildren }) {
    // Use data-active para estilização via CSS: .slider-dot[data-active] { ... }
    return (
        <button
            data-dot={index}
            aria-label={`Ir para slide ${index + 1}`}
            class="slider-dot focus:outline-none group" // Adicione estilos conforme necessário
        >
            {children}
        </button>
    );
}

/** Componente para cada Item (slide) dentro do slider. */
export function Item({ index, children, class: className, ...props }: JSX.IntrinsicElements["li"] & { index: number }) {
    return (
        <li
            data-slider-item={index}
            class={`slider-item snap-start flex-shrink-0 w-full ${className ?? ''}`} // Garante largura total e snap
            {...props}
        >
            {children}
        </li>
    );
}

/** Botão para ir para o próximo slide. */
export function NextButton(props: JSX.IntrinsicElements["button"]) {
    // Use :disabled pseudo-classe para estilizar quando desabilitado
    return (
        <button
            data-slide="next"
            aria-label="Próximo slide"
            class="slider-next disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed" // Estilos básicos
            {...props}
        />
    );
}

/** Botão para ir para o slide anterior. */
export function PrevButton(props: JSX.IntrinsicElements["button"]) {
    // Use :disabled pseudo-classe para estilizar quando desabilitado
    return (
        <button
            data-slide="prev"
            aria-label="Slide anterior"
            class="slider-prev disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed" // Estilos básicos
            {...props}
        />
    );
}

// --- Exports ---
// Exporta o Slider como default (para ser tratado como Island)
export default Slider;

// As exportações nomeadas (Dot, Item, etc.) já foram feitas acima com 'export function...'