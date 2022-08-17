from app.models.file_entity import FileEntity
from fastapi import BackgroundTasks
from random import randint
import nltk

nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')


async def get_file(file_pk):
    try:
        return FileEntity.get(file_pk)
    except Exception as e:
        return []


async def get_all_files_keys(user_id: str):
    files = FileEntity.find(FileEntity.user_id == user_id).all()
    return list(map(lambda f: f.pk, files))

async def get_all_files(user_id: str):
    try:
        return FileEntity.find(FileEntity.user_id == user_id).all()
    except Exception as e:
        return []
    
async def add_file(file: FileEntity, background_tasks: BackgroundTasks):
    background_tasks.add_task(set_expiration, key=file.key(), seconds=44000)
    background_tasks.add_task(set_file_results, file)
    return file.save()

async def delete_file(file_pk: str):
    return FileEntity.delete(file_pk)


async def bulk_delete_files(user_id: str):
    count, pks = 0, await get_all_files_keys(user_id)
    for pk in pks:
        count += FileEntity.delete(pk)
    return count


def set_expiration(key, seconds):
    FileEntity.db().expire(name=key, time=seconds)

def set_file_results(file: FileEntity):
    file.accuracy, file.most_frequent_words = file_process(file.text)   
    file.save()
    
def file_process(fileContent: str, fileName: str = None):
    for _ in range(20000):
        accuracy = str(randint(1, 100))
        raw = fileContent
        raw = raw.strip()
        tokens = nltk.word_tokenize(raw)

        tokens_l = [w.lower() for w in tokens]

        freq = nltk.FreqDist(tokens_l)
        mCW = ', '.join(list(map(lambda t: t[0], freq.most_common(3))))

    return accuracy, mCW

