import useCategoriesContext from "../hooks/useCategoriesContext";
import CategoryAdminCard from "./CategoryAdminCard";

const CategoriesAdminList = () => {

  const { categories } = useCategoriesContext();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        

  return (
    <>
      { categories.length > 0 ? (
        <>
          <h2 className="font-black text-2xl text-center mb-5">Listado de categorías</h2> 

          <p className='text-lg text-center mb-8'>Administra tus <span className='font-bold'>categorías</span></p>

          <div className="flex flex-col gap-6">
            {categories?.map(category => (
              category.id && (
                <CategoryAdminCard 
                  key={category.id} 
                  category={category}
                />
              )
            ))}
          </div>
        </>
      ) : (
        <>
          <h2 className="font-black text-2xl text-center mb-8">No hay categorías</h2> 
        
          <p className="text-center">Comienza creando tus categorías y aparecerán en este lugar.</p>
        </>
      ) }
    </>
  )
}

export default CategoriesAdminList