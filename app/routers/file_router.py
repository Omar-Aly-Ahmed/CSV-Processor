import json, csv, ast
from fastapi import (
    APIRouter,
    BackgroundTasks,
    Request,
    UploadFile,
    File
)
from app.db import file_repo
from app.models.file_entity import FileEntity

router = APIRouter(prefix='/files')


@router.get("/", tags=['files'])
async def get_files(req: Request):
    user_id = req.headers.get('Token')
    return await file_repo.get_all_files(user_id)


@router.get("/{file_pk}", tags=['files'])
async def get_file(file_pk):
    return await file_repo.get_file(file_pk)


@router.post("/", tags=['files'])
async def upload_file(
    req: Request,
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...)
):

    user_id = req.headers.get('Token')
    raw_data = await file.read()
    
    text = ' '.join(list(
        filter(
            lambda s: len(s) > 2,
            raw_data
                .decode('utf-8-sig')
                .replace('\r\n', '')
                .replace(',', ' ')
                .split(' ')
        )
    ))

    result = await file_repo.add_file(
        FileEntity(
            user_id=user_id,
            file_name=file.filename,
            text=text,
        ),
        background_tasks
    )

    return result

@router.delete("/", tags=['files'])
async def bulk_delete_files_of_user(req: Request):
    user_id = req.headers.get('Token')
    return await file_repo.bulk_delete_files(user_id)


@router.delete("/{file_pk}", tags=['files'])
async def upload_file(file_pk: str):
    return await file_repo.delete_file(file_pk)


@router.get("/keys", tags=['files'])
async def get_files(req: Request):
    user_id = req.headers.get('Token')
    return await file_repo.get_all_files_keys(user_id)

async def proccess_file(file):
    return
