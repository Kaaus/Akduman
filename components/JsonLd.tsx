/**
 * JSON-LD yapılandırılmış verisini <script type="application/ld+json">
 * olarak basar. Veri, lib/seo.ts içindeki üreticilerden gelir.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
