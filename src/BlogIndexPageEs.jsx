import appIcon from "./assets/ekto.png";

function BlogIndexPageEs() {
  return (
    <div className="min-h-screen bg-slate-50" lang="es">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-[1000px] items-center justify-between gap-4">
          <a href="/es/" className="flex items-center gap-3">
            <img src={appIcon} alt="Icono de la app ekto" className="h-10 w-10 rounded-lg shadow-lg" />
            <span className="text-lg font-bold text-slate-900" lang="en">ekto: Live AI Captions</span>
          </a>
          <a href="https://apps.apple.com/app/id6740196773" className="shrink-0 rounded-lg bg-blue-700 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-800 sm:text-base">Descargar gratis</a>
        </div>
      </header>

      <main className="px-6 py-12 sm:py-16">
        <section className="mx-auto max-w-[1000px]">
          <nav aria-label="Idioma del blog" className="mb-8 flex flex-wrap gap-4 text-sm">
            <a href="/blog/" lang="en" className="font-semibold text-blue-700 underline underline-offset-4">English</a>
            <a href="/ja/blog/" lang="ja" className="font-semibold text-blue-700 underline underline-offset-4">日本語</a>
            <a href="/ko/blog/" lang="ko" className="font-semibold text-blue-700 underline underline-offset-4">한국어</a>
            <span aria-current="page" className="font-semibold text-slate-900">Español</span>
          </nav>
          <p className="mb-4 text-sm font-semibold text-blue-700">Blog de ekto</p>
          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl">Guías de traducción y subtítulos en vivo</h1>
          <p className="mb-12 max-w-3xl text-lg leading-8 text-slate-700">Consejos prácticos para entender conversaciones, clases y reuniones en otro idioma con subtítulos y traducción en tiempo real.</p>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-lg">
            <p className="mb-3 text-sm font-semibold text-blue-700">Conversaciones en otro idioma</p>
            <h2 className="mb-3 text-2xl font-bold text-slate-900">
              <a href="/es/blog/traductor-de-conversaciones-en-tiempo-real/" className="hover:text-blue-700">Cómo entender una conversación en otro idioma en tiempo real</a>
            </h2>
            <p className="mb-4 text-lg leading-8 text-slate-700">Cenas, viajes y la vida en otro país: ekto detecta el idioma de quien habla y te muestra la traducción al español mientras hablan.</p>
            <a href="/es/blog/traductor-de-conversaciones-en-tiempo-real/" className="inline-flex font-semibold text-blue-700 hover:text-blue-800">Leer la guía →</a>
          </article>
          <article className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-lg">
            <p className="mb-3 text-sm font-semibold text-blue-700">Clases y trabajo en inglés</p>
            <h2 className="mb-3 text-2xl font-bold text-slate-900">
              <a href="/es/blog/como-entender-clases-y-reuniones-de-trabajo-en-ingles/" className="hover:text-blue-700">Cómo entender clases y reuniones de trabajo en inglés</a>
            </h2>
            <p className="mb-4 text-lg leading-8 text-slate-700">Lee en español lo que dicen el profesor o tus compañeros de trabajo, toma apuntes sin perder los subtítulos y repasa con un resumen al terminar.</p>
            <a href="/es/blog/como-entender-clases-y-reuniones-de-trabajo-en-ingles/" className="inline-flex font-semibold text-blue-700 hover:text-blue-800">Leer la guía →</a>
          </article>
        </section>
      </main>
    </div>
  );
}

export default BlogIndexPageEs;
