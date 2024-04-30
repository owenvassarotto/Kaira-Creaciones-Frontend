import { useContext } from "react";
import OrdersContext from "../../context/OrdersContext";

const useOrdersContext = () => useContext(OrdersContext);

export default useOrdersContext;