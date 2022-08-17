import csv
from tokenize import Token
from fastapi import (
    APIRouter,
    BackgroundTasks,
    Request,
    UploadFile,
    File
)
from fastapi.responses import FileResponse
from app.db import file_repo
from app.models.file_entity import FileEntity

router = APIRouter(prefix='/files')


@router.post("/upload", tags=['files'])
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
            name=file.filename,
            text=text,
        ),
        background_tasks
    )

    return result


@router.get("/keys", tags=['files'])
async def get_files(req: Request):
    user_id = req.headers.get('Token')
    return await file_repo.get_all_files_keys(user_id)


@router.get('/results', response_class=FileResponse, tags=['files'])
async def get_results(req: Request):
    user_id = req.headers.get('Token')
    files = await file_repo.get_all_files(user_id)
    header = ['name', 'accuracy', 'most_frequent_words']
    data = [
        [file.name, file.accuracy, file.most_frequent_words] for file in files
    ]
    with open('results.csv', 'w', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(header)
        writer.writerows(data)

    return 'results.csv'


@router.get("/", tags=['files'])
async def get_files(req: Request):
    user_id = req.headers.get('token')
    return await file_repo.get_all_files(user_id)


@router.get("/{file_pk}", tags=['files'])
async def get_file(file_pk):
    return await file_repo.get_file(file_pk)


@router.delete("/", tags=['files'])
async def bulk_delete_files_of_user(req: Request):
    user_id = req.headers.get('Token')
    return await file_repo.bulk_delete_files(user_id)


@router.delete("/{file_pk}", tags=['files'])
async def upload_file(file_pk: str):
    return await file_repo.delete_file(file_pk)


async def proccess_file(file):
    return
