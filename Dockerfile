FROM python:3.11

RUN pip3 install httpx fastapi pyroscope-io==0.7.1 uvicorn[standard]

ENV FLASK_ENV=development
ENV PYTHONUNBUFFERED=1

COPY lib ./lib
CMD [ "uvicorn", "lib.server:app", "--host", "0.0.0.0", "--port", "5000"]

