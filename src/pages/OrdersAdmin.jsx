import OrderCard from '../components/OrderCard';
import useOrdersContext from '../hooks/useOrdersContext'

const OrdersAdmin = () => {

    const { orders } = useOrdersContext();

  return (
    <>
        <h1 className='h2 font-bold text-center mb-4'>Ordenes de compra</h1>

        <p className='text-center text-black mb-6'>Administra todas las <span className='text-primary font-semibold'>ordenes aquí</span></p>

        {/* orders */}
        {orders?.map(order => <OrderCard key={order.id} data={order} /> )}
    </>
  )
}

export default OrdersAdmin