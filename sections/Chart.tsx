import type { ImageWidget } from "apps/admin/widgets.ts";
// import { useScript } from "deco/hooks/useScript.ts";
import Image from "apps/website/components/Image.tsx";
import { useScript } from "deco/hooks/useScript.ts";

export interface CTA {
  id?: string;
  href: string;
  text: string;
  type?: 'default' | 'outline' | 'inline';
}

interface DescriptionList {
  /**
   * @title Description
   * @format rich-text
   */
  label: string;
}

export interface Props {
    /**
   * @title Tag
   */
    tag?: string;
    /**
   * @title Title
   */
  title?: string;
  /**
   * @title Descriptions List
   */
  description?: DescriptionList[];
  /**
   * @title Gráfico
   */
  image?: ImageWidget;
  /**
   * @title Imagem de Fundo
   */
  background?: ImageWidget;

  cta?: CTA[];

}

export default function Chart({
  title = "we.digi",
  tag,
  background,
  image,
  description = [],
  cta = [
    { id: "change-me-1", href: "/", text: "CONHEÇA NOSSOS SERVIÇOS", outline: false },
  ]
}: Props) {
  
  // const serviceWorkerScript = () =>
  //   addEventListener("load", () => {
  //     const ctx = document.getElementById('myChart');
  //     console.log(ctx);
  //     const data = {
  //       labels: [
  //         'Eating',
  //         'Drinking',
  //         'Sleeping',
  //         'Designing',
  //         'Coding',
  //         'Cycling',
  //         'Running'
  //       ],
  //       datasets: [{
  //         label: 'My First Dataset',
  //         data: [65, 59, 90, 81, 56, 55, 40],
  //         fill: true,
  //         backgroundColor: 'rgba(255, 99, 132, 0.2)',
  //         borderColor: 'rgb(255, 99, 132)',
  //         pointBackgroundColor: 'rgb(255, 99, 132)',
  //         pointBorderColor: '#fff',
  //         pointHoverBackgroundColor: '#fff',
  //         pointHoverBorderColor: 'rgb(255, 99, 132)'
  //       }, {
  //         label: 'My Second Dataset',
  //         data: [28, 48, 40, 19, 96, 27, 100],
  //         fill: true,
  //         backgroundColor: 'rgba(54, 162, 235, 0.2)',
  //         borderColor: 'rgb(54, 162, 235)',
  //         pointBackgroundColor: 'rgb(54, 162, 235)',
  //         pointBorderColor: '#fff',
  //         pointHoverBackgroundColor: '#fff',
  //         pointHoverBorderColor: 'rgb(54, 162, 235)'
  //       }]
  //     };
  //     const config = {
  //       type: 'radar',
  //       data: data,
  //       options: {
  //         plugins: {
  //           legend: {
  //             display: false, // Define a legenda como oculta
  //           }
  //         },
  //         elements: {
  //           line: {
  //             borderWidth: 3
  //           }
  //         }
  //       },
  //     };
      
  //     {/* deno-lint-ignore ban-ts-comment
  //     @ts-ignore */}
  //     new Chart(ctx, config);
  //   });

  const fadeItems = (texts) => 
    addEventListener("load", () => {
      console.log(texts)
      let currentIndex = 0; // Índice inicial

    // Função para trocar o texto com animações
    function changeText() {
      const element = document.getElementById("textElement");
      if(!element) return;

      // Aplicar animação de fade-out
      element.classList.remove("fade-in");
      element.classList.add("fade-out");

      // Esperar a animação de fade-out terminar (1 segundo)
      setTimeout(() => {
        // Trocar o HTML usando dangerouslySetInnerHTML
        element.innerHTML = texts[currentIndex].label;

        // Alternar para o próximo índice, com reset para o início do array
        currentIndex = (currentIndex + 1) % texts.length;

        // Aplicar animação de fade-in
        element.classList.remove("fade-out");
        element.classList.add("fade-in");
      }, 1000); // Tempo igual à duração da animação fade-out
    }

    // Chamar a função a cada 2 segundos
    setInterval(changeText, 6000);
    });

  return (
    <section class="flex items-center justify-center bg-custom-size" style={{backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
      <div class="container mx-auto px-4 py-6 md:py-24 lg:flex lg:items-center lg:gap-8">
        {/* Bloco de Texto */}
        <div class="lg:w-1/2">
          <div class="w-full flex flex-col mb-6">
            {tag && <p class="text-[#76F5F7] text-base">{tag}</p>}
            {title && <p class="text-[#7a7373] text-2xl md:text-[40px] ">{title}</p>}
          </div>
          <div class="flex items-center gap-3">
              {cta?.map((item) => (
                <a
                  key={item?.id}
                  id={item?.id}
                  href={item?.href}
                  target={item?.href.includes("http") ? "_blank" : "_self"}
                  class={`font-normal btn ${ 
                    item.type == "outline" ? "btn-outline outline-arrow" :
                    item.type == "inline" ? "btn-inline inline-arrow" : "btn-primary"
                  }`}
                >
                  {item?.text}
                </a>
              ))}
            </div>
            <div class="flex items-center gap-3 mt-6 md:mt-20">
              <div
                id="textElement"
                class="bg-[#153042] mb-8 max-w-[465px] [&_span]:[line-height:24px] [&_span]:[display:flex] p-4 [&_ul]:[list-style:disc] [&_ul]:[padding:0px_12px]"
                dangerouslySetInnerHTML={{
                  __html: description[0].label,
                }}
              />
              <script
              type="module"
              defer
              dangerouslySetInnerHTML={{
                __html: useScript(fadeItems,description),
              }}
            />
            </div>
        </div>

        {/* Bloco de Imagem */}
        <div class="lg:w-1/2 mt-2 lg:mt-0">
          {image && <Image
              width={640}
              class="w-full h-auto object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
              src={image}
              alt="Imagem do Quadrante 2024"
              decoding="async"
              loading="lazy"
            />}
          {/* <div>
             To input a chart
            <canvas id="myChart"></canvas>
            <script
              type="module"
              defer
              dangerouslySetInnerHTML={{
                __html: useScript(serviceWorkerScript),
              }}
            />
          </div> */}
        </div>
      </div>
    </section>
  );
}
