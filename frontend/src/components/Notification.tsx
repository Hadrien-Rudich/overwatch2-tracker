// Notification.js

interface NotificationProps {
  message: string;
  type: string;
  // onClose: () => void;
}

function Notification({
  message,
  type,
}: //  onClose
NotificationProps) {
  return (
    <div
      className={`notification ${type} flexdiv border rounded-sm h-18 w-40 absolute z-50]`}
    >
      <p className=" text-warning">{message}</p>
    </div>
  );
}

export default Notification;
