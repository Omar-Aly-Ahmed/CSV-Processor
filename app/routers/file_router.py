import json
from fastapi import APIRouter, Request
from app.db import file_repo
from app.models.file import File

router = APIRouter(prefix='/files')

@router.get("/", tags=['files'])
async def get_files(file_pk=None):
    if file_pk: return await file_repo.get_file(file_pk)
    return await file_repo.get_all_files()

@router.post("/", tags=['files'])
async def upload_file(req: Request):
    file = await req.json()
    file = await file_repo.add_file(File(
        user_id=file['user_id'],
        file_name=file['file_name'],
        text=json.dumps(file['text'])
    ))
    File.db().expire(name=file.key(), time=600000)
    return file

@router.get("/{file_pk}", tags=['files'])
async def get_files():
    return await file_repo.get_file()

@router.delete("/{file_pk}", tags=['files'])
async def upload_file(file_pk: str):
    return await file_repo.delete_file(file_pk)
