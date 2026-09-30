import { useEffect, useState } from "react"

function ImageUploader({ onImageSelected }) {
  const [isDragging, setIsDragging] = useState(false)

  function handleDragOver(event) {
    event.preventDefault()
    setIsDragging(true)
  }

  function handleDragLeave(event) {
      event.preventDefault()
      setIsDragging(false)
  }

  function handleDrop(event) {
      event.preventDefault()
      setIsDragging(false)

      const droppedFile = event.dataTransfer.files[0]

      if (droppedFile) {
          onImageSelected(droppedFile)
      }
  }
    
  function handleChange(event) {
    const selectedImage = event.target.files[0]

    if (selectedImage) {
      onImageSelected(selectedImage)
    }
  }

  return (
    <div
        className={`upload-box ${isDragging ? "dragging" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
    >
        <label className="upload-button">
            ↑ Upload image

            <input
                type="file"
                accept="image/*"
                onChange={handleChange}
            />
        </label>

        <p className="upload-text">
            Choose an image or drag & drop it here
        </p>

        <p className="upload-info">
            JPG, PNG or WEBP — Max 10 MB
        </p>
    </div>
    )
}

export default ImageUploader