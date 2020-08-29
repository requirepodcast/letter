import React from "react";
import styled from "styled-components";
import Link, { LinkProps } from "next/link";
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

const LetterListItem: React.FC<{ letter: Letter }> = ({ letter }) => {
  return (
    <Container>
      <Link href={"/letter/[slug]"} as={`/letter/${letter.slug}`}>
        <Title>{letter.title}</Title>
      </Link>
      <p>{trim(letter.content, 100)}</p>
    </Container>
  );
};

export default LetterListItem;
