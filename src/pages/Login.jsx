import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import notify from '../helpers/showNotification.js';
import useAuthContext from '../hooks/useAuthContext.jsx';
import axiosClient from '../config/axios.js';
import Spinner from '../components/Spinner.jsx';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { setAuth } = useAuthContext();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if([email, password].includes('')){
            notify("error", "Ingresa email y contraseña")
            return;
        }

        setLoading(true);
        // login user
        try {
            const { data } = await axiosClient.post('/users/login', {email, password})

            if(data.message){
                notify("error", data.message)

                return;
            }
            
            localStorage.setItem('token_kaira_creaciones', data.token);

            setAuth({
                id: data.id,
                name: data.name,
                phone_number: data.phone_number,
                email: data.email,
                is_admin: data.is_admin,
            }); 

            navigate('/');

        } catch (error) {
            notify("error", error.response.data.message)
        }

        setLoading(false);
    }

  return (
    <div className='container mx-auto grid lg:grid-cols-2 gap-12 mt-36 lg:mt-16'>
        <div className='flex items-center justify-center'>
            <h1 className='font-black text-4xl lg:text-6xl text-center'>Iniciar Sesión</h1>
        </div>

        <div className='shadow-lg px-5 py-10 rounded-xl bg-white'>
            <form 
                action=""
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
                        placeholder='Tu contraseña'
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <input 
                    type="submit"
                    value="Iniciar Sesión"  
                    className='btn p-3 px-10 mt-5 w-full rounded-xl font-bold uppercase lg:w-auto'
                />

                {loading && <div className='my-8'><Spinner /></div>}
            </form>

            <nav className='mt-8 lg:flex lg:items-center lg:justify-between'>
                <Link 
                    className='block text-center my-5 text-gray-500 hover:text-gray-600' 
                    to="/register"
                >
                    ¿No tienes una cuenta? <span className='underline'>Regístrate</span>
                </Link>

                <Link 
                    className='block text-center my-5 text-gray-500 hover:text-gray-600' 
                    to="/forgot-password"
                >
                        Olvidé mi contraseña
                </Link>
            </nav>
        </div>
    </div>
  )
}

export default Login