import { Navigate, Outlet } from 'react-router-dom'
import useAuthContext from '../hooks/useAuthContext'
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';
import AdminHeader from '../components/AdminHeader';

const ProtectedAdminRoute = () => {

    const { auth, loading } = useAuthContext();

    if(loading){
      return (
        <div className='flex items-center justify-center h-screen'>
          <Spinner />
        </div>
      )
    }

  return (
    <>
      <AdminHeader />
        {auth?.is_admin === 1 ? (
          <main className='container mx-auto mt-10'>
            <Outlet />
          </main>
        ) : <Navigate to="/" />}
      <Footer />
    </>
  )
}

export default ProtectedAdminRoute