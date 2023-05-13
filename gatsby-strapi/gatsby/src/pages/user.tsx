import { PageProps, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";

const user = ({ data }: { data: PageProps<Queries.Query> }) => {
  const imgRef = data.allFile.nodes;

  return (
    <>
      <p>User</p>
      {imgRef.map((el, index) => {
        return (
          <GatsbyImage
            key={index}
            image={getImage(el.childImageSharp.gatsbyImageData)}
          />
        );
      })}
    </>
  );
};

export const q = graphql`
  query MyQuery {
    allFile {
      nodes {
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  }
`;

export default user;
