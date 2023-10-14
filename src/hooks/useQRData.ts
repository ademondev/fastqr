import { useContext } from "react";
import { QRDataContext } from "../components/QRDataContext";

export const useQRData = () => {
  const context = useContext(QRDataContext);
  if (!context) {
    throw new Error("useQRData must be used within a QRDataProvider");
  }
  return context;
};
