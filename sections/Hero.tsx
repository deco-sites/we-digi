import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface CTA {
  id?: string;
  href: string;
  text: string;
  outline?: boolean;
}

// {{{title}}}
export interface Service {
  background?: ImageWidget;
  logo?: ImageWidget;
  title?: string;
  description?: string;
}

export interface Props {
  /**
   * @format rich-text
   * @default we.hear you
   */
  title?: string;
  /**
   * @default This text is fully editable and ready for your personal touch. Just click here, head over to the section window, or dive straight into the code to make changes as you see fit. Whether it's about the content, formatting, font, or anything in between, editing is just a click away.
   */
  description?: string;
  image?: ImageWidget;
  services?: Service[]
  cta?: CTA[];
}


export default function HeroFlats({
  title = "we.hear you",
  description =
    "This text is fully editable and ready for your personal touch. Just click here, head over to the section window, or dive straight into the code to make changes as you see fit. Whether it's about the content, formatting, font, or anything in between, editing is just a click away.",
  image,
  services = [
    {
      logo: "/path/to/logo1.png",
      title: "Implantação de e-commerce",
      description: "Com mais de 1000 projetos, temos a experiência necessária para transformar seu sonho em realidade.",
    },
    {
      background: "https://cdnm.westwing.com.br/glossary/uploads/br/2015/03/02025025/escrit%C3%B3rio-moderno-com-estande-grade-de-metal-e-plantas_c-a1495.jpg",
    },
    {
      logo: "/path/to/logo2.png",
      title: "Evolução / On-going",
      description: "Somos ativos em ajudar você encontrar as melhores escolhes para aumentar suas vendas.",
    },
    {
      background: "https://cdnm.westwing.com.br/glossary/uploads/br/2015/03/02025025/escrit%C3%B3rio-moderno-com-estande-grade-de-metal-e-plantas_c-a1495.jpg",
    },
    {
      logo: "/path/to/logo3.png",
      title: "Performance",
      description: "Entendemos seu mercado e trazemos o público assertivo com todas as quebras de objeção para você performar com excelência!",
    },
    {
      logo: "/path/to/logo4.png",
      title: "Integrações customizadas",
      description: "Da integração com aplicativos à sistema de campanha de incentivo.",
    },
    {
      logo: "/path/to/logo5.png",
      title: "Concierge",
      description: "Prestamos serviços de infraestrutura, desenvolvimento, consultoria e treinamentos nas tecnologias aplicadas.",
    },
    {
      logo: "/path/to/logo6.png",
      title: "Squad dedicado",
      description: "É um serviço que já inicia com um time multidisciplinar montado exclusivamente para criar e evoluir continuamente a sua plataforma de e-commerce.",
    },
    {
      background: "https://cdnm.westwing.com.br/glossary/uploads/br/2015/03/02025025/escrit%C3%B3rio-moderno-com-estande-grade-de-metal-e-plantas_c-a1495.jpg",
    },
  ],
  cta = [
    { id: "change-me-1", href: "/", text: "CONHEÇA NOSSOS SERVIÇOS", outline: false },
  ],
}: Props) {
  return (
    <div class="lg:container lg:mx-auto mx-4" style={{backgroundImage: image}}>
      <div class="flex flex-col items-center gap-8">
        <div
            class="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-4"
            dangerouslySetInnerHTML={{
              __html: title,
            }}
          />
          <p class="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          dangerouslySetInnerHTML={{
            __html: description,
          }}/>
          <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-">
            {services?.map((service: Service) => (
              <li key={service?.title} style={{backgroundImage: `url(${service.background})`}}>
                <div class="flex flex-col gap-3">
                  <div class="flex">
                    {service.logo && <Image
                      width={64}
                      height={64}
                      src={service?.logo}
                      alt={service?.logo}
                    />}
                    <h3 class="text-lg font-medium">{service?.title}</h3>
                  </div>
                    <p>{service?.description}</p>
                </div>
              </li>
            ))}
          </ul>
          <div class="flex items-center gap-3">
              {cta?.map((item) => (
                <a
                  key={item?.id}
                  id={item?.id}
                  href={item?.href}
                  target={item?.href.includes("http") ? "_blank" : "_self"}
                  class={`font-normal btn btn-primary ${
                    item.outline && "btn-outline"
                  }`}
                >
                  {item?.text}
                </a>
              ))}
            </div>
      </div>
    </div>
  );
}

// {image && (
//   <Image
//     width={640}
//     class="w-full lg:w-1/2 object-fit"
//     sizes="(max-width: 640px) 100vw, 30vw"
//     src={image}
//     alt={image}
//     decoding="async"
//     loading="lazy"
//   />
// )}