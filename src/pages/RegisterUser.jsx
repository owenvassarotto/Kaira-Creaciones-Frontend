import { useState } from 'react'
import { Link } from 'react-router-dom'
import notify from '../helpers/showNotification.js';
import axiosClient from '../config/axios.js';
import Spinner from '../components/Spinner.jsx';

const RegisterUser = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if([name, email, password, repeatedPassword, phoneNumber].includes('')){
            notify("error", "Todos los campos son obligatorios");
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

        // register new user
        setLoading(true);
        try {
            const response = await axiosClient.post('/users/register', { name, email, password, phoneNumber });

            notify("success", response.data.message);
        } catch (error) {
            console.log(error);
            notify("error", error.response.data.message);
            setLoading(false);
        }
        setLoading(false);
    }

  return (
    <div className='container mx-auto grid lg:grid-cols-2 gap-12 mt-36 lg:mt-16'>
        <div className='flex items-center justify-center'>
            <h1 className='font-black text-4xl lg:text-6xl text-center'>Crea tu Cuenta y Realiza tus Compras</h1>
        </div>

        <div className='shadow-lg px-5 py-10 rounded-xl bg-white'>
            <form 
                onSubmit={e => handleSubmit(e)}
            >
                <div className='mb-5'>
                    <label 
                        htmlFor="name" 
                        className='uppercase text-gray-600 block lg:text-lg font-bold'
                    >
                        Nombre
                    </label>
                    <input 
                        id='name'
                        name='name'
                        type="name" 
                        className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' 
                        placeholder='Tu nombre'
                        onChange={e => setName(e.target.value)}
                    />
                </div>

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
                    htmlFor="tel" 
                    className='uppercase text-gray-600 block lg:text-lg font-bold'
                >
                    Teléfono
                </label>
                <input 
                    id='tel'
                    name='tel'
                    type="tel" 
                    className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' 
                    placeholder='Tu teléfono'
                    onChange={e => setPhoneNumber(e.target.value)}
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
                        placeholder='Repite tu contraseña'
                        onChange={e => setRepeatedPassword(e.target.value)}
                    />
                </div>

                <input 
                    type="submit"
                    value="Crear cuenta"  
                    className='btn p-3 px-10 mt-5 w-full rounded-xl font-bold uppercase lg:w-auto'
                />

                {loading && <div className='my-8'><Spinner /></div>}
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
                    to="/forgot-password"
                >
                        Olvidé mi contraseña
                </Link>
            </nav>
        </div>
    </div>
  )
}

export default RegisterUser