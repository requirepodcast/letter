import styled from "styled-components";

const Container = styled.div`
	box-shadow: 0 0 4px rgba(255, 255, 255, 0.3),
		0 1px 5px rgba(255, 256, 256, 0.5);
	border-radius: 6px;
	padding: 1em;
	border: 1px solid white;
	display: flex;
	background: #0f111a;
`;

const Column = styled.div`
	flex-direction: column;
	flex: 1;
	width: 20em;
	padding: 1em;
`;

const Heading = styled.h1`
	color: rgb(255, 83, 112);
	font-weight: 800;
	margin-top: 0;
	&:after {
		content: "";
		display: block;
		width: 33.3%;
		height: 2px;
		background: white;
		box-shadow: 0 0 1px rgba(255, 255, 255, 0.7), 0 1px 2px rgba(255, 256, 256);
		margin: 0.25em 0 0.25em 2px;
		float: left;
	}
`;

const Description = styled.p`
	font-weight: 300;
	color: #cccccc;
	margin-bottom: 0;
`;

export default function Box() {
	return (
		<Container>
			<Column>
				<Heading>Require Letter</Heading>
				<Description>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit,
					laudantium reiciendis officia cupiditate accusamus, exercitationem
					autem quidem explicabo similique libero culpa! Dolores ut ipsum minus!
				</Description>
			</Column>
			<Column>tutaj będą poprzednie listy :)</Column>
		</Container>
	);
}
