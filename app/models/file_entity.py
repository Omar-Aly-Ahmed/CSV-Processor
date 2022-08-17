from email.policy import default
from . import redis
from redis_om import HashModel, Field, Migrator


class FileEntity(HashModel):
    user_id: str = Field(index=True)
    name: str
    text: str
    accuracy: str = Field(default="-")
    most_frequent_words: str = Field(default="-")
    class Meta:
        database = redis


Migrator().run()
