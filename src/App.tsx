import { FC } from "react";
import { Outlet } from "react-router-dom";
import { QRDataProvider } from "./components/QRDataContext";

interface AppProps {}

export const App: FC<AppProps> = () => {
  return (
    <QRDataProvider>
      <Outlet />
    </QRDataProvider>
  );
};
