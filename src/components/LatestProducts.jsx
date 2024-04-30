import ProductSlider from './ProductSlider'
import useProductsContext from '../hooks/useProductsContext'
import { Link } from 'react-router-dom';

const LatestProducts = () => {

  const { products } = useProductsContext();

  return (
    <div className='container mx-auto mb-14'>
      <h2 className='text-primary bg-secondary shadow-md uppercase text-xl py-2 font-bold mb-6 text-center xl:pl-5 xl:text-left'>Destacados del mes</h2>

      <div className='px-2 mb-12'>
        <ProductSlider data={products} />
      </div>

      <div className='flex justify-center'>
        <Link 
          to="/products/all"
          className='btn py-3 px-16 rounded-full uppercase font-bold text-white'
        >
          Ver todos
        </Link>
      </div>
    </div>
  )
}

export default LatestProducts