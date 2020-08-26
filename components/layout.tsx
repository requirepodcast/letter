import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Layout: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Layout;
