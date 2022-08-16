from app.models.file import File

async def get_file(file_pk):
    return File.get(file_pk)

async def get_all_files():
    return [File.get(file_pk) for file_pk in File.all_pks()]

async def add_file(file: File):
    return file.save()

async def delete_file(file_pk: str):
    return File.delete(file_pk)