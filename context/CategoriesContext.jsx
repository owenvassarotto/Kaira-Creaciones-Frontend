import { createContext, useEffect, useState } from "react";
import axiosClient from "../src/config/axios";

const CategoriesContext = createContext();

export const CategoriesProvider = ({children}) => {

    const [categories, setCategories] = useState([]);
    const [categoryToUpdate, setCategoryToUpdate] = useState(null);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const {data} = await axiosClient('/categories');

                setCategories(data);
            } catch (error) {
                console.log(error);
            }
        }
        getCategories();
    }, [])

    return (
        <CategoriesContext.Provider
            value={{
                categories,
                setCategories,
                categoryToUpdate,
                setCategoryToUpdate,
            }}
        >
            {children}
        </CategoriesContext.Provider>
    )

}

export default CategoriesContext;