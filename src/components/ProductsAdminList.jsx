import useProductsContext from "../hooks/useProductsContext"
import ProductAdminCard from "./ProductAdminCard";


const ProductsAdminList = () => {

  const { products } = useProductsContext();

  return (
    <>
      { products?.length > 0 ? (
        <>
          <h2 className="font-black text-2xl text-center mb-5">Listado de productos</h2> 

          <p className='text-lg text-center mb-8'>Administra tus <span className='font-bold'>productos</span></p>

          <div className="flex flex-col gap-6">
            {products?.map(product => (
              product.id && (
                <ProductAdminCard 
                  key={product.id} 
                  product={product}
                />
              )
            ))}
          </div>
        </>
      ) : (
        <>
          <h2 className="font-black text-2xl text-center mb-8">No hay productos</h2> 
        
          <p className="text-center">Comienza agregando productos y aparecerán en este lugar.</p>
        </>
      ) }
    </>
  )
}

export default ProductsAdminList