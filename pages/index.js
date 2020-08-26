import styled from "styled-components";
import Layout from "../components/layout";
import SEO from "../components/SEO";
import Box from "../components/box";

const Container = styled.div`
	background-image: url("./background.png");
	background-size: contain;
	flex-direction: column;
	background-position: center center;
`;

export default function Home() {
	return (
		<Container>
			<Layout>
				<SEO />
				<Box />
			</Layout>
		</Container>
	);
}
