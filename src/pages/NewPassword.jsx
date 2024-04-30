import { useEffect, useState } from 'react'
import notify from '../helpers/showNotification';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import axiosClient from '../config/axios';
import Alert from '../components/Alert';

const NewPassword = () => {

    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const [alert, setAlert] = useState({});
    const [loading, setLoading] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(null);
    const [validToken, setValidToken] = useState(false);
    const [isModified, setIsModified] = useState(false);

    const { token } = useParams();

    useEffect(() => {
        const checkToken = async () => {

            setLoading(true);

            try {
                await axiosClient(`/users/forgot-password/${token}`);

                setValidToken(true);
                
            } catch (error) {
                setAlert({
                    msg: error.response.data.message,
                    error: true,
                    autoClose: false,
                })
            }

            setLoading(false);
        }
        checkToken();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if([password, repeatedPassword].includes('')){
            notify("error", "Completa ambos campos");
            return;
        }

        if(password.length < 6){
            notify("error", "La contraseña es muy corta, agrega mínimo 6 caracteres");
            return;
        }

        if(password !== repeatedPassword){
            notify("error", "Las contraseñas deben ser iguales");
            return;
        }

        setSubmitLoading(true);

        try {
            const { data } = await axiosClient.post(`/users/forgot-password/${token}`, { password });

            setAlert({
                msg: data.message,
                error: false,
                autoClose: false,
            })

            setIsModified(true);

        } catch (error) {
            setAlert({
                msg: error.response.data.message,
                error: true,
                autoClose: true,
            })
        }

        setSubmitLoading(false);
    }

  return (
    <div className='container mx-auto grid lg:grid-cols-2 gap-12 mt-36 lg:mt-16'>
        <div className='flex items-center justify-center'>
            <h1 className='font-black text-4xl lg:text-6xl text-center'>Restablece tu Contraseña y no Pierdas Acceso a tu Cuenta</h1>
        </div>

        <div className='shadow-lg px-5 py-10 rounded-xl bg-white h-fit'>

            {validToken ? (
                <form 
                    action=""
                    onSubmit={e => handleSubmit(e)}
                >

                    <div className='mb-5'>
                        <label 
                            htmlFor="password" 
                            className='uppercase text-gray-600 block lg:text-lg font-bold'
                        >
                            Contraseña
                        </label>
                        <input 
                            id='password'
                            name='password'
                            type="password" 
                            className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' 
                            placeholder='Tu nueva contraseña'
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <div className='mb-5'>
                        <label 
                            htmlFor="repeated-password" 
                            className='uppercase text-gray-600 block lg:text-lg font-bold'
                        >
                            Repetir Contraseña
                        </label>
                        <input 
                            id='repeated-password'
                            name='repeated-password'
                            type="password" 
                            className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' 
                            placeholder='Repite tu nueva contraseña'
                            onChange={e => setRepeatedPassword(e.target.value)}
                        />
                    </div>

                    <input 
                        type="submit"
                        value="Iniciar Sesión"  
                        className='btn p-3 px-10 mt-5 w-full rounded-xl font-bold uppercase lg:w-auto'
                    />

                    {submitLoading === true ? <div className='my-8'><Spinner /></div> : submitLoading === false ? <Alert alert={alert} /> : null}

                    {isModified && (
                        <Link 
                            className='block text-left mt-10 text-gray-500 hover:text-gray-600 underline' 
                            to="/login"
                        >
                            Iniciar Sesión
                        </Link>
                    )}
                </form>
            ) : (
                loading === true ? <div className='my-8'><Spinner /></div> : loading === false ? <Alert alert={alert} /> : null
            )}
        </div>
    </div>
  )
}

export default NewPassword