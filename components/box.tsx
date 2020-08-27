import React from "react";
import styled from "styled-components";

const Container = styled.div`
  border-radius: 6px;
  border: 1px solid white;
  background-color: ${({ theme }) => theme.bg.dark};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  max-width: 1000px;
  width: 100%;
  height: 100%;
`;

const Column = styled.div`
  text-align: center;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Heading = styled.h1`
  color: ${({ theme }) => theme.red};
  font-weight: 800;
  margin: 0 0 10px 0;
  position: relative;
  display: inline-block;

  &:after {
    content: "";
    display: block;
    position: absolute;
    width: 50%;
    height: 2px;
    background-color: white;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const Description = styled.p`
  font-weight: 300;
  color: white;
  margin-bottom: 0;
`;

const Form = styled.div`
  width: 100%;
  display: flex;
  margin-top: 1em;
  justify-content: center;
`;

const Input = styled.input`
  background: ${({ theme }) => theme.bg.light};
  color: gray;
  outline: none;
  padding: 5px;
  border-radius: 4px;
  border: none;
  color: white;
  font-family: "Fira Code", monospace;
  font-size: 12px;
  margin-right: 10px;
  box-shadow: none;
  transition: box-shadow 0.3s ease;

  &:focus {
    box-shadow: 0px 0px 0px 2px ${({ theme }) => theme.red};
  }
`;

const Button = styled.a`
  cursor: pointer;
  display: block;
  font-size: 12px;
  padding: 5px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.bg.light};
  box-shadow: none;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0px 0px 0px 2px ${({ theme }) => theme.red};
  }
`;

const RedText = styled.span`
  color: ${({ theme }) => theme.red};
`;

const Box: React.FC = () => {
  return (
    <Container>
      <Column>
        <Heading>Require Letter</Heading>
        <Description>
          Zapisz się do <RedText>require('letter')</RedText>, by co tydzień otrzymywać list ze
          świeżą dawką wiedzy o JavaScripcie i nie tylko 🔥
        </Description>
        <Form>
          <Input placeholder="Adres E-Mail..." />
          <Button>Zapisz się</Button>
        </Form>
      </Column>
      <Column>tutaj będą poprzednie listy {":)"}</Column>
    </Container>
  );
};

export default Box;
