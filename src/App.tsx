import { Route, Routes, useLocation } from "react-router-dom";
import { useColorModeValue } from "./components/ui/color-mode";
import { Box } from "@chakra-ui/react";
import NavBar from "./component/NavBar";
import Footer from "./component/Footer";
import HomePage from "./pages/Homepage";
import { Toaster } from "./components/ui/toaster";
import CartPage from "./pages/CartPage";
import PaymentVerifyPage from "./pages/PaymentVerifyPage";
import CheckoutDialog from "./component/CheckoutDialog";
import NotFoundPage from "./pages/NotFound";

const KNOWN_PATHS = ["/", "/cart", "/payment-verify"];

function App() {
  const location = useLocation();
  const isKnownRoute = KNOWN_PATHS.includes(location.pathname);

  return (
    <Box bg={useColorModeValue("gray.50", "gray.950")}>
      {isKnownRoute && <NavBar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment-verify" element={<PaymentVerifyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {isKnownRoute && <CheckoutDialog />}
      {isKnownRoute && <Footer />}
      {isKnownRoute && <Toaster />}
    </Box>
  );
}

export default App;
