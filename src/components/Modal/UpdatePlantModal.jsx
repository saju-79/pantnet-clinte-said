import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import UpdatePlantForm from '../Form/UpdatePlantForm';
import { toast } from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';

const UpdatePlantModal = ({ isOpen, setIsEditModalOpen, plant }) => {
  const [isloading, setIsUploading] = useState(false);
  const [imageurl, setImageURL] = useState(plant.Image);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  // console.log(plant._id)
  // Mutation to update plant
  const {
    handleSubmit,
    register
  } = useForm();

  //  photo update
  const handleImageUpload = async e => {
    setIsUploading(true)
    e.preventDefault()
    // e.target.reset()
    const image = e.target.files[0];
    if (!image) {
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
    } finally {
      setIsUploading(false)
    }

  }
  // console.log(imageurl,)

  // ✅ Define mutation at the top level
  const mutation = useMutation({
    mutationFn: async (updatedData) => {
      const price = parseInt(updatedData.price);
      const quantity = parseInt(updatedData.quantity);


      const updatedDatas = { ...updatedData, Image: imageurl, price, quantity }
      const { data } = await axiosSecure.patch(`/seller/plants/${plant._id}`, updatedDatas);
      return data;
    },
    onSuccess: (data) => {
      if (data.modifiedCount > 0) {
        toast.success('Plant updated successfully!', {
          duration: 4000,                 // show for 4 seconds
          position: 'top-right',          // where toast appears
          style: {
            borderRadius: '12px',
            background: 'linear-gradient(90deg, #10b981, #34d399)', // lime-green gradient
            color: '#fff',
            padding: '16px 24px',
            fontWeight: 'bold',
            fontSize: '16px',
          },
          icon: '🌱',                     // cute plant icon
          className: 'shadow-lg',          // add a subtle shadow
        });
        queryClient.invalidateQueries(['plants']);
        setIsEditModalOpen(false);
      } else {
        toast.error('No changes detected or failed to update');
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to update plant');
    },
  });
  const handleUpdatePlant = (updatedData) => {
    mutation.mutate(updatedData);
    console.log(updatedData, "update data ")


  };
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={() => setIsEditModalOpen(false)}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out shadow-xl rounded-2xl transform transition">
            <button >
              <DialogTitle
                as="h3"
                className="text-lg font-medium text-center leading-6 text-gray-900"
              >
                Update Plant Info
              </DialogTitle>
            </button>

            <div className="mt-4 w-full">
              <UpdatePlantForm
                plant={plant}                  // pass current plant data   // submit handler
                register={register}           // show loading if needed
                handleSubmit={handleSubmit}
                handleUpdatePlant={handleUpdatePlant}
                loading={mutation.isLoading}
                handleImageUpload={handleImageUpload}
                imageurl={imageurl}
                isLoading={isloading}
              />
            </div>

            <hr className="mt-6" />

            <div className="mt-4 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="w-full px-4 py-2 text-sm font-medium text-red-700 
                           bg-red-100 rounded-2xl border border-red-200 shadow-sm 
                           hover:bg-red-300 hover:scale-105 transition 
                           focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default UpdatePlantModal;