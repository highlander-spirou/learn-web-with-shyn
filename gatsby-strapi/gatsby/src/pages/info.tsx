import React from "react";
import ItemCard from "../components/ItemCard";
import Layout from "../components/Layout";
import MenuImage from "../components/MenuImages";
import { VND } from "../utils";
import { data } from "../data/data";

const Info = () => {
  console.log(data);
  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-5 ml-3">
        {data.map((x, index) => {
          return (
            <ItemCard
              key={index}
              MenuElement={<MenuImage imageName={x.image} size="big" />}
              title={x.id}
              price={VND.format(x.price)}
              description="Egg and rice, what more to ask"
            />
          );
        })}
      </div>
    </Layout>
  );
};

export default Info;
