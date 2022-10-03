const express = require('express');
const router = express.Router();

require('dotenv').config();

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

router.post('/image', async (req, res) => {
    console.log("Image Upload Request");
    const file = req.files.image;
    if (!file) {
        console.log(req);
        return;
    }

    const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "image",
        resource_type: "image"
    })

    res.json(result);
});


router.post('/audio', async (req, res) => {

    console.log("Audio Upload")

    try {
        const file = req.files.audio;
        if (!file) {
            console.log(req);
            return;
        }
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "audio",
            resource_type: "video"
        });

        res.json(result);
    }
    catch(e) {
        res.status(400).json({error : e.message });
    }
})






module.exports = router;