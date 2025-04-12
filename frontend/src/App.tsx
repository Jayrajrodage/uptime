import { Route, Routes } from "react-router";
import Home from "./pages/home";
import SignInPage from "./pages/signin";
import SignUpPage from "./pages/signup";
import DashboardMoniter from "./pages/dashboard-moniter";
import PrivateRoute from "./pages/privateRoute";
import DashboardIncidents from "./pages/dashboard-incidents";
import DashboardStatusPage from "./pages/dashboard-status-page";
import DashboardNotifications from "./pages/dashboard-notifications";
import DashboardSettings from "./pages/dashboard-settings";
import MoniterDetails from "./components/dashboard/moniter/moniter-details";
import NotificationDetails from "./components/dashboard/notification/notification-details";
import PaymentSuccess from "./components/dashboard/settings/payment-succes";
import { Toaster } from "sonner";
import StatusPageDetails from "./components/dashboard/status-page/status-page-details";
function App() {
  return (
    <>
      <Toaster richColors closeButton />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard/moniters" element={<DashboardMoniter />} />
          <Route path="/dashboard/incidents" element={<DashboardIncidents />} />
          <Route
            path="/dashboard/status-pages"
            element={<DashboardStatusPage />}
          />
          <Route
            path="/dashboard/notifications"
            element={<DashboardNotifications />}
          />
          <Route
            path="/dashboard/settings/:section"
            element={<DashboardSettings />}
          />
          <Route
            path="/dashboard/payment-success"
            element={<PaymentSuccess />}
          />
          <Route
            path="/dashboard/moniters/details/:section"
            element={<MoniterDetails />}
          />
          <Route
            path="/dashboard/notifications/channel/details/:id"
            element={<NotificationDetails />}
          />
          <Route
            path="/dashboard/status-pages/details/:id"
            element={<StatusPageDetails />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
