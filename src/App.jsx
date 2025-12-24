import { useState, useEffect } from "react";
import appStoreButton from "./assets/downloadbtn.svg";
import appIcon from "./assets/AppIcon.jpg";
import mockupImage from "./assets/mockuppromax.png";
import backgroundImage from "./assets/ektolanding4.jpg";
import { useLanguage, rotatingWords } from "./i18n";

function App() {
  const { language, setLanguage, t, translations } = useLanguage();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500); // Change word every 2.5 seconds

    return () => clearInterval(interval);
  }, []);

  // Star rating component with proper half-star support
  const StarRating = ({ rating = 4.5, reviews = 16 }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const starPath = "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";

    return (
      <div className="flex items-center gap-2">
        <div className="flex gap-0.5">
          {/* Full stars */}
          {[...Array(fullStars)].map((_, i) => (
            <svg key={`full-${i}`} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d={starPath} />
            </svg>
          ))}
          {/* Half star */}
          {hasHalfStar && (
            <svg key="half" className="w-5 h-5" viewBox="0 0 20 20">
              <defs>
                <linearGradient id="halfGradient">
                  <stop offset="50%" stopColor="#FACC15" />
                  <stop offset="50%" stopColor="#bcc0c7ff" />
                </linearGradient>
              </defs>
              <path d={starPath} fill="url(#halfGradient)" />
            </svg>
          )}
          {/* Empty stars */}
          {[...Array(emptyStars)].map((_, i) => (
            <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
              <path d={starPath} />
            </svg>
          ))}
        </div>
        <span className="text-sm font-semibold text-gray-200">{rating}</span>
        <span className="text-xs text-gray-300">{t.hero.onAppStore}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="px-6 py-4 backdrop-blur-xl bg-white/40 border-b border-white/40 sticky top-0 z-50 ring-1 ring-white/20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={appIcon}
              alt="Live Translator Captions AI App"
              className="w-10 h-10 rounded-lg shadow-lg"
            />
            <span className="text-xl font-bold text-gray-800 hidden sm:inline">
              Live Translator: Captions AI
            </span>
          </div>
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            {/* <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/60 hover:bg-white/80 transition-all duration-200 border border-white/40 shadow-sm"
                aria-label="Select language"
              >
                <span className="text-lg">{translations[language].flag}</span>
                <span className="text-sm font-medium text-gray-700 hidden sm:inline">{translations[language].name}</span>
                <svg className={`w-4 h-4 text-gray-500 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isLangMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsLangMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 py-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 z-50">
                    {Object.values(translations).map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-blue-50 transition-colors ${
                          language === lang.code ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                        }`}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span className="text-sm font-medium">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div> */}

            <a
              href="https://apps.apple.com/app/id6740196773"
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 sm:px-6 py-2 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 shadow-lg backdrop-blur-sm text-sm sm:text-base"
              aria-label="Download AI Voice Translator App"
            >
              {t.hero.download}
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="px-6 py-20 overflow-x-clip"
        style={{
          backgroundColor: '#1362BF',
          // backgroundImage: `url(${backgroundImage})`,
          // backgroundSize: 'cover',
          // backgroundPosition: 'center',
          // backgroundRepeat: 'no-repeat',
          // minHeight: '100vh',
        }}
      >
        <div className="max-w-6xl mx-auto ">
          <div className="grid lg:grid-cols-2 items-center ">
            {/* Left side - Content */}
            <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
                <span className="block overflow-hidden h-[1.3em] py-16 lg:py-20 text-4xl md:text-5xl lg:text-6xl ">
                  <span
                    key={currentWordIndex}
                    className="inline-block"
                    style={{
                      animation: "fadeInUp 2.5s ease-in-out",
                      background: "linear-gradient(135deg, #76e387ff, #a9eba8ff)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {rotatingWords[currentWordIndex].word}
                  </span>
                </span>
                <span className="block">{t.hero.tagline}</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-4 md:mb-6 leading-relaxed drop-shadow-lg md:mr-32 xl:mr-0">
                {t.hero.description}
                <br></br>
                {t.hero.descriptionLine2}
              </p>

              {/* Social Proof */}
              <div className="z-1000 mb-6 md:mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <StarRating rating={4.5} reviews={16} />
                  </div>
                  {/* <div className="flex flex-wrap gap-2 md:gap-3 text-xs text-gray-700">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">37+ Languages</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">PiP Mode</span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">AI-Powered</span>
                  </div> */}
                </div>
              </div>

              <a
                href="https://apps.apple.com/app/id6740196773"
                aria-label="Download AI Voice Translator on App Store"
              >
                <img
                  src={appStoreButton}
                  alt="Download Live Translator: Captions AI on the App Store"
                  className="w-3/4 sm:w-2/3 md:w-1/2 hover:scale-105 transition-all duration-300 cursor-pointer drop-shadow-lg"
                />
              </a>
            </div>

            {/* Right side - Mockup Image */}
            <div className="flex justify-center lg:justify-end lg:overflow-visible lg:-mr-32 xl:-mr-48">
              <img
                src={backgroundImage}
                alt="AI Voice Translator App Interface - Live Voice Translation in Real-Time"
                className="w-full h-[600px] lg:h-[500px] lg:w-auto lg:max-w-none object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="px-6 py-16 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Our AI Translator Works
            </h2>
            <p className="text-lg text-gray-600">
              Three simple steps to activate your live voice translator
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center backdrop-blur-xl bg-white/25 rounded-2xl p-6 border border-white/30 shadow-xl hover:bg-white/35 transition-all duration-300 ring-1 ring-white/15">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Launch Your AI Voice Translator
              </h3>
              <p className="text-gray-700">
                Open Live Translator and select your preferred languages
                for real-time translation
              </p>
            </div>

            <div className="text-center backdrop-blur-xl bg-white/25 rounded-2xl p-6 border border-white/30 shadow-xl hover:bg-white/35 transition-all duration-300 ring-1 ring-white/15">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                AI-Powered Live Transcription
              </h3>
              <p className="text-gray-700">
                Our AI interpreter captures and transcribes speech in real-time
                with incredible accuracy
              </p>
            </div>

            <div className="text-center backdrop-blur-xl bg-white/25 rounded-2xl p-6 border border-white/30 shadow-xl hover:bg-white/35 transition-all duration-300 ring-1 ring-white/15">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Instant Live Voice Translation
              </h3>
              <p className="text-gray-700">
                Receive immediate captions and translations on screen - your
                personal AI interpreter
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Advanced AI Voice Translator Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 backdrop-blur-xl bg-white/30 rounded-2xl border border-white/40 shadow-xl hover:bg-white/40 transition-all duration-300 ring-1 ring-white/20">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Real-Time AI Captions
              </h3>
              <p className="text-gray-700">
                Get instant captions powered by advanced AI for any
                conversation, meeting, or audio content with superior accuracy.
              </p>
            </div>

            <div className="text-center p-8 backdrop-blur-xl bg-white/30 rounded-2xl border border-white/40 shadow-xl hover:bg-white/40 transition-all duration-300 ring-1 ring-white/20">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7M3 18h.01M3 12h.01M3 6h.01"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Picture-in-Picture Mode
              </h3>
              <p className="text-gray-700">
                Multitask while translating. Check emails, notes, or calendars while
                live captions stay visible in a floating window.
              </p>
            </div>

            <div className="text-center p-8 backdrop-blur-xl bg-white/30 rounded-2xl border border-white/40 shadow-xl hover:bg-white/40 transition-all duration-300 ring-1 ring-white/20">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                37+ Language AI Translation
              </h3>
              <p className="text-gray-700">
                Our AI voice translator supports instant translation between 37+
                languages. The ultimate multilingual communication solution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="px-6 py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Start Using the Most Advanced AI Voice Translator
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of users worldwide who trust our AI interpreter for
            breaking down language barriers every day. Experience live voice
            translation in seconds.
          </p>
          <a
            href="https://apps.apple.com/app/id6740196773"
            aria-label="Download AI Voice Translator App"
          >
            <img
              src={appStoreButton}
              alt="Download Live Translator: Captions AI on the App Store"
              className="h-16 mx-auto hover:scale-105 transition-transform cursor-pointer"
            />
          </a>
          <p className="text-gray-400 mt-6 text-sm">
            Available on iOS • No signup required
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 bg-gray-800">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Live Translator: Captions AI.
            All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
