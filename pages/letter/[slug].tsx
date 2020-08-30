import React from "react";
import styled from "styled-components";
import remark from "remark";
import html from "remark-html";
import Link from "next/link";
import { ContentfulService, Letter } from "../../core/contentful";

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const Content = styled.div`
  max-width: 800px;
  width: 100%;
  flex: 1;
  padding: 20px;
  background-color: white;
  color: black;

  a {
    color: ${({ theme }) => theme.red};
  }

  code {
    font-family: inherit;
    background-color: #eee;
    padding: 0 3px;
    color: ${({ theme }) => theme.bg.lighter};
  }
`;

const Navigation = styled.nav`
  display: flex;
  padding-top: 10px;
  width: 100%;
`;

const NavLink = styled.a<{ align: string }>`
  color: white;
  text-decoration: none;
  text-align: ${({ align }) => align};
  cursor: pointer;
  color: ${({ theme }) => theme.red};
  text-decoration: underline;
  flex: 1;
`;

const H2 = styled.h2`
  color: ${({ theme }) => theme.bg.lighter};
  padding-bottom: 10px;
  border-bottom: 2px solid ${({ theme }) => theme.bg.lighter};
`;

const LetterPage: React.FC<{ letter: Letter; next: Letter; prev: Letter }> = ({
  letter,
  next,
  prev,
}) => {
  return (
    <Wrapper>
      <Content>
        <H2>{letter.title}</H2>
        <article dangerouslySetInnerHTML={{ __html: letter.content_html }} />
      </Content>
      <Navigation>
        {prev && (
          <Link href="/letter/[slug]" as={`/letter/${prev.slug}`}>
            <NavLink align={"left"}>{"<"} Poprzedni</NavLink>
          </Link>
        )}
        {next && (
          <Link href="/letter/[slug]" as={`/letter/${next.slug}`}>
            <NavLink align={"right"}>Następny {">"}</NavLink>
          </Link>
        )}
      </Navigation>
    </Wrapper>
  );
};

export async function getStaticPaths() {
  const letters = await new ContentfulService().getAllLetters();

  return {
    paths: letters.map(letter => ({
      params: {
        slug: letter.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { letter, next, prev } = await new ContentfulService().getLetterBySlug(params.slug);

  letter.content_html = remark().use(html).processSync(letter.content).toString();

  return {
    props: {
      letter,
      next: next ? next : null,
      prev: prev ? prev : null,
    },
  };
}

export default LetterPage;
