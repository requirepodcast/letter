import React, { useState } from "react";
import { Letter } from "../../core/contentful";
import {
  Container,
  Column,
  Heading,
  Description,
  RedText,
  Form,
  Input,
  Button,
} from "./Box.styles";

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
