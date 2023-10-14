import { FC } from "react";
import { Layout } from "./layout/Layout";
import { useQRData } from "../hooks/useQRData";
import { SavedQR } from "./app/SavedQR";

interface SavedQRSProps {}

export const SavedQRS: FC<SavedQRSProps> = () => {
  const { state, deleteQR } = useQRData();
  return (
    <Layout>
      <div className="flex flex-col h-[calc(100dvh)] pt-[5rem] items-center">
        {state.qrCodes.map((qr) => (
          <SavedQR qrCode={qr} onDelete={() => deleteQR(qr.id)} key={qr.id} />
        ))}
      </div>
    </Layout>
  );
};
