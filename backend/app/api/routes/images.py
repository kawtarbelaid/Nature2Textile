from fastapi import APIRouter,UploadFile,HTTPException
from PIL import Image,UnidentifiedImageError
import numpy as np
from app.services.color_analysis import extract_dominant_colors
from app.services.visual_analysis import extract_visual_embedding

routerImg = APIRouter()

@routerImg.post("/upload")
async def upload_image(file: UploadFile):

    if not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=415,
            detail="The uploaded file must be an image."
        )


    MAX_FILE_SIZE = 10 * 1024 * 1024
    file.file.seek(0, 2)
    file_size = file.file.tell()
    file.file.seek(0)

    if file_size > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413,
            detail="The image is too large."
    )
    
    try:
        image = Image.open(file.file)

        # To regulate later
        if image.width < 256 or image.height < 256 or image.width > 10024 or image.height > 10024:
            raise HTTPException(
                status_code=400,
                detail="Image dimensions are too small or too large."
            )
        image = image.convert("RGB")
        # image_array = np.array(image)
        palette = extract_dominant_colors(image)

        #Visual analysis
        embedding  = extract_visual_embedding(image)
        # taille = embedding.shape()


    except UnidentifiedImageError:
        raise HTTPException(
            status_code=415,
            detail="The file is not a valid image."
        )
    
    return {
        "filename": file.filename,
        "file_type": file.content_type,
        "width": image.width,
        "height": image.height,
        "palette": palette,
        "embedding": embedding
    }