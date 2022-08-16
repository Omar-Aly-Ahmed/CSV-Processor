from redis_om import get_redis_connection
redis = get_redis_connection(
    host="redis-19339.c54.ap-northeast-1-2.ec2.cloud.redislabs.com",
    port=19339,
    password="wj4OgAr08ZokoOOu3WYfU1gAJbNAgUp7",
    decode_responses=True
)