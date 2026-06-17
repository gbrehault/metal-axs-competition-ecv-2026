import Image from 'next/image';
import Link from 'next/link';
import type { Post } from '@/app/types/post';
import { toPlainText } from '@/app/lib/utils';

type PostWithCategories = Post & {
  categories?: {
    nodes: { name: string; slug: string }[];
  };
};

export default function ArticleCard({ post }: { post: PostWithCategories }) {
  const img = post.featuredImage?.node;
  const title = post.title;
  const excerpt = toPlainText(post.excerpt ?? '');
  const category = post.categories?.nodes[0]?.name?.toUpperCase() ?? 'ARTICLE';

  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col gap-3">
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl bg-secondary/10">
        {img?.sourceUrl ? (
          <Image
            src={img.sourceUrl}
            alt={img.altText ?? title}
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-secondary/20" />
        )}
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium text-secondary/50 uppercase tracking-widest">
          {category}
        </span>
        <h2 className="text-xl font-bold font-primary text-secondary leading-snug group-hover:text-primary transition-colors">
          {title}
        </h2>
        {excerpt && (
          <p className="text-sm text-secondary/60 line-clamp-3 leading-relaxed">
            {excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}

export type { PostWithCategories };
