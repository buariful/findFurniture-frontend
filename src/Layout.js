import Footer from "./component/shared/Footer";
import Navbar from "./component/shared/header/Navbar";

export const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};
