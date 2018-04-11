import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { Form, Message } from "semantic-ui-react";

const regex = new RegExp("^[a-zA-Z0-9 ]+$");

class Filter extends PureComponent {
	static propTypes = {
		onSubmitFilter: PropTypes.func.isRequired,
		filter: PropTypes.string.isRequired,
		totalCount: PropTypes.number.isRequired
	};

	state = {
		filter: "",
		filterValid: true
	};

	constructor() {
		super();

		this.handleOnChange = this.handleOnChange.bind(this);
	}

	handleOnChange(event, { name, value }) {
		if (value !== "" && !regex.test(value)) {
			this.setState({ [name]: value, filterValid: false });
		} else {
			this.setState({ [name]: value, filterValid: true });

			this.props.onSubmitFilter(value);
		}
	}

	render() {
		const { filter } = this.state;

		return (
			<Fragment>
				<Message
					attached
					style={{ marginTop: 39 }}
					header="Filter"
					content="Filter table rows by name and email and phone and address with contains string."
				/>
				<Form className="attached fluid segment">
					<Form.Group>
						<Form.Field>
							<Form.Input
								placeholder="Enter the filter."
								name="filter"
								value={filter}
								error={!this.state.filterValid}
								onChange={this.handleOnChange}
								icon="search"
								loading={this.props.loading}
							/>
						</Form.Field>
					</Form.Group>
				</Form>
			</Fragment>
		);
	}
}

export default Filter;
