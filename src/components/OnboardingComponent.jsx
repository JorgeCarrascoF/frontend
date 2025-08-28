import Accordion from "./Accordion";
import "highlight.js/styles/atom-one-dark.css";
import CodeFragment from "./CodeFragment";
import Stepper from "./Stepper";
import TextInput from "./TextInput";
import { useState } from "react";

// const Accordion = ({ title, children, isOpen, onToggle }) => {
//   return (
//     <div className="border border-gray-300 rounded-lg bg-white shadow-sm">
//       <button
//         className="flex justify-between items-center w-full p-4 text-sm font-medium text-left hover:bg-gray-50 transition"
//         onClick={onToggle}
//       >
//         <span>{title}</span>
//         {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
//       </button>
//       {isOpen && (
//         <div className="px-6 pb-6 pt-2 text-sm text-gray-700">{children}</div>
//       )}
//     </div>
//   );
// };

const stepsData = [
  { title: "Log into Github", description: "Access into your Github Account" },
  {
    title: "Go to Token Configuration",
    description: "Go to Settings > Developer Settings > Personal Access Tokens",
  },
  {
    title: "Create a token",
    description: "You'll need to create a Fine-grained Token",
  },
  {
    title: "Configure and generate the token",
    description:
      "Add a descriptive name, the repo it will access, and the permissions it needs (generally repo).",
  },
  {
    title: "Save the token",
    description:
      "The token is shown only once after generating it. Please make sure to copy it!",
  },
];

const sentryScript = `
Sentry.init({
  dsn: "https://bc7acf8bf6c9695be588c2c31bfa3a6c@o4509752918540288.ingest.sentry.io/4509752919851088",
  sendDefaultPii: true,
  environment: import.meta.env.VITE_SENTRY_ENVIRONMENT || "development",
  integrations: [
    Sentry.captureConsoleIntegration({
      levels: ["error", "warn", "info"],
    }),
  ],
});
`;

const dependenciesScript = `
npm install @sentry/react
`;

const importScript = `
import * as Sentry from "@sentry/react";
`;

const envScript = `
VITE_SENTRY_ENVIRONMENT=development
`;

const envProductionScript = `
VITE_SENTRY_ENVIRONMENT=production
`;

const OnboardingComponent = () => {
  const [ghToken, setGhToken] = useState("");
  const [repoLink, setRepoLink] = useState("");

  return (
    <div className="w-full h-full mt-20 pb-20 flex flex-col  items-center">
      <div className="text-center w-[55rem] flex flex-col items-center">
        <h2 className="text-4xl font-bold mb-2 leading-snug">
          Start with Buggle, <br></br> manage your logs easily
        </h2>
        <p className="text-gray-500 text-sm mb-8">
          Learn how to set up Buggle and explore everything you need to start
          using it!
        </p>

        <div className="w-[80%] flex flex-col gap-3">
          <Accordion title="Integration setup: Connecting Buggle to your System">
            <span className="text-sm text-black">
              To start using Buggle, the first step is to link it with your
              system.
            </span>
            <div className="w-full ml-4 text-black">
              <h3 className="font-semibold text-sm my-3">
                1. Add the Buggle script to your main project file
              </h3>
              <div>
                <span className="text-sm">
                  You need to install the dependencies:
                </span>
                <CodeFragment text={dependenciesScript} language="ini" />
              </div>
              <div className="">
                <span className="text-sm">
                  Then, import them into your main file:
                </span>
                <CodeFragment text={importScript} language="js" />
              </div>
              <div>
                <span className="text-sm">
                  And then, add the following snippet:
                </span>
                <CodeFragment text={sentryScript} language="js" />
              </div>
              <h3 className="font-semibold text-sm my-3">
                {" "}
                2. Set the environment variable
              </h3>
              <div>
                <span className="text-sm">
                  Insert the following snippet into your main file:
                </span>
                <CodeFragment text={envScript} language="ini" />
              </div>
              <h3 className="font-semibold text-sm my-3">
                {" "}
                3. Configure for deployment
              </h3>
              <div>
                <span className="text-sm">
                  {" "}
                  When deploying your project, make sure to update the
                  environment variable value to:
                </span>
                <CodeFragment text={envProductionScript} language="ini" />
              </div>
            </div>
            <span className="text-sm text-black">
              That’s it! You’ve successfully linked Buggle to your system and
              set up your environments.
            </span>
          </Accordion>

          <Accordion title="AI Assistant Configuration">
            <span className="text-sm text-black">
              We offer a AI Assistant that can help you resolve bugs. To set it
              up, you'll need to provide a GitHub repository link and a GitHub
              token to access it.
            </span>
            <div className="my-4"></div>
            <Accordion title="1. Getting a Github Token">
              <Stepper steps={stepsData} />
            </Accordion>
            <Accordion title="2. Getting the Repository Link">
              Navigate to the main page of the repository you want to use, and
              copy the URL from the address bar.
            </Accordion>
            <Accordion title="3. Provide both items">
              <span className="mb-20">
                We will use both the token and the repository link to generate
                suggestion based in the commits. Please provide them in the
                fields below.
              </span>
              <form className="mt-4 flex flex-col gap-4">
                <TextInput
                  label="GitHub Token"
                  value={ghToken}
                  onChange={(e) => setGhToken(e.target.value)}
                />
                <TextInput
                  label="Repository Link"
                  value={repoLink}
                  onChange={(e) => setRepoLink(e.target.value)}
                />
              </form>
            </Accordion>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default OnboardingComponent;
