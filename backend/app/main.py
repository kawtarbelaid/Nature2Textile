from fastapi import FastAPI
from app.api.routes.health import router as health_router
from app.api.routes.images import routerImg as image_router

app = FastAPI()

app.include_router(health_router)
app.include_router(image_router)