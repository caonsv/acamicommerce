const fetch = require('node-fetch')
const chalk = require('chalk');
const log = console.log;
const fs = require('fs');


function fetchProducts(query) {
	var url = "https://api.mercadolibre.com/sites/MLA/search?limit=10&q="
	
	fetch(`${url}${query}`)
		.then(response => response.json())
		.then(({ results = [] }) => results.map((data, i) =>{
				return `<li>${i + 1} - ${data.title} - $${data.price}</li>`
			})
		)
		.then(listing => `
			<html>
				<head></head>
				<body>
					<ul>
						${listing.join("")}
					</ul>
				</body>
			</html>
		`)
		.then((html) => {
			fs.writeFile("temp/demo.html", html, err => {
				if (err) {
					return console.log(err);
				}
			});
		})
}

module.exports = fetchProducts