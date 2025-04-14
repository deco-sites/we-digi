export default async function isImageValidServerSide(
    imageUrl: string,
    timeout = 2000,
): Promise<Boolean> {
    if (!imageUrl || typeof imageUrl !== 'string' || imageUrl.trim() === '') {
        console.log("validateImageServerSide: No valid image URL provided, using fallback.");
        return false;
    }

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(imageUrl, {
            method: 'HEAD',
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.ok) {
            const contentType = response.headers.get('content-type');
            // 3. Verifica se o Content-Type indica uma imagem
            if (contentType && contentType.startsWith('image/')) {
                // console.log(`isImageValidServerSide: Validação bem-sucedida para ${imageUrl}`);
                return true; // É uma imagem válida!
            } else {
                // console.warn(`isImageValidServerSide: Content-Type inválido (${contentType}) para ${imageUrl}`);
                return false; // Status OK, mas não é uma imagem
            }
        } else {
            // console.warn(`isImageValidServerSide: Status HTTP ${response.status} para ${imageUrl}`);
            return false; // Status não OK (404, 403, 5xx, etc.)
        }
    } catch (error) {
        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                console.error(`validateImageServerSide: Timeout (${timeout}ms) ao validar URL ${imageUrl}. Usando fallback.`);
            } else if (error.message?.includes('Invalid URL') || error.message?.includes('fetch failed')) {
                console.error(`validateImageServerSide: Formato de URL inválido ou erro de fetch para: ${imageUrl}. Usando fallback.`);
            }
            else {
                console.error(`validateImageServerSide: Erro genérico (${error.name}) ao validar URL ${imageUrl}: ${error.message}. Usando fallback.`);
            }
        } else {
            console.error(`validateImageServerSide: Erro inesperado (não-objeto Error) capturado ao validar URL ${imageUrl}:`, error, ". Usando fallback.");
        }
        return false;
    }
}