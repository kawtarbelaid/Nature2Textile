
function ImagePreview({ image, previewUrl }) {
    
  if (!image || !previewUrl) {
    return null
  }

  return (
    <div className="preview">
      <p>Selected image: {image.name}</p>

      <img
        src={previewUrl}
        alt="Selected nature"
      />
    </div>
  )
}

export default ImagePreview