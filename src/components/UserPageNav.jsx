import { Link } from 'react-router-dom'

const UserPageNav = ({profilePage}) => {

  return (
    <nav className='flex items-center gap-3 mb-6'>
      <Link
        to="/user"
        className={`font-bold uppercase text-sm ${profilePage ? 'text-gray-700' : 'text-gray-500'}`}
      >
        Perfil
      </Link>  

      <Link
        to="/user/reset-password"
        className={`font-bold uppercase text-sm ${profilePage ? 'text-gray-500' : 'text-gray-700'}`}
      >
        Cambiar contraseña
      </Link>  
    </nav>
  )
}

export default UserPageNav