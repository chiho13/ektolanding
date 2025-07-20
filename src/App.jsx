import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-screen-lg w-full text-center">
        <div>
          <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
            <img
              src={viteLogo}
              className="h-24 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#646cffaa] inline-block"
              alt="Vite logo"
            />
          </a>
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
            <img
              src={reactLogo}
              className="h-24 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#61dafbaa] inline-block animate-spin motion-reduce:animate-none [animation-duration:20s]"
              alt="React logo"
            />
          </a>
        </div>
        <h1 className="text-5xl font-bold leading-tight mb-8">Vite + React</h1>
        <div className="p-8">
          <button
            onClick={() => setCount((count) => count + 1)}
            className="px-5 py-3 text-base font-medium bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-900 border border-transparent rounded-lg cursor-pointer transition-colors duration-250 hover:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            count is {count}
          </button>
          <p className="mt-4">
            Edit{" "}
            <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">
              src/App.jsx
            </code>{" "}
            and save to test HMR
          </p>
        </div>
        <p className="text-gray-500">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </div>
  );
}

export default App;
