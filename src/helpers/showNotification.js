import { Bounce, toast } from "react-toastify";

// function to show notifications
const notify = (type, msg) => {
    toast[type](msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });
};

export default notify;