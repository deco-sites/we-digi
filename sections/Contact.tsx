import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Column {
  title: string;
  items: Items[];
}

export interface Items {
  label: string;
  href: string;
}

export interface Subscribe {
  title?: string;
  description?: string;
  instructions: string;
}

export interface Social {
  network: "Facebook" | "Instagram" | "Linkedin" | "X - Twitter" | "Youtube";
  href: string;
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
   * @title Description
   */
  description?: string;
  subscribe?: Subscribe;
  background?: ImageWidget;
  
}

export default function Footer({
  description = "we.digi",
  title = "we.digi",
  tag,
  background,
  subscribe = {
    title: "Subcribe",
    description:
      "Join our newsletter to stay up to date on features and releases.",
    instructions:
      "By subscribing you agree to with our <a href='/' target='_blank' class='link'>Privacy Policy</a> and provide consent to receive updates from our company.",
  },
}: Props) {
  return (
    <div class="flex w-full max-md:[&]:[background-image:none_!important] bg-[#0C1E2A]" style={{backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}> 
      <div class="flex max-md:flex-col gap-6 md:gap-20 lg:container lg:max-w-[1232px] mx-auto md:max-w-6xl max-lg:px-4 pb-8 pt-8 md:pt-24 md:pb-10 text-sm">
          <div class="w-full md:w-1/2 lg:p-4">
            {tag && <p class="text-[#76F5F7] text-base mb-4">{tag}</p>}
            {title && <p class="text-[#ababab] text-[40px] mb-12 lg:mb-16">{title}</p>}
            {description && <p class="text-white text-2xl">{description}</p>}
          </div>
          
          <div class="w-full md:w-[52%]">
            <form class="flex flex-col gap-[1.7rem] md:p-4 lg:p-0">
              {/* <!-- Nome e Sobrenome --> */}
              <div class="flex gap-4">
                <input
                  type="text"
                  placeholder="Primeiro Nome*"
                  class="w-full input input-bordered border-[#4C4B4B]"
                />
                <input
                  type="text"
                  placeholder="Sobrenome*"
                  class="w-full input input-bordered border-[#4C4B4B]"
                />
              </div>

              {/* <!-- E-mail Corporativo --> */}
              <input
                type="email"
                placeholder="E-mail corporativo*"
                class="w-full input input-bordered border-[#4C4B4B]"
              />

              {/* <!-- Telefone e Cargo --> */}
              <div class="flex gap-4">
                <input
                  type="tel"
                  placeholder="Telefone*"
                  class="w-full input input-bordered border-[#4C4B4B]"
                />
                <select class="w-full input input-bordered border-[#4C4B4B]">
                  <option value="" disabled selected>Cargo*</option>
                  <option value="Gerente">Gerente</option>
                  <option value="Supervisor">Supervisor</option>
                  <option value="Assistente">Assistente</option>
                  <option value="Analista">Analista</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>

              {/* <!-- Assunto de Interesse --> */}
              <input
                type="text"
                placeholder="Assunto de Interesse*"
                class="w-full input input-bordered border-[#4C4B4B]"
              />

              {/* <!-- Mensagem --> */}
              <textarea
                placeholder="Mensagem"
                class="w-full input input-bordered border-[#4C4B4B] h-32 px-4 py-2 rounded-[10px] max-h-32"
              ></textarea>

              {/* <!-- Alerta --> */}
              <p class="text-sm md:text-xs text-white ">
                Alerta de Golpe! Estão se passando pela nossa empresa oferecendo oportunidades de trabalho. Caso tenha recebido algum contato pelo WhatsApp, desconsidere, bloqueie e faça a denúncia do número.
              </p>

              {/* <!-- Botão de Enviar --> */}
              <button
                type="submit"
                class="btn btn-outline font-normal btn-primary text-base mt-4 w-fit px-12 ml-auto"
                aria-label="Enviar"
              >
                ENVIAR →
              </button>

              
            </form>
          </div>
        
      </div>
    </div>
  );
}
