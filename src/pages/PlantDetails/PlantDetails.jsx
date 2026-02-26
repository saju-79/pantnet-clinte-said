import Container from '../../components/Shared/Container'
import Heading from '../../components/Shared/Heading'
import Button from '../../components/Shared/Button/Button'
import PurchaseModal from '../../components/Modal/PurchaseModal'
import { useState } from 'react'
import { useParams } from 'react-router'
import useAuth from '../../hooks/useAuth'
import useRole from '../../hooks/useRole'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const PlantDetails = () => {
  // const plant = useLoaderData();
  const { user } = useAuth();
  const { id } = useParams()
  // console.log(id)
  let [isOpen, setIsOpen] = useState(false);
  const [role, roleLoading] = useRole();
// console.log([role ,roleLoading])
  const {
    data: plant,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['plant', id],
    enabled: !!id, // only run if id exists
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/plant/${id}`
      )
      return data
    },
  })
  const { quantity, price, userData, name, description, category, Image, } = plant || {};

  // console.log(error, isError)
  const closeModal = () => {
    setIsOpen(false)
  }
  // console.log(user)
  if (roleLoading || isLoading) return <LoadingSpinner></LoadingSpinner>
  return (
    <Container>
      <div className='mx-auto flex flex-col lg:flex-row justify-between w-full gap-12'>
        {/* Header */}
        <div className='flex flex-col gap-6 flex-1'>
          <div>
            <div className='w-full overflow-hidden rounded-xl'>
              <img
                className='object-cover w-full '
                src={Image}
                alt='header image'
              />
            </div>
          </div>
        </div>
        <div className='md:gap-10 flex-1'>
          {/* Plant Info */}
          <Heading
            title={name}
            subtitle={`Category: ${category}`}
          />
          <hr className='my-6' />
          <div
            className='
          text-lg font-light text-neutral-500'
          >
            {description}
          </div>
          <hr className='my-6' />

          <div
            className='
                text-xl 
                font-semibold 
                flex 
                flex-row 
                items-center
                gap-2
              '
          >
            <div>Seller:{userData?.name}</div>

            <img
              className='rounded-full'
              height='30'
              width='30'
              alt='Avatar'
              referrerPolicy='no-referrer'
              src={userData?.userPhoto}
            />
          </div>
          <hr className='my-6' />
          <div>
            <p
              className='
                gap-4 
                font-light
                text-neutral-500
              '
            >
              Quantity:<span className='font-bold text-[#00000090]'>{quantity}</span>Units Left Only!
            </p>
          </div>
          <hr className='my-6' />
          <div className='flex justify-between'>
            <p className='font-bold text-3xl text-gray-500'>Price: {price}$</p>
            <div>
              <Button
                disabled={!user || user?.email === userData.email || role !== "customer"}
                onClick={() => setIsOpen(true)}
                label={user ? 'Purchase' : 'Login to purchase'} />
            </div>
          </div>
          <hr className='my-6' />

          <PurchaseModal
            closeModal={closeModal}
            isOpen={isOpen}
            plant={plant}
            fetchPlant={refetch}
          />
        </div>
      </div>
    </Container>
  )
}

export default PlantDetails
