import { ImageWidget } from "apps/admin/widgets.ts";

interface Props{
    logo: ImageWidget
    alt?: string
}

const SimpleHeader = ({ logo, alt }:Props) => {
  return (
    <header class="flex items-center justify-center py-5">
        <a href="/">
            <img src={logo} alt={alt} />
        </a>
    </header>
  )
}

export default SimpleHeader