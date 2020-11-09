import React, { useState } from "react";
import Joi from "joi";
import { toast } from "react-toastify";
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

  function signUp(e: Event) {
    e.preventDefault();

    if (!error && email) {
      fetch("/api/signup", {
        body: JSON.stringify({ email }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(res => {
          if (res.status === 201) {
            toast(
              "Dodano do listy subskrybentów 🚀. Sprawdź swoją skrzynkę - wysłaliśmy do niej list z odcinkiem specjalnym!",
              {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              },
            );
          } else {
            toast("Email już na liście subskrybentów ✉️. Do następnego listu!", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          }
        })
        .catch(() => {
          toast("Nie udało się dodać do listy subskrybentów. Spróbuj ponownie później 😔", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            type: "error",
          });
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
          <RedText>require('letter')</RedText>, odbierz list powitalny z odcinkiem specjalnym i co
          tydzień otrzymuj od nas newsletter z solidną dawką wiedzy 🔥
        </Description>
        <Form onSubmit={signUp}>
          <Input
            placeholder="Adres E-Mail..."
            aria-label="Adres E-Mail"
            autocomplete="off"
            value={email}
            onChange={e => {
              validate(e.target.value);
              setEmail(e.target.value);
            }}
            error={error}
            name="email"
          />
          <Button type="submit" value="Zapisz się" />
        </Form>
      </Column>
      <Column scrollable={true}>
        {letters.map(letter => <LetterListItem letter={letter} key={letter.slug} />).reverse()}
      </Column>
    </Container>
  );
};

export default Box;
