import styled from "styled-components";

export const Container = styled.div`
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

export const Column = styled.div`
  text-align: center;
  padding: ${({ scrollable }) => (scrollable ? "40px 20px" : "20px")};
  background-color: ${({ theme, scrollable }) => scrollable && theme.bg.medium};
  display: ${({ scrollable }) => !scrollable && "flex"};
  flex-direction: ${({ scrollable }) => !scrollable && "column"};
  justify-content: ${({ scrollable }) => !scrollable && "center"};
  align-items: ${({ scrollable }) => !scrollable && "center"};

  overflow: ${({ scrollable }) => scrollable && "auto"};
`;

export const Heading = styled.h1`
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

export const Description = styled.p`
  font-weight: 300;
  color: white;
  margin-bottom: 0;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  margin-top: 1em;
  justify-content: center;
`;

export const Input = styled.input`
  background: ${({ theme }) => theme.bg.light};
  color: gray;
  outline: none;
  padding: 5px 10px;
  border-radius: 4px;
  border: none;
  color: white;
  font-family: "Fira Code", monospace;
  font-size: 12px;
  margin-right: 10px;
  box-shadow: none;
  transition: box-shadow 0.3s ease;
  appearance: none;
  --webkit-appearance: none;
  box-shadow: ${({ error }) => error && `0px 0px 0px 2px red`};

  &:focus {
    box-shadow: 0px 0px 0px 2px ${({ theme, error }) => (error ? "red" : theme.red)};
  }
`;

export const Button = styled.a`
  cursor: pointer;
  display: block;
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.bg.light};
  box-shadow: none;
  transition: box-shadow 0.3s ease;
  appearance: none;
  --webkit-appearance: none;

  &:hover {
    box-shadow: 0px 0px 0px 2px ${({ theme }) => theme.red};
  }
`;

export const RedText = styled.span`
  color: ${({ theme }) => theme.red};
`;
