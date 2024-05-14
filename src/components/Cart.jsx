// icons
import { IoArrowForward, IoCartOutline, IoClose } from "react-icons/io5";

// context
import useCartContext from '../hooks/useCartContext';

// react router
import { useNavigate } from "react-router-dom";

// cart item
import CartItem from './CartItem';
import { useState } from "react";
import Spinner from "./Spinner";
import axiosClient from "../config/axios";
import useAuthContext from "../hooks/useAuthContext";
import notify from "../helpers/showNotification";
import useOrdersContext from "../hooks/useOrdersContext";

const Cart = () => {

  const navigate = useNavigate();

  const { setIsOpen, cart, total, clearCart, itemsAmount } = useCartContext();

  const { orders, setOrders } = useOrdersContext();

  const { auth } = useAuthContext();

  const [loading, setLoading] = useState(false);
  
  const handlePurchaseOrder = async () => {

    if(!auth?.id){
      notify("error", "Inicia sesión o create una cuenta para realizar una orden");
      return;
    }
    
    const token = localStorage.getItem('token_kaira_creaciones');
    if(!token) return;
    
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
        }
    }

    setLoading(true);
    try {
      const { data } = await axiosClient.post('/orders/create-order', { user_id: auth.id, products: cart, total_price: total }, config)
      
      notify("success", data.message);

      setOrders([...orders, data.order]);
      
      setTimeout(() => {
        clearCart();
        navigate('/user/orders');
        setIsOpen(false);
      }, 1000);

    } catch (error) {
        console.log(error);
        setLoading(false);
    }  
    setLoading(false);
  };

  return (
    <div className='w-full h-full px-4 flex flex-col justify-between'>
      <div className='pb-4 overflow-y-auto'>
        {/* close icon */}
        <button 
          onClick={() => setIsOpen(false)}
          className='text-4xl w-20 h-[98px]'
        >
          <IoClose />
        </button>

        {/* products cart */}
        <div className='flex flex-col gap-y-6'>
        {
          cart.map((item) => {
            return <CartItem key={item.id} item={item} />
          })
        }
        </div>
      </div>

      {/* subtotal and total */}
      {cart.length >= 1 ? (
        <div className='py-6'>
          <div className='flex flex-col gap-y-2'>
            <div className='flex justify-between font-semibold'>
              <div>Subtotal</div>
              <div>${total}</div>
            </div>

            <div className='flex justify-between text-xl font-bold'>
              <div>Total</div>
              <div>${total}</div>
            </div>
          </div>


          {/* buttons */}
          <div className='flex justify-between gap-x-4 mt-6 h-10'>
            <button 
              onClick={() => clearCart()}
              className='btn text-white font-semibold w-full'
              >
                Limpiar carrito
            </button>
            <button 
              onClick={() => handlePurchaseOrder()}
              className='btn text-white font-semibold w-full flex items-center justify-center'>
              Realizar orden
              <IoArrowForward className='text-lg ml-2' />
            </button>
          </div>

          {/* spinner */}
          {loading && <div className='mt-4'><Spinner /></div>}
        </div>
      ) : (
        <div className='h-full absolute top-0 right-0 left-0 flex justify-center items-center -z-10 flex-col text-primary'>
          <p className='text-lg font-semibold'>Tu carrito está vacío</p>
          <div className='text-6xl'>
            <IoCartOutline />
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart