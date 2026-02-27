import { Dialog, DialogTitle, DialogPanel } from '@headlessui/react'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import { useMutation } from '@tanstack/react-query'
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-hot-toast'
import { TbFidgetSpinner } from 'react-icons/tb'

const BecomeSellerModal = ({ closeModal, isOpen }) => {

  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const { data } = await axiosSecure.patch(`/become-seller-request/${user?.email}`)
      return data
    },
    onSuccess: () => {
      toast.success('Seller request sent successfully 🎉')
      closeModal()
    },
    onError: () => {
      toast.error('Something went wrong ❌')
    },
  })
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50"
      onClose={closeModal}
    >
      {/* Background Overlay */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl transition-all duration-300">

          <DialogTitle className="text-xl font-bold text-gray-800 text-center">
            Become a Seller 🚀
          </DialogTitle>

          <p className="mt-3 text-sm text-gray-500 text-center">
            Please read all the terms & conditions before becoming a seller.
          </p>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => mutate()}
              disabled={isPending}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-xl transition duration-200 disabled:opacity-50"
            >
              {isPending ? <TbFidgetSpinner className='animate-spin m-auto' /> : "Continue"}
            </button>

            <button
              type="button"
              onClick={closeModal}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 rounded-xl transition duration-200"
            >
              Cancel
            </button>
          </div>

        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default BecomeSellerModal