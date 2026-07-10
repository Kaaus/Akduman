import ArticleCard from "@/components/ArticleCard";
import SectionHeading from "@/components/SectionHeading";
import { getArticlesByAlan } from "@/lib/articles";

/**
 * Hizmet sayfalarındaki "İlgili yazılarımız" bloğu.
 * Alan etiketine sahip makale yoksa blok HİÇ render edilmez.
 * Anchor metni daima makale başlığının kendisidir.
 */
export default function RelatedArticles({ alan }: { alan: string }) {
  const articles = getArticlesByAlan(alan);
  if (articles.length === 0) return null;

  return (
    <section aria-label="İlgili yazılarımız" className="border-t border-line bg-paper">
      <div className="container-site py-16">
        <SectionHeading kicker="Hukuki Makaleler" title="İlgili yazılarımız" />
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
