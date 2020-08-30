import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { format } from "light-date";
import { Letter } from "../core/contentful";
import { trim } from "../utils/trim";

const Container = styled.div`
  text-align: left;
`;

const Title = styled.a`
  font-size: 1.5em;
  font-weight: bold;
  color: ${({ theme }) => theme.red};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const LetterDate = styled.span`
  font-size: 12px;
  color: grey;
`;

const LetterListItem: React.FC<{ letter: Letter }> = ({ letter }) => {
  return (
    <Container>
      <Link href={"/letter/[slug]"} as={`/letter/${letter.slug}`}>
        <Title>{letter.title}</Title>
      </Link>
      <LetterDate>{" " + format(new Date(letter.sendAt), "{dd}-{MM}-{yyyy}")}</LetterDate>
      <p>{trim(letter.content, 100)}</p>
    </Container>
  );
};

export default LetterListItem;
