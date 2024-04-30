import useOrdersContext from '../hooks/useOrdersContext'
import OrderCard from '../components/OrderCard';
import useAuthContext from '../hooks/useAuthContext';

const Orders = () => {

  const { orders } = useOrdersContext();
  const { auth } = useAuthContext();

  const userOrders = orders.filter(order => order.user_id === auth.id);

  return (
    <>
        <h1 className='h2 font-bold text-center mb-4'>Mis Ordenes</h1>

        <p className='text-center text-black mb-6'>Administra tus <span className='text-primary font-semibold'>ordenes aquí</span></p>

        {userOrders.length > 0 ? (
        userOrders.map(order => (
          <OrderCard key={order.id} data={order} />
        ))
        ) : (
          <p className="text-center text-black text-lg">No tienes órdenes registradas aún 😭.</p>
        )}

    </>
  )
}

export default Orders