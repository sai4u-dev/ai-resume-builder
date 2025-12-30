import { toast, Bounce } from "react-toastify";

function showErrorToast(message) {
  toast.error(message, {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    transition: Bounce,
  });
}

export { showErrorToast };
