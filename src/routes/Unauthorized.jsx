import NavButton from "../components/NavButton";
import Icon from "@mdi/react";
import { mdiHome } from "@mdi/js";

const UnauthorizedPage = () => {
  return (
    <div className="flex flex-col h-full items-center justify-center text-center px-4">
      <h1 className="text-3xl font-bold text-red-600 mb-5">🚫 Unauthorized access</h1>
      <p className="text-gray-600 max-w-md mb-4">
        You do not have permission to access this page.
        Please log in with an administrator account.
      </p>
      <NavButton text="Back to home" route="/" icon={<Icon path={mdiHome} size={1} />} variant="dark" />
    </div>
  );
};

export default UnauthorizedPage;