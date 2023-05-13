import React, { ReactNode, createContext, useContext, useState } from "react";

type CartItem = {
  id: string | number;
  quantity: number;
};

type ShoppingCartActions = {
  getItemQuantity: (id: number | string) => number;
  increaseCartQuantity: (id: number | string) => void;
  decreaseCartQuantity: (id: number | string) => void;
  removeFromCart: (id: number | string) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

const ShoppingCartContext = createContext({} as ShoppingCartActions);

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

export const ShoppingCartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  function getItemQuantity(id: number | string) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id: number | string) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        //? if no id find in cart, append it with quantity == 1
        return [...currItems, { id: id, quantity: 1 }];
      } else {
        return currItems.map((x) => {
          if (x.id === id) {
            return { ...x, quantity: x.quantity + 1 };
          } else {
            return x;
          }
        });
      }
    });
  }
  function decreaseCartQuantity(id: number | string) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        //? if id find in cart == 1, decrease will remove it from cart
        return currItems.filter((x) => x.id !== id);
      } else {
        return currItems.map((x) => {
          if (x.id === id) {
            return { ...x, quantity: x.quantity - 1 };
          } else {
            return x;
          }
        });
      }
    });
  }

  function removeFromCart(id: number | string) {
    setCartItems((currItem) => {
      return currItem.filter((x) => x.id !== id);
    });
  }

  const cartQuantity = cartItems.reduce((currentValue, iteratorObject) => {
    return currentValue + iteratorObject.quantity;
  }, 0);

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartQuantity,
        cartItems
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
