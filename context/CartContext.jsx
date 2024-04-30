import { createContext, useEffect, useState } from "react";
// react toastify 
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import notify from "../src/helpers/showNotification";

// create context
export const CartContext = createContext();

const CartProvider = ({children}) => {
    
    const [isOpen, setIsOpen] = useState(false);
    const [cart, setCart] = useState([]);
    const [itemsAmount, setItemsAmount] = useState(0);
    const [amount, setAmount] = useState(0);
    const [total, setTotal] = useState(0);

    // cart amount 
    useEffect(() => {
        // const amount = cart.reduce((accumulator, currentValue) => {
        //     return accumulator + currentValue.amount;
        // }, 0);

        const amount = cart.length;

        setItemsAmount(amount);

        const total = cart.reduce((accumulator, currentValue) =>{
            return accumulator + (currentValue.price * currentValue.amount);
        }, 0);

        setTotal(total);
    }, [cart]);


    // add to cart 
    const addToCart = (item, id) => {
        const itemID = parseInt(id);
        const newItem = {...item, amount: 1};
        
        // check if item is already in the cart
        const cartItem = cart.find((item) => {
            return item.id === itemID;
        });
        if(cartItem){
            const newCart = cart.map(item => {
                // if item.id === itemID return the same item but with amount property +1
                if(item.id === itemID){
                    setAmount(cartItem.amount + 1);
                    return {...item, amount: cartItem.amount + 1};
                }else{
                    return item;
                }
            })
            setCart(newCart);
        }else{
            setCart([...cart, newItem]);
        }

        // show notification
        notify("success", "Agregado al carrito");
    }

    // remove from cart
    const removeFromCart = id => {
        setCart(cart.filter(item => item.id !== id));

        // show notification
        notify("error", "Producto eliminado");
    }

    // handleInput function to cart item
    const handleInput = (e, id) => {
        const value = parseInt(e.target.value);

        // find the item in the cart by id
        const cartItem = cart.find((item) => item.id === id);

        if(cartItem){
            const newCart = cart.map(item => {
                if(item.id === id){
                    if(isNaN(value)){
                        setAmount(1);
                        return {...item, amount: 1 };
                    }else{
                        setAmount(value);
                        return {...item, amount: value };
                    }
                }else{
                    return item;
                }
            })

            setCart(newCart);
        }
    }

    const handleSelect = (e, id) => {
        const value = parseInt(e.target.value);

        // find the item in the cart by id
        const cartItem = cart.find((item) => item.id === id);

        if(cartItem){
            const newCart = [...cart].map(item => {
                if(item.id === id){
                    setAmount(value);
                    return {...item, amount: value};
                }else{
                    return item;
                }
            })

            setCart(newCart);
        }
    }

    // clear cart
    const clearCart = () => {
        setCart([]);

        // notify("success", "Carrito vaciado")
    }

    return (
        <CartContext.Provider 
            value={{
                isOpen,
                setIsOpen,
                addToCart,
                cart,
                removeFromCart,
                itemsAmount,
                handleInput,
                handleSelect,
                total,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;
