import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { FC } from "react";
import { AiOutlineQrcode } from "react-icons/ai";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";

interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-white p-4 lg:px-10 md:px-5 flex justify-between items-center mx-auto w-full">
      <div className="flex justify-center items-center gap-3">
        <AiOutlineQrcode size={40} />
        <span className="font-bold text-xl">Fast QR</span>
      </div>
      <nav className="space-x-4">
        <ul className="gap-6 text-black hidden sm:flex">
          <li>
            <Link to="/app" className="text-black hover:text-gray-400">
              Home
            </Link>
          </li>
          <li>
            <Link to="/savedqrs" className="text-black hover:text-gray-400">
              Saved QRS
            </Link>
          </li>
        </ul>
        <div className="sm:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <RxHamburgerMenu size={20} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link to="/app" className="p-2 bg-white font-semibold">
                  Home
                </Link>
              </DropdownMenuItem>
              <div className="p-2" />
              <DropdownMenuItem>
                <Link to="/savedqrs" className="p-2 bg-white font-semibold">
                  Saved QRS
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
};
