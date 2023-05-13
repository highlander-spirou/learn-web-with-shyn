import "./src/styles/global.css";
import React from "react";

import { ShoppingCartProvider } from "./src/context/ShoppingCartContext";
import { ModalProvider } from "./src/context/ModalContext";

export const wrapRootElement = ({ element }) => (
  <ShoppingCartProvider>
    <ModalProvider>{element}</ModalProvider>
  </ShoppingCartProvider>
);
