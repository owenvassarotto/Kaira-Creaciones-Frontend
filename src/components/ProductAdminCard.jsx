import useCategoriesContext from "../hooks/useCategoriesContext";
import useProductsContext from "../hooks/useProductsContext";

const ProductAdminCard = ({ product }) => {

  const { id, title, description, price, is_new, image, category_id } = product;

  const { setProductToUpdate, deleteProduct } = useProductsContext();

  const { categories } = useCategoriesContext();

  const categoryName = categories?.find(category => category.id === category_id)?.name;

  return (
    <div className="bg-white shadow-md p-5 rounded-xl flex flex-col gap-1">
        <p className="font-bold uppercase text-sm">ID: <span className="font-normal normal-case text-black">{id}</span></p> 
        <p className="font-bold uppercase text-sm">Título: <span className="font-normal normal-case text-black">{title}</span></p> 
        <p className="font-bold uppercase text-sm truncate">Descripción: <span className="font-normal normal-case text-black">{description}</span></p> 
        <p className="font-bold uppercase text-sm">Precio: <span className="font-normal normal-case text-black">${price}</span></p> 
        <p className="font-bold uppercase text-sm">Categoría: <span className="font-normal normal-case text-black">{categoryName}</span></p> 
        <p className="font-bold uppercase text-sm">¿Es nuevo? <span className="font-normal normal-case text-black">{is_new ? "Si" : "No"}</span></p> 
        <div>
          <p className="font-bold uppercase text-sm mb-1">Imagen:</p> 
          <img 
            src={import.meta.env.VITE_BACKEND_URL + `/uploads/products/${image}`} 
            className="rounded-md w-28"
          />
        </div>

        <div className="mt-2 flex justify-between gap-2">
          <button
            className="py-2 px-8 btn rounded-lg font-bold text-sm"
            onClick={() => setProductToUpdate(product)}
          >
            Editar
          </button>

          <button
            className="py-2 px-8 bg-red-500 hover:bg-red-600 rounded-lg font-bold text-white text-sm"
            onClick={() => deleteProduct(id)}
          >
            Eliminar
          </button>
        </div>

    </div>
  )
}

export default ProductAdminCard