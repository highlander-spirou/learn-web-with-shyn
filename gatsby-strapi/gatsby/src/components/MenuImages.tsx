import React from "react";

type imageSize = "small" | "medium" | "big";
type MenuImageProps = {
  imageName: string;
  size: imageSize;
};
const MenuImage = ({ imageName, size }: MenuImageProps) => {
  const imageSize = {
    small: { width: "100px", height: "100px" },
    medium: { width: "200px", height: "200px" },
    big: { width: "100%", height: "100%" },
  };
  return (
    <figure className="h-1/2">
      <img src={`/images/${imageName}`} style={imageSize[size]} className="object-cover"/>
    </figure>
  );
};

export default MenuImage;
