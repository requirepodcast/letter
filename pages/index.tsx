import React from "react";
import styled from "styled-components";
import SEO from "../components/SEO";
import Box from "../components/box";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url("./background.png");
  background-size: cover;
  flex-direction: column;
  background-position: center center;
  padding: 20px;
`;

const IndexPage: React.FC = () => {
  return (
    <>
      <SEO />
      <Container>
        <Box />
      </Container>
    </>
  );
};

export default IndexPage;
