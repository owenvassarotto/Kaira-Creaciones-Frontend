import { useContext } from "react";
import CategoriesContext from "../../context/CategoriesContext";

const useCategoriesContext = () => useContext(CategoriesContext);

export default useCategoriesContext;