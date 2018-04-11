var app = require("./app").app;
const port = process.env.PORT || 3001;

if (!module.parent) {
	app.listen(port, function() {
		console.log(`App started on port ${port}`);
	});
}

module.exports = {
	app
};
