/**
 * Bölüm başlığı: üstte kicker + altında H2.
 * Açık zeminde kicker navy (bronz doktrini), koyu zeminde bronze-300.
 */
export default function SectionHeading({
  kicker,
  title,
  light = false,
  className = "",
}: {
  kicker?: string;
  title: string;
  /** Koyu zemin (navy) üzerinde kullanım. */
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      {kicker && (
        <p className={`${light ? "kicker-dark" : "kicker"} mb-3`}>{kicker}</p>
      )}
      <h2 className={light ? "!text-[#F4F1EA]" : ""}>{title}</h2>
    </div>
  );
}
