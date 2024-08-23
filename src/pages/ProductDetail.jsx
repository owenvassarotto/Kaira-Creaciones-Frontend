// useParams hook
import { useParams } from "react-router-dom"
// components
import RelatedProducts from "../components/RelatedProducts";
// context 
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import axiosClient from "../config/axios";
import useCategoriesContext from "../hooks/useCategoriesContext";
import useCartContext from "../hooks/useCartContext";
import { formatPrice } from "../helpers/formatPrice";
import notify from "../helpers/showNotification";

const ProductDetail = () => {

  const { addToCart } = useCartContext();
  const [productData, setProductData] = useState(null);
  const { categories } = useCategoriesContext();

  const { id } = useParams();

  useEffect(() => {
    const getProductData = async () => {
      try {
        const { data } = await axiosClient(`/products/${id}`);

        setProductData(data);
      } catch (error) {
        notify("error", error.response.data.message)
      }
    }
    getProductData();
  }, [id]);

  if(!productData) return <div className="fixed inset-0 flex justify-center items-center"><Spinner /></div>;

  const categoryName = categories?.find(category => category.id === productData.category_id)?.name;

  return (
    <div className="mt-32 lg:mt-10 container mx-auto">
      {/* product detail */}
      <div className="flex flex-col lg:flex-row gap-[30px] mb-[30px]">

        <div className="lg:w-1/2">
          <img 
            src={productData.image} 
            alt={`Foto del producto ${productData.title}`} 
            className="w-full max-h-[500px] rounded-md object-cover"
          />
        </div>

        <div className="lg:w-1/2 bg-secondary p-12 rounded-md flex flex-col justify-center">
          {/* category name */}
          <div className="uppercase text-accent text-lg font-medium mb-2">
            {categoryName}
          </div>
          {/* product title */}
          <div className="h2 mb-4 font-semibold">
            {productData.title}
          </div>
          {/* description */}
          <div className="mb-12 ">
            {productData.description}
          </div>
          {/* price & btn */}
          <div className="flex flex-col lg:items-center lg:flex-row gap-6 lg:gap-8">
            {/* price */}
            <div className="text-3xl text-accent font-semibold">${formatPrice(productData.price)}</div>
            <button 
              onClick={() => addToCart(productData, id)}
              className="btn text-white text-xs py-3 px-6 rounded-full font-bold uppercase h-auto w-fit lg:full"
            >
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>

      {/* related products */}
      <RelatedProducts categoryId={productData.category_id} />
    </div>
  )
}

export default ProductDetail