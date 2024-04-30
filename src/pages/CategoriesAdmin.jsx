import { useState } from 'react'
import CategoriesAdminForm from '../components/CategoriesAdminForm'
import CategoriesAdminList from '../components/CategoriesAdminList'

const CategoriesAdmin = () => {

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
        <CategoriesAdminForm />
      </div>

      {/* list of products */}
      <div className='md:w-1/2'>
        <CategoriesAdminList />
      </div>
    </div>
  )
}

export default CategoriesAdmin