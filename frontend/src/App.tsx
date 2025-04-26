import { FC } from "react";
import { getApp } from "./lib/utils";
const App: FC = () => {
  const RenderApp = getApp();
  return (
    <div className="app">
      <RenderApp />
    </div>
  );
};

export default App;
