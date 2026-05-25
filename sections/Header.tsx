import type { ImageWidget } from "apps/admin/widgets.ts";
import HeaderComponent from '../islands/Header.tsx';

export interface CTA {
  id?: string;
  href: string;
  text: string;
  outline?: boolean;
}

export interface Nav {
  logo?: {
    src?: ImageWidget;
    alt?: string;
  };
  navigation?: {
    links: {
      label?: string;
      url?: string;
    }[];
    buttons: CTA[];
  };
}

export default function Header({
  logo = {
    src:
      "https://decoims.com/we-digi/09585ded-0432-44a0-becd-f73bf0278870/67120bcd_67120bcd-936a-4ea5-a760-02ed5c4a3d04.svg",
    alt: "Logo",
  },
  navigation = {
    links: [
      { label: "Home", url: "/" },
      { label: "About us", url: "/" },
      { label: "Princing", url: "/" },
      { label: "Contact", url: "/" },
    ],
    buttons: [
      { id: "change-me-1", href: "/", text: "Change me", outline: false },
      { id: "change-me-2", href: "/", text: "Change me", outline: true },
    ],
  },
}: Nav) {

  return(
    <>
        <HeaderComponent logo={logo} navigation={navigation}/>
    </>
  )
}
