import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SoldOutProvider } from "@/contexts/SoldOutContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Books from "./pages/Books";
import Clothes from "./pages/Clothes";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductInfo from "./pages/ProductInfo";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Payment from "./pages/Payment";
import Favorites from "./pages/Favorites";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRequests from "./pages/AdminRequests";
import AdminManageItems from "./pages/AdminManageItems";
import AdminRates from "./pages/AdminRates";
import AdminCategories from "./pages/AdminCategories";
import SellerDashboard from "./pages/SellerDashboard";
import SellerAddProduct from "./pages/SellerAddProduct";
import SellerItems from "./pages/SellerItems";
import SellerEditProduct from "./pages/SellerEditProduct";
import SellerPayment from "./pages/SellerPayment";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import AdminOrders from "./pages/AdminOrders";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SoldOutProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/books" element={<Books />} />
            <Route path="/clothes" element={<Clothes />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/:id" element={<ProductInfo />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<Order />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/favorites" element={<Favorites />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/requests" element={<AdminRequests />} />
            <Route path="/admin/manage-items" element={<AdminManageItems />} />
            <Route path="/admin/rates" element={<AdminRates />} />
            <Route path="/admin/categories" element={<AdminCategories />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            
            {/* Seller Routes */}
            <Route path="/seller" element={<SellerDashboard />} />
            <Route path="/seller/add-product" element={<SellerAddProduct />} />
            <Route path="/seller/items" element={<SellerItems />} />
            <Route path="/seller/edit/:id" element={<SellerEditProduct />} />
            <Route path="/seller/payment" element={<SellerPayment />} />
            
            {/* 404 Catch-All */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SoldOutProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
