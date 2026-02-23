import axios from 'axios';
import React from 'react';


export const UplodeImge = async imageData => {
    // 1. store the img from data 
    const formData = new FormData();
    formData.append("image", imageData);
    // 🔑 Replace YOUR_IMGBB_API_KEY with your imgbb API key
    const apiKey = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_key}`;

    //  2. send the photo to store and get the url
    try {
        const res = await axios.post(apiKey, formData);
        const url = res.data.data.display_url;
        return url   // ✅ This is your image URL
    } catch (error) {
        console.error("Image upload failed:", error);
    }

}