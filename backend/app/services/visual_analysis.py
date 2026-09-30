import torch
from PIL import Image
from transformers import CLIPProcessor, CLIPModel


model = CLIPModel.from_pretrained(
    "openai/clip-vit-base-patch32"
)

processor = CLIPProcessor.from_pretrained(
    "openai/clip-vit-base-patch32"
)


def extract_visual_embedding(image: Image.Image):

    # Prepare l'image pour CLIP(préprocessing)
    inputs = processor(
        images=image,
        return_tensors="pt"
    )

    with torch.no_grad():
        image_features = model.get_image_features(**inputs)

    return image_features[0].tolist()