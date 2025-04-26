import { FC } from "react";
import { Route, Routes } from "react-router";
import NotFound from "./components/ui/not-found";
import StatusPage from "./pages/status-page";
const StatusPageApp: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<StatusPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default StatusPageApp;
