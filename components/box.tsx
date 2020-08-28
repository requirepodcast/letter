import React, { useState } from "react";
import styled from "styled-components";
import { Letter } from "../core/contentful";

const Container = styled.div`
  border-radius: 6px;
  border: 1px solid white;
  background-color: ${({ theme }) => theme.bg.dark};
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 1000px;
  width: 100%;
  height: 100%;
  overflow: hidden;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    border: none;
  }
`;

const Column = styled.div`
  text-align: center;
  padding: 20px;
  background-color: ${({ theme, scrollable }) => scrollable && theme.bg.medium};
  display: ${({ scrollable }) => !scrollable && "flex"};
  flex-direction: ${({ scrollable }) => !scrollable && "column"};
  justify-content: ${({ scrollable }) => !scrollable && "center"};
  align-items: ${({ scrollable }) => !scrollable && "center"};

  overflow: ${({ scrollable }) => scrollable && "auto"};
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

const Box: React.FC<{ letters: Letter[] }> = ({ letters }) => {
  const [email, setEmail] = useState("");

  function signUp() {
    fetch("/api/signup", {
      body: JSON.stringify({ email }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        alert("Signed up");
      })
      .catch(err => {
        console.log(err);
      });

    setEmail("");
  }

  return (
    <Container>
      <Column>
        <Heading>Require Letter</Heading>
        <Description>
          Zapisz się do <RedText>require('letter')</RedText>, by co tydzień otrzymywać list ze
          świeżą dawką wiedzy o JavaScripcie i nie tylko 🔥
        </Description>
        <Form>
          <Input
            placeholder="Adres E-Mail..."
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Button onClick={signUp}>Zapisz się</Button>
        </Form>
      </Column>
      <Column scrollable={true}>
        {letters.map(letter => (
          <>
            <p key={letter.slug}>{letter.title}</p>
          </>
        ))}
      </Column>
    </Container>
  );
};

export default Box;
