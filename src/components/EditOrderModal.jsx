import { useState } from 'react'
import notify from '../helpers/showNotification';
import useOrdersContext from '../hooks/useOrdersContext';
import axiosClient from '../config/axios';
import Spinner from './Spinner';

const EditOrderModal = ({ orderData, setShowEditOrderModal }) => {

    const [paymentStatus, setPaymentStatus] = useState(orderData.payment_status || '');
    const [pickupStatus, setPickupStatus] = useState(orderData.pickup_status || '');
    const [loading, setLoading] = useState(false);

    const { orders, setOrders } = useOrdersContext();

    const handleSubmit = async e => {
        
        e.preventDefault();
        
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

            const { data } = await axiosClient.put(`/orders/${orderData.id}`, { payment_status: paymentStatus, pickup_status: pickupStatus }, config)

            notify("success", data.message);

            setOrders(orders.map(order => order.id === data.order.id ? data.order : order));

        } catch (error) {
            console.log(error);
            notify("error", error.response.data.message);
            setLoading(false);
        }

        setLoading(false);
    }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50 px-2">
        <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Editar Orden #{orderData.id}</h2>
            <form
                onSubmit={e => handleSubmit(e)}
            >
                <div className="mb-4">
                    <label htmlFor="paymentStatus" className="block text-gray-700 mb-1">Estado de Pago</label>
                    <select 
                        id="paymentStatus" 
                        value={paymentStatus} 
                        onChange={(e) => setPaymentStatus(e.target.value)} 
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 text-black"
                    >
                        <option value="" disabled>Seleccionar estado de pago</option>
                        <option value="pendiente">Pendiente</option>
                        <option value="recibido">Recibido</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="pickupStatus" className="block text-gray-700 mb-1">Estado de Entrega</label>
                    <select 
                        id="pickupStatus" 
                        value={pickupStatus} 
                        onChange={(e) => setPickupStatus(e.target.value)} 
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 text-black"
                    >
                        <option value="" disabled>Seleccionar estado de entrega</option>
                        <option value="por empaquetar">Por empaquetar</option>
                        <option value="para retirar">Para retirar</option>
                        <option value="retirado">Retirado</option>
                    </select>
                </div>
                <div className="mt-6 flex justify-between">
                    <button type="submit" className="btn text-white px-4 py-2 rounded transition-colors">Guardar</button>

                    <button 
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                        onClick={() => setShowEditOrderModal(false)}
                    >
                        Cerrar
                    </button>
                </div>
            </form>

            {/* spinner */}
          {loading && <div className='my-4'><Spinner /></div>}
        </div>
    </div>
  )
}

export default EditOrderModal