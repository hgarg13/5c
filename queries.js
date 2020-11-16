const Pool = require('pg').Pool;
const pool = new Pool({
	user: 'me',
	host: 'localhost',
	database: 'repository',
	password: 'password',
	port: 5432,
});
const fetch = require('node-fetch');

const upsertRepo = async (req, res) => {
	try {
		if (!req.body.url) {
			throw new Error('Please provide a valid url');
		}
		let jsonData = await fetch(req.body.url)
			.then(res => res.json())
			.then(json => {
				return json;
			});
	
		for (let json of jsonData) {
			try {
				await pool.query('INSERT INTO repos (id, data) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET data = $2', [json.id, json])
			} catch (err) {
				console.log(err);
			}
		}
		res.status(201).send('Repos added successfully');
	} catch (err) {
		res.status(404).send(err.message);
	}
}

const getRepo = async (req, res) => {
	try {
		let id = +req.params.id;
		if (!id) {
			throw new Error('Please provide a valid id to fetch data');
		}
		
		let results = await pool.query('SELECT data FROM repos WHERE id = $1', [id])
		res.status(200).json(results.rows);
	} catch (err) {
		res.status(404).send(err.message);
	}
}

module.exports = { upsertRepo, getRepo };