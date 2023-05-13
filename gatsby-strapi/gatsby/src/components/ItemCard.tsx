import React from "react";
import { CommentIcon, HeartIcon } from "./SVGs";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { useModal } from "../context/ModalContext";

interface ItemCardProps {
  MenuElement: JSX.Element;
  title: string;
  description: string;
  price: string;
}

const ItemCard = ({
  MenuElement,
  title,
  description,
  price,
}: ItemCardProps) => {
  const { setId } = useModal();
  const { getItemQuantity, increaseCartQuantity } = useShoppingCart();

  return (
    <div className="card card-compact w-[80%] md:w-[250px] h-[400px] bg-base-100 shadow-xl m-auto">
      {MenuElement}
      <div className="card-body h-1/2">
        <h2 className="card-title cursor-pointer hover:text-indigo-600">
          {title}
        </h2>
        <h3 className="font-bold text-base -mt-1 text-end">{price}</h3>
        <p>{description}</p>
        <div className="card-actions justify-between">
          <div className="like-comment-tray flex items-center">
            <div className="tooltip tooltip-bottom" data-tip="Add to favourite">
              <button className="btn btn-outline btn-primary border-0 text-sm p-1">
                <HeartIcon />
              </button>
            </div>
            <div className="tooltip tooltip-bottom" data-tip="Leave a comment">
              {/* <button className="btn btn-outline btn-primary border-0 text-sm p-1">
              </button> */}
              <label
                htmlFor="my-modal-4"
                className="btn btn-outline btn-primary border-0 text-sm p-1"
                onClick={() => setId(title)}
              >
                <CommentIcon />
              </label>
            </div>
          </div>
          <button
            className="btn btn-outline btn-primary border-0 text-xs p-1"
            onClick={() => increaseCartQuantity(title)}
          >
            {getItemQuantity(title) > 0
              ? `${getItemQuantity(title)} items, Add more`
              : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
