from app.models.file import File
from fastapi import BackgroundTasks

async def get_file(file_pk):
    return File.get(file_pk)

async def get_all_files_keys(user_id: str):
    return list(map(
        lambda f: f.pk,
        File.find(File.user_id == user_id).all()
    ))

async def get_all_files(user_id: str):
    return File.find(File.user_id == user_id).all()
    
async def add_file(file: File, background_tasks: BackgroundTasks):
    background_tasks.add_task(set_expiration, key=file.key(), seconds=44000)
    return file.save()

async def delete_file(file_pk: str):
    return File.delete(file_pk)

async def bulk_delete_files(user_id: str):
    count, pks = 0, await get_all_files_keys(user_id)
    for pk in pks: count += File.delete(pk)
    return count

def set_expiration(key, seconds):
    File.db().expire(name=key, time=seconds)