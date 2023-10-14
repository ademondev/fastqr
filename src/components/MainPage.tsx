import React, { FC, useCallback } from "react";
import { Layout } from "./layout/Layout";
import { QRCodeSVG } from "qrcode.react";
// @ts-expect-error the ts definitions for this package are not well made though its simple and safe to use (trust me bro)
import { saveSvgAsPng } from "save-svg-as-png";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { useQRData } from "../hooks/useQRData";
import { LuSaveAll } from "react-icons/lu";
import { BsCheck2Circle } from "react-icons/bs";

interface MainPageProps {}

export const MainPage: FC<MainPageProps> = () => {
  const [text, setText] = React.useState("https://www.google.com");
  const [clicked, setClicked] = React.useState(false);
  const { addQR } = useQRData();

  const downloadSVG = useCallback(() => {
    saveSvgAsPng(document.getElementById("svgimage"), "myqrcode.png", {
      scale: 50,
    });
  }, []);

  React.useEffect(() => {
    setClicked(false);
  }, [text]);

  return (
    <Layout>
      <div className="flex justify-center items-center h-[calc(100dvh)]">
        <div className="flex flex-col justify-center items-center w-full gap-4">
          <div className="relative">
            <QRCodeSVG
              value={text}
              height={"10rem"}
              width={"10rem"}
              id="svgimage"
            />
            <div
              className="absolute top-0 left-0 opacity-0 scale-110 hover:opacity-60 transition bg-black bg-opacity-80 text-white rounded-md w-full h-full border-2 border-slate-600 border-spacing-5 flex items-center justify-center cursor-pointer"
              onClick={downloadSVG}
            >
              <AiOutlineCloudDownload size={50} />
            </div>
          </div>
          <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-3">
            <input
              type="text"
              onChange={(e) => setText(e.target.value)}
              value={text}
              className="flex border-2 h-10 w-[90%] max-w-3xl rounded-md ring-slate-800 border-input transition-shadow duration-200 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter text"
            />
            <button
              className={`${
                clicked ? "bg-green-400" : ""
              } transition-colors duration-200 ease-in-out `}
              onClick={() => {
                if (clicked) return;
                addQR(text);
                setClicked(true);
              }}
            >
              {clicked ? (
                <BsCheck2Circle size={22} color="white" />
              ) : (
                <LuSaveAll size={20} color="black" />
              )}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};
