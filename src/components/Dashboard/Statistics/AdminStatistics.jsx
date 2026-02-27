import { FaUserAlt, FaDollarSign } from "react-icons/fa"
import { BsFillCartPlusFill, BsFillHouseDoorFill } from "react-icons/bs"
import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "../../../hooks/useAxiosSecure"
import LoadingSpinner from "../../Shared/LoadingSpinner"
import OrderChart from "../../Chart/OrderChart"
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css';

const StatCard = ({ title, value, icon, gradient }) => {
  return (
    <div className="relative flex flex-col rounded-2xl bg-white shadow-lg hover:shadow-xl transition duration-300">
      <div
        className={`absolute -top-6 left-4 h-14 w-14 rounded-xl grid place-items-center bg-gradient-to-tr ${gradient} text-white shadow-md`}
      >
        {icon}
      </div>

      <div className="p-6 pt-10 text-right">
        <p className="text-sm text-gray-500">{title}</p>
        <h4 className="text-2xl font-bold text-gray-800">
          {value ?? 0}
        </h4>
      </div>
    </div>
  )
}

const AdminStatistics = () => {
  const axiosSecure = useAxiosSecure()

  const { data = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure("/admin-stats")
      return res.data
    },
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="mt-12 space-y-10">

      {/* 🔹 Statistics Cards */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

        <StatCard
          title="Total Revenue"
          value={`$${data.totalRevenue}`}
          icon={<FaDollarSign size={22} />}
          gradient="from-orange-500 to-orange-400"
        />

        <StatCard
          title="Total Orders"
          value={data.totalOrder}
          icon={<BsFillCartPlusFill size={22} />}
          gradient="from-blue-500 to-blue-400"
        />

        <StatCard
          title="Total Plants"
          value={data.totalPlant}
          icon={<BsFillHouseDoorFill size={22} />}
          gradient="from-pink-500 to-pink-400"
        />

        <StatCard
          title="Total Users"
          value={data.totalUser}
          icon={<FaUserAlt size={22} />}
          gradient="from-green-500 to-green-400"
        />

      </div>

      {/* 🔹 Chart + Calendar Section */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">

        <div className="rounded-2xl bg-white shadow-lg p-6 xl:col-span-2">
          <OrderChart barChartData={data.barChartData} />
        </div>

        <div className="rounded-2xl bg-white shadow-lg p-6">
          <Calendar className="w-full border-none" />
        </div>

      </div>
    </div>
  )
}

export default AdminStatistics