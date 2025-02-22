"use client"
import { useEffect, useState } from 'react';


export default function Page() {
  
  const [word, setWord] = useState("");
  const [size, setSize] = useState(400);
  const [bgColor, setBgColor] = useState("ffffff");
  const [qrCode, setQrCode] = useState(null);
  const [formData, setFormData] = useState({
    dressCode: '',
    category: '',
    shortDesc: '',
    size: '',
    price: '',
    
  });

  // Changing the URL only when the user
  // changes the input
  useEffect(() => {
    
     setQrCode
 (`http://api.qrserver.com/v1/create-qr-code/?data=${word}!&size=${size}x${size}&bgcolor=${bgColor}`)
  }, [word, size, bgColor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Updating the input word when user
  // click on the generate button
  function handleClick() {
    setWord("Dress Code : "+formData.dressCode+" "+"Category : "+formData.category+" "+"Details : "+formData.shortDesc+" "+"Size : "+formData.size+" "+"Price : "+formData.price+" ")
  }

  const handlePrintQRCode = () => {
    if (!qrCode) {
      alert('No QR code available to print.');
      return;
    }
  
    // Create a new print window
    const printWindow = window.open('', '_blank', 'width=1110,height=1110');
    if (printWindow) {
      // Write the content for the print window
      printWindow.document.open();
      printWindow.document.write(`
        <html>
          <head>
            <title>Print QR Code</title>
            <style>
              body {
                // display: flex;
                justify-content: center;
                align-items: center;
                padding: 20px;
                font-family: Arial, sans-serif;
                //font-size: 35px;
              }
              img {
                max-width: 100%;
                height: auto;
              }
            </style>
          </head>
          <body>
            <div>
            
            <br><text>Price INR: ${formData.price}</text></br>
            <br><text>MRP Inclusive of Taxes</text></br>
            </div>
            
            
            <img src="${qrCode}" alt="QR Code">
          </body>
        </html>
      `);
      printWindow.document.close();
  
      // Ensure the print window is fully loaded before printing
      printWindow.onload = () => {
        printWindow.print();
        printWindow.close();
      };
    } else {
      alert('Failed to open print window.');
    }
  };

  return (
    <div className="App">
      <h1>QR Code Generator</h1>
      <div className="input-box">
        <div className="gen">
          {/* <input type="text" onChange={
            (e) => {setTemp(e.target.value)}}
            placeholder="Enter text to encode" /> */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="fabricType">Dress Code</label>
              <input
                type="text"
                id="dressCode"
                name="dressCode"
                value={formData.dressCode}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="fabricType">Category</label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="colour">Short Description</label>
              <input
                type="text"
                id="shortDesc"
                name="shortDesc"
                value={formData.shortDesc}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="length">size</label>
              <input
                type="text"
                id="size"
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
               
                required
              />
            </div>
           
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                min="0"
                step="1"  
                required
              />
            </div>
          </div>

          <button className="mt-4 w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-200 transition duration-200"
            
            onClick={handleClick}>
            Generate
          </button>
        </div>
        <div className="extra">
          <h5>Background Color:</h5>
          <input type="color" onChange={(e) => 
          { setBgColor(e.target.value.substring(1)) }} />
          <h5>Dimension:</h5>
          <input type="range" min="200" max="600"
           value={size} onChange={(e) => 
           {setSize(e.target.value)}} />
        </div>
      </div>
      <div className="output-box">
        <img src={qrCode} alt="" />
        <a href={qrCode} download="QRCode">
          <button type="button">Download</button>
        </a>
      </div>

      <div className="mt-6">
            <h3 className="text-lg font-bold mb-2">Generated QR Code</h3>
            <img src={qrCode} alt="Generated QR Code" className="max-w-full" />
            <button
              onClick={handlePrintQRCode}
              className="mt-4 w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-200 transition duration-200"
            >
              Print Tag
            </button>
          </div>
    </div>
  );
}

