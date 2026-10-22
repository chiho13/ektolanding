import appIcon from "./assets/ekto.png";

const APP_STORE_URL = "https://apps.apple.com/app/id6740196773";
const ARTICLE_DATE = "2026-10-22";

const steps = [
  {
    title: "Elige el modo Traducir",
    body: "Abre ekto y toca TRADUCIR. Lo que dicen los demás aparece en tu pantalla como subtítulos en español, mientras hablan.",
  },
  {
    title: "Deja la detección automática y elige Español",
    body: "En Traducir de, deja la detección automática: ekto reconoce el idioma de quien habla, aunque cambie a mitad de la conversación. En Traducir a, elige Español.",
  },
  {
    title: "Toca una vez y pon el teléfono entre ustedes",
    body: "Deja el teléfono sobre la mesa o en la mano, apuntando hacia quien habla. No tienes que tocar nada más: la traducción sigue sola. ekto necesita conexión a Internet y acceso al micrófono.",
  },
];

const situations = [
  {
    title: "Cenas y reuniones con amigos o familia",
    body: "La familia de tu pareja, los amigos de tus compañeros, una cena donde todos hablan a la vez. Deja ekto en la mesa y sigue la conversación sin pedir que te repitan cada frase.",
  },
  {
    title: "De viaje",
    body: "El guía del tour, la recepción del hotel, el conductor que te explica el camino. Para preguntas rápidas, toca, lee la respuesta y listo.",
  },
  {
    title: "Vecinos, compañeros de casa y la vida en otro país",
    body: "Si vives en el extranjero, las conversaciones del día a día no esperan a que aprendas el idioma. ekto te ayuda a entender mientras tanto.",
  },
  {
    title: "Eventos sociales y networking",
    body: "En una feria, un evento o una charla informal después de una presentación, entiende con quién hablas y qué te está contando.",
  },
];

const examples = [
  {
    language: "Inglés",
    original: "We usually have dinner around seven, but tonight we're waiting for my brother.",
    spanish: "Normalmente cenamos alrededor de las siete, pero esta noche estamos esperando a mi hermano.",
    lang: "en",
  },
  {
    language: "Italiano",
    original: "Il museo chiude alle sei, quindi vi conviene entrare entro le cinque.",
    spanish: "El museo cierra a las seis, así que les conviene entrar antes de las cinco.",
    lang: "it",
  },
];

const tips = [
  "Si sabes qué idioma van a hablar, elígelo en Traducir de: la detección automática es cómoda, pero elegir el idioma mejora la precisión.",
  "Agrega a Palabras personalizadas los nombres de personas y lugares que se repiten en tus conversaciones.",
  "Si necesitas usar otra app mientras escuchas, como el mapa, activa los subtítulos flotantes para seguir leyendo la traducción.",
  "Revisa con cuidado nombres, números, horas y direcciones. Si algo no tiene sentido, pide que lo repitan.",
  "Avisa a la otra persona de que estás usando un traductor. La mayoría habla un poco más despacio y con frases más claras.",
];

const faqs = [
  {
    question: "¿ekto traduce una conversación a español en tiempo real?",
    answer: "Sí. En el modo Traducir, deja la detección automática en Traducir de y elige Español en Traducir a. Verás la traducción al español mientras la otra persona habla. Necesitas conexión a Internet y acceso al micrófono.",
  },
  {
    question: "¿Qué idiomas entiende ekto?",
    answer: "ekto traduce entre más de 37 idiomas. Con la detección automática reconoce el idioma de quien habla, así que puedes usarlo aunque no sepas qué idioma van a hablar.",
  },
  {
    question: "¿La otra persona necesita descargar la app?",
    answer: "No. En el modo Traducir solo necesitas tu teléfono. En el modo Dos vías, los dos usan el mismo teléfono: cada uno lee la conversación en su idioma.",
  },
  {
    question: "¿ekto es gratis?",
    answer: "Puedes descargar ekto gratis y probarlo con 30 minutos gratuitos. Con la suscripción PRO, el uso es ilimitado, con sesiones de hasta 2 horas cada una.",
  },
  {
    question: "¿ekto graba o guarda mi audio?",
    answer: "No se guarda el audio ni se usan tus conversaciones para entrenar IA. Las transcripciones quedan en el Historial para que puedas repasarlas después.",
  },
];

function SpanishConversationsPage() {
  return (
    <div className="min-h-screen bg-slate-50" lang="es">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-[1000px] items-center justify-between gap-4">
          <a href="/es/" className="flex items-center gap-3">
            <img src={appIcon} alt="Icono de la app ekto" className="h-10 w-10 rounded-lg shadow-lg" />
            <span className="text-lg font-bold text-slate-900" lang="en">ekto: Live AI Captions</span>
          </a>
          <a href={APP_STORE_URL} className="shrink-0 rounded-lg bg-blue-700 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-800 sm:text-base">Descargar gratis</a>
        </div>
      </header>

      <main className="px-6 py-12 sm:py-16">
        <article className="mx-auto max-w-[1000px]">
          <nav aria-label="Ubicación actual" className="mb-6 text-sm text-slate-600">
            <a href="/es/blog/" className="font-semibold text-blue-700 underline underline-offset-4">Ver todo el blog</a>
            <span className="mx-2" aria-hidden="true">/</span>Conversaciones en otro idioma
          </nav>
          <p className="mb-2 text-sm font-semibold text-blue-700">Cualquier idioma → español · Guía de traducción en vivo</p>
          <p className="mb-6 text-sm text-slate-500">Equipo de ekto · <time dateTime={ARTICLE_DATE}>22 de octubre de 2026</time></p>
          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl">Cómo entender una conversación en otro idioma en tiempo real</h1>
          <p className="mb-6 text-lg leading-8 text-slate-700">Estás en una cena y todos se ríen de algo que no entendiste. El guía explica la historia del lugar y te quedas con la mitad. Tu vecino te cuenta algo importante y solo captas palabras sueltas. Asientes, sonríes y esperas que nadie te pregunte nada.</p>
          <p className="mb-10 text-lg leading-8 text-slate-700">Con ekto, lo que dicen los demás aparece en tu teléfono traducido al español, mientras hablan. No hace falta saber de antemano qué idioma van a hablar ni pedir a nadie que descargue una app.</p>

          <aside aria-label="Resumen" className="mb-12 rounded-2xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
            <h2 className="mb-3 text-2xl font-bold text-slate-900">Ellos hablan, tú lees en español</h2>
            <p className="text-lg leading-8 text-slate-700">Abre ekto → elige Traducir → detección automática a español → toca una vez y lee mientras hablan.</p>
            <p className="mt-4 text-base leading-7 text-slate-600">Las traducciones de esta guía son ejemplos. La traducción real depende de lo que se diga y del contexto.</p>
          </aside>

          <section aria-labelledby="setup" className="mb-12">
            <h2 id="setup" className="mb-6 text-2xl font-bold text-slate-900 sm:text-3xl">Configura ekto en 1 minuto</h2>
            <ol className="list-decimal space-y-7 pl-6 text-lg leading-8 text-slate-700">
              {steps.map((step) => <li key={step.title}><h3 className="font-bold text-slate-900">{step.title}</h3><p className="mt-2">{step.body}</p></li>)}
            </ol>
          </section>

          <section aria-labelledby="situations" className="mb-12">
            <h2 id="situations" className="mb-5 text-2xl font-bold text-slate-900 sm:text-3xl">Traductor de conversaciones para el día a día</h2>
            <p className="mb-6 text-lg leading-8 text-slate-700">Algunas conversaciones duran diez segundos y otras toda una cena. ekto sirve para las dos: toca para una pregunta rápida, o déjalo traduciendo sin tocar nada durante una conversación larga.</p>
            <div className="grid gap-6 md:grid-cols-2">
              {situations.map((situation) => (
                <div key={situation.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <h3 className="mb-3 text-xl font-bold text-slate-900">{situation.title}</h3>
                  <p className="text-base leading-7 text-slate-700">{situation.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="examples" className="mb-12">
            <h2 id="examples" className="mb-5 text-2xl font-bold text-slate-900 sm:text-3xl">Lo que verás en pantalla</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {examples.map((example) => (
                <section key={example.language} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <h3 className="mb-4 text-xl font-bold text-slate-900">Si te hablan en {example.language.toLowerCase()}</h3>
                  <p className="mb-1 text-sm font-semibold text-slate-500">Lo que dicen</p>
                  <p className="mb-4 text-base leading-7 text-slate-700" lang={example.lang}>{example.original}</p>
                  <p className="mb-1 text-sm font-semibold text-blue-700">Lo que lees en español</p>
                  <p className="text-lg leading-8 text-slate-900">{example.spanish}</p>
                </section>
              ))}
            </div>
          </section>

          <section aria-labelledby="two-way" className="mb-12 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <h2 id="two-way" className="mb-5 text-2xl font-bold text-slate-900 sm:text-3xl">Cuando también quieres responder: el modo Dos vías</h2>
            <p className="mb-5 text-lg leading-8 text-slate-700">Si la conversación va en las dos direcciones, toca DOS VÍAS y elige los dos idiomas. La pantalla se divide en dos: tu mitad muestra la conversación en español y la otra mitad, en el idioma de la otra persona. Puedes girar la mitad de arriba para que la lea de frente con el teléfono sobre la mesa.</p>
            <p className="text-lg leading-8 text-slate-700">Habla en español y ekto lo traduce. Si prefieres no hablar, toca Escribe una respuesta y escribe en español. Activa la reproducción automática para que ekto lea las traducciones en voz alta.</p>
          </section>

          <section aria-labelledby="tips" className="mb-12">
            <h2 id="tips" className="mb-5 text-2xl font-bold text-slate-900 sm:text-3xl">Consejos para entender mejor</h2>
            <ul className="list-disc space-y-3 pl-6 text-lg leading-8 text-slate-700">
              {tips.map((tip) => <li key={tip}>{tip}</li>)}
            </ul>
          </section>

          <section aria-labelledby="faq" className="mb-12">
            <h2 id="faq" className="mb-6 text-2xl font-bold text-slate-900 sm:text-3xl">Preguntas frecuentes</h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.question}>
                  <h3 className="mb-2 text-xl font-bold text-slate-900">{faq.question}</h3>
                  <p className="text-lg leading-8 text-slate-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl bg-slate-900 px-6 py-10 text-center sm:px-8">
            <h2 className="mb-4 text-3xl font-bold text-white">Entiende tu próxima conversación en otro idioma</h2>
            <p className="mb-6 text-lg leading-8 text-slate-300">Descarga ekto, deja la detección automática a español y pruébalo en tu próxima conversación.</p>
            <a href={APP_STORE_URL} className="inline-flex rounded-lg bg-white px-6 py-3 font-semibold text-slate-900 transition-colors hover:bg-blue-50">Descargar ekto en el App Store</a>
            <p className="mt-4 text-sm leading-6 text-slate-400">Descarga gratuita · 30 minutos gratis para probar</p>
          </section>
          <footer className="mt-10 text-base leading-7 text-slate-600">
            <p>¿Tienes clases o reuniones en inglés? Lee también <a href="/es/blog/como-entender-clases-y-reuniones-de-trabajo-en-ingles/" className="font-semibold text-blue-700 underline underline-offset-4">cómo entender clases y reuniones de trabajo en inglés</a>.</p>
          </footer>
        </article>
      </main>
    </div>
  );
}

export default SpanishConversationsPage;
