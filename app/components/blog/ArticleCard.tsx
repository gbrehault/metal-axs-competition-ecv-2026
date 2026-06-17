import Image from 'next/image';
import Link from 'next/link';
import type { Post } from '@/app/types/post';
import { toPlainText } from '@/app/lib/utils';

type PostWithCategories = Post & {
  categories?: {
    nodes: { name: string; slug: string }[];
  };
  article?: {
    texteIntroduction?: string | null;
    imageDeMiseEnAvant?: {
      node?: {
        sourceUrl?: string | null;
        altText?: string | null;
      } | null;
    } | null;
  } | null;
};

export default function ArticleCard({ post }: { post: PostWithCategories }) {
  const image = post.article?.imageDeMiseEnAvant?.node ?? post.featuredImage?.node;
  const img = image?.sourceUrl ?? '';
  const alt = image?.altText ?? post.title;
  const title = post.title;
  const texteIntroduction = toPlainText(post.article?.texteIntroduction ?? '');
  const category = post.categories?.nodes[0]?.name?.toUpperCase() ?? 'ARTICLE';

  return (
    <Link href={`/blog/${post.slug}`} aria-label={title} className="group flex flex-col gap-3">
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-secondary/10 rounded-2xl">
        {img ? (
          <Image
            src={img}
            alt={alt}
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="h-full w-full bg-secondary/20" />
        )}
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium text-secondary/50 uppercase tracking-widest">
          {category}
        </span>
        <h2 className="text-xl font-bold font-primary text-secondary leading-snug group-hover:text-primary transition-colors">
          {title}
        </h2>
        {texteIntroduction && (
          <p className="text-sm text-secondary/40 line-clamp-2 leading-relaxed tracking-wide mt-1">
            {texteIntroduction}
          </p>
        )}
      </div>
    </Link>
  );
}

export type { PostWithCategories };
