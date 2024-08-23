import { Link } from "react-router-dom";
import useCategoriesContext from "../hooks/useCategoriesContext";
import { formatPrice } from "../helpers/formatPrice";

const Product = ({ product }) => {

  const { categories } = useCategoriesContext();

  const categoryName = categories?.find(category => category.id === product.category_id)?.name;

  return (
    <Link 
      to={`/product/${product.id}`}
    >
      <div className="bg-white shadow-md shadow-black/15 hover:shadow-black/25 hover:scale-95 transition-all w-full h-[435px] rounded-[8px] relative my-2">
          <div className="px-6 pt-14 flex flex-col">
            {/* badge */}
            {product.is_new === 1 && <div className="absolute bg-primary text-white text-[12px] font-extrabold uppercase top-3 right-6 px-2 rounded-full">Nuevo</div>}

            {/* image */}
            <div className="w-full h-[250px] mb-10 flex flex-col items-center justify-center">
                <img 
                    src={product.image} 
                    className="object-cover w-full h-full group-hover:scale-90 transition-all rounded-t-md"
                />
                {/* category name */}
                <p className="text-sm text-center py-2 text-primary bg-secondary w-full uppercase font-medium rounded-b-md">
                  {categoryName}
                </p>
            </div>

            {/* product title */}
            <p className="text-lg mb-2 truncate text-primary">
              {product.title}
            </p>
            {/* price */}
            <p className="text-accent text-lg font-bold text-primary">
              ${formatPrice(product.price)}
            </p>
          </div>
      </div>
    </Link>
  )
}

export default Product