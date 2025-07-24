const express = require('express')
const app = express()

require('dotenv').config({ quiet: true })

app.use(async (req, res) => {
	const prefixes = (process.env.WHITELIST_PREFIXES || '').split(',')

	if (!prefixes.length) {
		return res.send('Please set WHITELIST_PREFIXES to a URL in .env, then restart.')
	}

	const parts = req.path.split('/');
	const domain = parts[1];

	if (!domain || !domain.match(/\w\.\w/)) {
		return res.send('missing domain');
	}

	const path = '/' + parts.slice(2).join('/');
	const source = domain + path;
	const url = 'https://' + source;

	if (!prefixes.filter(prefix => [source, url].filter(e => e.startsWith(prefix)).length).length) {
		return res.send('not in whitelist');
	}

	const response = await fetch(url);

	return res.send(await response.text())
})

const port = process.env.PORT || 3000
app.listen(port, () => {
	console.info(`Listening on port ${ port }`)
})
