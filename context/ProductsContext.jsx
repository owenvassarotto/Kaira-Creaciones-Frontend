import { createContext, useState } from "react";
import axiosClient from "../src/config/axios";
import notify from "../src/helpers/showNotification";
import { useEffect } from "react";

const ProductsContext = createContext();

export const ProductsProvider = ({children}) => {

    const [products, setProducts] = useState([]);
    const [productToUpdate, setProductToUpdate] = useState(null);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const { data } = await axiosClient('/products');

                setProducts(data);
                
            } catch (error) {
                console.log(error.response.data.message);
            }
        }
        getProducts();
    }, []);


    const saveProduct = async (product) => {

        const formData = new FormData();
        formData.append('title', product.title);
        formData.append('description', product.description);
        formData.append('price', product.price);
        formData.append('is_new', product.is_new);
        formData.append('category_id', product.category_id);
        formData.append('product-image', product.image);

        const token = localStorage.getItem('token_kaira_creaciones');
        if(!token) return;

        const config = {
            // The condition selects the appropriate Content-Type based on product.id and product.image. For editing with no new image, it's "application/json", else it's "multipart/form-data". This ensures accurate data transmission in the request.
            headers: {
                "Content-Type": product.id && product.image === null ? "application/json" : "multipart/form-data",
                "Authorization": "Bearer " + token
            }
        }

        if(product.id){
            // update product
            try {

                let requestData;
                if (product.id && product.image === null) {
                    requestData = product; // Use 'product' as JSON data
                } else {
                    requestData = formData; // Use 'formData' as FormData
                }

                const { data } = await axiosClient.put(`/products/${product.id}`, requestData, config);
                
                notify("success", data.message);
                
                const productUpdated = await axiosClient(`/products/${product.id}`);

                setProducts(products.map(product => product.id === productUpdated.data.id ? productUpdated.data : product ));
                
                setProductToUpdate({});

            } catch (error) {
                notify("error", error.response.data.message);
            }
        }else{
            // create new product
            try {
    
                const { data } = await axiosClient.post('/products', formData, config);
                
                notify("success", data.message);
    
                // add the new product to the state
                const newProductData = await axiosClient(`/products/${data.productId}`);
    
                setProducts([...products, newProductData.data]);
    
            } catch (error) {
                notify("error", error.response.data.message);
            }
        }
    }

    const deleteProduct = async id => {

        const isConfirmed = confirm('¿Estás seguro de que deseas eliminar este producto?');

        if(!isConfirmed) return;

        try {
            const token = localStorage.getItem('token_kaira_creaciones');
                if(!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            }

            const { data } = await axiosClient.delete(`/products/${id}`, config);

            setProducts(products.filter(product => product.id !== id));

            notify("success", data.message);

        } catch (error) {
            notify("error", error.response.data.message);
        }
    }

    return (
        <ProductsContext.Provider
            value={{
                products,
                setProducts,
                saveProduct,
                productToUpdate,
                setProductToUpdate,
                deleteProduct,
            }}
        >
            {children}
        </ProductsContext.Provider>
    )
}

export default ProductsContext;