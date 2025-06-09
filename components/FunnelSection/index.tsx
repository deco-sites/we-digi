import { FunnelDesktop } from "site/components/FunnelSection/SvgFunnelDesktop.tsx";
import { FunnelMobile } from "site/components/FunnelSection/SvgFunnelMobile.tsx";

/**@title {{ title }} */
interface Option {
  title: string
  subtitle: string
}

interface Props {

  /**
   * @title Título
   * @format textarea
   */
  title: string

  /**
   * @title Subtítulo
   * @format textarea
   */
  subtitle: string

  /**
   * @title Descrição
   * @format textarea
   */
  options?: Option[]

  /**
   * @title Descrição
   * @format textarea
   */

  description?: string
  link?: {
    label: string
    url: string
    /**
     * @title Cor de fundo
     * @format color
   */
    bgColor?: string
    /**
      * @title Cor do texto do botão
      * @format color
    */
    textColor?: string
  }
}

const FunnelSection = ({ link, subtitle, title, description, options }: Props) => {
  return (
    <div class="lg:py-20 px-3 py-5">
      <div>
        <h2 class="lg:text-4xl text-[#76F5F7] text-center mb-4 max-w-[900px] mx-auto text-xl">{title}</h2>
        <p class="text-white lg:text-2xl text-center font-light text-base">{subtitle}</p>
      </div>
      <div class="flex mx-auto items-center max-w-[350px] md:max-w-[unset] justify-center md:h-[80vh] h-[600px]">
        <div class="h-full">
          <div class="hidden md:block h-full">
            <FunnelDesktop />
          </div>
          <div class="flex items-center md:hidden h-full max-[375px]:py-10">
            <FunnelMobile />
          </div>
        </div>
        <div class="flex flex-col h-full justify-start md:pt-[10px] md:gap-[10px] gap-[20px] mt-[90px] md:mt-0">
          {options && options.map((option, index) => (
            <div
              key={index}
              class={
                `${index === 3 ? 'md:mb-[calc(60vh_/_23)] mb-[calc(60vh_/_30)]' : 
                  index === 4 ? 'md:mb-0 mb-4' : ''
                } flex flex-col md:justify-center md:h-[calc(60vh_/_7)]`}>
              <p class="text-xs lg:text-base text-white font-medium">{option.title}</p>
              <p class="text-[10px] md:text-xs lg:text-base text-white font-light">{option.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
      {description && (
        <p class="text-white lg:text-2xl text-center font-light text-base mb-3">{description}</p>
      )}
      {link && (
        <a class="mx-auto block text-xs w-fit px-8 py-3 max-sm:px-6 text-center rounded-xl font-bold lg:text-sm hover:!brightness-75 transition-all duration-300 ease-in-out" style={{ backgroundColor: link.bgColor ?? '#BFF776', color: link?.textColor ?? '#000000' }} href={link.url}>{link.label}</a>
      )}
    </div>
  )
}

export default FunnelSection