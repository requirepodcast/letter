import React from "react";
import styled from "styled-components";

const Container = styled.div`
  border-radius: 6px;
  padding: 1em;
  border: 1px solid white;
  display: flex;
  background: #0f111a;
`;

const Column = styled.div`
  flex-direction: column;
  flex: 1;
  width: 20em;
  padding: 1em;
`;

const Heading = styled.h1`
  color: rgb(255, 83, 112);
  font-weight: 800;
  margin-top: 0;

  &:after {
    content: "";
    display: block;
    width: 33.3%;
    height: 2px;
    background: white;
    margin: 0.25em 0 0.25em 2px;
    float: left;
  }
`;

const Description = styled.p`
  font-weight: 300;
  color: #cccccc;
  margin-bottom: 0;
`;

const SignUp = styled.div`
  width: 100%;
  display: flex;
  margin-top: 1em;
  justify-content: space-between;
`;

const Input = styled.input`
  background: #ffffff22;
  padding: 0.2em;
  border-radius: 4px;
  border: none;
  color: white;
  font-family: "Fira Code", monospace;
`;

const Button = styled.a`
  cursor: pointer;
  display: block;
  font-size: 16px;
  padding: 2px 4px;
  border-width: 2px;
  border-style: solid;
  border-color: rgb(255, 83, 112);
  border-radius: 4px;
  transition: background 0.2s ease;

  &:hover {
    background: rgb(255, 83, 112);
  }
`;

export default function Box() {
  return (
    <Container>
      <Column>
        <Heading>Require Letter</Heading>
        <Description>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia, totam?
        </Description>
        <SignUp>
          <Input placeholder="Adres E-Mail..." />
          <Button>Opt-in</Button>
        </SignUp>
      </Column>
      <Column>tutaj będą poprzednie listy :)</Column>
    </Container>
  );
}
