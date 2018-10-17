const fetch = require('node-fetch')
const chalk = require('chalk');
const log = console.log;
const fs = require('fs');
const prompt = require('prompt');


function fetchProducts() {
	const url = "https://api.mercadolibre.com/sites/MLA/search?limit=10&q="

	prompt.start();
	prompt.get({
		properties: {
			busqueda: {
				description: chalk.green("¿Qué desea buscar?")
			}
		}
	}, function (err, result) {

		fetch(`${url}${result.busqueda}`)
			.then(response => response.json())
			.then(({ results = [] }) => results.map((data, i) => {
				log(`${chalk.cyan(i + 1)} - ${data.title} - ${chalk.red('$'+data.price)}`)
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
						return console.log(err)
					}
				})
			})
	})

}

module.exports = fetchProducts