import { useState } from 'react';
import UserPageNav from '../components/UserPageNav'
import notify from '../helpers/showNotification';
import useAuthContext from '../hooks/useAuthContext';
import Spinner from '../components/Spinner';

const ResetPassword = () => {

  const [loading, setLoading] = useState(false);
  const [actualPassword, setActualPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const { updatePassword } = useAuthContext();

  const handleSubmit = async e => {
    e.preventDefault();

    if([actualPassword, newPassword].includes('')){
      notify("error", "Completa los dos campos");
      return;
    }

    if(newPassword.length < 6){
      notify("error", "La contraseña es muy corta, agrega mínimo 6 caracteres");
      return;
    }

    setLoading(true);
    await updatePassword({ actualPassword, newPassword });
    setLoading(false);

    setActualPassword('');
    setNewPassword('');
  }

  return (
    <>
      <UserPageNav profilePage={false} />

      <h1 className='h2 font-bold text-center mb-4'>Cambiar contraseña</h1>

      <p className='text-center text-black mb-6'>Modifica tu <span className='text-primary font-semibold'>contraseña aquí</span></p>

      {/* form */}
      <div className='flex justify-center'>
        <div className='w-full md:w-1/2 bg-white shadow rounded-lg p-5'>
          <form
            onSubmit={e => handleSubmit(e)}
          >
            <div className='my-3'>
              <label 
                  htmlFor="password" 
                  className='uppercase text-gray-600 block font-bold'
              >
                Contraseña actual
              </label>
              <input 
                  id='password'
                  name='password'
                  type="password" 
                  className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' 
                  placeholder='Tu contraseña actual'
                  value={actualPassword}
                  onChange={e => setActualPassword(e.target.value)}
              />
            </div>

            <div className='my-3'>
              <label 
                  htmlFor="new-password" 
                  className='uppercase text-gray-600 block font-bold'
              >
                Nueva Contraseña
              </label>
              <input 
                  id='new-password'
                  name='new-password'
                  type="password" 
                  className='border w-full p-3 mt-3 bg-gray-50 rounded-xl mb-4' 
                  placeholder='Tu nueva contraseña'
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
              />
            </div>

            <input 
              type="submit" 
              className='btn uppercase px-2 py-3 rounded-lg font-bold w-full'  
              value="Guardar cambios"
            />

            {loading && <div className='my-8'><Spinner /></div>}
          </form>
        </div>
      </div>
    </>
  )
}

export default ResetPassword