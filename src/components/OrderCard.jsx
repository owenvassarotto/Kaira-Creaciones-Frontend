import { useState } from "react";
import { formatDate } from "../helpers/formatDate";
import { formatPrice } from "../helpers/formatPrice";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import axiosClient from "../config/axios";
import notify from "../helpers/showNotification";
import Spinner from "./Spinner";
import useProductsContext from "../hooks/useProductsContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import useAuthContext from "../hooks/useAuthContext";
import useOrdersContext from "../hooks/useOrdersContext";
import EditOrderModal from "./EditOrderModal";

const OrderCard = ({ data }) => {

  const { id, order_date, payment_status, pickup_status, total_price, order_details_count, user_name, user_email, user_phone_number  } = data;

  const { products } = useProductsContext();

  const { deleteOrder } = useOrdersContext();

  const { auth } = useAuthContext();

  const [showOrderProducts, setShowOrderProducts] = useState(false);
  const [orderProducts, setOrderProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showEditOrderModal, setShowEditOrderModal] = useState(false);

  const getOrderDetails = async (orderId) => {

    if(showOrderProducts) {
      setShowOrderProducts(false);
      setOrderProducts([]);
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token_kaira_creaciones');
      if(!token) return;

      const config = {
          headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token
          }
      }

      const { data } = await axiosClient(`/orders/order-details/${orderId}`, config)

      setOrderProducts(data);

      setShowOrderProducts(true);

    } catch (error) {
      console.log(error);
      notify("error", error.response.data.message);
      setLoading(false);
    }

    setLoading(false);
  }

  return (
    <>
      <div className='bg-white shadow-md shadow-black/20 text-black p-4 mb-6'>
        <div className="flex justify-between items-center mb-1">
          <p className="font-bold">#{id}</p>

          {auth?.is_admin === 1 && (
            <div className="flex itemes-center gap-3">
              <button
                className="text-orange-500 text-lg"
                onClick={() => setShowEditOrderModal(true)}
              >
                <MdEdit />
              </button>

              <button
                className="text-red-500 text-lg"
                onClick={() => deleteOrder(id)}
              >
                <FaRegTrashAlt />
              </button>
            </div>
          )}
        </div>
        {/* flex div */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          {/* order id, user name, user email, user phone, payment status and pickup status */}
          <div>
            <p className="text-sm">{user_name}</p>
            <p className="text-sm">{user_email}</p>
            <p className="text-sm">{user_phone_number}</p>

            <div className="mt-3 flex gap-2">
              {/* payment status */}
              <div className={`${payment_status === 'pendiente' ? 'bg-red-300' : 'bg-green-300 '} rounded-full p-1 px-3 text-xs font-medium capitalize-first whitespace-nowrap`}>Pago {payment_status}</div>
              {/* pickup status */}
              <div className={`${pickup_status === 'por empaquetar' ? 'bg-gray-300' : pickup_status === 'para retirar' ? 'bg-blue-300' : 'bg-green-300 '} rounded-full p-1 px-3 text-xs font-medium capitalize-first whitespace-nowrap`}>{pickup_status}</div>
            </div>
          </div>

          {/* order date, total price, products quantity and down arrow icon (button) */}
          <div className="text-sm sm:text-right">
            <p>{formatDate(order_date)}</p>
            <p className="font-semibold">$ {formatPrice(total_price)}</p>
            <p className="font-semibold">{order_details_count > 1 ? `${order_details_count} productos` : `${order_details_count} producto` }</p>
            <button 
              className="text-xl mt-3 w-full flex justify-center"
              onClick={() => getOrderDetails(id)}
            >
              {showOrderProducts ? <SlArrowUp title="Ocultar productos" /> : <SlArrowDown title="Mostrar productos" />}
            </button>
          </div>
        </div>

        {/* spinner */}
        {loading && <div className='my-6'><Spinner /></div>}

        {/* products list */}
        {showOrderProducts && (
          <div className="mt-6 flex flex-col gap-4">
            {orderProducts?.map(orderProduct => {

              const product = products.find(product => product.id === orderProduct.product_id);

              if (product) {
                return (
                  <div className="flex gap-4 text-sm w-full sm:items-center" key={orderProduct.id}>
                    {/* image, title and quantity */}
                    <img 
                      src={import.meta.env.VITE_BACKEND_URL + `/uploads/products/${product.image}`} 
                      className="min-w-20 h-20 rounded-lg"
                      alt={product.title}
                    />

                    <div className="flex flex-col sm:flex-row justify-between w-full">
                      <div>
                        <p>{product.title}</p>
                        <div className="flex items-center gap-2">
                          <p>{orderProduct.quantity}x</p>
                          <p>${formatPrice(orderProduct.unit_price)}</p>
                        </div>
                      </div>

                      {/* unit total */}
                      <p className="font-semibold">${formatPrice(orderProduct.unit_price * orderProduct.quantity)}</p>
                    </div>
                  </div>
                );
              } else {
                return null;
              }
              })}
          </div>
        )}
      </div>
        
      {showEditOrderModal && (
        <EditOrderModal orderData={ { id, payment_status, pickup_status } } setShowEditOrderModal={setShowEditOrderModal} />
      )}
    </>
  )
}

export default OrderCard