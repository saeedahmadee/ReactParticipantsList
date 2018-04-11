import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { Form, Segment, Message } from "semantic-ui-react";

import validator from "validator";

export default class AddNewUser extends PureComponent {
	static propTypes = {
		onSendUser: PropTypes.func.isRequired
	};

	state = {
		name: "",
		email: "",
		phoneNumber: "",
		address: "",
		notValid: {
			name: false,
			email: false,
			address: false,
			phoneNumber: false
		}
	};

	handleChange = (e, { name, value }) => this.setState({ [name]: value });

	handleSubmit = () => {
		let { email, name, phoneNumber, address, notValid } = this.state;

		if (validator.isEmpty(name)) {
			notValid.name = true;
		} else {
			notValid.name = false;
		}
		if (!validator.isEmail(email)) {
			notValid.email = true;
		} else {
			notValid.email = false;
		}
		if (phoneNumber.length !== 11) {
			notValid.phoneNumber = true;
		} else {
			notValid.phoneNumber = false;
		}
		if (validator.isEmpty(address)) {
			notValid.address = true;
		} else {
			notValid.address = false;
		}

		let validAll = Object.values(notValid).filter(notValid => notValid === true).length;
		if (validAll !== 0) {
			this.setState({
				notValid: {
					...notValid
				}
			});
		} else {
			this.setState(
				{
					name: "",
					email: "",
					phoneNumber: "",
					address: "",
					notValid: {
						name: false,
						email: false,
						address: false,
						phoneNumber: false
					}
				},
				() => {
					this.props.onSendUser({
						name,
						email,
						phoneNumber,
						address
					});
				}
			);
		}
	};

	render() {
		const { name, email, phoneNumber, address, notValid } = this.state;
		return (
			<Fragment>
				<Message attached header="Add a new participant" content="Fill out the form below to generate a new participant" />
				<Segment raised attached>
					<Form onSubmit={this.handleSubmit}>
						<Form.Group>
							<Form.Input
								placeholder="Name"
								name="name"
								value={name}
								error={notValid.name}
								onChange={this.handleChange}
							/>
							<Form.Input
								placeholder="Email"
								name="email"
								value={email}
								error={notValid.email}
								onChange={this.handleChange}
							/>
							<Form.Input
								placeholder="Phone Number"
								name="phoneNumber"
								value={phoneNumber}
								error={notValid.phoneNumber}
								onChange={this.handleChange}
							/>
							<Form.Input
								placeholder="Address"
								name="address"
								value={address}
								error={notValid.address}
								onChange={this.handleChange}
							/>
							<Form.Button content="Submit" />
						</Form.Group>
					</Form>
				</Segment>
			</Fragment>
		);
	}
}
