import Link from "next/link";
import { SERVICES } from "@/lib/site";

/** 404 — bulunamayan sayfalar (eski URL kırıkları dâhil). */
export default function NotFound() {
  return (
    <section className="bg-white">
      <div className="container-site py-24 text-center">
        <p className="kicker mb-4">404</p>
        <h1 className="mx-auto max-w-2xl">
          Aradığınız sayfa bulunamadı.
        </h1>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            Ana Sayfa
          </Link>
          <Link href="/iletisim/" className="btn-secondary">
            İletişim
          </Link>
        </div>

        {/* Popüler faaliyet alanları */}
        <div className="mx-auto mt-16 max-w-2xl border-t border-line pt-10">
          <p className="kicker mb-5">Faaliyet Alanlarımız</p>
          <ul className="flex flex-wrap justify-center gap-x-7 gap-y-3">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/${s.slug}/`}
                  className="text-[15px] font-semibold text-navy-800 transition-colors hover:text-bronze-700"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
