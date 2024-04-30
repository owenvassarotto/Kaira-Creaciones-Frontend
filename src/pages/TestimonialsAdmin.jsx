import { useState } from 'react'
import TestimonialsAdminForm from '../components/TestimonialsAdminForm';
import TestimonialsAdminList from '../components/TestimonialsAdminList';
import axiosClient from '../config/axios';
import notify from '../helpers/showNotification';
import Spinner from '../components/Spinner';

const TestimonialsAdmin = () => {

  const [showForm, setShowForm] = useState(true);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');

  const handleButton = async () => {

    const token = localStorage.getItem('token_kaira_creaciones');
    if(!token) return;

    const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        }
    }
    
    setLoading(true);
    try {
      const { data } = await axiosClient.post('/testimonials/with-token', {}, config);

      setUrl(data.url);

    } catch (error) {
      setLoading(false);
      notify("error", error.response.data.message);
    }
    setLoading(false);
  }

  return (
    <>
      <p className='text-gray-600 text-sm font-bold mb-4'>Genera una URL con un token único para que el usuario cree una opinión:</p>

      <div className='flex flex-col items-start md:flex-row md:items-center gap-6 mb-10'>
        {/* button to generate token */}
        <button 
          className='btn p-2 text-xs uppercase font-bold' 
          onClick={() => handleButton()}
        >
          Generar url
        </button>

        {loading ? (
          <div>
            <Spinner /> 
          </div>
        ) : (
          <p className='font-bold text-sm text-black'>
            {/* url to create testimonial for the user */}
            {url}
          </p>
        )}
      </div>
    
      <div className='flex flex-col md:flex-row gap-8'>
        <button
          className='btn py-4 md:hidden'
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Ocultar formulario" : "Mostrar Formulario"}
        </button>

        {/* form */}
        <div className={`${showForm ? 'block' : 'hidden'} md:w-1/2`}>
          <TestimonialsAdminForm />
        </div>

        {/* list of products */}
        <div className='md:w-1/2'>
          <TestimonialsAdminList />
        </div>
      </div>
    </>
  )
}

export default TestimonialsAdmin