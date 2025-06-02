import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router";
import SignIn from "./pages/Authentication/SiginIn";
import ProductHome from "./pages/Products/Home";
import MainLayout from "./components/MainLayout";
import ProductListByCategory from "./pages/Products/ListByCategory";
import ProductDetail from "./pages/Products/Detail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<ProductHome />} />
          <Route path="/product">
            <Route index element={<Navigate to="/product/list" />} />
            <Route path="list" element={<Navigate to="/" />} />
            <Route path=":productId" element={<ProductDetail />} />
          </Route>
          <Route path="/category">
            <Route index element={<Navigate to="/" />} />
            <Route path=":slug" element={<ProductListByCategory />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
