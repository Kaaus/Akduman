import ArticleCard from "@/components/ArticleCard";
import Breadcrumb from "@/components/Breadcrumb";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import { getAllArticles } from "@/lib/articles";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Hukuki Makaleler | Akduman Hukuk Bürosu",
  description:
    "Miras, trafik kazası, kira ve iş hukuku başta olmak üzere güncel hukuki bilgilendirme yazıları.",
  path: "/hukuki-makaleler/",
});

export default function MakalelerPage() {
  const articles = getAllArticles();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: "Hukuki Makaleler", path: "/hukuki-makaleler/" },
        ])}
      />

      <section className="bg-white">
        <div className="container-site py-12 md:py-16">
          <Breadcrumb items={[{ label: "Hukuki Makaleler" }]} />
          <h1 className="mt-6 text-navy-800">Hukuki Makaleler</h1>
          <Reveal>
            <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
