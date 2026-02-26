import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import useAuth from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../Form/CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
const PurchaseModal = ({ closeModal, isOpen, plant, fetchPlant }) => {
  const { user, } = useAuth()
  // const { loading, setLoding } = useState(false)
  const { quantity, price, name, category, userData, _id, Image, } = plant || {};
  // Total Price Calculation
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(price)
  const [orderData, setOrderData] = useState({
    seller: {
      sellerName: userData?.name,
      sellerEmail: userData?.email,
      sellerPhotoURL: userData?.userPhoto,

    },
    plantId: _id,
    quantity: selectedQuantity,
    price: totalPrice,
    plantName: name,
    plantCategory: category,
    plantImage: Image,
  })
  useEffect(() => {
    if (user)
      setOrderData(prev => {
        return {
          ...prev,
          customer: {
            name: user?.displayName,
            email: user?.email,
            image: user?.photoURL,
          },
        }
      })

  }, [user])
  // console.log(orderData)
  const handleQuantity = value => {

    const totalQuantity = parseFloat(value)
    if (totalQuantity <= 0) {
      return toast.error("Oops! You must order at least 1 plant 🌱");
    }
    if (totalQuantity > quantity) {
      return toast.error(`You cannot purchase more than ${quantity} available stock.`);
    }
    toast.success('Added to cart!');
    const calculatedPrice = totalQuantity * price
    setSelectedQuantity(totalQuantity)
    setTotalPrice(calculatedPrice)

    setOrderData(prev => {
      return {
        ...prev,
        price: calculatedPrice,
        quantity: totalQuantity,
      }
    })
  }
  //  toast.success(`Successfully Ordered ${selectedQuantity} Plant(s) 🌱 Confirm Order`);


  return (
    <Dialog
      open={isOpen}
      as='div'
      className='relative z-10 focus:outline-none '
      onClose={closeModal}
    >
      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4'>
          <DialogPanel
            transition
            className='w-full max-w-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl'
          >
            <DialogTitle
              as='h3'
              className='text-lg font-medium text-center leading-6 text-gray-900'
            >
              Review Info Before Purchase
            </DialogTitle>
            <div className='mt-2'>
              <p className='text-sm text-gray-500'>Plant: {name}</p>
            </div>
            <div className='mt-2'>
              <p className='text-sm text-gray-500'>Category: {category}</p>
            </div>
            <div className='mt-2'>
              <p className='text-sm text-gray-500'>Customer: {user?.displayName}</p>
            </div>

            <div className='mt-2'>
              <p className='text-sm text-gray-500'>Price: ${price}</p>
            </div>
            <div className='mt-2'>
              <p className='text-sm text-gray-500'>Available Quantity: {quantity}</p>
            </div>
            {/* pament and quantity from  */}
            <hr className='mt-2 font-medium' />
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 border border-gray-100">

              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                🛒 Order Info
              </h2>

              {/* Quantity Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Select Quantity
                </label>
                <input
                  type="number"
                  min={1}
                  max={quantity}
                  value={selectedQuantity}
                  onChange={(e) => handleQuantity(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none transition"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Available: {quantity}
                </p>
              </div>

              {/* Summary Section */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Selected Quantity:</span>
                  <span className="font-medium">{selectedQuantity}</span>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                  <span>Unit Price:</span>
                  <span className="font-medium">${price}</span>
                </div>

                <div className="border-t pt-2 flex justify-between text-base font-semibold text-gray-800">
                  <span>Total Price:</span>
                  <span className="text-green-600">${totalPrice}</span>
                </div>
              </div>

              {/* payment  Button */}
              <div className="max-w-lg mx-auto p-6">
                <Elements stripe={stripePromise}>
                  <CheckoutForm
                    closeModal={closeModal}
                    totalPrice={totalPrice}
                    orderData={orderData}
                    fetchPlant={fetchPlant}
                  />
                </Elements>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default PurchaseModal
