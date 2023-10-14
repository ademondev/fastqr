import { FC } from "react";
import { QRCode } from "../QRDataContext";
import { QRCodeSVG } from "qrcode.react";
// @ts-expect-error the ts definitions for this package are not well made though its simple and safe to use (trust me bro)
import { saveSvgAsPng } from "save-svg-as-png";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";

interface SavedQRProps {
  qrCode: QRCode;
  onDelete: () => void;
}

export const SavedQR: FC<SavedQRProps> = ({ qrCode, onDelete }) => {
  const downloadSVG = () => {
    saveSvgAsPng(
      document.getElementById(`svgimage-${qrCode.id}`),
      "myqrcode.png",
      {
        scale: 50,
      }
    );
  };
  return (
    <div className="max-w-[20rem] w-[100%]">
      <div className="flex justify-start items-center p-2 gap-3">
        <div className="relative">
          <QRCodeSVG
            value={qrCode.content}
            height={"5rem"}
            width={"5rem"}
            id={`svgimage-${qrCode.id}`}
          />

          <div
            className="absolute top-0 left-0 opacity-0 scale-110 hover:opacity-60 transition bg-black bg-opacity-80 text-white rounded-md w-full h-full border-2 border-slate-600 border-spacing-5 flex items-center justify-center cursor-pointer"
            onClick={downloadSVG}
          >
            <AiOutlineCloudDownload size={50} />
          </div>
        </div>
        <div className="flex flex-col justify-start">
          <span className="font-extrabold">Content:</span>
          <span className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
            {qrCode.content}
          </span>
          <button
            className="p-0 w-6 flex justify-center items-center"
            onClick={onDelete}
          >
            <BiTrash size={20} />
          </button>
        </div>
      </div>
      <div className="border-t border-gray-300 my-4 max-w-xs mx-auto" />
    </div>
  );
};
