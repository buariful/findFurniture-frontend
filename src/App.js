import { ToastContainer } from "react-toastify";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Order from "./pages/Order";
import { Layout } from "./Layout";
import Review from "./pages/Review";
import AdminAllProducts from "./pages/AdminAllProducts";
import AdminSingleProduct from "./pages/AdminSingleProduct";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/home"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/product/:id"
            element={
              <Layout>
                <ProductDetails />{" "}
              </Layout>
            }
          />
          <Route
            path="/wishlist"
            element={
              <Layout>
                <Wishlist />
              </Layout>
            }
          />
          <Route
            path="/login"
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />
          <Route
            path="/register"
            element={
              <Layout>
                <Register />
              </Layout>
            }
          />
          <Route
            path="/checkout"
            element={
              <Layout>
                <Checkout />
              </Layout>
            }
          />

          <Route path="/dashboard/" element={<Dashboard />}>
            <Route index element={<Order />} />
            <Route path="profile" element={<Profile />} />
            <Route path="review" element={<Review />} />
            <Route path="admin/all-products" element={<AdminAllProducts />} />
            <Route path="admin/product/:id" element={<AdminSingleProduct />} />
          </Route>
        </Routes>
      </Router>

      <ToastContainer />
    </div>
  );
}

export default App;
