import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/home";
import SignInPage from "./pages/signin";
import SignUpPage from "./pages/signup";
import Dashboard from "./pages/dashboard-moniter";
import PrivateRoute from "./pages/privateRoute";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route>
          <Route path="/dashboard/moniters" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
