
import { useForm } from "react-hook-form";
import AddPlantForm from "../../../components/Form/AddPlantForm";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";

const AddPlant = () => {
  const { user } = useAuth()
  const [imageURL, setImageURL] = useState("");
  const [isUploading, setIsUploading] = useState(false)
  // console.log(user)

  const {
    handleSubmit,
    register,
    reset,
  }
    = useForm();

  const handleImageUpload = async e => {
    setIsUploading(true)
    e.preventDefault()
    // e.target.reset()
    const image = e.target.files[0];
    if(!image){
      return "image not  a reured"
    }
    // console.log(image ,"imsge asiiii ")
    try {
      // 1. store the img from data 
      const formData = new FormData();
      formData.append("image", image);
      // 🔑 Replace YOUR_IMGBB_API_KEY with your imgbb API key
      const apiKey = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_key}`;
      // 2nd step
      const res = await axios.post(apiKey, formData);
      const url = res.data.data.display_url;
      setImageURL(url)
      // console.log(url, "sdsdsjdsahjf  aso")
    } catch (err) {
       toast.error(err?.message)
      console.log(err)
    }finally{
      setIsUploading(false)
    }
    
  }

  console.log(imageURL)
  const handleAddPlantData = async (formData) => {
    try {
      const userInfo = {
        name: user.displayName,
        email: user.email,
        userPhoto: user.photoURL,
      }
       
      const finalData = { ...formData,  userData: userInfo, Image: imageURL };
      console.log("Sending:", finalData);
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/add-plant`,
        finalData
      )
      toast.success('Plant Data Added Successfully, Yeee!')
      console.log(!data)


    } catch (error) {
      console.error("Post Error:", error.response?.data || error.message);
    };
    reset();
  };

  return (
    <div>
      {/* Form */}
      <AddPlantForm
        handleAddPlantData={handleAddPlantData}
        handleSubmit={handleSubmit}
        register={register}
        handleImageUpload={handleImageUpload}
        isUploading={isUploading}
        imageURL={imageURL}
      />
    </div>
  )
}

export default AddPlant
