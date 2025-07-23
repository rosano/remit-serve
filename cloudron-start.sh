#!/bin/bash

# ensure that this file executable in the app repo: chmod +x start.sh.

if [[ ! -f /app/data/.env ]]; then
	cp .env-sample /app/data/.env
fi

sed -i '' -e 's/in \.env/in \/app\/data\/\.env/g' main.js

exec /usr/local/bin/gosu cloudron:cloudron npm start
