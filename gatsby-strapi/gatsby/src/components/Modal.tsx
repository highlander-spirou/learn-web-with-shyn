import React from "react";
import { useModal } from "../context/ModalContext";
import { comments } from "../data/data";
import { Star, StarHalf, StatEmpty } from "./SVGs";
import { decimalSep } from "../utils";

type StarTrayProps = {
  wholeNum: number;
  fracNum: number;
};

const StarTray = ({ wholeNum, fracNum }: StarTrayProps) => {
  const leftOverNum = Math.floor(5 - wholeNum - fracNum);

  console.log(leftOverNum);
  const WholeStar = Array.from({ length: wholeNum }, (_, index) => {
    return <Star key={index} />;
  });

  const LeftStar = Array.from({ length: leftOverNum }, (_, index) => {
    return <StatEmpty key={index} />;
  });

  const FracStar = () => {
    if (wholeNum == 5) {
      return <></>;
    } else {
      if (fracNum === 0) {
        return <></>;
      } else if (fracNum === 0.5) {
        return <StarHalf />;
      } else {
        return <Star />;
      }
    }
  };
  return (
    <div className="flex gap-2">
      {WholeStar}
      <FracStar />
      {LeftStar}
    </div>
  );
};

const Modal = () => {
  const { contentID } = useModal();
  const rating = comments.find((x) => x.id === contentID)?.rating || 0;
  const [wholeNum, fracNum] = decimalSep(rating);
  return (
    <>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">
            Congratulations random Internet user!
          </h3>
          <p className="py-4">Rating: {rating}</p>
          <StarTray wholeNum={wholeNum} fracNum={fracNum} />
        </label>
      </label>
    </>
  );
};

export default Modal;
