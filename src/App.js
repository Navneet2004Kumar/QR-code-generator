import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import './App.css';

function App() {
  const [text, setText] = useState('');

  const [qrValue, setQrValue] = useState('');

  const [size, setSize] = useState(256);

  const [bgColor, setBgColor] = useState('#ffffff');

  const [fgColor, setFgColor] = useState('#000000');

  const generateQR = () => {
    if (text.trim()) {
      setQrValue(text);
    }
  };

  const downloadQR = () => {
    const svg = document.getElementById('qr-code');

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');

    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = size;
      canvas.height = size;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      
      const downloadLink = document.createElement('a');
      downloadLink.download = 'qrcode.png';

      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const clearQR = () => {
    setText('');
    setQrValue('');
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">QR Code Generator</h1>

        <p className="subtitle">Create QR codes for URLs, text, or anything!</p>

        <div className="input-section">
          <textarea
            placeholder="Enter text or URL here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="text-input"
            rows="4"
          />
          
          <div className="controls">
            <div className="control-group">

              <label>Size:</label>
              <select value={size} onChange={(e) => setSize(Number(e.target.value))} className="select">
                <option value="128">Small (128px)</option>
                <option value="256">Medium (256px)</option>

                <option value="512">Large (512px)</option>
              </select>
            </div>

            <div className="control-group">
              <label>Background:</label>
              <input
                type="color"
                value={bgColor}

                onChange={(e) => setBgColor(e.target.value)}
                className="color-input"
              />
            </div>

            <div className="control-group">
              <label>Foreground:</label>
              <input
                type="color"
                value={fgColor}

                onChange={(e) => setFgColor(e.target.value)}
                className="color-input"
              />
            </div>
          </div>

          <div className="button-group">
            <button onClick={generateQR} className="btn btn-generate">
              Generate QR Code
            </button>

            <button onClick={clearQR} className="btn btn-clear">
              Clear
            </button>

          </div>
        </div>

        {qrValue && (
          <div className="qr-section">

            <div className="qr-container">
              <QRCodeSVG
                id="qr-code"
                value={qrValue}
                size={size}
                bgColor={bgColor}
                
                fgColor={fgColor}
                level="H"
              />
            </div>
            <button onClick={downloadQR} className="btn btn-download">
              Download QR Code
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

