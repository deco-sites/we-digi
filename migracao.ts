// Mapeamento de categorias: ID => { name, slug }
const categoryMapping = new Map<number, { name: string; slug: string }>([
    [113, { name: "E-commerce", slug: "e-commerce" }],
    [7, { name: "Marketing de Performance", slug: "marketing-de-performance" }],
    [2, { name: "Performance", slug: "performance" }],
    [1, { name: "Sem categoria", slug: "sem-categoria" }],
    [58, { name: "VTEX", slug: "vtex" }],
]);

/**
 * Busca todos os posts da API do WordPress utilizando paginação.
 */
async function fetchAllPosts(): Promise<any[]> {
    let allPosts: any[] = [];
    let page = 1;
    const perPage = 100;

    while (true) {
        const url = `https://wedigi.com.br/wp-json/wp/v2/posts?per_page=${perPage}&page=${page}`;
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`Erro ao buscar a página ${page}`);
            break;
        }
        const posts = await response.json();
        if (posts.length === 0) break;
        allPosts.push(...posts);
        // Se a quantidade retornada for menor que o perPage, chegou na última página
        if (posts.length < perPage) break;
        page++;
    }
    return allPosts;
}

/**
 * Constrói a estrutura JSON para cada post, conforme o formato esperado pela Deco.
 * - Mapeia as categorias de acordo com o ID usando o "categoryMapping".
 * - Se nenhuma categoria do post corresponder ao mapeamento, define a categoria "Sem categoria" (ID 1).
 * - Define o autor como "Felipe Trudes".
 */
function buildJsonForPost(post: any): any {
    // post.categories é um array de IDs das categorias do post
    const postCategories: number[] = post.categories;
    const categories = [];

    for (const catId of postCategories) {
        if (categoryMapping.has(catId)) {
            const cat = categoryMapping.get(catId)!;
            categories.push({
                name: cat.name,
                slug: cat.slug,
            });
        }
    }

    // Se nenhuma categoria mapeada foi encontrada, define a categoria padrão "Sem categoria"
    if (categories.length === 0) {
        const defaultCat = categoryMapping.get(1)!; // ID 1: "Sem categoria"
        categories.push({
            name: defaultCat.name,
            slug: defaultCat.slug,
        });
    }

    // Define o autor fixo "Felipe Trudes"
    const authors = [
        {
            name: "Felipe Trudes",
            email: "felipe.trudes@wedigi.com.br",
            jobTitle: "CEO",
            company: "we.digi",
            avatar: "https://data.decoassets.com/we-digi/259f61c9-f133-452d-aeb2-70db0427f2f7/secao1.jpg"
          }
    ];

    // Aqui você pode incluir extraProps, por exemplo, para tags, se necessário.
    const extraProps: any[] = [];

    return {
        name: "", // Será preenchido com o identificador único depois
        __resolveType: "blog/loaders/Blogpost.ts",
        post: {
            authors,
            image: post.yoast_head_json?.og_image?.url ?? null,
            categories,
            extraProps,
            title: post.yoast_head_json.title ?? post.title.rendered,
            excerpt: post.excerpt.rendered,
            // Formata a data para "YYYY-MM-DD". O campo "date" geralmente vem em ISO 8601.
            date: post.date.slice(0, 10),
            slug: post.slug,
            content: post.content.rendered,
        },
    };
}

/**
 * Função principal que:
 * - Busca os posts via API.
 * - Constrói o JSON para cada post.
 * - Salva cada post em um arquivo na pasta ".deco/blocks".
 */
async function main() {
    const posts = await fetchAllPosts();
    console.log(`Total de posts buscados: ${posts.length}`);

    const outputDir = ".deco/blocks";
    await Deno.mkdir(outputDir, { recursive: true });

    for (const post of posts) {
        const postData = buildJsonForPost(post);

        // Gera um ID único para cada post
        const randomID = crypto.randomUUID().split("-")[0];
        postData.name = `collections/blog/posts/${randomID}`;
        const fileName = `collections%2Fblog%2Fposts%2F${randomID}.json`;
        const filePath = `${outputDir}/${fileName}`;

        await Deno.writeTextFile(filePath, JSON.stringify(postData, null, 2));
        console.log(`Post salvo em: ${filePath}`);
    }
}

main().catch((error) => console.error("Erro na execução:", error));
