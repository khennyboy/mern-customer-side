import { Route, Routes } from "react-router-dom";
import { useColorModeValue } from "./components/ui/color-mode";
import { Box } from "@chakra-ui/react";
import NavBar from "./component/NavBar";
import Footer from "./component/Footer";
import HomePage from "./pages/Homepage";
import { Toaster } from "./components/ui/toaster";
import CartPage from "./pages/CartPage";
import PaymentVerifyPage from "./pages/PaymentVerifyPage";
import CheckoutDialog from "./component/CheckoutDialog";

function App() {
  return (
    <Box bg={useColorModeValue("gray.50", "gray.950")}>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment-verify" element={<PaymentVerifyPage />} />{" "}
      </Routes>
      <CheckoutDialog />
      <Footer />
      <Toaster />
    </Box>
  );
}

export default App;
