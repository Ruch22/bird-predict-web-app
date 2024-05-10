import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications
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
  
  const [predictionResult, setPredictionResult] = useState(null);
  const [showPredictionSection, setShowPredictionSection] = useState(false);

  const [predictionDescription, setPredictionDescription] = useState(null);
  const [predictionConfidence, setPredictionConfidence] = useState(null);

  const onDrop = (acceptedFiles) => {
    const imageFiles = acceptedFiles.filter(file => file.type.startsWith('image/'));
    setUploadedFiles(imageFiles);    
    setShowPredictionSection(false);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false,
  });

  const handlePrediction = async () => {
    try {
      setPredictionConfidence("")
      setPredictionResult("Please wait while predicting...");
      setPredictionDescription("Please wait while generating...");
      setShowPredictionSection(true);
      const formData = new FormData();
      formData.append('file', uploadedFiles[0]);
      const response = await fetch('http://13.53.254.90:8000/predict/', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      const result = data.predicted_bird;
      const confidence = data.confidence;
      setPredictionConfidence("(Confidence Rate:" + confidence + ")")
      if (result != "Unreliable prediction" && result !=""){
        setPredictionResult(result);
        getBirdDescription(result);
      }
      else{
        setPredictionResult("Sorry, Unidentified!");
        getBirdDescription("error" + confidence);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const saveFeedback = async (type) => {
    try {
      const formData = new FormData();
      let result = type.toUpperCase();

      formData.append('image', uploadedFiles[0]);
      formData.append('predictedSpecies', predictionResult);
      formData.append('result', result);

      const response = await fetch('http://13.53.254.90:8080/api/v1/save', {
        method: 'POST',
        body: formData
      });

      if (response.status == 200) {
        toast.success("Feedback saved successfully. Thank you so much for giving the feedback!");
      }
      else{
        toast.error("Error occured when saving the feedback. However,Thank you so much for using the application!");
      }

    } catch (error) {
      toast.error("Could not make the request. However,Thank you so much for using the application!");
    }
  };

  const getBirdDescription = async (bird) => {
    let data;
    try {
      if (bird.includes("error")){
        const msg = "Cannot identify a bird in the selected image. Or the selected bird is not trained yet. (Confidence rate:" + bird.replace("error", "") + ")"
        setPredictionDescription(msg);
        setShowPredictionSection(true);
      }
      else{
        setPredictionDescription("Please wait while generating...");
        setShowPredictionSection(true);
        
        const response = await fetch('http://13.53.254.90:8080/api/v1/description/' + bird, {
          method: 'GET'
        });
        
        data = "Please wait while generating...";

        if (!response.status == 200) {
          data = "Couldn't get the description of the predicted bird species."
        }
        else{
          data = await response.text();
        }

        setPredictionDescription(data);
        setShowPredictionSection(true);
      }
    } catch (error) {
      data = "Couldn't get the description of the predicted bird species."
      setPredictionDescription(data);
    }
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
          <div className='col-md-3' style={{padding: '20px', paddingTop:'5px'}}>
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
                onClick={handlePrediction}>Predict
              </button>
            </div>
          </div>

          {showPredictionSection && (
            <div className='col-md-9' style={{padding: '20px', paddingTop:'5px'}}>
              <div>
              <h4>Predicted Bird Species</h4>
                <div style={{ width: '100%', maxHeight: '100%', padding:'20px', marginTop: '12px', border: '1px solid #cccccc', borderRadius: '15px' }}>
                  <h6 className='text-primary'>Bird Name</h6>
                  <h3>{predictionResult} {predictionConfidence}</h3>
                  <div style={{ borderBottom: '1px dashed #000', margin: '20px 0' }}></div>
                  <h6 className='text-primary'>For your knowledge</h6>
                  <h5 style={{ textAlign: 'justify'}}>
                    {predictionDescription}
                  </h5>
                  <div style={{ borderBottom: '1px dashed #000', margin: '20px 0' }}></div> 
                  <div className='row' style={{paddingTop:'5px'}}>
                    <div className='col-md-6'>
                      <button
                        className='btn btn-danger'
                        style={{borderRadius: '30px', paddingTop: '12px',  paddingBottom: '12px', marginTop: '10px', width: '100%'}}
                        onClick={() => saveFeedback('wrong')}>
                          Wrong
                      </button>
                    </div>
                    <div className='col-md-6'>
                      <button
                        className='btn btn-success'
                        style={{borderRadius: '30px', paddingTop: '12px',  paddingBottom: '12px', marginTop: '10px', width: '100%'}}
                        onClick={() => saveFeedback('correct')}>
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
      <ToastContainer />
    </div>
  );
}

export default App;
