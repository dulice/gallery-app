import React, { useState } from 'react'
import axios from 'axios'

const FileImage = () => {
    const [file, setFile] = useState('');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);

    const previewFiles = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setImage(reader.result);
      }
      // console.log('image',image);
    }

    const handleChange = (e) => {
      const file = e.target.files[0];
      setFile(file);
      previewFiles(file); 
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        await axios.post('http://localhost:5000/api', {image: image});
        setLoading(false);
        window.location.reload();
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    }
  return (
    <div className='row mt-3'>
      {file && <img className='selected-image rounded-2' src={image} alt="" />}
      <form onSubmit={handleSubmit}>
        <input type="file" name="image" id="" className='mt-5' onChange={(e) => handleChange(e)}/>
        {loading 
        ? <button className='btn btn-primary' disabled type='submit'>sending...</button>
        : <button className='btn btn-primary' type='submit'>send</button>
        }
        
      </form>
    </div>
  )
}

export default FileImage