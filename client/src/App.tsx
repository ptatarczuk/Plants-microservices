import { ToastContainer } from "react-toastify";
import { AppContainer } from "./router/App.styles";
import { UserContextProvider } from "./context/UserContext";
import AppRouter from "./router/App.router";

window.onbeforeunload = function () {
  localStorage.clear();
};

function App() {
  return (
    <AppContainer>
      <UserContextProvider>
        <AppRouter />
        <ToastContainer />
      </UserContextProvider>
    </AppContainer>
  );
}

export default App;
