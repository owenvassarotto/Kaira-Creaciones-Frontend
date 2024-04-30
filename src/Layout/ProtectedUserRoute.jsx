import { Navigate, Outlet } from 'react-router-dom'
import useAuthContext from '../hooks/useAuthContext'
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';
import Header from '../components/Header';

const ProtectedUserRoute = () => {

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
      <Header />
        {auth?.name ? (
          <main className='container mx-auto mt-36 lg:mt-0'>
            <Outlet />
          </main>
        ) : <Navigate to="/" />}
      <Footer />
    </>
  )
}

export default ProtectedUserRoute