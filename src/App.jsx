import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import ProductsPage from "./pages/productsPage";
import HistoryPage from "./pages/HistoryPage";
import Login from "./pages/Login";
import PrivateRoute from "./components/Route/PrivateRoute";
import GuestRoutes from "./components/Route/GuestRoutes";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRoute />}>
          <Route path="/list" element={<ProductsPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Route>
        <Route element={<GuestRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}
