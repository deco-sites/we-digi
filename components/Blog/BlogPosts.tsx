/** BlogPostsIsland.tsx */
import { useState } from "preact/hooks";
import {type Props} from "site/sections/BlogPosts.tsx"
import Image from "apps/website/components/Image.tsx";
import ValidadeImage from "site/islands/ValidadeImage.tsx";


// Um container que pode ser um componente simples que centraliza o conteúdo
function Container({ children }: { children: preact.ComponentChildren }) {
    return (
        <div class="container lg:mx-auto lg:py-14 mx-2 py-12 text-sm">
            <div class="space-y-8">{children}</div>
        </div>
    );
}

export default function BlogPostsIsland({
    cta = { text: "Show more" },
    posts: initialPosts,
    pagination: { page: initialPage = 0, perPage = 6 } = {},
}: Props) {
    console.log("posts", initialPosts)
    // Estado para controlar quantos grupos de posts estão sendo exibidos
    const [page, setPage] = useState(initialPage);
    // Nesta versão, começamos sempre do início e vamos mostrando mais posts
    const from = 0;
    const to = perPage * (page + 1);

    const handleLoadMore = () => {
        setPage((prev) => prev + 1);
    };

    return (
        <Container>
            <div class="gap-8 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 pr-3">
                {initialPosts?.slice(from, to).map((post) => (
                    <a
                        href={`/insights/post/${post.slug}`}
                        class="border border-secondary overflow-hidden rounded-lg"
                    >
                        <ValidadeImage
                            fallbackUrl="https://assets.decocache.com/we-digi/62266f95-595c-40ee-a97a-7474aa6ffc61/home-main.jpg"
                            width={380}
                            height={274}
                            class="object-fit w-full"
                            sizes="(max-width: 640px) 100vw, 30vw"
                            imageUrl={post.image}
                            alt={post.image || "Imagem do post"}
                            decoding="async"
                            loading="lazy"
                        />
                        <div class="p-6 space-y-4">
                            {/* Cálculo simples de tempo de leitura */}
                            <div class="font-semibold">
                                {Math.round(post.content.split(" ").length / 250)} min
                            </div>
                            <div class="space-y-2">
                                <h3 class="text-2xl line-clamp-3 h-24">{post.title}</h3>
                                <div
                                    class="line-clamp-3"
                                    dangerouslySetInnerHTML={{ __html: post.excerpt }}
                                />
                            </div>
                            <div class="flex flex-wrap gap-2">
                                {post.categories?.map((category) => (
                                    <div class="badge badge-lg badge-primary text-xs">
                                        {category.name}
                                    </div>
                                ))}
                            </div>
                            <div class="flex flex-wrap gap-2">
                                <span>
                                    {post.date
                                        ? new Date(post.date).toLocaleDateString("pt-BR", {
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric",
                                        })
                                        : ""}
                                </span>
                                <span>•</span>
                                <span>{post.authors?.[0]?.name}</span>
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            {/* Exibe o botão "Show More" somente se ainda houver posts para carregar */}
            {initialPosts && to < initialPosts.length && (
                <div class="flex justify-center w-full">
                    <button
                        onClick={handleLoadMore}
                        aria-label={cta.text}
                        class="btn btn-primary"
                    >
                        <span>{cta.text}</span>
                    </button>
                </div>
            )}
        </Container>
    );
}
