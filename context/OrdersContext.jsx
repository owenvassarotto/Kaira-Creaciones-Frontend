import { createContext, useEffect, useState } from "react";
import axiosClient from "../src/config/axios";
import notify from "../src/helpers/showNotification";

const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // get all the orders

        const getOrders = async () => {
            try {
                const token = localStorage.getItem('token_kaira_creaciones');
                if(!token) return;

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    }
                }
                const { data } = await axiosClient('/orders', config);

                setOrders(data);
            } catch (error) {
                console.log(error);
            }
        }
        getOrders();
    }, [orders]);    

    const deleteOrder = async (orderId) => {

        const isConfirmed = confirm('¿Estás seguro de que deseas eliminar esta orden?');

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

            const { data } = await axiosClient.delete(`/orders/${orderId}`, config);

            notify("success", data.message);

            // remove deleted order from context 
            setOrders(orders.filter(order => order.id !== orderId));

        } catch (error) {
            console.log(error);
            notify("error", error.response.data.message);
        }
    }

    return (
        <OrdersContext.Provider
            value={{
                orders,
                setOrders,
                deleteOrder,
            }}
        >
            { children }
        </OrdersContext.Provider>
    )
}

export default OrdersContext;