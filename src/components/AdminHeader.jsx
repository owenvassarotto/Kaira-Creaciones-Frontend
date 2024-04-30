import React from 'react'
import { Link } from 'react-router-dom'
import useAuthContext from '../hooks/useAuthContext'
import { BsArrowBarLeft } from "react-icons/bs";

const AdminHeader = () => {

  const { logout } = useAuthContext();

  return (
    <header className='py-8 bg-primary text-white'>
        <div className='container mx-auto flex flex-col items-center lg:flex-row lg:justify-between gap-6'>
            <h1 className='text-lg font-medium text-center'>Panel de administración de <span className='font-black'>Kaira Creaciones</span></h1>

            <nav className='flex flex-col md:flex-row gap-4 items-center'>
                <Link  
                  to="/" 
                  className='flex items-center gap-1'
                  title='Volver al inicio'
                >
                  <BsArrowBarLeft className='text-xl font-bold' />
                  <span className='uppercase text-xs font-bold'>Inicio</span>
                </Link>
                <Link to="/admin/products" className='uppercase text-xs font-bold'>Productos</Link>
                <Link to="/admin/orders" className='uppercase text-xs font-bold'>Ordenes</Link>
                <Link to="/admin/categories" className='uppercase text-xs font-bold'>Categorías</Link>
                <Link to="/admin/testimonials" className='uppercase text-xs font-bold'>Opiniones</Link>
                <button 
                  className='uppercase text-xs font-bold'
                  onClick={logout}
                >Cerrar sesión</button>
            </nav>
        </div>
    </header>
  )
}

export default AdminHeader