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
import AdminCreateProduct from "./pages/AdminCreateProduct";
import Overview from "./pages/Overview";
import CategoryProduct from "./pages/CategoryProduct";
import useAuthCheck from "./utils/useAuthCheck";
import { LoaderFullScreen } from "./utils/Loader";
import OrderSuccess from "./pages/OrderSuccess";
import OrderFail from "./pages/OrderFail";
import PrivateRoute from "./utils/PrivateRoute";
import AdmAllUsers from "./pages/AdmAllUsers";
import AdmCategory from "./pages/AdmCategory";
import AdmAllBrand from "./pages/AdmAllBrand";
import NotFound from "./pages/NotFound";

function App() {
  const isAuthChecked = useAuthCheck();
  return !isAuthChecked ? (
    <LoaderFullScreen />
  ) : (
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
            path="/category-product"
            element={
              <Layout>
                <CategoryProduct />
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
          {/* ---------- private routes --------- */}
          <Route element={<PrivateRoute admin={false} />}>
            <Route
              path="/wishlist"
              element={
                <Layout>
                  <Wishlist />
                </Layout>
              }
              exact
            />
            <Route
              path="/checkout"
              element={
                <Layout>
                  <Checkout />
                </Layout>
              }
            />
            <Route
              path="/order/success/:trans_id"
              element={
                <Layout>
                  <OrderSuccess />
                </Layout>
              }
            />
            <Route
              path="/order/fail/:trans_id"
              element={
                <Layout>
                  <OrderFail />
                </Layout>
              }
            />
            <Route path="/dashboard/" element={<Dashboard />}>
              <Route index element={<Order />} />
              <Route path="profile" element={<Profile />} />
              <Route path="review" element={<Review />} />
            </Route>
          </Route>

          {/* --------- private route for admins ------ */}
          <Route element={<PrivateRoute admin={true} />}>
            <Route path="/dashboard/" element={<Dashboard />}>
              <Route path="admin/overview" element={<Overview />} />
              <Route path="admin/all-products" element={<AdminAllProducts />} />
              <Route
                path="admin/product/:id"
                element={<AdminSingleProduct />}
              />
              <Route
                path="admin/product/new"
                element={<AdminCreateProduct />}
              />
              <Route path="admin/users" element={<AdmAllUsers />} />
              <Route path="admin/category" element={<AdmCategory />} />
              <Route path="admin/brand" element={<AdmAllBrand />} />
            </Route>
          </Route>

          <Route
            path="*"
            element={
              <Layout>
                <NotFound />
              </Layout>
            }
          />
        </Routes>
      </Router>

      <ToastContainer />
    </div>
  );
}

export default App;
