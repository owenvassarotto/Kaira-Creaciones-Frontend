import { useContext } from 'react'
import { Link } from 'react-router-dom'
// icons
import { FaRegTrashAlt } from "react-icons/fa";
// components
import Qty from './Qty'
// context
import { CartContext } from '../../context/CartContext'

const CartItem = ({ item }) => {

    const { removeFromCart } = useContext(CartContext);

  return (
    <div className='flex items-center gap-x-4 w-full'>
        <Link
            to={`/product/${item.id}`}
            className='w-[80px] h-[80px]'
        >
            <img 
                className='w-full h-full rounded-sm hover:scale-105 transition-all'
                src={import.meta.env.VITE_BACKEND_URL + `/uploads/products/${item.image}`} 
            />            
        </Link>

        <div className='flex-1'>
            <div className='flex justify-between mb-1'>
                <Link 
                    to={`/product/${item.id}`}
                    className='font-semibold text-sm truncate'
                >
                    {item.title}
                </Link>

                <button 
                    onClick={() => removeFromCart(item.id)}
                    className='text-lg hover:text-accent transition-all'
                >
                    <FaRegTrashAlt />
                </button>
            </div>
            
            <div>
                <div className='flex items-center gap-x-6 mb-1'>
                    <Qty item={item} />

                    <p className='text-lg text-accent font-bold'>${item.price * item.amount}</p>
                </div>

                {/* unit price */}
                <p className='text-accent font-bold text-sm'>${item.price} por unidad</p>
            </div>
        </div>

    </div>
  )
}

export default CartItem