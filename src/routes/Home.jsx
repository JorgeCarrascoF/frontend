// import Loader from "../components/Loader";

// const Home = () => {
//   return (
//     <div className="flex flex-col justify-center items-center w-full h-full">
//       <h1 className="mb-4 text-5xl">Buggle</h1>
//       <div
//         className="border border-gray-300 rounded-lg"
//       >
//         <Loader />
//       </div>
//     </div>
//   );
// };

// export default Home;

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const Accordion = ({ title, children, isOpen, onToggle }) => {
  return (
    <div className="border border-gray-300 rounded-lg bg-white shadow-sm">
      <button
        className="flex justify-between items-center w-full p-4 text-sm font-medium text-left hover:bg-gray-50 transition"
        onClick={onToggle}
      >
        <span>{title}</span>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {isOpen && <div className="px-6 pb-6 pt-2 text-sm text-gray-700">{children}</div>}
    </div>
  );
};

const Home = () => {
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="max-w-2xl w-full text-center">
        <h2 className="text-4xl font-bold mb-2 leading-snug">
          Start with Buggle, <br></br> manage your logs easily
        </h2>
        <p className="text-gray-500 text-sm mb-8">
          Learn how to set up Buggle and explore everything you need to start using it!
        </p>

        <Accordion
          title="Integration setup: Connecting Buggle to your System"
          isOpen={openAccordion === 1}
          onToggle={() => toggleAccordion(1)}
        >
          <div className="space-y-4 text-left">
            <div>
              <p className="font-semibold mb-1">
                1. Add the Buggle script to your main project file
              </p>
              <p className="text-gray-600 text-sm mb-2">
                Insert the following snippet into your main file:
              </p>
              <pre className="bg-gray-100 p-3 rounded-md text-xs font-mono overflow-x-auto">
{`Sentry.init({
  dsn: "https://example.ingest.sentry.io/4509572918540288",
  sendDefaultPii: true,
  environment: import.meta.env.VITE_SENTRY_ENVIRONMENT || "development",
  integrations: [
    Sentry.captureConsoleIntegration({
      levels: ["error", "warn", "info"],
    }),
  ],
});`}
              </pre>
            </div>

            <div>
              <p className="font-semibold mb-1">2. Set the environment variable</p>
              <p className="text-gray-600 text-sm mb-2">
                In your{" "}
                <code className="bg-gray-200 px-1 py-0.5 rounded text-xs font-mono">
                  .env.local
                </code>{" "}
                file, add the following:
              </p>
              <pre className="bg-gray-100 p-3 rounded-md text-xs font-mono">
{`VITE_SENTRY_ENVIRONMENT=development`}
              </pre>
            </div>

            <div>
              <p className="font-semibold mb-1">3. Configure for deployment</p>
              <p className="text-gray-600 text-sm mb-2">
                When deploying your project, make sure to update the environment variable
                value to:
              </p>
              <pre className="bg-gray-100 p-3 rounded-md text-xs font-mono">
{`VITE_SENTRY_ENVIRONMENT=production`}
              </pre>
            </div>

            <p className="text-sm text-gray-700 mt-4">
              That’s it! You’ve successfully linked Buggle to your system and set up
              your environments.
            </p>
          </div>
        </Accordion>

        <div className="mt-3">
          <Accordion
            title="AI Assistant Configuration"
            isOpen={openAccordion === 2}
            onToggle={() => toggleAccordion(2)}
          >
            <p className="text-gray-600 text-sm">
              Here will go the setup instructions for configuring the AI assistant...
            </p>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Home;