const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const tableRowsData = require("./tableRows.js");
const tableRowConstants = require("./tableRowConstants.js");

const app = express();

app.use(cors());
app.use(express.static("static"));
app.use(bodyParser.json());

var rows = tableRowsData.data.slice();

app.get("/api/v1/tableRows", function(req, res) {
	let sortBy = tableRowConstants.tableRowFieldTypes[0];
	let order = tableRowConstants.orderFieldTypes[0];
	let filter;
	let offset = tableRowConstants.defaultOffset,
		limit = tableRowConstants.defaultLimit;

	if (req.query.sortBy !== undefined) {
		if (!tableRowConstants.tableRowFieldTypes.includes(req.query.sortBy)) {
			res.status(422).json({
				message: "Invalid requested sort id. Allowed ids are " + tableRowConstants.tableRowFieldTypes.join(", ")
			});
			return;
		}
		sortBy = req.query.sortBy;
	}
	if (req.query.order !== undefined) {
		if (!tableRowConstants.orderFieldTypes.includes(req.query.order)) {
			order = tableRowConstants.orderFieldTypes[0];
		} else {
			order = req.query.order;
		}
	}

	const regex = new RegExp("^[a-zA-Z0-9]+$");
	if (req.query.filter !== undefined) {
		filter = req.query.filter;
		filter = filter.trim().toLowerCase();

		if (filter !== "" && !regex.test(filter)) {
			res.status(422).json({
				message: `Invalid filter: ${filter}`
			});
			return;
		}
	}
	if (req.query.offset !== undefined) {
		offset = parseInt(req.query.offset, 10);
		if (offset < 0) {
			offset = tableRowConstants.defaultOffset;
		}
	}
	if (req.query.limit !== undefined) {
		limit = parseInt(req.query.limit, 10);
		if (limit > 100) {
			limit = 100;
		}
		if (limit < 0) {
			limit = tableRowConstants.defaultLimit;
		}
	}

	// Filter tableRowsData
	var matches = [];
	if (filter !== undefined) {
		for (var i = 0; i < rows.length; ++i) {
			for (var j = 0; j < tableRowConstants.filterabletableRowFieldTypes.length; ++j) {
				var string = rows[i][tableRowConstants.filterabletableRowFieldTypes[j]];
				if (typeof string === "number") {
					string = string.toString();
				}

				string = string.toLowerCase();
				if (string.includes(filter)) {
					matches.push(rows[i]);
					break;
				}
			}
		}
	} else {
		matches = rows;
	}

	// Sort tableRowsData
	matches.sort((a, b) => {
		var sortVal = a["_id"] - b["_id"];
		var sign = order === tableRowConstants.orderFieldTypes[0] ? 1 : -1;

		if (a[sortBy] < b[sortBy]) {
			sortVal = -1;
		} else if (a[sortBy] > b[sortBy]) {
			sortVal = 1;
		}
		return sortVal * sign;
	});

	var ret = {
		metadata: {
			totalCount: matches.length
		},
		records: matches.slice(offset * limit, (offset + 1) * limit)
	};
	res.json(ret);
});

app.post("/api/v1/tableRows", function(req, res) {
	if (req.body === undefined || req.body.data === undefined) {
		res.status(422).json({ message: "Invalid request." });
	} else {
		let newRowData = [
			{
				_id: rows[rows.length - 1]._id + 1,
				...req.body.data
			}
		];

		rows = rows.concat(newRowData);

		res.status(200).json(rows);
	}
});

app.delete("/api/v1/tableRows/:id", function(req, res) {
	if (req.params.id === undefined) {
		res.status(422).json({ message: "Invalid request." });
	} else {
		let deletedRowIndex = rows.findIndex(row => row._id === parseInt(req.params.id, 10));

		if (deletedRowIndex === -1) {
			res.status(404).json({ message: "Not found" });
		} else {
			rows = rows.filter(row => row._id !== parseInt(req.params.id, 10));

			res.status(200).json({ message: "Deleted successfully" });
		}
	}
});

module.exports = {
	app
};
