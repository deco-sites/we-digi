import { useState, useEffect } from "preact/hooks";
import BaseImage from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

type BaseImageProps = Parameters<typeof BaseImage>[0];
interface ValidatedImageProps extends Omit<BaseImageProps, 'src'> {
    imageUrl: string | undefined | null;
    fallbackUrl: ImageWidget;
}

export default function ValidatedImage({
    imageUrl,
    fallbackUrl,
    alt,
    ...rest
}: ValidatedImageProps) {
    const [currentSrc, setCurrentSrc] = useState(imageUrl || fallbackUrl);
    const [hasError, setHasError] = useState(!imageUrl);

    useEffect(() => {
        if (!imageUrl) {
            setCurrentSrc(fallbackUrl);
            setHasError(true);
            return;
        }

        setCurrentSrc(imageUrl);
        setHasError(false);

        let isMounted = true;
        const img = new Image();

        img.onload = () => {
            if (!isMounted) return;
            console.log(`Imagem carregada: ${imageUrl}`);
        };

        img.onerror = () => {
            if (!isMounted) return;
            console.warn(`Falha ao carregar imagem: ${imageUrl}. Usando fallback.`);
            setCurrentSrc(fallbackUrl);
            setHasError(true);
        };

        img.src = imageUrl;

        return () => {
            isMounted = false;
            img.onload = null;
            img.onerror = null;
        };
    }, [imageUrl, fallbackUrl]);

    const effectiveAlt = hasError ? `Placeholder para ${alt || 'post'}` : alt;

    return <BaseImage src={currentSrc} alt={effectiveAlt} {...rest} />;
}