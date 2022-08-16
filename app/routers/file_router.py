import json
from fastapi import APIRouter, BackgroundTasks, Request, Header
from app.db import file_repo
from app.models.file import File

router = APIRouter(prefix='/files')

@router.get("/", tags=['files'])
async def get_files(
    token: str | None = Header(default=None, convert_underscores=False)
):
    return await file_repo.get_all_files(token)

@router.get("/{file_pk}", tags=['files'])
async def get_file(file_pk):
    return await file_repo.get_file(file_pk)

@router.post("/", tags=['files'])
async def upload_file(
    req: Request,
    background_tasks: BackgroundTasks,
    token: str | None = Header(default=None, convert_underscores=False),
):
    data = await req.json()
    file = await file_repo.add_file(
        File(
            user_id=token,
            file_name=data['file_name'],
            text=json.dumps(data['text'])
        ), 
        background_tasks
    )
    return file

@router.delete("/", tags=['files'])
async def bulk_delete_files_of_user(req: Request):
    user_id = req.headers.get('token')
    return await file_repo.bulk_delete_files(user_id)
    
@router.delete("/{file_pk}", tags=['files'])
async def upload_file(file_pk: str):
    return await file_repo.delete_file(file_pk)

@router.get("/keys", tags=['files'])
async def get_files(token: str | None=Header(default=None, convert_underscores=False)):
    return await file_repo.get_all_files_keys(token)

async def proccess_file(file):
    return