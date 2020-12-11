import React from "react";
import styled from "styled-components";
import remark from "remark";
import html from "remark-html";
import Link from "next/link";
import { ContentfulService, Letter } from "../../core/contentful";
import SEO from "../../components/SEO";

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
  overflow: hidden;
  word-wrap: break-word;
  flex: 1;
  background-color: white;
  color: black;
  padding: 10px;
  font-family: "Fira Sans", sans-serif;

  a {
    color: ${({ theme }) => theme.red};
  }

  code {
    font-family: "Fira Code", monospace;
    background-color: #eee;
    color: ${({ theme }) => theme.bg.lighter};
  }

  pre {
    code {
      display: block;
      overflow: auto;
      padding: 5px;
      font-size: 0.8em;
    }
  }
`;

const Navigation = styled.nav`
  display: flex;
  padding-top: 10px;
  width: 100%;
`;

const LinkContainer = styled.div<{ align: string }>`
  flex: 1;
  text-align: ${({ align }) => align};
`;

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.red};
  text-decoration: underline;
`;

const H1 = styled.h1`
  color: ${({ theme }) => theme.red};
  text-align: center;
  font-size: 20px;
`;

const LetterPage: React.FC<{ letter: Letter; next: Letter; prev: Letter }> = ({
  letter,
  next,
  prev,
}) => {
  return (
    <>
      <SEO title={letter.title} />
      <Wrapper>
        <H1>{letter.title}</H1>
        <Content>
          <article dangerouslySetInnerHTML={{ __html: letter.contentHtml }} />
        </Content>
        <Navigation>
          {prev && (
            <LinkContainer align="left">
              <Link href="/letter/[slug]" as={`/letter/${prev.slug}`}>
                <NavLink href={`/letter/${prev.slug}`}>{"<"} Poprzedni</NavLink>
              </Link>
            </LinkContainer>
          )}
          {next && (
            <LinkContainer align="right">
              <Link href="/letter/[slug]" as={`/letter/${next.slug}`}>
                <NavLink href={`/letter/${next.slug}`}>Następny {">"}</NavLink>
              </Link>
            </LinkContainer>
          )}
        </Navigation>
      </Wrapper>
    </>
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
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { letter, next, prev } = await new ContentfulService().getLetterBySlug(params.slug);

  letter.contentHtml = remark().use(html).processSync(letter.content).toString();

  return {
    props: {
      letter,
      next: next ? next : null,
      prev: prev ? prev : null,
    },
  };
}

export default LetterPage;
