import { HeadFC } from "gatsby";
import React from "react";
import Layout from "../components/Layout";

const about = () => {
  return (
    <Layout>
      <div className="font-bold text-3xl text-red-500">about</div>
    </Layout>
  );
};

export default about;

export const Head: HeadFC = () => <title>About page</title>;
