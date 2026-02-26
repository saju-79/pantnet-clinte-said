import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'

const UpdateUserRoleModal = ({
    isOpen,
    setIsOpen,
    updatedRole,
    setUpdatedRole,
    userEmail,
}) => {
    const axiosSecure = useAxiosSecure()
    const queryClient = useQueryClient()

    function close() {
        setIsOpen(false)
    }

    const mutation = useMutation({
        mutationFn: async role => {
            const { data } = await axiosSecure.patch(
                `/user/role/update/${userEmail}`,
                { role }
            )
            return data
        },
        onSuccess: () => {
            toast.success('User Role Updated Successfully 🎉')
            setIsOpen(false)
            queryClient.invalidateQueries(['users'])
        },
        onError: () => {
            toast.error('Something went wrong ❌')
        },

    })

    const handleSubmit = e => {
        e.preventDefault()
        mutation.mutate(updatedRole)
        if (updatedRole === "admin") {
            toast.error('⚠ Admin role gives full system access')
        }
    }

    console.log(userEmail)
    return (
        <Dialog
            open={isOpen}
            as='div'
            className='relative z-50'
            onClose={close}
        >
            {/* Background Blur */}
            <div className='fixed inset-0 bg-black/40 backdrop-blur-sm' />

            <div className='fixed inset-0 flex items-center justify-center p-4'>
                <DialogPanel className='w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl transition-all duration-300'>

                    <DialogTitle className='text-xl font-semibold text-gray-800 mb-6 text-center'>
                        Update User Role
                    </DialogTitle>

                    <form onSubmit={handleSubmit} className='space-y-5'>

                        <select
                            value={updatedRole}
                            onChange={e => setUpdatedRole(e.target.value)}
                            className='w-full border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-xl px-4 py-3 outline-none transition'
                        >
                            <option value='customer'>Customer</option>
                            <option value='seller'>Seller</option>
                            <option value='admin'>Admin</option>
                        </select>

                        <div className='flex gap-4'>
                            <button
                                type='submit'
                                disabled={mutation.isPending}
                                className='flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-xl transition duration-200 disabled:opacity-50'
                            >
                                {mutation.isPending ? 'Updating...' : 'Update'}
                            </button>

                            <button
                                type='button'
                                onClick={close}
                                className='flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 rounded-xl transition duration-200'
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </DialogPanel>
            </div>
        </Dialog>
    )
}

export default UpdateUserRoleModal