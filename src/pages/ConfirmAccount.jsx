import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Alert from "../components/Alert";
import Spinner from "../components/Spinner";
import axiosClient from "../config/axios.js";

const ConfirmAccount = () => {

    const { token } = useParams();
    const [alert, setAlert] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const confirmAccount = async () => {
            try {
                const { data } = await axiosClient(`/users/confirm/${token}`);

                setAlert({
                    msg: data.message,
                    error: false,
                    autoClose: false,
                })

            } catch (error) {
                setAlert({
                    msg: error.response.data.message,
                    error: true,
                    autoClose: false,
                })
            }

            setLoading(false);
        }
        confirmAccount();
    }, []);

    

  return (
    <div className='container mx-auto grid lg:grid-cols-2 gap-12 mt-36 lg:mt-16'>
        <div className='flex items-center justify-center'>
            <h1 className='font-black text-4xl lg:text-6xl text-center'>Confirmando tu Cuenta</h1>
        </div>

        <div className='shadow-lg px-5 py-10 rounded-xl bg-white'>
            {!loading ? ( 
                <Alert alert={alert} /> 
            ) : <Spinner />}
        </div>
    </div>
  )
}

export default ConfirmAccount