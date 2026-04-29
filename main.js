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

	const prefix = prefixes.filter(prefix => url.startsWith(prefix));

	if (!prefix) {
		return res.send('not in whitelist');
	}

	const base = `https://${ req.get('host') }/`;
	const response = await fetch(url);
	const text = await response.text();
	return res.send(text.replaceAll(prefix, base + prefix));
})

const port = process.env.PORT || 3000
app.listen(port, () => {
	console.info(`Listening on port ${ port }`)
})
