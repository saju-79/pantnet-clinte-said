import { useQuery } from '@tanstack/react-query'
import SellerOrderDataRow from '../../../components/Dashboard/TableRows/SellerOrderDataRow'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import useAuth from '../../../hooks/useAuth';

const ManageOrders = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure();
  const { data: confromorders = [], isLoading, refetch } = useQuery({
    queryKey: ['orders', user?.email],
    enabled: !!user?.email, // 🔥 VERY IMPORTANT
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/orders/conformorders/${user.email}`
      );
      return data;
    },
  });
  if (isLoading) return <LoadingSpinner />

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>

        <div className="bg-gradient-to-r from-green-500 to-emerald-200 
                text-white rounded-2xl p-6 shadow-lg 
                flex items-center justify-between">

          <div>
            <p className="text-lg opacity-80 font-bold">Confirmed Orders</p>
            <h1 className="text-4xl font-extrabold">
              {confromorders?.length || 0} {/* safe length */}
            </h1>
          </div>

          <div className="text-5xl opacity-30">
            ✅ {/* or any emoji/icon you like */}
          </div>
        </div>


        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal items-center justify-center'>
                <thead>
                  <tr>
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
                      Customer
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
                      Address
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Status
                    </th>

                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Action
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Delete
                    </th>

                  </tr>
                </thead>
                <tbody>
                  {confromorders.map(confromorder => (
                    <SellerOrderDataRow
                      key={confromorder._id}
                      confromorder={confromorder}
                      refetch={refetch}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageOrders
