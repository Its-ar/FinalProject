import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import ProductsPage from "./pages/productsPage";
import HistoryPage from "./pages/HistoryPage";
import Login from "./pages/login";
import GuestRoute from "./components/Route/GuestRoutes";
import PrivateRoute from "./components/Route/PrivateRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRoute/>}>
          <Route path="/list" element={<ProductsPage />} />
          <Route path="/history" element={<HistoryPage />}/>
        </Route>
        <Route element={<GuestRoute/>}>
          <Route path="/login" element={<Login />} />
        </Route>  
      </Routes>
    </Router>
  );
}
