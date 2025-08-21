import { useEffect } from "react";
import Icon from "@mdi/react";
import { mdiInformationOutline } from "@mdi/js";
import { mdiCheck } from '@mdi/js';
import { mdiAlertOutline } from '@mdi/js';

const Toast = ({ message, onClose, type = "info", duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const typeIcon = {
    info: mdiInformationOutline,
    success: mdiCheck,
    error: mdiAlertOutline
  }

  return (
    <div
      className={`fixed flex gap-4 bottom-10 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow text-white bg-[#295ba2] transition-transform`}
    >
      {" "}
      <Icon path={typeIcon[type]} size={1} />
      {message}
    </div>
  );
};

export default Toast;
