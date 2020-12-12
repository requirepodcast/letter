import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { format } from "light-date";
import { Letter } from "../integrations/contentful";
import { trim } from "../utils/trim";

const Container = styled.div`
  text-align: left;
  color: #ffffff;
`;

const Title = styled.a`
  font-size: 1.5em;
  font-weight: bold;
  color: ${({ theme }) => theme.red};
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const LetterDate = styled.span`
  font-size: 12px;
  color: grey;
  white-space: nowrap;
`;

const LetterListItem: React.FC<{ letter: Letter }> = ({ letter }) => {
  return (
    <Container>
      <Link href={"/letter/[slug]"} as={`/letter/${letter.slug}`}>
        <Title href={`/letter/${letter.slug}`}>{letter.title}</Title>
      </Link>
      <LetterDate>{" " + format(new Date(letter.sendAt), "{dd}-{MM}-{yyyy}")}</LetterDate>
      <p>{trim(letter.content, 100)}</p>
    </Container>
  );
};

export default LetterListItem;
