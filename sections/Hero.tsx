import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useDevice } from "deco/hooks/useDevice.ts";

export interface CTA {
  id?: string;
  href: string;
  text: string;
  outline?: boolean;
}

/**
 * @title {{{title}}}
 */
export interface Service {
  background?: ImageWidget;
  logo?: ImageWidget;
  title?: string;
  /**
   * @title Title
   * @format rich-text
   * @default we.hear you
   */
  description?: string;
}

export interface Props {
  /**
   * @title Title
   * @format rich-text
   */
  title?: string;
  /**
   * @title Description
   * @format rich-text
   */
  description?: string;
   /**
   * @title Background Image
   */
  image?: ImageWidget;
  /**
   * @title Banner Mobile
   */
  imageMobile?: ImageWidget;
  services?: Service[]
  cta?: CTA[];
}


export default function HeroFlats({
  title = "we.hear you",
  description =
    "This text is fully editable and ready for your personal touch. Just click here, head over to the section window, or dive straight into the code to make changes as you see fit. Whether it's about the content, formatting, font, or anything in between, editing is just a click away.",
  image,
  imageMobile = "https://cdnm.westwing.com.br/glossary/uploads/br/2015/03/02025025/escrit%C3%B3rio-moderno-com-estande-grade-de-metal-e-plantas_c-a1495.jpg",
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
  const device = useDevice();
  const styleBanner = {backgroundImage: `url(${image})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'bottom'}
  const styleBannerMobile = {background: '#0C1E2A'}
  return (
    <div class="w-full lg:mx-auto" style={device=="mobile" ? styleBannerMobile : styleBanner}>
      <div class="lg:container max-lg:px-4 flex flex-col items-center py-5 md:pb-14 md:pt-[105px]">
        <div
            class="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-4 md:mb-3 [&_img]:[margin:12px_auto] md:[&_img]:[margin:30px_auto] max-md:[&_h2_span]:[font-size:48px_!important]"
            dangerouslySetInnerHTML={{
              __html: title,
            }}
          />
          <div class="text-lg md:text-xl text-gray-300 mx-auto md:max-w-[950px] mb-9 max-md:[&_p_span]:[font-size:20px_!important]"
          dangerouslySetInnerHTML={{
            __html: description,
          }}/>
          <Image
            width={344}
            height={251} 
            src={imageMobile}
            alt="Banner Mobile"
            class="md:hidden w-full h-auto mb-6"
          />
          <ul class="flex scrollbar-none max-md:overflow-x-scroll md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:p-6 max-md:w-full mb-5 md:mb-0 lg:mt-3">
            {services?.map((service: Service) => {
              if(!service.title && device === "mobile") return <></>
              return (
                <li key={service?.title} class="rounded-lg p2 md:p-9 pr-1 max-md:min-w-[73vw] max-md:p-4 md:w-[304px] h-[204px] max-md:bg-[#153041]" style={{backgroundImage: `url(${service.background})`}}>
                  <div class="flex flex-col gap-4 items-center justify-center">
                    <div class="flex gap-4 items-center justify-start w-full">
                      {service.logo && <Image
                        width={36}
                        height={36} 
                        src={service?.logo}
                        alt={service?.logo}
                      />}
                      <h3 class="text-xl/6 font-medium">{service?.title}</h3>
                    </div>
                      {service?.description && <div class=""
                        dangerouslySetInnerHTML={{
                          __html: service?.description,
                        }}></div>}
                  </div>
                </li>
              )
            })}
          </ul>
          <div class="flex items-center gap-3">
              {cta?.map((item) => (
                <a
                  key={item?.id}
                  id={item?.id}
                  href={item?.href}
                  target={item?.href.includes("http") ? "_blank" : "_self"}
                  class={`font-normal btn btn-primary ${
                    item.outline && "btn-outline outline-arrow"
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