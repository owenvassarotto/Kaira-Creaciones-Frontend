import { useEffect, useState } from 'react'
import UserPageNav from '../components/UserPageNav'
import useAuthContext from '../hooks/useAuthContext';
import notify from '../helpers/showNotification';
import Spinner from '../components/Spinner';

const EditProfile = () => {

  const { auth, updateUser } = useAuthContext();

  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setProfile(auth)
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    const { id, name, email, phone_number } = profile;

    
    if([name, email, phone_number].includes('')){
      notify("error", "Todos los campos son obligatorios");
      return;
    }

    setLoading(true);
    await updateUser({id, name, email, phone_number});
    setLoading(false);
  }

  return (
    <>
      <UserPageNav profilePage={true} />

      <h1 className='h2 font-bold text-center mb-4'>Editar perfil</h1>

      <p className='text-center text-black mb-6'>Modifica tu <span className='text-primary font-semibold'>información aquí</span></p>

      {/* form */}
      <div className='flex justify-center'>
        <div className='w-full md:w-1/2 bg-white shadow rounded-lg p-5'>
          <form
            onSubmit={e => handleSubmit(e)}
          >
            <div className='my-3'>
              <label 
                  htmlFor="name" 
                  className='uppercase text-gray-600 block font-bold'
              >
                  Nombre
              </label>
              <input 
                  id='name'
                  name='name'
                  type="name" 
                  className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' 
                  placeholder='Tu nombre'
                  value={profile?.name || ''}
                  onChange={e => setProfile({
                    ...profile,
                    [e.target.name]: e.target.value
                  })}
              />
            </div>

            <div className='my-3'>
              <label 
                  htmlFor="phone_number" 
                  className='uppercase text-gray-600 block font-bold'
              >
                  Teléfono
              </label>
              <input 
                  id='phone_number'
                  name='phone_number'
                  type="tel" 
                  className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' 
                  placeholder='Tu teléfono'
                  value={profile?.phone_number || ''}
                  onChange={e => setProfile({
                    ...profile,
                    [e.target.name]: e.target.value
                  })}
              />
            </div>

            <div className='my-3'>
              <label 
                  htmlFor="email" 
                  className='uppercase text-gray-600 block font-bold'
              >
                  Email
              </label>
              <input 
                  id='email'
                  name='email'
                  type="email" 
                  className='border w-full p-3 mt-3 bg-gray-50 rounded-xl mb-4' 
                  placeholder='Tu email'
                  value={profile?.email || ''}
                  onChange={e => setProfile({
                    ...profile,
                    [e.target.name]: e.target.value
                  })}
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

export default EditProfile