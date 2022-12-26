const axios = require("axios");

const options = {
	method: "POST",
	url: "http://localhost:3333/categories/",
	headers: { "Content-Type": "application/json" },
	data: { name: "jsdfdfsdfghdffs", description: "carro bom" },
};

axios
	.request(options)
	.then(function (response) {
		console.log(response.data);
	})
	.catch(function (error) {
		console.error(error);
	});
