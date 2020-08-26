import styled from "styled-components";

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
`;

export default function Layout({ children }) {
	return <Container>{children}</Container>;
}
