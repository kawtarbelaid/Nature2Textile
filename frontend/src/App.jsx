import { useEffect, useState } from "react"
import ImageUploader from "./components/ImageUploader"
import ImagePreview from "./components/ImagePreview"
import ExampleGallery from "./components/ExampleGallery"
import "./App.css"

function App() {
  const [image, setImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  const examples = [
  {
    id: 1,
    name: "Sunset",
    src: "/examples/sunset.jfif",
  },
  {
    id: 2,
    name: "Flower",
    src: "/examples/flower.jfif",
  },
  {
    id: 3,
    name: "Ocean",
    src: "/examples/ocean.jfif",
  },
  ]


  useEffect(() => {
    if (!image) {
      setPreviewUrl(null)
      return
    }

    const url = URL.createObjectURL(image)

    setPreviewUrl(url)

    return () => {
      URL.revokeObjectURL(url)
    }
  }, [image])

  return (
  <main className="app">
    <h1>Nature2Textile</h1>

    <p className="subtitle">
      Transform the beauty of nature into textile designs.
    </p>

    <ImageUploader onImageSelected={setImage} />

    <ImagePreview
      image={image}
      previewUrl={previewUrl}
    />
    <ExampleGallery
    examples={examples}
    onExampleSelected={setImage}
    />
    
  </main>
  )
}

// function App() {
//   const [image, setImage] = useState(null)
//   // l'adresse temporaire du fichier
//   const [previewUrl, setPreviewUrl] = useState(null)


//   function handleImageChange(event) {
//     //event.target = <input></input>, event.target.files =  fichiers sélectionnées
//     const selectedImage = event.target.files[0] 

//     if (selectedImage) {
//       setImage(selectedImage)
//     }
//   }
//   // Exécute cet effet lorsque [image] change.
//   useEffect(() => {
//     if (!image) {
//       setPreviewUrl(null)
//       return
//     }
//     const url = URL.createObjectURL(image)

//     setPreviewUrl(url)

//     return () => {
//       URL.revokeObjectURL(url)
//     }
//   }, [image]) //[image] = dependancy Array, l'effet depend de changement de l'image


//   return (
//     <main>
//       <h1>Nature2Textile</h1>

//       <p>
//         Transform the beauty of nature into textile designs.
//       </p>

//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleImageChange}
//       />

//       {image && (
//         <div>
//           <p>Selected image: {image.name}</p>

//           {previewUrl && (
//             <img
//               src={previewUrl}
//               alt="Selected nature"
//               width="400"
//             />
//           )}
//         </div>
//       )}
//     </main>
//   )
// }

export default App


