import json
from fastapi import APIRouter, Request
from app.db import file_repo
from app.models.file import File

router = APIRouter(prefix='/files')

@router.get("/", tags=['files'])
async def get_files(file_pk = None):
    return []