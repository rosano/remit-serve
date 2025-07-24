const express = require('express')
const app = express()

require('dotenv').config({ quiet: true })

app.use(async (req, res) => {
	const base = process.env.REMIT_BASE

	if (!base || (typeof base === 'string' && !base.match(/^https?:\/\//))) {
		return res.send('Please set REMIT_BASE to a URL in .env, then restart.')
	}

	const source = base + req.host + req.path;

	const response = await fetch(source);

	return res.send(await response.text())
})

const port = process.env.PORT || 3000
app.listen(port, () => {
	console.info(`Listening on port ${ port }`)
})
