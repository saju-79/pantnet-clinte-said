import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'
import { TbFidgetSpinner } from 'react-icons/tb'

const UpdateUserStatusModal = ({
    isOpen,
    setIsOpen,
    updatedStatus,
    setUpdatedStatus,
    orderId,
}) => {
    const axiosSecure = useAxiosSecure()
    const queryClient = useQueryClient()

    const close = () => {
        setIsOpen(false)
    }

    const mutation = useMutation({
        mutationFn: async (status) => {
            const { data } = await axiosSecure.patch(
                `/order/status/update/${orderId}`,
                { status }
            )
            return data
        },
        onSuccess: () => {
            toast.success(`Order ${updatedStatus} Updated Successfully 🎉`)
            setIsOpen(false)
            queryClient.invalidateQueries(['orders'])
        },
        onError: () => {
            toast.error('Something went wrong ❌')
        },
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        // ❌ Prevent changing from Delivered
        if (updatedStatus === 'Cancelled') {
            toast.error('⚠ Delivered order cannot be cancelled.')
            return
        }

        mutation.mutate(updatedStatus)
    }

    return (
        <Dialog
            open={isOpen}
            as="div"
            className="relative z-50"
            onClose={close}
        >
            {/* Background Blur */}
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl transition-all duration-300">

                    <DialogTitle className="text-xl font-semibold text-gray-800 mb-6 text-center">
                        Update Order Status
                    </DialogTitle>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        <select
                            value={updatedStatus}
                            onChange={(e) => setUpdatedStatus(e.target.value)}
                            className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 py-3 outline-none transition"
                        >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>

                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={mutation.isPending}
                                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-xl transition duration-200 disabled:opacity-50"
                            >
                                {mutation.isPending ? <TbFidgetSpinner className='animate-spin m-auto' /> : 'Update'}
                            </button>

                            <button
                                type="button"
                                onClick={close}
                                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 rounded-xl transition duration-200"
                            >
                                Close
                            </button>
                        </div>

                    </form>
                </DialogPanel>
            </div>
        </Dialog>
    )
}

export default UpdateUserStatusModal