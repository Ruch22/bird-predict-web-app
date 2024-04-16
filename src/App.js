import logo from './logo.svg';
import './App.css';
import React, { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import imgLogo from './img/logo.png';
import imgSlide1 from './img/img_slide_1.jpg';
import imgSlide2 from './img/img_slide_2.jpg';
import imgSlide3 from './img/img_slide_3.jpg';
import imgSlide4 from './img/img_slide_4.jpg';
import imgSlide5 from './img/img_slide_5.jpg';

const imageSources = [imgSlide1, imgSlide2, imgSlide3, imgSlide4, imgSlide5];

const page = {
  height: '100vh',
  overflow: 'auto',
  //backgroundColor: '#18191A',
  backgroundColor: '#fff',
  padding: '30px'
};

const navBar = {

};

const uploadWindow = {
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: '15px',
  padding: '15px',
  //boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)'
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
      <div className='row' style={{paddingBottom: '25px'}}>
        <div className='col-md-1'>
          <img
            src={imgLogo}
            alt='AvianMate'
            style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '5px' }}
          />
        </div>
        <div className='col-md-11 d-flex align-items-center'>
          <div className='text-left'>
            <h1 style={{fontSize: '57px'}}><strong>AvianMate</strong></h1>
            <p>AI based bird species predicting platform</p>
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
  
  const [predictionResult, setPredictionResult] = useState(null);
  const [showPredictionSection, setShowPredictionSection] = useState(false);

  const handlePredictButtonClick = () => {
    const result = '';
    setPredictionResult(result);
    setShowPredictionSection(true);
  };
  

  return (
    <div>    
      <div className='row'>
        <div className='col-md-7' style={{ paddingRight: '20px', paddingLeft: '20px', paddingTop: '5px' }}>
          <Carousel interval={3000}>
            {imageSources.map((imgSrc, index) => (
              <Carousel.Item key={index}>
                <img
                  className='d-block w-100 rounded'
                  src={imgSrc}
                  alt={`Slide ${index}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <div className='col-md-5' style={{paddingRight:'20px', paddingLeft:'20px', paddingTop:'5px'}}>
          <p style={{ textAlign: 'justify'}}>
          Embark on a captivating journey into the world of birds with our groundbreaking solution!
          Utilizing state-of-the-art AI and computer vision technologies, we've crafted a powerful
          model that swiftly identifies bird species based on visual features in images. Imagine a
          user-friendly tool that revolutionizes birdwatching – one where you can effortlessly upload or
          capture an image, and watch as our deep learning algorithms work their magic, providing accurate
          species identification. This isn't just a solution; it's a key to unlocking the beauty of
          birdwatching for everyone. Join us in making birdwatching accessible, delightful, and limitless!
          </p>
        </div>
      </div>

      <div className='row'>
        <div className='col-md-12' style={{padding: '20px', paddingTop:'35px'}}>
          <h3>Upload an Image</h3>
          <div className='row'>
            <div className='col-md-10' style={{padding: '10px'}}>
              <div {...getRootProps()} style={dropzoneStyles}>
                <input {...getInputProps()} />
                <p>Drop an image here, or click to select</p>
              </div>
            </div>
            <div {...getRootProps()} className='col-md-2' style={{padding: '10px'}}>
              <input {...getInputProps()} />
              <p className='btn btn-dark' style={{borderRadius: '30px', paddingTop: '12px',  paddingBottom: '12px', width: '100%'}} >Upload</p>
            </div>
          </div>
        </div>
      </div>

      {uploadedFiles.length > 0 && (
        <div className='row'>
          <div className='col-md-6' style={{padding: '20px', paddingTop:'5px'}}>
            <div>
              <h4>Uploaded Image</h4>
              <ul style={{ listStyleType: 'none', padding: 0}}>
                {uploadedFiles.map((file) => (
                  <li key={file.name}>
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      style={{ width: '100%', maxHeight: '100%', padding:'20px', marginTop: '5px', border: '1px solid #cccccc', borderRadius: '15px' }}
                    />              
                  </li>
                ))}
              </ul>
              <button
                className='btn btn-dark'
                style={{borderRadius: '30px', paddingTop: '12px',  paddingBottom: '12px', marginTop: '5px', width: '100%'}}
                onClick={handlePredictButtonClick}>Predict
              </button>
            </div>
          </div>

          {showPredictionSection && (
            <div className='col-md-6' style={{padding: '20px', paddingTop:'5px'}}>
              <div>
                <h4>Predicted Bird Species</h4>
                <div style={{ width: '100%', maxHeight: '100%', padding:'20px', marginTop: '12px', border: '1px solid #cccccc', borderRadius: '15px' }}>
                  <h6 className='text-primary'>Bird Name</h6>
                  <h3>bird name</h3>
                  <div style={{ borderBottom: '1px dashed #000', margin: '20px 0' }}></div>
                  <h6 className='text-primary'>For your knowledge</h6>
                  <h5 style={{ textAlign: 'justify'}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                    ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                    eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </h5>
                  <div style={{ borderBottom: '1px dashed #000', margin: '20px 0' }}></div>
                  <div className='row' style={{paddingTop:'5px'}}>
                    <div className='col-md-6'>
                      <button
                        className='btn btn-danger'
                        style={{borderRadius: '30px', paddingTop: '12px',  paddingBottom: '12px', marginTop: '10px', width: '100%'}}>
                          Wrong
                      </button>
                    </div>
                    <div className='col-md-6'>
                      <button
                        className='btn btn-success'
                        style={{borderRadius: '30px', paddingTop: '12px',  paddingBottom: '12px', marginTop: '10px', width: '100%'}}>
                          Correct
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
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
