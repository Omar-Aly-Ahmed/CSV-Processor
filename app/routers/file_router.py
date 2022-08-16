import json
from fastapi import APIRouter, BackgroundTasks, BackgroundTasks, Request, Header, Header
from app.db import file_repo
from app.models.file import File

router = APIRouter(prefix='/files')


@router.get("/", tags=['files'])
async def get_files(req: Request):
    user_id = req.headers.get('token')
    return await file_repo.get_all_files(user_id)


@router.get("/{file_pk}", tags=['files'])
async def get_file(file_pk):
    return await file_repo.get_file(file_pk)


@router.post("/", tags=['files'])
async def upload_file(
    req: Request,
    background_tasks: BackgroundTasks,
):
    user_id = req.headers.get('token')

    data = await req.json()
    file = await file_repo.add_file(
        File(
            user_id,
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
async def get_files(req: Request):
    user_id = req.headers.get('token')
    return await file_repo.get_all_files_keys(user_id)


async def proccess_file(file):
    return
