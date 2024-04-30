import { useContext } from "react";
import ProductsContext from "../../context/ProductsContext";

const useProductsContext = () => useContext(ProductsContext);

export default useProductsContext;