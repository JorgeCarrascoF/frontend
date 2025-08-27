import NavButton from "../components/NavButton";
import Icon from "@mdi/react";
import { mdiHome } from "@mdi/js";

function NotFound() {
  return (
    <div className="mb-4 text-center flex justify-center h-full w-full items-center flex-col">
      <h1 className="mb-8 text-5xl">Error 404 - Page not found</h1>

      <p className="my-5">
        The page you're looking for doesn't exist.
      </p>
      <NavButton
        text="Go to Home"
        route="/"
        icon={<Icon path={mdiHome} size={1} />}
        variant="dark"
      />
    </div>
  );
}

export default NotFound;
