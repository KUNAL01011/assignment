import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./home/Home.jsx";
import ProductDetail from "./products/ProductDetail.jsx";
import { OrderContextProvider } from "./context/orderContext.jsx";
import Checkout from "./checkout/Checkout.jsx";
import PayNow from "./checkout/PayNow.jsx";
import Success from "./success_failier/Success.jsx";
import Failure from "./success_failier/Failure.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/pay-now" element={<PayNow />} />
      <Route path="/success" element={<Success />} />
      <Route path="/failure" element={<Failure />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <OrderContextProvider>
        <RouterProvider router={router} />
      </OrderContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
