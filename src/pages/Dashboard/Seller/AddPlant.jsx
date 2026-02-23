
import { useForm } from "react-hook-form";
import AddPlantForm from "../../../components/Form/AddPlantForm";
import { useState } from "react";
import { UplodeImge } from "../../../hooks/api/UplodeImge";

const AddPlant = () => {
  const {
    handleSubmit,
    register,
    reset,
  }
    = useForm();
  const [imageURL, setImageURL] = useState("");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
      const url = await UplodeImge(file)
       setImageURL(url)
  };

  // console.log(imageURL)
  const handleAddPlantData = (data) => {
    const finalData = { ...data, image: imageURL };
    console.log(finalData)
    reset()
  }
  
  return (
    <div>
      {/* Form */}
      <AddPlantForm
        handleAddPlantData={handleAddPlantData}
        handleSubmit={handleSubmit}
        register={register}
        handleImageUpload={handleImageUpload}
      />
    </div>
  )
}

export default AddPlant
