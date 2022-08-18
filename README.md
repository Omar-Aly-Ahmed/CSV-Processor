connect to remote redis db from ./app/db/__init__.py

run server from project root folder
uvicorn app.main:app --reload --port={your port}

run next.js app from client folder
npm i && npm run dev