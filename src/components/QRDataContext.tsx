import React, { createContext, useReducer, useEffect } from "react";

// Define the shape of a QR code
export interface QRCode {
  id: number;
  content: string;
}

// Define the shape of the context state
interface QRDataState {
  qrCodes: QRCode[];
}

// Define the actions for the reducer
type QRDataAction =
  | { type: "ADD_QR"; qrCode: QRCode }
  | { type: "DELETE_QR"; id: number }
  | { type: "LOAD_QR_CODES"; qrCodes: QRCode[] };

const initialQRData: QRDataState = {
  qrCodes: [],
};

export const QRDataContext = createContext<{
  state: QRDataState;
  addQR: (QRCodeContent: string) => void;
  deleteQR: (id: number) => void;
}>({
  state: initialQRData,
  addQR: () => {},
  deleteQR: () => {},
});

interface QRDataProviderInterface {
  children: React.ReactNode;
}

export const QRDataProvider: React.FC<QRDataProviderInterface> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(qrDataReducer, initialQRData);

  function qrDataReducer(
    state: QRDataState,
    action: QRDataAction
  ): QRDataState {
    switch (action.type) {
      case "ADD_QR": {
        const updatedQRs = [...state.qrCodes, action.qrCode];
        localStorage.setItem("qrCodes", JSON.stringify(updatedQRs));
        return { ...state, qrCodes: updatedQRs };
      }
      case "DELETE_QR": {
        const remainingQRs = state.qrCodes.filter((qr) => qr.id !== action.id);
        localStorage.setItem("qrCodes", JSON.stringify(remainingQRs));
        return { ...state, qrCodes: remainingQRs };
      }
      case "LOAD_QR_CODES":
        return { ...state, qrCodes: action.qrCodes };
      default:
        return state;
    }
  }

  function addQR(QRCodeContent: string) {
    dispatch({
      type: "ADD_QR",
      qrCode: { id: Date.now(), content: QRCodeContent.trim() },
    });
  }

  function deleteQR(id: number) {
    dispatch({ type: "DELETE_QR", id });
  }

  useEffect(() => {
    // Load QR codes from localStorage when the component mounts
    const savedQRs = JSON.parse(
      localStorage.getItem("qrCodes") || "[]"
    ) as QRCode[];
    dispatch({ type: "LOAD_QR_CODES", qrCodes: savedQRs });
  }, []);

  return (
    <QRDataContext.Provider value={{ state, addQR, deleteQR }}>
      {children}
    </QRDataContext.Provider>
  );
};
