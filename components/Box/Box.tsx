import React, { useState } from "react";
import Joi from "joi";
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
import LetterListItem from "../LetterListItem";

const Box: React.FC<{ letters: Letter[] }> = ({ letters }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function signUp() {
    if (!error) {
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
  }

  function validate(s) {
    if (s === "") return setError("");

    const result = Joi.string()
      .email({ tlds: { allow: false } })
      .validate(s);

    if (result.error) {
      return setError(result.error.message);
    }

    return setError("");
  }

  return (
    <Container>
      <Column>
        <Heading>Require Letter</Heading>
        <Description>
          Nie zostań w tyle, wiedz więcej i bądź na bieżąco w świecie JavaScriptu - zapisz się do{" "}
          <RedText>require('letter')</RedText> i co tydzień otrzymuj od nas list z solidną dawką
          wiedzy!
        </Description>
        <Form>
          <Input
            placeholder="Adres E-Mail..."
            value={email}
            onChange={e => {
              validate(e.target.value);
              setEmail(e.target.value);
            }}
            error={error}
          />
          <Button onClick={signUp}>Zapisz się</Button>
        </Form>
      </Column>
      <Column scrollable={true}>
        {letters.map(letter => <LetterListItem letter={letter} key={letter.slug} />).reverse()}
      </Column>
    </Container>
  );
};

export default Box;
