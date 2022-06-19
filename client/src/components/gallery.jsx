import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get('http://localhost:5000');
            setImages(data);
            setLoading(false);
        }
        fetchData();
    },[setImages]);
  return (
    <div className="container my-5">
        <h4>Gallery</h4>
        {loading ? <div>Loading...</div>
        :
        <div className="row g-4">
            {images.map(upload => (
                <div className="col-12 col-md-3 rounded-2" key={upload._id}>
                    <img src={upload.image} alt="upload" className='img-fluid m-2' />
                </div>
            ))}
        </div>
        }
    </div>
  )
}

export default Gallery