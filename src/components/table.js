import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { Button, Table, Dropdown, Label } from "semantic-ui-react";

import dropdownOptions from "./dropdownOptions";
import Pagination from "./pagination";

class DisplayRow extends PureComponent {
	static propTypes = {
		tableRow: PropTypes.object.isRequired,
		deleteUser: PropTypes.func.isRequired
	};

	deleteUser = this.deleteUser.bind(this);

	deleteUser() {
		this.props.deleteUser(this.props.tableRow);
	}

	render() {
		return (
			<Table.Row>
				<Table.Cell>{this.props.tableRow._id}</Table.Cell>
				<Table.Cell>{this.props.tableRow.name}</Table.Cell>
				<Table.Cell>{this.props.tableRow.email}</Table.Cell>
				<Table.Cell>{this.props.tableRow.phoneNumber}</Table.Cell>
				<Table.Cell>{this.props.tableRow.address}</Table.Cell>
				<Table.Cell textAlign="center">
					<Button negative circular icon="trash outline" onClick={this.deleteUser} />
				</Table.Cell>
			</Table.Row>
		);
	}
}

export default function tableRows(props) {
	const displayRows = props.tableRows.map(tableRow => (
		<DisplayRow key={tableRow._id} tableRow={tableRow} deleteUser={props.deleteUser} />
	));

	return (
		<Fragment>
			<Label color="blue">
				Records per page:
				<Label.Detail>
					<Dropdown
						inline
						options={dropdownOptions.limitOptions}
						defaultValue={props.limit}
						onChange={props.onChangeLimit}
					/>
				</Label.Detail>
			</Label>
			<Label color="olive">
				Total count:
				<Label.Detail>{props.totalCount}</Label.Detail>
			</Label>
			<Table celled striped selectable sortable>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell
							width={1}
							sorted={props.column === "_id" ? props.direction : null}
							onClick={() => props.handleSort("_id")}
						>
							#
						</Table.HeaderCell>
						<Table.HeaderCell
							width={2}
							sorted={props.column === "name" ? props.direction : null}
							onClick={() => props.handleSort("name")}
						>
							Name
						</Table.HeaderCell>
						<Table.HeaderCell
							width={2}
							sorted={props.column === "email" ? props.direction : null}
							onClick={() => props.handleSort("email")}
						>
							Email
						</Table.HeaderCell>
						<Table.HeaderCell
							width={1}
							sorted={props.column === "phoneNumber" ? props.direction : null}
							onClick={() => props.handleSort("phoneNumber")}
						>
							Phone Number
						</Table.HeaderCell>
						<Table.HeaderCell
							width={3}
							sorted={props.column === "address" ? props.direction : null}
							onClick={() => props.handleSort("address")}
						>
							Address
						</Table.HeaderCell>
						<Table.HeaderCell width={1}>Action</Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>{displayRows}</Table.Body>

				<Table.Footer>
					<Pagination
						totalPages={props.totalPages}
						currentPage={props.currentPage}
						onChangePage={props.onChangePage}
					/>
				</Table.Footer>
			</Table>
		</Fragment>
	);
}

tableRows.propTypes = {
	tableRows: PropTypes.array.isRequired,
	totalCount: PropTypes.number.isRequired,
	totalPages: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	onChangePage: PropTypes.func.isRequired,
	deleteUser: PropTypes.func.isRequired,
	onChangeLimit: PropTypes.func.isRequired,
	limit: PropTypes.string.isRequired
};
