import { useQuery } from '@tanstack/react-query';
import PlantDataRow from '../../../components/Dashboard/TableRows/PlantDataRow'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const MyInventory = () => {
  const { user } = useAuth();
  const { data: plants = [], isLoading } = useQuery({
    queryKey: ["plant", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/plant/seller/${user?.email}`);
      if (!res.ok) {
        throw new Error("Failed to fetch plants");
      }
      const data = await res.json(); // <-- parse JSON
      console.log( data , "redsdfsd")
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  console.log(plants);
  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Image
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Name
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Category
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Price
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Quantity
                    </th>

                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Delete
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Update
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    plants.map(plant => (
                      < PlantDataRow key={plant._id} plant={plant} />
                    )
                    )
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyInventory
