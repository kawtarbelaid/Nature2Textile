import numpy as np
from PIL import Image
from sklearn.cluster import KMeans



def extract_dominant_colors(image, n_colors=5):
    analysis_image = image.copy()

    analysis_image.thumbnail(
        (300, 300),
        Image.Resampling.LANCZOS
    )

    image_array = np.array(analysis_image)
    pixels = image_array.reshape(-1, 3)

    unique_colors = np.unique(pixels, axis=0)
    n_clusters = min(n_colors, len(unique_colors))

    kmeans = KMeans(
        n_clusters=n_clusters,
        random_state=42
    )
    kmeans.fit(pixels)
    labels = kmeans.labels_

    # Quelle proportion de l'image représente cette couleur ?
    values, counts = np.unique(labels,return_counts=True)
    proportions = counts/len(labels)

    # Quelles couleurs
    colors = kmeans.cluster_centers_.astype(int)

    palette = []

    for cluster_id, proportion in zip(values, proportions):
        palette.append({
            "color": colors[cluster_id].tolist(),
            "proportion": float(proportion) #numpy.float64 en float Python classique.
        })

    return palette



