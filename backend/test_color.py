from PIL import Image
import numpy as np

from app.services.color_analysis import extract_dominant_colors


image = Image.open("C:/Users/pc/Pictures/img_kawtar.png")
image = image.convert("RGB")

image_array = np.array(image)

palette = extract_dominant_colors(image, 5)
print(image_array.shape)
print(image_array.dtype)
print(palette)