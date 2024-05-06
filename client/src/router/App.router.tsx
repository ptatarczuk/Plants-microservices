import { Route, Routes } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import PlantCards from "../pages/users_plants/UsersPlants";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import UnauthorizedRoute from "../components/UnauthorizedRoute";
import { withAxiosIntercepted } from "../hoc/withAxiosIntercepted";
import ProtectedRoute from "../components/ProtectedRoute";
import PlantCatalogue from "../pages/plant_catalogue/PlantCatalogue";
import User from "../pages/user/User";
import RedirectHandler from "../pages/redirect_handler/RedirectHandler";
import Chat from "../pages/chat/Chat";

function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Navbar />
          </ProtectedRoute>
        }
      >
        <Route index element={<PlantCards />} />
        <Route path="plants" element={<PlantCatalogue />} />
        <Route path="user" element={<User />} />
        <Route path="chat" element={<Chat />} />
      </Route>

      <Route
        path="login"
        element={
          <UnauthorizedRoute>
            <Login />
          </UnauthorizedRoute>
        }
      />
      <Route
        path="register"
        element={
          <UnauthorizedRoute>
            <Register />
          </UnauthorizedRoute>
        }
      />
      <Route path="/oauth2/redirect" element={<RedirectHandler />} />
    </Routes>
  );
}

export default withAxiosIntercepted(AppRouter);
