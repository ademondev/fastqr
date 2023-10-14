import React, { FC } from "react";
import { Header } from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: FC<LayoutProps> = (props) => {
  return (
    <div>
      <Header />
      <main className="container mx-auto px-10">{props.children}</main>
    </div>
  );
};
