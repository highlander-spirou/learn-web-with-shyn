import React from "react";
import Sidebar from "./Sidebar";
import RightDrawerLayout from "./RightDrawerLayout";
import NavBar from "./NavBar";
import Modal from "./Modal";

interface LayoutProps {
  children: JSX.Element;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Modal />
      <Sidebar>
        <>
          <NavBar />
          <RightDrawerLayout children={children} />
        </>
      </Sidebar>
    </>
  );
};

export default Layout;
