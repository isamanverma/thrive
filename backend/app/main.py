from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os
from pathlib import Path
from app.api import recipes

app = FastAPI()

# Mount static files directory
static_dir = Path(__file__).parent.parent / "static"
app.mount("/static", StaticFiles(directory=str(static_dir)), name="static")

# Serve favicon.ico from static directory


@app.get("/favicon.ico")
async def favicon():
    return FileResponse(os.path.join(static_dir, "favicon.ico"))


@app.get("/")
def root():
    return {"message": "Backend running!"}


app.include_router(recipes.router, prefix="/recipes", tags=["recipes"])
