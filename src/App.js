import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import { SearchProvider } from "./context/search";
import Main from "./components/nav/Main";
import { Toaster } from "react-hot-toast";
import AccountActivate from "./pages/auth/AccountActivate";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AccessAccount from "./pages/auth/AccessAccount";
import Dashboard from "./pages/user/Dashboard";
import AdCreate from "./pages/user/ad/AdCreate";
import PrivateRoute from "./components/routes/PrivateRoute";
import SellHouse from "./pages/user/ad/SellHouse";
import SellLand from "./pages/user/ad/SellLand";
import AdEdit from "./pages/user/ad/AdEdit";
import Buy from "./pages/Buy";
import Rent from "./pages/Rent";

import RentHouse from "./pages/user/ad/RentHouse";
import Settings from "./pages/user/Settings";

import RentLand from "./pages/user/ad/RentLand";
import AdView from "./pages/AdView";
import Footer from "./components/nav/Footer";
import Profile from "./pages/user/Profile";
import Enquiries from "./pages/user/Enquiries";
import Wishlist from "./pages/user/Wishlist";
import Agents from "./pages/Agents";
import Agent from "./pages/Agent";
import Search from "./pages/Search";

const PageNotFound = () => {
  return <div className="text-center p-5">404 Page Not Found</div>;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SearchProvider>
          <Main />
          <Toaster />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/register" exact element={<Register />} />
            <Route path="/" element={<PrivateRoute />}>
              <Route path="dashboard" exact element={<Dashboard />} />
              <Route path="ad/create" exact element={<AdCreate />} />
              <Route path="ad/create/sell/house" element={<SellHouse />} />
              <Route path="ad/create/sell/land" element={<SellLand />} />
              <Route path="ad/create/rent/house" element={<RentHouse />} />
              <Route path="ad/create/rent/land" element={<RentLand />} />
              <Route path="user/profile" element={<Profile />} />
              <Route path="user/settings" element={<Settings />} />
              <Route path="user/wishlist" element={<Wishlist />} />

              <Route path="user/enquiries" element={<Enquiries />} />

              <Route path="user/ad/:slug" element={<AdEdit />} />
            </Route>
            <Route path="/ad/:slug" element={<AdView />} />
            <Route
              path="/auth/account-activate/:token"
              exact
              element={<AccountActivate />}
            />
            <Route
              path="/auth/forgot-password"
              exact
              element={<ForgotPassword />}
            />
            <Route
              path="/auth/access-account/:token"
              exact
              element={<AccessAccount />}
            />
            <Route path="/agents" element={<Agents />} />
            <Route path="/buy" element={<Buy />} />

            <Route path="/rent" element={<Rent />} />
            <Route path="/search" element={<Search />} />

            <Route path="/agent/:username" element={<Agent />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />
        </SearchProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
