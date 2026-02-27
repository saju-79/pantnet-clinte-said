import { useState } from 'react'
import DeleteModal from '../../Modal/DeleteModal'
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import { FiTrash2 } from 'react-icons/fi'
const CustomerOrderDataRow = ({ order, }) => {
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth()
  const { plantImage, plantName, quantity, plantCategory, price, status, _id } = order || {};
  const queryClient = useQueryClient()


  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const { data } = await axiosSecure.patch(
        `/order/status/update/${_id}`, // ✅ correct id
        { status: 'Cancelled' }              // ✅ send status
      )
      return data
    },
    onSuccess: () => {
      toast.success('Order Cancelled successfully! 🎉')
      queryClient.invalidateQueries(['orders', user?.email]) // ✅ correct key
      closeModal() // ✅ call function directly
    },
    onError: () => {
      toast.error('Failed to cancel order! ❌')
    },
  })

  //  order delete fetch
  const { mutate: Delete, isPending: panding } = useMutation({
    mutationFn: async () => {
      const { data } = await axiosSecure.delete(`/order/${_id}`)
      return data
    },
    onSuccess: () => {
      toast.success('Order deleted successfully 🎉')

      // 🔥 Remove instantly from UI without refetch
      queryClient.setQueryData(['orders', user?.email], (oldOrders) =>
        oldOrders?.filter((item) => item._id !== order._id)
      )

      closeModal()
    },
    onError: () => {
      toast.error('Delete failed ❌')
    },
  })
  // Define styles per status
  const statusStyles = {
    Pending: "bg-yellow-100 text-yellow-700",
    Deliver: "bg-green-100 text-green-600",
    Cancelled: "bg-red-100 text-red-500",
    Processing: "bg-blue-100 text-blue-600",
    default: "bg-gray-100 text-gray-600",
  }
  const label = status || "Order Completed";
  const style = statusStyles[status] || statusStyles.default
  if (panding) return <LoadingSpinner></LoadingSpinner>
  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='flex items-center'>
          <div className='flex-shrink-0'>
            <div className='block relative'>
              <img
                alt='plant plantImage'
                src={plantImage}
                className='mx-auto object-cover rounded h-10 w-15 '
              />
            </div>
          </div>
        </div>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{plantName}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{plantCategory}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>${price}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{quantity}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p
          className={`inline-flex items-center gap-1 px-1 text-emerald-400 py-1 text-sm font-bold rounded-full w-fit ${style}`}
        >
          {status === "Delivered" && "✔ "}
          {status === "Cancelled" && "✖ "}
          {status === "Pending" && "⏳ "}
          {status === "Processing" && "🕒 "}
          {label}
        </p>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button
          disabled={isPending || status === "Delivered"}
          onClick={() => setIsOpen(true)}
          className='relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-lime-900 leading-tight'
        >
          <span className='absolute cursor-pointer inset-0 bg-red-200 opacity-50 rounded-full'></span>
          <span className='relative cursor-pointer'>Order Cancel</span>
        </button>

        <DeleteModal
          isOpen={isOpen}
          closeModal={closeModal}
          mutate={mutate}
        />
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button
          disabled={status === "Delivered" || isPending}
          onClick={() => {
            if (window.confirm('Are you sure you want to delete this order?')) {
              Delete()
            }
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition duration-200
          ${isPending
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-red-600 text-white hover:bg-red-700 active:scale-95'}
            `}
        >
          {isPending ? 'Deleting...' : <FiTrash2 size={18} className='text-[#ffffffff] font-bold' />}
        </button>
      </td>
    </tr>
  )
}

export default CustomerOrderDataRow