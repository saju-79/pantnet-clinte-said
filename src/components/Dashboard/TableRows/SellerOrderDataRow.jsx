import { useState } from 'react'
import DeleteModal from '../../Modal/DeleteModal'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { FiTrash2 } from 'react-icons/fi';
import { TbFidgetSpinner } from 'react-icons/tb';
import UpdateUserSatusModal from '../../Modal/UpdateUserSatusModal';
const SellerOrderDataRow = ({ confromorder, refetch }) => {
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const axiosSecure = useAxiosSecure();
  const { quantity, price, customer, plantName, plantImage, _id: orderId, status } = confromorder || {};
  const [updatedStatus, setUpdatedStatus] = useState(status);
  const queryClient = useQueryClient();
  console.log(updatedStatus, "asdaujsdhasjdhasjdhasjd", status)
  //  order delete fetch
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const { data } = await axiosSecure.delete(`/order/${orderId}`)
      return data
    },
    onSuccess: () => {
      toast.success('Order deleted successfully 🎉')
      refetch()
      // 🔥 Remove instantly from UI without refetch
      queryClient.setQueryData(['orders', customer.email], (oldOrders) =>
        oldOrders?.filter((item) => item._id !== confromorder._id)
      )

      closeModal()
    },
    onError: () => {
      toast.error('Delete failed ❌')
    },
  })

  const statusStyles = {
    Pending: "bg-yellow-100 text-yellow-700",
    Deliver: "bg-green-100 text-green-600",
    Cancelled: "bg-red-100 text-red-500",
    Processing: "bg-blue-100 text-blue-600",
    default: "bg-gray-100 text-gray-600",
  }
  const label = updatedStatus || "Ordered";
  const style = statusStyles[updatedStatus] || statusStyles.default
  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm items-center'>
        <div className=" text-start">
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
          <div className="">
            <p className='text-gray-900 whitespace-no-wrap'>{plantName}</p>
          </div>
        </div>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{customer?.email}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>${price}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{quantity}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>Dhaka</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p
          className={`inline-flex items-center gap-1 px-1 text-emerald-400 py-1 text-sm font-bold rounded-full w-fit ${style}`}
        >
          {updatedStatus === "Delivered" && "✔ "}
          {updatedStatus === "Cancelled" && "✖ "}
          {updatedStatus === "Pending" && "⏳ "}
          {updatedStatus === "Processing" && "🕒 "}
          {label}
        </p>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <span
          onClick={() => setIsOpen(true)}
          className='relative cursor-pointer inline-block px-3 py-1  font-semibold text-green-900 leading-tight'>
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Update Status</span>
        </span>
        {/* Modal */}
        <UpdateUserSatusModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          updatedStatus={updatedStatus}
          setUpdatedStatus={setUpdatedStatus}
          orderId={orderId}
        ></UpdateUserSatusModal>
      </td>
      <td>
        <button
          onClick={() => {
            if (window.confirm('Are you sure you want to delete this order?')) {
              mutate()
            }
          }}
          disabled={isPending || updatedStatus === "Delivered"}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition duration-200
                  ${isPending
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-red-600 text-white hover:bg-red-700 active:scale-95'}
                    `}
        >
          {isPending ? <TbFidgetSpinner className='animate-spin m-auto' /> : <FiTrash2 size={18} className='text-[#ffffffff] font-bold' />}
        </button>
      </td>
    </tr>
  )
}

export default SellerOrderDataRow
