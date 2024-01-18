import logo from './logo.svg';
import './App.css';
import React, { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import 'bootstrap/dist/css/bootstrap.min.css';
import imgLogo from './img/logo.png';
import imgTop from './img/top_section.jpg';

const page = {
  height: '100vh',
  overflow: 'auto',
  backgroundColor: '#18191A',
  padding: '30px'
};

const navBar = {

};

const uploadWindow = {
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: '15px',
  padding: '15px',
  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)'
};

const dropzoneStyles = {
  border: '1px dashed #cccccc',
  backgroundColor: '#f5f5f5',
  borderRadius: '100px',
  paddingTop: '10px',
  paddingLeft: '20px',
  textAlign: 'middle',
  cursor: 'pointer',
};

const NavBar = () => {  
  return (
    <div>      
      <div className='row' style={{paddingBottom: '25px', color: 'white'}}>
        <div className='col-md-1'>
          <img
            src={imgLogo}
            alt='Avian Mate'
            style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '5px' }}
          />
        </div>
        <div className='col-md-11 d-flex align-items-center'>
          <div className='text-left'>
            <h1 style={{fontSize: '57px'}}>Avian Mate</h1>
            <label>AI based bird species predicting platform</label>
          </div>
        </div>
      </div>
    </div>
  );
};

const BodySection = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    const imageFiles = acceptedFiles.filter(file => file.type.startsWith('image/'));
    setUploadedFiles(imageFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false,
  });
  

  return (
    <div>    
      <div className='row'>
        <div className='col-md-6' style={{paddingRight:'20px', paddingLeft:'20px', paddingTop:'10px'}}>
          <img
            className='rounded'
            src={imgTop}
            alt='Avian Mate'
            style={{ maxWidth: '100%', marginTop: '5px'}}
          />
          <p style={{ textAlign: 'justify', paddingTop:'25px' }}>
          Embark on a captivating journey into the world of birds with our groundbreaking solution!
          Utilizing state-of-the-art AI and computer vision technologies, we've crafted a powerful
          model that swiftly identifies bird species based on visual features in images. Imagine a
          user-friendly tool that revolutionizes birdwatching – one where you can effortlessly upload or
          capture an image, and watch as our deep learning algorithms work their magic, providing accurate
          species identification. This isn't just a solution; it's a key to unlocking the beauty of
          birdwatching for everyone. Join us in making birdwatching accessible, delightful, and limitless!
          </p>
        </div>
        <div className='col-md-6'>
          <div className='row' style={{padding: '10px'}}>
            <h3>Upload an Image</h3>
            <div className='col-md-10' style={{paddingTop: '15px'}}>
              <div {...getRootProps()} style={dropzoneStyles}>
                <input {...getInputProps()} />
                <p>Drop an image here, or click to select</p>
              </div>
            </div>
            <div {...getRootProps()} className='col-md-2'  style={{paddingTop: '15px'}}>
              <input {...getInputProps()} />
              <p className='btn btn-dark' style={{borderRadius: '30px', paddingTop: '12px',  paddingBottom: '12px', width: '100%'}} >Upload</p>
            </div>
          </div>

        {uploadedFiles.length > 0 && (
          <div className='row' style={{padding: '10px', paddingTop: '0px'}}>
            <div className='col-md-12'>
              <div>
                <h4 style={{paddingTop: '30px'}}>Uploaded Image</h4>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  {uploadedFiles.map((file) => (
                    <li key={file.name}>
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        style={{ maxWidth: '100%', maxHeight: '300px', marginTop: '5px', border: '1px solid #cccccc', borderRadius: '15px' }}
                      />              
                    </li>
                  ))}
                </ul>
                <button className='btn btn-dark' style={{borderRadius: '30px', paddingTop: '12px',  paddingBottom: '12px', marginTop: '15px', width: '100%'}} >
                    Predict
                </button>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>  
    </div>
  );
};

function App() {
  return (
    <div style={page}>
      <div style={navBar}>
        <NavBar />
      </div>
      <div style={uploadWindow}>
        <BodySection />
      </div>
    </div>
  );
}

export default App;
