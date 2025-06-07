import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router";
import SignIn from "./pages/Authentication/SiginIn";
import ProductHome from "./pages/Products/Home";
import MainLayout from "./components/MainLayout";
import ProductListByCategory from "./pages/Products/ListByCategory";
import ProductDetail from "./pages/Products/Detail";
import CartPage from "./pages/Products/CartPage";
import Wishlist from "./pages/Account/Wishlist";
import ProtectedRoute from "./components/ProtectedRoute";
import Orders from "./pages/Account/Orders";
import CustomerLayout from "./components/CustomerLayout";
import Profile from "./pages/Account/Profile";
import CheckoutPage from "./pages/Products/CheckoutPage";
import OrderDetails from "./pages/Account/OrderDetails";
import SearchByProducts from "./pages/Products/SearchByProducts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/customer">
          <Route index element={<Navigate to="/customer/login" />} />
          <Route path="login" element={<SignIn />} />
          <Route element={<MainLayout />}>
            <Route element={<ProtectedRoute />}>
              <Route element={<CustomerLayout />}>
                <Route path="account/wishlist" element={<Wishlist />} />
                <Route path="account/orders" element={<Orders />} />
                <Route path="account/orders/view">
                  <Route
                    index
                    element={<Navigate to="/customer/account/orders/" />}
                  />
                  <Route path=":orderId" element={<OrderDetails />} />
                </Route>
                <Route path="account/profile" element={<Profile />} />
              </Route>
            </Route>
          </Route>
        </Route>
        <Route element={<MainLayout />}>
          <Route path="/" element={<ProductHome />} />
          <Route path="/product">
            <Route index element={<Navigate to="/product/list" />} />
            <Route path="list" element={<Navigate to="/" />} />
            <Route path=":productId" element={<ProductDetail />} />
          </Route>
          <Route path="/checkout">
            <Route index element={<Navigate to="/checkout/cart" />} />
            <Route path="cart" element={<CartPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="onepage" element={<CheckoutPage />} />
            </Route>
          </Route>
          <Route path="/category">
            <Route index element={<Navigate to="/" />} />
            <Route path=":slug" element={<ProductListByCategory />} />
          </Route>
          <Route path="/searchproducts" element={<SearchByProducts />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
