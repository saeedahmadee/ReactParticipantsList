import React, { PureComponent } from "react";
import { Container, Header, Icon } from "semantic-ui-react";

import List from "./components/list";

class App extends PureComponent {
	render() {
		return (
			<Container style={{ padding: "2em 0em" }}>
				<Header as="h2" icon textAlign="center">
					<Icon name="users" circular />
					<Header.Content>React Participants List</Header.Content>
				</Header>

				<List />
			</Container>
		);
	}
}

export default App;
