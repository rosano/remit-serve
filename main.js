const express = require('express')
const app = express()

require('dotenv').config({ quiet: true })

const port = process.env.PORT || 3000
const base = process.env.REMIT_BASE

app.use(async (req, res) => {
	if (!base || (typeof base === 'string' && !base.match(/^https?:\/\//))) {
		return this.res.send('Please set REMIT_BASE to a URL in .env')
	}

	const source = base + req.host + req.path;

	const response = await fetch(source);

	return res.send(await response.text())
})

app.listen(port, () => {
	console.info(`Listening on port ${ port }`)
})
