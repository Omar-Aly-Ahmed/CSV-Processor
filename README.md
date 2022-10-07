connect to remote redis db from ./app/models/__init__.py

run server from project root folder
uvicorn app.main:app --reload --port=8001

run next.js app from client folder
npm i && npm run dev