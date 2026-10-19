import { toastStyles as s } from "../../../assets/dummyStyles";

const Toast = ({ toast }) => {
  if (!toast) return null;

  return (
    <div
      className={`${s.toast} ${toast.type === "warning" ? s.toastWarning : s.toastSuccess}`}
    >
      {toast.message}
    </div>
  );
};

export default Toast;
