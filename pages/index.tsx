import React from "react";
import styled from "styled-components";
import SEO from "../components/SEO";
import Box from "../components/box";
import { ContentfulService, Letter } from "../core/contentful";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url("./background.png");
  background-size: cover;
  flex-direction: column;
  background-position: center center;
  padding: 50px;

  @media (max-width: 800px) {
    padding: 20px;
  }
`;

const IndexPage: React.FC<{ letters: Letter[] }> = ({ letters }) => {
  return (
    <>
      <SEO />
      <Container>
        <Box letters={letters} />
      </Container>
    </>
  );
};

export async function getStaticProps() {
  const letters = await new ContentfulService().getAllLetters();

  return { props: { letters } };
}

export default IndexPage;
