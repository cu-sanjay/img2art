import { useState, useRef } from 'react'
import Head from 'next/head'

export default function Home() {
  const [image, setImage] = useState(null)
  const [textArt, setTextArt] = useState('')
  const [svgData, setSvgData] = useState('')
  const [processing, setProcessing] = useState(false)
  const [artType, setArtType] = useState('ascii')
  const [intensity, setIntensity] = useState(50)
  const [width, setWidth] = useState(80)
  const fileInputRef = useRef(null)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setImage(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const processImage = async () => {
    if (!image) return
    
    setProcessing(true)
    try {
      const response = await fetch('/api/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: image.split(',')[1],
          type: artType,
          intensity,
          width
        })
      })
      
      const data = await response.json()
      if (data.textArt) setTextArt(data.textArt)
      if (data.svg) setSvgData(data.svg)
    } catch (error) {
      console.error('Processing failed:', error)
    }
    setProcessing(false)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(textArt)
  }

  const downloadText = () => {
    const blob = new Blob([textArt], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'textart.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  const downloadSVG = () => {
    const blob = new Blob([svgData], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'vector.svg'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <Head>
        <title>Image to Art Converter</title>
        <meta name="description" content="Convert images to text art and vector formats" />
      </Head>

      <div className="container">
        <h1>Image to Art Converter</h1>
        
        <div className="upload-section">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={fileInputRef}
            className="file-input"
          />
          
          {image && (
            <div className="preview">
              <img src={image} alt="Preview" className="preview-image" />
            </div>
          )}
        </div>

        <div className="controls">
          <div className="control-group">
            <label>Type:</label>
            <select value={artType} onChange={(e) => setArtType(e.target.value)}>
              <option value="ascii">ASCII Art</option>
              <option value="dots">Dot Art</option>
              <option value="blocks">Block Art</option>
              <option value="lines">Line Art</option>
            </select>
          </div>

          <div className="control-group">
            <label>Width: {width}</label>
            <input
              type="range"
              min="40"
              max="120"
              value={width}
              onChange={(e) => setWidth(parseInt(e.target.value))}
            />
          </div>

          <div className="control-group">
            <label>Intensity: {intensity}</label>
            <input
              type="range"
              min="10"
              max="100"
              value={intensity}
              onChange={(e) => setIntensity(parseInt(e.target.value))}
            />
          </div>

          <button 
            onClick={processImage} 
            disabled={!image || processing}
            className="process-btn"
          >
            {processing ? 'Processing...' : 'Convert'}
          </button>
        </div>

        {textArt && (
          <div className="output-section">
            <div className="output-header">
              <h3>Text Art</h3>
              <div className="buttons">
                <button onClick={copyToClipboard} className="action-btn">Copy</button>
                <button onClick={downloadText} className="action-btn">Download TXT</button>
              </div>
            </div>
            <pre className="text-art">{textArt}</pre>
          </div>
        )}

        {svgData && (
          <div className="output-section">
            <div className="output-header">
              <h3>Vector Art</h3>
              <div className="buttons">
                <button onClick={downloadSVG} className="action-btn">Download SVG</button>
              </div>
            </div>
            <div className="svg-preview" dangerouslySetInnerHTML={{ __html: svgData }} />
          </div>
        )}
      </div>

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          font-family: monospace;
        }

        h1 {
          text-align: center;
          margin-bottom: 30px;
          color: #333;
        }

        .upload-section {
          margin-bottom: 20px;
        }

        .file-input {
          width: 100%;
          padding: 10px;
          border: 2px dashed #ccc;
          border-radius: 4px;
          cursor: pointer;
        }

        .preview {
          margin-top: 15px;
          text-align: center;
        }

        .preview-image {
          max-width: 300px;
          max-height: 300px;
          border-radius: 4px;
        }

        .controls {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin-bottom: 20px;
          padding: 20px;
          background: #f5f5f5;
          border-radius: 4px;
        }

        .control-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .control-group label {
          font-weight: bold;
          color: #555;
        }

        .control-group select,
        .control-group input[type="range"] {
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .process-btn {
          grid-column: 1 / -1;
          padding: 12px 24px;
          background: #007acc;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }

        .process-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .output-section {
          margin-bottom: 30px;
        }

        .output-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .buttons {
          display: flex;
          gap: 10px;
        }

        .action-btn {
          padding: 8px 16px;
          background: #28a745;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .text-art {
          background: #000;
          color: #0f0;
          padding: 20px;
          border-radius: 4px;
          overflow-x: auto;
          font-size: 12px;
          line-height: 1;
          white-space: pre;
        }

        .svg-preview {
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 20px;
          background: white;
          text-align: center;
        }

        @media (max-width: 600px) {
          .controls {
            grid-template-columns: 1fr;
          }
          
          .output-header {
            flex-direction: column;
            gap: 10px;
            align-items: flex-start;
          }
        }
      `}</style>
    </>
  )
}