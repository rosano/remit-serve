const express = require('express')
const app = express()

require('dotenv').config({ quiet: true })

app.use(async (req, res) => {
	const prefixes = (process.env.WHITELIST_PREFIXES || '').split(',')

	if (!prefixes.length) {
		return res.send('Please set WHITELIST_PREFIXES to comma-separated URLs in .env, then restart.')
	}

	const url = req.path.slice(1);

	if (!url.match(/^https?:\/\//)) {
		return res.send('missing URL');
	}

	if (!prefixes.filter(prefix => url.startsWith(prefix)).length) {
		return res.send('not in whitelist');
	}

	const response = await fetch(url);

	return res.send(await response.text())
})

const port = process.env.PORT || 3000
app.listen(port, () => {
	console.info(`Listening on port ${ port }`)
})
