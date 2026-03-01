import { useState } from 'react'
import DeleteModal from '../../Modal/DeleteModal'
import UpdatePlantModal from '../../Modal/UpdatePlantModal'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import LoadingSpinner from '../../Shared/LoadingSpinner'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import useAuth from '../../../hooks/useAuth'
import { TbFidgetSpinner } from 'react-icons/tb'
import { FiTrash2 } from 'react-icons/fi'

const PlantDataRow = ({ plant }) => {
  const { user } = useAuth();
  let [isOpen, setIsOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const { quantity, price, category, name, Image, _id } = plant || {};
  // console.log(plant)
  function openModal() {
    setIsOpen(true)
  }
  function closeModal() {
    setIsOpen(false)
  }
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const { data } = await axiosSecure.delete(`/seller/plant/${_id}`)
      return data
    },

    onSuccess: () => {
      toast.success('Plant deleted successfully 🎉')

      // ✅ Update correct cache
      queryClient.setQueryData(['plant', user?.email], (oldPlants) =>
        oldPlants?.filter((item) => item._id !== _id)
      )

      closeModal()
    },

    onError: () => {
      toast.error('Delete failed ❌')
    },
  })
  if (isPending) return <LoadingSpinner></LoadingSpinner>
  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='flex items-center'>
          <div className='flex-shrink-0'>
            <div className='block relative'>
              <img
                alt='profile'
                src={Image}
                className='mx-auto object-cover rounded h-10 w-15 '
              />
            </div>
          </div>
        </div>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{name}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{category}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>${price}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{quantity}</p>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>

        <button
          onClick={() => openModal()}
          disabled={isPending}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition duration-200
                          ${isPending
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-red-600 text-white hover:bg-red-700 active:scale-95'}
                            `}
        >
          {isPending ? <TbFidgetSpinner className='animate-spin m-auto' /> : <FiTrash2 size={18} className='text-[#ffffffff] font-bold' />}
        </button>

        <DeleteModal
          isOpen={isOpen}
          closeModal={closeModal}
          mutate={mutate}
        />
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <span
          onClick={() => setIsEditModalOpen(true)}
          className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
        >
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Update</span>
        </span>
        <UpdatePlantModal
          isOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          plant={plant}

        />
      </td>
    </tr>
  )
}

export default PlantDataRow
