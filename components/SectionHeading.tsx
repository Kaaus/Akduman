/**
 * Bölüm başlığı: üstte kicker (bronz, uppercase, 0.14em) + altında H2.
 * Koyu zeminlerde light varyantı kullanılır.
 */
export default function SectionHeading({
  kicker,
  title,
  light = false,
  className = "",
}: {
  kicker?: string;
  title: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      {kicker && <p className="kicker mb-3">{kicker}</p>}
      <h2 className={light ? "text-white" : "text-navy-800"}>{title}</h2>
    </div>
  );
}
