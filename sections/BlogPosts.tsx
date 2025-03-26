import type { ImageWidget } from "apps/admin/widgets.ts";
import { BlogPost } from "apps/blog/types.ts";
import BlogPostsIsland from "site/islands/BlogPostsIsland.tsx";
import { postcss } from "npm:tailwindcss@3.4.1";

export interface CTA {
  text?: string;
}
/** @title {{{title}}} */
export interface Post {
  url?: string;
  title?: string;
  author?: string;
  excerpt?: string;
  image?: ImageWidget;
  date?: string;
  readingTime?: string;
  tags?: string[];
}
export interface Props {
  cta?: CTA;
  posts?: BlogPost[] | null;
  pagination?: {
    /**
     * @title First page
     * @description Leave it as 0 to start from the first page
     */
    page?: number;
    /** @title items per page */
    perPage?: number;
  };
}

export default function BlogPosts(
  props: Props,
) {
  console.log(props.posts?.length, 'leeeeength')
  return (
    <BlogPostsIsland {...props}/>
  );
}
