import { assets } from "@/Assets/assets";

import Image from "next/image";
import Sidebar from "../AdminComponents/Sidebar";
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

export default function Layout({ children }) {
  return (
    <>
      <div className="flex">
        <ToastContainer theme="Dark"/>
      <Sidebar/>
        <div className="flex flex-col w-full">
          <div className="flex item-center justify-between w-full py-3 h-[75px] px-12 border-b border-black">
            <h3 className="font-medium py-4  mb-1"> Admin Panel</h3>
            <Image src={assets.profile_icon} width={40} alt="" />
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
