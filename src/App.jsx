import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";

// Pages
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import ErrorPage from "./pages/error-page";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import RegisterUser from "./pages/RegisterUser";
import ConfirmAccount from "./pages/ConfirmAccount";
import ProductsAdmin from "./pages/ProductsAdmin";
import EditProfile from "./pages/EditProfile";
import ResetPassword from "./pages/ResetPassword";
// Components
import NewPassword from "./pages/NewPassword";

import { ToastContainer } from "react-toastify";

import CartProvider from "../context/CartContext";
import { AuthProvider } from "../context/AuthContext";
import ProtectedAdminRoute from "./Layout/ProtectedAdminRoute";
import Layout from "./Layout/Layout";
import { ProductsProvider } from "../context/ProductsContext";
import { CategoriesProvider } from "../context/CategoriesContext";
import { OrdersProvider } from "../context/OrdersContext";
import Spinner from "./components/Spinner";
import { useEffect, useState } from "react";
import ProtectedUserRoute from "./Layout/ProtectedUserRoute";
import Orders from "./pages/Orders";
import OrdersAdmin from "./pages/OrdersAdmin";
import CategoriesAdmin from "./pages/CategoriesAdmin";
import FAQ from "./pages/FAQ";
import CreateTestimonial from "./pages/CreateTestimonial";
import { TestimonialProvider } from "../context/TestimonialsContext";
import TestimonialsAdmin from "./pages/TestimonialsAdmin";
import ScrollToTop from "./components/ScrollToTop";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollToTop />
        <Layout />
      </>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "products/:id", element: <Products /> },
      { path: "product/:id", element: <ProductDetail /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <RegisterUser /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "forgot-password/:token", element: <NewPassword /> },
      { path: "confirm/:token", element: <ConfirmAccount /> },
      { path: "faq", element: <FAQ />},
      { path: "new-testimonial/:token", element: <CreateTestimonial /> }
    ],
    errorElement: <ErrorPage />
  },
  {
    path: "/admin",
    element: (
      <>
        <ScrollToTop />
        <ProtectedAdminRoute /> 
      </>
    ),
    children: [
      { index: true, element: <Navigate to="products" /> },
      { path: "products", element: <ProductsAdmin /> },
      { path: "orders", element: <OrdersAdmin /> },
      { path: "categories", element: <CategoriesAdmin /> },
      { path: "testimonials", element: <TestimonialsAdmin /> },
    ],
    errorElement: <ErrorPage />
  },
  {
    path: "/user",
    element: (
      <>
        <ScrollToTop />
        <ProtectedUserRoute />
      </>
    ),
    children: [
      { index: true, element: <Navigate to="profile" /> },
      { path: "profile", element: <EditProfile /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "orders", element: <Orders /> },
    ],
    errorElement: <ErrorPage />
  }
]);

function App() {  

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {loading ? (
        <div className="fixed inset-0 flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <AuthProvider>
          <CartProvider>
            <ProductsProvider>
              <CategoriesProvider>
                <OrdersProvider>
                  <TestimonialProvider>
                    {/* react toastify component */}
                    <ToastContainer />
                    {/* routes */}
                    <RouterProvider router={router} />
                  </TestimonialProvider>
                </OrdersProvider>
              </CategoriesProvider>
            </ProductsProvider>
          </CartProvider>
        </AuthProvider>
      )}
    </>
  )
}

export default App
