import { FC } from "react";
import { getApp } from "./lib/utils";
import { Toaster } from "sonner";
const App: FC = () => {
  const RenderApp = getApp();
  return (
    <div className="app">
      <Toaster richColors closeButton />
      <RenderApp />
    </div>
  );
};

export default App;
