import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Product from '../components/Product'
import useCategoriesContext from '../hooks/useCategoriesContext';
import useProductsContext from '../hooks/useProductsContext';

const Products = () => {
  const { id } = useParams();

  // get products by category id
  const { products } = useProductsContext();

  const { categories } = useCategoriesContext();

  let data;
  if(id === "all"){
    data = products;
  }else{
    data = products.filter(product => product.category_id == id);
  }

  const categoryName = categories?.find(category => category.id == id)?.name;

  const [title, setTitle] = useState('');

  useEffect(() =>{
    if(data && data.length > 0){
      if(id === "all"){
        setTitle("Todos nuestros productos")
      }else{
        if(data.length > 1){
          setTitle(`${data.length} resultados para ${categoryName}`);
        }else{
          setTitle(`${data.length} resultado para ${categoryName}`);
        }
      }
    }else{
      setTitle("No se encontraron productos 🙁")
    }
  }, [data]);

  return (
    <div className='mt-36 lg:mt-0 container mx-auto w-full'>
      {/* title */}
      <div className='mb-4 uppercase font-bold text-center'>
        {title}
      </div>
      {/* products grid */}
      <div 
        className='w-full grid sm:grid-cols-2 md:grid-cols-3 gap-[15px] md:gap-[30px]'
      >
        {data?.map(product => {
          return (
            <Product key={product.id} product={product} />
          )
        })}
      </div>

      {id !== "all" && (
        <div className='flex justify-center'>
          <Link 
            to="/products/all"
            className='btn py-3 px-16 mt-10 rounded-full uppercase font-bold text-white'
          >
            Ver todos
          </Link>
        </div>
      )}
    </div>  
  )
}

export default Products