from redis_om import get_redis_connection
redis = get_redis_connection(
    host="redis-16735.c290.ap-northeast-1-2.ec2.cloud.redislabs.com",
    port=16735,
    password="18TvNaRQOtQcVQJIhXL3C8r9D9VWJFRr",
    decode_responses=True
)