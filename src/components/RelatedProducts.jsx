// components
import ProductSlider from "../components/ProductSlider";
import useProductsContext from "../hooks/useProductsContext";

const RelatedProducts = ({ categoryId }) => {

  // get products by category id
  const { products } = useProductsContext();

  const data = products?.filter(product => product.category_id === categoryId);

  return (
    <>
      <h2 className='text-primary bg-secondary shadow-md uppercase text-xl py-2 font-bold mb-6 text-center xl:pl-5 xl:text-left'>Productos Relacionados</h2>
      <div className="px-2">
        <ProductSlider data={data} />
      </div>
    </>
  )
}

export default RelatedProducts