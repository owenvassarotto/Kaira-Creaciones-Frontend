import React, { useState } from 'react'
import ProductsAdminForm from '../components/ProductsAdminForm'
import ProductsAdminList from '../components/ProductsAdminList'

const ProductsAdmin = () => {

  const [showForm, setShowForm] = useState(true);

  return (
    <div className='flex flex-col md:flex-row gap-8'>

      <button
        className='btn py-4 md:hidden'
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Ocultar formulario" : "Mostrar Formulario"}
      </button>

      {/* form */}
      <div className={`${showForm ? 'block' : 'hidden'} md:w-1/2`}>
        <ProductsAdminForm />
      </div>

      {/* list of products */}
      <div className='md:w-1/2'>
        <ProductsAdminList />
      </div>
    </div>
  )
}

export default ProductsAdmin