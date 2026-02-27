import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'

const DeleteModal = ({ isOpen, closeModal, mutate }) => {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    try {
      setLoading(true)
      await mutate()
      closeModal()
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50"
      onClose={closeModal}
    >
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-2xl transition-all duration-300 scale-100">

          {/* Icon + Title */}
          <div className="flex items-center gap-3">
            {/* Using a simple Unicode warning icon */}
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 text-xl font-bold">
              ⚠
            </div>
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Confirm  Cancel
            </DialogTitle>
          </div>

          {/* Message */}
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              This action is permanent and cannot be undone.
              Are you sure you want to continue?
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={closeModal}
              className="px-4 py-2 text-sm font-medium text-[#000000] rounded-lg bg-gray-200 hover:bg-gray-400 transition disabled:opacity-50"
              disabled={loading}
            >
              No
            </button>

            <button
              onClick={handleDelete}
              disabled={loading}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-emerald-500 text-white hover:bg-emerald-800 transition disabled:opacity-50"
            >
              {loading ? 'Deleting...' : 'Yes'}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default DeleteModal