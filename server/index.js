const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const Image = require('./UploadModel');

const app  = express();
app.use(cors());
app.use(express.urlencoded({extended: true, limit: '50mb'}));
app.use(express.json());

dotenv.config();

mongoose.connect(process.env.DB_CONNECT)
    .then(() => {
        console.log('connect to db');
        app.listen(5000);
    })
    .catch(err => {
        console.log(err.message);
    });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

app.get('/', async (req, res) => {
    try {
        const image = await Image.find();
        res.status(200).json(image);
    } catch (err) {
        res.status(500).json({message: "Image not found"});
    }
})

app.post('/api', async (req, res) => {
    const { image } = req.body;
    const uploadedImage = await cloudinary.uploader.upload(image, 
        {
            folder: 'test'
        },
        (result, error) => {
        if(error) {
            console.log(error);
        } 
    });

    try {
        const image = new Image({
            image: uploadedImage.secure_url, 
        })
        const saveImage = await image.save();
        res.status(200).json(saveImage);
    } catch (err) {
        res.status(500).json({message: "Image not found!"});
    }
})
