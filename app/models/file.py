from . import redis
from redis_om import HashModel, Field

class File(HashModel):
    user_id: str = Field(index=True)
    file_name: str
    text: str
    
    class Meta:
        database=redis