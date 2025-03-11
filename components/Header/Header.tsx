import Image from "apps/website/components/Image.tsx";
import Icon from "../ui/Icon.tsx";
import useScroll from "site/sdk/useScroll.ts";
import { Nav } from "site/sections/Header.tsx";
import { FunctionalComponent } from 'preact';

const HeaderComponent: FunctionalComponent<Nav> = ({ logo, navigation }) => {
    const scrolled = useScroll();

    if(!logo || !navigation) return null

    return (
        <nav class={`drawer drawer-end fixed transition-all duration-300 ease-in-out top-0 z-50 bg-[#08151D] ${scrolled ? 'lg:bg-[#1E1E1E80]' : 'lg:bg-transparent'} `}>
            <input id="mobile-drawer-nav" type="checkbox" class="drawer-toggle" />

            {/* main content */}
            <div class="drawer-content lg:px-12 px-4 flex gap-8 items-center justify-between py-4">
                <a href="/">
                    <Image src={logo.src || ""} width={100} height={28} alt={logo.alt} />
                </a>

                <div class="hidden items-center justify-between lg:flex w-auto">
                    <ul class="flex">
                        {navigation.links.map((link) => (
                            <li>
                                <a
                                    href={link.url}
                                    aria-label={link.label}
                                    class="link no-underline hover:underline p-4"
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <ul class="flex gap-3">
                        {navigation.buttons?.map((item) => (
                            <a
                                key={item?.id}
                                id={item?.id}
                                href={item?.href ?? "#"}
                                target={item?.href.includes("http") ? "_blank" : "_self"}
                                class={`font-normal btn btn-primary ${item.outline && "btn-outline"
                                    }`}
                            >
                                {item?.text}
                            </a>
                        ))}
                    </ul>
                </div>

                <label
                    htmlFor="mobile-drawer-nav"
                    class="flex lg:hidden btn btn-ghost drawer-button"
                >
                    <Icon id="Bars3" size={24} strokeWidth={0.1} />
                </label>
            </div>

            {/* sidebar */}
            <aside class="drawer-side h-full z-50 overflow-hidden">
                {/* Close when clicking on overlay */}
                <label
                    htmlFor="mobile-drawer-nav"
                    aria-label="close sidebar"
                    class="drawer-overlay"
                />

                <div class="flex flex-col gap-8 min-h-full w-80 bg-base-100 text-base-content">
                    <a class="p-4" href="/">
                        <Image
                            src={logo.src || ""}
                            width={100}
                            height={28}
                            alt={logo.alt}
                        />
                    </a>

                    <ul class="menu gap-7">
                        {navigation?.links.map((link) => (
                            <li>
                                <a href={link.url} aria-label={link.label}>
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <ul class="p-4 flex items-center gap-3">
                        {navigation.buttons?.map((item) => (
                            <a
                                key={item?.id}
                                id={item?.id}
                                href={item?.href ?? "#"}
                                target={item?.href.includes("http") ? "_blank" : "_self"}
                                class={`font-normal btn btn-primary ${item.outline && "btn-outline"
                                    }`}
                            >
                                {item?.text}
                            </a>
                        ))}
                    </ul>
                </div>
            </aside>
        </nav>
    );
}

export default HeaderComponent;