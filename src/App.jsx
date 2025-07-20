import { useState, useEffect } from "react";
import appStoreButton from "./assets/downloadbtn.svg";
import appIcon from "./assets/AppIcon.jpg";
import mockupImage from "./assets/mockuppromax.png";

function App() {
  const [currentWord, setCurrentWord] = useState(0);
  const words = [
    "conversation?",
    "lecture?",
    "meeting?",
    "appointment?",
    "sermon?",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000); // Change word every 3 seconds

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="px-6 py-4 backdrop-blur-xl bg-white/40 border-b border-white/40 sticky top-0 z-50 ring-1 ring-white/20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={appIcon}
              alt="Ekto Captions - AI Voice Translator and Live Interpreter App"
              className="w-10 h-10 rounded-lg shadow-lg"
            />
            <span className="text-xl font-bold text-gray-800">
              ekto captions
            </span>
          </div>
          <a
            href="https://apps.apple.com/app/id6740196773"
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 shadow-lg backdrop-blur-sm"
            aria-label="Download AI Voice Translator App"
          >
            Download
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-20 bg-gradient-to-bl from-blue-400 via-blue-500 to-blue-600">
        <div className="max-w-6xl mx-auto ">
          <div className="grid lg:grid-cols-2 gap-12 items-center ">
            {/* Left side - Content */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-white/90 via-white/60 to-white/70 rounded-2xl md:rounded-3xl p-4 md:p-8 border border-white/40 shadow-2xl ring-1 ring-white/20">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                Struggling to understand every
                <span className="block relative overflow-hidden h-14 md:h-20 lg:h-24">
                  <span
                    key={currentWord}
                    className="absolute inset-0 flex items-center"
                    style={{
                      animation: "fadeInUp 3s ease-in-out",
                      background: "linear-gradient(135deg, #ef4444, #f97316)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {words[currentWord]}
                  </span>
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-4 md:mb-6 leading-relaxed">
                Experience continuous live translation powered by the latest AI
                models. Our live voice translator provides uninterrupted,
                real-time translation that flows seamlessly throughout entire
                conversations, interactions, and long speeches.
              </p>

              {/* Social Proof */}
              <div className="mb-6 md:mb-8 backdrop-blur-lg bg-white/25 rounded-xl md:rounded-2xl p-3 md:p-4 border border-white/30 ring-1 ring-white/10">
                <p className="text-xs md:text-sm text-gray-600 mb-2">
                  Trusted by thousands of users worldwide for AI voice
                  translation
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 md:space-x-6 text-xs text-gray-700">
                  <div className="flex items-center">
                    <span className="font-semibold text-blue-600">37+</span>
                    <span className="ml-1">Languages</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold text-blue-600">
                      Live Translation
                    </span>
                    <span className="ml-1">Technology</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold text-blue-600">
                      AI-powered
                    </span>
                    <span className="ml-1">Accuracy</span>
                  </div>
                </div>
              </div>

              <a
                href="https://apps.apple.com/app/id6740196773"
                aria-label="Download AI Voice Translator on App Store"
              >
                <img
                  src={appStoreButton}
                  alt="Download AI Voice Translator - Ekto Captions on the App Store"
                  className="w-3/4 sm:w-2/3 md:w-1/2 hover:scale-105 transition-all duration-300 cursor-pointer drop-shadow-lg"
                />
              </a>
            </div>

            {/* Right side - Mockup Image */}
            <div className="flex justify-center lg:justify-end">
              <img
                src={mockupImage}
                alt="AI Voice Translator App Interface - Live Voice Translation in Real-Time"
                className="w-full h-[600px] object-contain"
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
              How Our AI Interpreter Works
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
                Open the ekto captions app and select your preferred languages
                for translation
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
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Language Exchange Mode
              </h3>
              <p className="text-gray-700">
                The Perfect AI interpreter for face to face conversations.
                Effortless collaboration with native speakers.
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
              alt="Download AI Voice Translator and Live Interpreter - Ekto Captions on the App Store"
              className="h-16 mx-auto hover:scale-105 transition-transform cursor-pointer"
            />
          </a>
          <p className="text-gray-400 mt-6 text-sm">
            Available on iOS • Free AI Voice Translator • No signup required
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 bg-gray-800">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Live Translator: Ekto Captions.
            All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
