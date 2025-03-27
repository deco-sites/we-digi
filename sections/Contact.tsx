// import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
// import { useState } from "preact/hooks";
import ContactForm from "site/islands/ContactForm.tsx";

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
    <div class="flex w-full max-md:[&]:[background-image:none_!important] bg-[#0C1E2A]" style={{ backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
      <div class="flex max-md:flex-col gap-6 md:gap-20 lg:container lg:max-w-[1232px] mx-auto md:max-w-6xl max-lg:px-4 pb-8 pt-8 md:pt-24 md:pb-10 text-sm">
        <div class="w-full md:w-1/2 lg:p-4">
          {tag && <p class="text-[#76F5F7] text-base mb-4">{tag}</p>}
          {title && <p class="text-[#ababab] lg:text-[40px] text-2xl mb-4 lg:mb-16">{title}</p>}
          {description && <p class="text-white lg:text-2xl text-base">{description}</p>}
        </div>
        {/* <ContactForm /> */}
        <div class="w-full md:w-[52%] contact-form-container" id="contact_form" />
      </div>
    </div>
  );
}
