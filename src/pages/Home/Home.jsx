import { useLoaderData } from 'react-router'
import Plants from '../../components/Home/Plants'

const Home = () => {
  const plants = useLoaderData()
  // console.log(plants)
  return (
    <div>
      <Plants plants={plants} />
    </div>
  )
}

export default Home
