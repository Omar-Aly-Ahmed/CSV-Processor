pip install
    pip install fastapi
    pip install "uvicorn[standard]"
    pip install --user -U nltk
    pip install --user -U numpy
run inventory app command
    uvicorn main:app --reload --port={your port}

create database on redis.com and connect to it from main.py