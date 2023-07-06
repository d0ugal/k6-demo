import logging
import os
import httpx
import random
import pyroscope
from fastapi import FastAPI, Request, HTTPException
from lib.bike.bike import order_bike
from lib.car.car import order_car
from lib.scooter.scooter import order_scooter

pyroscope.configure(
	application_name = "ride-sharing-app",
	server_address   = "http://pyroscope:4040",
	tags             = {
        "region":   f'{os.getenv("REGION")}',
	}
)

REGIONS = {'us-east', 'eu-north', 'ap-south'}


def get_other_region():
    return random.choice(list(REGIONS - {os.getenv("REGION")}))

def forward_request(request: Request):
    logging.warning('Forwarding request')
    return httpx.get(f"http://{get_other_region()}:5000/{request.url.path}", headers=request.headers).json()


app = FastAPI()

@app.get("/")
async def read_root(request: Request):
    if random.randint(1, 100) == 1:
        return forward_request(request)

    return {"Hello": "World"}

@app.get("/bike")
async def bike(request: Request):
    if random.randint(1, 100) == 1:
        return forward_request(request)
    order_bike(0.2)
    return "<p>Bike ordered</p>"


@app.get("/scooter")
async def scooter(request: Request):
    if random.randint(1, 50) == 1:
        raise HTTPException(status_code=500, detail="Scooters broken")
    if random.randint(1, 100) == 1:
        return forward_request(request)
    order_scooter(0.3)
    return "<p>Scooter ordered</p>"


@app.get("/car")
async def car(request: Request):
    if random.randint(1, 1000) == 1:
        raise HTTPException(status_code=500, detail="Cars broken")
    if random.randint(1, 100) == 1:
        return forward_request(request)
    order_car(0.4)
    return "<p>Car ordered</p>"


@app.get("/env")
async def environment(request: Request):
    if random.randint(1, 100) == 1:

        return forward_request(request)
    result = "<h1>environment vars:</h1>"
    for key, value in os.environ.items():
        result +=f"<p>{key}={value}</p>"
    return result
