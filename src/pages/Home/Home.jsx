// import { useLoaderData } from 'react-router'
import Plants from '../../components/Home/Plants'
import axios from 'axios'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import { useQuery } from '@tanstack/react-query'

const Home = () => {
  // const plants = useLoaderData()
  const {
    data: plants,
    isLoading,
  } = useQuery({
    queryKey: ['plant'],
    // only run if id exists
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/plant`
      )
      return data
    },
  })
  console.log(plants)
  if (isLoading) return <LoadingSpinner></LoadingSpinner>
  // console.log(plants)
  return (
    <div>
      <Plants plants={plants} />
    </div>
  )
}

export default Home
