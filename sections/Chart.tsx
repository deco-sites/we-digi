import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useScript } from "deco/hooks/useScript.ts";

export interface Props {
    /**
   * @title Title
   * @format rich-text
   * @default Click here to tweak this text however you want.
   */
  title?: string;
  logoSrc?: ImageWidget;
  /**
   * @title Title
   * @format rich-text
   * @default Click here to tweak this text however you want.
   */
  description?: string;
  /**
   * @title Quadrante Image
   */
  image?: ImageWidget;
  /**
   * @title Imagem de Fundo
   */
  background?: ImageWidget;
}

export default function Chart({
  title = "Nossa conquista",
  logoSrc = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngegg.com%2Fen%2Fsearch%3Fq%3Dvtex&psig=AOvVaw01Cpgt96qdxIFEvwM5KSrE&ust=1725478319330000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOCX_eTBp4gDFQAAAAAdAAAAABAE",
  description = "Estamos entre **as melhores agencias** de e-commerce",
  background
}: Props) {
  
  const serviceWorkerScript = () =>
    addEventListener("load", () => {
      const ctx = document.getElementById('myChart');
      console.log(ctx);
      const data = {
        labels: [
          'Eating',
          'Drinking',
          'Sleeping',
          'Designing',
          'Coding',
          'Cycling',
          'Running'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [65, 59, 90, 81, 56, 55, 40],
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)'
        }, {
          label: 'My Second Dataset',
          data: [28, 48, 40, 19, 96, 27, 100],
          fill: true,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
          pointBackgroundColor: 'rgb(54, 162, 235)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(54, 162, 235)'
        }]
      };
      const config = {
        type: 'radar',
        data: data,
        options: {
          plugins: {
            legend: {
              display: false, // Define a legenda como oculta
            }
          },
          elements: {
            line: {
              borderWidth: 3
            }
          }
        },
      };
      
      {/* deno-lint-ignore ban-ts-comment
      @ts-ignore */}
      new Chart(ctx, config);
    });

  // const serviceWorkerScript2 = () => {
  //   const ctx = document.getElementById('myChart');
  //   {/* deno-lint-ignore ban-ts-comment
  //   @ts-ignore */}
  //   new Chart(ctx, {
  //     type: 'bar',
  //     data: {
  //       labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  //       datasets: [{
  //         label: '# of Votes',
  //         data: [12, 19, 3, 5, 2, 3],
  //         borderWidth: 1
  //       }]
  //     },
  //     options: {
  //       scales: {
  //         y: {
  //           beginAtZero: true
  //         }
  //       }
  //     }
  //   });
  // }
  return (
    <section class="flex items-center justify-center" style={{backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
      <div class="container mx-auto px-4 py-20 lg:flex lg:items-center lg:gap-8">
        {/* Bloco de Texto */}
        <div class="lg:w-1/2">
          <div
              class="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-8"
              dangerouslySetInnerHTML={{
                __html: title,
              }}
            />
          <Image
            width={227}
            class="h-auto object-cover"
            src={logoSrc}
            alt="Vtex"
            decoding="async"
            loading="lazy"
          />
          <div
              class="text-lg text-gray-600 mt-20"
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
        </div>

        {/* Bloco de Imagem */}
        <div class="lg:w-1/2 mt-8 lg:mt-0">
          <div>
            <canvas id="myChart"></canvas>
            <script
              type="module"
              defer
              dangerouslySetInnerHTML={{
                __html: useScript(serviceWorkerScript),
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
