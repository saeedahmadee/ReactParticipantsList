const chance = require("chance");

let json = [];
let generator = new chance();

for (var i = 1; i < generator.integer({ min: 20, max: 500 }); i++) {
	json.push({
		_id: i,
		name: generator.name({ middle: false, prefix: true }),
		email: generator.email(),
		address: generator.address(),
		phoneNumber: generator.phone({ formatted: false, country: "uk", mobile: true })
	});
}

module.exports = {
	data: json
};
