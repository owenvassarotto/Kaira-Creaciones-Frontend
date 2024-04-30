import { useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../config/axios';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';
import notify from '../helpers/showNotification';

const ForgotPassword = () => {

    const [email, setEmail] = useState();
    const [alert, setAlert] = useState({});
    const [loading, setLoading] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        if(!email){
            notify("error", "Debes ingresar tu email");
            
            return;
        }

        setLoading(true);
        
        try {
            const { data } = await axiosClient.post('/users/forgot-password', { email });

            setAlert({
                msg: data.message,
                error: false,
                autoClose: true,
            })

        } catch (error) {
            setAlert({
                msg: error.response.data.message,
                error: true,
                autoClose: true,
            })
        }

        setLoading(false);
    }

  return (
    <div className='container mx-auto grid lg:grid-cols-2 gap-12 mt-36 lg:mt-16'>
        <div className='flex items-center justify-center'>
            <h1 className='font-black text-4xl lg:text-6xl'>Restablece tu Contraseña</h1>
        </div>

        <div className='shadow-lg px-5 py-10 rounded-xl bg-white'>
            <form
                onSubmit={e => handleSubmit(e)}
            >
                <div className='mb-5'>
                    <label 
                        htmlFor="email" 
                        className='uppercase text-gray-600 block lg:text-lg font-bold'
                    >
                        Email
                    </label>
                    <input 
                        id='email'
                        name='email'
                        type="email" 
                        className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' 
                        placeholder='Tu email'
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <input 
                    type="submit"
                    value="Enviar instrucciones"  
                    className='btn p-3 px-10 mt-5 w-full rounded-xl font-bold uppercase lg:w-auto'
                />

                {loading === true ? <div className='my-8'><Spinner /></div> : loading === false ? <Alert alert={alert} /> : null}

            </form>

            <nav className='mt-8 lg:flex lg:items-center lg:justify-between'>
                <Link 
                    className='block text-center my-5 text-gray-500 hover:text-gray-600' 
                    to="/login"
                >
                    ¿Ya tienes una cuenta? <span className='underline'>Inicia Sesión</span>
                </Link>

                <Link 
                    className='block text-center my-5 text-gray-500 hover:text-gray-600' 
                    to="/register"
                >
                    ¿No tienes una cuenta? <span className='underline'>Regístrate</span>
                </Link>
            </nav>
        </div>
    </div>
  )
}

export default ForgotPassword