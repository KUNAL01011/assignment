import { createContext, useContext, useState } from "react";

export const OrderContext = createContext();

export const useOrderContext = () => {
  return useContext(OrderContext);
};

export const OrderContextProvider = ({ children }) => {
  const [order, setOrder] = useState(
    JSON.parse(localStorage.getItem("order")) || null
  );
  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
