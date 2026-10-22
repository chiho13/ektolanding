import appIcon from "./assets/ekto.png";

const APP_STORE_URL = "https://apps.apple.com/app/id6740196773";
const ARTICLE_DATE = "2026-10-22";

const steps = [
  {
    title: "Elige el modo Traducir",
    body: "Abre ekto y toca TRADUCIR. Este modo muestra en español lo que se dice en inglés, como subtítulos que aparecen mientras la persona habla.",
  },
  {
    title: "Configura inglés → español",
    body: "En Traducir de, elige Inglés. En Traducir a, elige Español. Si en la clase o en la reunión se mezclan idiomas, deja la detección automática.",
  },
  {
    title: "Toca una vez y deja el teléfono a la vista",
    body: "ekto necesita conexión a Internet y acceso al micrófono. No tienes que tocar nada mientras hablan: la traducción sigue sola durante toda la sesión, incluso si estás al fondo del aula.",
  },
];

const lectureTips = [
  {
    title: "Siéntate donde quieras",
    body: "ekto capta la voz del profesor desde lejos, incluso desde las últimas filas de un aula grande.",
  },
  {
    title: "Toma apuntes sin perder los subtítulos",
    body: "Activa los subtítulos flotantes para seguir leyendo la traducción mientras escribes en otra app.",
  },
  {
    title: "Enseña a ekto el vocabulario del curso",
    body: "Agrega a Palabras personalizadas los términos técnicos, nombres de autores y siglas de la materia para que ekto los reconozca mejor.",
  },
  {
    title: "Repasa antes del examen",
    body: "Al terminar, abre la clase en el Historial y toca Generar resumen para quedarte con los puntos clave.",
  },
];

const workTips = [
  {
    title: "Sigue reuniones con varias personas",
    body: "ekto puede separar la transcripción por hablantes (beta). Cambia el nombre de cada hablante para saber quién dijo qué.",
  },
  {
    title: "Entiende capacitaciones y presentaciones",
    body: "En sesiones largas, la traducción sigue sin que toques nada, con sesiones de hasta 2 horas en PRO.",
  },
  {
    title: "Quédate con las tareas acordadas",
    body: "Después de la reunión, genera un resumen para recordar decisiones, fechas límite y próximos pasos.",
  },
  {
    title: "Responde en una conversación uno a uno",
    body: "Con tu supervisor o un compañero, usa el modo Dos vías: tú hablas en español y la otra persona lee en inglés, y al revés.",
  },
];

const examples = [
  {
    situation: "En clase",
    english: "For next week, read chapters four and five and come ready to discuss the case study in groups.",
    spanish: "Para la próxima semana, lean los capítulos cuatro y cinco y vengan preparados para comentar el caso práctico en grupos.",
  },
  {
    situation: "En una reunión de trabajo",
    english: "Let's push the launch to Friday so the team has time to fix the last bugs.",
    spanish: "Pasemos el lanzamiento al viernes para que el equipo tenga tiempo de corregir los últimos errores.",
  },
];

const faqs = [
  {
    question: "¿ekto traduce clases en inglés al español en tiempo real?",
    answer: "Sí. En el modo Traducir, elige Inglés en Traducir de y Español en Traducir a. Verás la traducción al español mientras el profesor habla. Necesitas conexión a Internet y acceso al micrófono.",
  },
  {
    question: "¿Funciona si estoy sentado lejos del profesor?",
    answer: "Sí. ekto está pensado para escuchar en salas reales y puede captar la voz desde las últimas filas. En aulas con mucho ruido, acerca el teléfono a quien habla para mejorar el resultado.",
  },
  {
    question: "¿Puedo usar ekto en una clase o reunión larga?",
    answer: "Sí. Puedes probarlo gratis con 30 minutos. Con la suscripción PRO, el uso es ilimitado, con sesiones de hasta 2 horas cada una.",
  },
  {
    question: "¿Puedo repasar la clase o la reunión después?",
    answer: "Sí. Las transcripciones quedan en el Historial y puedes generar un resumen con los puntos clave para repasar antes de un examen o después de una reunión.",
  },
  {
    question: "¿ekto graba o guarda mi audio?",
    answer: "No se guarda el audio ni se usan tus conversaciones para entrenar IA. Pide permiso antes de usar ekto en una clase o reunión.",
  },
];

function SpanishLecturesWorkPage() {
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
            <span className="mx-2" aria-hidden="true">/</span>Clases y trabajo en inglés
          </nav>
          <p className="mb-2 text-sm font-semibold text-blue-700">Inglés → español · Guía de traducción en vivo</p>
          <p className="mb-6 text-sm text-slate-500">Equipo de ekto · <time dateTime={ARTICLE_DATE}>22 de octubre de 2026</time></p>
          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl">Cómo entender clases y reuniones de trabajo en inglés</h1>
          <p className="mb-6 text-lg leading-8 text-slate-700">El profesor habla rápido y usa términos que nunca has oído. En la reunión del lunes todos hablan a la vez, con acentos distintos, y cuando por fin entiendes la pregunta ya cambiaron de tema. Lees inglés sin problema, pero escucharlo en vivo es otra cosa.</p>
          <p className="mb-10 text-lg leading-8 text-slate-700">Con ekto, lo que se dice en inglés aparece en tu teléfono como subtítulos en español, en tiempo real. Esta guía te explica cómo configurarlo en un minuto y cómo sacarle partido en clase y en el trabajo.</p>

          <aside aria-label="Resumen" className="mb-12 rounded-2xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
            <h2 className="mb-3 text-2xl font-bold text-slate-900">Escuchas en inglés, lees en español</h2>
            <p className="text-lg leading-8 text-slate-700">Abre ekto → elige Traducir → inglés a español → toca una vez y lee mientras hablan.</p>
            <p className="mt-4 text-base leading-7 text-slate-600">Las traducciones de esta guía son ejemplos. La traducción real depende de lo que se diga y del contexto.</p>
          </aside>

          <section aria-labelledby="setup" className="mb-12">
            <h2 id="setup" className="mb-6 text-2xl font-bold text-slate-900 sm:text-3xl">Configura ekto en 1 minuto</h2>
            <ol className="list-decimal space-y-7 pl-6 text-lg leading-8 text-slate-700">
              {steps.map((step) => <li key={step.title}><h3 className="font-bold text-slate-900">{step.title}</h3><p className="mt-2">{step.body}</p></li>)}
            </ol>
          </section>

          <section aria-labelledby="lectures" className="mb-12">
            <h2 id="lectures" className="mb-5 text-2xl font-bold text-slate-900 sm:text-3xl">Cómo entender las clases en inglés</h2>
            <p className="mb-6 text-lg leading-8 text-slate-700">Ya sea en la universidad, en un curso de posgrado o en un seminario, el reto es el mismo: seguir una explicación larga sin perder el hilo y llegar al examen con buenos apuntes.</p>
            <div className="grid gap-6 md:grid-cols-2">
              {lectureTips.map((tip) => (
                <div key={tip.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <h3 className="mb-3 text-xl font-bold text-slate-900">{tip.title}</h3>
                  <p className="text-base leading-7 text-slate-700">{tip.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="work" className="mb-12">
            <h2 id="work" className="mb-5 text-2xl font-bold text-slate-900 sm:text-3xl">Cómo entender las reuniones de trabajo en inglés</h2>
            <p className="mb-6 text-lg leading-8 text-slate-700">Reuniones de equipo, capacitaciones, presentaciones de clientes o instrucciones de tu supervisor: en el trabajo, perder un detalle puede significar repetir una tarea o quedarte fuera de la conversación.</p>
            <div className="grid gap-6 md:grid-cols-2">
              {workTips.map((tip) => (
                <div key={tip.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <h3 className="mb-3 text-xl font-bold text-slate-900">{tip.title}</h3>
                  <p className="text-base leading-7 text-slate-700">{tip.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="examples" className="mb-12">
            <h2 id="examples" className="mb-5 text-2xl font-bold text-slate-900 sm:text-3xl">Lo que verás en pantalla</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {examples.map((example) => (
                <section key={example.situation} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <h3 className="mb-4 text-xl font-bold text-slate-900">{example.situation}</h3>
                  <p className="mb-1 text-sm font-semibold text-slate-500">Lo que dicen en inglés</p>
                  <p className="mb-4 text-base leading-7 text-slate-700" lang="en">{example.english}</p>
                  <p className="mb-1 text-sm font-semibold text-blue-700">Lo que lees en español</p>
                  <p className="text-lg leading-8 text-slate-900">{example.spanish}</p>
                </section>
              ))}
            </div>
          </section>

          <section aria-labelledby="mode" className="mb-12 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <h2 id="mode" className="mb-5 text-2xl font-bold text-slate-900 sm:text-3xl">¿Traducción al español o subtítulos en inglés?</h2>
            <p className="mb-5 text-lg leading-8 text-slate-700">Si te cuesta entender el contenido, usa el modo Traducir y lee todo en español.</p>
            <p className="text-lg leading-8 text-slate-700">Si entiendes inglés al leerlo pero se te escapa al escucharlo, por la velocidad o el acento, prueba el modo Subtítulos. Verás las palabras exactas en inglés mientras las dicen, y además practicas el idioma.</p>
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
            <h2 className="mb-4 text-3xl font-bold text-white">Entiende tu próxima clase o reunión en inglés</h2>
            <p className="mb-6 text-lg leading-8 text-slate-300">Descarga ekto, elige inglés → español y pruébalo en tu próxima clase o reunión.</p>
            <a href={APP_STORE_URL} className="inline-flex rounded-lg bg-white px-6 py-3 font-semibold text-slate-900 transition-colors hover:bg-blue-50">Descargar ekto en el App Store</a>
            <p className="mt-4 text-sm leading-6 text-slate-400">Descarga gratuita · 30 minutos gratis para probar</p>
          </section>
          <footer className="mt-10 text-base leading-7 text-slate-600">
            <p>¿También quieres entender conversaciones fuera de clase? Lee <a href="/es/blog/traductor-de-conversaciones-en-tiempo-real/" className="font-semibold text-blue-700 underline underline-offset-4">cómo entender una conversación en otro idioma en tiempo real</a>.</p>
          </footer>
        </article>
      </main>
    </div>
  );
}

export default SpanishLecturesWorkPage;
