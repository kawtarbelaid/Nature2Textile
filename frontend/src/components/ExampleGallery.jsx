

function ExampleGallery({ examples, onExampleSelected }) {
  return (
    <section className="examples">
      <h2>Try an example</h2>

      <div className="example-grid">
        {examples.map((example) => (
          <button
            key={example.id}
            className="example-card"
            onClick={() => onExampleSelected(example)}
          >
            <img
              src={example.src}
              alt={example.name}
            />
          </button>
        ))}
      </div>
      <br></br><br></br>
      <h2>Examples of created textiles</h2>
    </section>
  )
}

export default ExampleGallery