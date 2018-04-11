import React, { PureComponent, Fragment } from "react";
import { Segment, Divider } from "semantic-ui-react";

import Table from "./table";
import Filter from "./filter";
import NewUserForm from "./add";

const queryParams = ["limit", "order", "sortBy", "filter", "offset"];

export default class TableList extends PureComponent {
	state = {
		tableRows: [],
		sortBy: "_id",
		offset: 0,
		limit: 10,
		filter: "",
		totalCount: 0,
		direction: null,
		loading: false
	};

	constructor() {
		super();

		this.loadData = this.loadData.bind(this);
		this.onChangeLimit = this.onChangeLimit.bind(this);
		this.onSubmitFilter = this.onSubmitFilter.bind(this);
		this.onChangePage = this.onChangePage.bind(this);
		this.handleSort = this.handleSort.bind(this);
		this.addNewUser = this.addNewUser.bind(this);
	}

	handleSort(clickedColumn) {
		const { sortBy, direction } = this.state;

		if (sortBy !== clickedColumn) {
			this.setState({
				sortBy: clickedColumn,
				direction: "ascending"
			});

			this.loadData({
				sortBy: clickedColumn,
				offset: 0,
				order: "ascending"
			});

			return;
		}

		this.setState({
			sortBy: clickedColumn,
			offset: 0,
			direction: direction === "ascending" ? "descending" : "ascending"
		});

		this.loadData({
			sortBy: clickedColumn,
			offset: 0,
			order: direction === "ascending" ? "descending" : "ascending"
		});
	}

	componentDidMount() {
		this.loadData({});
	}

	onChangeLimit(event, data) {
		if (data.value !== this.state.limit) {
			this.setState({ limit: data.value, offset: 0 });
			this.loadData({ limit: data.value, offset: 0 });
		}
	}

	onSubmitFilter(filter) {
		if (filter !== this.state.filter) {
			this.setState({ filter: filter, offset: 0, loading: true });
			this.loadData({ filter: filter, offset: 0 });
		}
	}

	onChangePage(page) {
		if (page !== this.state.offset) {
			this.setState({ offset: page });
			this.loadData({ offset: page });
		}
	}

	addNewUser(data) {
		fetch("http://localhost:3001/api/v1/tableRows", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ data })
		}).then(response => {
			if (response.ok) {
				response.json().then(data => {
					let { limit, offset } = this.state;

					this.loadData({ limit, offset });
				});
			} else {
				response.json().then(error => {
					console.log(`Failed to load data: ${error.message}`);
				});
			}
		});
	}

	deleteUser({ _id: id }) {
		fetch("http://localhost:3001/api/v1/tableRows/" + id, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" }
		}).then(response => {
			if (response.ok) {
				response.json().then(data => {
					let { limit, offset } = this.state;

					this.loadData({ limit, offset });
				});
			} else {
				response.json().then(error => {
					console.log(`Failed to load data: ${error.message}`);
				});
			}
		});
	}

	loadData(params) {
		const current = this.state;
		queryParams.forEach(element => {
			if (!(element in params)) {
				params[element] = current[element];
			}
		});

		const esc = encodeURIComponent;
		const query = Object.keys(params)
			.map(key => esc(key) + "=" + esc(params[key]))
			.join("&");

		fetch("http://localhost:3001/api/v1/tableRows?" + query).then(response => {
			if (response.ok) {
				response.json().then(data => {
					this.setState({ tableRows: data.records, totalCount: data.metadata.totalCount });
				});
			} else {
				response.json().then(error => {
					console.log(`Failed to load data: ${error.message}`);
				});
			}
			this.setState({ loading: false });
		});
	}

	render() {
		return (
			<Fragment>
				<Segment>
					<NewUserForm onSendUser={this.addNewUser} />
					<Filter
						filter={this.state.filter}
						totalCount={this.state.totalCount}
						onSubmitFilter={this.onSubmitFilter}
						loading={this.state.loading}
					/>
					<Divider />
					<Table
						tableRows={this.state.tableRows}
						totalCount={this.state.totalCount}
						totalPages={Math.ceil(this.state.totalCount / this.state.limit)}
						currentPage={this.state.offset}
						onChangePage={this.onChangePage}
						deleteUser={this.deleteUser.bind(this)}
						column={this.state.sortBy}
						direction={this.state.direction}
						handleSort={this.handleSort}
						onChangeLimit={this.onChangeLimit}
						limit={this.state.limit.toString()}
					/>
				</Segment>
			</Fragment>
		);
	}
}
